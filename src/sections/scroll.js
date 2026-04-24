import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export function initScrollAnimations(galaxyControls) {

  // ── Navbar ────────────────────────────────────────────────
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80)
  }, { passive: true })

  // ── Galaxy: fade al salir del hero ───────────────────────
  const hero = document.getElementById('hero')
  window.addEventListener('scroll', () => {
    const rect = hero.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
    galaxyControls.setScrollProgress(progress)
  }, { passive: true })

  // ── Reveal on scroll (IntersectionObserver) ───────────────
  const reveals = [
    { selector: '.section-header',          delay: 0,    y: 24 },
    { selector: '.about-text',              delay: 0,    y: 40 },
    { selector: '.about-visual',            delay: 150,  y: 40 },
    { selector: '.stat',                    delay: 0,    y: 20, stagger: true },
    { selector: '.skill-card',              delay: 0,    y: 24, stagger: true },
    { selector: '.project-card',            delay: 0,    y: 40, stagger: true },
    { selector: '.contact-text',            delay: 0,    x: -40 },
    { selector: '.contact-socials .social-link', delay: 0, x: 40, stagger: true },
  ]

  reveals.forEach(({ selector, delay, y = 0, x = 0, stagger }) => {
    const els = document.querySelectorAll(selector)
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.transition = `opacity 0.6s ease, transform 0.6s ease`

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        const d = delay + (stagger ? i * 60 : 0)
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translate(0px, 0px)'
        }, d)
        observer.unobserve(el)
      }, { threshold: 0.1 })

      observer.observe(el)
    })
  })

  // ── Smooth anchor scroll ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute('href'))
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target },
          duration: 1.2,
          ease: 'power3.inOut',
        })
      }
    })
  })
}
