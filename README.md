# Umbral by AS

> *"La disciplina es el puente entre las metas y los logros."*

**Umbral** es una PWA de desarrollo personal con estética minimalista y filosófica, construida sobre principios del estoicismo. Combina rutinas de movimiento, meditación, nutrición, diario personal y un coach IA integrado — todo funcional offline desde cualquier dispositivo.

---

## ¿Qué es Umbral?

Una herramienta de uso diario para quien quiere construir una vida con más foco, disciplina y conciencia. No es una app de gamificación ni de notificaciones. Es un espacio silencioso para trabajar en vos mismo.

**Cinco secciones:**

- **Coach** — Frases estoicas diarias, pilares del día (Meditación, Estudio, Espíritu, Trabajo), objetivos personales, reflexión y coach IA conversacional
- **Espíritu** — Escenarios de audio ambiente + 6 audiolibros de filosofía y desarrollo personal
- **Cuerpo** — 4 rutinas de yoga con voz guiada, calistenia y estiramientos
- **Templo** — Guías de nutrición por objetivo (músculo, huesos, detox, desparasitación)
- **Diario** — Entradas de texto + grabadora de voz

---

## Coach IA

El coach integrado usa **Groq API** con el modelo `llama-3.1-8b-instant`. Responde en español rioplatense con estilo directo y estoico, con acceso al contexto real del usuario: pilares completados, objetivos activos y entradas recientes del diario.

La API key se guarda únicamente en el `localStorage` del dispositivo del usuario. **Nunca se sube al repositorio ni sale del navegador.**

Para activarlo: tocá la ruedita ⚙ → pegá tu API key de [Groq](https://console.groq.com) → Guardar.

---

## Stack técnico

| Tecnología | Uso |
|---|---|
| HTML + CSS custom | Estructura y estilos base |
| Tailwind CSS CDN | Utilidades de layout y spacing |
| JavaScript vanilla | Lógica completa de la app |
| Service Worker | Soporte offline + cache de assets y audio |
| localStorage | Persistencia de datos del usuario |
| Groq API | Motor del coach IA |
| GitHub Pages | Deploy estático |

**Sin frameworks. Sin bundlers. Sin dependencias npm.** Construido con herramientas 100% gratuitas.

---

## Características técnicas

- **Offline completo** — funciona sin conexión una vez instalada, incluyendo audio `.opus`
- **Range Requests** — soporte de audio parcial desde cache para reproducción fluida offline
- **PWA instalable** — manifest, íconos y Service Worker configurados
- **Cache estratificado** — assets en `meet-v9`, audio en `meet-audio-v1`
- **Preload de audios** en background al iniciar
- **Fuentes locales** — Cormorant Garamond, Jost, Space Mono (sin Google Fonts)

---

## Estructura del proyecto

```
umbral/
├── index.html
├── app.js
├── style.css
├── sw.js
├── manifest.json
├── icon-192.png / icon-512.png
├── fonts/
│   ├── CormorantGaramond.woff2
│   ├── Jost.woff2
│   └── SpaceMono.woff2
├── img/
│   └── kundalini.webp
└── audio/
    ├── audiolibros/     (marco, epicteto, poder_ahora, habitos, frankl, kybalion)
    ├── sonidos/         (cuencos, grillos, lluvia, mantra, mar, pajaros, viento)
    └── yoga/            (saludo, guerrero, restauracion, kundalini)
```

---

## Instalación

No requiere instalación de dependencias.

```bash
git clone https://github.com/brunodonof4-netizen/umbral.git
cd umbral
# Abrí index.html en el navegador o servilo con cualquier servidor estático
```

Para deploy en GitHub Pages: push a `master` y activar Pages desde la configuración del repo.

---

## Paleta y estética

Tierra / Piedra / Estoico. Oscura, contemplativa, sin distracciones.

- **Dorado** `#c9a84c` — elementos primarios y foco
- **Ámbar** `#b5541c` — acento y énfasis
- **Musgo** `#4a5240` — nutrición y naturaleza
- **Piedra** — escala completa de fondos y textos
- **Tipografía:** Cormorant Garamond (display) · Jost (cuerpo) · Space Mono (mono)

---

## Créditos

Desarrollado por **Bruno D'Onofrio** como parte del ecosistema [AS — Autodidact System](https://github.com/brunodonof4-netizen).

Voz guiada: `es-AR-ElenaNeural` via edge-tts.

---

*Umbral es el límite entre lo que sos y lo que podés ser.*
