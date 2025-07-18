// Datos: semestres y ramos con requisitos
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
  // Puedes agregar más semestres/ramos aquí si quieres probar más
];

// Clave para guardar en localStorage
const STORAGE_KEY = "malla-academica-estados";

// Estados: 'bloqueado', 'desbloqueado', 'aprobado'
// Cargar estados guardados o iniciar vacíos
let estados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Mapa rápido: nombre ramo (minus) -> objeto {semestre, indice}
const mapaRamos = {};
semestres.forEach((sem, i) =>
  sem.forEach((ramo, j) => {
    mapaRamos[ramo.nombre.toLowerCase()] = { semestre: i, indice: j };
  })
);

// Función para saber si ramo está aprobado
function estaAprobado(nombre) {
  return estados[nombre.toLowerCase()] === "aprobado";
}

// Función para obtener ramo por nombre
function getRamo(nombre) {
  const key = nombre.toLowerCase();
  const pos = mapaRamos[key];
  if (!pos) return null;
  return semestres[pos.semestre][pos.indice];
}

// Función para saber si ramo está desbloqueado
function estaDesbloqueado(nombre) {
  if (estaAprobado(nombre)) return true; // aprobado implica desbloqueado
  const ramo = getRamo(nombre);
  if (!ramo) return false;
  // Desbloqueado si todos requisitos aprobados
  return ramo.requisitos.every(estaAprobado);
}

// Obtener estado de ramo para mostrar
function obtenerEstado(nombre) {
  if (estaAprobado(nombre)) return "aprobado";
  if (estaDesbloqueado(nombre)) return "desbloqueado";
  return "bloqueado";
}

// Guardar estados en localStorage
function guardarEstados() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estados));
}

// Crear la malla en el DOM
function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  semestres.forEach((semestre, i) => {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${i + 1}`;
    divSem.appendChild(titulo);

    semestre.forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";

      // Estado actual
      const estado = obtenerEstado(ramo.nombre);
      divRamo.classList.add(estado);
      divRamo.textContent = ramo.nombre;

      // Click solo si no bloqueado
      if (estado !== "bloqueado") {
        divRamo.addEventListener("click", () => {
          // Cambiar estado aprobado <-> desbloqueado
          const key = ramo.nombre.toLowerCase();
          if (estados[key] === "aprobado") {
            estados[key] = "desbloqueado";
          } else {
            estados[key] = "aprobado";
          }
          guardarEstados();
          crearMalla(); // refresca visual
        });
      }
      divSem.appendChild(divRamo);
    });

    contenedor.appendChild(divSem);
  });
}

// Botón reiniciar progreso
document.getElementById("btn-reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar el progreso?")) {
    estados = {};
    guardarEstados();
    crearMalla();
  }
});

// Al cargar página, crear malla
window.onload = () => {
  crearMalla();
};
