import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader, SearchBar, Stepper } from '../components';
import { DEVICES, telemetryData } from '../mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AssetManagement({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [search,setSearch]=useState('');
  const filtered=DEVICES.filter(d=>d.id.includes(search)||d.model.toLowerCase().includes(search.toLowerCase())||d.customer.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <PageHeader title="Asset Management" sub="Device inventory and lifecycle management" crumbs={['Home','Asset Management']}
        actions={[<Btn key="e" variant="ghost">Export CSV</Btn>,<Btn key="a" onClick={()=>nav('add-device')}>+ Add Device</Btn>]}/>
      <Card>
        <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap'}}>
          <SearchBar placeholder="Search devices..." value={search} onChange={setSearch}/>
          <select style={st.select}><option>All Status</option><option>Online</option><option>Offline</option></select>
          <select style={st.select}><option>All Brands</option><option>Bosch</option><option>Siemens</option></select>
        </div>
        <DataTable cols={[
          {key:'id',label:'Device ID'},{key:'serial',label:'Serial'},{key:'model',label:'Model'},{key:'brand',label:'Brand'},
          {key:'status',label:'Status',render:v=><span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span>},
          {key:'customer',label:'Customer'},{key:'org',label:'Organization'},{key:'location',label:'Location'},{key:'firmware',label:'Firmware'},{key:'lastSeen',label:'Last Seen'}
        ]} rows={filtered} onRow={()=>nav('asset-detail')}/>
        <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center',color:'#64748b',fontSize:12}}>
          <span>Showing {filtered.length} of {DEVICES.length}</span>
          <div style={{display:'flex',gap:6}}>{[1,2,3].map(p=><button key={p} style={{padding:'4px 10px',borderRadius:4,border:'1px solid '+(dark?'#ffffff15':'#e2e8f0'),background:p===1?'#3b82f6':'transparent',color:p===1?'#fff':dark?'#94a3b8':'#4a5568',cursor:'pointer',fontSize:12}}>{p}</button>)}</div>
        </div>
      </Card>
    </div>
  );
}
export function AddDevice({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({serial:'',code:'',brand:'',model:'',location:''});
  const Field=({label,name,placeholder})=>(<div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>{label}</label><input style={st.input} placeholder={placeholder} value={form[name]||''} onChange={e=>setForm(f=>({...f,[name]:e.target.value}))}/></div>);
  return (
    <div>
      <PageHeader title="Add New Device" sub="Register a device" crumbs={['Home','Assets','Add Device']} actions={[<Btn key="b" variant="ghost" onClick={()=>nav('assets')}>Cancel</Btn>]}/>
      <Stepper steps={['Device Info','Assignment','Configuration','Review']} current={step}/>
      <Card>
        {step===1&&<div style={st.grid(2)}><Field label="Serial Number" name="serial" placeholder="SN123456"/><Field label="Device Code" name="code" placeholder="EDG-001"/><Field label="Brand" name="brand" placeholder="Bosch"/><Field label="Model" name="model" placeholder="EdgeNode X1"/></div>}
        {step===2&&<div style={st.grid(2)}>
          <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Organization</label><select style={{...st.select,width:'100%'}}><option>Org Alpha</option><option>Org Beta</option></select></div>
          <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Customer</label><select style={{...st.select,width:'100%'}}><option>Acme Corp</option><option>GlobalTech</option></select></div>
          <Field label="Location" name="location" placeholder="Floor 1"/>
          <div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Fleet</label><select style={{...st.select,width:'100%'}}><option>Fleet A</option><option>Fleet B</option></select></div>
        </div>}
        {step===3&&<div style={st.grid(2)}><div><label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:4}}>Firmware</label><select style={{...st.select,width:'100%'}}><option>v3.2 (latest)</option><option>v3.1</option></select></div><Field label="Tags" name="tags" placeholder="production, floor1"/></div>}
        {step===4&&<div style={{background:dark?'#0f1117':'#f8fafc',borderRadius:8,padding:16,fontSize:12.5}}>{Object.entries(form).map(([k,v])=>v&&<p key={k}><span style={{color:'#64748b'}}>{k}: </span><strong>{v}</strong></p>)}</div>}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
          <Btn variant="ghost" onClick={()=>step>1?setStep(s=>s-1):nav('assets')}>Back</Btn>
          {step<4?<Btn onClick={()=>setStep(s=>s+1)}>Next</Btn>:<Btn variant="success" onClick={()=>nav('assets')}>Register Device</Btn>}
        </div>
      </Card>
    </div>
  );
}
export function AssetDetail({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab,setTab]=useState('info');
  const d=DEVICES[0];
  return (
    <div>
      <PageHeader title={d.id} sub={d.model+' · '+d.brand} crumbs={['Home','Assets',d.id]}
        actions={[<Btn key="e" variant="ghost">Edit</Btn>,<Btn key="b" variant="ghost" onClick={()=>nav('assets')}>Back</Btn>]}/>
      <div style={{display:'flex',gap:10,marginBottom:16}}>
        <span style={styles(dark).badge(styles(dark).statusColor[d.status])}>{d.status}</span>
        <span style={styles(dark).badge('#3b82f6')}>{d.org}</span>
        <span style={styles(dark).badge('#8b5cf6')}>{d.customer}</span>
      </div>
      <div style={{display:'flex',borderBottom:'1px solid '+(dark?'#ffffff10':'#e2e8f0'),marginBottom:16}}>
        {['info','telemetry','logs','configuration','history'].map(t=><button key={t} style={st.tab(tab===t)} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
      </div>
      {tab==='info'&&<div style={st.grid(2)}>
        <Card><div style={{fontWeight:600,marginBottom:12}}>Device Info</div>{[['ID',d.id],['Serial',d.serial],['Model',d.model],['Brand',d.brand],['Firmware',d.firmware],['IP',d.ip],['Location',d.location]].map(([k,v])=><div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid '+(dark?'#ffffff06':'#f8fafc'),fontSize:12.5}}><span style={{color:'#64748b'}}>{k}</span><strong>{v}</strong></div>)}</Card>
        <Card><div style={{fontWeight:600,marginBottom:12}}>Assignment</div>{[['Org',d.org],['Customer',d.customer],['Fleet','Fleet A'],['Tags','production, floor1']].map(([k,v])=><div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid '+(dark?'#ffffff06':'#f8fafc'),fontSize:12.5}}><span style={{color:'#64748b'}}>{k}</span><strong>{v}</strong></div>)}</Card>
      </div>}
      {tab==='telemetry'&&<Card><div style={{fontWeight:600,marginBottom:12}}>Live Telemetry</div><ResponsiveContainer width="100%" height={250}><LineChart data={telemetryData}><CartesianGrid strokeDasharray="3 3" stroke={dark?'#ffffff0a':'#f0f0f0'}/><XAxis dataKey="time" tick={{fontSize:10,fill:'#64748b'}}/><YAxis tick={{fontSize:10,fill:'#64748b'}}/><Tooltip contentStyle={{background:dark?'#1e2535':'#fff',border:'none',borderRadius:8,fontSize:11}}/><Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} name="CPU %"/><Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} dot={false} name="Memory %"/><Legend/></LineChart></ResponsiveContainer></Card>}
      {tab==='logs'&&<Card><div style={{fontWeight:600,marginBottom:12}}>Logs</div>{['Connected','Disconnected','Reconnected','Firmware updated','Config pushed'].map((e,i)=><div key={i} style={{display:'flex',gap:12,padding:'7px 0',borderBottom:'1px solid '+(dark?'#ffffff08':'#f1f5f9'),fontSize:12}}><span style={{color:'#64748b',minWidth:80}}>{i+1}h ago</span><span>{e}</span></div>)}</Card>}
      {(tab==='configuration'||tab==='history')&&<Card><div style={{padding:'30px 0',textAlign:'center',color:'#64748b'}}>No {tab} data yet.</div></Card>}
    </div>
  );
}