const data = [
  {
    semestre: "1° Semestre",
    ramos: [
      { nombre: "Química general" },
      { nombre: "Biología" },
      { nombre: "Zoología" },
      { nombre: "Introducción a la medicina veterinaria" },
      { nombre: "Práctica 1" },
      { nombre: "Tecnología e innovación" }
    ]
  },
  {
    semestre: "2° Semestre",
    ramos: [
      { nombre: "Química orgánica", requisitos: ["Química general"] },
      { nombre: "Histología y embriología", requisitos: ["Biología"] },
      { nombre: "Estadísticas" },
      { nombre: "Práctica 2", requisitos: ["Práctica 1"] },
      { nombre: "Ecología", requisitos: ["Zoología"] },
      { nombre: "Inglés" }
    ]
  },
  {
    semestre: "3° Semestre",
    ramos: [
      { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
      { nombre: "Anatomía 1", requisitos: ["Histología y embriología"] },
      { nombre: "Etología y bienestar animal" },
      { nombre: "Práctica 3", requisitos: ["Práctica 2"] },
      { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] }
    ]
  },
  {
    semestre: "4° Semestre",
    ramos: [
      { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
      { nombre: "Anatomía 2", requisitos: ["Anatomía 1"] },
      { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
      {
        nombre: "Módulo integrador ciclo inicial",
        requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación"]
      },
      { nombre: "Principios éticos veterinarios" },
      { nombre: "Genética pecuaria" }
    ]
  },
  {
    semestre: "5° Semestre",
    ramos: [
      { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
      { nombre: "Práctica 4", requisitos: ["Módulo integrador ciclo inicial"] },
      { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
      { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
      { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
      { nombre: "Desarrollo sostenible" }
    ]
  },
  {
    semestre: "6° Semestre",
    ramos: [
      { nombre: "Farmacología y terapéutica" },
      { nombre: "Práctica 5", requisitos: ["Práctica 4"] },
      { nombre: "Semiología" },
      { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
      { nombre: "Patología especial", requisitos: ["Patología funcional"] },
      { nombre: "Inglés técnico" }
    ]
  },
  {
    semestre: "7° Semestre",
    ramos: [
      { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
      { nombre: "Práctica 6", requisitos: ["Práctica 5"] },
      { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patología especial"] },
      { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
      { nombre: "Metodología de la investigación" },
      { nombre: "Responsabilidad social y emprendimiento" }
    ]
  },
  {
    semestre: "8° Semestre",
    ramos: [
      { nombre: "Producción animal 2", requisitos: ["Producción animal 1"] },
      { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
      { nombre: "Cirugía general", requisitos: ["Farmacología y terapéutica"] },
      { nombre: "Salud pública", requisitos: ["Epidemiología"] },
      {
        nombre: "Módulo integrador ciclo intermedio",
        requisitos: ["Práctica 6", "Producción animal 1"]
      },
      { nombre: "Preparación para la vida laboral" }
    ]
  },
  {
    semestre: "9° Semestre",
    ramos: [
      { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
      { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
      { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
      { nombre: "Economía y administración de empresas veterinarias" },
      { nombre: "Imagenología", requisitos: ["Medicina interna"] },
      { nombre: "Electivo de especialidad 1" }
    ]
  },
  {
    semestre: "10° Semestre",
    ramos: [
      {
        nombre: "Módulo integrador profesional",
        requisitos: ["Clínica de animales mayores", "Clínica de animales menores"]
      },
      { nombre: "Salud laboral y legislación veterinaria" },
      {
        nombre: "Evaluación de proyectos",
        requisitos: ["Economía y administración de empresas veterinarias"]
      },
      { nombre: "Electivo de especialidad 2" }
    ]
  }
];

const mallaContainer = document.getElementById("malla");

function isApproved(name) {
  return localStorage.getItem(`aprobado_${name}`) === "true";
}

function toggleAprobado(el, subject) {
  const aprobado = el.classList.toggle("completed");
  localStorage.setItem(`aprobado_${subject.nombre}`, aprobado ? "true" : "false");
  updateStates();
}

function createSubject(subject) {
  const el = document.createElement("div");
  el.className = "subject";
  el.textContent = subject.nombre;

  if (subject.requisitos && !subject.requisitos.every(isApproved)) {
    el.classList.add("blocked");
  } else if (isApproved(subject.nombre)) {
    el.classList.add("completed");
  }

  el.addEventListener("click", () => {
    if (el.classList.contains("blocked")) return;
    toggleAprobado(el, subject);
  });

  subject.element = el;
  return el;
}

function updateStates() {
  data.forEach(semestre => {
    semestre.ramos.forEach(subject => {
      const el = subject.element;
      const aprobado = isApproved(subject.nombre);
      const requisitosCumplidos = !subject.requisitos || subject.requisitos.every(isApproved);

      el.classList.remove("blocked", "completed");

      if (aprobado) {
        el.classList.add("completed");
      } else if (!requisitosCumplidos) {
        el.classList.add("blocked");
      }
    });
  });
}

function buildGrid() {
  data.forEach(semestre => {
    const col = document.createElement("div");
    col.className = "column";
    semestre.ramos.forEach(subject => {
      const el = createSubject(subject);
      col.appendChild(el);
    });
    mallaContainer.appendChild(col);
  });
  updateStates();
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  updateStates();
});

buildGrid();
