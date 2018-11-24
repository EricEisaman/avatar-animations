let player = window.player;
player.within = function(distance,name){
  return player.object3D.position.distanceTo(window.bodies[name].object3D.position) <= distance;
}
player.distanceTo = function(name){
  return player.object3D.position.distanceTo(window.bodies[name].object3D.position);
}
player.awayFrom = function(name,distance){
  return player.object3D.position.distanceTo(window.bodies[name].object3D.position) > distance;
}

let specificOtherPlayersAndMyselfWithin = function(distance,names){



}

let anyOtherPlayersAndMyselfWithin = function(distance,numberOfOtherPlayers){



}

let allPlayersButMyselfWithin = function(distance){



}

let allPlayersAndMyselfWithin = function(distance){


}

let bodiesWithin = function(distance,names){
  let result = true;
  names.forEach(name=>{
    names.forEach(n=>{
      if(window.bodies[name].object3D.position.distanceTo(window.bodies[n].object3D.position) > distance)
      {
        result = false;
        return;
      }
    });
  });
  return result;
 }

let stopBodySound = function(name){
  if(window.bodies[name].soundState === 0) return;
  window.bodies[name].querySelector('a-sound').components.sound.stopSound();
  //console.log("STOP BODY SOUND");
  window.bodies[name].dirty = true;
  window.bodies[name].soundState = 0;
}

let playBodySound = function(name){
  if(window.bodies[name].soundState == 1) return;
  window.bodies[name].querySelector('a-sound').components.sound.playSound();
  //console.log("PLAY BODY SOUND");
  window.bodies[name].dirty = true;
  window.bodies[name].soundState = 1;
}

let bodySoundIsPlaying = function(name){
  return window.bodies[name].soundState;
  //return window.bodies[name].querySelector('a-sound').components.sound.isPlaying;
}

let bodyHasSound = function(name){
  return window.bodies[name].querySelectorAll('a-sound').length > 0;
}



/*********************************************
/
/ User Defined Callbacks and Helper Functions
/
/*********************************************/

window.addPoint = function(playerId){
  if(window.socket.id == playerId){
   if(!player.score)player.score = 0;
   console.log(`Your Score: ${++player.score}`);
  }else{
   if(!window.otherPlayers[playerId].score)window.otherPlayers[playerId].score = 0;
   console.log(`${window.otherPlayers[playerId].name}'s Score: ${++window.otherPlayers[playerId].score}`);
  }
  window.setReadout('scoreboard',stringFromRankedPlayers(sortScores()));
}

// Lazy Naive sort
function sortScores(){
  let topId,topScore;
  let rankedPlayers = [];
  let ap = {...window.otherPlayers};
  ap[window.socket.id]={score:player.score,name:player.name,id:window.socket.id};
  for(let i=0;i<=Object.keys(window.otherPlayers).length;i++){
    topId;
    topScore = 0;
    for(var key in ap){
      if(typeof ap[key].score == "undefined")ap[key].score = 0;
      if(ap[key].score >= topScore){
        topScore = ap[key].score;
        topId = ap[key].id;
      }
    };
    window.setReadout('scoreboard',topScore);
    rankedPlayers.push(ap[topId]);
    delete ap[topId];
  }
  return rankedPlayers;
}

//Generate string with line new line characters
function stringFromRankedPlayers(rp){
  let s = '';
  rp.forEach(p=>{
    if(!s=='')s+='\n';
    s+=`${p.name}: ${p.score}`;
  });
  return s;
}








