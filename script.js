const container = document.getElementById('container');
const resetBtn = document.getElementById('resetBtn');

const coursesData = [
  { name: "Primer semestre", isTitle: true },
  { name: "Química general", prereqs: [] },
  { name: "Biologia", prereqs: [] },
  { name: "Zoológia", prereqs: [] },
  { name: "Introducción a la medicina veterinaria", prereqs: [] },
  { name: "Practica 1", prereqs: [] },
  { name: "Tecnología y innovación", prereqs: [] },

  { name: "Segundo semestre", isTitle: true },
  { name: "Química orgánica", prereqs: ["Química general"] },
  { name: "Histología y embriología", prereqs: ["Biologia"] },
  { name: "Estadísticas", prereqs: [] },
  { name: "Practica 2", prereqs: ["Practica 1"] },
  { name: "Ecología", prereqs: ["Zoológia"] },
  { name: "Ingles", prereqs: [] },

  { name: "Tercer semestre", isTitle: true },
  { name: "Fisiología veterinaria", prereqs: ["Histología y embriología"] },
  { name: "Anatómia 1", prereqs: ["Histología y embriología"] },
  { name: "Etologia y bienestar animal", prereqs: [] },
  { name: "Practica 3", prereqs: ["Practica 2"] },
  { name: "Gestión ambiental y conservación", prereqs: ["Ecología"] },

  { name: "Cuarto semestre", isTitle: true },
  { name: "Interacción hospedero patógeno", prereqs: ["Fisiología veterinaria"] },
  { name: "Anatómia 2", prereqs: ["Anatómia 1"] },
  { name: "Fisiología especial", prereqs: ["Fisiología veterinaria"] },
  { name: "Modulo integrador ciclo inicial", prereqs: ["Etologia y bienestar animal", "Gestión ambiental y conservación"] },
  { name: "Principios éticos veterinarios", prereqs: [] },
  { name: "Genética pecuaria", prereqs: [] },

  { name: "Quinto semestre", isTitle: true },
  { name: "Alimentación y nutrición animal", prereqs: ["Fisiología especial"] },
  { name: "Practica 4", prereqs: ["Modulo integrador ciclo inicial"] },
  { name: "Patologia funcional", prereqs: ["Fisiología especial"] },
  { name: "Inspección y control de alimentos", prereqs: ["Interacción hospedero patógeno"] },
  { name: "Epidemiología", prereqs: ["Interacción hospedero patógeno"] },
  { name: "Desarrollo sostenible", prereqs: [] },

  { name: "Sexto semestre", isTitle: true },
  { name: "Farmacología y terapéutica", prereqs: [] },
  { name: "Practica 5", prereqs: ["Practica 4"] },
  { name: "Semiología", prereqs: [] },
  { name: "Hematología y laboratorio clínico", prereqs: ["Fisiología especial"] },
  { name: "Patologia especial", prereqs: ["Patologia especial"] },
  { name: "Ingles técnico", prereqs: [] },

  { name: "Séptimo semestre", isTitle: true },
  { name: "Producción animal 1", prereqs: ["Alimentación y nutrición animal"] },
  { name: "Practica 6", prereqs: ["Practica 5"] },
  { name: "Enfermedades infecciosas y parasitarias", prereqs: ["Patologia especial"] },
  { name: "Ginecología y obstetricia", prereqs: ["Semiología"] },
  { name: "Metodología de la investigación", prereqs: [] },
  { name: "Responsabilidad social y emprendimiento", prereqs: [] },

  { name: "Octavo semestre", isTitle: true },
  { name: "Producción animal 2", prereqs: ["Producción animal 1"] },
  { name: "Medicina interna", prereqs: ["Enfermedades infecciosas y parasitarias"] },
  { name: "Cirugía general", prereqs: ["Farmacología y terapéutica"] },
  { name: "Salud pública", prereqs: ["Epidemiología"] },
  { name: "Modulo integrador ciclo intermedio", prereqs: ["Practica 6", "Producción animal 1"] },
  { name: "Preparación para la vida laboral", prereqs: [] },

  { name: "Noveno semestre", isTitle: true },
  { name: "Clínica de animales mayores", prereqs: ["Medicina interna"] },
  { name: "Técnicas quirúrgicas", prereqs: ["Cirugía general"] },
  { name: "Clínica de animales menores", prereqs: ["Medicina interna"] },
  { name: "Economía y administración de empresas veterinarias", prereqs: [] },
  { name: "Imagenología", prereqs: ["Medicina interna"] },
  { name: "Electivo de especialidad 1", prereqs: [] },

  { name: "Décimo semestre", isTitle: true },
  { name: "Modulo integrador profesional", prereqs: ["Clínica de animales mayores", "Clínica de animales menores"] },
  { name: "Salud laboral y legislación veterinaria", prereqs: [] },
  { name: "Evaluación de proyectos", prereqs: ["Economía y administración de empresas veterinarias"] },
  { name: "Electivo de especialidad 2", prereqs: [] }
];

const STORAGE_KEY = 'malla_academica_status';

// Carga el progreso guardado o inicia vacío
let courseStates = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Devuelve curso por nombre
function getCourse(name) {
  return coursesData.find(c => c.name === name);
}

// Chequea si todos los prereqs están completados
function prereqsMet(prereqs) {
  if (!prereqs || prereqs.length === 0) return true;
  return prereqs.every(pr => courseStates[pr] === 'completed');
}

// Actualiza estados bloqueado/desbloqueado basado en prereqs
function updateUnlocks() {
  coursesData.forEach(course => {
    if (course.isTitle) return;
    if (courseStates[course.name] === 'completed') return; // ya aprobado
    if (prereqsMet(course.prereqs)) {
      if (courseStates[course.name] !== 'unlocked') {
        courseStates[course.name] = 'unlocked';
      }
    } else {
      courseStates[course.name] = 'locked';
    }
  });
}

// Guarda progreso en localStorage
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courseStates));
}

// Crea el DOM de cada curso/semestre
function createCourseElement(course) {
  if (course.isTitle) {
    const title = document.createElement('div');
    title.classList.add('semester-title');
    title.textContent = course.name;
    return title;
  }
  
  const div = document.createElement('div');
  div.classList.add('course');
  div.textContent = course.name;

  // Estado
  const state = courseStates[course.name] || 'locked';

  div.classList.add(state);

  if(state === 'locked') {
    div.title = 'Bloqueado: Prerrequisitos no cumplidos';
  } else if(state === 'unlocked') {
    div.title = 'Pendiente: Haz clic para aprobar';
  } else if(state === 'completed') {
    div.title = 'Aprobado';
  }

  // Solo se puede clickear si desbloqueado o aprobado
  if(state !== 'locked') {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      toggleCourseState(course.name);
    });
  }

  return div;
}

// Alterna el estado del curso (pendiente → aprobado → pendiente)
function toggleCourseState(courseName) {
  if (courseStates[courseName] === 'unlocked') {
    courseStates[courseName] = 'completed
