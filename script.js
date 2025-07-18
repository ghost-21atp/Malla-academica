// Datos: semestres con ramos y requisitos corregidos
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

// Estados posibles
// "bloqueado" = rojo claro
// "desbloqueado" = verde claro
// "aprobado" = verde oscuro

// Claves para guardar en localStorage
const STORAGE_KEY = "malla-academica-estados";

// Recuperar estados guardados o inicializar vacío
let estados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Crear referencia rápida de nombre a objeto {semestre, indice}
const nombreMap = {};
semestres.forEach((sem, i) =>
  sem.forEach((ramo, j) => {
    nombreMap[ramo.nombre.toLowerCase()] = { semestre: i, indice: j };
  })
);

// Función para verificar si un ramo está aprobado
function estaAprobado(nombre) {
  const key = nombre.toLowerCase();
  return estados[key] === "aprobado";
}

// Función para verificar si un ramo está desbloqueado (todos requisitos aprobados)
function estaDesbloqueado(nombre) {
  const ramo = getRamoPorNombre(nombre);
  if (!ramo) return false; // no encontrado
  // Si ya aprobado, está desbloqueado
  if (estaAprobado(nombre)) return true;

  // Verificar requisitos
  return ramo.requisitos.every((req) => estaAprobado(req));
}

// Obtener ramo por nombre (case insensitive)
function getRamoPorNombre(nombre) {
  for (let semestre of semestres) {
    for (let ramo of semestre) {
      if (
