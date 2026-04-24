import * as THREE from 'three'
import { scene, mouse, addToLoop } from './scene.js'

export function createStarfield() {
  const COUNT = 8000

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(COUNT * 3)
  const sizes = new Float32Array(COUNT)
  const colors = new Float32Array(COUNT * 3)

  const colorPalette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#a5b4fc'), // lavender
    new THREE.Color('#7dd3fc'), // sky blue
    new THREE.Color('#f0abfc'), // pink
    new THREE.Color('#c4b5fd'), // purple
  ]

  for (let i = 0; i < COUNT; i++) {
    // Distribute in a sphere shell (not too close to center)
    const r = 20 + Math.random() * 80
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    // Random size — most small, few large
    sizes[i] = Math.random() < 0.05 ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.3

    // Random color from palette
    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    colors[i * 3 + 0] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.15,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const stars = new THREE.Points(geometry, material)
  scene.add(stars)

  // ── Animate ──────────────────────────────────────────────
  addToLoop((time) => {
    const t = time * 0.0001

    // Very slow base rotation
    stars.rotation.y = t * 0.03
    stars.rotation.x = t * 0.01

    // Subtle parallax with mouse
    stars.rotation.y += mouse.x * 0.03
    stars.rotation.x += mouse.y * 0.02
  })

  return stars
}
