const width = window.innerWidth;
const height = window.innerHeight;
const scale = height/width;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-100, 100, 100*scale, -100*scale);
camera.position.set(0, 0, 60);
camera.lookAt(new THREE.Vector3(0, 0, 10));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.BoxGeometry(10, 10, 10);
const extrudeSettings = {
  steps: 1,
  depth: 0,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 1,
};

const material0 = new THREE.MeshNormalMaterial({flatShading: THREE.FlatShading, transparent: true, opacity: 0.8});
const material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

for (let i = -4; i < 5; i++) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), i%2 === 0? material : material0);
  m.position.x = i*20;
  m.position.y = 40;
  m.position.z = 0;
  m.name = i;
  scene.add(m);
}

renderer.render(scene, camera);
console.log(scene);
const animate = function () {
  requestAnimationFrame(animate);

  for (let i = -4; i < 5; i++) {
    const m = scene.getObjectByName(i);
    const r = i%2 ? 0.01 : -0.01;
    m.rotation.x += r;
    m.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
};

animate();


