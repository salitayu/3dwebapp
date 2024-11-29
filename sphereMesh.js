import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000)
camera.position.set(-10, 30, 30)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update()

const sphereGeometry = new THREE.SphereGeometry(5, 50, 50)
const material = new THREE.MeshBasicMaterial({ color: 0xeae86f })
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)
camera.position.z = 25

const gui = new dat.GUI()

const options = {
    speed: 0.01
}

let step = 0

gui.add(options, 'speed', 0, 0.1)

function animate() {
    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
