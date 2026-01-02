// Removed unused experimental variables
let light, t
let deltaX = 0.0025
let deltaY = 0.0025

// Camera
let camera = new THREE.PerspectiveCamera
	(65, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(0.0, 0.0, 5)

// Scene and renderer
let scene = new THREE.Scene()
let renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('landing').appendChild(renderer.domElement)
onWindowResize();


// Light source
light = new THREE.SpotLight(0xccddff, 13)
light.position.set(0, 0, 5)
scene.add(light)

// Shape
let geometry = new THREE.TetrahedronBufferGeometry(2,1)
let hue = 220
let material = new THREE.MeshPhysicalMaterial({
	wireframe: true,
	color: new THREE.Color(`hsl(${hue}, 65%, 70%)`)
})
t = new THREE.Mesh(geometry, material)
scene.add(t)
scene.background = new THREE.Color("rgb(10, 10, 10)")

let animate = function () {
	requestAnimationFrame(animate)
	t.rotation.y += deltaY
	t.rotation.x += deltaX
	camera.lookAt(t.position)
	// more intense color cycle for the wireframe and sync to CSS accent
	hue = (hue + 0.05) % 360
	const accent = `hsl(${hue}, 85%, 80%)`
	material.color = new THREE.Color(accent)
	document.documentElement.style.setProperty('--accent', accent)
	renderer.render(scene, camera)
}

// start animation loop
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


//
