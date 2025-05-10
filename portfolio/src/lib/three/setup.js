import * as THREE from 'three';

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0a0a0a');
  
  const fog = new THREE.FogExp2('#090909', 0.001);
  scene.fog = fog;
  
  return scene;
};

export const createCamera = (width, height) => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 50;
  camera.position.y = 0;
  camera.position.x = 0;
  
  return camera;
};

export const createRenderer = (width, height) => {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setClearColor('#0a0a0a', 1);
  
  return renderer;
};

export const createLights = (scene) => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  scene.add(ambientLight);
  
  // Point light (like a star)
  const pointLight = new THREE.PointLight('#ffffff', 1);
  pointLight.position.set(0, 0, 30);
  scene.add(pointLight);
  
  // Another point light with color
  const pointLight2 = new THREE.PointLight('#6e44ff', 1);
  pointLight2.position.set(20, 20, 20);
  scene.add(pointLight2);
  
  return { ambientLight, pointLight, pointLight2 };
};

export const handleResize = (camera, renderer) => {
  const updateSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', updateSize);
  
  return () => window.removeEventListener('resize', updateSize);
};