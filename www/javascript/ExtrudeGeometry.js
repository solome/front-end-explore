const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const length = 3, width = 2;
const s = new THREE.Shape();
s.moveTo(0,0);
s.lineTo(0, width);
s.lineTo(length, width);
s.lineTo(length, 0);
s.lineTo(0, 0);

const shape = new THREE.Shape();

const line2 = (d, s) => d.replace(/[()]/g, '').split(', ').map(p => p.split(' ')).forEach(p => s.lineTo(Number(p[0]), Number(p[1])));

line2(exterior, shape);
line2(interior, shape);

const extrudeSettings = {
  steps: 1,
  depth: 8,
  bevelEnabled: false,
  //bevelThickness: 1,
  //bevelSize: 1,
  //bevelSegments: 1,
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material0 = new THREE.MeshNormalMaterial({flatShading: THREE.FlatShading, transparent: true, opacity: 0.8});
const material = new THREE.MeshBasicMaterial({color: 0xfffffff, wireframe: false, transparent: true, opacity: 0.6});
const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(s, extrudeSettings), [new THREE.MeshBasicMaterial({color: 0xffffff}), material0]);
mesh.position.y = -15;
const mesh1 = new THREE.Mesh(geometry, [material, material0]) ;
mesh1.position.x = -10;
mesh1.position.y = 15;
const mesh2 = new THREE.Mesh(geometry, material0) ;
mesh2.position.x = 10;
mesh2.position.y = 15;
const mesh3 = new THREE.Mesh(geometry, material) ;
mesh3.position.x = -10;
const mesh4 = new THREE.Mesh(geometry, [material0, material]) ;
mesh4.position.x = 10;

scene.add(mesh);
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);

renderer.render( scene, camera );

const animate = function () {
  requestAnimationFrame( animate );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  mesh1.rotation.x += -0.01;
  mesh1.rotation.y += -0.01;

  mesh2.rotation.x += 0.01;
  mesh2.rotation.y += 0.01;

  mesh3.rotation.x += -0.01;
  mesh3.rotation.y += 0.01;

  mesh4.rotation.x += 0.01;
  mesh4.rotation.y += -0.01;

  renderer.render( scene, camera );
};

animate();

