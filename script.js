const mallaData = [
  { nombre: "Química general", requisitos: [] },
  { nombre: "Biología", requisitos: [] },
  { nombre: "Zoología", requisitos: [] },
  { nombre: "Introducción a la medicina veterinaria", requisitos: [] },
  { nombre: "Practica 1", requisitos: [] },
  { nombre: "Tecnología y innovación", requisitos: [] },

  { nombre: "Química orgánica", requisitos: ["Química general"] },
  { nombre: "Histología y embriología", requisitos: ["Biología"] },
  { nombre: "Estadísticas", requisitos: [] },
  { nombre: "Practica 2", requisitos: ["Practica 1"] },
  { nombre: "Ecología", requisitos: ["Zoología"] },
  { nombre: "Inglés", requisitos: [] },

  { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
  { nombre: "Anatomía 1", requisitos: ["Histología y embriología"] },
  { nombre: "Etología y bienestar animal", requisitos: [] },
  { nombre: "Practica 3", requisitos: ["Practica 2"] },
  { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] },

  { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Anatomía 2", requisitos: ["Anatomía 1"] },
  { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Módulo integrador ciclo inicial", requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación"] },
  { nombre: "Principios éticos veterinarios", requisitos: [] },
  { nombre: "Genética pecuaria", requisitos: [] },

  { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
  { nombre: "Practica 4", requisitos: ["Módulo integrador ciclo inicial"] },
  { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
  { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Desarrollo sostenible", requisitos: [] },

  { nombre: "Farmacología y terapéutica", requisitos: [] },
  { nombre: "Practica 5", requisitos: ["Practica 4"] },
  { nombre: "Semiología", requisitos: [] },
  { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
  { nombre: "Patología especial", requisitos: ["Patología especial"] },
  { nombre: "Inglés técnico", requisitos: [] },

  { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
  { nombre: "Practica 6", requisitos: ["Practica 5"] },
  { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patología especial"] },
  { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
  { nombre: "Metodología de la investigación", requisitos: [] },
  { nombre: "Responsabilidad social y emprendimiento", requisitos: [] },

  { nombre: "Producción animal 2", requisitos: ["Producción animal 1"] },
  { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
  { nombre: "Cirugía general", requisitos: ["Farmacología y terapéutica"] },
  { nombre: "Salud pública", requisitos: ["Epidemiología"] },
  { nombre: "Módulo integrador ciclo intermedio", requisitos: ["Practica 6", "Producción animal 1"] },
  { nombre: "Preparación para la vida laboral", requisitos: [] },

  { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
  { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
  { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
  { nombre: "Economía y administración de empresas veterinarias", requisitos: [] },
  { nombre: "Imagenología", requisitos: ["Medicina interna"] },
  { nombre: "Electivo de especialidad 1", requisitos: [] },

  { nombre: "Módulo integrador profesional", requisitos: ["Clínica de animales mayores", "Clínica de animales menores"] },
  { nombre: "Salud laboral y legislación veterinaria", requisitos: [] },
  { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
  { nombre: "Electivo de especialidad 2", requisitos: [] },
];

// Estado de cada ramo: "bloqueado", "desbloqueado" o "aprobado"
const estadoRamos = {};

// Inicialización: función para determinar si está desbloqueado
function puedeDesbloquear(ramo) {
  if (ramo.requisitos.length === 0) return true;
  return ramo.requisitos.every(req => estadoRamos[req] === "aprobado");
}

// Crea los elementos en pantalla
function renderizarMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  mallaData.forEach(ramo => {
    // Definir estado:
    let estado;
    if (!puedeDesbloquear(ramo)) {
      estado = "bloqueado";
    } else if (estadoRamos[ramo.nombre] === "aprobado") {
      estado = "aprobado";
    } else {
      estado = "desbloqueado";
    }
    estadoRamos[ramo.nombre] = estado;

    const div = document.createElement("div");
    div.className = "ramo " + estado;
    div.textContent = ramo.nombre;
    div.title = ramo.requisitos.length > 0 ? "Requisitos: " + ramo.requisitos.join(", ") : "Sin requisitos";

    // Solo se puede clicar si está desbloqueado
    if (estado === "desbloqueado") {
      div.style.cursor = "pointer";
      div.addEventListener("click", () => {
        // Al clicar, se aprueba el ramo
        estadoRamos[ramo.nombre] = "aprobado";
        // Actualizar estados porque puede desbloquear otros
        actualizarEstados();
        renderizarMalla();
      });
    } else {
      div.style.cursor = "not-allowed";
    }

    contenedor.appendChild(div);
  });
}

function actualizarEstados() {
  mallaData.forEach(ramo => {
    if (estadoRamos[ramo.nombre] !== "aprobado") {
      if (puedeDesbloquear(ramo)) {
        estadoRamos[ramo.nombre] = "desbloqueado";
      } else {
        estadoRamos[ramo.nombre] = "bloqueado";
      }
    }
  });
}

// Iniciar todo
function iniciar() {
  // Inicializar estado con desbloqueados y bloqueados
  mallaData.forEach(ramo => {
    if (puedeDesbloquear(ramo)) {
      estadoRamos[ramo.nombre] = "desbloqueado";
    } else {
      estadoRamos[ramo.nombre] = "bloqueado";
    }
  });
  renderizarMalla();
}

iniciar();
