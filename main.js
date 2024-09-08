import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


const createPointLight = (x, y, z, intensity = 1) => {
  const light = new THREE.PointLight(0xffffff, intensity);
  light.position.set(x, y, z);
  scene.add(light);

  scene.add(new THREE.PointLightHelper(light, 0.5));
  return light;
};


createPointLight(200, 50, 50, 0.85);
createPointLight(-150, 50, 50, 0.85);
createPointLight(0, -50, 50, 0.85);
createPointLight(0, 50, -50, 0.85);
createPointLight(-150, 50, -75, 0.85);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);


const loader = new GLTFLoader();
loader.load(
  'models/model.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);
    console.log('Model loaded:', model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error happened', error);
  }
);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});