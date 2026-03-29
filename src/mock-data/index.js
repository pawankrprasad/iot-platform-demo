export const DEVICES = Array.from({length:24},(_,i)=>({
  id:'DEV-'+(1000+i), serial:'SN'+(100000+i),
  model:['EdgeNode X1','SensorPro 200','GatewayMax 3','MeshLink V2'][i%4],
  brand:['Bosch','Siemens','Honeywell','ABB'][i%4],
  status:i%5===0?'Offline':i%7===0?'Warning':'Online',
  customer:['Acme Corp','GlobalTech','IndustrialCo','SmartFactory'][i%4],
  org:['Org Alpha','Org Beta','Org Gamma'][i%3],
  location:['Floor 1','Floor 2','Warehouse A','Site B'][i%4],
  lastSeen:i%5===0?'2h ago':(i+1)+'m ago',
  firmware:'v2.'+(i%4)+'.'+(i%3), ip:'192.168.1.'+(100+i),
}));
export const ALERTS = Array.from({length:18},(_,i)=>({
  id:'ALT-'+(200+i),
  device:DEVICES[i%DEVICES.length].id,
  severity:['Critical','High','Medium','Low'][i%4],
  message:['High CPU usage','Memory threshold exceeded','Connection lost','Firmware outdated','Disk space low'][i%5],
  time:(i+1)+'h ago', status:i%3===0?'Resolved':'Active',
}));
export const USERS=[
  {id:1,name:'Alice Johnson',email:'alice@acme.com',role:'Admin',org:'Org Alpha',status:'Active',lastLogin:'2h ago'},
  {id:2,name:'Bob Smith',email:'bob@globaltech.com',role:'Customer',org:'Org Beta',status:'Active',lastLogin:'1d ago'},
  {id:3,name:'Carol White',email:'carol@ind.com',role:'Viewer',org:'Org Gamma',status:'Inactive',lastLogin:'5d ago'},
  {id:4,name:'David Lee',email:'david@smart.com',role:'Admin',org:'Org Alpha',status:'Active',lastLogin:'30m ago'},
  {id:5,name:'Eva Martinez',email:'eva@acme.com',role:'Customer',org:'Org Beta',status:'Active',lastLogin:'3h ago'},
];
export const ORGS=[
  {id:1,name:'Org Alpha',customers:3,devices:9,users:4,plan:'Enterprise',status:'Active'},
  {id:2,name:'Org Beta',customers:2,devices:8,users:3,plan:'Pro',status:'Active'},
  {id:3,name:'Org Gamma',customers:1,devices:7,users:2,plan:'Starter',status:'Active'},
];
export const FILES=[
  {id:1,name:'firmware_v3.2.bin',category:'Firmware',size:'4.2 MB',version:'3.2',uploaded:'2d ago',status:'Active'},
  {id:2,name:'config_production.json',category:'Config',size:'12 KB',version:'1.5',uploaded:'5d ago',status:'Active'},
  {id:3,name:'menu_v2.xml',category:'Menu',size:'340 KB',version:'2.0',uploaded:'1w ago',status:'Active'},
  {id:4,name:'media_pack_q1.zip',category:'Media',size:'120 MB',version:'1.0',uploaded:'2w ago',status:'Active'},
  {id:5,name:'app_installer_2.1.apk',category:'Software',size:'28 MB',version:'2.1',uploaded:'3d ago',status:'Active'},
];
export const REPORTS=[
  {id:1,name:'Monthly Device Report',type:'Device Status',generated:'Today',format:'PDF',status:'Ready'},
  {id:2,name:'Alert Summary Q1',type:'Alerts',generated:'Yesterday',format:'CSV',status:'Ready'},
  {id:3,name:'Fleet Performance',type:'Performance',generated:'3d ago',format:'PDF',status:'Ready'},
];
export const telemetryData=Array.from({length:12},(_,i)=>({time:(8+i)+':00',cpu:30+Math.random()*40,memory:40+Math.random()*30,network:20+Math.random()*50}));
export const alertFreqData=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>({day:d,Critical:Math.floor(Math.random()*8),High:Math.floor(Math.random()*12),Medium:Math.floor(Math.random()*15),Low:Math.floor(Math.random()*20)}));
export const connTrendData=Array.from({length:7},(_,i)=>({day:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],online:16+Math.floor(Math.random()*5),offline:2+Math.floor(Math.random()*3)}));