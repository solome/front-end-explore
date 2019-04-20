import * as THREE from 'three'
import { orbitControls } from './controls/OrbitControls'
import * as dat from 'dat.gui'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 35)
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: document.querySelector('#webgl-canvas')})
renderer.setClearColor(0xeeeeee)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow  = true
plane.rotation.x = -0.5*Math.PI
plane.position.x = 0
plane.position.y = 0
plane.position.z = 0
scene.add(plane)

const ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
scene.add(spotLight)

let numbersOfObjects = 0
const addCube = () => {
  const cubeSize = Math.ceil((Math.random() * 3))
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  cube.name = 'cube-' + scene.children.length

  cube.position.x = -30 + Math.round((Math.random() * 60 /*planeGeometry.width */))
  cube.position.y = Math.round((Math.random() * 5))
  cube.position.z = -20 + Math.round((Math.random() * 40))
  scene.add(cube)
  numbersOfObjects = scene.children.length
}

renderer.render(scene, camera)

__global__.addCube = addCube

orbitControls(camera, document.body, renderer, scene)

for( let i = 0; i < 200; i++) {
  addCube()
}
