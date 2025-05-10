import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createScene, createCamera, createRenderer, createLights, handleResize } from '../lib/three/setup';

export const useThreeScene = () => {
  const containerRef = useRef(null);
  const [sceneInfo, setSceneInfo] = useState(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const scene = createScene();
    const camera = createCamera(window.innerWidth, window.innerHeight);
    const renderer = createRenderer(window.innerWidth, window.innerHeight);
    const lights = createLights(scene);
    
    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);
    
    // Handle window resize
    const cleanupResize = handleResize(camera, renderer);
    
    // Create animation loop
    const clock = new THREE.Clock();
    const animations = [];
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Run all registered animations
      animations.forEach(anim => anim(elapsedTime));
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    setSceneInfo({
      scene,
      camera,
      renderer,
      lights,
      addAnimation: (animation) => {
        animations.push(animation);
        return () => {
          const index = animations.indexOf(animation);
          if (index > -1) animations.splice(index, 1);
        };
      }
    });
    
    // Cleanup
    return () => {
      cleanupResize();
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return { containerRef, sceneInfo };
};

export default useThreeScene;