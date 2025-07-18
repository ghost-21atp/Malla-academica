const cursos = [
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
  { nombre: "Modulo integrador ciclo inicial", requisitos: ["Etología y bienestar animal", "Gestión ambiental y conservación"] },
  { nombre: "Principios éticos veterinarios", requisitos: [] },
  { nombre: "Genética pecuaria", requisitos: [] },
  { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
  { nombre: "Practica 4", requisitos: ["Modulo integrador ciclo inicial"] },
  { nombre: "Patología funcional", requisitos: ["Fisiología especial"] },
  { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Desarrollo sostenible", requisitos: [] },
  { nombre: "Farmacología y terapéutica", requisitos: [] },
  { nombre: "Practica 5", requisitos: ["Practica 4"] },
  { nombre: "Semiología", requisitos: [] },
  { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
  { nombre: "Patología especial", requisitos: ["Patología funcional"] },
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
  { nombre: "Modulo integrador ciclo intermedio", requisitos: ["Practica 6", "Producción animal 1"] },
  { nombre: "Preparación para la vida laboral", requisitos: [] },
  { nombre: "Clínica de animales mayores", requisitos: ["Medicina interna"] },
  { nombre: "Técnicas quirúrgicas", requisitos: ["Cirugía general"] },
  { nombre: "Clínica de animales menores", requisitos: ["Medicina interna"] },
  { nombre: "Economía y administración de empresas veterinarias", requisitos: [] },
  { nombre: "Imagenología", requisitos: ["Medicina interna"] },
  { nombre: "Electivo de especialidad 1", requisitos: [] },
  { nombre: "Modulo integrador profesional", requisitos: ["Clínica de animales mayores", "Clínica de animales menores"] },
  { nombre: "Salud laboral y legislación veterinaria", requisitos: [] },
  { nombre: "Evaluación de proyectos", requisitos: ["Economía y administración de empresas veterinarias"] },
  { nombre: "Electivo de especialidad 2", requisitos: [] }
];

const malla = document.getElementById("malla");

function crearCursos() {
  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso bloqueado";
    div.innerText = curso.nombre;
    div.dataset.nombre = curso.nombre;
    malla.appendChild(div);
  });
}

function actualizarEstado() {
  document.querySelectorAll(".curso").forEach(div => {
    const nombre = div.dataset.nombre;
    const curso = cursos.find(c => c.nombre === nombre);
    const requisitos = curso.requisitos;

    const aprobados = Array.from(document.querySelectorAll(".curso.aprobado")).map(d => d.dataset.nombre);

    const cumple = requisitos.every(req => aprobados.includes(req));

    if (cumple && !div.classList.contains("aprobado")) {
      div.classList.remove("bloqueado");
    } else if (!cumple && !div.classList.contains("aprobado")) {
      div.classList.add("bloqueado");
    }
  });
}

malla.addEventListener("click", e => {
  if (e.target.classList.contains("curso") && !e.target.classList.contains("bloqueado")) {
    e.target.classList.toggle("aprobado");
    actualizarEstado();
  }
});

crearCursos();
actualizarEstado();
