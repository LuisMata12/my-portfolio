import './style.css'
import { startLoop } from './three/scene.js'
import { createStarfield } from './three/starfield.js'
import { createGalaxy } from './three/galaxy.js'
import { initScrollAnimations } from './sections/scroll.js'

createStarfield()
const galaxyControls = createGalaxy()
startLoop()

// Esperar al primer paint para que IntersectionObserver mida bien
requestAnimationFrame(() => {
  initScrollAnimations(galaxyControls)
})
