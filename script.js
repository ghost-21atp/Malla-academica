// Datos de la malla: arreglo de semestres con ramos y requisitos
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

// Estados: { "nombre del ramo": "bloqueado"|"desbloqueado"|"aprobado" }
let estados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Crear mapa para buscar rápido ramo por nombre
const nombreMap = {};
semestres.forEach((sem, i) =>
  sem.forEach((ramo, j) => {
    nombreMap[ramo.nombre.toLowerCase()] = { semestre: i, indice: j };
  })
);

function getRamoPorNombre(nombre) {
  const key = nombre.toLowerCase();
  const pos = nombreMap[key];
  if (!pos) return null;
  return semestres[pos.semestre][pos.indice];
}

function estaAprobado(nombre) {
  return estados[nombre.toLowerCase()] === "aprobado";
}

function estaDesbloqueado(nombre) {
  if (estaAprobado(nombre)) return true;
  const ramo = getRamoPorNombre(nombre);
  if (!ramo) return false;
  return ramo.requisitos.every(estaAprobado);
}

function obtenerEstado(nombre) {
  if (estaAprobado(nombre)) return "aprobado";
  if (estaDesbloqueado(nombre)) return "desbloqueado";
  return "bloqueado";
}

function guardarEstados() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estados));
}

// Función para sufijos ordinales en títulos
function sufijoOrdinal(n) {
  if (n === 1) return "er";
  if (n === 2) return "do";
  if (n === 3) return "er";
  if (n === 4) return "to";
  return "°";
}

function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  semestres.forEach((semestre, i) => {
    const semDiv = document.createElement("div");
    semDiv.classList.add("semestre");

    // Título semestre
    const titulo = document.createElement("h2");
    titulo.textContent = `${i + 1}${sufijoOrdinal(i + 1)} Semestre`;
    semDiv.appendChild(titulo);

    semestre.forEach((ramo) => {
      const div = document.createElement("div");
      div.classList.add("ramo");

      const
