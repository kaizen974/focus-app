import { useState, useEffect, useRef } from "react";
import {
  Plus, Play, Pause, Trash2, Volume2, VolumeX, Zap, Maximize2, X,
  Pencil, ChevronDown, StickyNote, Mail, MapPin, Calendar, LogOut, Sparkles,
  ChevronLeft, Camera, BarChart3, Wind, CloudRain, Coffee, Trees, Music,
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

export default function FocusApp() {
  const [user, setUser] = useState(null);
  const [signupForm, setSignupForm] = useState({ firstName: "", lastName: "", birthDate: "", email: "" });

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

  // Start the day directly (no more visualization)
  const startDay = () => {
    setNow(new Date());
    setIsRunning(true);
    if (demoMode) setDemoElapsed(0);
    notifiedRef.current.clear();
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
    currentTask = sortedTasks.find((t) => nowMin >= toMin(t.start) && nowMin < toMin(t.end));
    if (currentTask) {
      const start = toMin(currentTask.start);
      const end = toMin(currentTask.end);
      progress = ((nowMin - start) / (end - start)) * 100;
      remainingSec = Math.max(0, Math.floor((end - nowMin) * 60));
    }
    const currentIdx = currentTask ? sortedTasks.indexOf(currentTask) : -1;
    nextTask = currentIdx >= 0 ? sortedTasks[currentIdx + 1] : sortedTasks.find(t => toMin(t.start) > nowMin);
  }

  const getTaskProgress = (task) => {
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
      trialStart: Date.now(),       // when the trial started
      isSubscribed: false,           // not paying yet
    });
  };

  const openAdd = () => {
    setEditingTask(null);
    setTaskForm({ name: "", start: "", end: "", notes: "", meditationId: null, category: null, subcategory: null });
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

  const togglePlay = () => {
    if (!isRunning && demoMode) setDemoElapsed(0);
    setIsRunning(!isRunning);
    notifiedRef.current.clear();
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
  };

  const markTaskSkipped = (taskId) => {
    setCompletions({
      ...completions,
      [selectedDay]: { ...dayCompletions, [taskId]: "skipped" },
    });
    shiftUpcomingByResponseDelay(taskId);
    setEndTaskPopup(null);
    setShowExtendChoice(false);
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
      // In demo, "now" inside the task is fractional: idx * 30 + elapsed
      const elapsedInTask = demoElapsed % DEMO_TASK_DURATION;
      const fakeProgressRatio = elapsedInTask / DEMO_TASK_DURATION;
      const taskDur = toMin(sorted[idx].end) - toMin(sorted[idx].start);
      nowMinutes = toMin(sorted[idx].start) + fakeProgressRatio * taskDur;
    } else {
      nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    }

    const taskEnd = toMin(sorted[idx].end);
    const minutesSaved = Math.max(0, Math.round(taskEnd - nowMinutes));
    if (minutesSaved <= 0) {
      // Nothing to save, just mark as done
      markTaskDone(task.id);
      return;
    }

    const updated = sorted.map((t, i) => {
      if (i < idx) return t;
      if (i === idx) return { ...t, end: fromMin(Math.max(toMin(t.start) + 1, toMin(t.end) - minutesSaved)) };
      return { ...t, start: fromMin(toMin(t.start) - minutesSaved), end: fromMin(toMin(t.end) - minutesSaved) };
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
            className="w-full mb-6 px-4 py-2.5 rounded-2xl border flex items-center justify-between gap-3 transition hover:bg-white/[0.04]"
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

        {/* WEEK SELECTOR */}
        <div className="mb-6 -mx-6 px-6">
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
        {isRunning && (() => {
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
          <div className="flex flex-col items-center mb-12">
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

            {/* Pause + plein écran buttons row */}
            <div className="flex items-center gap-3 mt-8">
              <button onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/15 active:scale-95 transition">
                <Pause size={18} fill="white" />
              </button>
              <button onClick={() => setFocusMode(true)}
                className="px-5 py-3 rounded-full border backdrop-blur flex items-center gap-2 transition hover:bg-white/5"
                style={{ borderColor: dayTheme.accent + "40", background: dayTheme.accent + "10" }}>
                <Maximize2 size={13} style={{ color: dayTheme.accent }} />
                <span className="text-xs font-medium" style={{ color: dayTheme.accent }}>Plein écran</span>
              </button>
            </div>
          </div>
          );
        })()}

        {/* TIMELINE */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/40">Timeline · {dayTheme.name}</h3>
          <button onClick={openAdd}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition">
            <Plus size={14} /> Ajouter
          </button>
        </div>

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
                    style={{ width: `${taskProg}%`,
                      background: `linear-gradient(90deg, ${task.color}55 0%, ${task.color}40 70%, ${task.color}10 100%)`,
                      transition: "width 1s linear" }} />
                  {taskProg > 0 && taskProg < 100 && (
                    <div className="absolute inset-y-0 pointer-events-none"
                      style={{ left: `calc(${taskProg}% - 24px)`, width: "48px", transition: "left 1s linear" }}>
                      <div className="absolute inset-y-0 right-6 w-px"
                        style={{ background: task.color, boxShadow: `0 0 14px ${task.color}, 0 0 28px ${task.color}80`,
                          animation: "shimmer-edge 1.4s ease-in-out infinite" }} />
                      {[...Array(8)].map((_, i) => (
                        <span key={i} className="absolute rounded-full"
                          style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: task.color,
                            right: `${4 + (i * 5)}px`, top: `${15 + ((i * 13) % 50)}%`, opacity: 0,
                            animation: `float-up ${1.4 + (i * 0.18)}s ease-out infinite`,
                            animationDelay: `${i * 0.15}s`, boxShadow: `0 0 6px ${task.color}` }} />
                      ))}
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

        {/* ===== START DAY BUTTON (always visible when not running) ===== */}
        {!isRunning && (
          <div className="mt-10 mb-4 flex flex-col items-center">
            <button
              onClick={() => {
                if (sortedTasks.length === 0) {
                  setShowNoTasksWarning(true);
                } else {
                  startDay();
                }
              }}
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
                onClick={() => setVoiceOn(!voiceOn)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
              >
                {voiceOn ? <Volume2 size={15} className="text-white/60" /> : <VolumeX size={15} className="text-white/60" />}
                <span className="text-sm flex-1">Voix de notification</span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                  {voiceOn ? "ON" : "OFF"}
                </span>
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
