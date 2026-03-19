# OlanchoNet Landing Page — Brief

## Empresa

**OlanchoNet / Olancho Networks** — Proveedor de servicios de Internet (ISP) ubicado en Olancho, Honduras.

---

## Stack

- **Framework**: Astro (minimal template)
- **Estilos**: Tailwind CSS
- **Deploy**: TBD

---

## Marca

### Colores
| Nombre | Hex | Pantone |
|--------|-----|---------|
| Azul primario | `#0076BB` | Pantone 3005 C |
| Verde primario | `#4EB648` | Pantone 361 C |

### Tipografía
| Rol | Fuente | Uso |
|-----|--------|-----|
| Primaria | Avenir | Wordmark "OLANCHO", headings principales |
| Secundaria | Oxanium | Elementos secundarios, "NETWORKS" |
| Complementaria | Arial | Textos de apoyo |

> **Nota**: Avenir es fuente comercial (no disponible en Google Fonts). En web se usa **Oxanium** (Google Fonts) como sustituta principal.

### Logo
- **Isotipo**: Forma estilizada de "N" compuesta por dos elementos:
  - **Verde** (`#4EB648`): trazo curvo desde abajo-izquierda hacia arriba-derecha, con curl tipo S en la parte superior y círculo verde en el pico
  - **Azul** (`#0076BB`): trazo diagonal desde arriba-derecha hacia abajo, con curl tipo S invertido en la parte inferior y círculo azul en el gancho
- **Wordmark**: "OLANCHO" en bold gris oscuro + "NETWORKS" en light gris claro con letter-spacing amplio

### Archivos de logo generados
Ubicación: `public/images/`

| Archivo | Descripción |
|---------|-------------|
| `icon-color.svg` | Isotipo en colores de marca |
| `icon-white.svg` | Isotipo en blanco (para fondos de color/oscuros) |
| `logo-color.svg` | Logo horizontal completo en colores |
| `logo-white.svg` | Logo horizontal completo en blanco |

---

## Estructura del sitio

### Páginas
| Ruta | Descripción |
|------|-------------|
| `/` | Landing page principal (una sola página) |
| `/carreras` | Página de empleos con formulario de aplicación |

### Secciones (en orden, `index.astro`)
1. **Nav** — Logo + links a secciones + link a `/carreras`
2. **Hero** — Imagen placeholder + copy genérico
3. **Servicios** — 6 servicios detallados (ver abajo)
4. **Nosotros** — Lorem placeholder por ahora
5. **Cobertura** — 18 de 24 municipios del departamento de Olancho
6. **Contacto** — Teléfonos, emails, formulario o links

---

## Servicios

| Servicio | Tipo |
|----------|------|
| Internet Residencial | B2C |
| Fibra Empresarial | B2B |
| Enlaces Inalámbricos | B2B |
| Diseño de Redes | Consultoría |
| IPTV | B2C / B2B |
| Instalaciones Eléctricas | Servicio técnico |

---

## Cobertura

18 de los 24 municipios del departamento de **Olancho, Honduras**.

> Municipios específicos pendientes de confirmar. Placeholder mientras tanto.

---

## Contacto

| Canal | Valor |
|-------|-------|
| Teléfono 1 | +504 2785-4010 |
| Teléfono 2 | +504 9501-5187 |
| Soporte | soporte@olanchonet.com |
| Ventas | ventas@olanchonet.com |

---

## Carreras

Página `/carreras` con formulario de aplicación espontánea.
Campos mínimos: nombre, email, teléfono, posición de interés, CV (adjunto o link), mensaje.

---

## Nosotros

Contenido pendiente — usar lorem ipsum como placeholder.

---

## Hero

Copy genérico con imagen placeholder (Unsplash o similar, tema tecnología/conectividad).
Sin slogan definido aún.

---

## Componentes Astro

```
src/
  components/
    Nav.astro
    Hero.astro
    Servicios.astro
    Nosotros.astro
    Cobertura.astro
    Contacto.astro
    Footer.astro
  layouts/
    Layout.astro
  pages/
    index.astro
    carreras.astro
```
