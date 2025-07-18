const cursos = [
  { nombre: "Química general", requisitos: [] },
  { nombre: "Biologia", requisitos: [] },
  { nombre: "Zoológia", requisitos: [] },
  { nombre: "Introducción a la medicina veterinaria", requisitos: [] },
  { nombre: "Practica 1", requisitos: [] },
  { nombre: "Tecnología y innovación", requisitos: [] },
  { nombre: "Química orgánica", requisitos: ["Química general"] },
  { nombre: "Histología y embriología", requisitos: ["Biologia"] },
  { nombre: "Estadísticas", requisitos: [] },
  { nombre: "Practica 2", requisitos: ["Practica 1"] },
  { nombre: "Ecología", requisitos: ["Zoológia"] },
  { nombre: "Ingles", requisitos: [] },
  { nombre: "Fisiología veterinaria", requisitos: ["Histología y embriología"] },
  { nombre: "Anatómia 1", requisitos: ["Histología y embriología"] },
  { nombre: "Etologia y bienestar animal", requisitos: [] },
  { nombre: "Practica 3", requisitos: ["Practica 2"] },
  { nombre: "Gestión ambiental y conservación", requisitos: ["Ecología"] },
  { nombre: "Interacción hospedero patógeno", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Anatómia 2", requisitos: ["Anatómia 1"] },
  { nombre: "Fisiología especial", requisitos: ["Fisiología veterinaria"] },
  { nombre: "Modulo integrador ciclo inicial", requisitos: ["Etologia y bienestar animal", "Gestión ambiental y conservación"] },
  { nombre: "Principios éticos veterinarios", requisitos: [] },
  { nombre: "Genética pecuaria", requisitos: [] },
  { nombre: "Alimentación y nutrición animal", requisitos: ["Fisiología especial"] },
  { nombre: "Practica 4", requisitos: ["Modulo integrador ciclo inicial"] },
  { nombre: "Patologia funcional", requisitos: ["Fisiología especial"] },
  { nombre: "Inspección y control de alimentos", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Epidemiología", requisitos: ["Interacción hospedero patógeno"] },
  { nombre: "Desarrollo sostenible", requisitos: [] },
  { nombre: "Farmacología y terapéutica", requisitos: [] },
  { nombre: "Practica 5", requisitos: ["Practica 4"] },
  { nombre: "Semiología", requisitos: [] },
  { nombre: "Hematología y laboratorio clínico", requisitos: ["Fisiología especial"] },
  { nombre: "Patologia especial", requisitos: ["Patologia funcional"] },
  { nombre: "Ingles técnico", requisitos: [] },
  { nombre: "Producción animal 1", requisitos: ["Alimentación y nutrición animal"] },
  { nombre: "Practica 6", requisitos: ["Practica 5"] },
  { nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["Patologia especial"] },
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

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  cursos.forEach((curso, index) => {
    const div = document.createElement("div");
    div.classList.add("curso");
    div.innerText = curso.nombre;
    div.id = `curso-${index}`;
    if (curso.requisitos.length > 0) div.classList.add("bloqueado");
    div.addEventListener("click", () => aprobarCurso(index));
    contenedor.appendChild(div);
  });
  actualizarEstado();
}

function aprobarCurso(index) {
  const curso = cursos[index];
  const div = document.getElementById(`curso-${index}`);
  if (div.classList.contains("aprobado") || div.classList.contains("bloqueado")) return;
  aprobados.add(curso.nombre);
  div.classList.add("aprobado");
  div.classList.remove("bloqueado");
  actualizarEstado();
}

function actualizarEstado() {
  cursos.forEach((curso, index) => {
    const div = document.getElementById(`curso-${index}`);
    if (aprobados.has(curso.nombre)) return;
    const requisitosCumplidos = curso.requisitos.every(r => aprobados.has(r));
    if (requisitosCumplidos) div.classList.remove("bloqueado");
  });
}

crearMalla();
