import * as THREE from 'three'
import { scene, mouse, addToLoop } from './scene.js'

export function createGalaxy() {
  const COUNT = 18000
  const ARMS = 3
  const ARM_SPREAD = 0.4
  const RADIUS = 6
  const SPIN = 2.5

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  const colorInner = new THREE.Color('#e2d9f3') // near-white lavender
  const colorMid = new THREE.Color('#7c3aed')   // purple
  const colorOuter = new THREE.Color('#ec4899')  // pink

  for (let i = 0; i < COUNT; i++) {
    const r = Math.pow(Math.random(), 1.5) * RADIUS
    const armAngle = ((i % ARMS) / ARMS) * Math.PI * 2
    const spinAngle = r * SPIN
    const randomAngle = armAngle + spinAngle

    // Spread around the arm axis
    const spread = ARM_SPREAD * (1 - r / RADIUS)
    const rx = (Math.random() - 0.5) * spread * r
    const ry = (Math.random() - 0.5) * spread * 0.15 * r
    const rz = (Math.random() - 0.5) * spread * r

    positions[i * 3 + 0] = Math.cos(randomAngle) * r + rx
    positions[i * 3 + 1] = ry
    positions[i * 3 + 2] = Math.sin(randomAngle) * r + rz

    // Color gradient: inner → mid → outer
    const t = r / RADIUS
    let c
    if (t < 0.4) {
      c = colorInner.clone().lerp(colorMid, t / 0.4)
    } else {
      c = colorMid.clone().lerp(colorOuter, (t - 0.4) / 0.6)
    }

    colors[i * 3 + 0] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.04,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const galaxy = new THREE.Points(geometry, material)
  galaxy.rotation.x = Math.PI * 0.15

  // Start tilted and positioned in the background
  galaxy.position.set(0, 0, -2)
  scene.add(galaxy)

  // ── Animate ──────────────────────────────────────────────
  let scrollOpacity = 1

  addToLoop((time) => {
    const t = time * 0.0001

    // Slow rotation
    galaxy.rotation.z = t * 0.08

    // Mouse parallax
    galaxy.rotation.x = Math.PI * 0.15 + mouse.y * 0.04
    galaxy.rotation.y = mouse.x * 0.04

    // Opacity based on scroll (fade out as user scrolls away from hero)
    material.opacity = scrollOpacity * 0.9
  })

  // Expose control for scroll-based fading
  return {
    galaxy,
    setScrollProgress(progress) {
      // progress: 0 = hero visible, 1 = hero off screen
      scrollOpacity = Math.max(0, 1 - progress * 2)
    },
  }
}
