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

const MANTRAS = [
  { id: 'm1', title: 'Mantra de la Calma', subtitle: '432Hz · Tibetan Bowls', icon: '🎵', bg: '#2a1f1a', freq: '432hz' },
  { id: 'm2', title: 'Silencio Interior',   subtitle: 'Meditación Vipassana', icon: '🔔', bg: '#1a2a1a', freq: '528hz' },
  { id: 'm3', title: 'Fuego Estoico',        subtitle: 'Concentración Profunda', icon: '🕯', bg: '#2a1a10', freq: '40hz' },
  { id: 'm4', title: 'Respiración del Guerrero', subtitle: 'Coherencia Cardíaca', icon: '🌬', bg: '#1a1a2a', freq: '174hz' },
];

const AUDIOBOOKS = [
  { title: 'Meditaciones', author: 'Marco Aurelio', emoji: '📜', duration: '4h 12m', summary: 'El diario privado de un emperador que ejercía el estoicismo a diario. Sus reflexiones sobre el control de la mente, la virtud y la muerte son atemporales.' },
  { title: 'Cartas a Lucilio', author: 'Séneca', emoji: '✉️', duration: '6h 30m', summary: 'El maestro de la filosofía práctica escribe sobre la amistad, el tiempo, la riqueza y el miedo. Cada carta es una lección de vida directa.' },
  { title: 'Manual de Vida', author: 'Epicteto', emoji: '⚖️', duration: '1h 45m', summary: 'El esclavo que se convirtió en el filósofo más libre. Separa lo que depende de ti de lo que no. La base del estoicismo práctico.' },
  { title: 'El Obstáculo es el Camino', author: 'Ryan Holiday', emoji: '🪨', duration: '3h 20m', summary: 'Aplicación moderna del estoicismo. Cada obstáculo que enfrentas es una oportunidad disfrazada. Leer esto cambia tu percepción del fracaso.' },
  { title: 'Sobre la Brevedad de la Vida', author: 'Séneca', emoji: '⏳', duration: '1h 10m', summary: 'No tenemos poco tiempo; lo desperdiciamos. Séneca te desafía a reclamar cada hora con intención y claridad.' },
];

const ROUTINES = {
  yoga: [
    { name: 'Saludo al Sol', duration: '10 min', level: 'Todos', steps: ['De pie, pies juntos. Inspira y levanta los brazos.', 'Exhala y dobla hacia adelante. Manos al suelo.', 'Inhala, pierna derecha atrás. Coxis hacia abajo.', 'Retén. Tabla alta. Mantén el cuerpo alineado.', 'Exhala, baja al suelo. Cobra pose. Inhala.', 'Perro boca abajo. Exhala profundo. 5 respiraciones.', 'Vuelve al inicio. Repite 5 rondas.'] },
    { name: 'Guerrero del Silencio', duration: '15 min', level: 'Intermedio', steps: ['Guerrero I: pie izquierdo adelante, rodilla a 90°.', 'Brazos arriba, hombros bajos. Respira 5 veces.', 'Guerrero II: abre los brazos al lado. Mira adelante.', 'Ángulo extendido: brazo adelante apoya en muslo.', 'Triángulo: extiende el torso lateral. Mano al tobillo.', 'Repite el lado opuesto. Simetría es disciplina.'] },
    { name: 'Restauración Nocturna', duration: '20 min', level: 'Fácil', steps: ['Postura del niño. 2 minutos. Suelta el día.', 'Postura del cadáver modificado: piernas en mariposa.', 'Torsión supina derecha. Rodilla al pecho, gira.', 'Torsión supina izquierda. Misma duración.', 'Piernas arriba en la pared. 5 minutos.', 'Savasana final. No hagas nada. Ese es el trabajo.'] },
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
  streak: 0),
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

function updateStreak() {
  const today = todayKey();
  if (STATE.lastActive !== today) {
    const yesterday = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; })();
    STATE.lastActive = today;
    save();
  }
}

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

  // Daily stoic
  const q = STOIC_QUOTES[new Date().getDate() % STOIC_QUOTES.length];
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
  renderMantras();
  renderAudiobooks();
}

function renderMantras() {
  const list = $('#mantras-list');
  list.innerHTML = MANTRAS.map((m, i) => `
    <div class="mantra-item ${STATE.currentMantraIdx === i ? 'playing' : ''}" data-mantra="${i}">
      <div class="mantra-icon" style="background:${m.bg}">${m.icon}</div>
      <div class="flex-1">
        <p class="font-body text-sm text-stone-200">${m.title}</p>
        <p class="font-mono text-xs text-stone-600">${m.subtitle}</p>
      </div>
      <span class="font-mono text-xs text-stone-600">${m.freq}</span>
      ${STATE.currentMantraIdx === i ? '<span class="text-gold text-sm">▶</span>' : ''}
    </div>
  `).join('');

  $$('[data-mantra]').forEach(item => {
    item.addEventListener('click', () => {
      const i = parseInt(item.dataset.mantra);
      STATE.currentMantraIdx = i;
      updatePlayer(i);
      renderMantras();
    });
  });
}

function updatePlayer(idx) {
  const m = MANTRAS[idx];
  const bar = $('#player-bar');
  bar.classList.remove('hidden');
  // Simulate audio playback (real audio requires URLs)
  showToast(`♫ ${m.title} — reproduciendo`);
}

function renderAudiobooks() {
  $('#audiobooks-grid').innerHTML = AUDIOBOOKS.map((b, i) => `
    <div class="audiobook-card" data-book="${i}">
      <div class="audiobook-cover">${b.emoji}</div>
      <div class="flex-1">
        <p class="font-display text-lg italic text-stone-200 leading-tight">${b.title}</p>
        <p class="font-mono text-xs text-stone-600 mb-2">${b.author} · ${b.duration}</p>
        <p class="font-body text-xs text-stone-500 leading-relaxed line-clamp-3">${b.summary}</p>
      </div>
    </div>
  `).join('');

  $$('[data-book]').forEach(card => {
    card.addEventListener('click', () => {
      const b = AUDIOBOOKS[parseInt(card.dataset.book)];
      showToast(`📖 "${b.title}" — Resumen disponible`, 3000);
      card.classList.toggle('border-gold');
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

function renderCuerpo(routine = STATE.currentRoutine) {
  STATE.currentRoutine = routine;
  $$('.routine-tab').forEach(t => {
    t.classList.toggle('active-tab', t.dataset.routine === routine);
  });

  const exercises = ROUTINES[routine];
  $('#routine-content').innerHTML = `
    <div class="mb-4 rounded-xl bg-stone-800/40 border border-stone-700/50 p-4">
      <p class="font-mono text-xs text-stone-500 tracking-widest mb-1">CONSEJO DEL COACH</p>
      <p class="font-display italic text-stone-300 text-base">"El dolor de hoy es la fortaleza de mañana. No negocies con la incomodidad."</p>
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
      const ex = exercises[parseInt(btn.dataset.startRoutine)];
      showToast(`💪 ${ex.name} iniciado · ${ex.duration}`);
      // Mark Entrenar pillar
      const today = todayKey();
      if (!STATE.pillarsToday[today]) STATE.pillarsToday[today] = {};
      STATE.pillarsToday[today]['E'] = true;
      save();
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

  // Render initial views
  renderCoach();
  renderEspiritu();
  renderCuerpo();
  renderTemplo();
  renderDiario();

  updateStreak();

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
}

// Start
document.addEventListener('DOMContentLoaded', boot);
