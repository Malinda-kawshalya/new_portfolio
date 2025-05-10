import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import '../../styles/globals.css';

const SpaceBackground = () => {
  const mountRef = useRef(null);
  const { scene, camera, renderer } = useThreeScene();

  useEffect(() => {
    if (!mountRef.current || !renderer) return;

    // Add starry background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
    });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    mountRef.current.appendChild(renderer.domElement);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [scene, camera, renderer]);

  return <div ref={mountRef} className="space-background" />;
};

export default SpaceBackground;