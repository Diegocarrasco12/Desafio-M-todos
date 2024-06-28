const listaTareas = document.querySelector("#tareas")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const cuentaTareas = document.querySelector("#cuentaTareas")
const cuentaRealizadas = document.querySelector("#cuentaRealizadas")

const tareas = [
        {id: 123, nombre: "Hacer mercado", realizada: false},
        {id: 456, nombre: "Estudiar para la prueba", realizada: false},
        {id: 789, nombre: "Sacar a pasear a tobby", realizada: false}
]


btnAgregar.addEventListener("click", ()=> {
    let maxId = tareas.reduce((max, tarea) => tarea.id > max ? tarea.id : max, 0);
    const tarea = tareaInput.value
    tareas.push({id: maxId + 1, nombre: tarea, realizada: false})
    tareaInput.value = ""
    
    renderTareas(tareas)
})


function renderTareas(tareas){
    let html = ""
    let realizadas = 0

    for(let tarea of tareas) {
        if (tarea.realizada) {
            realizadas++
        }
        html += `
        <tr class="task-item ${tarea.realizada ? 'tareaRealizada' : 'tareaPendiente'}">
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td> 
            <td><input type="checkbox" ${tarea.realizada ? "checked" : ""} onclick="toggleRealizada(${tarea.id})"></td>
            <td><button onclick="borrar(${tarea.id})">❌</button></td>
        </tr>
        `
    }
    listaTareas.innerHTML = html
    cuentaTareas.innerHTML = tareas.length
    cuentaRealizadas.innerHTML = realizadas
}



function borrar(id) {
    const index = tareas.findIndex((ele)=> ele.id === id)
    tareas.splice(index, 1)
    renderTareas(tareas)
}

function toggleRealizada(id) {
    const tarea = tareas.find((ele) => ele.id === id)
    tarea.realizada = !tarea.realizada
    renderTareas(tareas)
}

renderTareas(tareas)
