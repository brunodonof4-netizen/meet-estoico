/* ═══════════════════════════════════════════════════════
   Umbral — app.js
   Vanilla JS · localStorage persistence · No dependencies
═══════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const STOIC_QUOTES = [
  { text: "No sufras por el futuro antes de que llegue. Basta con lo que hay ahora.", author: "— Séneca" },
  { text: "Tienes poder sobre tu mente, no sobre los eventos externos. Date cuenta de esto, y encontrarás la fortaleza.", author: "— Marco Aurelio" },
  { text: "La mayor riqueza es vivir con poco.", author: "— Marco Aurelio" },
  { text: "No pidas que lo que sucede suceda como quieres. Desea que lo que sucede sea como es, y serás feliz.", author: "— Epicteto" },
  { text: "Tarda en prometer, pero sé fiel a tu promesa.", author: "— Séneca" },
  { text: "Ocupa tu mente con buenos pensamientos, o el enemigo llenará el vacío con malos.", author: "— Epicteto" },
  { text: "El obstáculo en el camino se convierte en el camino. Nunca olvides eso.", author: "— Marco Aurelio" },
  { text: "Recuerda: tienes una pequeña chispa de razón en ti. Encuéntrate a ti mismo con eso.", author: "— Marco Aurelio" },
  { text: "Si no es correcto, no lo hagas. Si no es verdadero, no lo digas.", author: "— Marco Aurelio" },
  { text: "La sabiduría viene de escuchar. El arrepentimiento, de hablar.", author: "— Zenón de Citio" },
  { text: "Primero di lo que serías. Luego haz lo que tienes que hacer.", author: "— Epicteto" },
  { text: "Sé como el promontorio contra el que rompen las olas. Permanece firme y a tu alrededor se calman las aguas.", author: "— Marco Aurelio" },
];

const COACH_GREETINGS = [
  "Levántate. El día no espera.",
  "Memento mori. Vive como si importara.",
  "Nada se construye sin constancia. Empieza.",
  "El hombre que conquista su mente lo conquista todo.",
  "No busques afuera lo que vive dentro de ti.",
  "Hoy es todo lo que tienes. Úsalo.",
  "La disciplina es la forma más alta de libertad.",
];

const PILLARS = [
  { key: 'M',  label: 'Meditar',  icon: '◯', color: '#c9a84c', desc: 'Paz interior' },
  { key: 'E',  label: 'Entrenar', icon: '△', color: '#b5541c', desc: 'Cuerpo fuerte' },
  { key: 'ES', label: 'Estudiar', icon: '□', color: '#8fa882', desc: 'Mente clara' },
  { key: 'T',  label: 'Trabajar', icon: '◇', color: '#a08070', desc: 'Propósito' },
];

const ESCENARIOS = [
  {
    id: 'frec',
    title: 'Frecuencias Sagradas',
    icon: '🎵',
    bg: '#2a1f1a',
    desc: 'Vibración interior',
    sounds: [
      { label: 'Mantra', file: 'audio/sonidos/mantra.opus' },
      { label: 'Cuencos', file: 'audio/sonidos/cuencos.opus' },
    ]
  },
  {
    id: 'nat',
    title: 'Naturaleza Activa',
    icon: '🌿',
    bg: '#1a2a1a',
    desc: 'Viento y pájaros',
    sounds: [
      { label: 'Pájaros', file: 'audio/sonidos/pajaros.opus' },
      { label: 'Viento', file: 'audio/sonidos/viento.opus' },
    ]
  },
  {
    id: 'agua',
    title: 'Aguas Profundas',
    icon: '🌊',
    bg: '#1a1f2a',
    desc: 'Mar y lluvia',
    sounds: [
      { label: 'Mar', file: 'audio/sonidos/mar.opus' },
      { label: 'Lluvia', file: 'audio/sonidos/lluvia.opus' },
    ]
  },
  {
    id: 'tierra',
    title: 'Tierra y Calma',
    icon: '🌙',
    bg: '#1a1a1a',
    desc: 'Grillos nocturnos',
    sounds: [
      { label: 'Grillos', file: 'audio/sonidos/grillos.opus' },
    ]
  },
];

const AUDIOBOOKS = [
  { title: 'Meditaciones', author: 'Marco Aurelio', emoji: '📜', duration: '8 min', summary: 'El diario privado de un emperador que ejercía el estoicismo a diario. Sus reflexiones sobre el control de la mente, la virtud y la muerte son atemporales.', file: 'audio/audiolibros/marco.opus' },
  { title: 'Manual de Vida', author: 'Epicteto', emoji: '⚖️', duration: '7 min', summary: 'El esclavo que se convirtió en el filósofo más libre. Separa lo que depende de ti de lo que no. La base del estoicismo práctico.', file: 'audio/audiolibros/epicteto.opus' },
  { title: 'El Poder del Ahora', author: 'Eckhart Tolle', emoji: '🌅', duration: '8 min', summary: 'Solo el presente es real. Tolle te lleva a descubrir que la fuente de todo sufrimiento es la mente que vive en otro tiempo.', file: 'audio/audiolibros/poder_ahora.opus' },
  { title: 'Hábitos Atómicos', author: 'James Clear', emoji: '⚡', duration: '7 min', summary: 'Los grandes cambios no vienen de grandes gestos. Vienen de pequeñas decisiones repetidas con consistencia. El sistema supera a la motivación.', file: 'audio/audiolibros/habitos.opus' },
  { title: 'El Hombre en Busca de Sentido', author: 'Viktor Frankl', emoji: '🕯', duration: '7 min', summary: 'Desde los campos de concentración, Frankl descubrió que quien tiene un porqué puede soportar cualquier cómo. El sentido es la última libertad.', file: 'audio/audiolibros/frankl.opus' },
  { title: 'El Kybalión', author: 'Los Tres Iniciados', emoji: '🔺', duration: '8 min', summary: 'Los siete principios herméticos que rigen el universo. Mentalismo, correspondencia, vibración. Un mapa del cosmos y de la mente.', file: 'audio/audiolibros/kybalion.opus' },
];

const ROUTINES = {
  yoga: [
    { name: 'Saludo al Sol', duration: '10 min', level: 'Todos', audio: 'audio/yoga/saludo.opus', steps: ['De pie, pies juntos. Inspira y levanta los brazos.', 'Exhala y dobla hacia adelante. Manos al suelo.', 'Inhala, pierna derecha atrás. Coxis hacia abajo.', 'Retén. Tabla alta. Mantén el cuerpo alineado.', 'Exhala, baja al suelo. Cobra pose. Inhala.', 'Perro boca abajo. Exhala profundo. 5 respiraciones.', 'Vuelve al inicio. Repite 5 rondas.'] },
    { name: 'Guerrero del Silencio', duration: '15 min', level: 'Intermedio', audio: 'audio/yoga/guerrero.opus', steps: ['Guerrero I: pie izquierdo adelante, rodilla a 90°.', 'Brazos arriba, hombros bajos. Respira 5 veces.', 'Guerrero II: abre los brazos al lado. Mira adelante.', 'Ángulo extendido: brazo adelante apoya en muslo.', 'Triángulo: extiende el torso lateral. Mano al tobillo.', 'Repite el lado opuesto. Simetría es disciplina.'] },
    { name: 'Restauración Nocturna', duration: '20 min', level: 'Fácil', audio: 'audio/yoga/restauracion.opus', steps: ['Postura del niño. 2 minutos. Suelta el día.', 'Postura del cadáver modificado: piernas en mariposa.', 'Torsión supina derecha. Rodilla al pecho, gira.', 'Torsión supina izquierda. Misma duración.', 'Piernas arriba en la pared. 5 minutos.', 'Savasana final. No hagas nada. Ese es el trabajo.'] },
    { name: 'Yoga Kundalini', duration: '25 min', level: 'Todos', audio: 'audio/yoga/kundalini.opus', img: 'img/kundalini.webp', steps: ['Siéntate en postura fácil. Columna erguida. Cierra los ojos.', 'Respiración de fuego: inhala y exhala rápido por la nariz. 1 minuto.', 'Manos en el corazón. Siente el calor generado.', 'Estiramiento de columna: manos a las rodillas, alterna arco y gato.', 'Postura del camello: abre el pecho, deja caer la cabeza atrás suavemente.', 'Meditación final: mantra interno Om Namah Shivaya. 3 minutos.'] },
  ],
  calistenia: [
    { name: 'Fuerza Fundacional', duration: '20 min', level: 'Principiante', steps: ['Sentadillas: 3×15. Espalda recta, pecho abierto.', 'Flexiones: 3×10. Cuerpo rígido, codos a 45°.', 'Fondos en silla: 3×10. Tríceps y hombros.', 'Plancha: 3×30 seg. Respira. No retengas el aire.', 'Elevaciones de cadera: 3×15. Glúteos apretados.', 'Abdominales: 3×20. Lento en la bajada.'] },
    { name: 'El Cuerpo del Estoico', duration: '30 min', level: 'Intermedio', steps: ['Dominadas: 5 series hasta el fallo. El ego no importa.', 'Flexiones diamante: 3×12. Fuerza de tríceps puro.', 'Pistol squat asistido: 3×8 cada pierna.', 'Pike push-up: 3×10. Hombros fuertes como un buey.', 'Muscle-up negativo: 5 repeticiones. Control total.', 'L-Sit en sillas: 3×15 seg. La tensión es la práctica.'] },
    { name: 'Guerrero de Hierro', duration: '40 min', level: 'Avanzado', steps: ['100 flexiones en el menor tiempo posible.', '100 sentadillas. Profundas. Sin compromiso.', '50 fondos entre barras o sillas robustas.', '20 dominadas. Pausa 2 seg arriba y abajo.', 'Planchas: 5×1 minuto. La mente cede antes que el cuerpo.', 'Carrera de 20 min o saltos de cuerda.'] },
  ],
  estiramientos: [
    { name: 'Movilidad Matutina', duration: '10 min', level: 'Todos', steps: ['Círculos de cuello: 10 en cada dirección. Lento.', 'Apertura de pecho: entrelaza los dedos atrás. Expande.', 'Estiramiento de cadera: paloma en el suelo.', 'Flexión hacia adelante sentado: respira en el límite.', 'Estiramiento de cuádriceps de pie. Equilibrio activo.', 'Giro de columna sentado. Dos lados. Misma intensidad.'] },
    { name: 'Fascia Viva', duration: '25 min', level: 'Intermedio', steps: ['Rodillo de foam: espalda alta y baja. 2 min c/zona.', 'Splits laterales progresivos. No fuerces.', 'Apertura de hombros en pared. 90 seg por lado.', 'Postura del palomo profundo. 2 min por lado.', 'Estiramiento de psoas en estocada baja. Vital.', 'Cuello: oreja a hombro suave. 1 min cada lado.'] },
  ],
};

const NUTRITION = {
  musculo: {
    title: 'Protocolo de Masa Muscular',
    desc: 'El músculo se construye en la mesa, no solo en el gimnasio. Come con precisión.',
    foods: [
      { name: 'Proteínas Animales', emoji: '🥩', items: ['Carne de res magra (3-4 veces/semana)', 'Pollo y pavo sin piel diario', 'Salmón, sardinas (omega-3 antiinflamatorio)', 'Huevos completos: 3-5 por día', 'Atún natural en agua'] },
      { name: 'Proteínas Vegetales', emoji: '🫘', items: ['Lentejas y garbanzos (hierro + proteína)', 'Tofu y tempeh fermentado', 'Edamame: snack perfecto post-entrenamiento', 'Quinoa: proteína completa + carbohidrato', 'Espirulina: suplemento de élite'] },
      { name: 'Carbohidratos Nobles', emoji: '🌾', items: ['Arroz blanco post-entreno (digestión rápida)', 'Camote/batata: energía sostenida', 'Avena: fibra + baja glucemia', 'Plátano: potasio + energía rápida', 'Frutas rojas: antioxidantes y recuperación'] },
      { name: 'Grasas Esenciales', emoji: '🥑', items: ['Aguacate diario (testosterona y hormonas)', 'Aceite de oliva virgen extra', 'Frutos secos crudos (almendras, nueces)', 'Ghee o mantequilla de animales pastoreados', 'Aceite de coco virgen para cocinar'] },
    ],
    protocol: 'Protocolo: 2g de proteína por kg de peso corporal. Distribuye en 4-5 comidas. Carbohidratos alrededor del entrenamiento. Grasas en el resto del día. Ayuno nocturno de 12 horas mínimo.',
  },
  huesos: {
    title: 'Fortaleza Ósea',
    desc: 'Los huesos son el armazón de tu templo. Nutrelos como tal.',
    foods: [
      { name: 'Calcio Biodisponible', emoji: '🦴', items: ['Sardinas con espinas (la mejor fuente natural)', 'Brócoli y col rizada cocidos', 'Almendras crudas', 'Semillas de sésamo molidas (tahini)', 'Leche y kéfir de animales pastoreados'] },
      { name: 'Vitamina D3 + K2', emoji: '☀️', items: ['Exposición solar: 20 min/día antes de las 11am', 'Yemas de huevo (D3 natural)', 'Hígado de res (la joya nutricional)', 'Natto fermentado (K2 más alta concentración)', 'Suplementación: D3 4000 UI + K2 MK-7 100mcg'] },
      { name: 'Minerales Traza', emoji: '⚡', items: ['Magnesio en hojas verdes y semillas', 'Zinc: ostras, semillas de calabaza', 'Boro: ciruelas, aguacate, uvas', 'Silicio: pepino, avena, ortiga (infusión)', 'Caldo de huesos: colágeno tipo II nativo'] },
    ],
    protocol: 'Tomar el sol antes de las 11am. Ejercicio de impacto (caminar, saltar). Evitar antinutrientes: reducir fitatos, oxalatos y lácteos pasteurizados en exceso. Suplementar: magnesio glicinato 400mg nocturno.',
  },
  detox: {
    title: 'Protocolo Detox',
    desc: 'El cuerpo que se limpia, piensa con claridad. El templo se purifica desde adentro.',
    foods: [
      { name: 'Depurativos Hepáticos', emoji: '🌿', items: ['Cardo mariano (extracto estandarizado)', 'Alcachofa en ayunas (amargos hepáticos)', 'Remolacha cruda rallada con limón', 'Diente de león (té o ensalada)', 'Raíz de cúrcuma fresca + pimienta negra'] },
      { name: 'Hidratación Activa', emoji: '💧', items: ['Agua con limón en ayunas (alcaliniza)', 'Agua con vinagre de manzana (enzimas)', 'Té verde matcha (glutatión + catequinas)', 'Agua de coco natural (electrolitos)', 'Infusión de jengibre y limón'] },
      { name: 'Fibras Purificadoras', emoji: '🌱', items: ['Psyllium husk: 10g antes de dormir', 'Semillas de lino molidas en ayunas', 'Carbón activado (alejar de medicamentos)', 'Espárragos: prebiótico + diurético', 'Manzana verde cruda (pectina)'] },
      { name: 'Metales y Tóxicos', emoji: '🧲', items: ['Cilantro fresco: quelante natural de metales', 'Chlorella: une y elimina metales pesados', 'Zeolita clínica (polvo finamente molido)', 'Sauna 3x/semana: sudoración activa', 'Baños de sal de Epsom (magnesio cutáneo)'] },
    ],
    protocol: 'Protocolo de 21 días. Semana 1: hidratación e hígado. Semana 2: intestino y fibras. Semana 3: metales y remineralización. Ayuno intermitente 16:8 durante el proceso.',
  },
  parasitos: {
    title: 'Desparasitación Natural',
    desc: 'Lo que vive dentro sin permiso debe ser expulsado con disciplina.',
    foods: [
      { name: 'Antiparasitarios Naturales', emoji: '🧄', items: ['Ajo negro o crudo en ayunas (allicina)', 'Semillas de calabaza crudas (cucurbitina)', 'Aceite de orégano (carvacrol y timol)', 'Extracto de semilla de pomelo (GSE)', 'Clavo de olor en polvo o té (eugenol)'] },
      { name: 'Hierbas Antiparasitarias', emoji: '🌾', items: ['Ajenjo (Artemisia absinthium): el más potente', 'Papaya verde rallada en ayunas', 'Corteza de nogal negro (tintura)', 'Neem: hojas en té o extracto', 'Cúrcuma + jengibre + pimienta: combo básico'] },
      { name: 'Protocolo Amargo', emoji: '🍋', items: ['Ayuno de 12-16 horas (parasitar en el hambre)', 'Ingesta de semillas de calabaza: 50g en ayunas', 'Aloe vera gel puro: 50ml en ayunas', 'Aceite de ricino (una sola dosis, máx 30ml)', 'Diatomita de grado alimenticio: media cucharadita'] },
    ],
    protocol: 'Protocolo Luna Llena (3-7 días antes): los parásitos son más activos en ese período. Ciclo de 30 días: 10 días de tratamiento, 10 de descanso, 10 repite. Siempre consulta con profesional de salud.',
    warning: '⚠ Esta guía es educativa. Consulta a un profesional de salud antes de iniciar cualquier protocolo de desparasitación.',
  },
};

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

const STATE = {
  pillarsToday: JSON.parse(localStorage.getItem('meet_pillars_today') || '{}'),
  goals:        JSON.parse(localStorage.getItem('meet_goals')         || '[]'),
  entries:      JSON.parse(localStorage.getItem('meet_entries')       || '[]'),
  streak: 0,
  lastActive:   localStorage.getItem('meet_last_active')              || '',
  currentView:  'coach',
  selectedTags: new Set(),
  voiceBlob:    null,
  voiceURL:     null,
  medInterval:  null,
  medSeconds:   600,
  medActive:    false,
  currentAudioEl: null,
  currentMantraIdx: -1,
  currentRoutine: 'yoga',
  currentNutr: 'musculo',
  currentEntryForModal: null,
};

function save() {
  localStorage.setItem('meet_pillars_today', JSON.stringify(STATE.pillarsToday));
  localStorage.setItem('meet_goals',         JSON.stringify(STATE.goals));
  localStorage.setItem('meet_entries',       JSON.stringify(STATE.entries));
  localStorage.setItem('meet_last_active',   STATE.lastActive);
}

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function formatDate(d = new Date()) {
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function showToast(msg, duration = 2500) {
  const t = $('#toast'), m = $('#toast-msg');
  t.classList.remove('hidden');
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.classList.add('hidden'), 300);
  }, duration);
}

// ─────────────────────────────────────────────
// STREAK
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

function navigate(viewName) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  $(`#view-${viewName}`).classList.add('active');
  $(`[data-view="${viewName}"]`).classList.add('active-nav');
  STATE.currentView = viewName;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────
// COACH VIEW
// ─────────────────────────────────────────────

function renderCoach() {
  // Greeting
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Alba. Es la hora del guerrero.' : h < 17 ? 'La tarde exige acción.' : 'La noche pide silencio y gratitud.';

  // Pillars
  renderPillars();

  // Week strip
  renderWeekStrip();

  // Goals
  renderGoals();

  // Daily stoic - aleatorio en cada carga
  const q = STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];
  const quoteEl = $('#daily-stoic');
  const quoteAuthorEl = $('#daily-stoic-author');
  if (quoteEl) quoteEl.textContent = `"${q.text}"`;
  if (quoteAuthorEl) quoteAuthorEl.textContent = q.author;
}

function renderPillars() {
  const today = todayKey();
  if (!STATE.pillarsToday[today]) STATE.pillarsToday[today] = {};
  const todayState = STATE.pillarsToday[today];
  const checkedCount = Object.values(todayState).filter(Boolean).length;

  $('#pillars-grid').innerHTML = PILLARS.map(p => `
    <div class="pillar-card ${todayState[p.key] ? 'checked' : ''}" data-pillar="${p.key}">
      <div class="flex items-center justify-between mb-2">
        <span class="pillar-letter">${p.key}</span>
        <div class="pillar-check">${todayState[p.key] ? '✓' : ''}</div>
      </div>
      <p class="font-mono text-xs text-stone-400 tracking-wider">${p.label}</p>
      <p class="font-body text-xs text-stone-600 mt-0.5">${p.desc}</p>
    </div>
  `).join('');

  $$('.pillar-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.pillar;
      todayState[key] = !todayState[key];
      save();
      renderPillars();
      if (todayState[key]) {
        const pillar = PILLARS.find(p => p.key === key);
        showToast(`${pillar.label} completado 🏛`);
      }
    });
  });
}

function renderWeekStrip() {
  const today = new Date();
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const strip = $('#week-strip');
  strip.innerHTML = '';
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const isToday = i === 0;
    const hasData = STATE.pillarsToday[key] && Object.keys(STATE.pillarsToday[key]).length > 0;
    strip.innerHTML += `
      <div class="week-day ${isToday ? 'today' : ''} ${hasData && !isToday ? 'completed' : ''}">
        <span class="day-label">${days[d.getDay()]}</span>
        <span class="day-num">${d.getDate()}</span>
        <div class="day-dot"></div>
      </div>
    `;
  }
}

function renderGoals() {
  const container = $('#goals-container');
  if (STATE.goals.length === 0) {
    container.innerHTML = `<p class="font-display italic text-stone-700 text-sm text-center py-3">"Sin objetivos, la energía se dispersa."</p>`;
    return;
  }
  container.innerHTML = STATE.goals.map((g, i) => `
    <div class="goal-item ${g.done ? 'done' : ''}" data-idx="${i}">
      <div class="goal-check-btn" data-goal-check="${i}">${g.done ? '✓' : ''}</div>
      <div class="flex-1">
        <p class="goal-text font-body text-sm text-stone-300">${g.text}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="scope-badge scope-${g.scope}">${g.scope === 'daily' ? 'Diario' : g.scope === 'weekly' ? 'Semanal' : 'Mensual'}</span>
          <span class="font-mono text-xs text-stone-600">${PILLARS.find(p => p.key === g.pillar)?.label || ''}</span>
        </div>
      </div>
      <button class="text-stone-700 hover:text-ember text-xs font-mono transition-colors" data-goal-del="${i}">✕</button>
    </div>
  `).join('');

  $$('[data-goal-check]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const i = parseInt(btn.dataset.goalCheck);
      STATE.goals[i].done = !STATE.goals[i].done;
      save();
      renderGoals();
    });
  });
  $$('[data-goal-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const i = parseInt(btn.dataset.goalDel);
      STATE.goals.splice(i, 1);
      save();
      renderGoals();
    });
  });
}

// ─────────────────────────────────────────────
// ESPÍRITU VIEW
// ─────────────────────────────────────────────

function renderEspiritu() {
  renderEscenarios();
  renderAudiobooks();
}

// Estado escenarios
const ESCENARIO_STATE = {};
ESCENARIOS.forEach(e => { ESCENARIO_STATE[e.id] = { activeSound: 0, playing: false }; });

function stopAllAudio() {
  if (STATE.currentAudioEl) {
    STATE.currentAudioEl.pause();
    STATE.currentAudioEl.src = '';
    STATE.currentAudioEl = null;
  }
}

function renderEscenarios() {
  const list = $('#mantras-list');
  list.innerHTML = ESCENARIOS.map(e => {
    const st = ESCENARIO_STATE[e.id];
    const isPlaying = st.playing;
    return `
    <div class="rounded-2xl bg-stone-800/50 border border-stone-700/50 p-4 mb-3">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style="background:${e.bg}">${e.icon}</div>
          <div>
            <p class="font-body text-sm text-stone-200">${e.title}</p>
            <p class="font-mono text-xs text-stone-600">${e.desc}</p>
          </div>
        </div>
        <button class="escenario-play w-9 h-9 rounded-full border flex items-center justify-center transition-all ${isPlaying ? 'border-gold text-gold' : 'border-stone-600 text-stone-500'}" data-esc="${e.id}">
          ${isPlaying ? '■' : '▶'}
        </button>
      </div>
      ${e.sounds.length > 1 ? `
      <div class="flex gap-2 flex-wrap">
        ${e.sounds.map((s, i) => `
          <button class="sound-pill font-mono text-xs px-3 py-1 rounded-full border transition-all ${st.activeSound === i ? 'border-gold/60 text-gold bg-gold/10' : 'border-stone-700 text-stone-600'}" data-esc="${e.id}" data-sound="${i}">
            ${s.label}
          </button>
        `).join('')}
      </div>` : ''}
    </div>
  `}).join('');

  // Eventos pills
  $$('[data-sound]').forEach(pill => {
    pill.addEventListener('click', () => {
      const escId = pill.dataset.esc;
      const soundIdx = parseInt(pill.dataset.sound);
      const st = ESCENARIO_STATE[escId];
      st.activeSound = soundIdx;
      if (st.playing) {
        playEscenario(escId);
      }
      renderEscenarios();
    });
  });

  // Eventos play/stop
  $$('.escenario-play').forEach(btn => {
    btn.addEventListener('click', () => {
      const escId = btn.dataset.esc;
      const st = ESCENARIO_STATE[escId];
      if (st.playing) {
        stopAllAudio();
        st.playing = false;
      } else {
        stopAllAudio();
        ESCENARIOS.forEach(e => { ESCENARIO_STATE[e.id].playing = false; });
        st.playing = true;
        playEscenario(escId);
      }
      renderEscenarios();
    });
  });
}

function playEscenario(escId) {
  const esc = ESCENARIOS.find(e => e.id === escId);
  const st = ESCENARIO_STATE[escId];
  const sound = esc.sounds[st.activeSound];
  const audio = new Audio(sound.file);
  audio.loop = true;
  audio.volume = 0.75;
  audio.play().catch(() => showToast('⚠ No se pudo reproducir'));
  STATE.currentAudioEl = audio;
  showToast(`♫ ${esc.title} · ${sound.label}`);
}

function updatePlayer(idx) {}

// Estado audiolibros
const BOOK_STATE = {};

function renderAudiobooks() {
  $('#audiobooks-grid').innerHTML = AUDIOBOOKS.map((b, i) => {
    const playing = BOOK_STATE[i] && BOOK_STATE[i].playing;
    return `
    <div class="audiobook-card ${playing ? 'ring-1 ring-gold/50' : ''}" data-book="${i}">
      <div class="audiobook-cover">${b.emoji}</div>
      <div class="flex-1">
        <p class="font-display text-lg italic text-stone-200 leading-tight">${b.title}</p>
        <p class="font-mono text-xs text-stone-600 mb-2">${b.author} · ${b.duration}</p>
        <p class="font-body text-xs text-stone-500 leading-relaxed line-clamp-3">${b.summary}</p>
        ${b.file ? `<button class="mt-3 font-mono text-xs px-4 py-1.5 rounded-full border transition-all ${playing ? 'border-gold text-gold' : 'border-stone-600 text-stone-500'}" data-book-play="${i}">
          ${playing ? '■ DETENER' : '▶ ESCUCHAR'}
        </button>` : ''}
      </div>
    </div>
  `}).join('');

  $$('[data-book-play]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = parseInt(btn.dataset.bookPlay);
      const b = AUDIOBOOKS[i];
      const st = BOOK_STATE[i] || { playing: false };

      if (st.playing) {
        stopAllAudio();
        BOOK_STATE[i] = { playing: false };
      } else {
        stopAllAudio();
        Object.keys(BOOK_STATE).forEach(k => { BOOK_STATE[k] = { playing: false }; });
        const audio = new Audio(b.file);
        audio.volume = 1.0;
        audio.play().catch(() => showToast('⚠ No se pudo reproducir'));
        audio.onended = () => { BOOK_STATE[i] = { playing: false }; renderAudiobooks(); };
        STATE.currentAudioEl = audio;
        BOOK_STATE[i] = { playing: true };
        showToast(`📖 ${b.title} — reproduciendo`, 2000);
      }
      renderAudiobooks();
    });
  });
}

// ─────────────────────────────────────────────
// MEDITATION TIMER
// ─────────────────────────────────────────────

function initMeditation() {
  $$('.med-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.med-preset').forEach(b => b.classList.remove('active-preset'));
      btn.classList.add('active-preset');
      STATE.medSeconds = parseInt(btn.dataset.mins) * 60;
      updateMedDisplay();
      if (STATE.medActive) stopMeditation();
    });
  });

  $('#btn-med-start').addEventListener('click', () => {
    if (STATE.medActive) { pauseMeditation(); }
    else { startMeditation(); }
  });
  $('#btn-med-reset').addEventListener('click', resetMeditation);
}

function startMeditation() {
  STATE.medActive = true;
  $('#meditation-ring').classList.add('active');
  STATE.medInterval = setInterval(() => {
    if (STATE.medSeconds <= 0) {
      completeMeditation();
      return;
    }
    STATE.medSeconds--;
    updateMedDisplay();
  }, 1000);
}

function pauseMeditation() {
  STATE.medActive = false;
  clearInterval(STATE.medInterval);
  $('#meditation-ring').classList.remove('active');
}

function stopMeditation() {
  STATE.medActive = false;
  clearInterval(STATE.medInterval);
  $('#meditation-ring').classList.remove('active');
}

function resetMeditation() {
  stopMeditation();
  const activePreset = $('.active-preset');
  STATE.medSeconds = activePreset ? parseInt(activePreset.dataset.mins) * 60 : 600;
  updateMedDisplay();
}

function completeMeditation() {
  stopMeditation();
  showToast('🧘 Meditación completada. Bien hecho.', 3500);
  STATE.medSeconds = 0;
  updateMedDisplay();
  // Mark Meditar pillar
  const today = todayKey();
  if (!STATE.pillarsToday[today]) STATE.pillarsToday[today] = {};
  STATE.pillarsToday[today]['M'] = true;
  save();
}

function updateMedDisplay() {
}

// ─────────────────────────────────────────────
// CUERPO VIEW
// ─────────────────────────────────────────────

const COACH_TIPS = [
  "El dolor de hoy es la fortaleza de mañana. No negocies con la incomodidad.",
  "El cuerpo es el templo de la mente. Trátalo como tal.",
  "Cada repetición es una decisión. Cada decisión construye carácter.",
  "No busques motivación. Busca disciplina. La motivación pasa, la disciplina permanece.",
  "El guerrero no entrena cuando tiene ganas. Entrena siempre.",
  "Un cuerpo fuerte sostiene una mente fuerte. Empieza.",
  "La constancia supera al talento. Siempre.",
];

function renderCuerpo(routine = STATE.currentRoutine) {
  STATE.currentRoutine = routine;
  $$('.routine-tab').forEach(t => {
    t.classList.toggle('active-tab', t.dataset.routine === routine);
  });

  const exercises = ROUTINES[routine];
  $('#routine-content').innerHTML = `
    <div class="mb-4 rounded-xl bg-stone-800/40 border border-stone-700/50 p-4">
      <p class="font-mono text-xs text-stone-500 tracking-widest mb-1">CONSEJO DEL COACH</p>
      <p class="font-display italic text-stone-300 text-base">${COACH_TIPS[Math.floor(Math.random() * COACH_TIPS.length)]}</p>
    </div>
    <div class="space-y-3">
      ${exercises.map((ex, i) => `
        <div class="exercise-card">
          <div class="exercise-header" data-ex="${i}">
            <div>
              <p class="font-body text-sm text-stone-200">${ex.name}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="font-mono text-xs text-stone-600">⏱ ${ex.duration}</span>
                <span class="font-mono text-xs text-stone-600">📊 ${ex.level}</span>
              </div>
            </div>
            <svg class="chevron w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <div class="exercise-body" id="ex-body-${i}">
            <div class="px-4 pb-4 pt-2 border-t border-stone-700/50">
              ${ex.steps.map((s, j) => `
                <div class="step-item">
                  <div class="step-num">${j + 1}</div>
                  <p class="font-body text-xs text-stone-400 leading-relaxed flex-1">${s}</p>
                </div>
              `).join('')}
              ${ex.img ? `
              <div class="mt-4 rounded-xl overflow-hidden border border-stone-700/40">
                <img src="${ex.img}" alt="${ex.name}" class="w-full object-cover" loading="lazy" />
              </div>` : ''}
              <button class="mt-3 btn-primary w-full py-2.5 rounded-xl font-mono text-xs tracking-wider" data-start-routine="${i}">
                INICIAR RUTINA
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  $$('[data-ex]').forEach(header => {
    header.addEventListener('click', () => {
      const i = header.dataset.ex;
      const body = $(`#ex-body-${i}`);
      const chevron = header.querySelector('.chevron');
      body.classList.toggle('open');
      chevron.classList.toggle('open');
    });
  });

  $$('[data-start-routine]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.startRoutine);
      const ex = exercises[idx];
      const isPlaying = STATE.currentAudioEl && !STATE.currentAudioEl.paused && btn.dataset.playing === '1';

      if (isPlaying) {
        stopAllAudio();
        btn.textContent = 'INICIAR RUTINA';
        btn.dataset.playing = '0';
        return;
      }

      showToast(`💪 ${ex.name} iniciado · ${ex.duration}`);
      btn.textContent = 'DETENER';
      btn.dataset.playing = '1';

      const today = todayKey();
      if (!STATE.pillarsToday[today]) STATE.pillarsToday[today] = {};
      STATE.pillarsToday[today]['E'] = true;
      save();

      if (ex.audio) {
        stopAllAudio();
        setTimeout(() => {
          const audio = new Audio(ex.audio);
          audio.volume = 1.0;
          audio.play().catch(() => {});
          audio.onended = () => {
            btn.textContent = 'INICIAR RUTINA';
            btn.dataset.playing = '0';
          };
          STATE.currentAudioEl = audio;
        }, 3000);
      }
    });
  });
}

// ─────────────────────────────────────────────
// TEMPLO VIEW
// ─────────────────────────────────────────────

function renderTemplo(tab = STATE.currentNutr) {
  STATE.currentNutr = tab;
  $$('.nutr-tab').forEach(t => t.classList.toggle('active-nutr', t.dataset.nutr === tab));

  const data = NUTRITION[tab];
  $('#nutrition-content').innerHTML = `
    <div class="rounded-xl bg-stone-800/40 border border-stone-700/50 p-4 mb-5">
      <p class="font-mono text-xs text-stone-500 tracking-widest mb-1">${data.title.toUpperCase()}</p>
      <p class="font-display italic text-stone-300 text-base leading-relaxed">${data.desc}</p>
    </div>
    ${data.foods.map(f => `
      <div class="food-card mb-3">
        <div class="food-emoji">${f.emoji}</div>
        <p class="font-body font-medium text-stone-200 text-sm mb-2">${f.name}</p>
        <ul class="space-y-1">
          ${f.items.map(item => `<li class="font-body text-xs text-stone-500 flex gap-2"><span class="text-stone-700 flex-shrink-0">·</span>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
    <div class="rounded-xl border border-stone-700 bg-stone-800/30 p-4 mt-2">
      <p class="font-mono text-xs text-stone-500 tracking-widest mb-2">PROTOCOLO</p>
      <p class="font-body text-xs text-stone-400 leading-relaxed">${data.protocol}</p>
      ${data.warning ? `<p class="font-mono text-xs text-ember/70 mt-3">${data.warning}</p>` : ''}
    </div>
  `;
}

// ─────────────────────────────────────────────
// DIARIO VIEW
// ─────────────────────────────────────────────

let mediaRecorder = null;
let audioChunks = [];
let recTimer = null;
let recSeconds = 0;

function renderDiario() {
  renderEntries();
}

function renderEntries(filterTag = '') {
  let entries = [...STATE.entries].reverse();
  if (filterTag) entries = entries.filter(e => e.tags && e.tags.includes(filterTag));

  if (entries.length === 0) {
    $('#entries-list').innerHTML = '';
    $('#entries-empty').classList.remove('hidden');
    return;
  }
  $('#entries-empty').classList.add('hidden');

  $('#entries-list').innerHTML = entries.map(e => `
    <div class="diary-entry" data-entry-id="${e.id}">
      <div class="flex items-start justify-between mb-2">
        <p class="font-display italic text-stone-200 text-base leading-tight">${e.title || 'Sin título'}</p>
        <div class="flex items-center gap-1.5 ml-3 flex-shrink-0">
          ${e.audioData ? '<span class="text-gold text-xs" title="Nota de voz">🎙</span>' : ''}
        </div>
      </div>
      <p class="font-body text-xs text-stone-500 leading-relaxed line-clamp-2 mb-2">${e.body || ''}</p>
      <div class="flex items-center justify-between">
        <div class="flex gap-1 flex-wrap">
          ${(e.tags || []).map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
        <span class="font-mono text-xs text-stone-700">${new Date(e.date).toLocaleDateString('es-ES', {day:'numeric',month:'short'})}</span>
      </div>
    </div>
  `).join('');

  $$('[data-entry-id]').forEach(card => {
    card.addEventListener('click', () => {
      const entry = STATE.entries.find(e => e.id === card.dataset.entryId);
      if (entry) openEntryModal(entry);
    });
  });
}

function openEntryModal(entry) {
  STATE.currentEntryForModal = entry;
  $('#modal-entry-tags').innerHTML = (entry.tags || []).map(t => `<span class="tag-badge">${t}</span>`).join('');

  const audioSection = $('#modal-entry-audio');
  if (entry.audioData) {
    audioSection.classList.remove('hidden');
    audioSection.classList.add('flex');
    const modalAudio = new Audio(entry.audioData);
    $('#modal-play-audio').addEventListener('click', () => {
      if (modalAudio.paused) {
        modalAudio.play();
      } else {
        modalAudio.pause();
      }
    });
    modalAudio.addEventListener('timeupdate', () => {
      const pct = modalAudio.duration ? (modalAudio.currentTime / modalAudio.duration) * 100 : 0;
      $('#modal-audio-progress').style.width = pct + '%';
    });
  } else {
    audioSection.classList.add('hidden');
  }

  const modal = $('#modal-entry');
  modal.classList.remove('hidden');
  modal.classList.add('open');
}

function initDiario() {
  // Tag selection
  $$('.entry-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const t = tag.dataset.tag;
      if (STATE.selectedTags.has(t)) {
        STATE.selectedTags.delete(t);
        tag.classList.remove('selected');
      } else {
        STATE.selectedTags.add(t);
        tag.classList.add('selected');
      }
    });
  });

  // Voice recording
  $('#btn-voice').addEventListener('click', toggleRecording);

  // Save entry
  $('#btn-save-entry').addEventListener('click', saveEntry);

  // Filter
  $('#filter-tag').addEventListener('change', e => renderEntries(e.target.value));

  // Modal close
  $('#btn-close-entry').addEventListener('click', closeEntryModal);
  $('#modal-entry .modal-overlay').addEventListener('click', closeEntryModal);

  // Delete entry
  $('#btn-delete-entry').addEventListener('click', () => {
    if (!STATE.currentEntryForModal) return;
    STATE.entries = STATE.entries.filter(e => e.id !== STATE.currentEntryForModal.id);
    save();
    closeEntryModal();
    renderEntries();
    showToast('Entrada eliminada');
  });

  // Voice preview play
  $('#btn-play-preview').addEventListener('click', () => {
    if (!STATE.voiceURL) return;
    const audio = new Audio(STATE.voiceURL);
    audio.play();
  });

  // Delete voice
  $('#btn-delete-voice').addEventListener('click', () => {
    STATE.voiceBlob = null;
    STATE.voiceURL = null;
    $('#voice-preview').classList.add('hidden');
  });
}

function closeEntryModal() {
  const modal = $('#modal-entry');
  modal.classList.remove('open');
  modal.classList.add('hidden');
  STATE.currentEntryForModal = null;
}

async function toggleRecording() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        STATE.voiceBlob = blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          STATE.voiceURL = reader.result;
          $('#voice-preview').classList.remove('hidden');
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
      recSeconds = 0;
      $('#voice-timer').classList.remove('hidden');
      recTimer = setInterval(() => {
        recSeconds++;
      }, 1000);
      $('#btn-voice').classList.add('recording');
    } catch (err) {
      showToast('🎙 Permiso de micrófono denegado');
    }
  } else {
    mediaRecorder.stop();
    clearInterval(recTimer);
    $('#voice-timer').classList.add('hidden');
    $('#btn-voice').classList.remove('recording');
  }
}

function saveEntry() {
  const title = $('#entry-title').value.trim();
  const body = $('#entry-body').value.trim();
  if (!title && !body) {
    showToast('Escribe algo antes de guardar.');
    return;
  }
  const entry = {
    id:        uid(),
    date:      new Date().toISOString(),
    title:     title || 'Sin título',
    body,
    tags:      Array.from(STATE.selectedTags),
    audioData: STATE.voiceURL || null,
  };
  STATE.entries.push(entry);
  save();

  // Reset form
  $('#entry-title').value = '';
  $('#entry-body').value = '';
  STATE.selectedTags.clear();
  $$('.entry-tag').forEach(t => t.classList.remove('selected'));
  STATE.voiceBlob = null;
  STATE.voiceURL = null;
  $('#voice-preview').classList.add('hidden');

  renderEntries($('#filter-tag').value);
  showToast('✍ Reflexión guardada en el diario');
}

// ─────────────────────────────────────────────
// SETTINGS MODAL (simple toggle)
// ─────────────────────────────────────────────

$('#btn-settings').addEventListener('click', () => {
});

// ─────────────────────────────────────────────
// MODALS: GOAL
// ─────────────────────────────────────────────

function initGoalModal() {
  $('#btn-add-goal').addEventListener('click', () => {
    const modal = $('#modal-goal');
    modal.classList.remove('hidden');
    modal.classList.add('open');
  });
  $('#btn-cancel-goal').addEventListener('click', closeGoalModal);
  $('#modal-goal .modal-overlay').addEventListener('click', closeGoalModal);
  $('#btn-confirm-goal').addEventListener('click', () => {
    const text = $('#goal-text').value.trim();
    if (!text) return;
    STATE.goals.push({
      id:     uid(),
      text,
      scope:  $('#goal-scope').value,
      pillar: $('#goal-pillar').value,
      done:   false,
    });
    save();
    $('#goal-text').value = '';
    closeGoalModal();
    renderGoals();
    showToast('🎯 Objetivo añadido');
  });
}

function closeGoalModal() {
  const modal = $('#modal-goal');
  modal.classList.remove('open');
  modal.classList.add('hidden');
}

// ─────────────────────────────────────────────
// PLAYER (Mantras)
// ─────────────────────────────────────────────

function initPlayer() {
  $('#player-play').addEventListener('click', () => {
    showToast('♫ Reproduciendo — conecta audio real para escuchar');
  });
  $('#player-prev').addEventListener('click', () => {
    if (STATE.currentMantraIdx > 0) {
      STATE.currentMantraIdx--;
      updatePlayer(STATE.currentMantraIdx);
      renderMantras();
    }
  });
  $('#player-next').addEventListener('click', () => {
    if (STATE.currentMantraIdx < MANTRAS.length - 1) {
      STATE.currentMantraIdx++;
      updatePlayer(STATE.currentMantraIdx);
      renderMantras();
    }
  });
}

// ─────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────

function boot() {
  // Navigation
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.view));
  });

  // Routine tabs
  $$('.routine-tab').forEach(tab => {
    tab.addEventListener('click', () => renderCuerpo(tab.dataset.routine));
  });

  // Nutrition tabs
  $$('.nutr-tab').forEach(tab => {
    tab.addEventListener('click', () => renderTemplo(tab.dataset.nutr));
  });

  // Init modules
  initMeditation();
  initGoalModal();
  initPlayer();
  initDiario();
  initSettings();
  initCoachIA();

  // Render initial views
  renderCoach();
  renderEspiritu();
  renderCuerpo();
  renderTemplo();
  renderDiario();


  // Hide loader
  setTimeout(() => {
    $('#loader').classList.add('hidden-loader');
    const app = $('#app');
    app.style.opacity = '1';
  }, 1800);
}

// ─────────────────────────────────────────────
// PWA Service Worker Registration
// ─────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
  // Precargar audios en background
  if ('caches' in window) preloadAudios();
}


// ─────────────────────────────────────────────
// PRELOAD AUDIOS OFFLINE
// ─────────────────────────────────────────────
async function preloadAudios() {
  const files = [
    './audio/audiolibros/marco.opus',
    './audio/audiolibros/epicteto.opus',
    './audio/audiolibros/poder_ahora.opus',
    './audio/audiolibros/habitos.opus',
    './audio/audiolibros/frankl.opus',
    './audio/audiolibros/kybalion.opus',
    './audio/sonidos/cuencos.opus',
    './audio/sonidos/grillos.opus',
    './audio/sonidos/lluvia.opus',
    './audio/sonidos/mantra.opus',
    './audio/sonidos/mar.opus',
    './audio/sonidos/pajaros.opus',
    './audio/sonidos/viento.opus',
    './audio/yoga/saludo.opus',
    './audio/yoga/guerrero.opus',
    './audio/yoga/restauracion.opus',
    './audio/yoga/kundalini.opus',
  ];
  try {
    const cache = await caches.open('umbral-audio-v1');
    for (const url of files) {
      const match = await cache.match(url);
      if (!match) {
        try {
          const response = await fetch(url);
          if (response.ok) await cache.put(url, response);
        } catch (e) {}
      }
    }
  } catch (e) {}
}

// ─────────────────────────────────────────────
// SETTINGS MODAL
// ─────────────────────────────────────────────

function initSettings() {
  const modal     = $('#modal-settings');
  const input     = $('#settings-apikey');
  const status    = $('#settings-key-status');

  function openSettings() {
    const existing = localStorage.getItem('umbral_api_key');
    input.value = existing ? '••••••••••••••••••••' : '';
    status.textContent = existing ? '✓ Clave guardada en este dispositivo' : '';
    status.style.color = existing ? 'var(--gold)' : '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeSettings() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  $('#btn-settings').addEventListener('click', openSettings);
  $('#btn-open-settings-coach')?.addEventListener('click', openSettings);
  $('#btn-close-settings').addEventListener('click', closeSettings);
  modal.querySelector('.modal-overlay').addEventListener('click', closeSettings);

  $('#btn-save-key').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val || val.startsWith('•')) {
      showToast('⚠ Pegá una clave válida');
      return;
    }
    localStorage.setItem('umbral_api_key', val);
    status.textContent = '✓ Clave guardada';
    status.style.color = 'var(--gold)';
    showToast('🔑 API Key guardada');
    updateCoachIAUI();
    setTimeout(closeSettings, 800);
  });

  $('#btn-clear-key').addEventListener('click', () => {
    localStorage.removeItem('umbral_api_key');
    input.value = '';
    status.textContent = 'Clave eliminada';
    status.style.color = 'var(--stone-500)';
    updateCoachIAUI();
    showToast('Clave eliminada');
  });
}

// ─────────────────────────────────────────────
// COACH IA
// ─────────────────────────────────────────────

function updateCoachIAUI() {
  const hasKey = !!localStorage.getItem('umbral_api_key');
  $('#coach-ia-no-key').classList.toggle('hidden', hasKey);
  $('#coach-ia-input-area').classList.toggle('hidden', !hasKey);
}

function buildCoachContext() {
  const today = todayKey();
  const pillars = STATE.pillarsToday[today] || {};
  const completedPillars = PILLARS.filter(p => pillars[p.key]).map(p => p.label);
  const pendingPillars   = PILLARS.filter(p => !pillars[p.key]).map(p => p.label);

  const activeGoals = STATE.goals.filter(g => !g.done).slice(0, 5).map(g => g.text);

  const recentEntries = STATE.entries.slice(0, 3).map(e =>
    `[${e.date || ''}] ${e.text ? e.text.substring(0, 120) : ''}`.trim()
  ).filter(Boolean);

  return `Sos Umbral, un coach personal integral. Ayudás al usuario con cualquier tema que traiga: hábitos, salud, alimentación, ejercicio, emociones, trabajo, relaciones, metas personales. Tu estilo es directo, cálido y con sabiduría estoica cuando aplica — no la imponés en cada respuesta. Hablás en español rioplatense. Máximo 4 oraciones. Sin listas ni títulos. Respondés específicamente lo que te preguntan, sin desviar hacia rutinas si no te lo pidieron.

Contexto del usuario hoy:
- Pilares completados: ${completedPillars.length ? completedPillars.join(', ') : 'ninguno aún'}
- Pilares pendientes: ${pendingPillars.length ? pendingPillars.join(', ') : 'todos completados'}
- Objetivos activos: ${activeGoals.length ? activeGoals.join(' | ') : 'sin objetivos definidos'}
- Reflexiones recientes: ${recentEntries.length ? recentEntries.join(' || ') : 'sin entradas'}`;
}

async function askCoach() {
  const apiKey = localStorage.getItem('umbral_api_key');
  if (!apiKey) { showToast('⚠ Configurá tu API Key primero'); return; }

  const userMsg = $('#coach-ia-input').value.trim();
  if (!userMsg) { showToast('Escribí tu consulta'); return; }

  const btn        = $('#btn-ask-coach');
  const btnText    = $('#coach-ia-btn-text');
  const loading    = $('#coach-ia-loading');
  const responseEl = $('#coach-ia-response');
  const textEl     = $('#coach-ia-text');

  btn.disabled = true;
  btnText.textContent = 'CONSULTANDO...';
  loading.classList.remove('hidden');
  loading.style.animation = 'sigil-spin 1s linear infinite';
  responseEl.classList.add('hidden');

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://brunodonof4-netizen.github.io/umbral',
        'X-Title': 'Umbral by AS'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: buildCoachContext() },
          { role: 'user',   content: userMsg }
        ],
        max_tokens: 200,
        temperature: 0.8
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('ERROR COACH:', errText);
      showToast(`Error ${res.status} — revisá tu API Key`);
      return;
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (reply) {
      textEl.textContent = reply.trim();
      responseEl.classList.remove('hidden');
      $('#coach-ia-input').value = '';
    } else {
      showToast('Respuesta vacía — intentá de nuevo');
    }

  } catch (e) {
    showToast('Sin conexión — verificá internet');
  } finally {
    btn.disabled = false;
    btnText.textContent = 'CONSULTAR AL COACH';
    loading.classList.add('hidden');
  }
}

function initCoachIA() {
  updateCoachIAUI();
  $('#btn-ask-coach').addEventListener('click', askCoach);
  $('#coach-ia-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askCoach(); }
  });
}

// Start
document.addEventListener('DOMContentLoaded', boot);
