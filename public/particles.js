window.createParticleEffect = function(pos,config){
  console.log('createParticleEffect has been called.');
  
  let posString = `${pos.x} ${pos.y} ${pos.z}`;
  
  if(config.type=='magic'){
    console.log('creating magic particles');
    let e = document.createElement('a-entity');

    e.setAttribute('position',posString);
    e.setAttribute('scale','2 1 2');
    let p1 = document.createElement('a-entity');
    let p2 = document.createElement('a-entity');
    let p3 = document.createElement('a-entity');


    p1.setAttribute('particleplayer',`src: #particlesOrbJson; img: #starTex; dur: 2000; count: 40%; scale: ${config.scale}; pscale: 9; interpolate: false; shader: standard; poolSize: 1; loop: false`);
    p2.setAttribute('particleplayer',`color:${config.color}; src: #particlesEnergyJson; img: #energyTex; dur: 2000; count: 100%; scale: ${config.scale}; pscale: 12; interpolate: false; shader: standard; poolSize: 1; loop: false;`);
    p3.setAttribute('particleplayer',`src: #particlesDustJson; img: #dustTex; dur: 2000; count: 100%; scale: ${config.scale}; pscale: 1; interpolate: false; shader: standard; poolSize: 1; loop: false; color: #aaf`);

    e.appendChild(p1);
    e.appendChild(p2);
    e.appendChild(p3);

    window.scene.appendChild(e);
    // setTimeout(()=>{
    //   e.remove();
    // },2500);
    
  }
}