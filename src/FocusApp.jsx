import { useState, useEffect, useRef } from "react";
import {
  Plus, Play, Pause, Trash2, Volume2, VolumeX, Zap, Maximize2, X,
  Pencil, ChevronDown, StickyNote, Mail, MapPin, Calendar, LogOut, Sparkles,
  ChevronLeft, ChevronRight, Camera, BarChart3, Wind, CloudRain, Coffee, Trees, Music,
  Brain, Flame, Heart, Moon, TrendingUp, Award, Clock, CheckCircle2,
  Upload, Headphones, Search, Briefcase, Dumbbell, Utensils, BookOpen,
  Bike, Waves, Mountain, Activity, Footprints, Target, ShoppingCart,
  Home, GraduationCap, Palette, Pill, Plane, Users, Phone, Hammer,
  Check, Plus as PlusIcon
} from "lucide-react";

const DAY_THEMES = [
  { name: "Lundi",    short: "Lun", glow: "#A78BFA", accent: "#A78BFA", mood: "Recommencement" },
  { name: "Mardi",    short: "Mar", glow: "#60A5FA", accent: "#60A5FA", mood: "Concentration" },
  { name: "Mercredi", short: "Mer", glow: "#34D399", accent: "#34D399", mood: "Équilibre" },
  { name: "Jeudi",    short: "Jeu", glow: "#FBBF24", accent: "#FBBF24", mood: "Élan" },
  { name: "Vendredi", short: "Ven", glow: "#FB923C", accent: "#FB923C", mood: "Énergie" },
  { name: "Samedi",   short: "Sam", glow: "#F472B6", accent: "#F472B6", mood: "Liberté" },
  { name: "Dimanche", short: "Dim", glow: "#94A3B8", accent: "#94A3B8", mood: "Repos" },
];

const todayIndex = () => {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
};

const AMBIENT_SOUNDS = [
  { id: "rain", name: "Pluie douce", icon: CloudRain, color: "#60A5FA" },
  { id: "forest", name: "Forêt", icon: Trees, color: "#34D399" },
  { id: "cafe", name: "Café", icon: Coffee, color: "#FB923C" },
  { id: "lofi", name: "Lo-Fi", icon: Music, color: "#A78BFA" },
  { id: "wind", name: "Vent", icon: Wind, color: "#94A3B8" },
];

const MEDITATIONS = [
  { id: "breath-478", name: "Respiration 4-7-8", duration: 5, icon: Wind, color: "#60A5FA",
    description: "Inspirez 4s · Retenez 7s · Expirez 8s",
    script: "Installez-vous confortablement... Fermez les yeux..." },
  { id: "body-scan", name: "Scan corporel", duration: 10, icon: Heart, color: "#F472B6",
    description: "Détendez chaque partie du corps", script: "Commencez par détendre votre tête..." },
  { id: "focus", name: "Concentration", duration: 5, icon: Brain, color: "#A78BFA",
    description: "Préparez votre esprit au travail", script: "Concentrez-vous sur votre respiration..." },
  { id: "energy", name: "Énergie matinale", duration: 7, icon: Flame, color: "#FB923C",
    description: "Démarrez la journée avec vitalité", script: "Sentez l'énergie circuler..." },
  { id: "sleep", name: "Détente du soir", duration: 12, icon: Moon, color: "#94A3B8",
    description: "Préparez le corps au sommeil", script: "Relâchez les tensions..." },
];

const TASK_CATEGORIES = [
  { id: "sport", name: "Sport", icon: Dumbbell, color: "#FF6B6B",
    subcategories: [
      { name: "Musculation", icon: Dumbbell }, { name: "Cardio", icon: Activity },
      { name: "Course à pied", icon: Footprints }, { name: "Vélo", icon: Bike },
      { name: "Natation", icon: Waves }, { name: "Yoga", icon: Heart },
      { name: "Pilates", icon: Activity }, { name: "CrossFit", icon: Flame },
      { name: "HIIT", icon: Zap }, { name: "Boxe", icon: Target },
      { name: "Football", icon: Target }, { name: "Basketball", icon: Target },
      { name: "Tennis", icon: Target }, { name: "Randonnée", icon: Mountain },
      { name: "Escalade", icon: Mountain }, { name: "Stretching", icon: Activity },
      { name: "Marche active", icon: Footprints }, { name: "Danse", icon: Music },
      { name: "Arts martiaux", icon: Target }, { name: "Skateboard", icon: Activity },
    ] },
  { id: "work", name: "Travail", icon: Briefcase, color: "#4ECDC4",
    subcategories: [
      { name: "Travail concentré", icon: Brain }, { name: "Réunion", icon: Users },
      { name: "Mails", icon: Mail }, { name: "Appels", icon: Phone },
      { name: "Brainstorming", icon: Sparkles }, { name: "Présentation", icon: BarChart3 },
      { name: "Création", icon: Palette }, { name: "Administratif", icon: BookOpen },
    ] },
  { id: "meditation", name: "Méditation", icon: Brain, color: "#A78BFA",
    subcategories: [
      { name: "Respiration 4-7-8", icon: Wind, meditationId: "breath-478" },
      { name: "Scan corporel", icon: Heart, meditationId: "body-scan" },
      { name: "Concentration", icon: Brain, meditationId: "focus" },
      { name: "Énergie matinale", icon: Flame, meditationId: "energy" },
      { name: "Détente du soir", icon: Moon, meditationId: "sleep" },
    ] },
  { id: "meal", name: "Repas", icon: Utensils, color: "#FFE66D",
    subcategories: [
      { name: "Petit déjeuner", icon: Utensils }, { name: "Déjeuner", icon: Utensils },
      { name: "Dîner", icon: Utensils }, { name: "Collation", icon: Utensils },
      { name: "Préparation repas", icon: Hammer },
    ] },
  { id: "study", name: "Étude", icon: GraduationCap, color: "#60A5FA",
    subcategories: [
      { name: "Lecture", icon: BookOpen }, { name: "Révisions", icon: GraduationCap },
      { name: "Cours en ligne", icon: GraduationCap }, { name: "Devoirs", icon: BookOpen },
      { name: "Recherche", icon: Search }, { name: "Apprendre une langue", icon: GraduationCap },
    ] },
  { id: "errand", name: "Courses & vie", icon: ShoppingCart, color: "#FB923C",
    subcategories: [
      { name: "Courses", icon: ShoppingCart }, { name: "Ménage", icon: Home },
      { name: "Lessive", icon: Home }, { name: "Cuisine", icon: Utensils },
      { name: "Rangement", icon: Home }, { name: "Bricolage", icon: Hammer },
    ] },
  { id: "wellness", name: "Bien-être", icon: Heart, color: "#F472B6",
    subcategories: [
      { name: "Douche", icon: Waves }, { name: "Skincare", icon: Sparkles },
      { name: "Médicaments", icon: Pill }, { name: "Journal", icon: BookOpen },
      { name: "Gratitude", icon: Heart }, { name: "Sieste", icon: Moon },
    ] },
  { id: "social", name: "Social & loisirs", icon: Users, color: "#34D399",
    subcategories: [
      { name: "Famille", icon: Users }, { name: "Amis", icon: Users },
      { name: "Appel proches", icon: Phone }, { name: "Sortie", icon: Plane },
      { name: "Lecture loisir", icon: BookOpen }, { name: "Jeu vidéo", icon: Target },
      { name: "Film / Série", icon: Music },
    ] },
];

const DEFAULT_TASKS = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

// minutes helpers
const toMin = (hm) => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
const fromMin = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// === BRAIN GEOMETRY ===
// Pseudo-random generator (deterministic)
const seededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Generate all nodes + links for a given total days count, distributed across cycles.
// Each cycle = up to 70 nodes in a distinct cluster region of the brain shape.
const generateBrainGeometry = (totalDays) => {
  if (totalDays === 0) return { nodes: [], links: [] };

  const nodes = []; // { x, y, cycleIdx, dayIdx, color }
  const links = []; // { from, to, cycleIdx }

  const totalCycles = Math.ceil(totalDays / BRAIN_CYCLE_DAYS);
  const totalNodesNeeded = Math.floor((totalDays / BRAIN_CYCLE_DAYS) * BRAIN_NODES_PER_CYCLE);

  // The brain is drawn in viewBox 0..200 (square). The HEAD silhouette occupies it.
  // Neurons appear ONLY in the upper skull region (top half of head, like in reference image).
  // Skull region: roughly x: 50..150, y: 35..90
  const clusterAnchors = [
    { x: 100, y: 50 },   // 1: top crown center
    { x: 75, y: 55 },    // 2: top left
    { x: 125, y: 55 },   // 3: top right
    { x: 60, y: 70 },    // 4: mid left
    { x: 140, y: 70 },   // 5: mid right
    { x: 100, y: 65 },   // 6: center
    { x: 70, y: 80 },    // 7: lower left
    { x: 130, y: 80 },   // 8: lower right
    { x: 100, y: 80 },   // 9: lower center
    { x: 85, y: 45 },    // 10: top inner left
    { x: 115, y: 45 },   // 11: top inner right
    { x: 100, y: 75 },   // 12: deep center
  ];

  for (let cIdx = 0; cIdx < totalCycles; cIdx++) {
    const rng = seededRandom(cIdx * 7919 + 13);
    const color = BRAIN_CYCLE_COLORS[cIdx % BRAIN_CYCLE_COLORS.length];
    const anchor = clusterAnchors[cIdx % clusterAnchors.length];

    // How many nodes in this cycle so far
    const cycleStartDay = cIdx * BRAIN_CYCLE_DAYS;
    const cycleEndDay = Math.min((cIdx + 1) * BRAIN_CYCLE_DAYS, totalDays);
    const daysInThisCycle = cycleEndDay - cycleStartDay;
    if (daysInThisCycle <= 0) continue;
    const nodesInThisCycle = Math.floor((daysInThisCycle / BRAIN_CYCLE_DAYS) * BRAIN_NODES_PER_CYCLE);

    const cycleNodeStartIdx = nodes.length;
    for (let n = 0; n < nodesInThisCycle; n++) {
      // Spread nodes around anchor with gaussian-like falloff
      const angle = rng() * Math.PI * 2;
      const radius = 6 + rng() * 16; // cluster radius (smaller, denser)
      const x = anchor.x + Math.cos(angle) * radius;
      const y = anchor.y + Math.sin(angle) * radius;
      // STRICT clamp to upper skull region only
      const cx = Math.max(52, Math.min(148, x));
      const cy = Math.max(38, Math.min(88, y));
      nodes.push({
        x: cx,
        y: cy,
        cycleIdx: cIdx,
        dayIdx: cycleStartDay + Math.floor(n / (BRAIN_NODES_PER_CYCLE / BRAIN_CYCLE_DAYS)),
        color,
        size: 1.2 + rng() * 1.6,
        twinkleDelay: rng() * 4,
      });
    }

    // Generate links — each new node links to 1-3 nearby nodes in the same cycle
    for (let n = 1; n < nodesInThisCycle; n++) {
      const fromIdx = cycleNodeStartIdx + n;
      const linksCount = 1 + Math.floor(rng() * 2);
      // Find 2-3 closest existing nodes in this cycle
      const candidates = [];
      for (let m = 0; m < n; m++) {
        const otherIdx = cycleNodeStartIdx + m;
        const dx = nodes[fromIdx].x - nodes[otherIdx].x;
        const dy = nodes[fromIdx].y - nodes[otherIdx].y;
        candidates.push({ idx: otherIdx, dist: Math.sqrt(dx * dx + dy * dy) });
      }
      candidates.sort((a, b) => a.dist - b.dist);
      for (let l = 0; l < Math.min(linksCount, candidates.length); l++) {
        links.push({ from: fromIdx, to: candidates[l].idx, cycleIdx: cIdx, color });
      }
    }

    // After cycle 1, add 1-2 inter-cycle bridges to the previous cycle's cluster
    if (cIdx > 0 && cycleNodeStartIdx > 0 && nodesInThisCycle > 5) {
      const prevCycleNodes = nodes.slice(0, cycleNodeStartIdx).filter(n => n.cycleIdx === cIdx - 1);
      if (prevCycleNodes.length > 0) {
        const bridgeCount = 1 + Math.floor(rng() * 2);
        for (let b = 0; b < bridgeCount; b++) {
          const fromIdx = cycleNodeStartIdx + Math.floor(rng() * Math.min(5, nodesInThisCycle));
          const prevNode = prevCycleNodes[Math.floor(rng() * prevCycleNodes.length)];
          const toIdx = nodes.indexOf(prevNode);
          if (toIdx !== -1) {
            links.push({ from: fromIdx, to: toIdx, cycleIdx: cIdx, color, isBridge: true });
          }
        }
      }
    }
  }

  return { nodes, links };
};

// === BRAIN — 28-day habit cycles ===
const BRAIN_CYCLE_DAYS = 28;
const BRAIN_NODES_PER_CYCLE = 70; // total nodes added during one cycle (~2-3 per day)
const BRAIN_LINKS_PER_NODE_AVG = 1.8; // avg connections per node

// 12 cycle colors (one per cycle, then loops)
const BRAIN_CYCLE_COLORS = [
  "#A78BFA", // 1 - violet
  "#60A5FA", // 2 - blue
  "#34D399", // 3 - green
  "#FBBF24", // 4 - amber
  "#FB923C", // 5 - orange
  "#F472B6", // 6 - pink
  "#F87171", // 7 - red
  "#22D3EE", // 8 - cyan
  "#A3E635", // 9 - lime
  "#FBBF77", // 10 - peach
  "#C084FC", // 11 - magenta
  "#FFFFFF", // 12 - white (legendary final cycle)
];

// Tutorial steps — `target` is a data-tour attribute name on a DOM element to spotlight
const TUTORIAL_STEPS = [
  {
    title: "Bienvenue 👋",
    body: "Voici un tour rapide pour découvrir Focus. Cela prend moins d'une minute. Vous pouvez passer à tout moment.",
    target: null, // centered modal, no spotlight
  },
  {
    title: "Votre cerveau 🧠",
    body: "Chaque journée où vous validez au moins 80% de vos tâches active une nouvelle connexion neuronale. Sur 28 jours, un cycle complet se forme. Au fil du temps, votre cerveau évolue avec de nouvelles couleurs.",
    target: "brain",
  },
  {
    title: "Votre menu",
    body: "Votre profil, vos statistiques de la semaine et votre abonnement sont accessibles depuis ici.",
    target: "menu",
  },
  {
    title: "Les jours de la semaine",
    body: "Chaque jour a sa couleur et son ambiance. Naviguez entre les jours pour planifier toute votre semaine.",
    target: "week",
  },
  {
    title: "Programmer une tâche",
    body: "Cliquez sur le bouton + pour ajouter une nouvelle tâche : choisissez sa catégorie, son heure de début et sa durée.",
    target: "addBtn",
  },
  {
    title: "Vos tâches",
    body: "Toutes vos tâches du jour s'affichent en timeline. Vous pourrez les modifier, les supprimer ou ajouter des notes.",
    target: "timeline",
  },
  {
    title: "Démarrer la journée",
    body: "Quand votre planning est prêt, cliquez ici pour lancer votre journée. Si vous démarrez avant l'heure de votre première tâche, un compte à rebours vous indiquera le temps restant.",
    target: "startBtn",
  },
  {
    title: "Tâche en cours",
    body: "Une fois la journée lancée, ce grand cercle affiche le temps restant sur la tâche en cours. Les barres en dessous progressent du vert au rouge selon le temps écoulé.",
    target: null,
  },
  {
    title: "Mettre en pause",
    body: "Besoin d'une pause ? Cliquez sur le bouton pause qui apparaîtra. Toutes vos tâches restantes seront automatiquement décalées du temps de votre pause.",
    target: null,
  },
  {
    title: "Fin d'une tâche",
    body: "À la fin de chaque tâche, on vous demande si vous avez rempli votre objectif. Vous pouvez confirmer, ajouter du temps, ou la passer.",
    target: null,
  },
  {
    title: "Bilan de fin de journée",
    body: "Une fois toutes vos tâches accomplies, un bilan personnalisé vous attend avec votre taux de respect, votre temps de pause et un message de coaching. Bonne route avec Focus !",
    target: null,
  },
];

export default function FocusApp() {
  const [user, setUser] = useState(null);
  const [signupForm, setSignupForm] = useState({ firstName: "", lastName: "", birthDate: "", email: "" });

  // === TUTORIAL ===
  const [tutorialStep, setTutorialStep] = useState(null); // null = inactive, 0..N = active step
  const [tutorialRect, setTutorialRect] = useState(null); // { top, left, width, height } of target element

  const [showProfile, setShowProfile] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ cardNumber: "", expiry: "", cvc: "", name: "" });
  const logoTapsRef = useRef({ count: 0, lastTap: 0 });
  const [profileDraft, setProfileDraft] = useState(null);

  const [selectedDay, setSelectedDay] = useState(todayIndex());
  const [weekTasks, setWeekTasks] = useState(DEFAULT_TASKS);
  const tasks = weekTasks[selectedDay] || [];
  const setTasks = (newTasks) => {
    const updated = typeof newTasks === "function" ? newTasks(tasks) : newTasks;
    setWeekTasks({ ...weekTasks, [selectedDay]: updated });
  };

  // === COMPLETION TRACKING ===
  // { dayIndex: { taskId: 'done' | 'skipped' } }
  const [completions, setCompletions] = useState({ 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} });

  // === BRAIN STATE ===
  // validatedDates: Set of date strings (YYYY-MM-DD) where the user reached >= 80% completion
  // We use date strings so we can't game the system by validating the same day twice
  const [validatedDates, setValidatedDates] = useState(new Set());
  const lastBrainCheckRef = useRef(null); // last day-key we already evaluated, to avoid double-counting
  const [showBrain, setShowBrain] = useState(false);
  const [brainPreviewCycle, setBrainPreviewCycle] = useState(null); // null = real data, 1..12 = preview that many full cycles
  const [brainNewNodeBurst, setBrainNewNodeBurst] = useState(null); // {ts} when a new day is validated
  const dayCompletions = completions[selectedDay] || {};

  const [isRunning, setIsRunning] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [demoElapsed, setDemoElapsed] = useState(0);
  const [now, setNow] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [taskForm, setTaskForm] = useState({ name: "", start: "", end: "", notes: "", meditationId: null, category: null, subcategory: null });
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [pickerStep, setPickerStep] = useState("category");
  const [pickedCategory, setPickedCategory] = useState(null);
  const [activeMeditation, setActiveMeditation] = useState(null);
  const notifiedRef = useRef(new Set());

  // === END-OF-TASK POPUP ===
  const [endTaskPopup, setEndTaskPopup] = useState(null); // task object that just ended
  const [showExtendChoice, setShowExtendChoice] = useState(false);
  const [extendMinutes, setExtendMinutes] = useState(30);
  const lastEndedRef = useRef(new Set()); // tasks already proposed
  const popupOpenedAtRef = useRef(null); // timestamp when popup was opened (to calc response delay)
  const popupTriggerKindRef = useRef(null); // 'natural' | 'manual' — only natural-end pauses the day
  const [pausedAt, setPausedAt] = useState(null); // timestamp when the day was paused (null = not paused)
  const [showPauseConfirm, setShowPauseConfirm] = useState(false);
  const [skipPauseConfirm, setSkipPauseConfirm] = useState(false); // user chose "don't ask again"

  // === DAY TRACKING (per-day metrics) ===
  // { dayIndex: { pauseMin: number, delayMin: number, originalTasks: [{ id, start, end }] } }
  const [dayMetrics, setDayMetrics] = useState({ 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} });

  // === END-OF-DAY SUMMARY POPUP ===
  const [showDaySummary, setShowDaySummary] = useState(false);
  const summaryShownRef = useRef(new Set()); // dayIndex that already saw summary today

  // === NO-TASKS WARNING ===
  const [showNoTasksWarning, setShowNoTasksWarning] = useState(false);

  // === VALIDATION BURST (visual feedback when a task is marked done) ===
  const [validationBurst, setValidationBurst] = useState(null);

  const [activeAmbient, setActiveAmbient] = useState(null);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const [customTracks, setCustomTracks] = useState([]);
  const [activeCustomTrack, setActiveCustomTrack] = useState(null);
  const audioCtxRef = useRef(null);
  const audioNodesRef = useRef(null);
  const customAudioRef = useRef(null);

  const DEMO_TASK_DURATION = 30;
  const dayTheme = DAY_THEMES[selectedDay];

  // === Audio: custom music ===
  useEffect(() => {
    if (customAudioRef.current) { customAudioRef.current.pause(); customAudioRef.current = null; }
    if (!activeCustomTrack) return;
    const track = customTracks.find(t => t.id === activeCustomTrack);
    if (!track) return;
    const audio = new Audio(track.url);
    audio.loop = true; audio.volume = ambientVolume;
    audio.play().catch(() => {});
    customAudioRef.current = audio;
    return () => { audio.pause(); };
  }, [activeCustomTrack, customTracks]);

  useEffect(() => {
    if (customAudioRef.current) customAudioRef.current.volume = ambientVolume;
  }, [ambientVolume]);

  // === Audio: ambient sounds ===
  useEffect(() => {
    if (audioNodesRef.current) {
      audioNodesRef.current.stop && audioNodesRef.current.stop();
      audioNodesRef.current = null;
    }
    if (!activeAmbient) return;
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const masterGain = ctx.createGain();
    masterGain.gain.value = ambientVolume;
    masterGain.connect(ctx.destination);
    let stopFn = () => {};

    if (activeAmbient === "rain" || activeAmbient === "wind" || activeAmbient === "forest") {
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.15;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer; noise.loop = true;
      const filter = ctx.createBiquadFilter();
      if (activeAmbient === "rain") { filter.type = "highpass"; filter.frequency.value = 800; }
      else if (activeAmbient === "wind") { filter.type = "lowpass"; filter.frequency.value = 400; }
      else { filter.type = "bandpass"; filter.frequency.value = 1200; filter.Q.value = 0.5; }
      noise.connect(filter); filter.connect(masterGain);
      noise.start();
      stopFn = () => { try { noise.stop(); } catch (e) {} };
    } else if (activeAmbient === "lofi") {
      const osc1 = ctx.createOscillator(), osc2 = ctx.createOscillator();
      osc1.type = "sine"; osc2.type = "sine";
      osc1.frequency.value = 110; osc2.frequency.value = 165;
      const g1 = ctx.createGain(), g2 = ctx.createGain();
      g1.gain.value = 0.15; g2.gain.value = 0.1;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain); lfoGain.connect(g1.gain);
      osc1.connect(g1); osc2.connect(g2);
      g1.connect(masterGain); g2.connect(masterGain);
      osc1.start(); osc2.start(); lfo.start();
      stopFn = () => { try { osc1.stop(); osc2.stop(); lfo.stop(); } catch (e) {} };
    } else if (activeAmbient === "cafe") {
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.2;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer; noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 600; filter.Q.value = 0.8;
      const rumble = ctx.createOscillator();
      rumble.type = "sine"; rumble.frequency.value = 60;
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.05;
      noise.connect(filter); filter.connect(masterGain);
      rumble.connect(rumbleGain); rumbleGain.connect(masterGain);
      noise.start(); rumble.start();
      stopFn = () => { try { noise.stop(); rumble.stop(); } catch (e) {} };
    }
    audioNodesRef.current = { stop: stopFn };
    return () => stopFn();
  }, [activeAmbient]);

  // === Timer loop ===
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setNow(new Date());
      if (demoMode) setDemoElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, demoMode]);

  // === TUTORIAL: measure target position when step changes ===
  useEffect(() => {
    if (tutorialStep === null) {
      setTutorialRect(null);
      return;
    }
    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step?.target) {
      setTutorialRect(null);
      return;
    }

    const measure = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (!el) {
        setTutorialRect(null);
        return;
      }
      // Scroll element into view smoothly if not visible
      const r = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const isVisible = r.top >= 0 && r.bottom <= viewportH;
      if (!isVisible) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Re-measure after scroll
        setTimeout(() => {
          const r2 = el.getBoundingClientRect();
          setTutorialRect({ top: r2.top, left: r2.left, width: r2.width, height: r2.height });
        }, 400);
      } else {
        setTutorialRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      }
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [tutorialStep]);

  // Start the day directly (no more visualization)
  const startDay = () => {
    setNow(new Date());
    setIsRunning(true);
    if (demoMode) setDemoElapsed(0);
    notifiedRef.current.clear();
    // Capture original task times for delay calculation later
    setDayMetrics({
      ...dayMetrics,
      [selectedDay]: {
        pauseMin: 0,
        delayMin: 0,
        originalTasks: tasks.map(t => ({ id: t.id, start: t.start, end: t.end })),
        startedAt: Date.now(),
      },
    });
    // Reset summary marker so it can re-show if user restarts
    summaryShownRef.current.delete(selectedDay);
  };

  const sortedTasks = [...tasks].sort((a, b) => toMin(a.start) - toMin(b.start));

  // === Find current task / progress ===
  let currentTask = null;
  let progress = 0;
  let remainingSec = 0;
  let nextTask = null;

  if (demoMode) {
    const totalDemoTime = sortedTasks.length * DEMO_TASK_DURATION;
    if (demoElapsed < totalDemoTime) {
      const idx = Math.floor(demoElapsed / DEMO_TASK_DURATION);
      currentTask = sortedTasks[idx];
      const elapsedInTask = demoElapsed % DEMO_TASK_DURATION;
      progress = (elapsedInTask / DEMO_TASK_DURATION) * 100;
      remainingSec = DEMO_TASK_DURATION - elapsedInTask;
      nextTask = sortedTasks[idx + 1];
    }
  } else {
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    // A task is "current" only if we're in its time window AND it hasn't been validated yet
    currentTask = sortedTasks.find((t) =>
      nowMin >= toMin(t.start) && nowMin < toMin(t.end) && !dayCompletions[t.id]
    );
    if (currentTask) {
      const start = toMin(currentTask.start);
      const end = toMin(currentTask.end);
      progress = ((nowMin - start) / (end - start)) * 100;
      remainingSec = Math.max(0, Math.floor((end - nowMin) * 60));
    }
    // Next task: the next non-completed task that hasn't started yet
    const currentIdx = currentTask ? sortedTasks.indexOf(currentTask) : -1;
    if (currentIdx >= 0) {
      nextTask = sortedTasks.slice(currentIdx + 1).find(t => !dayCompletions[t.id]);
    } else {
      nextTask = sortedTasks.find(t => toMin(t.start) > nowMin && !dayCompletions[t.id])
                 || sortedTasks.find(t => !dayCompletions[t.id] && toMin(t.end) > nowMin);
    }
  }

  const getTaskProgress = (task) => {
    // If task has been validated/skipped, freeze progress at 100%
    if (dayCompletions[task.id]) return 100;
    if (demoMode) {
      const idx = sortedTasks.indexOf(task);
      const taskStart = idx * DEMO_TASK_DURATION;
      const taskEnd = taskStart + DEMO_TASK_DURATION;
      if (demoElapsed >= taskEnd) return 100;
      if (demoElapsed <= taskStart) return 0;
      return ((demoElapsed - taskStart) / DEMO_TASK_DURATION) * 100;
    } else {
      const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
      const start = toMin(task.start);
      const end = toMin(task.end);
      if (nowMin >= end) return 100;
      if (nowMin <= start) return 0;
      return ((nowMin - start) / (end - start)) * 100;
    }
  };

  const isPastTask = (task) => getTaskProgress(task) >= 100;

  // === Voice notification 10 min before end ===
  useEffect(() => {
    if (!isRunning || !currentTask || !voiceOn) return;
    const threshold = demoMode ? 10 : 600;
    const key = `${currentTask.id}-warn`;
    if (remainingSec === threshold && !notifiedRef.current.has(key)) {
      notifiedRef.current.add(key);
      if ("speechSynthesis" in window) {
        const text = demoMode
          ? "Il vous reste 10 secondes avant la prochaine tâche."
          : "Il vous reste 10 minutes avant la prochaine tâche.";
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "fr-FR"; u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    }
  }, [remainingSec, currentTask, isRunning, voiceOn, demoMode]);

  // === END-OF-TASK DETECTION ===
  // When a task hits 100% progress, open the validation popup
  useEffect(() => {
    if (!isRunning) return;
    sortedTasks.forEach((task) => {
      const prog = getTaskProgress(task);
      if (prog >= 100 && !lastEndedRef.current.has(task.id) && !dayCompletions[task.id]) {
        lastEndedRef.current.add(task.id);
        // Mark the moment the popup opens so we can shift later tasks by the response delay
        popupOpenedAtRef.current = Date.now();
        popupTriggerKindRef.current = "natural";
        setEndTaskPopup(task);
      }
    });
  }, [now, demoElapsed, isRunning]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const calcAge = (birthDate) => {
    if (!birthDate) return "";
    const d = new Date(birthDate); const t = new Date();
    let a = t.getFullYear() - d.getFullYear();
    const m = t.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < d.getDate())) a--;
    return a;
  };

  // === TRIAL: 7-day countdown ===
  const TRIAL_DAYS = 7;
  const trialDaysLeft = (() => {
    if (!user?.trialStart) return 0;
    const elapsed = (Date.now() - user.trialStart) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(TRIAL_DAYS - elapsed));
  })();
  const trialExpired = user && !user.isSubscribed && trialDaysLeft <= 0;

  // === BRAIN PROGRESSION ===
  const brainTotalDays = validatedDates.size;
  const brainCurrentCycleIdx = Math.floor(brainTotalDays / BRAIN_CYCLE_DAYS); // 0-indexed
  const brainDayInCycle = brainTotalDays % BRAIN_CYCLE_DAYS; // 0..27
  const brainCycleProgress = brainDayInCycle / BRAIN_CYCLE_DAYS; // 0..1
  const brainCurrentColor = BRAIN_CYCLE_COLORS[brainCurrentCycleIdx % BRAIN_CYCLE_COLORS.length];

  // Activate subscription (mock — in real app this would hit a payment processor)
  const activateSubscription = () => {
    if (!paymentForm.cardNumber || !paymentForm.expiry || !paymentForm.cvc || !paymentForm.name) return;
    setUser({ ...user, isSubscribed: true, subscriptionStart: Date.now() });
    setPaymentForm({ cardNumber: "", expiry: "", cvc: "", name: "" });
    setShowSubscription(false);
  };

  const handleSignup = () => {
    if (!signupForm.firstName || !signupForm.lastName || !signupForm.birthDate || !signupForm.email) return;
    setUser({
      ...signupForm,
      city: "",
      photo: null,
      bio: "",
      trialStart: Date.now(),
      isSubscribed: false,
    });
    setTutorialStep(0); // launch tutorial on first connection
  };

  const openAdd = () => {
    setEditingTask(null);
    // Pre-fill the start time with the latest task's end time, if any
    let suggestedStart = "";
    if (sortedTasks.length > 0) {
      const lastTask = sortedTasks.reduce((latest, t) =>
        toMin(t.end) > toMin(latest.end) ? t : latest, sortedTasks[0]);
      suggestedStart = lastTask.end;
    }
    setTaskForm({
      name: "", start: suggestedStart, end: "",
      notes: "", meditationId: null, category: null, subcategory: null,
    });
    setShowAdd(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setTaskForm({
      name: task.name, start: task.start, end: task.end, notes: task.notes || "",
      meditationId: task.meditationId || null,
      category: task.category || null, subcategory: task.subcategory || null,
    });
    setShowAdd(true);
  };

  const saveTask = () => {
    if (!taskForm.name || !taskForm.start || !taskForm.end) return;
    const cat = TASK_CATEGORIES.find(c => c.id === taskForm.category);
    const taskColor = cat?.color || "#A78BFA";
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskForm, color: taskColor } : t));
    } else {
      setTasks([...tasks, { id: Date.now(), ...taskForm, color: taskColor }]);
    }
    setShowAdd(false);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleDemo = () => {
    setDemoMode(!demoMode);
    setDemoElapsed(0);
    notifiedRef.current.clear();
    lastEndedRef.current.clear();
  };

  // Actually pause the day (called after user confirmation)
  const confirmPause = () => {
    setPausedAt(Date.now());
    setIsRunning(false);
    setShowPauseConfirm(false);
  };

  const togglePlay = () => {
    if (!isRunning) {
      // === RESUME ===
      if (pausedAt && !demoMode) {
        // Calculate how long the pause lasted
        const pauseSec = Math.floor((Date.now() - pausedAt) / 1000);
        const pauseMin = Math.ceil(pauseSec / 60); // round up to next minute
        if (pauseMin > 0) {
          // Shift all tasks that aren't fully passed yet
          const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
          const updated = tasks.map(t => {
            if (toMin(t.end) + pauseMin <= nowMin) return t;
            // Task currently in progress when paused → push end time
            if (toMin(t.start) <= nowMin && toMin(t.end) > nowMin) {
              return { ...t, end: fromMin(toMin(t.end) + pauseMin) };
            }
            // Task in the future → push both start and end
            if (toMin(t.start) > nowMin) {
              return { ...t, start: fromMin(toMin(t.start) + pauseMin), end: fromMin(toMin(t.end) + pauseMin) };
            }
            return t;
          });
          setTasks(updated);
          updated.forEach(t => {
            if (toMin(t.end) > nowMin) lastEndedRef.current.delete(t.id);
          });
          // Track pause time in day metrics
          setDayMetrics(prev => ({
            ...prev,
            [selectedDay]: {
              ...(prev[selectedDay] || {}),
              pauseMin: ((prev[selectedDay] || {}).pauseMin || 0) + pauseMin,
            },
          }));
        }
      }
      setPausedAt(null);
      if (demoMode) setDemoElapsed(0);
      setNow(new Date());
      setIsRunning(true);
      notifiedRef.current.clear();
    } else {
      // === PAUSE === (with confirmation, unless user opted out)
      if (skipPauseConfirm || demoMode) {
        confirmPause();
      } else {
        setShowPauseConfirm(true);
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileDraft({ ...profileDraft, photo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleMusicUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newTracks = files.map(file => ({
      id: `custom-${Date.now()}-${Math.random()}`,
      name: file.name.replace(/\.(mp3|wav|m4a|ogg)$/i, ""),
      url: URL.createObjectURL(file),
    }));
    setCustomTracks([...customTracks, ...newTracks]);
    e.target.value = "";
  };

  const removeCustomTrack = (id) => {
    if (activeCustomTrack === id) setActiveCustomTrack(null);
    const track = customTracks.find(t => t.id === id);
    if (track) URL.revokeObjectURL(track.url);
    setCustomTracks(customTracks.filter(t => t.id !== id));
  };

  const activateAmbient = (id) => {
    setActiveCustomTrack(null);
    setActiveAmbient(activeAmbient === id ? null : id);
  };
  const activateCustom = (id) => {
    setActiveAmbient(null);
    setActiveCustomTrack(activeCustomTrack === id ? null : id);
  };

  // ============================================================
  // === END-OF-TASK ACTIONS ===
  // ============================================================

  // When user finally responds to a natural-end popup, calculate how long they took
  // and shift all upcoming tasks by that delay so nothing runs in the background.
  const shiftUpcomingByResponseDelay = (endedTaskId) => {
    if (popupTriggerKindRef.current !== "natural" || !popupOpenedAtRef.current) return;
    const delaySec = Math.floor((Date.now() - popupOpenedAtRef.current) / 1000);
    popupOpenedAtRef.current = null;
    popupTriggerKindRef.current = null;
    if (delaySec <= 0) return;

    // Round up to the next minute for clean times
    const delayMin = Math.ceil(delaySec / 60);
    const sorted = [...tasks].sort((a, b) => toMin(a.start) - toMin(b.start));
    const idx = sorted.findIndex(t => t.id === endedTaskId);
    if (idx === -1) return;

    const updated = sorted.map((t, i) => {
      if (i <= idx) return t; // ended task stays as-is
      return {
        ...t,
        start: fromMin(toMin(t.start) + delayMin),
        end: fromMin(toMin(t.end) + delayMin),
      };
    });
    setTasks(updated);
    // Allow re-detection on next natural end of subsequent tasks
    sorted.slice(idx + 1).forEach(t => lastEndedRef.current.delete(t.id));
  };

  // Check if this was the last task of the day → trigger summary popup
  // Auto-detect end of day: when all tasks are completed/skipped, show summary
  useEffect(() => {
    if (!isRunning || tasks.length === 0) return;
    if (summaryShownRef.current.has(selectedDay)) return;
    const allHandled = tasks.every(t => dayCompletions[t.id]);
    if (allHandled) {
      summaryShownRef.current.add(selectedDay);
      // Slight delay to let the burst animation play
      const id = setTimeout(() => setShowDaySummary(true), 1200);
      return () => clearTimeout(id);
    }
  }, [dayCompletions, tasks, isRunning, selectedDay]);

  // === BRAIN: validate today when ≥80% of tasks are done ===
  useEffect(() => {
    if (!isRunning || tasks.length === 0) return;
    const doneCount = tasks.filter(t => dayCompletions[t.id] === "done").length;
    const ratio = doneCount / tasks.length;
    if (ratio < 0.8) return;

    // Use today's real-world date as the unique key
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    // Already validated today? skip
    if (validatedDates.has(dateKey)) return;
    if (lastBrainCheckRef.current === dateKey) return;

    lastBrainCheckRef.current = dateKey;
    const newSet = new Set(validatedDates);
    newSet.add(dateKey);
    setValidatedDates(newSet);
    setBrainNewNodeBurst({ ts: Date.now() });
    setTimeout(() => setBrainNewNodeBurst(null), 2400);
  }, [dayCompletions, tasks, isRunning]);

  const checkAndTriggerDaySummary = (taskId) => {
    // kept for compatibility — actual logic now lives in the useEffect above
  };

  const markTaskDone = (taskId) => {
    setCompletions({
      ...completions,
      [selectedDay]: { ...dayCompletions, [taskId]: "done" },
    });
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setValidationBurst({ color: task.color, ts: Date.now() });
      setTimeout(() => setValidationBurst(null), 1800);
    }
    shiftUpcomingByResponseDelay(taskId);
    setEndTaskPopup(null);
    setShowExtendChoice(false);
    checkAndTriggerDaySummary(taskId);
  };

  const markTaskSkipped = (taskId) => {
    setCompletions({
      ...completions,
      [selectedDay]: { ...dayCompletions, [taskId]: "skipped" },
    });
    shiftUpcomingByResponseDelay(taskId);
    setEndTaskPopup(null);
    setShowExtendChoice(false);
    checkAndTriggerDaySummary(taskId);
  };

  const extendTask = (task, minutesToAdd) => {
    // If the popup was triggered naturally, include the response delay too
    let delayMin = 0;
    if (popupTriggerKindRef.current === "natural" && popupOpenedAtRef.current) {
      const delaySec = Math.floor((Date.now() - popupOpenedAtRef.current) / 1000);
      delayMin = Math.ceil(delaySec / 60);
    }
    popupOpenedAtRef.current = null;
    popupTriggerKindRef.current = null;

    const totalShift = minutesToAdd + delayMin;

    // Push back this task's end time AND every following task by `totalShift`
    const sorted = [...tasks].sort((a, b) => toMin(a.start) - toMin(b.start));
    const idx = sorted.findIndex(t => t.id === task.id);
    const updated = sorted.map((t, i) => {
      if (i < idx) return t;
      if (i === idx) return { ...t, end: fromMin(toMin(t.end) + totalShift) };
      return { ...t, start: fromMin(toMin(t.start) + totalShift), end: fromMin(toMin(t.end) + totalShift) };
    });
    setTasks(updated);
    // Allow this task to trigger the popup again at its new end time
    lastEndedRef.current.delete(task.id);
    // Allow re-detection of subsequent tasks too (their times changed)
    sorted.slice(idx + 1).forEach(t => lastEndedRef.current.delete(t.id));
    setEndTaskPopup(null);
    setShowExtendChoice(false);
  };

  // Finish a task earlier than scheduled — pull every following task forward by the saved minutes
  const finishEarly = (task) => {
    const sorted = [...tasks].sort((a, b) => toMin(a.start) - toMin(b.start));
    const idx = sorted.findIndex(t => t.id === task.id);
    if (idx === -1) return;

    // Compute current "now" in minutes (real or demo)
    let nowMinutes;
    if (demoMode) {
      const elapsedInTask = demoElapsed % DEMO_TASK_DURATION;
      const fakeProgressRatio = elapsedInTask / DEMO_TASK_DURATION;
      const taskDur = toMin(sorted[idx].end) - toMin(sorted[idx].start);
      nowMinutes = toMin(sorted[idx].start) + fakeProgressRatio * taskDur;
    } else {
      nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    }
    const nowMinRounded = Math.ceil(nowMinutes); // round up to next full minute

    // Shift = how much we need to pull next task's start back so it starts NOW
    let shift = 0;
    if (idx + 1 < sorted.length) {
      const nextStart = toMin(sorted[idx + 1].start);
      shift = Math.max(0, nextStart - nowMinRounded);
    }

    const updated = sorted.map((t, i) => {
      if (i < idx) return t;
      // Current task: end it NOW
      if (i === idx) {
        return { ...t, end: fromMin(Math.max(toMin(t.start) + 1, nowMinRounded)) };
      }
      // Following tasks: pull them earlier by `shift`
      return { ...t, start: fromMin(toMin(t.start) - shift), end: fromMin(toMin(t.end) - shift) };
    });
    setTasks(updated);

    // Mark this task as done and close popup
    setCompletions({
      ...completions,
      [selectedDay]: { ...dayCompletions, [task.id]: "done" },
    });
    setValidationBurst({ color: task.color, ts: Date.now() });
    setTimeout(() => setValidationBurst(null), 1800);
    lastEndedRef.current.add(task.id);
    popupOpenedAtRef.current = null;
    popupTriggerKindRef.current = null;
    setEndTaskPopup(null);
    setShowExtendChoice(false);
    setNow(new Date()); // force immediate re-detection of next task
    checkAndTriggerDaySummary(task.id);
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  // ============================================================
  // === GOAL PROGRESS (DAILY + WEEKLY) ===
  // ============================================================
  const computeDayGoal = (dayIdx) => {
    const dayT = weekTasks[dayIdx] || [];
    if (dayT.length === 0) return { done: 0, total: 0, percent: 0 };
    const dayComp = completions[dayIdx] || {};
    const done = dayT.filter(t => dayComp[t.id] === "done").length;
    return { done, total: dayT.length, percent: Math.round((done / dayT.length) * 100) };
  };

  const dailyGoal = computeDayGoal(selectedDay);

  const computeWeekGoal = () => {
    let totalDone = 0; let totalCount = 0;
    DAY_THEMES.forEach((_, idx) => {
      const g = computeDayGoal(idx);
      totalDone += g.done;
      totalCount += g.total;
    });
    return {
      done: totalDone,
      total: totalCount,
      percent: totalCount > 0 ? Math.round((totalDone / totalCount) * 100) : 0,
    };
  };

  const weeklyGoal = computeWeekGoal();

  // ============================================================
  // === STATS ===
  // ============================================================
  const computeStats = () => {
    const stats = DAY_THEMES.map((theme, idx) => {
      const dayT = weekTasks[idx] || [];
      const totalMinutes = dayT.reduce((s, t) => s + (toMin(t.end) - toMin(t.start)), 0);
      const goal = computeDayGoal(idx);
      return { ...theme, totalMinutes, taskCount: dayT.length, completion: goal.percent, idx };
    });
    const categoryTotals = {};
    Object.values(weekTasks).flat().forEach(t => {
      const dur = toMin(t.end) - toMin(t.start);
      const key = t.category ? TASK_CATEGORIES.find(c => c.id === t.category)?.name || t.name : t.name;
      categoryTotals[key] = (categoryTotals[key] || 0) + dur;
    });
    const topCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const totalWeekTasks = Object.values(weekTasks).flat().length;
    const totalWeekMinutes = stats.reduce((s, d) => s + d.totalMinutes, 0);
    const dayWithTasks = stats.filter(s => s.taskCount > 0);
    const avgCompletion = dayWithTasks.length > 0
      ? dayWithTasks.reduce((s, d) => s + d.completion, 0) / dayWithTasks.length : 0;
    const bestDay = [...stats].sort((a, b) => b.completion - a.completion)[0];
    return { stats, topCategories, totalWeekTasks, totalWeekMinutes, avgCompletion, bestDay };
  };

  // ============================================================
  // === SIGNUP ===
  // ============================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden flex items-center justify-center p-6"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-violet-500" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-cyan-500 opacity-50" />
        </div>
        <div className="relative z-10 w-full max-w-sm">
          <div className="text-center mb-10">

            {/* === HOLOGRAPHIC HEAD (front-facing, neurons in upper skull) === */}
            <div className="relative mx-auto mb-4 w-44 h-44 flex items-center justify-center"
              style={{ animation: "hologram-flicker 4s ease-in-out infinite" }}>
              {/* Soft glow halo behind */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-50"
                style={{
                  background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
                  animation: "brain-pulse 3s ease-in-out infinite",
                }} />

              {/* Scanning line effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-40 pointer-events-none">
                <div className="absolute inset-x-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, transparent, #A78BFA, transparent)",
                    animation: "hologram-scan 3s linear infinite",
                    boxShadow: "0 0 12px #A78BFA",
                  }} />
              </div>

              {/* The front-facing head */}
              <div style={{ animation: "brain-breathe 4s ease-in-out infinite" }}>
                <svg width="170" height="170" viewBox="0 0 200 220" fill="none">
                  <defs>
                    <filter id="signupNeon" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="signupNodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    {/* Sweeping highlight for the neon outline */}
                    <linearGradient id="signupSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      <animate attributeName="x1" values="-100%;100%" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="x2" values="0%;200%" dur="4s" repeatCount="indefinite" />
                    </linearGradient>
                  </defs>

                  {/* === HEAD: front-facing minimal neon outline === */}
                  <g filter="url(#signupNeon)" stroke="#A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {/* Skull / face outline (oval head with chin and ears bumps) */}
                    <path d="M 100 18
                             C 70 18, 48 32, 44 60
                             C 42 72, 44 88, 50 102
                             L 50 114
                             C 46 116, 44 122, 46 128
                             C 48 134, 53 136, 56 134
                             L 58 138
                             C 60 152, 68 168, 78 176
                             C 80 178, 78 184, 82 186
                             C 88 192, 96 194, 100 194
                             C 104 194, 112 192, 118 186
                             C 122 184, 120 178, 122 176
                             C 132 168, 140 152, 142 138
                             L 144 134
                             C 147 136, 152 134, 154 128
                             C 156 122, 154 116, 150 114
                             L 150 102
                             C 156 88, 158 72, 156 60
                             C 152 32, 130 18, 100 18 Z" />
                    {/* Closed eyes — gentle curves */}
                    <path d="M 73 88 Q 80 84, 88 88" />
                    <path d="M 112 88 Q 120 84, 127 88" />
                    {/* Nose — thin elegant line */}
                    <path d="M 100 95 L 96 125 Q 96 130, 102 130" />
                    {/* Mouth — slight smile */}
                    <path d="M 88 152 Q 100 156, 112 152" />
                    {/* Lower lip line */}
                    <path d="M 92 158 Q 100 162, 108 158" opacity="0.6" />
                  </g>

                  {/* Sweeping highlight on the head (animated light reflection) */}
                  <path
                    d="M 100 18
                       C 70 18, 48 32, 44 60
                       C 42 72, 44 88, 50 102
                       L 50 114
                       C 46 116, 44 122, 46 128
                       C 48 134, 53 136, 56 134
                       L 58 138
                       C 60 152, 68 168, 78 176
                       C 80 178, 78 184, 82 186
                       C 88 192, 96 194, 100 194
                       C 104 194, 112 192, 118 186
                       C 122 184, 120 178, 122 176
                       C 132 168, 140 152, 142 138
                       L 144 134
                       C 147 136, 152 134, 154 128
                       C 156 122, 154 116, 150 114
                       L 150 102
                       C 156 88, 158 72, 156 60
                       C 152 32, 130 18, 100 18 Z"
                    stroke="url(#signupSweep)"
                    strokeWidth="1.8"
                    fill="none"
                    opacity="0.8"
                  />

                  {/* === NEURAL NETWORK in upper skull === */}
                  {/* Static deterministic network — like the reference image */}
                  <g stroke="#A78BFA" strokeWidth="0.6" opacity="0.7">
                    {/* Network connections */}
                    <line x1="75" y1="42" x2="92" y2="48" />
                    <line x1="92" y1="48" x2="100" y2="35" />
                    <line x1="100" y1="35" x2="115" y2="48" />
                    <line x1="115" y1="48" x2="128" y2="42" />
                    <line x1="75" y1="42" x2="68" y2="58" />
                    <line x1="68" y1="58" x2="82" y2="62" />
                    <line x1="82" y1="62" x2="92" y2="48" />
                    <line x1="82" y1="62" x2="100" y2="58" />
                    <line x1="100" y1="58" x2="115" y2="48" />
                    <line x1="100" y1="58" x2="118" y2="62" />
                    <line x1="118" y1="62" x2="128" y2="42" />
                    <line x1="118" y1="62" x2="132" y2="58" />
                    <line x1="68" y1="58" x2="62" y2="72" />
                    <line x1="62" y1="72" x2="78" y2="76" />
                    <line x1="78" y1="76" x2="82" y2="62" />
                    <line x1="78" y1="76" x2="92" y2="80" />
                    <line x1="92" y1="80" x2="100" y2="58" />
                    <line x1="92" y1="80" x2="108" y2="80" />
                    <line x1="108" y1="80" x2="118" y2="62" />
                    <line x1="108" y1="80" x2="122" y2="76" />
                    <line x1="122" y1="76" x2="132" y2="58" />
                    <line x1="122" y1="76" x2="138" y2="72" />
                    <line x1="138" y1="72" x2="132" y2="58" />
                    <line x1="62" y1="72" x2="58" y2="86" />
                    <line x1="58" y1="86" x2="72" y2="92" />
                    <line x1="72" y1="92" x2="78" y2="76" />
                    <line x1="72" y1="92" x2="88" y2="92" />
                    <line x1="88" y1="92" x2="92" y2="80" />
                    <line x1="88" y1="92" x2="100" y2="98" />
                    <line x1="100" y1="98" x2="112" y2="92" />
                    <line x1="112" y1="92" x2="108" y2="80" />
                    <line x1="112" y1="92" x2="128" y2="92" />
                    <line x1="128" y1="92" x2="122" y2="76" />
                    <line x1="128" y1="92" x2="142" y2="86" />
                    <line x1="142" y1="86" x2="138" y2="72" />
                    <line x1="100" y1="35" x2="100" y2="58" />
                    <line x1="58" y1="86" x2="62" y2="100" />
                    <line x1="142" y1="86" x2="138" y2="100" />
                    <line x1="62" y1="100" x2="78" y2="100" />
                    <line x1="78" y1="100" x2="100" y2="98" />
                    <line x1="100" y1="98" x2="122" y2="100" />
                    <line x1="122" y1="100" x2="138" y2="100" />
                    {/* Vertical connection drips down from neurons */}
                    <line x1="92" y1="48" x2="92" y2="78" opacity="0.5" />
                    <line x1="115" y1="48" x2="115" y2="78" opacity="0.5" />
                  </g>

                  {/* === GLOWING NODES (synapses) === */}
                  <g filter="url(#signupNodeGlow)">
                    {[
                      { cx: 75, cy: 42, r: 2 },
                      { cx: 92, cy: 48, r: 2.2 },
                      { cx: 100, cy: 35, r: 2.5 },
                      { cx: 115, cy: 48, r: 2.2 },
                      { cx: 128, cy: 42, r: 2 },
                      { cx: 68, cy: 58, r: 1.8 },
                      { cx: 82, cy: 62, r: 1.8 },
                      { cx: 100, cy: 58, r: 2.4 },
                      { cx: 118, cy: 62, r: 1.8 },
                      { cx: 132, cy: 58, r: 1.8 },
                      { cx: 62, cy: 72, r: 1.6 },
                      { cx: 78, cy: 76, r: 1.8 },
                      { cx: 92, cy: 80, r: 2 },
                      { cx: 108, cy: 80, r: 2 },
                      { cx: 122, cy: 76, r: 1.8 },
                      { cx: 138, cy: 72, r: 1.6 },
                      { cx: 58, cy: 86, r: 1.5 },
                      { cx: 72, cy: 92, r: 1.6 },
                      { cx: 88, cy: 92, r: 1.6 },
                      { cx: 100, cy: 98, r: 2.2 },
                      { cx: 112, cy: 92, r: 1.6 },
                      { cx: 128, cy: 92, r: 1.6 },
                      { cx: 142, cy: 86, r: 1.5 },
                      { cx: 62, cy: 100, r: 1.2 },
                      { cx: 78, cy: 100, r: 1.4 },
                      { cx: 122, cy: 100, r: 1.4 },
                      { cx: 138, cy: 100, r: 1.2 },
                    ].map((n, i) => (
                      <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="#FFFFFF"
                        style={{ filter: `drop-shadow(0 0 4px #A78BFA)` }}>
                        <animate attributeName="opacity"
                          values="0.55;1;0.55"
                          dur={`${1.8 + (i % 5) * 0.4}s`}
                          repeatCount="indefinite"
                          begin={`${(i * 0.13) % 3}s`} />
                      </circle>
                    ))}
                  </g>

                  {/* Holographic projection base */}
                  <ellipse cx="100" cy="210" rx="50" ry="3" fill="#A78BFA" opacity="0.5"
                    style={{ filter: "blur(3px)" }} />
                  <ellipse cx="100" cy="211" rx="28" ry="1.5" fill="#A78BFA" opacity="0.85"
                    style={{ filter: "blur(1px)" }} />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl font-light tracking-tight">focus<span className="text-violet-400">.</span></h1>
            <p className="text-xs text-white/40 mt-3 tracking-[0.25em] uppercase">Reprenez le contrôle du temps</p>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-light mb-1">Créer un compte</h2>
            <p className="text-xs text-white/40 mb-4">Quelques informations pour commencer</p>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Prénom" value={signupForm.firstName}
                onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              <input type="text" placeholder="Nom" value={signupForm.lastName}
                onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block ml-1">Date de naissance</label>
              <input type="date" value={signupForm.birthDate}
                onChange={(e) => setSignupForm({ ...signupForm, birthDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <input type="email" placeholder="Adresse mail" value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            <button onClick={handleSignup}
              disabled={!signupForm.firstName || !signupForm.lastName || !signupForm.birthDate || !signupForm.email}
              className="w-full mt-4 py-3.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition disabled:opacity-30 disabled:cursor-not-allowed">
              Créer mon compte
            </button>
            <p className="text-[11px] text-white/40 text-center mt-3">
              ✨ 7 jours d'essai gratuit · sans carte bancaire
            </p>
            <p className="text-[10px] text-white/30 text-center mt-1">
              3,99 € / mois ensuite · sans engagement
            </p>
          </div>

          {/* === EPHEMERAL BETA BYPASS BUTTON === */}
          <button
            onClick={() => {
              setUser({
                firstName: "Bêta",
                lastName: "Testeur",
                birthDate: "1990-01-01",
                email: "beta@focus.app",
                city: "",
                photo: null,
                bio: "",
                trialStart: Date.now(),
                isSubscribed: false,
              });
              setTutorialStep(0);
            }}
            className="w-full mt-4 py-2.5 rounded-xl border border-dashed border-yellow-400/30 text-[11px] text-yellow-300/80 hover:bg-yellow-400/5 hover:border-yellow-400/50 transition flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Accès bêta · entrer sans inscription
          </button>

          <footer className="mt-8 text-center">
            <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase">propulsé par</p>
            <p className="mt-1 text-sm font-bold tracking-[0.08em]"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DIGIT'ARK<span style={{ WebkitTextFillColor: "rgba(255,255,255,0.85)" }}>.</span>
            </p>
          </footer>
        </div>
      </div>
    );
  }

  // ============================================================
  // === FOCUS MODE ===
  // ============================================================
  if (focusMode) {
    const bigRadius = 160;
    const bigCircumference = 2 * Math.PI * bigRadius;
    const bigOffset = bigCircumference - (progress / 100) * bigCircumference;
    const accent = currentTask?.color || dayTheme.accent;
    const activeSound = activeAmbient
      ? AMBIENT_SOUNDS.find(s => s.id === activeAmbient)?.name
      : activeCustomTrack ? customTracks.find(t => t.id === activeCustomTrack)?.name : null;
    return (
      <div className="fixed inset-0 bg-neutral-950 text-white flex flex-col items-center justify-center z-50 overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: accent }} />
        </div>
        <button onClick={() => setFocusMode(false)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 transition z-10">
          <X size={18} />
        </button>
        {activeSound && (
          <div className="absolute top-6 left-6 px-3 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-white/70 truncate max-w-[160px]">{activeSound}</span>
          </div>
        )}
        <div className="relative w-[360px] h-[360px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 360 360">
            <circle cx="180" cy="180" r={bigRadius} stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            {currentTask && (
              <circle cx="180" cy="180" r={bigRadius} stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round"
                strokeDasharray={bigCircumference} strokeDashoffset={bigOffset}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.6s ease",
                  filter: `drop-shadow(0 0 12px ${accent}80)` }} />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {currentTask ? (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">{currentTask.name}</p>
                <div className="text-7xl font-extralight font-mono tabular-nums tracking-tight" style={{ color: accent }}>
                  {formatTime(remainingSec)}
                </div>
                <div className="text-3xl font-light mt-3 text-white/70 tabular-nums">{Math.round(progress)}%</div>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">en attente</p>
                <div className="text-5xl font-extralight text-white/40">—</div>
              </>
            )}
          </div>
        </div>
        {nextTask && (
          <p className="absolute bottom-12 text-xs text-white/30 tracking-widest uppercase">
            Ensuite · {nextTask.name}
          </p>
        )}
      </div>
    );
  }

  // ============================================================
  // === MEDITATION OVERLAY ===
  // ============================================================
  if (activeMeditation) {
    const med = MEDITATIONS.find(m => m.id === activeMeditation);
    return (
      <div className="fixed inset-0 bg-neutral-950 text-white flex flex-col items-center justify-center z-50 overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl animate-pulse"
            style={{ background: med.color, animationDuration: "4s" }} />
        </div>
        <button onClick={() => setActiveMeditation(null)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 transition z-10">
          <X size={18} />
        </button>
        <div className="relative z-10 text-center px-8 max-w-md">
          <med.icon size={48} style={{ color: med.color }} className="mx-auto mb-6" />
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Méditation guidée</p>
          <h2 className="text-3xl font-light mb-2">{med.name}</h2>
          <p className="text-sm text-white/50 mb-1">{med.description}</p>
          <p className="text-xs text-white/30 mb-10">{med.duration} min</p>
          <div className="relative w-48 h-48 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border-2 animate-pulse"
              style={{ borderColor: med.color + "60", animationDuration: "4s" }} />
            <div className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${med.color}30 0%, transparent 70%)` }}>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">respirez</p>
                <p className="text-lg font-light" style={{ color: med.color }}>en suivant le cercle</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-white/60 italic mb-8 leading-relaxed">"{med.script}"</p>
          <button onClick={() => setActiveMeditation(null)}
            className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition">
            Terminer la séance
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // === STATS PAGE ===
  // ============================================================
  if (showStats) {
    const { stats, topCategories, totalWeekTasks, totalWeekMinutes, avgCompletion, bestDay } = computeStats();
    const maxBar = Math.max(...stats.map(s => s.totalMinutes), 1);
    return (
      <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ background: dayTheme.glow }} />
        </div>
        <div className="relative z-10 max-w-md mx-auto px-6 py-8">
          <header className="flex items-center justify-between mb-8">
            <button onClick={() => setShowStats(false)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-light">Statistiques</h2>
            <div className="w-10" />
          </header>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider mb-2">
                <TrendingUp size={12} /> Respect moyen
              </div>
              <p className="text-3xl font-extralight" style={{ color: dayTheme.accent }}>
                {Math.round(avgCompletion) || 0}<span className="text-lg text-white/40">%</span>
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider mb-2">
                <CheckCircle2 size={12} /> Tâches semaine
              </div>
              <p className="text-3xl font-extralight">{totalWeekTasks}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider mb-2">
                <Clock size={12} /> Temps planifié
              </div>
              <p className="text-3xl font-extralight">
                {Math.floor(totalWeekMinutes / 60)}<span className="text-lg text-white/40">h</span>
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider mb-2">
                <Award size={12} /> Meilleur jour
              </div>
              <p className="text-2xl font-light" style={{ color: bestDay.accent }}>{bestDay.short}</p>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Volume par jour</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {stats.map((s) => {
                const height = s.totalMinutes > 0 ? (s.totalMinutes / maxBar) * 100 : 4;
                return (
                  <div key={s.idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-[10px] text-white/40 font-mono">
                      {s.totalMinutes > 0 ? `${Math.floor(s.totalMinutes / 60)}h` : ""}
                    </div>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height: `${height}%`,
                        background: `linear-gradient(180deg, ${s.accent}cc 0%, ${s.accent}40 100%)`,
                        minHeight: "4px" }} />
                    <p className="text-[10px] uppercase tracking-wider text-white/50">{s.short}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Respect par jour</h3>
            <div className="space-y-3">
              {stats.map((s) => (
                <div key={s.idx} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-10">{s.short}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${s.completion}%`, background: s.accent }} />
                  </div>
                  <span className="text-xs font-mono tabular-nums w-10 text-right" style={{ color: s.accent }}>
                    {s.completion}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Activités principales</h3>
            <div className="space-y-3">
              {topCategories.length === 0 ? (
                <p className="text-sm text-white/40 italic">Pas encore de données</p>
              ) : (
                topCategories.map(([name, mins], idx) => {
                  const colors = ["#A78BFA", "#60A5FA", "#34D399", "#FBBF24", "#F472B6"];
                  return (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: colors[idx] }} />
                        <span className="text-sm">{name}</span>
                      </div>
                      <span className="text-xs text-white/50 font-mono">
                        {Math.floor(mins / 60)}h {mins % 60}min
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <p className="text-[11px] text-white/30 text-center mb-6 italic">
            Calculs locaux, sans serveur.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // === PROFILE ===
  // ============================================================
  if (showProfile) {
    const draft = profileDraft || user;
    return (
      <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ background: dayTheme.glow }} />
        </div>
        <div className="relative z-10 max-w-md mx-auto px-6 py-8">
          <header className="flex items-center justify-between mb-8">
            <button onClick={() => { setShowProfile(false); setProfileDraft(null); }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-light">Mon profil</h2>
            <div className="w-10" />
          </header>
          <div className="flex flex-col items-center mb-8">
            <label className="relative cursor-pointer group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 flex items-center justify-center"
                style={{ borderColor: dayTheme.accent + "60", background: "rgba(255,255,255,0.05)" }}>
                {draft.photo ? (
                  <img src={draft.photo} alt="profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-light text-white/60">
                    {draft.firstName?.[0]}{draft.lastName?.[0]}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <Camera size={15} />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            <p className="mt-3 text-xl font-light">{draft.firstName} {draft.lastName}</p>
            <p className="text-xs text-white/40 mt-1">{draft.email}</p>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block ml-1">Prénom</label>
                <input type="text" value={draft.firstName}
                  onChange={(e) => setProfileDraft({ ...draft, firstName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block ml-1">Nom</label>
                <input type="text" value={draft.lastName}
                  onChange={(e) => setProfileDraft({ ...draft, lastName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 ml-1 flex items-center gap-1.5">
                <Calendar size={11} /> Date de naissance · {calcAge(draft.birthDate)} ans
              </label>
              <input type="date" value={draft.birthDate}
                onChange={(e) => setProfileDraft({ ...draft, birthDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 ml-1 flex items-center gap-1.5">
                <Mail size={11} /> Adresse mail
              </label>
              <input type="email" value={draft.email}
                onChange={(e) => setProfileDraft({ ...draft, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 ml-1 flex items-center gap-1.5">
                <MapPin size={11} /> Ville
              </label>
              <input type="text" placeholder="Paris, Lyon, Marseille..." value={draft.city || ""}
                onChange={(e) => setProfileDraft({ ...draft, city: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 ml-1 flex items-center gap-1.5">
                <Sparkles size={11} /> Bio
              </label>
              <textarea placeholder="Quelques mots sur vous..." value={draft.bio || ""}
                onChange={(e) => setProfileDraft({ ...draft, bio: e.target.value })} rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button onClick={() => { setShowProfile(false); setProfileDraft(null); }}
              className="flex-1 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">Annuler</button>
            <button onClick={() => { setUser(draft); setShowProfile(false); setProfileDraft(null); }}
              className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition">Enregistrer</button>
          </div>
          <button onClick={() => setUser(null)}
            className="w-full mt-3 py-3 rounded-xl text-sm text-red-400/80 hover:bg-red-500/10 transition flex items-center justify-center gap-2">
            <LogOut size={14} /> Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // === MY BRAIN PAGE ===
  // ============================================================
  if (showBrain) {
    // If user is previewing a specific cycle (beta tester mode), simulate that many days
    const displayedDays = brainPreviewCycle !== null
      ? brainPreviewCycle * BRAIN_CYCLE_DAYS
      : brainTotalDays;
    const { nodes, links } = generateBrainGeometry(displayedDays);
    const displayedCycleIdx = Math.floor(displayedDays / BRAIN_CYCLE_DAYS) - (displayedDays > 0 && displayedDays % BRAIN_CYCLE_DAYS === 0 ? 1 : 0);
    const displayedDayInCycle = displayedDays === 0 ? 0 : ((displayedDays - 1) % BRAIN_CYCLE_DAYS) + 1;
    const displayedCycleProgress = displayedDays === 0 ? 0 : ((displayedDays - 1) % BRAIN_CYCLE_DAYS) / BRAIN_CYCLE_DAYS;
    const displayedColor = BRAIN_CYCLE_COLORS[Math.max(0, displayedCycleIdx) % BRAIN_CYCLE_COLORS.length];
    const totalCycles = Math.max(1, displayedCycleIdx + 1);
    const isNewCycleStart = displayedDayInCycle === 0 && displayedDays > 0;

    return (
      <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        {/* Atmospheric glow background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: displayedColor }} />
        </div>

        <div className="relative z-10 max-w-md mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <button onClick={() => { setShowBrain(false); setBrainPreviewCycle(null); }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-light">Mon cerveau</h2>
            <div className="w-10" />
          </header>

          {/* Preview banner if in beta-test mode */}
          {brainPreviewCycle !== null && (
            <div className="mb-4 px-3 py-2 rounded-xl border border-yellow-400/30 bg-yellow-400/5 flex items-center justify-between">
              <span className="text-[11px] text-yellow-300/80">
                🧪 Aperçu cycle {brainPreviewCycle} (bêta)
              </span>
              <button onClick={() => setBrainPreviewCycle(null)}
                className="text-[10px] text-yellow-300/60 hover:text-yellow-300 underline">
                Quitter l'aperçu
              </button>
            </div>
          )}

          {/* Cycle indicator */}
          <div className="text-center mb-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
              Cycle {Math.max(1, displayedCycleIdx + 1)} sur 12
            </p>
            <p className="text-2xl font-extralight" style={{ color: displayedColor }}>
              {displayedDays === 0
                ? "Pas encore commencé"
                : `Jour ${displayedDayInCycle} / ${BRAIN_CYCLE_DAYS}`}
            </p>
          </div>

          {/* The brain visualization — face with neon outline */}
          <div className="relative aspect-square mb-6 rounded-3xl overflow-hidden"
            style={{
              background: "radial-gradient(circle at center, rgba(15,15,22,1) 0%, rgba(5,5,8,1) 100%)",
              border: `1px solid ${displayedColor}30`,
            }}>
            {/* Soft halo behind the head */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 rounded-full blur-3xl opacity-25"
                style={{ background: displayedColor }} />
            </div>

            <svg viewBox="0 0 200 220" className="relative w-full h-full">
              <defs>
                {/* Strong glow filter for neon effect */}
                <filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* === HEAD: front-facing minimal neon outline === */}
              <g filter="url(#neonGlow)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Skull / face outline (oval head with chin and ears bumps) */}
                <path d="M 100 18
                         C 70 18, 48 32, 44 60
                         C 42 72, 44 88, 50 102
                         L 50 114
                         C 46 116, 44 122, 46 128
                         C 48 134, 53 136, 56 134
                         L 58 138
                         C 60 152, 68 168, 78 176
                         C 80 178, 78 184, 82 186
                         C 88 192, 96 194, 100 194
                         C 104 194, 112 192, 118 186
                         C 122 184, 120 178, 122 176
                         C 132 168, 140 152, 142 138
                         L 144 134
                         C 147 136, 152 134, 154 128
                         C 156 122, 154 116, 150 114
                         L 150 102
                         C 156 88, 158 72, 156 60
                         C 152 32, 130 18, 100 18 Z" />

                {/* Closed eyes — gentle curves */}
                <path d="M 73 88 Q 80 84, 88 88" />
                <path d="M 112 88 Q 120 84, 127 88" />

                {/* Nose — thin elegant line */}
                <path d="M 100 95 L 96 125 Q 96 130, 102 130" />

                {/* Mouth — slight smile */}
                <path d="M 88 152 Q 100 156, 112 152" />

                {/* Lower lip line */}
                <path d="M 92 158 Q 100 162, 108 158" opacity="0.6" />
              </g>

              {/* === NEURAL NETWORK in the upper skull === */}
              {/* Links between nodes */}
              <g>
                {links.map((link, i) => {
                  const from = nodes[link.from];
                  const to = nodes[link.to];
                  if (!from || !to) return null;
                  return (
                    <line key={`l${i}`}
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke={link.color}
                      strokeWidth={link.isBridge ? "0.7" : "0.45"}
                      opacity={link.isBridge ? "0.85" : "0.6"}
                      style={{ filter: `drop-shadow(0 0 1.5px ${link.color})` }}
                    />
                  );
                })}
              </g>

              {/* Brain nodes (synapses) */}
              <g filter="url(#nodeGlow)">
                {nodes.map((node, i) => (
                  <circle key={`n${i}`}
                    cx={node.x} cy={node.y}
                    r={node.size}
                    fill={node.color}
                    style={{ filter: `drop-shadow(0 0 3px ${node.color})` }}
                  >
                    <animate attributeName="opacity"
                      values="0.55;1;0.55"
                      dur={`${2 + (i % 4) * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${node.twinkleDelay}s`} />
                  </circle>
                ))}
              </g>

              {/* Holographic projection base — purple glow ellipse below the head */}
              <ellipse cx="100" cy="210" rx="50" ry="3"
                fill={displayedColor}
                opacity="0.55"
                style={{ filter: "blur(3px)" }} />
              <ellipse cx="100" cy="211" rx="30" ry="1.5"
                fill={displayedColor}
                opacity="0.9"
                style={{ filter: "blur(1px)" }} />
            </svg>

            {/* Empty-state message */}
            {displayedDays === 0 && (
              <div className="absolute inset-x-0 bottom-12 text-center px-6">
                <p className="text-xs text-white/40 italic leading-relaxed">
                  Validez au moins 80% de vos tâches aujourd'hui<br/>
                  pour activer votre première connexion.
                </p>
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="rounded-xl p-3 border text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-1">Jours</p>
              <p className="text-xl font-light font-mono tabular-nums" style={{ color: displayedColor }}>
                {displayedDays}
              </p>
            </div>
            <div className="rounded-xl p-3 border text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-1">Connexions</p>
              <p className="text-xl font-light font-mono tabular-nums">
                {nodes.length + links.length}
              </p>
            </div>
            <div className="rounded-xl p-3 border text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-1">Cycles</p>
              <p className="text-xl font-light font-mono tabular-nums">
                {totalCycles}<span className="text-white/30 text-sm">/12</span>
              </p>
            </div>
          </div>

          {/* Cycle progress bar */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Progression du cycle
              </p>
              <p className="text-xs font-mono tabular-nums" style={{ color: displayedColor }}>
                {Math.round(displayedCycleProgress * 100)}%
              </p>
            </div>
            <div className="relative h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
              <div className="absolute inset-y-0 left-0 rounded-full transition-all"
                style={{
                  width: `${displayedCycleProgress * 100}%`,
                  background: displayedColor,
                  boxShadow: `0 0 10px ${displayedColor}`,
                }} />
            </div>
            <p className="text-[11px] text-white/40 mt-2 italic">
              {displayedDays === 0 && "Chaque journée validée fait grandir votre cerveau."}
              {displayedDays > 0 && displayedCycleProgress < 0.5 && "Vous bâtissez vos premières habitudes. Continuez."}
              {displayedCycleProgress >= 0.5 && displayedCycleProgress < 1 && "Plus que quelques jours pour terminer ce cycle."}
              {isNewCycleStart && "Nouveau cycle ✨ Une nouvelle couleur, de nouvelles connexions."}
            </p>
          </div>

          {/* Cycle legend (colors of completed/current cycles) */}
          <div className="rounded-2xl border p-4 mb-4"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">
              Vos cycles
            </p>
            <div className="flex flex-wrap gap-2">
              {[...Array(12)].map((_, i) => {
                const isCompleted = i < displayedCycleIdx;
                const isCurrent = i === displayedCycleIdx && displayedDays > 0;
                const isLocked = i > displayedCycleIdx || displayedDays === 0;
                const c = BRAIN_CYCLE_COLORS[i];
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full border flex items-center justify-center"
                      style={{
                        background: isLocked ? "rgba(255,255,255,0.03)" : c + "30",
                        borderColor: isLocked ? "rgba(255,255,255,0.1)" : c,
                        boxShadow: isCurrent ? `0 0 12px ${c}` : "none",
                      }}>
                      {isCompleted && <Check size={10} style={{ color: c }} />}
                      {isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: c }} />
                      )}
                    </div>
                    <p className="text-[8px] text-white/30 font-mono tabular-nums">
                      {i + 1}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* === BETA TESTERS: cycle preview buttons === */}
          <div className="rounded-2xl border-2 border-dashed border-yellow-400/30 bg-yellow-400/[0.03] p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🧪</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-300/80">
                Aperçu bêta · à supprimer en prod
              </p>
            </div>
            <p className="text-[11px] text-white/50 mb-3 leading-relaxed">
              Visualisez à quoi ressemblera le cerveau après chaque cycle complet.
            </p>
            <div className="grid grid-cols-6 gap-1.5">
              {[...Array(12)].map((_, i) => {
                const cycleNum = i + 1;
                const c = BRAIN_CYCLE_COLORS[i];
                const isActive = brainPreviewCycle === cycleNum;
                return (
                  <button
                    key={i}
                    onClick={() => setBrainPreviewCycle(cycleNum)}
                    className="aspect-square rounded-lg border text-[11px] font-mono tabular-nums transition hover:scale-105"
                    style={{
                      background: isActive ? c + "30" : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? c : c + "40",
                      color: isActive ? c : "rgba(255,255,255,0.6)",
                      boxShadow: isActive ? `0 0 12px ${c}80` : "none",
                    }}
                  >
                    {cycleNum}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-white/30 italic mt-3 text-center">
              Chaque bouton = {BRAIN_CYCLE_DAYS} jours validés × le cycle choisi
            </p>
          </div>

          <p className="text-[11px] text-white/30 text-center italic px-4 leading-relaxed">
            Un cycle = 28 jours. Le temps qu'il faut pour ancrer une habitude.
            <br/>Chaque journée validée à 80% ou plus active une nouvelle connexion.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // === SUBSCRIPTION PAGE ===
  // ============================================================
  if (showSubscription || trialExpired) {
    const forced = trialExpired; // can't go back if trial expired

    return (
      <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden"
        style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: dayTheme.glow }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-50"
            style={{ background: dayTheme.accent }} />
        </div>

        <div className="relative z-10 max-w-md mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            {!forced ? (
              <button onClick={() => setShowSubscription(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                <ChevronLeft size={18} />
              </button>
            ) : (
              <div className="w-10" />
            )}
            <h2 className="text-lg font-light">
              {user.isSubscribed ? "Mon abonnement" : "Activer Focus"}
            </h2>
            <div className="w-10" />
          </header>

          {/* === ALREADY SUBSCRIBED === */}
          {user.isSubscribed ? (
            <>
              <div className="rounded-3xl border p-6 mb-6"
                style={{ borderColor: dayTheme.accent + "40",
                  background: `linear-gradient(135deg, ${dayTheme.accent}15 0%, transparent 100%)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: dayTheme.accent + "30" }}>
                    <CheckCircle2 size={20} style={{ color: dayTheme.accent }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-0.5">Abonnement</p>
                    <p className="text-base font-medium" style={{ color: dayTheme.accent }}>Actif</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Plan</span>
                    <span>Focus mensuel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Tarif</span>
                    <span>3,99 € / mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Engagement</span>
                    <span>Aucun</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setUser({ ...user, isSubscribed: false })}
                className="w-full py-3 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition"
              >
                Annuler mon abonnement
              </button>
              <p className="text-[11px] text-white/30 text-center mt-3 italic">
                L'annulation prend effet à la fin de la période en cours.
              </p>
            </>
          ) : (
            <>
              {/* === TRIAL STATUS / VALUE PROP === */}
              <div className="rounded-3xl border p-6 mb-5"
                style={{ borderColor: dayTheme.accent + "40",
                  background: `linear-gradient(135deg, ${dayTheme.accent}15 0%, transparent 100%)`,
                  boxShadow: `0 20px 60px ${dayTheme.accent}20` }}>
                {forced ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Essai terminé
                    </p>
                    <h3 className="text-2xl font-light mb-1">
                      Continuons ensemble
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Votre essai gratuit de 7 jours est terminé.
                      Activez votre abonnement pour continuer à utiliser Focus.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      Essai gratuit · {trialDaysLeft} {trialDaysLeft > 1 ? "jours" : "jour"} restant{trialDaysLeft > 1 ? "s" : ""}
                    </p>
                    <h3 className="text-2xl font-light mb-1">
                      Activer mon abonnement
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Continuez à profiter de Focus après votre période d'essai.
                    </p>
                  </>
                )}

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extralight" style={{ color: dayTheme.accent }}>3,99 €</span>
                  <span className="text-sm text-white/50">/ mois</span>
                </div>
                <p className="text-[11px] text-white/40 mt-1">Sans engagement · annulable à tout moment</p>
              </div>

              {/* === PAYMENT FORM === */}
              <div className="space-y-3 mb-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50 ml-1">
                  Informations de paiement
                </p>

                <input
                  type="text"
                  placeholder="Nom sur la carte"
                  value={paymentForm.name}
                  onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/30"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Numéro de carte"
                  value={paymentForm.cardNumber}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formatted = v.replace(/(.{4})/g, "$1 ").trim();
                    setPaymentForm({ ...paymentForm, cardNumber: formatted });
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/30 font-mono tabular-nums"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / AA"
                    value={paymentForm.expiry}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      const formatted = v.length > 2 ? `${v.slice(0, 2)} / ${v.slice(2)}` : v;
                      setPaymentForm({ ...paymentForm, expiry: formatted });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/30 font-mono tabular-nums"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="CVC"
                    value={paymentForm.cvc}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/30 font-mono tabular-nums"
                  />
                </div>
              </div>

              <button
                onClick={activateSubscription}
                disabled={!paymentForm.cardNumber || !paymentForm.expiry || !paymentForm.cvc || !paymentForm.name}
                className="w-full py-4 rounded-xl text-sm font-medium transition hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: dayTheme.accent, color: "#000" }}
              >
                Activer mon abonnement · 3,99 € / mois
              </button>

              <p className="text-[11px] text-white/30 text-center mt-3 leading-relaxed">
                Vous serez débité aujourd'hui de 3,99 €.
                Annulable à tout moment depuis votre compte.
              </p>

              {forced && (
                <button
                  onClick={() => setUser(null)}
                  className="w-full mt-4 py-2.5 text-xs text-white/40 hover:text-white/60 transition"
                >
                  Se déconnecter
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // === MAIN APP ===
  // ============================================================
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden" style={{ fontFamily: "'Söhne', 'Inter', system-ui, sans-serif" }}>
      <style>{`
        @keyframes float-up { 0% { transform: translateY(0) scale(1); opacity: 0.9; } 100% { transform: translateY(-18px) scale(0.3); opacity: 0; } }
        @keyframes shimmer-edge { 0%, 100% { opacity: 0.6; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.15); } }
        @keyframes goal-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes goal-pop { 0% { transform: scale(1); } 50% { transform: scale(1.04); } 100% { transform: scale(1); } }
        @keyframes breath {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes burst-fade {
          0% { transform: scale(0.4); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes check-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti-out {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes particle-pulse {
          0%, 100% { transform: scale(0.6) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.3) translate(2px, -2px); opacity: 1; }
        }
        @keyframes brain-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes hologram-flicker {
          0%, 100% { opacity: 0.95; }
          47% { opacity: 0.95; }
          48% { opacity: 0.65; }
          49% { opacity: 0.9; }
          50% { opacity: 0.55; }
          51% { opacity: 0.95; }
          80% { opacity: 0.85; }
        }
        @keyframes hologram-color {
          0% { filter: hue-rotate(0deg) drop-shadow(0 0 20px #A78BFA); }
          25% { filter: hue-rotate(60deg) drop-shadow(0 0 25px #60A5FA); }
          50% { filter: hue-rotate(180deg) drop-shadow(0 0 25px #34D399); }
          75% { filter: hue-rotate(280deg) drop-shadow(0 0 25px #F472B6); }
          100% { filter: hue-rotate(360deg) drop-shadow(0 0 20px #A78BFA); }
        }
        @keyframes hologram-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes brain-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes brain-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      <div className="absolute inset-0 opacity-50 pointer-events-none transition-all duration-1000">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-1000"
          style={{ background: dayTheme.glow }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: currentTask ? currentTask.color : dayTheme.accent }} />
      </div>

      {isRunning && currentTask && (
        <div className="relative z-10 bg-black/60 backdrop-blur-xl border-b border-white/5 px-5 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentTask.color }} />
            <span className="font-medium tracking-wide">{currentTask.name}</span>
          </div>
          <div className="font-mono tabular-nums text-white/80">{formatTime(remainingSec)} restant</div>
        </div>
      )}

      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        {/* HEADER — minimal: logo + avatar only */}
        <header className="flex items-start justify-between mb-8">
          <button
            onClick={() => {
              const now = Date.now();
              if (now - logoTapsRef.current.lastTap < 600) {
                logoTapsRef.current.count++;
              } else {
                logoTapsRef.current.count = 1;
              }
              logoTapsRef.current.lastTap = now;
              if (logoTapsRef.current.count >= 5) {
                logoTapsRef.current.count = 0;
                toggleDemo();
              }
            }}
            className="text-left"
          >
            <h1 className="text-4xl font-light tracking-tight leading-none">
              focus<span style={{ color: dayTheme.accent }}>.</span>
            </h1>
            <p className="text-xs text-white/40 mt-2 tracking-widest uppercase">
              {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </button>

          <button onClick={() => setShowMenu(true)}
            data-tour="menu"
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition">
            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-xs font-medium"
              style={{ background: dayTheme.accent + "30", border: `1px solid ${dayTheme.accent}40` }}>
              {user.photo ? <img src={user.photo} alt="" className="w-full h-full object-cover" />
              : <span style={{ color: dayTheme.accent }}>{user.firstName?.[0]}{user.lastName?.[0]}</span>}
            </div>
            <ChevronDown size={12} className="text-white/50" />
          </button>
        </header>

        {/* === TRIAL COUNTDOWN BANNER === */}
        {!user.isSubscribed && trialDaysLeft > 0 && (
          <button
            onClick={() => setShowSubscription(true)}
            className="w-full mb-3 px-4 py-2.5 rounded-2xl border flex items-center justify-between gap-3 transition hover:bg-white/[0.04]"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dayTheme.accent }} />
              <p className="text-xs text-white/70">
                Essai gratuit · <span className="font-medium text-white">{trialDaysLeft} {trialDaysLeft > 1 ? "jours" : "jour"} restant{trialDaysLeft > 1 ? "s" : ""}</span>
              </p>
            </div>
            <span className="text-[11px] font-medium" style={{ color: dayTheme.accent }}>
              Activer →
            </span>
          </button>
        )}

        {/* === MY BRAIN BANNER === */}
        <button
          onClick={() => setShowBrain(true)}
          data-tour="brain"
          className="w-full mb-6 px-4 py-3 rounded-2xl border flex items-center gap-3 transition hover:bg-white/[0.04] group"
          style={{
            background: `linear-gradient(135deg, ${brainCurrentColor}10 0%, transparent 70%)`,
            borderColor: brainCurrentColor + "30",
          }}
        >
          {/* Mini brain preview */}
          <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-md opacity-50"
              style={{ background: brainCurrentColor }} />
            <svg viewBox="0 0 60 60" className="relative w-full h-full">
              {/* Brain outline */}
              <path
                d="M 30 10 C 18 10, 10 16, 10 26 C 8 32, 12 38, 18 42 C 22 46, 26 47, 30 46 C 34 47, 38 46, 42 42 C 48 38, 52 32, 50 26 C 50 16, 42 10, 30 10 Z"
                fill="none"
                stroke={brainCurrentColor}
                strokeWidth="0.8"
                opacity="0.7"
              />
              {/* Mini glowing dots — proportional to total days */}
              {[...Array(Math.min(brainTotalDays, 12))].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const r = 10 + (i % 3) * 3;
                return (
                  <circle key={i}
                    cx={30 + Math.cos(angle) * r}
                    cy={26 + Math.sin(angle) * r * 0.7}
                    r="1.3"
                    fill={BRAIN_CYCLE_COLORS[Math.floor((i / Math.max(brainTotalDays, 1)) * (brainCurrentCycleIdx + 1)) % BRAIN_CYCLE_COLORS.length]}
                  >
                    <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.1}s`} />
                  </circle>
                );
              })}
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-left min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-0.5">
              Mon cerveau
            </p>
            <p className="text-sm font-medium" style={{ color: brainCurrentColor }}>
              {brainTotalDays === 0
                ? "Validez votre première journée"
                : `Cycle ${brainCurrentCycleIdx + 1} · Jour ${brainDayInCycle + (brainTotalDays > 0 ? 1 : 0)}/${BRAIN_CYCLE_DAYS}`}
            </p>
          </div>

          {/* Progress bar */}
          {brainTotalDays > 0 && (
            <div className="w-12 h-1 rounded-full overflow-hidden bg-white/10 shrink-0">
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${brainCycleProgress * 100}%`,
                  background: brainCurrentColor,
                  boxShadow: `0 0 6px ${brainCurrentColor}`,
                }} />
            </div>
          )}

          <ChevronRight size={14} className="text-white/40 shrink-0" />
        </button>

        {/* WEEK SELECTOR */}
        <div data-tour="week" className="mb-6 -mx-6 px-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Semaine</p>
            <div className="flex items-center gap-3">
              {selectedDay !== todayIndex() && (
                <button
                  onClick={() => setSelectedDay(todayIndex())}
                  className="text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: DAY_THEMES[todayIndex()].accent }} />
                  Aujourd'hui
                </button>
              )}
              <p className="text-xs text-white/40 italic">{dayTheme.mood}</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {DAY_THEMES.map((day, idx) => {
              const isSelected = selectedDay === idx;
              const isToday = idx === todayIndex();
              return (
                <button key={idx} onClick={() => setSelectedDay(idx)}
                  className={`shrink-0 snap-start flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all ${
                    isSelected ? "scale-105" : "hover:bg-white/5"}`}
                  style={{
                    background: isSelected ? day.accent + "20" : "rgba(255,255,255,0.03)",
                    borderColor: isSelected ? day.accent + "60" : "rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? `0 0 20px ${day.accent}40` : "none",
                  }}>
                  <span className="text-[10px] uppercase tracking-widest font-medium mb-2"
                    style={{ color: isSelected ? day.accent : "rgba(255,255,255,0.5)" }}>{day.short}</span>
                  {/* Elegant dots representing tasks */}
                  <div className="flex items-center gap-0.5 h-5">
                    {(() => {
                      const count = (weekTasks[idx] || []).length;
                      if (count === 0) {
                        return <div className="w-3 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />;
                      }
                      const dots = Math.min(count, 5);
                      return (
                        <>
                          {[...Array(dots)].map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full"
                              style={{
                                background: isSelected ? day.accent : "rgba(255,255,255,0.5)",
                                opacity: isSelected ? 1 : 0.7,
                              }} />
                          ))}
                          {count > 5 && (
                            <span className="text-[8px] ml-0.5"
                              style={{ color: isSelected ? day.accent : "rgba(255,255,255,0.5)" }}>+</span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  {isToday && <span className="mt-1.5 w-1 h-1 rounded-full" style={{ background: day.accent }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========== GOAL PROGRESS LINES (only when something has progressed) ========== */}
        {(dailyGoal.percent > 0 || weeklyGoal.percent > 0) && (
        <div className="space-y-4 mb-8">
          {/* Daily goal line */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Progression journée
              </p>
              <p className="text-xs font-mono tabular-nums" style={{ color: dayTheme.accent }}>
                {dailyGoal.percent}<span className="text-white/30">%</span>
                <span className="text-white/30 ml-1.5">· {dailyGoal.done}/{dailyGoal.total}</span>
              </p>
            </div>
            <div className="relative h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${dailyGoal.percent}%`,
                  background: dayTheme.accent,
                  boxShadow: `0 0 10px ${dayTheme.accent}80`,
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              {dailyGoal.percent > 0 && dailyGoal.percent < 100 && (
                <div
                  className="absolute inset-y-0 w-1/4 pointer-events-none"
                  style={{
                    left: 0,
                    background: `linear-gradient(90deg, transparent 0%, ${dayTheme.accent}80 50%, transparent 100%)`,
                    animation: "goal-shimmer 2.5s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* Weekly goal line */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Progression semaine
              </p>
              <p className="text-xs font-mono tabular-nums text-white/85">
                {weeklyGoal.percent}<span className="text-white/30">%</span>
                <span className="text-white/30 ml-1.5">· {weeklyGoal.done}/{weeklyGoal.total}</span>
              </p>
            </div>
            <div className="relative h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${weeklyGoal.percent}%`,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              {weeklyGoal.percent > 0 && weeklyGoal.percent < 100 && (
                <div
                  className="absolute inset-y-0 w-1/4 pointer-events-none"
                  style={{
                    left: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    animation: "goal-shimmer 3s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        )}

        {/* AMBIENT SOUND PICKER — only when day is running */}
        {isRunning && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Ambiance sonore</p>
            {(activeAmbient || activeCustomTrack) && (
              <input type="range" min="0" max="1" step="0.05" value={ambientVolume}
                onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                className="w-20 accent-white/60" />
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-2" style={{ scrollbarWidth: "none" }}>
            {AMBIENT_SOUNDS.map((sound) => {
              const Icon = sound.icon;
              const isActive = activeAmbient === sound.id;
              return (
                <button key={sound.id} onClick={() => activateAmbient(sound.id)}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all"
                  style={{ background: isActive ? sound.color + "20" : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? sound.color + "60" : "rgba(255,255,255,0.08)" }}>
                  <Icon size={14} style={{ color: isActive ? sound.color : "rgba(255,255,255,0.6)" }} />
                  <span className="text-xs" style={{ color: isActive ? sound.color : "rgba(255,255,255,0.7)" }}>
                    {sound.name}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sound.color }} />}
                </button>
              );
            })}
            {customTracks.map((track) => {
              const isActive = activeCustomTrack === track.id;
              return (
                <div key={track.id} className="shrink-0 flex items-center gap-1 rounded-full border transition-all"
                  style={{ background: isActive ? "#FFFFFF20" : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? "#FFFFFF60" : "rgba(255,255,255,0.08)" }}>
                  <button onClick={() => activateCustom(track.id)}
                    className="flex items-center gap-2 pl-4 pr-2 py-2.5">
                    <Headphones size={14} style={{ color: isActive ? "white" : "rgba(255,255,255,0.6)" }} />
                    <span className="text-xs max-w-[120px] truncate" style={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}>
                      {track.name}
                    </span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />}
                  </button>
                  <button onClick={() => removeCustomTrack(track.id)}
                    className="pr-3 text-white/40 hover:text-red-400 transition">
                    <X size={12} />
                  </button>
                </div>
              );
            })}
            <label className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border border-dashed border-white/15 hover:bg-white/5 hover:border-white/30 transition cursor-pointer">
              <Upload size={14} className="text-white/60" />
              <span className="text-xs text-white/70">Ajouter ma musique</span>
              <input type="file" accept="audio/*" multiple className="hidden" onChange={handleMusicUpload} />
            </label>
          </div>
        </div>
        )}

        {demoMode && (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-xs text-yellow-200 flex items-center gap-2">
            <Zap size={12} /> Mode démo : chaque tâche dure 30 secondes
          </div>
        )}

        {/* MAIN: only show the running ring when day is running */}
        {(isRunning || pausedAt) && (() => {
          // Calculate countdown to the next task if no task is currently active
          let countdownSec = 0;
          let totalWaitSec = 0;
          if (!currentTask && nextTask) {
            const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
            countdownSec = Math.max(0, Math.floor((toMin(nextTask.start) - nowMin) * 60));
            // Total wait window — capped at 1 hour for visual reference (full ring at 1h+ wait)
            totalWaitSec = Math.min(60 * 60, countdownSec + 1);
          }
          const countdownProgress = totalWaitSec > 0
            ? Math.max(0, ((totalWaitSec - countdownSec) / totalWaitSec) * 100)
            : 0;
          const countdownOffset = circumference - (countdownProgress / 100) * circumference;
          const accent = currentTask ? currentTask.color : (nextTask ? nextTask.color : dayTheme.accent);

          return (
          <div className="flex flex-col items-center mb-3">
            <div className="relative w-72 h-72">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
                <circle cx="140" cy="140" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                {currentTask && (
                  <circle cx="140" cy="140" r={radius} stroke={currentTask.color} strokeWidth="3" fill="none"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeOffset}
                    style={{ transition: "stroke-dashoffset 1s linear, stroke 0.6s ease" }} />
                )}
                {/* Countdown ring (when waiting for next task) */}
                {!currentTask && nextTask && !demoMode && (
                  <circle cx="140" cy="140" r={radius} stroke={accent} strokeWidth="2" fill="none"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={countdownOffset}
                    style={{
                      transition: "stroke-dashoffset 1s linear",
                      filter: `drop-shadow(0 0 8px ${accent}80)`,
                      opacity: 0.8,
                    }} />
                )}
              </svg>

              {/* === COUNTDOWN PARTICLE FIELD ===
                  1 particle at 0%, hundreds near 100% with exponential growth */}
              {!currentTask && nextTask && !demoMode && (
                <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
                  {(() => {
                    // Exponential growth: 1 → 250 particles
                    // At 0% → 1 ; at 50% → ~30 ; at 90% → ~150 ; at 100% → 250
                    const eased = Math.pow(countdownProgress / 100, 1.8);
                    const particleCount = Math.max(1, Math.floor(1 + eased * 249));
                    const particles = [];
                    for (let i = 0; i < particleCount; i++) {
                      // Stable pseudo-random distribution (deterministic per index)
                      const angle = ((i * 137.508) % 360); // golden angle for even spread
                      const distRatio = 0.05 + ((i * 17) % 90) / 100;
                      const x = 50 + Math.cos(angle * Math.PI / 180) * distRatio * 47;
                      const y = 50 + Math.sin(angle * Math.PI / 180) * distRatio * 47;
                      const size = 1 + ((i * 7) % 4);
                      const duration = 1.5 + ((i * 11) % 30) / 10;
                      const delay = ((i * 13) % 40) / 10;
                      particles.push(
                        <span
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            background: accent,
                            boxShadow: `0 0 ${3 + countdownProgress / 10}px ${accent}`,
                            opacity: 0.3 + (countdownProgress / 150),
                            animation: `particle-pulse ${duration}s ease-in-out infinite`,
                            animationDelay: `${delay}s`,
                          }}
                        />
                      );
                    }
                    return particles;
                  })()}
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {currentTask ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">en cours</p>
                    <h2 className="text-2xl font-light mb-3">{currentTask.name}</h2>
                    <div className="text-5xl font-extralight font-mono tabular-nums tracking-tight" style={{ color: currentTask.color }}>
                      {formatTime(remainingSec)}
                    </div>
                    <p className="text-xs text-white/40 mt-3">
                      {demoMode ? "démo" : `${currentTask.start} → ${currentTask.end}`}
                    </p>
                  </>
                ) : demoMode ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Journée terminée</p>
                    <h2 className="text-2xl font-light text-white/60">Bravo 🎉</h2>
                  </>
                ) : nextTask ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                      Votre journée commence dans
                    </p>
                    <div className="text-5xl font-extralight font-mono tabular-nums tracking-tight"
                      style={{ color: accent }}>
                      {formatTime(countdownSec)}
                    </div>
                    <p className="text-sm text-white/60 mt-4">
                      <span className="text-white/40">{nextTask.name} · </span>
                      <span className="font-mono tabular-nums">{nextTask.start}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Journée terminée</p>
                    <h2 className="text-2xl font-light text-white/60">Bravo 🎉</h2>
                    <p className="text-[11px] text-white/40 mt-3 px-4">
                      Toutes les tâches sont passées
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Pause / Resume + plein écran buttons row */}
            <div className="flex items-center gap-3 mt-5">
              <button onClick={togglePlay}
                className="w-12 h-12 rounded-full backdrop-blur border flex items-center justify-center transition active:scale-95"
                style={{
                  background: pausedAt ? dayTheme.accent : "rgba(255,255,255,0.1)",
                  borderColor: pausedAt ? dayTheme.accent : "rgba(255,255,255,0.2)",
                  color: pausedAt ? "#000" : "#fff",
                }}>
                {pausedAt ? <Play size={16} fill="#000" className="ml-0.5" /> : <Pause size={16} fill="#fff" />}
              </button>
              <button onClick={() => setFocusMode(true)}
                className="px-4 py-2.5 rounded-full border backdrop-blur flex items-center gap-2 transition hover:bg-white/5"
                style={{ borderColor: dayTheme.accent + "40", background: dayTheme.accent + "10" }}>
                <Maximize2 size={12} style={{ color: dayTheme.accent }} />
                <span className="text-xs font-medium" style={{ color: dayTheme.accent }}>Plein écran</span>
              </button>
            </div>

            {pausedAt && (
              <p className="text-xs text-white/50 mt-3 tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dayTheme.accent }} />
                En pause
              </p>
            )}
          </div>
          );
        })()}

        {/* TIMELINE */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40">Timeline · {dayTheme.name}</h3>
          <button onClick={openAdd}
            data-tour="addBtn"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition">
            <Plus size={14} /> Ajouter
          </button>
        </div>

        <div data-tour="timeline">
        {sortedTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: dayTheme.accent + "15", border: `1px solid ${dayTheme.accent}30` }}>
              <Sparkles size={18} style={{ color: dayTheme.accent }} />
            </div>
            <p className="text-base font-light mb-1">Programmez votre {dayTheme.name.toLowerCase()}</p>
            <p className="text-xs text-white/40 mb-5">
              Ajoutez votre première tâche pour démarrer
            </p>
            <button onClick={openAdd}
              className="text-xs px-5 py-2.5 rounded-full transition inline-flex items-center gap-1.5 font-medium"
              style={{ background: dayTheme.accent + "20", border: `1px solid ${dayTheme.accent}50`, color: dayTheme.accent }}>
              <Plus size={13} /> Ajouter une tâche
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sortedTasks.map((task) => {
              const isCurrent = currentTask?.id === task.id;
              const taskProg = getTaskProgress(task);
              const isPast = isPastTask(task) && !isCurrent;
              const isExpanded = expandedId === task.id;
              const linkedMed = task.meditationId ? MEDITATIONS.find(m => m.id === task.meditationId) : null;
              const cat = task.category ? TASK_CATEGORIES.find(c => c.id === task.category) : null;
              const CatIcon = cat?.icon;
              const completion = dayCompletions[task.id]; // 'done' | 'skipped' | undefined

              return (
                <div key={task.id}
                  className={`group relative rounded-2xl overflow-hidden border transition-all ${
                    isCurrent ? "border-white/15 scale-[1.02] shadow-2xl"
                    : isPast ? "border-white/5 opacity-60" : "border-white/5 hover:border-white/10"
                  }`}
                  style={{ background: "rgba(255,255,255,0.025)" }}>
                  <div className="absolute inset-y-0 left-0 transition-all pointer-events-none"
                    style={{
                      width: `${taskProg}%`,
                      background: "linear-gradient(90deg, rgba(52,211,153,0.55) 0%, rgba(251,191,36,0.45) 60%, rgba(248,113,113,0.55) 100%)",
                      transition: "width 1s linear",
                    }} />
                  {/* Soft color overlay matching task color, subtle */}
                  <div className="absolute inset-y-0 left-0 transition-all pointer-events-none"
                    style={{
                      width: `${taskProg}%`,
                      background: `linear-gradient(90deg, ${task.color}15 0%, ${task.color}05 100%)`,
                      transition: "width 1s linear",
                      mixBlendMode: "overlay",
                    }} />
                  {taskProg > 0 && taskProg < 100 && (
                    <div className="absolute inset-y-0 pointer-events-none"
                      style={{ left: `calc(${taskProg}% - 24px)`, width: "48px", transition: "left 1s linear" }}>
                      {/* Leading edge color shifts from green→red based on progress */}
                      {(() => {
                        // Interpolate between green (#34D399), amber (#FBBF24) and red (#F87171)
                        let edgeColor = "#34D399";
                        if (taskProg > 50 && taskProg <= 80) edgeColor = "#FBBF24";
                        else if (taskProg > 80) edgeColor = "#F87171";
                        return (
                          <>
                            <div className="absolute inset-y-0 right-6 w-px"
                              style={{ background: edgeColor, boxShadow: `0 0 14px ${edgeColor}, 0 0 28px ${edgeColor}80`,
                                animation: "shimmer-edge 1.4s ease-in-out infinite" }} />
                            {[...Array(8)].map((_, i) => (
                              <span key={i} className="absolute rounded-full"
                                style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: edgeColor,
                                  right: `${4 + (i * 5)}px`, top: `${15 + ((i * 13) % 50)}%`, opacity: 0,
                                  animation: `float-up ${1.4 + (i * 0.18)}s ease-out infinite`,
                                  animationDelay: `${i * 0.15}s`, boxShadow: `0 0 6px ${edgeColor}` }} />
                            ))}
                          </>
                        );
                      })()}
                    </div>
                  )}
                  <button onClick={() => setExpandedId(isExpanded ? null : task.id)}
                    className="relative w-full flex items-center gap-4 p-4 min-h-[72px] text-left">
                    {CatIcon ? (
                      <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ background: task.color + "25" }}>
                        <CatIcon size={16} style={{ color: task.color }} />
                      </div>
                    ) : (
                      <div className="w-1 h-12 rounded-full shrink-0" style={{ background: task.color }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <h4 className={`truncate font-medium flex items-center gap-2 ${isCurrent ? "text-white" : "text-white/85"}`}>
                          {task.name}
                          {completion === "done" && <CheckCircle2 size={12} className="text-green-400 shrink-0" />}
                          {completion === "skipped" && <X size={12} className="text-white/30 shrink-0" />}
                          {task.notes && <StickyNote size={11} className="text-white/30 shrink-0" />}
                          {linkedMed && <Brain size={11} style={{ color: linkedMed.color }} />}
                        </h4>
                        <span className="text-xs text-white/50 font-mono tabular-nums whitespace-nowrap">
                          {task.start} – {task.end}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40">
                          {completion === "done" ? "✓ Validée"
                          : completion === "skipped" ? "Non terminée"
                          : task.subcategory ? task.subcategory
                          : (isPast ? "Terminé" : isCurrent ? "En cours" : "À venir")}
                        </span>
                        <span className="font-mono tabular-nums font-medium"
                          style={{ color: isCurrent ? task.color : "rgba(255,255,255,0.5)" }}>
                          {Math.round(taskProg)}%
                        </span>
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-white/40 shrink-0 transition-transform"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>
                  {isExpanded && (
                    <div className="relative border-t border-white/5 bg-black/30 backdrop-blur p-4 space-y-3">
                      {task.notes ? (
                        <div className="text-sm text-white/75 whitespace-pre-line leading-relaxed">{task.notes}</div>
                      ) : (
                        <p className="text-xs text-white/30 italic">Aucune note pour cette tâche.</p>
                      )}
                      {linkedMed && (
                        <button onClick={(e) => { e.stopPropagation(); setActiveMeditation(linkedMed.id); }}
                          className="w-full p-3 rounded-xl border flex items-center gap-3 transition hover:bg-white/5"
                          style={{ borderColor: linkedMed.color + "40", background: linkedMed.color + "10" }}>
                          <linkedMed.icon size={18} style={{ color: linkedMed.color }} />
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium" style={{ color: linkedMed.color }}>{linkedMed.name}</p>
                            <p className="text-[11px] text-white/50">{linkedMed.duration} min · {linkedMed.description}</p>
                          </div>
                          <Play size={14} style={{ color: linkedMed.color }} />
                        </button>
                      )}

                      {/* Early-finish button — only on the current task */}
                      {isCurrent && !completion && (
                        <button onClick={(e) => {
                            e.stopPropagation();
                            popupOpenedAtRef.current = null; // manual = no auto-shift
                            popupTriggerKindRef.current = "manual";
                            setEndTaskPopup(task);
                          }}
                          className="w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 transition hover:scale-[1.01]"
                          style={{
                            background: task.color + "15",
                            borderColor: task.color + "50",
                            color: task.color,
                          }}>
                          <CheckCircle2 size={14} />
                          <span className="text-xs font-medium">Terminer maintenant</span>
                        </button>
                      )}

                      <div className="flex justify-end gap-1 pt-1">
                        <button onClick={(e) => { e.stopPropagation(); openEdit(task); }}
                          className="w-8 h-8 rounded-full hover:bg-white/5 transition flex items-center justify-center text-white/40 hover:text-white"
                          title="Modifier">
                          <Pencil size={13} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                          className="w-8 h-8 rounded-full hover:bg-red-500/10 transition flex items-center justify-center text-white/40 hover:text-red-400"
                          title="Supprimer">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>

        {/* ===== START DAY BUTTON (only when truly not started — not paused) ===== */}
        {!isRunning && !pausedAt && (
          <div className="mt-10 mb-4 flex flex-col items-center">
            <button
              onClick={() => {
                if (sortedTasks.length === 0) {
                  setShowNoTasksWarning(true);
                } else {
                  startDay();
                }
              }}
              data-tour="startBtn"
              className="group relative w-full overflow-hidden rounded-2xl px-6 py-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: `linear-gradient(135deg, ${dayTheme.accent}25 0%, ${dayTheme.accent}10 50%, transparent 100%)`,
                border: `1px solid ${dayTheme.accent}40`,
                boxShadow: `0 0 30px ${dayTheme.accent}20, inset 0 1px 0 ${dayTheme.accent}30`,
              }}
            >
              {/* Animated shimmer sweep */}
              <div
                className="absolute inset-y-0 w-1/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${dayTheme.accent}40 50%, transparent 100%)`,
                  animation: "goal-shimmer 2s ease-in-out infinite",
                }}
              />
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: dayTheme.accent }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: dayTheme.accent, animationDuration: "3s" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: dayTheme.accent + "60" }}
                    />
                    <div
                      className="relative w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${dayTheme.accent} 0%, ${dayTheme.accent}80 100%)`,
                        boxShadow: `0 0 20px ${dayTheme.accent}80`,
                      }}
                    >
                      <Play size={14} fill="black" className="ml-0.5 text-black" />
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-0.5">
                      {sortedTasks.length > 0 ? "Tout est prêt" : "Aucune tâche"}
                    </p>
                    <p className="text-base font-medium" style={{ color: dayTheme.accent }}>
                      Démarrer la journée
                    </p>
                  </div>
                </div>

                {sortedTasks.length > 0 ? (
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Première</p>
                    <p className="text-xs font-medium text-white/80 truncate max-w-[120px]">
                      {sortedTasks[0]?.name}
                    </p>
                    <p className="text-[10px] font-mono text-white/40 tabular-nums">
                      {sortedTasks[0]?.start}
                    </p>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      0 tâche
                    </p>
                    <p className="text-[10px] text-white/40 italic mt-0.5">
                      à programmer
                    </p>
                  </div>
                )}
              </div>
            </button>

            <button onClick={() => setFocusMode(true)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-white/40 hover:text-white/70 transition">
              <Maximize2 size={11} />
              Mode plein écran
            </button>
          </div>
        )}

        {/* === ADD / EDIT MODAL === */}
        {showAdd && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowAdd(false)}>
            <div onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-light mb-1">{editingTask ? "Modifier la tâche" : "Nouvelle tâche"}</h3>
              <p className="text-xs text-white/40 mb-5">{dayTheme.name}</p>

              {/* Hint: last task's end time when adding a new task */}
              {!editingTask && sortedTasks.length > 0 && (() => {
                const lastTask = sortedTasks.reduce((latest, t) =>
                  toMin(t.end) > toMin(latest.end) ? t : latest, sortedTasks[0]);
                return (
                  <div className="mb-4 px-3.5 py-2.5 rounded-xl flex items-start gap-2.5 border"
                    style={{ background: dayTheme.accent + "10", borderColor: dayTheme.accent + "30" }}>
                    <Clock size={13} className="shrink-0 mt-0.5" style={{ color: dayTheme.accent }} />
                    <div className="text-[11px] leading-relaxed">
                      <p className="text-white/70">
                        Votre dernière tâche se termine à <span className="font-mono tabular-nums font-medium text-white">{lastTask.end}</span>
                      </p>
                      <p className="text-white/40 mt-0.5">
                        L'heure de début est pré-remplie pour enchaîner
                      </p>
                    </div>
                  </div>
                );
              })()}

              <button onClick={() => { setShowCategoryPicker(true); setPickerStep("category"); }}
                className="w-full mb-4 p-3.5 rounded-xl border flex items-center gap-3 transition hover:bg-white/5"
                style={{
                  borderColor: taskForm.category
                    ? TASK_CATEGORIES.find(c => c.id === taskForm.category)?.color + "60"
                    : "rgba(167,139,250,0.4)",
                  background: taskForm.category
                    ? TASK_CATEGORIES.find(c => c.id === taskForm.category)?.color + "10"
                    : "rgba(167,139,250,0.08)",
                }}>
                {taskForm.category ? (
                  <>
                    {(() => {
                      const cat = TASK_CATEGORIES.find(c => c.id === taskForm.category);
                      const Icon = cat?.icon;
                      return Icon && <Icon size={18} style={{ color: cat.color }} />;
                    })()}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium" style={{ color: TASK_CATEGORIES.find(c => c.id === taskForm.category)?.color }}>
                        {TASK_CATEGORIES.find(c => c.id === taskForm.category)?.name}
                      </p>
                      {taskForm.subcategory && <p className="text-[11px] text-white/60">{taskForm.subcategory}</p>}
                    </div>
                    <span className="text-xs text-white/40">Changer</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="text-violet-400" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-violet-300">Tasks by Focus</p>
                      <p className="text-[11px] text-white/50">Choisir parmi les catégories prédéfinies</p>
                    </div>
                    <ChevronDown size={14} className="text-white/40 -rotate-90" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] text-white/30 uppercase tracking-widest">ou</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-3">
                <input type="text" placeholder="Nom de la tâche (libre)" value={taskForm.name}
                  onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">Début</label>
                    <input type="time" value={taskForm.start}
                      onChange={(e) => setTaskForm({ ...taskForm, start: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-white/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">Fin</label>
                    <input type="time" value={taskForm.end}
                      onChange={(e) => setTaskForm({ ...taskForm, end: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-white/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Notes / sous-tâches</label>
                  <textarea placeholder="Ajoute des notes, sous-tâches, rappels..." value={taskForm.notes}
                    onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })} rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none" />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">Annuler</button>
                <button onClick={saveTask}
                  className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition">
                  {editingTask ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === CATEGORY PICKER === */}
        {showCategoryPicker && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4"
            onClick={() => { setShowCategoryPicker(false); setPickedCategory(null); setPickerStep("category"); }}>
            <div onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto">
              {pickerStep === "category" ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-violet-400" />
                    <h3 className="text-lg font-light">Tasks by Focus</h3>
                  </div>
                  <p className="text-xs text-white/40 mb-5">Choisis une catégorie</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TASK_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button key={cat.id}
                          onClick={() => { setPickedCategory(cat); setPickerStep("subcategory"); }}
                          className="p-4 rounded-2xl border border-white/10 hover:border-white/20 transition flex flex-col items-start gap-2"
                          style={{ background: cat.color + "08" }}>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: cat.color + "25" }}>
                            <Icon size={16} style={{ color: cat.color }} />
                          </div>
                          <p className="text-sm font-medium">{cat.name}</p>
                          <p className="text-[10px] text-white/40">
                            {cat.subcategories.length} {cat.subcategories.length > 1 ? "options" : "option"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => { setPickerStep("category"); setPickedCategory(null); }}
                    className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white mb-3 transition">
                    <ChevronLeft size={14} /> Retour aux catégories
                  </button>
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      const Icon = pickedCategory.icon;
                      return <Icon size={16} style={{ color: pickedCategory.color }} />;
                    })()}
                    <h3 className="text-lg font-light">{pickedCategory.name}</h3>
                  </div>
                  <p className="text-xs text-white/40 mb-5">Choisis une activité</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pickedCategory.subcategories.map((sub, idx) => {
                      const Icon = sub.icon;
                      return (
                        <button key={idx}
                          onClick={() => {
                            setTaskForm({
                              ...taskForm, name: sub.name,
                              category: pickedCategory.id, subcategory: sub.name,
                              meditationId: sub.meditationId || taskForm.meditationId,
                            });
                            setShowCategoryPicker(false);
                            setPickedCategory(null);
                            setPickerStep("category");
                          }}
                          className="p-3 rounded-2xl border border-white/10 hover:border-white/20 transition flex items-center gap-2.5 text-left"
                          style={{ background: pickedCategory.color + "08" }}>
                          <Icon size={14} style={{ color: pickedCategory.color }} className="shrink-0" />
                          <span className="text-xs truncate">{sub.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* === MENU DRAWER (avatar tap) === */}
        {showMenu && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[65] flex items-start justify-end p-4 sm:p-6"
            onClick={() => setShowMenu(false)}>
            <div onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-3 w-full max-w-[260px] mt-16 shadow-2xl">

              {/* Profile summary */}
              <button
                onClick={() => { setShowMenu(false); setProfileDraft(user); setShowProfile(true); }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition text-left"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center font-medium shrink-0"
                  style={{ background: dayTheme.accent + "30", border: `1px solid ${dayTheme.accent}40` }}>
                  {user.photo ? (
                    <img src={user.photo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span style={{ color: dayTheme.accent }}>{user.firstName?.[0]}{user.lastName?.[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
                  <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                </div>
              </button>

              <div className="h-px bg-white/5 my-2" />

              <button
                onClick={() => { setShowMenu(false); setShowBrain(true); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                <Brain size={15} style={{ color: brainCurrentColor }} />
                <span className="text-sm flex-1">Mon cerveau</span>
                {brainTotalDays > 0 && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: brainCurrentColor + "20", color: brainCurrentColor }}>
                    {brainTotalDays}j
                  </span>
                )}
              </button>

              <button
                onClick={() => { setShowMenu(false); setShowStats(true); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                <BarChart3 size={15} className="text-white/60" />
                <span className="text-sm">Statistiques</span>
              </button>

              <button
                onClick={() => { setShowMenu(false); setProfileDraft(user); setShowProfile(true); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                <Pencil size={15} className="text-white/60" />
                <span className="text-sm">Modifier le profil</span>
              </button>

              <button
                onClick={() => { setShowMenu(false); setShowSubscription(true); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                <Sparkles size={15} className="text-white/60" />
                <span className="text-sm flex-1">Mon abonnement</span>
                {user.isSubscribed ? (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: dayTheme.accent + "20", color: dayTheme.accent }}>
                    Actif
                  </span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-white/40">
                    {trialDaysLeft > 0 ? `${trialDaysLeft}j` : "Expiré"}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setVoiceOn(!voiceOn);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                {voiceOn ? <Volume2 size={15} className="text-white/60" /> : <VolumeX size={15} className="text-white/60" />}
                <span className="text-sm flex-1">Voix de notification</span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                  {voiceOn ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={() => { setShowMenu(false); setTutorialStep(0); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                <Sparkles size={15} className="text-white/60" />
                <span className="text-sm">Revoir le tutoriel</span>
              </button>

              <div className="h-px bg-white/5 my-2" />

              <button
                onClick={() => { setShowMenu(false); setUser(null); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition text-left text-red-400/80"
              >
                <LogOut size={15} />
                <span className="text-sm">Se déconnecter</span>
              </button>
            </div>
          </div>
        )}

        {/* === BRAIN CONNECTION BURST (when a new day validates the brain) === */}
        {brainNewNodeBurst && (
          <div className="fixed inset-0 pointer-events-none z-[95] flex items-end justify-center pb-32 sm:pb-40">
            <button
              onClick={() => { setBrainNewNodeBurst(null); setShowBrain(true); }}
              className="pointer-events-auto rounded-2xl border px-5 py-4 backdrop-blur-md flex items-center gap-3"
              style={{
                background: `linear-gradient(135deg, ${brainCurrentColor}25 0%, rgba(15,15,20,0.95) 100%)`,
                borderColor: brainCurrentColor + "60",
                boxShadow: `0 20px 60px ${brainCurrentColor}50, 0 0 40px ${brainCurrentColor}30`,
                animation: "burst-fade 2.4s ease-out forwards",
              }}
            >
              {/* Mini pulsing brain dot */}
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full animate-ping opacity-50"
                  style={{ background: brainCurrentColor }} />
                <div className="relative w-5 h-5 rounded-full"
                  style={{
                    background: brainCurrentColor,
                    boxShadow: `0 0 16px ${brainCurrentColor}`,
                  }} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: brainCurrentColor }}>
                  Nouvelle connexion
                </p>
                <p className="text-sm font-medium text-white">
                  Jour {brainDayInCycle}/{BRAIN_CYCLE_DAYS} · Cycle {brainCurrentCycleIdx + 1}
                </p>
              </div>
              <ChevronRight size={14} className="text-white/40 shrink-0" />
            </button>
          </div>
        )}

        {/* === VALIDATION BURST (transient feedback) === */}
        {validationBurst && (
          <div className="fixed inset-0 pointer-events-none z-[90] flex items-center justify-center">
            {/* Soft halo burst */}
            <div className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${validationBurst.color}40 0%, transparent 70%)`,
                animation: "burst-fade 1.6s ease-out forwards",
              }} />
            {/* Particles */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const distance = 90 + Math.random() * 40;
              return (
                <span key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${3 + Math.random() * 3}px`,
                    height: `${3 + Math.random() * 3}px`,
                    background: validationBurst.color,
                    boxShadow: `0 0 8px ${validationBurst.color}`,
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    animation: `confetti-out 1.4s ease-out forwards`,
                    animationDelay: `${i * 0.02}s`,
                  }} />
              );
            })}
            {/* Checkmark */}
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: validationBurst.color,
                boxShadow: `0 0 40px ${validationBurst.color}, 0 0 80px ${validationBurst.color}60`,
                animation: "check-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <Check size={28} strokeWidth={3} className="text-black" />
            </div>
          </div>
        )}


        {/* === TUTORIAL OVERLAY (with spotlight on target element) === */}
        {tutorialStep !== null && TUTORIAL_STEPS[tutorialStep] && (() => {
          const step = TUTORIAL_STEPS[tutorialStep];
          const isFirst = tutorialStep === 0;
          const isLast = tutorialStep === TUTORIAL_STEPS.length - 1;
          const hasTarget = step.target && tutorialRect;
          const padding = 8; // padding around the highlighted element

          // Compute bubble position based on target
          // - if no target: center the bubble
          // - if target is in the upper half: bubble below the target
          // - if target is in the lower half: bubble above the target
          let bubbleStyle = {};
          let arrowPos = null; // 'top' or 'bottom' or null
          if (hasTarget) {
            const viewportH = window.innerHeight;
            const targetCenterY = tutorialRect.top + tutorialRect.height / 2;
            const targetIsInUpperHalf = targetCenterY < viewportH / 2;

            if (targetIsInUpperHalf) {
              // Bubble below the target
              bubbleStyle = {
                top: `${tutorialRect.top + tutorialRect.height + padding + 16}px`,
                left: "50%",
                transform: "translateX(-50%)",
              };
              arrowPos = "top";
            } else {
              // Bubble above the target
              bubbleStyle = {
                bottom: `${viewportH - tutorialRect.top + padding + 16}px`,
                left: "50%",
                transform: "translateX(-50%)",
              };
              arrowPos = "bottom";
            }
          } else {
            // Centered
            bubbleStyle = {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            };
          }

          return (
            <div className="fixed inset-0 z-[100]" style={{ pointerEvents: "auto" }}>
              {/* === SPOTLIGHT === */}
              {/* The trick: a transparent box where the target is, with a giant box-shadow filling the rest of the screen with dark overlay */}
              {hasTarget ? (
                <div
                  className="fixed pointer-events-none transition-all duration-300"
                  style={{
                    top: `${tutorialRect.top - padding}px`,
                    left: `${tutorialRect.left - padding}px`,
                    width: `${tutorialRect.width + padding * 2}px`,
                    height: `${tutorialRect.height + padding * 2}px`,
                    borderRadius: "16px",
                    boxShadow: `
                      0 0 0 9999px rgba(0, 0, 0, 0.85),
                      inset 0 0 0 2px ${dayTheme.accent},
                      0 0 30px ${dayTheme.accent}80
                    `,
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
              )}

              {/* === BUBBLE === */}
              <div
                className="fixed max-w-[340px] w-[calc(100%-32px)] rounded-3xl p-5 border z-[110]"
                style={{
                  ...bubbleStyle,
                  background: "linear-gradient(135deg, rgba(20,20,25,0.97) 0%, rgba(15,15,20,0.97) 100%)",
                  borderColor: dayTheme.accent + "50",
                  boxShadow: `0 20px 80px ${dayTheme.accent}30, 0 0 60px ${dayTheme.accent}15`,
                }}
              >
                {/* Arrow pointing at the target */}
                {arrowPos === "top" && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-t border-l"
                    style={{
                      background: "rgba(20,20,25,0.97)",
                      borderColor: dayTheme.accent + "50",
                    }}
                  />
                )}
                {arrowPos === "bottom" && (
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-b border-r"
                    style={{
                      background: "rgba(20,20,25,0.97)",
                      borderColor: dayTheme.accent + "50",
                    }}
                  />
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} style={{ color: dayTheme.accent }} />
                    <p className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: dayTheme.accent }}>
                      Tutoriel · {tutorialStep + 1}/{TUTORIAL_STEPS.length}
                    </p>
                  </div>
                  <button
                    onClick={() => setTutorialStep(null)}
                    className="text-[10px] text-white/40 hover:text-white/70 transition uppercase tracking-wider"
                  >
                    Passer
                  </button>
                </div>

                <h3 className="text-lg font-light mb-2 leading-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {step.body}
                </p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  {TUTORIAL_STEPS.map((_, i) => (
                    <span key={i}
                      className="rounded-full transition-all"
                      style={{
                        width: i === tutorialStep ? "16px" : "5px",
                        height: "5px",
                        background: i === tutorialStep ? dayTheme.accent : "rgba(255,255,255,0.2)",
                      }} />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  {!isFirst && (
                    <button
                      onClick={() => setTutorialStep(tutorialStep - 1)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs text-white/70 hover:bg-white/5 transition flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={12} /> Précédent
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (isLast) {
                        setTutorialStep(null);
                      } else {
                        setTutorialStep(tutorialStep + 1);
                      }
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium transition hover:scale-[1.02] flex items-center justify-center gap-1"
                    style={{ background: dayTheme.accent, color: "#000" }}
                  >
                    {isLast ? "C'est parti ✨" : "Suivant"}
                    {!isLast && <ChevronRight size={12} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* === END-OF-DAY SUMMARY POPUP === */}
        {showDaySummary && (() => {
          // Compute summary stats for this day
          const totalTasks = tasks.length;
          const doneTasks = tasks.filter(t => dayCompletions[t.id] === "done").length;
          const skippedTasks = tasks.filter(t => dayCompletions[t.id] === "skipped").length;
          const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

          const metrics = dayMetrics[selectedDay] || {};
          const pauseMin = metrics.pauseMin || 0;

          // Compute total work time (sum of original task durations that were completed)
          const original = metrics.originalTasks || [];
          const workMin = tasks
            .filter(t => dayCompletions[t.id] === "done")
            .reduce((sum, t) => {
              const orig = original.find(o => o.id === t.id);
              if (orig) return sum + (toMin(orig.end) - toMin(orig.start));
              return sum + (toMin(t.end) - toMin(t.start));
            }, 0);

          // Compute total delay = current task end times vs original
          let delayMin = 0;
          if (original.length > 0) {
            original.forEach(o => {
              const current = tasks.find(t => t.id === o.id);
              if (current) {
                const diff = toMin(current.end) - toMin(o.end);
                if (diff > delayMin) delayMin = diff; // total cumulative delay = max shift on any task
              }
            });
          }

          // Personalized coaching message based on performance
          let coachTitle = "";
          let coachMessage = "";
          let coachColor = dayTheme.accent;

          if (completionRate === 100 && delayMin === 0) {
            coachTitle = "Journée parfaite ! 🎯";
            coachMessage = `Vous avez tout accompli, sans aucun retard. Quelle régularité ! Continuez sur cette lancée, c'est exactement ce qui fait la différence.`;
            coachColor = "#34D399";
          } else if (completionRate >= 80) {
            coachTitle = "Excellente journée 👏";
            coachMessage = `Vous avez accompli ${doneTasks} tâches sur ${totalTasks}. C'est une journée très solide. ${delayMin > 0 ? `Le petit retard de ${delayMin} min est tout à fait normal.` : "Bravo pour la précision !"}`;
            coachColor = "#34D399";
          } else if (completionRate >= 50) {
            coachTitle = "Bonne journée 👍";
            coachMessage = `${doneTasks} tâches accomplies sur ${totalTasks}, c'est une moitié pleine. Demain, essayez peut-être de réduire le nombre de tâches ou d'allonger leur durée pour finir en beauté.`;
            coachColor = "#FBBF24";
          } else if (completionRate > 0) {
            coachTitle = "Une journée d'apprentissage";
            coachMessage = `Vous avez validé ${doneTasks} tâche${doneTasks > 1 ? "s" : ""} sur ${totalTasks}. Pas de jugement : peut-être que votre planning était trop ambitieux. Réajustez pour demain, c'est ça qui compte.`;
            coachColor = "#FB923C";
          } else {
            coachTitle = "Demain est un nouveau jour";
            coachMessage = `Aucune tâche validée aujourd'hui. C'est OK, ça arrive. L'important c'est de revenir demain avec un plan plus simple. Petits pas, grandes victoires.`;
            coachColor = "#F472B6";
          }

          return (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[80] flex items-end sm:items-center justify-center p-4">
              <div className="bg-neutral-900 border rounded-3xl p-6 w-full max-w-sm max-h-[92vh] overflow-y-auto"
                style={{ borderColor: dayTheme.accent + "50",
                  boxShadow: `0 20px 80px ${dayTheme.accent}40` }}>

                {/* Header */}
                <div className="text-center mb-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                    Bilan · {dayTheme.name}
                  </p>
                  <h3 className="text-2xl font-light mb-3">{coachTitle}</h3>

                  {/* Big circular completion gauge */}
                  <div className="relative w-36 h-36 mx-auto my-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                      <circle cx="72" cy="72" r="64" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                      <circle cx="72" cy="72" r="64" stroke={coachColor} strokeWidth="6" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 64}
                        strokeDashoffset={2 * Math.PI * 64 - (completionRate / 100) * 2 * Math.PI * 64}
                        style={{
                          filter: `drop-shadow(0 0 12px ${coachColor})`,
                          transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-4xl font-extralight font-mono tabular-nums" style={{ color: coachColor }}>
                        {completionRate}<span className="text-xl text-white/40">%</span>
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                        respecté
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coaching message */}
                <p className="text-sm text-white/70 leading-relaxed text-center px-2 mb-6 italic">
                  {coachMessage}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="rounded-xl p-3 border"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Validées</p>
                    <p className="text-lg font-light">
                      <span style={{ color: dayTheme.accent }}>{doneTasks}</span>
                      <span className="text-white/40"> / {totalTasks}</span>
                    </p>
                  </div>
                  <div className="rounded-xl p-3 border"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Travail</p>
                    <p className="text-lg font-light font-mono tabular-nums">
                      {Math.floor(workMin / 60)}h{String(workMin % 60).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="rounded-xl p-3 border"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Pause</p>
                    <p className="text-lg font-light font-mono tabular-nums">
                      {pauseMin > 0 ? `${pauseMin} min` : "Aucune"}
                    </p>
                  </div>
                  <div className="rounded-xl p-3 border"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Retard</p>
                    <p className="text-lg font-light font-mono tabular-nums"
                      style={{ color: delayMin > 30 ? "#F87171" : delayMin > 10 ? "#FBBF24" : "#FFFFFF" }}>
                      {delayMin > 0 ? `+${delayMin} min` : "0"}
                    </p>
                  </div>
                </div>

                {/* Skipped tasks indicator */}
                {skippedTasks > 0 && (
                  <p className="text-[11px] text-white/40 text-center mb-4 italic">
                    {skippedTasks} tâche{skippedTasks > 1 ? "s" : ""} passée{skippedTasks > 1 ? "s" : ""}
                  </p>
                )}

                {/* Actions */}
                <button
                  onClick={() => {
                    setShowDaySummary(false);
                    setShowStats(true);
                  }}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{ background: dayTheme.accent, color: "#000" }}
                >
                  <BarChart3 size={14} />
                  Voir mes stats de la semaine
                </button>
                <button
                  onClick={() => setShowDaySummary(false)}
                  className="w-full mt-2 py-2.5 text-xs text-white/40 hover:text-white/70 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          );
        })()}

        {/* === PAUSE CONFIRMATION POPUP === */}
        {showPauseConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[75] flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowPauseConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border rounded-3xl p-6 w-full max-w-sm"
              style={{ borderColor: dayTheme.accent + "40",
                boxShadow: `0 20px 60px ${dayTheme.accent}30` }}>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: dayTheme.accent + "15",
                    border: `1px solid ${dayTheme.accent}40` }}>
                  <Pause size={20} style={{ color: dayTheme.accent }} fill={dayTheme.accent} />
                </div>
                <h3 className="text-xl font-light mb-2">Mettre en pause ?</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Toutes les tâches restantes de la journée seront décalées du temps de votre pause.
                </p>
              </div>

              <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={skipPauseConfirm}
                  onChange={(e) => setSkipPauseConfirm(e.target.checked)}
                  className="w-4 h-4 rounded accent-white/60 cursor-pointer"
                />
                <span className="text-xs text-white/50">Ne plus me demander</span>
              </label>

              <div className="space-y-2">
                <button
                  onClick={confirmPause}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition hover:scale-[1.02]"
                  style={{ background: dayTheme.accent, color: "#000" }}
                >
                  Mettre en pause
                </button>
                <button onClick={() => setShowPauseConfirm(false)}
                  className="w-full py-2.5 text-xs text-white/40 hover:text-white/70 transition">
                  Continuer la journée
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === NO-TASKS WARNING POPUP === */}
        {showNoTasksWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[75] flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowNoTasksWarning(false)}>
            <div onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border rounded-3xl p-6 w-full max-w-sm"
              style={{ borderColor: dayTheme.accent + "40",
                boxShadow: `0 20px 60px ${dayTheme.accent}30` }}>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: dayTheme.accent + "15",
                    border: `1px solid ${dayTheme.accent}40` }}>
                  <Target size={22} style={{ color: dayTheme.accent }} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  {dayTheme.name}
                </p>
                <h3 className="text-xl font-light mb-2">Aucune tâche programmée</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Programme au moins une tâche pour démarrer la journée.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => { setShowNoTasksWarning(false); openAdd(); }}
                  className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.02] font-medium text-sm"
                  style={{ background: dayTheme.accent, color: "#000" }}>
                  <Plus size={16} strokeWidth={2.5} />
                  Programmer une tâche
                </button>
                <button onClick={() => setShowNoTasksWarning(false)}
                  className="w-full py-2.5 text-xs text-white/40 hover:text-white/70 transition">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === END-OF-TASK / EARLY-FINISH POPUP === */}
        {endTaskPopup && (() => {
          // Detect if popup was triggered manually (task is still in progress)
          const isInProgress = currentTask?.id === endTaskPopup.id;
          // Compute time saved if user finishes now
          let minutesSaved = 0;
          if (isInProgress) {
            const taskEnd = toMin(endTaskPopup.end);
            let nowMinutes;
            if (demoMode) {
              const elapsedInTask = demoElapsed % DEMO_TASK_DURATION;
              const fakeProgressRatio = elapsedInTask / DEMO_TASK_DURATION;
              const taskDur = toMin(endTaskPopup.end) - toMin(endTaskPopup.start);
              nowMinutes = toMin(endTaskPopup.start) + fakeProgressRatio * taskDur;
            } else {
              nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
            }
            minutesSaved = Math.max(0, Math.round(taskEnd - nowMinutes));
          }

          return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-end sm:items-center justify-center p-4">
              <div className="bg-neutral-900 border rounded-3xl p-6 w-full max-w-sm"
                style={{ borderColor: endTaskPopup.color + "60",
                  boxShadow: `0 20px 60px ${endTaskPopup.color}30` }}>

                {!showExtendChoice ? (
                  <>
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        style={{ background: endTaskPopup.color + "20",
                          boxShadow: `0 0 30px ${endTaskPopup.color}40` }}>
                        <CheckCircle2 size={28} style={{ color: endTaskPopup.color }} />
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                        {isInProgress ? "Tâche en cours" : "Tâche terminée"}
                      </p>
                      <h3 className="text-2xl font-light mb-2">{endTaskPopup.name}</h3>
                      <p className="text-sm text-white/60">
                        {isInProgress
                          ? "Avez-vous déjà fini votre objectif ?"
                          : "Avez-vous rempli votre objectif ?"}
                      </p>
                      {!isInProgress && (
                        <p className="text-[11px] text-white/30 italic mt-3 px-2">
                          Prenez votre temps · vos prochaines tâches sont en pause
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {/* Early finish (only when in progress with time left) */}
                      {isInProgress && minutesSaved > 0 && (
                        <button onClick={() => finishEarly(endTaskPopup)}
                          className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.02]"
                          style={{ background: endTaskPopup.color, color: "#000" }}>
                          <Check size={16} strokeWidth={2.5} />
                          <span className="text-sm font-medium">
                            J'ai déjà fini · gagner {minutesSaved} min
                          </span>
                        </button>
                      )}

                      {/* Default "done" — used when task ends naturally OR when there's no time left */}
                      {(!isInProgress || minutesSaved === 0) && (
                        <button onClick={() => markTaskDone(endTaskPopup.id)}
                          className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.02]"
                          style={{ background: endTaskPopup.color, color: "#000" }}>
                          <Check size={16} strokeWidth={2.5} />
                          <span className="text-sm font-medium">Oui, c'est fait</span>
                        </button>
                      )}

                      <button onClick={() => setShowExtendChoice(true)}
                        className="w-full py-3.5 rounded-xl border border-white/15 text-sm text-white/80 hover:bg-white/5 transition flex items-center justify-center gap-2">
                        <PlusIcon size={14} />
                        {isInProgress ? "Pas encore, ajouter du temps" : "Non, ajouter du temps"}
                      </button>
                      <button onClick={() => {
                          if (isInProgress) {
                            popupOpenedAtRef.current = null;
                            popupTriggerKindRef.current = null;
                            setEndTaskPopup(null);
                          } else {
                            markTaskSkipped(endTaskPopup.id);
                          }
                        }}
                        className="w-full py-2.5 text-xs text-white/40 hover:text-white/70 transition">
                        {isInProgress ? "Continuer normalement" : "Passer à la prochaine tâche"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} style={{ color: endTaskPopup.color }} />
                      <h3 className="text-lg font-light">Combien de temps ajouter ?</h3>
                    </div>
                    <p className="text-xs text-white/40 mb-5">
                      Les tâches suivantes seront décalées automatiquement
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[10, 15, 30, 45, 60, 90].map((min) => (
                        <button key={min} onClick={() => setExtendMinutes(min)}
                          className={`py-3 rounded-xl border transition text-sm ${
                            extendMinutes === min ? "scale-105" : "hover:bg-white/5"
                          }`}
                          style={{
                            background: extendMinutes === min ? endTaskPopup.color + "20" : "rgba(255,255,255,0.03)",
                            borderColor: extendMinutes === min ? endTaskPopup.color + "60" : "rgba(255,255,255,0.1)",
                            color: extendMinutes === min ? endTaskPopup.color : "rgba(255,255,255,0.7)",
                          }}>
                          +{min} min
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowExtendChoice(false)}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">
                        Retour
                      </button>
                      <button onClick={() => extendTask(endTaskPopup, extendMinutes)}
                        className="flex-1 py-3 rounded-xl text-sm font-medium transition hover:scale-[1.02]"
                        style={{ background: endTaskPopup.color, color: "#000" }}>
                        Ajouter +{extendMinutes} min
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
