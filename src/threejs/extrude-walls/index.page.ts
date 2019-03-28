import * as THREE from 'three'
//import OrbitControls from '../controls/'


const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)

camera.position.set(0, 0, 35)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const __global__: any = window as any

__global__.THREE = __global__.THREE || THREE

console.log('debug')
