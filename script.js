
let cards = [
    {
        id: 0,
        title: "Terminar TA desarrollo web",
        description: "Crear gestor de tareas web",
        assigned: "Persona 1", 
        priority: "Alta",
        status: "To Do",
        finalDate: "2024-08-01"
    }
]
let currentId = cards.length


function openModal() {
    const modal = document.getElementById("task-modal");
    modal.style.display = "block";

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Nueva tarea</h2>
            <form id=taskForm>
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="box">
                            <label for="title">Título</label>
                            <input type="text" id="titleInput" name="title">
                        </div>

                        <div class="box">
                            <label for="assigned">Asignado</label>
                            <select name="asignado" id="assignedInput">
                                <option>Persona 1</option>
                                <option>Persona 2</option>
                                <option>Persona 3</option>
                            </select>
                        </div>

                        <div class="box">
                            <label for=status">Estado</label>
                            <select name="estado" id="statusInput">
                                <option>Backlog</option>
                                <option>To do</option>
                                <option>In progress</option>
                                <option>Blocked</option>
                                <option>Done</option>
                            </select>
                        </div>

                    </div>
                    <div class="column">
                        <div class="box">
                            <label for="description">Descripción</label>
                            <input type="text" id="descriptionInput" name="description">
                        </div>


                        <div class="box">
                            <label for=priority">Prioridad</label>
                            <select name="prioridad" id="priorityInput">
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                        </div>

                        <div class="box">
                            <label for="due-date">Fecha límite</label>
                            <input type="date" id="due-date" name="due-date"><br>
                        </div>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button type="button" id="cancel-button">Cancelar</button>
                    <button type="submit" id="accept-button">Aceptar</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById("cancel-button").onclick = function() {
        modal.style.display = "none";
    };

    const addCardButton = document.getElementById("taskForm");
    addCardButton.addEventListener("submit", (event) => {
        event.preventDefault();
        addCardHandler();
        modal.style.display = "none"; // Cerrar modal después de agregar la tarjeta
    });

};

const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", (event) => {
  event.preventDefault(); // Evitar el submit default
  openModal();
})

// const editOnClick = document.querySelector(".card")
// editOnClick.addEventListener("click", (event) => {
//     event.preventDefault(); 
//     openEditModal(); 
// })

function openEditModal(card) {
    const modal = document.getElementById("task-modal");
    modal.style.display = "block";

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Editar tarea</h2>
            <form id="editTaskForm">
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="box">
                            <label for="title">Título</label>
                            <input type="text" id="titleInput" name="title" value="${card.title}">
                        </div>
                        <div class="box">
                            <label for="assigned">Asignado</label>
                            <select name="asignado" id="assignedInput">
                                <option ${card.assigned === "Persona 1" ? "selected" : ""}>Persona 1</option>
                                <option ${card.assigned === "Persona 2" ? "selected" : ""}>Persona 2</option>
                                <option ${card.assigned === "Persona 3" ? "selected" : ""}>Persona 3</option>
                            </select>
                        </div>
                        <div class="box">
                            <label for="status">Estado</label>
                            <select name="estado" id="statusInput">
                                <option ${card.status === "Backlog" ? "selected" : ""}>Backlog</option>
                                <option ${card.status === "To Do" ? "selected" : ""}>To Do</option>
                                <option ${card.status === "In Progress" ? "selected" : ""}>In Progress</option>
                                <option ${card.status === "Blocked" ? "selected" : ""}>Blocked</option>
                                <option ${card.status === "Done" ? "selected" : ""}>Done</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="box">
                            <label for="description">Descripción</label>
                            <input type="text" id="descriptionInput" name="description" value="${card.description}">
                        </div>
                        <div class="box">
                            <label for="priority">Prioridad</label>
                            <select name="prioridad" id="priorityInput">
                                <option ${card.priority === "Alta" ? "selected" : ""}>Alta</option>
                                <option ${card.priority === "Media" ? "selected" : ""}>Media</option>
                                <option ${card.priority === "Baja" ? "selected" : ""}>Baja</option>
                            </select>
                        </div>
                        <div class="box">
                            <label for="due-date">Fecha límite</label>
                            <input type="date" id="due-date" name="due-date" value="${card.finalDate}">
                        </div>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button type="button" id="cancel-button">Cancelar</button>
                    <button type="submit" id="save-button">Guardar cambios</button>
                    <button id="clear-button">Eliminar tarea</button>
                </div>
            </form>
        </div>
    `;

    // Cerrar modal al hacer clic en el botón "Cancelar"
    document.getElementById("cancel-button").onclick = function() {
        modal.style.display = "none";
    };

    // Guardar cambios al hacer clic en el botón "Guardar cambios"
    const saveButton = document.getElementById("editTaskForm");
    saveButton.addEventListener("submit", (event) => {
        event.preventDefault();
        saveCardChanges(card.id);
        modal.style.display = "none"; // Cerrar modal después de guardar cambios
    });

    const clearTasksButton = document.getElementById("clear-button");
    clearTasksButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteCardHandler(card.id);
        modal.style.display = "none"; 
    });
}

function saveCardChanges(cardId) {
    const cardIndex = cards.findIndex(card => card.id === cardId);
    
    // Actualizar los valores de la tarjeta con los valores del formulario
    cards[cardIndex].title = document.getElementById("titleInput").value;
    cards[cardIndex].description = document.getElementById("descriptionInput").value;
    cards[cardIndex].assigned = document.getElementById("assignedInput").value;
    cards[cardIndex].priority = document.getElementById("priorityInput").value;
    cards[cardIndex].status = document.getElementById("statusInput").value.replace(/ /g, '_');
    cards[cardIndex].finalDate = document.getElementById("due-date").value;

    // Eliminar la tarjeta antigua de la columna actual
    const oldCardElement = document.getElementById(`card-${cardId}`);
    oldCardElement.parentNode.removeChild(oldCardElement);

    // Crear y agregar la tarjeta actualizada en la nueva columna
    createCardComponent(cards[cardIndex]);
}

function createCardComponent(card) {
    const cardComponent = document.createElement("div");
    cardComponent.id = `card-${card.id}`;
    cardComponent.classList.add("card");
    cardComponent.innerHTML = `
        <div class="card-header">
            <div class="card-header-title">${card.title}</div>
        </div>
        <div class="card-content">
            <p>Descripción: ${card.description}</p>
            <p>Asignado: ${card.assigned}</p>
            <p>Prioridad: ${card.priority}</p>
            <p>Fecha límite: ${card.finalDate}</p>
        </div>
    `;
    cardComponent.addEventListener("click", () => openEditModal(card));

    const statusColumn = document.querySelector(`.${card.status.replace(/ /g, '_')}`);
    statusColumn.appendChild(cardComponent);
}


function loadCards(cards){
    cards.forEach((element) => {
        createCardComponent(element)
    })
}

function addCardHandler(){
    const newCard = {
        id: currentId++,
        title: document.getElementById("titleInput").value,
        description: document.getElementById("descriptionInput").value, 
        assigned: document.getElementById("assignedInput").value,
        priority: document.getElementById("priorityInput").value,
        status: document.getElementById("statusInput").value.replace(/ /g, '_'),
        finalDate: document.getElementById("due-date").value
    }

    createCardComponent(newCard)
    cards.push(newCard)

}

function deleteCardHandler(cardId){
    // Eliminar la tarjeta del array
    cards = cards.filter(cardElement => cardElement.id !== cardId);
    
    // Eliminar la tarjeta del DOM
    const cardElement = document.getElementById(`card-${cardId}`);
    if (cardElement) {
        cardElement.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el drag and drop para cada columna
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        const sortable = Sortable.create(column.querySelector('.box'), {
            group: 'shared', // Permitir arrastrar entre columnas
            animation: 150,  // Velocidad de la animación
            onEnd: function (evt) {
                const cardId = parseInt(evt.item.id.split('-')[1], 10);
                const newStatus = evt.to.classList[1]; // Clase de la nueva columna

                // Actualizar el estado de la tarjeta en la lista `cards`
                const card = cards.find(card => card.id === cardId);
                card.status = newStatus.replace(/_/g, ' ');
            }
        });
    });
});


loadCards(cards); 