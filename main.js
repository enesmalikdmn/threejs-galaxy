import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(15, 3, 16, 100)
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347})
const torus = new THREE.Mesh( geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(5,5,5)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.TetrahedronGeometry(0.20, 1)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff})
    const star = new THREE.Mesh( geometry, material)

    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(80))
    star.position.set(x,y,z)
    scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space-1.jpeg')
scene.background = spaceTexture

function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    earth.rotation.x += 0.05
    earth.rotation.y += 0.075
    earth.rotation.z += 0.05


    torus.rotation.y += 0.075
    torus.rotation.z += 0.05

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera



function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    controls.update()

    renderer.render(scene, camera)
}
animate()

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('moon.jpeg')
    })
)
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(6, 64, 64),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('earth.jpeg'),
    })
)

scene.add(moon, earth)

moon.position.z = 30
moon.position.setZ(-10)


earth.position.y = 30
earth.position.setY(-10)

