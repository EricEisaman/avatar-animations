let title = document.querySelector('title');
title.innerHTML=`${window.config.gameName} ${window.config.emoji}`;
if(window.config.favicon.length > 0){
  let link = document.createElement('link');
  link.rel = 'icon';
  link.href = window.config.favicon;
  document.querySelector('head').appendChild(link);
}
window.environment = document.querySelector('#environment');
Object.keys(window.config.environment).forEach(key=>{
  if(!window.config.environment[key].length)return;
  window.environment.setAttribute('environment',`${key}:${window.config.environment[key]}`);
});

window.debug = false;
window.gameHasBegun = false;


window.setCustomPhysics();
window.setCollectibles();
window.setReadouts();


document.querySelector('a-scene').addEventListener('loaded', function () {
  
  //var element = document.querySelector('#some-id');
  window.scene = document.querySelector('a-scene');
  window.scene.setAttribute('vr-mode-ui',`enabled: ${window.config.vr}`);
  
  var player = document.querySelector('#player');
  window.player = player;
  player.setAttribute('universal-controls',`movementAcceleration: ${window.config.avatar.speed}`)
  player.components.camera.system.updateProperties();
  setTimeout(()=>{player.pause()},600);
  window.login = document.querySelector('#login');
  document.querySelector('#loading-screen').style.display = 'none';
  document.querySelector('#container').style.display = 'block';
  
  /* Start Things Going After the Scene is Loaded and Login Complete
 ————————————————————————————————————————————————————————————————*/
  window.startGame = ()=>{
  window.login.style.display = "none";
   
  window.gameHasBegun = true;
  window.sounds.playerJoined.play();
  player.play();
  
  let playerData = {};
  let pos = player.getAttribute('position');
  pos.x = Number(pos.x.toFixed(2));
  pos.y = Number(pos.y.toFixed(2));
  pos.z = Number(pos.z.toFixed(2));
  playerData.position = pos;
  let rot = player.getAttribute('rotation');
  rot.x = Number(Number(rot.x).toFixed(1));
  rot.y = Number(Number(rot.y).toFixed(1));
  rot.z = Number(Number(rot.z).toFixed(1));
  playerData.rotation = rot;
  playerData.thrust = false;
  window.socket.initializePlayerData(playerData);
  
  window.setPlayerProperty = (prop,val)=>{
    window.socket.playerData[prop] = val;
  }
  
  window.otherPlayers = {};
  window.addOtherPlayer = newPlayerObject=>{
    console.log(`Adding new player with id: ${newPlayerObject.id}`)
    console.log(newPlayerObject);
    console.log(newPlayerObject.data);
    let p = document.createElement('a-entity');
    p.faceIndex = newPlayerObject.data.faceIndex;
    let c = window.config.avatar.models[newPlayerObject.data.faceIndex];
    let model = document.createElement('a-entity');
    model.setAttribute('animation-mixer',`clip:${c.animations.idle}`);
    model.setAttribute('gltf-model',`url(${c.url})`);
    model.setAttribute('position',`0 ${c.yOffset} 0`);
    model.setAttribute('scale',`${c.scale} ${c.scale} ${c.scale}`);
    model.setAttribute('rotation','0 180 0');
    p.model = model;
    p.appendChild(model);
    p.id = newPlayerObject.id;
    p.name = newPlayerObject.name;
    p.setAttribute('position',newPlayerObject.data.position);
    p.setAttribute('rotation',newPlayerObject.data.rotation);
    p.setAttribute('scale','1 1 1');
    p.msg = document.createElement('a-entity');
    let test = `Hello\nI am\n${newPlayerObject.name}!`;
    p.msg.setAttribute('text',`value:${test};
                                   align:center;
                                   width:8;
                                   wrap-count:24; 
                                   color:${c.msg.color}`);
    p.msg.setAttribute('position',`${c.msg.offset}`);
    p.msg.setAttribute('rotation','0 180 0');
    p.appendChild(p.msg);
    window.addThruster(p);
    window.scene.appendChild(p);
    window.otherPlayers[p.id]=p;
    window.sounds.playerJoined.play();
  }
  
  window.updateOtherPlayers = o=>{
    Object.keys(o).forEach(function(key,index) {
      if(key != player.id){
        if(window.otherPlayers[key]){
          let c = window.config.avatar.models[o[key].faceIndex];
          let op = window.otherPlayers[key];
          if(op.faceIndex != o[key].faceIndex){
            op.faceIndex = o[key].faceIndex;
            window.updateThruster(op);
          }
          op.faceIndex = o[key].faceIndex;
          op.setAttribute('position',o[key].position);
          op.setAttribute('rotation',o[key].rotation);
          op.model.setAttribute('gltf-model',`url(${c.url})`);
          op.model.setAttribute('scale',`${c.scale} ${c.scale} ${c.scale}`);
          op.msg.setAttribute('text',`color:${c.msg.color}`)
          op.thruster.setAttribute('visible',o[key].thrust);
        }
      }
    });
  }
  
  window.removePlayer = id=>{
 window.otherPlayers[id].parentNode.removeChild(window.otherPlayers[id]);
    delete window.otherPlayers[id]; 
    window.sounds.playerLeft.play();
  }
  
  window.setPlayerMessage = data=>{
    if(window.otherPlayers[data.id]){
     let c = window.config.avatar.models[window.otherPlayers[data.id].faceIndex];
     window.otherPlayers[data.id].msg.setAttribute('text',`value:${data.msg};
    align:center;width:8;wrap-count:24;color:${c.msg.color}`);
    }
  }
  
  var totalTime = 0;
  var totalSteps = 0;
  //GAME WORLD UPDATE FUNCTION
  function update(dt){
    totalTime += dt;
    totalSteps++;
    if(player.object3D.position.y < 0.8){
        let x = player.object3D.position.x;
        let z = player.object3D.position.z;
        player.body.el.setAttribute("position",`${x} 1.8 ${z}`);
        player.body.el.setAttribute("velocity","0 0 0");
      }
    if(totalSteps%6 == 0) {
      let playerData = {};
      let pos = player.getAttribute('position');
      pos.x = Number(pos.x.toFixed(2));
      pos.y = Number(pos.y.toFixed(2));
      pos.z = Number(pos.z.toFixed(2));
      playerData.position = pos;
      let rot = player.getAttribute('rotation');
      rot.x = Number(Number(rot.x).toFixed(1));
      rot.y = Number(Number(rot.y).toFixed(1));
      rot.z = Number(Number(rot.z).toFixed(1));
      playerData.rotation = rot;
      playerData.faceIndex = window.socket.playerData.faceIndex;
      playerData.thrust = player.isThrusting;
      if(window.socket.isInitialized)
        window.socket.setPlayerData(playerData);
      else
        window.socket.initializePlayerData(playerData);
      window.socket.sendUpdateToServer();
    }
    
  }
  //GAME LOOP
  var frameRate = 1000/60;
  var lastFrame = 0;
  var startTime = 0;
  var currentFrame;
  function gameLoop(time){  
    // time in ms accurate to 1 micro second 1/1,000,000th second
      currentFrame = Math.round((time - startTime) / frameRate);
      var deltaTime = (currentFrame - lastFrame) * frameRate;
      update(deltaTime);
      lastFrame = currentFrame;
      requestAnimationFrame(gameLoop);
    }
  window.requestAnimationFrame(gameLoop);
  
  
  
  document.body.addEventListener('keydown',e=>{
    if(e.keyCode == 32){
      player.isThrusting = true;
    }
  });
  document.body.addEventListener('keyup',e=>{
    player.isThrusting = false;
  })
  
  
  
  
  
  }
  

});