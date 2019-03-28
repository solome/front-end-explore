import * as THREE from 'three'

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)

camera.position.set(0, 0, 35)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

console.log('debug')




