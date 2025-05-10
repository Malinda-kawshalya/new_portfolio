import * as THREE from 'three';
import { gsap } from 'gsap';

// Function to create floating animation
export const floatAnimation = (object) => {
  const timeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
  });
  
  const randomOffset = Math.random() * 2 - 1;
  
  timeline.to(object.position, {
    y: `+=${0.5 + randomOffset * 0.2}`,
    duration: 2 + randomOffset,
    ease: 'power1.inOut',
  });
  
  return timeline;
};

// Function to create rotation animation
export const rotateAnimation = (object, speed = 0.001) => {
  return {
    update: () => {
      object.rotation.y += speed;
    }
  };
};

// Function to create stars or space dust
export const createStarField = (scene, count = 1000) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  for (let i = 0; i < count; i++) {
    // Create a more spread out star field
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    
    vertices.push(x, y, z);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  const material = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: true,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });
  
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  
  return stars;
};

// Function to create a parallax effect based on mouse position
export const createMouseParallax = (objects, strength = 0.1) => {
  let mouseX = 0;
  let mouseY = 0;
  
  const handleMouseMove = (event) => {
    // Calculate normalized mouse position
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  const update = () => {
    objects.forEach(obj => {
      // Only move slightly to create a subtle parallax effect
      gsap.to(obj.position, {
        x: mouseX * strength * obj.userData.parallaxFactor,
        y: mouseY * strength * obj.userData.parallaxFactor,
        duration: 1,
        overwrite: true,
      });
    });
  };
  
  return {
    update,
    cleanup: () => window.removeEventListener('mousemove', handleMouseMove)
  };
};