import * as THREE from 'three'
import { orbitControls } from './controls/OrbitControls'
import * as dat from 'dat.gui'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()


orbitControls(camera, document.body, renderer, scene)
