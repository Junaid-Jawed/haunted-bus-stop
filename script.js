import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import {CatmullRomCurve3} from "three";

const scene = new T.Scene();

const camera = new T.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 17;
camera.position.y = 12;
camera.position.x=9;
scene.add(camera);

const rgbLoader=new RGBELoader();
rgbLoader.load('./assests/rogland_clear_night_4k.hdr', function(texture){
      texture.mapping = T.EquirectangularReflectionMapping;
      scene.environment=texture;
      scene.background=texture;
      scene.environmentIntensity = 0.1; // Dims the global environment map
})

//--------------------------TEXTURES________________________________
const textureloader=new T.TextureLoader();
//door
const doorc1=textureloader.load('./assests/door/Door_Wood_001_basecolor.jpg');
const doorh1=textureloader.load('./assests/door/Door_Wood_001_height.png');
const doorm1=textureloader.load('./assests/door/Door_Wood_001_metallic.jpg');
const doorn1=textureloader.load('./assests/door/Door_Wood_001_normal.jpg');
const dooralpha=textureloader.load('./assests/door/Door_Wood_001_opacity.jpg');
const doorrough1=textureloader.load('./assests/door/Door_Wood_001_roughness.jpg');
const doorao1=textureloader.load('./assests/door/Door_Wood_001_ambientOcclusion.jpg');
doorc1.colorSpace=T.SRGBColorSpace;

//ground 
const groundc1=textureloader.load('./assests/ground/textures/aerial_rocks_04_diff_1k.jpg');
const groundd1=textureloader.load('./assests/ground/textures/aerial_rocks_04_disp_1k.png')
const groundn1=textureloader.load('./assests/ground/textures/aerial_rocks_04_nor_gl_1k.jpg')
const groundao1=textureloader.load('./assests/ground/textures/aerial_rocks_04_ao_1k.jpg');
const groundr1=textureloader.load('./assests/ground/textures/aerial_rocks_04_rough_1k.jpg');
groundc1.colorSpace=T.SRGBColorSpace;
[groundc1,groundr1,groundao1,groundd1,groundn1].forEach(texture=>{
      texture.wrapS=texture.wrapT=T.RepeatWrapping;
      texture.repeat.set(5,5);
      
})
//road
const roadc1=textureloader.load('./assests/asaphalt/Road015A_1K-JPG_Color.jpg');
const roadd1=textureloader.load('./assests/asaphalt/Road015A_1K-JPG_Displacement.jpg');
const roadao1=textureloader.load('./assests/asaphalt/Road015A_1K-JPG_AmbientOcclusion.jpg');
const roadr1=textureloader.load('./assests/asaphalt/Road015A_1K-JPG_Roughness.jpg');
const roadn1=textureloader.load('./assests/asaphalt/Road015A_1K-JPG_NormalGL.jpg');
roadc1.colorSpace=T.SRGBColorSpace;
[roadc1,roadr1,roadao1,roadd1,roadn1].forEach(texture=>{
      texture.wrapS=texture.wrapT=T.RepeatWrapping;
      texture.repeat.set(1,2);

})
// walls
const wallc1=textureloader.load('./assests/walls/textures/damaged_plaster_diff_1k.jpg');
const wallr1=textureloader.load('./assests/walls/textures/damaged_plaster_rough_1k.jpg');
const walld1=textureloader.load('./assests/walls/textures/Screenshot 2026-05-29 180319.png');
const wallao1=textureloader.load('./assests/walls/textures/damaged_plaster_ao_1k.jpg');
const walln1=textureloader.load('./assests/walls/textures/damaged_plaster_nor_gl_1k.jpg');
wallc1.colorSpace=T.SRGBColorSpace;
[wallc1,wallr1,wallao1,walld1,walln1].forEach(texture=>{
      texture.wrapS=texture.wrapT=T.RepeatWrapping;
      texture.repeat.set(1,1);  
      texture.magFilter=T.NearestFilter;

})
// roof
const roofc1=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_Color.jpg');
const roofd1=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_Displacement.jpg')
const roofn1=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_NormalGL.jpg')
const roofao1=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_AmbientOcclusion.jpg')
const roofalpha=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_Opacity.jpg')
const roofr1=textureloader.load('./assests/roof/RoofingTiles014C_1K-JPG_Roughness.jpg')
roofc1.colorSpace=T.SRGBColorSpace;
[roofc1,roofr1,roofao1,roofd1,roofn1,roofalpha].forEach(texture=>{
      texture.wrapS=texture.wrapT=T.RepeatWrapping;
      texture.repeat.set(4,1); 
      texture.magFilter=T.NearestFilter;

})
//metal
const metalc1=textureloader.load('./assests/metal/Metal062C_1K-JPG_Color.jpg')
const metalm1=textureloader.load('./assests/metal/Metal062C_1K-JPG_Metalness.jpg')
const metaln1=textureloader.load('./assests/metal/Metal062C_1K-JPG_NormalGL.jpg')
metalc1.colorSpace=T.SRGBColorSpace;
const metalr1=textureloader.load('./assests/metal/Metal062C_1K-JPG_Roughness.jpg');

      [metalc1,metalr1,metalm1,metaln1].forEach(texture=>{
      texture.wrapS=texture.wrapT=T.RepeatWrapping;
       
      texture.minFilter=T.NearestFilter;

})


//---------------------floor-----------------------
const floor = new T.Mesh(
      new T.PlaneGeometry(20, 20, 50, 50),
      new T.MeshStandardMaterial({
            
            normalMap:groundn1,
            map:groundc1,
            displacementMap:groundd1,
            displacementScale:0.5,
            aoMap:groundao1,
            roughnessMap:groundr1,
            roughness:1,
            side: T.DoubleSide,
            aoMapIntensity:2
      })
) 
floor.geometry.computeVertexNormals();
floor.geometry.setAttribute('uv2', floor.geometry.attributes.uv.clone());
  
floor.rotation.x = Math.PI / 2;
floor.position.y=0.11;
scene.add(floor);
//----------------------------------------------------

// -----------------------------ROAD------------------------------
const road = new T.Group();
const track = new T.Mesh(
      new T.PlaneGeometry(4, 20,50,50),
      new T.MeshStandardMaterial({
            map:roadc1,
            normalMap:roadn1,
            displacementMap:roadd1,
            displacementScale:0.5,
            aoMap:roadao1,
            roughnessMap:roadr1, 
            roughness:1,
            side: T.DoubleSide,
            aoMapIntensity:5,
            
      })
)
track.position.z = -0.4;
road.add(track);
road.rotation.x = Math.PI / 2;
road.position.x = 2;
scene.add(road);


const stripes = new T.Mesh(
      new T.PlaneGeometry(0.2,20),
      new T.MeshStandardMaterial({
            color:'yellow',
            side:T.DoubleSide
      })
) 
stripes.position.z=-0.08
road.add(stripes);
//------------------------------------------------------------------------



//------------------------------HOUSE------------------------------------
const house=new T.Group();
const walls=new T.Mesh(
      new T.BoxGeometry(3,2,3,90,90,90),
      new T.MeshStandardMaterial({ 
            map:wallc1,
            normalMap:walln1, 
            displacementMap:walld1,
            displacementScale:0.1,
            roughnessMap:wallr1,
            roughness:1,
            aoMap:wallao1,
            aoMapIntensity:1.5
      })
)
walls.position.y=1; 
walls.position.x=-3.5;
house.add(walls); 

const roof=new T.Mesh(
      new T.ConeGeometry(2.4 ,1,4,),
      new T.MeshStandardMaterial({
            map:roofc1,
            transparent:true,
            alphaMap:roofalpha,
            displacementMap:roofd1,
            displacementScale:0.05 ,
            normalMap:roofn1,
            aoMap:roofalpha,
            aoMapIntensity:8,
            roughnessMap:roofr1,
            roughness:1
      })
)
roof.scale.set(1.1,1.1,1.1)
roof.geometry.computeVertexNormals(); 
roof.geometry.setAttribute('uv2', roof.geometry.attributes.uv.clone());
roof.rotation.y=Math.PI/4;
roof.position.set(-3.5    ,2.5 ,0)
house.add(roof);
// 1. Make sure your texture settings are explicitly correct
doorc1.wrapS = T.RepeatWrapping;
doorc1.wrapT = T.RepeatWrapping;

doorao1.wrapS = T.RepeatWrapping;
doorao1.wrapT = T.RepeatWrapping;

const door = new T.Mesh(
      new T.PlaneGeometry(2, 2, 32, 32), // Rein bumped this to 32x32 so displacement looks better!
      new T.MeshStandardMaterial({
            map: doorc1,
            alphaMap: dooralpha,
            transparent: true,
            normalMap: doorn1,
            displacementMap: doorh1,
            displacementScale: 0.05,
            roughnessMap: doorrough1,
            metalnessMap: doorm1,
            aoMap: doorao1,
            aoMapIntensity: 3.9,
            side: T.DoubleSide
      })
);


door.geometry.computeVertexNormals();
door.geometry.setAttribute('uv2', door.geometry.attributes.uv.clone());
door.rotation.y=Math.PI/2;
door.position.set(-1.93,0.83,0);
door.scale.set(0.9,0.9,0.9); 
house.add(door);
house.position.z=6.2;
house.position.x=-1;
house.scale.y=1.4;
house.scale.z=1.2;
const house2=house.clone();
house2.position.set(-1,0,0); 
scene.add(house2);

const house3=house.clone();
house3.position.set(-1,0,-6  );
scene.add(house3);

scene.add(house); 
//---------------------------------------------------------------------
 

//-----------------------------RAILS----------------------------------

const  rails=new T.Group();
const r1=new T.Mesh(
      new T.CapsuleGeometry(0.07,6,),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
)
r1.rotation.x=Math.PI/2;
r1.position.set(0,0.4,0);
const r2=new T.Mesh(
      new T.CapsuleGeometry(0.07,6), 
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
)
r2.rotation.x=Math.PI/2;
r2.position.set(0,0.9,0)
rails.add(r2);
rails.add(r1);
const h1=new T.Mesh(
      new T.CapsuleGeometry(0.07,1.2),  
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
)
h1.position.set(0,0.5,1.5); 
const h2=h1.clone();
h2.position.set(0,0.5,-1.5)
rails.add(h2);
rails.add(h1);
const rails2=rails.clone();
const rails3=rails.clone();
const rails4= rails.clone() ;
const rails5=rails.clone();
const leftrail=new T.Group();
const rightrail=new T.Group();
rightrail.add(rails4);
rightrail.add(rails5);
leftrail.add(rails);
leftrail.add(rails2);
leftrail.add(rails3); 

rails5.position.set(5.5,0,-6.4) 

rails4.position.set(5.5,0,6.5 ) 

rails3.position.set(-1.5,0,-5.6) 

rails2.position.set(-1.5,0,0.47)

rails.position.set(-1.5,0,6.5);

scene.add(leftrail) ;
scene.add(rightrail)
 
//--------------------------------------------------------------------

//----------------------------BUS STOP--------------------------------

const busStop=new T.Group();
const backPlate=new T.Mesh(
      new T.BoxGeometry(0.1,2.5 ,4.8),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
            
      })
)
const top=new T.Mesh(
      new T.BoxGeometry(0.1,1.8,4.8),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
)
const seat=new T.Mesh(
      new T.BoxGeometry(0.1,0.7 ,4.1),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
                  
      })
)
const stand=new T.Mesh(
      new T.BoxGeometry(0.1,0.7,0.5),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
);
stand.rotation.y=Math.PI/2;
const stand2=stand.clone();
stand.position.set(6,0.35,1.5);  
stand2.position.set(6,0.35,-1.5);
busStop.add(stand2)

busStop.add(stand);
seat.position.set(6,0.7,0)
seat.rotation.z=Math.PI/2;
busStop.add(seat);
top.position.set(6.1 ,2.5,0);
top.rotation.z=Math.PI/2;
busStop.add(top);
backPlate.position.set(7,1.25,0);
busStop.add(backPlate);
busStop.position.y=-0.2
scene.add(busStop);


//-------------------------------Streeet lights----------------------------------

const path=new T.CatmullRomCurve3([
      new T.Vector3(0,0,0),
      new T.Vector3(0,2.5,0),
      new T.Vector3(0,2.9,0.25),
      new T.Vector3(0,3,0.5), 
      
      new T.Vector3(0,2.5,1)
])
const pole=new T.Group();
const rod=new T.Mesh(
      new T.TubeGeometry(
            path,
            30,
            0.09,
            10,
            false
      ),
      new T.MeshStandardMaterial({
            map:metalc1,
            metalnessMap:metalm1,
            roughnessMap:metalr1,
            normalMap:metaln1,
            metalness:0.8,
      })
);
const bulb=new T.Mesh(
      new T.SphereGeometry(0.28,10,10),
      new T.MeshStandardMaterial({
            color:'white'
      })
)
bulb.position.set(0,3.7,1.5) 
pole.add(bulb) 
rod.scale.y=1.5;
rod.scale.z=1.5;
pole.rotation.y=Math.PI/2;
pole.add(rod);
const pole2=pole.clone();
pole2.position.set(4.7,0,8);
pole2.rotation.y=-Math.PI/2; 
scene.add(pole2);
pole.position.set(-0.6,0,-6)
scene.add(pole);

//------------------------------------------------------------------


//-----------------------------GRASS---------------------------------
const bush=new T.Group();
const grass=new T.Mesh(
      new T.SphereGeometry(0.6),
      new T.MeshStandardMaterial({
            color:'green'
      })
)
grass.position.set(0,0.4,0) ;
const grass2=grass.clone();
grass2.scale.set(0.5,0.5,0.5);
grass2.position.set(0.6,0.15,0);
bush.add(grass,grass2);
bush.scale.set(1.3,1.3,1.3);
const bush2=bush.clone();
bush2.position.set(8,0,4);
bush2.rotation.y=Math.PI/3; 
const bush3=bush2.clone();
bush3.position.set(8,0,5);
bush3.scale.set(1.6,1.6,1.6);  
bush3.rotation.y=-Math.PI/2; 
const jhari=new T.Group();
jhari.add(bush2,bush3)
scene.add(jhari); 

const jhari2= jhari.clone();
jhari2.position.set(-10.5,0,-2 );   
scene.add(jhari2);    

const jhari3=jhari.clone();
jhari3.position.set(-1.2,0,-11); 
scene.add(jhari3)



//---------------------------LIGHTS ----------------------------------------
const light1 = new T.AmbientLight(0xffffff, 0.5);
scene.add(light1);
const light2 = new T.DirectionalLight(0xffffff, 1.1)
light2.position.set(10, 10, 10); 
scene.add(light2);
const streetLight1=new T.SpotLight(0xffffff,90,6 ,0.7,0.3);
streetLight1.position.set(1,4,-6);
const targetObj=new T.Object3D();
targetObj.position.set(1 ,0,-6);
scene.add(targetObj);
streetLight1.target=targetObj; 


scene.add(streetLight1);

const streetLight2=new T.SpotLight(0xffffff,90,6 ,0.7,0.3);
streetLight2.position.set(3,4,8);
const target2=new T.Object3D()
target2.position.set(3,0,8);
scene.add(target2);
streetLight2.target=target2;

scene.add(streetLight2)
//---------------------------------------------------------------------


//----------------------------renderer----------------------------------
const canvas = document.querySelector('canvas');
const renderer = new T.WebGLRenderer(
      {canvas: canvas, antialias: true}
)
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// This acts as a global camera aperture. 
// 1.0 is default. 2.0 is overexposed. 0.5 is underexposed.
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
//--------------------------------------------------------------------


function tick() {
      window.requestAnimationFrame(tick);
      const chaos=Math.random();
      if(chaos>0.1){
            streetLight2.intensity=90-(chaos*60);
            streetLight1.intensity=90-(chaos*60);
      }
      else{
            streetLight2.intensity=0;
            streetLight1.intensity=0; 
      }
      controls.update();
      renderer.render(scene, camera)
}

tick();