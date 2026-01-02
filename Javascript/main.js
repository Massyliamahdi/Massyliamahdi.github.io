// Vitesse de rotation
let deltaX = 0.0025;
let deltaY = 0.0030;

// Caméra
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// Scène
const scene = new THREE.Scene();
// Fond rose clair
scene.background = new THREE.Color("#ffe5ec");

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// IMPORTANT: on met le canvas dans #landing
const landing = document.getElementById("landing");
landing.appendChild(renderer.domElement);

// Forme géométrique (plus jolie qu’un tétraèdre)
const geometry = new THREE.IcosahedronGeometry(2.2, 0);

// Matériau wireframe (fil de fer)
let hue = 320; // départ rose/violet
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: new THREE.Color(`hsl(${hue}, 95%, 55%)`)
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += deltaX;
  mesh.rotation.y += deltaY;

  // Couleurs contrastées qui changent
  hue = (hue + 0.7) % 360;
  const accent = `hsl(${hue}, 95%, 55%)`;
  material.color = new THREE.Color(accent);

  // Si tu veux, on synchronise aussi une variable CSS (optionnel)
  document.documentElement.style.setProperty("--accent", accent);

  renderer.render(scene, camera);
}
animate();

// Resize (important)
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // évite des barres blanches sur mobile
  landing.style.width = window.innerWidth + "px";
  landing.style.height = window.innerHeight + "px";
});
