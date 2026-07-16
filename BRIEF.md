# OlanchoNet Landing Page — Brief

## Empresa

**OlanchoNet / Olancho Networks** — Proveedor de servicios de Internet (ISP) por fibra óptica ubicado en Olancho, Honduras. Razón social: *Olancho Net S.R.L. de C.V.*

---

## Stack

- **Framework**: Astro 6 (SSG, salida estática)
- **Estilos**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animaciones**: GSAP + ScrollTrigger
- **Fuentes**: Avenir (local, `.ttf`) + Oxanium (Google Fonts)
- **Deploy**: dominio de producción `olanchonet.com`

---

## Marca

### Colores
| Nombre | Hex | Pantone |
|--------|-----|---------|
| Azul primario | `#0076BB` | Pantone 3005 C |
| Verde primario | `#4EB648` | Pantone 361 C |

Tokens en `src/styles/global.css`: `--color-brand-blue`, `--color-brand-green`, `--color-brand-dark` (`#0d1421`), `--color-brand-darker` (`#060F1E`).

### Tipografía
| Rol | Fuente | Uso |
|-----|--------|-----|
| Primaria | Avenir | Wordmark "OLANCHO", headings principales |
| Secundaria | Oxanium | Body, elementos secundarios, "NETWORKS" |
| Complementaria | Arial | Fallback de apoyo |

> **Nota**: Avenir es fuente comercial (se carga local desde `public/fonts/`). Oxanium (Google Fonts) es la fuente de cuerpo.

### Logo
- **Isotipo**: forma estilizada de "N" en verde (`#4EB648`) + azul (`#0076BB`).
- **Wordmark**: "OLANCHO" en bold + "NETWORKS" en light con letter-spacing amplio.

### Archivos de logo — `public/images/`
`icon-color.svg`, `icon-white.svg`, `logo-color.svg`, `logo-white.svg`, `logo-vertical-color.svg`, `logo-vertical-white.svg`.

---

## Tema visual

Tema **mixto**: secciones claras (`bg-gray-50` / `bg-white`) alternadas con secciones oscuras (`bg-brand-dark` / `bg-brand-darker`). Animaciones de entrada vía clase `.reveal` (batch global de GSAP en `Layout.astro`), con soporte de `prefers-reduced-motion`.

---

## Estructura del sitio

### Páginas
| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal (una sola página con anclas) |
| `/nosotros` | Historia de la empresa |
| `/carreras` | Empleos con formulario de aplicación espontánea |

### Secciones de la home (en orden, `index.astro`)
1. **Nav** — logo + links a secciones + `/carreras`, con barra de progreso de scroll
2. **Hero** — heading typewriter, canvas de partículas, orbes parallax, mini-stats
3. **Servicios** — bento grid de 5 servicios
4. **Planes** — 2 planes con precio + 2 cards CTA
5. **Nosotros** — historia + stats (desde 2015, GPON 2018, 250+ km de red)
6. **Stats** — métricas con count-up (+4,000 clientes, +30%, etc.)
7. **PorQue** — carrusel "¿Por qué elegirnos?"
8. **Infraestructura** — speed tests, stats de red, peering CDN, widget IPv6 en vivo, cards de capacidades
9. **Marquee** — cinta con los servicios
10. **Cobertura** — mapa interactivo + verificador de cobertura
11. **Galería** — grid de Instagram (`@olanchonet`)
12. **Contacto** — card de WhatsApp, email, dirección + formulario
13. **Footer** — navegación, contacto, redes

Componente global: **WhatsAppFloat** (burbuja fija en todas las páginas).

---

## Servicios

| Servicio | Tipo |
|----------|------|
| Fibra Empresarial | B2B |
| Internet Residencial | B2C |
| Televisión Digital | B2C / B2B |
| Diseño de Redes | Consultoría |
| Enlaces Inalámbricos | B2B |

---

## Planes

| Plan | Precio | Detalle |
|------|--------|---------|
| 100 Megas + TV | L 650/mes | Fibra óptica 100 Mbps + televisión por cable (*Más popular*) |
| 200 Megas | L 900/mes | Fibra óptica 200 Mbps, ideal gaming/streaming 4K |

Más dos cards CTA: **"¿Necesitas más velocidad?"** y **"¿Soluciones para tu empresa?"**, ambas enlazando a contacto. Sin contratos de permanencia; instalación incluida.

---

## Infraestructura

- Enlaces a speed tests: Speedtest (medidor propio), Fast.com, nPerf.
- Stats de red: 85% del tráfico <8 ms, 10 CDNs, 8 ms de latencia, monitoreo 24/7.
- Peering directo con CDNs (Google, Akamai, Cloudflare, Netflix, Steam, Meta, etc.).
- **Widget IPv6 en tiempo real**: hace `fetch` a APNIC (`AS269973`); ante bloqueo por CORS cae a un fallback (último valor medido ~45.9%).
- Capacidades: CDN de Steam, redundancia 40 Gb por nodo, alta capacidad, IPv6 nativo.

---

## Cobertura

**14 de 23** municipios del departamento de Olancho (≈61%). Mapa SVG (`olancho-map-styled.webp`) con overlay de puntos, líneas de conexión y paquetes animados (se pausan fuera de pantalla por rendimiento) + verificador de cobertura por municipio.

---

## Contacto

| Canal | Valor |
|-------|-------|
| WhatsApp | +504 2705-9800 |
| Email | ventas@olanchonet.com |
| Oficina | Residencial Álamos #2, Juticalpa, Olancho · CP 16101 |
| Horario | Lunes a sábado, 8:00 AM – 5:00 PM |
| Redes | Facebook / Instagram / WhatsApp (`@olanchonet`) |

---

## SEO

- `site: https://olanchonet.com` en `astro.config.mjs`.
- **Canonical** y OG/Twitter absolutas por página (`Layout.astro`).
- **JSON-LD `LocalBusiness`** (`LocalBusinessSchema.astro`): nombre legal, dirección, geo (`14.6776264, -86.2116899`), 14 municipios en `areaServed`, horarios, contacto y redes.
- `public/sitemap.xml` (/, /nosotros/, /carreras/) + `public/robots.txt`.
- Imágenes de galería en WebP; `og-image.png` 1200×630.

**Pendientes post-live**: confirmar que el teléfono coincida con Google Business, enviar sitemap a Search Console, testear la preview del og-image con el dominio online.

---

## Componentes Astro

```
src/
  components/
    Nav.astro
    Hero.astro
    Servicios.astro
    Planes.astro
    Nosotros.astro
    Stats.astro
    PorQue.astro
    Infraestructura.astro
    Marquee.astro
    Cobertura.astro
    Galeria.astro
    Contacto.astro
    Footer.astro
    WhatsAppFloat.astro
    LocalBusinessSchema.astro
  layouts/
    Layout.astro
  pages/
    index.astro
    nosotros.astro
    carreras.astro
  styles/
    global.css
```
