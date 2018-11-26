window.config = {
 gameName:"Doge Coin",
 // https://emojipedia.org/  leave as "" if you want no emoji
 emoji:"🐕",
 // https://www141.lunapic.com/editor/  http://icoconvert.com/
 favicon:"https://cdn.glitch.com/38098e30-bf12-4ed8-ba20-d2f4ba8f65a8%2Fcoin.gif?1543018269225",
 theme:{
  // https://fonts.google.com/ examples: Kirang Haerang, Megrim, Permanent Marker, Orbitron, Monoton
  fontFamily:"New Rocker",
  fontColor:"#bc6e07",
  formColor:"#f7d85d",
  overlayColor:"rgba(79, 177, 242, 0.8)",
  fontSize:2
 },
 avatar:{
  models:[
    {
      url:"https://cdn.glitch.com/d9ff495e-24db-4a3f-b88d-05ddd4e02632%2Fdragon_orange.glb?1543069720785",
      scale:0.62, yOffset:-1.3,
      animations:{idle:"Dragon_Flying"},
      msg:{color: 'orange',offset: '0 2 -0.51'},
      thruster:{innerColor: "orange",outerColor: "white"}
    },
    {
      url:"https://cdn.glitch.com/d9ff495e-24db-4a3f-b88d-05ddd4e02632%2Fdragon_blue.glb?1543070759125",
      scale:0.62, yOffset:-1.3,
      animations:{idle:"Dragon_Flying"},
      msg:{color: 'blue',offset: '0 2 -0.51'},
      thruster:{innerColor: "blue",outerColor: "white"}
    },
    {
      url:"https://cdn.glitch.com/38098e30-bf12-4ed8-ba20-d2f4ba8f65a8%2FDragon_eyes.glb?1543064526277",
      scale:0.62, yOffset:-1.3,
      animations:{idle:"Dragon_Flying"},
      msg:{color: 'black',offset: '0 2 -0.51'},
      thruster:{innerColor: "black",outerColor: "white"}
    } 
    ],
  buttonFaces: [
    "https://cdn.glitch.com/d9ff495e-24db-4a3f-b88d-05ddd4e02632%2Fdragon_orange.png?1543070170738",
    "https://cdn.glitch.com/d9ff495e-24db-4a3f-b88d-05ddd4e02632%2Fdragon_blue.png?1543070754969",
    "https://cdn.glitch.com/38098e30-bf12-4ed8-ba20-d2f4ba8f65a8%2Fdragon.png?1543064467876",
  ],
  buttonColor: '#fff',
  speed: 140
 },
 sounds:{
  playerJoined: {url:'https://cdn.glitch.com/264357be-a97e-43ca-8194-b6020c6fd45e%2Fdoorbell.mp3'},
  playerLeft: {url:'https://cdn.glitch.com/3294c4a3-a3d8-412f-a31e-1e03d1cd1cbd%2Fplayer-leave.mp3?1532440646173'},
  yay: {url:'https://cdn.glitch.com/162b879e-fd42-40d9-8519-671d783b8c70%2Fyay.mp3?1538839840045',loop:false,volume:0.8}
 },
 // https://github.com/feiss/aframe-environment-component
 environment:{
  preset:"default",
  seed:0.3,
  shadow:true,
  playArea:1, 
  shadow:true,
  shadowSize:10,
  dressing:"",
  dressingAmount:10, 
  dressingColor:"",
  dressingScale:15,
  dressingVariance:"20 30 40",
  dressingUniformScale:false,
  fog:0, 
  flatShading:false,
  skyType:"", 
  horizonColor:"", 
  skyColor:"",
  ground:"",
  groundYScale:5,
  groundTexture:"walkernoise",
  groundColor:"#04D903",
  groundColor2:"orange",
  grid:"",
  gridColor:"",
  lighting:"",
  lightPosition:""
 },
 //Soundcloud track numbers from share/embed code
 bgm:{
  songs: [219756899],
  volume: 0.05,
  playAll: true,
  initialDelay: 5000
 },
 releasePointerLockOnUI: true,
 //SEE REF. http://keycode.info/
 keys:{
  toggleUI:'Equal',
  nextSong:'KeyP',
  toggleMute:'Digit0',
  toggleCursor:'KeyC'
 },
 showCursor:false,
 //Run printVoices() in the game browser console
 voice:{
   name:'Serena',
   // from 0.1 to 10
   rate: 1,
   // from 0 to 2
   pitch: 1,
   // from 0 to 1
   volume: 1,
   // delay in milliseconds 
   welcomeDelay: 2000
 },
 physics:{
   //This gravity affects the players
   gravity: -9.8,
   maxGrabDistance: 40,
   //These objects are not affected by gravity or collisions, but you can grab and move them
   // https://github.com/aframevr/aframe/blob/master/docs/components/geometry.md
   // These objects require a unique name.
   objects:[
      
    ]
 },
 collectibles:{
   threshold:3,
   itemDefs:[
     {type:'doge_coin',scale:'0.4 0.4 0.4',rotation:'0 0 0',
      positions:['25 0 -25','-25 0 -25','20 0 -30','-20 0 -30','15 0 -35','-15 0 -35','10 0 -40','-10 0 -40','0 0 -4'],
      url:'https://cdn.glitch.com/14597f75-728f-4d7e-bbd2-202118ee70e0%2Fdoge_coin.glb?1542836614183',
      objectSound:{url:'https://cdn.glitch.com/14597f75-728f-4d7e-bbd2-202118ee70e0%2Fdog_whine.mp3?1542837893113',volume:0.1},
      collectSound:{url:'https://cdn.glitch.com/14597f75-728f-4d7e-bbd2-202118ee70e0%2Fcollect_bark_.mp3?1542837713162',volume:1},
      collectParticles:{type:'magic',color:'#fff',scale:4},
      callback:'addPoint',animation:'rotY'
     }  
   ]
 },
 readouts:{
   itemDefs:[
     {type:'scoreboard',scale:'16 10 0.1',color:'#1f7020',
      positions:['0 14 -24','-8 14 -32','0 14 -40','8 14 -32'],
      rotations:['0 0 0','0 270 0','0 180 0','0 90 0'],
      textAttributes:{value:'Welcome to\nDoge Coin',color:'orange',scale:'9 9 1',align:'center',shader:'msdf',
                      position:'0 -1.5 0',
                      font:'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/newrocker/NewRocker-Regular.json'}
     },
     {type:'instructions',scale:'2.65 1.5 0.1',color:'#a80003',
      positions:['1 2.5 -27.2'],
      rotations:['0 0 0'],
      textAttributes:{value:
`Doge Coin Game Instructions:
=========================
1) Collect Doge Coins
2) Be Friendly!`,color:'white',scale:'0.7 0.7 1',align:'left',shader:'msdf',
                      position:'-1.2 0 0',
                      font:'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/newrocker/NewRocker-Regular.json'}
     }  
   ]
 },
 mobile:{
   thruster_icon: "https://cdn.glitch.com/162b879e-fd42-40d9-8519-671d783b8c70%2Fjump_fly_btn.png",
   joystick_outer_color: "rgba(5, 31, 101, 0.2)",
   joystick_inner_color: "rgba(5, 31, 101, 0.4)"
 },
 vr: false
}