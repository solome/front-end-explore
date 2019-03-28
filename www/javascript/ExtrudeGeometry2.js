const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 35);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const shape = new THREE.Shape();
const hole = new THREE.Shape();

const line2 = (d, s) => d.replace(/[()]/g, '').split(', ').map(p => p.split(' ')).forEach((p,i) => {
  if (!i) {
    s.moveTo(Number(p[0]), Number(p[1]));
    isMoved = true;
  } else {
    s.lineTo(Number(p[0]), Number(p[1]));
  }
})

line2(exterior, shape);
//line2(interior, hole);

//shape.holes.push(hole);

const extrudeSettings = { steps: 1, depth: 4, bevelEnabled: false };

const geometry0 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
geometry.faces.forEach(face => {
  const temp = face.a
  face.a = face.c
  face.c = temp
})

geometry.computeFaceNormals()

const material0 = new THREE.MeshNormalMaterial({flatShading: THREE.FlatShading, transparent: true, opacity: 0});
const material1 = new THREE.MeshBasicMaterial({flatShading: THREE.FlatShading, transparent: true, opacity: 0.6});
const mesh0 = new THREE.Mesh(geometry0, [material0, material1]);
const mesh = new THREE.Mesh(geometry, [material0, material1]);
mesh.position.y = 15;

//scene.add(mesh0);
scene.add(mesh);


window.mesh = mesh
renderer.render( scene, camera );

const animate = function () {
  requestAnimationFrame( animate );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render( scene, camera );
};

const f = () => {
  console.log('face', geometry.faces)
  geometry.faces.forEach(face => {

    if (Math.abs(face.normal.z) === 1) return

    //console.log('face', face)
    const linePoint = []
    for (const name of ['a', 'b', 'c']) {
      const vector = geometry.vertices[face[name]]
      const id = [vector.x, vector.y].join(',')
      if (linePoint.indexOf(id) === -1) linePoint.push(id)
    }

    //console.log('linePoint', linePoint)
    const match = shape.curves.some(curve => {
      let { v1, v2 } = curve
      v1 = [v1.x, v1.y].join(',')
      v2 = [v2.x, v2.y].join(',')
      return linePoint.indexOf(v1) >= 0 && linePoint.indexOf(v2) >= 0
    })

    if (match) {
      console.log('match', match)
    }
    if (!match) return

    const temp = face.a
    face.a = face.c
    face.c = temp
    console.log('face', face)
  })
}

//f()
geometry.computeFaceNormals()

animate();
