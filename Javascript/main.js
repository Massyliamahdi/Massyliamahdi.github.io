let t;
let deltaX = 0.0025;
let deltaY = 0.0025;

// Camera
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.0, 0.0, 5);

// Scene + renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffe5ec");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const landing = document.getElementById("landing");
landing.appendChild(renderer.domElement);
onWindowResize();

// Geometry
const geometry = new THREE.TetrahedronGeometry(2, 1);

// Light
const light = new THREE.SpotLight(0xffffff, 12);
light.position.set(0, 0, 5);
scene.add(light);

// Material (wireframe animé)
let hue = 305;
const material = new THREE.MeshPhysicalMaterial({
  wireframe: true,
  color: new THREE.Color("white")
});

// Mesh
t = new THREE.Mesh(geometry, material);
scene.add(t);

// Animation
function animate() {
  requestAnimationFrame(animate);

  t.rotation.y += deltaY;
  t.rotation.x += deltaX;
  camera.lookAt(t.position);

  // 🌟 LED blanc lumineux avec pulsation élégante
  const pulse = (Math.sin(Date.now() * 0.002) + 1) / 2;
  const lightness = 70 + pulse * 30; // 70% -> 95%
  const accent = `hsl(0, 0%, ${lightness}%)`;

  material.color = new THREE.Color(accent);

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  const landing = document.getElementById("landing");
  landing.style.width = width + "px";
  landing.style.height = height + "px";
}
