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

// Scene and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffe5ec"); // ✅ ton fond rose clair

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const landing = document.getElementById("landing");
landing.appendChild(renderer.domElement);
onWindowResize();

// Shape (même style que ton cousin)
const geometry = new THREE.TetrahedronGeometry(2, 1);

// ✅ On reste dans une gamme rose/violet (pas de vert/jaune)
// Zone HSL conseillée:
// - rose = ~330°
// - violet = ~270–290°
let hue = 305; // départ violet-rose

const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: new THREE.Color(`hsl(${hue}, 90%, 55%)`)
});

t = new THREE.Mesh(geometry, material);
scene.add(t);

let animate = function () {
  requestAnimationFrame(animate);

  t.rotation.y += deltaY;
  t.rotation.x += deltaX;
  camera.lookAt(t.position);

  // ✅ Au lieu de faire 0..360 (arc-en-ciel),
  // on fait osciller entre 285 et 335 (violet -> rose)
  const minHue = 285;
  const maxHue = 335;

  // petite oscillation douce (va-et-vient)
  const wave = (Math.sin(Date.now() * 0.0012) + 1) / 2; // 0..1
  const h = minHue + (maxHue - minHue) * wave;

  const accent = `hsl(${h}, 90%, 55%)`;
  material.color = new THREE.Color(accent);

  // ✅ on synchronise ton CSS (bouton/hover etc.)
  document.documentElement.style.setProperty("--accent", accent);

  renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  // Fix taille du container
  const landing = document.getElementById("landing");
  landing.style.width = width + "px";
  landing.style.height = height + "px";
}
