script
<template lang="pug">
div(class="w-full h-screen bg-cover bg-top bg-no-repeat flex flex-col" )
    <!-- video background -->
    button(v-if="isAudoPlaying === false" @click="audio?.play()" class="absolute top-12 z-50 right-32 bg-white text-black px-4 py-2 rounded-md")
        MuteIcon(  class="w-6 h-6")
    button(v-else @click="audio?.pause()" class="absolute top-12 z-50 right-32 bg-white text-black px-4 py-2 rounded-md")
        UnmuteIcon(  class="w-6 h-6")
    video( autoplay loop muted playsinline ref="gpuVideo" class=" absolute w-full h-screen object-cover object-center  " )
        source( src="videos/gpu-bg.mp4" type="video/mp4" )
    div(class="cursor cursor--small")
   
    audio(ref="audio" id="gpu-audio" autoplay loop   class=" absolute w-full h-screen object-cover object-center " )
        source( src="sounds/pc-buzzing-fan-66135.mp3" type="audio/mpeg" )
    <!-- nuxt-img.nuxt-img(src="images/gpu.png" width="1400" height="1000" format="webp" class=" mx-auto w-4/6  " ) -->
    canvas#gpu-canvas(class="absolute top-0 left-0 w-full h-screen")
    div(class="absolute w-full h-auto bottom-[15rem] flex  justify-around items-center")
        div(class="w-1/2 flex flex-col justify-center items-center space-y-2")
            h1(class="text-6xl text-white font-bold text-center")
                | GPU Sharing
            p(class="text-2xl text-white text-center font-righteous")
                | Share your GPU with others and earn money
            button(class="bg-white text-black px-4 py-2 rounded-md")
                | Get Started

          
        div(class="w-1/2 flex flex-col justify-center items-center space-y-2")
            h1(class="text-6xl text-white font-bold text-center")
                | GPU Using
            p(class="text-2xl text-white text-center")
                | Use GPU for your work
            button(class="bg-white text-black px-4 py-2 rounded-md")
                | Get Started
       
</template>

<script setup lang="ts">
import MuteIcon from "~icons/uil/volume-mute";
import UnmuteIcon from "~icons/uil/volume";

import { Scene, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
import { AmbientLight } from "three/src/lights/AmbientLight.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
const audio: Ref<null | HTMLAudioElement> = ref(null);
const gpuVideo: Ref<null | HTMLAudioElement> = ref(null);
const isAudoPlaying = ref(false);

onMounted(() => {
  // track mouse and move the image
  const cursor = document.querySelector(".cursor") as HTMLElement;
  const gpu = document.querySelector(".nuxt-img") as HTMLElement;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const gpuTop = 0;
  const gpuLeft = 0;
  const gpuBottom = gpuTop + windowHeight;
  const gpuRight = gpuLeft + windowWidth;

  const moveImage = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    gpu.style.transform = `translate(${(gpuRight - x) / 20}px, ${
      (gpuBottom - y) / 20
    }px)`;
  };

  document.addEventListener("mousemove", moveImage);

  audio.value?.addEventListener("play", () => {
    isAudoPlaying.value = true;
  });
  audio.value?.addEventListener("pause", () => {
    isAudoPlaying.value = false;
  });

  // turn on the audio when the user clicks the video
  const turnOnAudio = () => {
    audio.value?.play();
    gpuVideo.value?.removeEventListener("click", turnOnAudio);
  };
  gpuVideo.value?.addEventListener("click", turnOnAudio);

  // create the scene
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new Scene();

  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
  scene.add(camera);
  camera.position.set(10, 15, 10);
  // Decrease the field of view to zoom in
  camera.fov = 30;
  camera.updateProjectionMatrix();

  const renderer = new WebGLRenderer({
    alpha: true,
    canvas: document.querySelector("#gpu-canvas") as HTMLCanvasElement,
    preserveDrawingBuffer: true,
  });

  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  renderer.setClearColor(0xffffff, 0);

  // light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 300, 0);
  scene.add(light);

  var dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(75, 300, -75);
  scene.add(dirLight);

  //controls
  const controls = new OrbitControls(camera, renderer.domElement);
  // turn of zooming by scroll
  controls.enableZoom = false;
  controls.update();

  // add grid
  //const grid = new THREE.GridHelper(100, 100, 0xffffff, 0xffffff);
  //scene.add(grid);

  const modelUrl = new URL("../assets/models/gpu-model.gltf", import.meta.url)
    .href;
  // GLTFLoader
  const gltfloader = new GLTFLoader();
  gltfloader.load(
    modelUrl, //'modelUrl
    (gltf) => {
      const root = gltf.scene;
      root.position.set(0, 0, 0);
      root.rotateX(Math.PI * -0.1);
      root.rotateY(Math.PI * -0.15);
      root.rotateZ(Math.PI * 0.2);

      //root1 = root.getObjectByName("gpu");
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  const mouse = new THREE.Vector2();

  // Add an event listener for mousemove events
  window.addEventListener("mousemove", (event) => {
    // Calculate the mouse position in normalized device coordinates ([-1, 1])
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Move the model based on the mouse position
    const x = mouse.x * 0.9;
    const y = mouse.y * 0.5;
    scene.position.set(x, y, 0);

    // Calculate the rotation angles based on the mouse position
    const theta = (mouse.x + 30 * Math.PI) / 7; // adjust theta angle
    const phi = Math.PI / 2 - (mouse.y + 2 * Math.PI) / 7; // adjust phi angle
    camera.rotation.order = "YXZ";
    // Set the camera position and orientation based on the rotation angles
    const radius = 20;
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta) - 2,
      radius * Math.cos(phi) + 2,
      radius * Math.sin(phi) * Math.cos(theta)
    );
  });
});
</script>

<style lang="scss"></style>
