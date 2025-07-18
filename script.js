// Ramos organizados por semestre (arrays)
const semestres = [
  [
    { nombre: "Química general", requisitos: [] },
    { nombre: "Biología", requisitos: [] },
    { nombre: "Zoología", requisitos: [] },
    { nombre: "Introducción a la medicina veterinaria", requisitos: [] },
    { nombre: "Practica 1", requisitos: [] },
    { nombre: "Tecnología y innovación", requisitos: [] }
  ],
  [
    { nombre: "Química orgánica", requisitos: ["Química general"] },
    { nombre: "Histología y embriología", requisitos: ["Biología"] },
    { nombre: "Estadísticas", requisitos: [] },
    { nombre: "Practica 2", requisitos: ["Practica 1"] },
    { nombre: "Ecología", requisitos: ["Zoología"] },
    { nombre: "Inglés", requisitos: [] }
  ],
  [
    { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
    { nombre: "Anatomía 1", requisitos: ["Histología y embriología"] },
    { nombre: "Etología y bienestar animal", requisitos: [] },
    { nombre: "Practica 3", requisitos: ["Practica 2"] },
    { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] }
  ],
  [
    { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Anatomía 2", requisitos: ["Anatomía 1"] },
    { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Módulo integrador ciclo inicial", requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación"] },
    { nombre: "Principios éticos veterinarios", requisitos: [] },
    { nombre: "Genética pecuaria", requisitos: [] }
  ],
  [
    { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
    { nombre: "Practica 4", requisitos: ["Módulo integrador ciclo inicial"] },
    { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
    { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Desarrollo sostenible", requisitos: [] }
  ],
  [
    { nombre: "Farmacología y terapéutica", requisitos: [] },
    { nombre: "Practica 5", requisitos: ["Practica 4"] },
    { nombre: "Semiología", requisitos: [] },
    { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
    { nombre: "Patología especial", requisitos: ["Patología especial"] },
    { nombre: "Inglés técnico", requisitos: [] }
  ],
  [
    { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
    { nombre: "Practica 6", requisitos: ["Practica 5"] },
    { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patología especial"] },
    { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
    { nombre: "Metodología de la investigación", requisitos: [] },
    { nombre: "Responsabilidad social y emprendimiento", requisitos: [] }
  ],
  [
    { nombre: "Producción animal 2", requisitos: ["Producción animal 1"] },
    { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
    { nombre: "Cirugía general", requisitos: ["Farmacología y terapéutica"] },
    { nombre: "Salud pública", requisitos: ["Epidemiología"] },
    { nombre: "Módulo integrador ciclo intermedio", requisitos: ["Practica 6", "Producción animal 1"] },
    { nombre: "Preparación para la vida laboral", requisitos: [] }
  ],
  [
    { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
    { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
    { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
    { nombre: "Economía y administración de empresas veterinarias", requisitos: [] },
    { nombre: "Imagenología", requisitos: ["Medicina interna"] },
    { nombre: "Electivo de especialidad 1", requisitos: [] }
  ],
  [
    { nombre: "Módulo integrador profesional", requisitos: ["Clínica de animales mayores", "Clínica de animales menores"] },
    { nombre: "Salud laboral y legislación veterinaria", requisitos: [] },
    { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
    { nombre: "Electivo de especialidad 2", requisitos: [] }
  ]
];

// Estado global
const estadoRamos = {};

// Verifica si todos los requisitos de un ramo están aprobados
function puedeDesbloquear(ramo) {
  if (ramo.requisitos.length === 0) return true;
  return ramo.requisitos.every(req => estadoRamos[req] === "aprobado");
}

// Actualiza estados para desbloquear/bloquear según requisitos y aprobaciones
function actualizarEstados() {
  for (const semestre of semestres) {
    for (const ramo of semestre) {
      if (estadoRamos[ramo.nombre] !== "aprobado") {
        estadoRamos[ramo.nombre] = puedeDesbloquear(ramo) ? "desbloqueado" : "bloqueado";
      }
    }
  }
}

// Renderiza la malla con columnas (cada semestre)
function renderizarMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  semestres.forEach((semestre, i) => {
    const columna = document.createElement("div");
    columna.className = "semestre-col";

    const titulo = document.createElement("div");
    titulo.className = "semestre-title";
    titulo.textContent = `Semestre ${i + 1}`;
    columna.appendChild(titulo);

    semestre.forEach(ramo => {
      const div = document.createElement("div");

      // Estado actual o calculado
      const estado = estadoRamos[ramo.nombre] || (puedeDesbloquear(ramo) ? "desbloqueado" : "bloqueado");
      estadoRamos[ramo.nombre] = estado;

      div.className = `ramo ${estado}`;
      div.textContent = ramo.nombre;
      div.title = ramo.requisitos.length > 0 ? `Requisitos: ${ramo.requisitos.join(", ")}` : "Sin requisitos";

      if (estado !== "bloqueado") {
        div.style.cursor = "pointer";
        div.addEventListener("click", () => {
          // Toggle aprobado / desbloqueado
          estadoRamos[ramo.nombre] = (estadoRamos[ramo.nombre] === "aprobado") ? "desbloqueado" : "aprobado";
          actualizarEstados();
          renderizarMalla();
        });
      } else {
        div.style.cursor = "not-allowed";
      }

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

// Inicialización
function iniciar() {
  // Setear todos los ramos inicialmente desbloqueados o bloqueados según requisitos
  for (const semestre of semestres) {
    for (const ramo of semestre) {
      estadoRamos[ramo.nombre] = puedeDesbloquear(ramo) ? "desbloqueado" : "bloqueado";
    }
  }
  renderizarMalla();
}

iniciar();
