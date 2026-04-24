import * as THREE from 'three'

// ── Renderer & Camera setup ──────────────────────────────
const canvas = document.getElementById('webgl-canvas')

export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

export const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 5)

// ── Mouse parallax ───────────────────────────────────────
export const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

window.addEventListener('mousemove', (e) => {
  mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
  mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
})

// ── Resize handler ────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ── Animation loop ────────────────────────────────────────
let animationCallbacks = []

export function addToLoop(fn) {
  animationCallbacks.push(fn)
}

export function startLoop() {
  const tick = (time) => {
    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05
    mouse.y += (mouse.targetY - mouse.y) * 0.05

    animationCallbacks.forEach((fn) => fn(time))
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
