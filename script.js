const semestres = [
  [
    { nombre: "Química general", requisitos: [] },
    { nombre: "Biología", requisitos: [] },
    { nombre: "Zoología", requisitos: [] },
    { nombre: "Introducción a la medicina veterinaria", requisitos: [] },
    { nombre: "Practica 1", requisitos: [] },
    { nombre: "Tecnología y innovación", requisitos: [] },
  ],
  [
    { nombre: "Química orgánica", requisitos: ["Química general"] },
    { nombre: "Histología y embriología", requisitos: ["Biología"] },
    { nombre: "Estadísticas", requisitos: [] },
    { nombre: "Practica 2", requisitos: ["Practica 1"] },
    { nombre: "Ecología", requisitos: ["Zoología"] },
    { nombre: "Inglés", requisitos: [] },
  ],
  [
    { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
    { nombre: "Anatomía 1", requisitos: ["Histología y embriología"] },
    { nombre: "Etología y bienestar animal", requisitos: [] },
    { nombre: "Practica 3", requisitos: ["Practica 2"] },
    { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] },
  ],
  [
    { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Anatomía 2", requisitos: ["Anatomía 1"] },
    { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Módulo integrador ciclo inicial", requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación"] },
    { nombre: "Principios éticos veterinarios", requisitos: [] },
    { nombre: "Genética pecuaria", requisitos: [] },
  ],
  [
    { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
    { nombre: "Practica 4", requisitos: ["Módulo integrador ciclo inicial"] },
    { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
    { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Desarrollo sostenible", requisitos: [] },
  ],
  [
    { nombre: "Farmacología y terapéutica", requisitos: [] },
    { nombre: "Practica 5", requisitos: ["Practica 4"] },
    { nombre: "Semiología", requisitos: [] },
    { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
    { nombre: "Patología especial", requisitos: ["Patología funcional"] },
    { nombre: "Inglés técnico", requisitos: [] },
  ],
  [
    { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
    { nombre: "Practica 6", requisitos: ["Practica 5"] },
    { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patología especial"] },
    { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
    { nombre: "Metodología de la investigación", requisitos: [] },
    { nombre: "Responsabilidad social y emprendimiento", requisitos: [] },
  ],
  [
    { nombre: "Producción animal 2", requisitos: ["Producción animal 1"] },
    { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
    { nombre: "Cirugía general", requisitos: ["Farmacología y terapéutica"] },
    { nombre: "Salud pública", requisitos: ["Epidemiología"] },
    { nombre: "Módulo integrador ciclo intermedio", requisitos: ["Practica 6", "Producción animal 1"] },
    { nombre: "Preparación para la vida laboral", requisitos: [] },
  ],
  [
    { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
    { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
    { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
    { nombre: "Economía y administración de empresas veterinarias", requisitos: [] },
    { nombre: "Imagenología", requisitos: ["Medicina interna"] },
    { nombre: "Electivo de especialidad 1", requisitos: [] },
  ],
  [
    { nombre: "Módulo integrador profesional", requisitos: ["Clínica de animales mayores", "Medicina interna"] },
    { nombre: "Salud laboral y legislación veterinaria", requisitos: [] },
    { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
    { nombre: "Electivo de especialidad 2", requisitos: [] },
  ],
];

// Clave para localStorage
const STORAGE_KEY = "malla-academica-estados";
let estados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Mapa nombre a ramo para rápido acceso
const nombreMap = {};
semestres.forEach((sem, i) =>
  sem.forEach((ramo, j) => {
    nombreMap[ramo.nombre.toLowerCase()] = { semestre: i, indice: j };
  })
);

// Comprueba si ramo está aprobado
function estaAprobado(nombre) {
  return estados[nombre.toLowerCase()] === "aprobado";
}

// Comprueba si ramo está desbloqueado (todos requisitos aprobados)
function estaDesbloqueado(nombre) {
  if (estaAprobado(nombre)) return true;
  const ramo = getRamo(nombre);
  if (!ramo) return false;
  return ramo.requisitos.every(estaAprobado);
}

function getRamo(nombre) {
  const key = nombre.toLowerCase();
  const pos = nombreMap[key];
  if (!pos) return null;
  return semestres[pos.semestre][pos.indice];
}

// Obtener estado actual para mostrar color
function obtenerEstado(nombre) {
  if (estaAprobado(nombre)) return "aprobado";
  if (estaDesbloqueado(nombre)) return "desbloqueado";
  return "bloqueado";
}

// Guardar estados en localStorage
function guardarEstados() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estados));
}

// Crear el DOM de la malla
function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  semestres.forEach((semestre, i)
