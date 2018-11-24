window.readouts = {};
let readoutDefs = window.config.readouts.itemDefs;

window.setReadouts = ()=>{
  
  let scene = document.querySelector('a-scene');
  
  readoutDefs.forEach((def,index)=>{
    window.readouts[def.type] = [];
    for(let i=0; i<def.positions.length; i++){
      let r = document.createElement('a-entity');
      let b = document.createElement('a-box');
      let t = document.createElement('a-text');
      b.setAttribute('color',def.color);
      r.setAttribute('type',def.type);
      r.setAttribute('position',def.positions[i]);
      r.setAttribute('rotation',def.rotations[i]);
      t.setAttribute('z-offset',0.1);
      b.setAttribute('scale',def.scale);
      Object.keys(def.textAttributes).forEach(key=>{
        t.setAttribute(key,def.textAttributes[key]);
      });
      r.appendChild(b);
      r.appendChild(t);
      scene.appendChild(r);
      window.readouts[def.type].push(r);
    }
    
  });
  
}

window.setReadout = (type,value)=>{
 window.readouts[type].forEach(r=>{
   r.querySelector('a-text').setAttribute('value',value);
 });
}