window.collectibles = [];
let collectibleDefs = window.config.collectibles.itemDefs;
let collectiblesAreSet = false;
window.setCollectibles = ()=>{
  
  let scene = document.querySelector('a-scene');
  
  collectibleDefs.forEach((def,index)=>{
    
    for(let i=0; i<def.positions.length; i++){
      
      let col = document.createElement('a-entity');
      col.id = 'col'+Math.random().toFixed(4).toString().replace('.','');
      col.setAttribute('type',def.type);
      col.setAttribute('gltf-model',`url(${def.url})`);
      col.setAttribute('scale',def.scale || '1 1 1');
      col.setAttribute('position',def.positions[i]);
      col.particleEffect = def.collectParticles;
      setTimeout(()=>{col.object3D.position.y += 0.5*col.getAttribute('scale').x;},2000);
      col.setAttribute('rotation', def.rotation || '0 0 0'); 
      if(typeof def.collectSound != 'undefined'){
        let s1 = document.createElement('a-sound');
        s1.setAttribute('src',`src:url(${def.collectSound.url})`);
        s1.setAttribute('volume', def.collectSound.volume || 1);
        col.appendChild(s1);
      }
      if(typeof def.objectSound != 'undefined'){
        let s2 = document.createElement('a-sound');
        s2.setAttribute('src',`src:url(${def.objectSound.url})`);
        s2.setAttribute('autoplay', def.objectSound.autoplay || true);
        s2.setAttribute('loop', def.objectSound.loop || true);
        s2.setAttribute('volume', def.objectSound.volume || 1);
        col.appendChild(s2);
      }  
      if(typeof def.callback != 'undefined'){
        col.callback = def.callback;
      }
      if(typeof def.threshold != 'undefined'){
        col.threshold = def.threshold;
      }else{
        col.threshold = 1;
      }
      if(typeof def.animation != 'undefined'){
        switch(def.animation){
          case 'custom': col.setAttribute('animation-mixer','')
            break;
          default:
            let q = document.createElement('a-animation');
            q.setAttribute('attribute','rotation');
            q.setAttribute('from','0 0 0');
            q.setAttribute('to','0 360 0');
            q.setAttribute('direction','forward');
            q.setAttribute('dur','3000');
            q.setAttribute('repeat','indefinite');
            q.setAttribute('easing','linear');
            col.appendChild(q);                       
        }
      }
      scene.appendChild(col);
      window.collectibles.push(col);
      
    
    }  
    collectiblesAreSet = true;
  });
  
}

window.socket.on('request-for-collectibles',()=>{
    if(collectiblesAreSet){
      window.socket.emit('initial-collectibles-state', window.collectibles.length);
    }else{
      let n = 0;
      for(var def in collectibleDefs){
        n+=def.positions.length;
      }
      window.socket.emit('initial-collectibles-state', n);
    }  
});


window.socket.on('update-collectible',d=>{
  if(window.gameHasBegun){
    window.collectibles[d.index].setAttribute('collector',d.collector);
    window.collectibles[d.index].setAttribute('visible',false);
    window.createParticleEffect(window.collectibles[d.index].getAttribute('position'),window.collectibles[d.index].particleEffect);
    if(window.collectibles[d.index].querySelectorAll('a-sound')[1])
      window.collectibles[d.index].querySelectorAll('a-sound')[1].components.sound.stopSound();
    window.collectibles[d.index].querySelectorAll('a-sound')[0].components.sound.playSound();
    if(window.socket.id == d.collector){
      console.log(`You collected a ${window.collectibles[d.index].getAttribute('type')}!`);
    }else{
      let name = window.otherPlayers[d.collector].name;
      console.log(`${name} collected a ${window.collectibles[d.index].getAttribute('type')}!`);
    }
    let callback = window.collectibles[d.index].callback;
    if(callback && callback.name){
      window[callback.name](d.collector,callback.params);
    }
  }
});

// update of single collectible when notified by server
window.updateCollectible = (d)=>{
  if(Object.keys(window.collectibles).length === 0 || !window.gameHasBegun) return;
   let col = window.collectibles[d.index];
   alert(`${d.collector} got a ${d.getAttribute('type')}!`);
   if(window.debug){
    console.log('Individual collectible data from server:');
    console.log(d);
   } 
}
//window.bodies[name].querySelector('a-sound').components.sound.playSound();
// periodic check if player collects an item
setInterval(()=>{
  let r = collectionMade();
  if(r){
    window.socket.emit('request-collection',r);
  }
},100);

//
function collectionMade(){
  let result = false
  window.collectibles.forEach( (c,index)=>{
    if(!c.getAttribute('visible'))return;
    if(window.player.object3D.position.distanceTo(c.object3D.position) < c.threshold){
      result = {index:index}
    }
  });
  return result;//false or {}
}
