import * as THREE from 'three';
import "./styles.css";
//  for controls
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { gsap } from 'gsap';


// // create scene
// const scene= new THREE.Scene();

// // setting creen compatibility
// const  sizes={
//   width: window.innerWidth,
//   height: window.innerHeight
// }

// // sphere param: radius,boxes
// const geometry = new THREE.SphereGeometry( 3, 64, 64 ); 
// const material = new THREE.MeshStandardMaterial( { color: "#00ff83",roughness:0.6 } ); 
// const mesh = new THREE.Mesh( geometry, material  );
// scene.add( mesh );

// // camera perpective and othogonal takes in Field of view , aspect ratio
// // we can also HashChangeEvent(x,x,0.1,100) after 100 nothing can be seen when we set in z position... for eg
// const camera= new THREE.PerspectiveCamera(45,sizes.width/sizes.height);
// camera.position.z=20;
// scene.add(camera);


// // lighting to make it visible 
// const light = new THREE.PointLight(0xffffff,1,100);
// light.position.set(0,10,10);
// light.intensity=1.5
// scene.add(light);




// // for rendering after adding class in canvas
// const canvas= document.querySelector('.webgl');
// // now use renderer and put in canvas
// const renderer= new THREE.WebGL1Renderer({canvas});
// renderer.setSize(sizes.width,sizes.height)
// renderer.setPixelRatio(2);
// renderer.render(scene,camera)


// //  adding controls
// const controls =new OrbitControls(camera,canvas)
// controls.enableDamping=true
// controls.enablePan=false
// controls.enableZoom=false
// // makes in unzoomable
// controls.autoRotate=true
// controls.autoRotateSpeed=4



// // resize
// window.addEventListener("resize",()=>{
//   // update sizes
//   console.log(window.innerWidth);
//   sizes.width=window.innerWidth ;
//   sizes.height=window.innerHeight;


//   // update camera as size changes
//   camera.aspect=sizes.width/sizes.height;
//   renderer.setSize(sizes.width,sizes.height);
//   camera.updateProjectionMatrix();

// })

// // as we resize we push down the object
// const loop=()=>{
//   // mesh.position.x +=0.2 animates out 
//   // mesh.rotation.x +=0.2
//   renderer.render(scene,camera)
//   window.requestAnimationFrame(loop)
//   controls.update()
// }
// loop()



// // timeline things woah coming from back
// const tl=gsap.timeline({defaults:{duration:1}})
// tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
// tl.fromTo("nav",{y:"100%"},{y:"0%"})
// tl.fromTo(".title",{opacity:0},{opacity:1})


// // mouse animation
// let rgb=[];
// let mouseDown=false
// window.addEventListener("mousedown",()=>(mouseDown=true))
// window.addEventListener("mouseup",()=>(mouseDown=false))

// window.addEventListener('mousemove',(e)=>{
//   if(mouseDown){
//     rgb=[Math.round((e.pageX/sizes.width)*255),Math.round((e.pageY/sizes.width)*255) ,150]
//   }
//   //  animating 
//   let newColor=new THREE.Color(`rgb(${rgb.join(",")})`)
//   gsap.to(mesh.material.color,{
//     r:newColor.r,
//     g:newColor.g,
//     b:newColor.b
//   })
// })



    // create scene
    const scene = new THREE.Scene();

    // setting screen compatibility
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // sphere param: radius,boxes
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83", roughness: 0.6 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // camera perspective
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.z = 20;
    scene.add(camera);

    // lighting to make it visible 
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    light.intensity = 1.5;
    scene.add(light);

    // for rendering after adding class in canvas
    const canvas = document.querySelector('.webgl');
    // now use renderer and put in canvas
    const renderer = new THREE.WebGL1Renderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);

    // adding controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    // makes it unzoomable
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;

    // resize
    window.addEventListener("resize", () => {
      // update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // update camera as size changes
      camera.aspect = sizes.width / sizes.height;
      renderer.setSize(sizes.width, sizes.height);
      camera.updateProjectionMatrix();
    });

    // as we resize, the object stays centered
    const loop = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
      controls.update();
    };
    loop();

    // timeline animations
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav", { y: "100%" }, { y: "0%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

    // mouse and touch-based animation
    let rgb = [];
    let isMouseDown = false;

    function updateColor(e) {
      if (isMouseDown || e.touches) {
        const touch = e.touches ? e.touches[0] : e;
        rgb = [
          Math.round((touch.pageX / sizes.width) * 255),
          Math.round((touch.pageY / sizes.height) * 255),
          150
        ];

        // animating
        const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b
        });
      }
    }

    window.addEventListener("mousedown", () => (isMouseDown = true));
    window.addEventListener("mouseup", () => (isMouseDown = false));
    window.addEventListener("mousemove", updateColor);

    // Touch events
    window.addEventListener("touchstart", (e) => {
      isMouseDown = true;
      updateColor(e);
    });
    window.addEventListener("touchend", () => (isMouseDown = false));
    window.addEventListener("touchmove", updateColor);

    // Fullscreen support
    canvas.addEventListener("click", () => {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    });