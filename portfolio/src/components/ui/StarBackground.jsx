import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

// Animated Star Field component
function StarField() {
  const starsRef = useRef();
  const { mouse } = useThree();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = Math.sin(t * 0.05) * 0.05;
      starsRef.current.rotation.x = Math.cos(t * 0.1) * 0.05;
      
      // Subtle mouse interaction
      starsRef.current.rotation.y += mouse.x * 0.0005;
      starsRef.current.rotation.x += mouse.y * 0.0005;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

// Interactive Particle System
function FloatingParticles() {
  const particlesRef = useRef();
  const { mouse } = useThree();
  const count = 200;
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  });

  // Lazy load texture to avoid SSR issues
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    new THREE.TextureLoader().load('/particle.png', loadedTexture => {
      setTexture(loadedTexture);
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Add subtle animation
      positions[i3 + 1] += Math.sin(time + i) * 0.01;
      positions[i3] += Math.cos(time + i * 0.5) * 0.01;
      
      // Boundaries check to keep particles in view
      if (positions[i3 + 1] > 20) positions[i3 + 1] = -20;
      if (positions[i3 + 1] < -20) positions[i3 + 1] = 20;
      if (positions[i3] > 20) positions[i3] = -20;
      if (positions[i3] < -20) positions[i3] = 20;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ffcc"
        transparent
        opacity={0.6}
        sizeAttenuation
        map={texture}
      />
    </points>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <StarField />
      <FloatingParticles />
    </>
  );
}

// Exported component with Canvas wrapper
export default function StarBackground() {
  return (
    <div className="star-background">
      <Canvas camera={{ position: [0, 0, 15], fov: 70 }} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}>
        <Scene />
      </Canvas>
    </div>
  );
}