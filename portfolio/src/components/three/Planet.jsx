import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import '../../styles/globals.css';

const Planet = ({ position = [0, 0, 0] }) => {
  const mountRef = useRef(null);
  const { scene, camera, renderer } = useThreeScene();

  useEffect(() => {
    if (!mountRef.current || !renderer) return;

    // Create a simple planet (sphere)
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      shininess: 100,
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...position);
    scene.add(planet);

    // Add light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    mountRef.current.appendChild(renderer.domElement);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [scene, camera, renderer, position]);

  return <div ref={mountRef} className="planet" />;
};

export default Planet;