const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
//const camera = new THREE.OrthographicCamera()
camera.position.set(0, 0, 60);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

const length = 12, width = 8;

const shape = new THREE.Shape();

const line2 = (d, s) => d.replace(/[()]/g, '').split(', ').map(p => p.split(' ')).forEach(p => s.lineTo(Number(p[0]), Number(p[1])));

//line2(exterior, shape);
line2(interior, shape);

const extrudeSettings = {
  steps: 1,
  depth: 0,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 1,
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material0 = new THREE.MeshNormalMaterial({ flatShading: THREE.FlatShading, transparent: true, opacity: 0.8 });
const material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
const mesh = new THREE.Mesh( geometry, [material0, material] ) ;
scene.add( mesh );

renderer.render( scene, camera );

const animate = function () {
  requestAnimationFrame( animate );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render( scene, camera );
};

//animate();

