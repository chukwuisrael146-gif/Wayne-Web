import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/abstract-ball.css';

const vertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  vec3 deform(vec3 p) {
    float t = uTime * 0.24;
    float wave = sin(p.x * 3.2 + t) * sin(p.y * 3.8 - t) * sin(p.z * 3.0 + t);
    float detail = sin(p.y * 9.0 + p.x * 3.0 + t) * sin(p.z * 5.0 - t);
    p *= 1.0 + wave * 0.19 + detail * 0.045;
    p.x += sin(p.y * 2.5 + t) * 0.10;
    return p;
  }

  void main() {
    vec3 p = deform(position);
    vec3 axis = abs(normal.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 tangent = normalize(cross(axis, normal));
    vec3 bitangent = cross(normal, tangent);
    vec3 displacedTangent = deform(position + tangent * 0.005) - p;
    vec3 displacedBitangent = deform(position + bitangent * 0.005) - p;
    vNormal = normalize(normalMatrix * cross(displacedTangent, displacedBitangent));
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    vPosition = viewPosition.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(-vPosition);
    vec3 light = normalize(vec3(-0.7, 1.0, 1.3));
    float diffuse = max(dot(normal, light), 0.0);
    float rim = pow(1.0 - max(dot(normal, view), 0.0), 2.8);
    float specular = pow(max(dot(normal, normalize(light + view)), 0.0), 48.0);
    float stripes = 0.5 + 0.5 * sin(vUv.y * 440.0);
    vec3 base = mix(vec3(0.065, 0.08, 0.072), vec3(0.28, 0.34, 0.30), stripes);
    vec3 color = base * (0.24 + diffuse * 0.85);
    color += vec3(0.65, 0.83, 0.69) * specular * 0.65;
    color += vec3(0.28, 0.47, 0.35) * rim * 0.32;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function AbstractBallBackground() {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // The CSS sphere remains visible when WebGL is unavailable.
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 6;
    const geometry = new THREE.SphereGeometry(1.5, 160, 120);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
    });
    const ball = new THREE.Mesh(geometry, material);
    ball.rotation.set(0.25, 0.0, -0.35);
    scene.add(ball);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;

    function render() {
      renderer.render(scene, camera);
    }

    function resize() {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      const mobile = width < 768;
      ball.position.x = mobile ? 0.15 : Math.min(camera.aspect * 0.65, 1.35);
      ball.position.y = mobile ? -0.45 : -0.1;
      ball.scale.setScalar(mobile ? Math.min(0.85, camera.aspect * 1.4) : 1);
      render();
    }

    function animate(now) {
      // Clamp elapsed time so returning to a hidden tab never causes a jump.
      if (lastTime) elapsed += Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      material.uniforms.uTime.value = elapsed;
      ball.rotation.y = elapsed * 0.075;
      ball.rotation.z = -0.35 + Math.sin(elapsed * 0.12) * 0.12;
      render();
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (!document.hidden && !motionPreference.matches) {
        frame = requestAnimationFrame(animate);
      } else {
        render();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    document.addEventListener('visibilitychange', syncAnimation);
    motionPreference.addEventListener('change', syncAnimation);
    resize();
    syncAnimation();
    setReady(true);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', syncAnimation);
      motionPreference.removeEventListener('change', syncAnimation);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="abstract-background" aria-hidden="true">
      <div className={`abstract-background__fallback${ready ? ' is-hidden' : ''}`} />
      <div ref={containerRef} className="abstract-background__canvas" />
      <div className="abstract-background__shade" />
    </div>
  );
}
