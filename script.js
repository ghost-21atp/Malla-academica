const ramos = {
  "Primer semestre": [
    { nombre: "Química general" },
    { nombre: "Biologia" },
    { nombre: "Zoológia" },
    { nombre: "Introducción a la medicina veterinaria" },
    { nombre: "Practica 1" },
    { nombre: "Tecnología y innovación" }
  ],
  "Segundo semestre": [
    { nombre: "Química orgánica", requisitos: ["Química general"] },
    { nombre: "Histología y embriología", requisitos: ["Biologia"] },
    { nombre: "Estadísticas" },
    { nombre: "Practica 2", requisitos: ["Practica 1"] },
    { nombre: "Ecología", requisitos: ["Zoológia"] },
    { nombre: "Ingles" }
  ],
  "Tercer semestre": [
    { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
    { nombre: "Anatómia 1", requisitos: ["Histología y embriología"] },
    { nombre: "Etologia y bienestar animal" },
    { nombre: "Practica 3", requisitos: ["Practica 2"] },
    { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] }
  ],
  "Cuarto semestre": [
    { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Anatómia 2", requisitos: ["Anatómia 1"] },
    { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
    { nombre: "Modulo integrador ciclo inicial", requisitos: ["Etologia y bienestar animal", "Gestión ambiental y conservación"] },
    { nombre: "Principios éticos veterinarios" },
    { nombre: "Genética pecuaria" }
  ],
  "Quinto semestre": [
    { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
    { nombre: "Practica 4", requisitos: ["Modulo integrador ciclo inicial"] },
    { nombre: "Patologia funcional", requisitos: ["Fisiología especial"] },
    { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
    { nombre: "Desarrollo sostenible" }
  ],
  "Sexto semestre": [
    { nombre: "Farmacología y terapéutica" },
    { nombre: "Practica 5", requisitos: ["Practica 4"] },
    { nombre: "Semiología" },
    { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
    { nombre: "Patologia especial", requisitos: ["Patologia funcional"] },
    { nombre: "Ingles técnico" }
  ],
  "Séptimo semestre": [
    { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
    { nombre: "Practica 6", requisitos: ["Practica 5"] },
    { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patologia especial"] },
    { nombre: "Ginecología y obstetricia", requisitos: ["Semiología"] },
    { nombre: "Metodología de la investigación" },
    { nombre: "Responsabilidad social y emprendimiento" }
  ],
  "Octavo semestre": [
    { nombre: "Producción animal 2", requisitos: ["Producción animal 1"] },
    { nombre: "Medicina interna", requisitos: ["Enfermedades infecciosas y parasitarias"] },
    { nombre: "Cirugía general", requisitos: ["Farmacología y terapéutica"] },
    { nombre: "Salud pública", requisitos: ["Epidemiología"] },
    { nombre: "Modulo integrador ciclo intermedio", requisitos: ["Practica 6", "Producción animal 1"] },
    { nombre: "Preparación para la vida laboral" }
  ],
  "Noveno semestre": [
    { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
    { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
    { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
    { nombre: "Economía y administración de empresas veterinarias" },
    { nombre: "Imagenología", requisitos: ["Medicina interna"] },
    { nombre: "Electivo de especialidad 1" }
  ],
  "Décimo semestre": [
    { nombre: "Modulo integrador profesional", requisitos: ["Clínica de animales mayores", "Clínica de animales menores"] },
    { nombre: "Salud laboral y legislación veterinaria" },
    { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
    { nombre: "Electivo de especialidad 2" }
  ]
};

const estado = JSON.parse(localStorage.getItem("estadoMalla")) || {};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  Object.entries(ramos).forEach(([semestre, cursos]) => {
    const columna = document.createElement("div");
    columna.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    columna.appendChild(titulo);

    cursos.forEach((curso) => {
      const div = document.createElement("div");
      div.className = "curso";
      div.textContent = curso.nombre;

      const aprobado = estado[curso.nombre];
      const requisitos = curso.requisitos || [];

      const desbloqueado = requisitos.every(req => estado[req]);
      if (aprobado) div.classList.add("aprobado");
      else if (!desbloqueado) div.classList.add("bloqueado");

      div.onclick = () => {
        if (!desbloqueado && !aprobado) return;

        estado[curso.nombre] = !estado[curso.nombre];
        guardarEstado();
        crearMalla();
      };

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

function guardarEstado() {
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
}

function resetMalla() {
  localStorage.removeItem("estadoMalla");
  location.reload();
}

function filtrarRamos(filtro) {
  const todos = document.querySelectorAll(".curso");
  todos.forEach(curso => {
    curso.classList.remove("hidden");
    if (filtro === "aprobado" && !curso.classList.contains("aprobado")) {
      curso.classList.add("hidden");
    } else if (filtro === "bloqueado" && !curso.classList.contains("bloqueado")) {
      curso.classList.add("hidden");
    } else if (filtro === "pendiente" &&
               !curso.classList.contains("bloqueado") &&
               !curso.classList.contains("aprobado")) {
      curso.classList.add("hidden");
    }
  });
}

crearMalla();
