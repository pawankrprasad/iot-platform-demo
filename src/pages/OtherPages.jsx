import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader, Stepper } from '../components';
import { REPORTS, FILES, USERS, ORGS, DEVICES } from '../mock-data';

export function Reports({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  return (<div>
    <PageHeader title="Reports" sub="Generate, schedule, and download reports" crumbs={['Home','Reports']}
      actions={[<Btn key="g" onClick={()=>nav('generate-report')}>+ Generate Report</Btn>,<Btn key="s" variant="ghost" onClick={()=>nav('scheduled-reports')}>Scheduled</Btn>]}/>
    <div style={st.grid(3)}><StatCard label="Generated" value={REPORTS.length} color="#3b82f6" icon="📄"/><StatCard label="Scheduled" value={2} color="#8b5cf6" icon="📅"/><StatCard label="Downloads" value={9} color="#10b981" icon="📥"/></div>
    <Card><div style={{fontWeight:600,marginBottom:14}}>Recent Reports</div>
      <DataTable cols={[
        {key:'name',label:'Name'},{key:'type',label:'Type'},{key:'generated',label:'Generated'},{key:'format',label:'Format'},
        {key:'status',label:'Status',render:v=><span style={styles(dark).badge('#10b981')}>{v}</span>},
        {key:'id',label:'Actions',render:()=><div style={{display:'flex',gap:6}}><Btn variant="ghost">Download</Btn></div>}
      ]} rows={REPORTS}/>
    </Card>
  </div>);
}
export function GenerateReport({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [step,setStep]=useState(1);
  return (<div>
    <PageHeader title="Generate Report" sub="Configure a new report" crumbs={['Home','Reports','Generate']} actions={[<Btn key="b" variant="ghost" onClick={()=>nav('reports')}>Cancel</Btn>]}/>
    <Stepper steps={['Report Type','Filters','Select Units','Preview']} current={step}/>
    <Card>
      {step===1&&<div style={st.grid(2)}>{['Device Status','Alert Summary','Performance','Connectivity','Firmware Audit','Custom'].map(t=><div key={t} style={{border:'2px solid '+(dark?'#3b82f640':'#bfdbfe'),borderRadius:8,padding:14,cursor:'pointer'}} onClick={()=>setStep(2)}><div style={{fontWeight:600}}>{t}</div><div style={{color:'#64748b',fontSize:11,marginTop:4}}>Generate report</div></div>)}</div>}
      {step===2&&<div style={st.grid(2)}>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Date Range</label><select style={{...st.select,width:'100%'}}><option>Last 7 days</option><option>Last 30 days</option></select></div>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Organization</label><select style={{...st.select,width:'100%'}}><option>All</option><option>Org Alpha</option></select></div>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Format</label><select style={{...st.select,width:'100%'}}><option>PDF</option><option>CSV</option></select></div>
        <div style={{gridColumn:'span 2'}}><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Recipients</label><input style={st.input} placeholder="email@example.com"/></div>
      </div>}
      {step===3&&<div style={{maxHeight:280,overflowY:'auto'}}>{DEVICES.map(d=><div key={d.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9'),fontSize:12.5}}><input type="checkbox"/><strong>{d.id}</strong><span style={{color:'#64748b'}}>{d.model}</span></div>)}</div>}
      {step===4&&<div style={{background:dark?'#0f1117':'#f8fafc',borderRadius:8,padding:16,fontSize:12.5}}><p>Type: <strong>Device Status</strong></p><p>Range: <strong>Last 7 days</strong></p><p>Format: <strong>PDF</strong></p><p>Units: <strong>{DEVICES.length}</strong></p></div>}
      <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
        <Btn variant="ghost" onClick={()=>step>1?setStep(s=>s-1):nav('reports')}>Back</Btn>
        {step<4?<Btn onClick={()=>setStep(s=>s+1)}>Next</Btn>:<Btn variant="success" onClick={()=>nav('reports')}>Generate</Btn>}
      </div>
    </Card>
  </div>);
}
export function ScheduledReports({ nav }) {
  const { dark } = useTheme();
  return (<div>
    <PageHeader title="Scheduled Reports" crumbs={['Home','Reports','Scheduled']} actions={[<Btn key="a">+ Create</Btn>,<Btn key="b" variant="ghost" onClick={()=>nav('reports')}>Back</Btn>]}/>
    <Card><DataTable cols={[
      {key:'name',label:'Name'},{key:'type',label:'Type'},{key:'frequency',label:'Frequency'},{key:'next',label:'Next Run'},
      {key:'status',label:'Status',render:v=><span style={styles(dark).badge(v==='Active'?'#10b981':'#64748b')}>{v}</span>}
    ]} rows={[
      {name:'Weekly Device',type:'Device Status',frequency:'Weekly',next:'Mon 8:00 AM',status:'Active'},
      {name:'Monthly Alerts',type:'Alert Summary',frequency:'Monthly',next:'1st of month',status:'Active'},
      {name:'Daily Fleet',type:'Performance',frequency:'Daily',next:'Tomorrow 7AM',status:'Paused'}
    ]}/></Card>
  </div>);
}
export function FileManagement({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab,setTab]=useState('library'); const [cat,setCat]=useState('All');
  const cats=['All','Firmware','Config','Menu','Media','Software'];
  const filtered=cat==='All'?FILES:FILES.filter(f=>f.category===cat);
  return (<div>
    <PageHeader title="File Management" sub="Upload, manage, and deploy files" crumbs={['Home','Files']} actions={[<Btn key="u" onClick={()=>nav('upload-file')}>Upload File</Btn>]}/>
    <div style={{display:'flex',borderBottom:'1px solid '+(dark?'#ffffff10':'#e2e8f0'),marginBottom:16}}>
      {['library','transfers','history'].map(t=><button key={t} style={st.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
    </div>
    {tab==='library'&&<Card>
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>{cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:'5px 14px',borderRadius:20,border:'1px solid '+(cat===c?'#3b82f6':dark?'#ffffff18':'#e2e8f0'),background:cat===c?'#3b82f6':'transparent',color:cat===c?'#fff':dark?'#94a3b8':'#4a5568',cursor:'pointer',fontSize:12}}>{c}</button>)}</div>
      <DataTable cols={[
        {key:'name',label:'Filename'},{key:'category',label:'Category',render:v=><span style={styles(dark).badge('#8b5cf6')}>{v}</span>},
        {key:'version',label:'Version'},{key:'size',label:'Size'},{key:'uploaded',label:'Uploaded'},
        {key:'id',label:'Actions',render:()=><div style={{display:'flex',gap:6}}><Btn variant="ghost" onClick={()=>nav('select-targets')}>Deploy</Btn><Btn variant="ghost">Download</Btn></div>}
      ]} rows={filtered}/>
    </Card>}
    {tab==='transfers'&&<Card><DataTable cols={[
      {key:'file',label:'File'},{key:'device',label:'Target'},
      {key:'progress',label:'Progress',render:v=><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:100,height:6,background:dark?'#2d3748':'#e2e8f0',borderRadius:3}}><div style={{width:v+'%',height:'100%',background:'#3b82f6',borderRadius:3}}/></div><span style={{fontSize:11}}>{v}%</span></div>},
      {key:'status',label:'Status',render:v=><span style={styles(dark).badge(v==='Success'?'#10b981':v==='Failed'?'#ef4444':v==='In Progress'?'#3b82f6':'#64748b')}>{v}</span>}
    ]} rows={[
      {file:'firmware_v3.2.bin',device:'DEV-1001',progress:100,status:'Success'},
      {file:'config_production.json',device:'DEV-1003',progress:65,status:'In Progress'},
      {file:'menu_v2.xml',device:'DEV-1005',progress:0,status:'Pending'},
      {file:'app_installer.apk',device:'DEV-1007',progress:0,status:'Failed'}
    ]}/></Card>}
    {tab==='history'&&<Card><DataTable cols={[
      {key:'file',label:'File'},{key:'target',label:'Target'},{key:'date',label:'Date'},
      {key:'status',label:'Status',render:v=><span style={styles(dark).badge(v==='Success'?'#10b981':'#ef4444')}>{v}</span>}
    ]} rows={[
      {file:'firmware_v3.1.bin',target:'Fleet A',date:'2d ago',status:'Success'},
      {file:'config_v1.4.json',target:'Acme Corp',date:'5d ago',status:'Success'},
      {file:'media_pack_q4.zip',target:'Floor 1',date:'1w ago',status:'Failed'}
    ]}/></Card>}
  </div>);
}
export function UploadFile({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [drag,setDrag]=useState(false);
  return (<div>
    <PageHeader title="Upload File" crumbs={['Home','Files','Upload']} actions={[<Btn key="b" variant="ghost" onClick={()=>nav('files')}>Cancel</Btn>]}/>
    <Card>
      <div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={()=>setDrag(false)}
        style={{border:'2px dashed '+(drag?'#3b82f6':dark?'#ffffff20':'#e2e8f0'),borderRadius:10,padding:'40px 20px',textAlign:'center',marginBottom:20,transition:'all .2s'}}>
        <div style={{fontSize:32,marginBottom:8}}>📁</div>
        <div style={{fontWeight:600,marginBottom:4}}>Drag and drop files here</div>
        <div style={{color:'#64748b',fontSize:12.5,marginBottom:12}}>or click to browse</div>
        <Btn>Browse Files</Btn>
      </div>
      <div style={st.grid(2)}>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Category</label><select style={{...st.select,width:'100%'}}><option>Firmware</option><option>Config</option><option>Menu</option><option>Media</option><option>Software</option></select></div>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Version</label><input style={st.input} placeholder="e.g. 3.2.1"/></div>
        <div style={{gridColumn:'span 2'}}><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Description</label><input style={st.input} placeholder="Describe this file..."/></div>
      </div>
      <div style={{marginTop:16,display:'flex',justifyContent:'flex-end',gap:10}}>
        <Btn variant="ghost" onClick={()=>nav('files')}>Cancel</Btn><Btn onClick={()=>nav('files')}>Upload</Btn>
      </div>
    </Card>
  </div>);
}
export function SelectTargets({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab,setTab]=useState('units');
  return (<div>
    <PageHeader title="Select Targets" sub="Choose devices for deployment" crumbs={['Home','Files','Deploy','Targets']} actions={[<Btn key="b" variant="ghost" onClick={()=>nav('files')}>Back</Btn>]}/>
    <div style={{display:'flex',borderBottom:'1px solid '+(dark?'#ffffff10':'#e2e8f0'),marginBottom:16}}>
      {['units','tags','fleets','customers'].map(t=><button key={t} style={st.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
    </div>
    <Card>
      <div style={{maxHeight:320,overflowY:'auto'}}>
        {tab==='units'&&DEVICES.map(d=><div key={d.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9'),fontSize:12.5}}><input type="checkbox"/><strong>{d.id}</strong><span style={{color:'#64748b'}}>{d.model}</span><div style={{marginLeft:'auto'}}><span style={styles(dark).badge(styles(dark).statusColor[d.status])}>{d.status}</span></div></div>)}
        {tab==='fleets'&&['Fleet A (8 devices)','Fleet B (6 devices)','Fleet C (10 devices)'].map(f=><div key={f} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9')}}><input type="checkbox"/><span>{f}</span></div>)}
        {tab==='tags'&&['production','floor1','floor2','warehouse','test'].map(t=><div key={t} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9')}}><input type="checkbox"/><span style={styles(dark).badge('#8b5cf6')}>{t}</span></div>)}
        {tab==='customers'&&['Acme Corp','GlobalTech','IndustrialCo'].map(c=><div key={c} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9')}}><input type="checkbox"/><span>{c}</span></div>)}
      </div>
      <div style={{marginTop:16,display:'flex',justifyContent:'flex-end',gap:10}}><Btn variant="ghost" onClick={()=>nav('files')}>Cancel</Btn><Btn onClick={()=>nav('files')}>Schedule Transfer</Btn></div>
    </Card>
  </div>);
}
export function UserManagement({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab,setTab]=useState('users');
  return (<div>
    <PageHeader title="User Management" sub="Manage users, roles, and permissions" crumbs={['Home','Users']}
      actions={tab==='users'?[<Btn key="a" onClick={()=>nav('add-user')}>+ Add User</Btn>]:[<Btn key="r">+ Add Role</Btn>]}/>
    <div style={{display:'flex',borderBottom:'1px solid '+(dark?'#ffffff10':'#e2e8f0'),marginBottom:16}}>
      {['users','roles','activity'].map(t=><button key={t} style={st.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
    </div>
    {tab==='users'&&<Card><DataTable cols={[
      {key:'name',label:'Name'},{key:'email',label:'Email'},
      {key:'role',label:'Role',render:v=><span style={styles(dark).badge(v==='Admin'?'#ef4444':v==='Customer'?'#3b82f6':'#64748b')}>{v}</span>},
      {key:'org',label:'Organization'},{key:'status',label:'Status',render:v=><span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span>},
      {key:'lastLogin',label:'Last Login'},{key:'id',label:'Actions',render:()=><div style={{display:'flex',gap:6}}><Btn variant="ghost">Edit</Btn><Btn variant="danger">Delete</Btn></div>}
    ]} rows={USERS}/></Card>}
    {tab==='roles'&&<Card><DataTable cols={[
      {key:'name',label:'Role'},{key:'users',label:'Users'},{key:'permissions',label:'Permissions'},
      {key:'id',label:'Actions',render:()=><Btn variant="ghost">Edit</Btn>}
    ]} rows={[
      {id:1,name:'Admin',users:2,permissions:'Full access'},{id:2,name:'Customer',users:2,permissions:'View devices, alerts'},
      {id:3,name:'Viewer',users:1,permissions:'Read-only'},{id:4,name:'Fleet Manager',users:0,permissions:'Manage fleets'}
    ]}/></Card>}
    {tab==='activity'&&<Card><DataTable cols={[
      {key:'user',label:'User'},{key:'action',label:'Action'},{key:'resource',label:'Resource'},{key:'time',label:'Time'},{key:'ip',label:'IP'}
    ]} rows={[
      {user:'alice@acme.com',action:'Login',resource:'Platform',time:'2m ago',ip:'192.168.1.5'},
      {user:'alice@acme.com',action:'Update',resource:'DEV-1001 Config',time:'15m ago',ip:'192.168.1.5'},
      {user:'david@smart.com',action:'Export',resource:'Device Report',time:'1h ago',ip:'10.0.0.12'}
    ]}/></Card>}
  </div>);
}
export function AddUser({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [step,setStep]=useState(1); const [roleMode,setRoleMode]=useState('existing');
  return (<div>
    <PageHeader title="Add New User" sub="Onboard a new user" crumbs={['Home','Users','Add User']} actions={[<Btn key="b" variant="ghost" onClick={()=>nav('users')}>Cancel</Btn>]}/>
    <Stepper steps={['User Details','Role Assignment','Review']} current={step}/>
    <Card>
      {step===1&&<div style={st.grid(2)}>
        {[['Full Name','John Doe'],['Email','john@company.com'],['Phone','+1 555 000 0000'],['Job Title','Fleet Manager']].map(([l,p])=><div key={l}><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>{l}</label><input style={st.input} placeholder={p}/></div>)}
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Organization</label><select style={{...st.select,width:'100%'}}><option>Org Alpha</option><option>Org Beta</option></select></div>
        <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Customer</label><select style={{...st.select,width:'100%'}}><option>Acme Corp</option><option>GlobalTech</option></select></div>
      </div>}
      {step===2&&<>
        <div style={{fontWeight:600,marginBottom:16}}>Role Assignment</div>
        <div style={{display:'flex',gap:10,marginBottom:16}}>
          {['default','existing','new'].map(m=><button key={m} onClick={()=>setRoleMode(m)} style={{padding:'6px 14px',borderRadius:6,border:'1px solid '+(roleMode===m?'#3b82f6':dark?'#ffffff18':'#e2e8f0'),background:roleMode===m?'#3b82f6':'transparent',color:roleMode===m?'#fff':dark?'#94a3b8':'#4a5568',cursor:'pointer',fontSize:12}}>{m==='default'?'Default Role':m==='existing'?'Existing Role':'Create New'}</button>)}
        </div>
        {roleMode==='existing'&&<select style={{...st.select,width:'100%',maxWidth:300}}><option>Admin</option><option>Customer</option><option>Viewer</option><option>Fleet Manager</option></select>}
        {roleMode==='default'&&<div style={{background:dark?'#0f1117':'#f8fafc',borderRadius:8,padding:12,fontSize:12.5}}>Default role <strong>Viewer</strong> will be assigned.</div>}
        {roleMode==='new'&&<div style={st.grid(2)}><div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Role Name</label><input style={st.input} placeholder="Site Manager"/></div><div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Permissions</label><select style={{...st.select,width:'100%'}}><option>Read Only</option><option>Operator</option><option>Admin</option></select></div></div>}
      </>}
      {step===3&&<div style={{background:dark?'#0f1117':'#f8fafc',borderRadius:8,padding:16,fontSize:12.5}}><p>Name: <strong>John Doe</strong></p><p>Email: <strong>john@company.com</strong></p><p>Org: <strong>Org Alpha</strong></p><p>Role: <strong>{roleMode==='new'?'New Role':'Customer'}</strong></p></div>}
      <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
        <Btn variant="ghost" onClick={()=>step>1?setStep(s=>s-1):nav('users')}>Back</Btn>
        {step<3?<Btn onClick={()=>setStep(s=>s+1)}>Next</Btn>:<Btn variant="success" onClick={()=>nav('users')}>Create User</Btn>}
      </div>
    </Card>
  </div>);
}
export function OrgManagement() {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab,setTab]=useState('orgs');
  return (<div>
    <PageHeader title="Organization Management" crumbs={['Home','Organizations']} actions={[<Btn key="a">+ Add Org</Btn>]}/>
    <div style={{display:'flex',borderBottom:'1px solid '+(dark?'#ffffff10':'#e2e8f0'),marginBottom:16}}>
      {['orgs','customers','settings'].map(t=><button key={t} style={st.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
    </div>
    {tab==='orgs'&&<div style={st.grid(3)}>{ORGS.map(o=><Card key={o.id} style={{cursor:'pointer'}}><div style={{fontWeight:600,fontSize:14,marginBottom:8}}>{o.name}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{[['Customers',o.customers],['Devices',o.devices],['Users',o.users],['Plan',o.plan]].map(([k,v])=><div key={k} style={{fontSize:12}}><span style={{color:'#64748b'}}>{k}: </span><strong>{v}</strong></div>)}</div><div style={{marginTop:10}}><span style={styles(dark).badge('#10b981')}>{o.status}</span></div></Card>)}</div>}
    {tab==='customers'&&<Card><DataTable cols={[
      {key:'name',label:'Customer'},{key:'org',label:'Organization'},{key:'devices',label:'Devices'},{key:'users',label:'Users'},
      {key:'status',label:'Status',render:v=><span style={styles(dark).badge('#10b981')}>{v}</span>}
    ]} rows={[
      {name:'Acme Corp',org:'Org Alpha',devices:9,users:3,status:'Active'},
      {name:'GlobalTech',org:'Org Beta',devices:8,users:2,status:'Active'},
      {name:'IndustrialCo',org:'Org Alpha',devices:7,users:1,status:'Active'},
      {name:'SmartFactory',org:'Org Gamma',devices:6,users:2,status:'Active'}
    ]}/></Card>}
    {tab==='settings'&&<Card><div style={{fontWeight:600,marginBottom:16}}>Settings</div>{[['Timezone','UTC+0'],['Session Timeout','30 min'],['MFA','Enabled'],['Data Retention','90 days']].map(([k,v])=><div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9'),fontSize:12.5}}><span style={{color:'#64748b'}}>{k}</span><strong>{v}</strong></div>)}<div style={{marginTop:16}}><Btn>Save Settings</Btn></div></Card>}
  </div>);
}