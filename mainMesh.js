import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

// scene setup
const scene = new THREE.Scene()
// camera setup, several cameras, choosing perspective camera
// field of view 75 degrees
// aspect ratio do width of element / height, or you'll get old movie on widescreen tv squished image
// objects further away from the camera then the value of far or closer than near wont be rendered, use other values on app for better performance
// such as window.innerWidth/2 and window.innerHeight/2 for smaller values in performance intensive apps, which will make the app render at quarter size
// keep size of app but render it at lower resolution, call setSize with false as updateStyle the third argument
// setSize(window.innerWidth/2, window.innerHeight/2, false) will render your app at half resolution, given that your <canvas> has 100% width and height.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// renderer setup, this is a <canvas> element the renderer uses to display the scene to us
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
if (WebGL.isWebGL2Available) {
    renderer.setAnimationLoop(animate)
} else {
    const warning = WebGL.getWebGL2ErrorMessage()
    document.getElementById('container').appendChild(warning)
}
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)
// could've used a setInterval but requestAnimationFrame which is internally used in WebGLRenderer will 
// pause when user navigates to another browser tab, saving processing power and battery life
document.body.appendChild(renderer.domElement)

// cube
// box geometry is needed to create a cube, this is an object that contains all the points, vertices, and fill faces of the cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 1)
// multiple materials, sticking to MeshBasicMaterial, all materials take an object of properties which will be applied to them
// add in green hex color
const material = new THREE.MeshBasicMaterial({ color: 0x0096FF })
// mesh is an object that takes a geomtry, applies a material to it, insert to our scene, and move around freely
const cube = new THREE.Mesh(geometry, material)
// the thing we add will be added to coordinates (0,0,0), this would cause both the camera and the cube to be inside each other
scene.add(cube)
// move the camera a bit out to avoid this
camera.position.z = 5

// render the scene
function animate() {
    cube.rotation.x += 0.03
    cube.rotation.y += 0.03
    renderer.setClearColor(0xffffff,1)
    renderer.render(scene, camera)
}
