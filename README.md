# Portafolio 3D — Luis Mata

Sitio personal con una escena 3D interactiva y animaciones al hacer scroll, hecho con **Three.js**, **GSAP** y **Vite**.

🔗 **Demo en vivo:** https://my-portfolio-taupe-five-58.vercel.app

<!-- TODO: agrega una captura o GIF del sitio en docs/preview.png -->
![Vista previa del portafolio](docs/preview.png)

## ✨ Características

- Escena 3D renderizada con Three.js (WebGL).
- Animaciones de entrada y al hacer scroll con GSAP.
- Secciones: presentación, sobre mí, tecnologías, proyectos y contacto.
- Página adicional con el detalle de los proyectos (`projects.html`).
- Diseño responsive para escritorio y móvil.
- Sin framework: JavaScript moderno con módulos ES y Vite como bundler.

## 🛠️ Tecnologías

| Herramienta | Uso |
| --- | --- |
| [Three.js](https://threejs.org/) | Escena y gráficos 3D |
| [GSAP](https://gsap.com/) | Animaciones |
| [Vite](https://vite.dev/) | Servidor de desarrollo y build |
| [Vercel](https://vercel.com/) | Despliegue |

## 📁 Estructura

```
my-portfolio/
├── index.html        # Página principal
├── projects.html     # Detalle de proyectos
├── public/           # Logos de tecnologías e imágenes de proyectos
└── src/
    ├── main.js       # Punto de entrada
    ├── style.css     # Estilos globales
    ├── sections/     # Lógica de cada sección
    └── three/        # Escena 3D
```

## 🚀 Correr en local

Requisitos: Node.js 18 o superior.

```bash
git clone https://github.com/LuisMata12/my-portfolio.git
cd my-portfolio
npm install
npm run dev       # http://localhost:5173
```

Build de producción:

```bash
npm run build
npm run preview
```

## 📫 Contacto

- [LinkedIn](https://www.linkedin.com/in/luis-mata-ram%C3%ADrez-software-engineer/)
- [GitHub](https://github.com/LuisMata12)
