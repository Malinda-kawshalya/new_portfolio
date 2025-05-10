import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import '../../styles/globals.css';

const Stars = () => {
  const mountRef = useRef(null);
  const { scene, camera, renderer } = useThreeScene();

  useEffect(() => {
    if (!mountRef.current || !renderer) return;

    // Create star field
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.2,
      sizeAttenuation: true,
    });
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    mountRef.current.appendChild(renderer.domElement);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [scene, camera, renderer]);

  return <div ref={mountRef} className="stars" />;
};

export default Stars;