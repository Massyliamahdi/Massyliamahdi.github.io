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
scene.background = new THREE.Color("#ffe5ec"); //  fond rose clair

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
let light = new THREE.SpotLight(0xffffff, 12);
light.position.set(0, 0, 5);
scene.add(light);

let material = new THREE.MeshPhysicalMaterial({
    wireframe: true,
    color: new THREE.Color(`hsl(${hue}, 90%, 75%)`)
});

t = new THREE.Mesh(geometry, material);
scene.add(t);

// Lumière pour faire briller les arêtes
let light = new THREE.SpotLight(0xffffff, 12);
light.position.set(0, 0, 5);
scene.add(light);

// Matériau qui permet les couleurs animées
let material = new THREE.MeshPhysicalMaterial({
  wireframe: true,
  color: new THREE.Color(`hsl(${hue}, 90%, 75%)`)
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
// cycle rose → fuchsia → violet
hue = (hue + 0.4) % 360;
const accent = `hsl(${hue}, 90%, 75%)`;

material.color = new THREE.Color(accent);

// si tu veux synchroniser ta couleur CSS
document.documentElement.style.setProperty("--accent", accent);


  //const accent = `hsl(${h}, 90%, 55%)`;
  //material.color = new THREE.Color(accent);

  // ✅ on synchronise ton CSS (bouton/hover etc.)
 // document.documentElement.style.setProperty("--accent", accent);

  renderer.render(scene, camera);
};

animate()

// Fallback for mobile devices with limited WebGL support
if (!renderer.domElement) {
	console.warn('WebGL not supported, using fallback');
	document.getElementById('landing').style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    // Ensure #landing div matches renderer size (fixes iOS landscape white bars)
    const landing = document.getElementById('landing');
    landing.style.width = width + 'px';
    landing.style.height = height + 'px';
}
