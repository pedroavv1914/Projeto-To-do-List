const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const fulllist = document.querySelector('.list-task');

let myItemList = [];

// Adiciona nova tarefa
function addNewTask() {
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert("Por favor, insira uma tarefa.");
        return; // impede a continuação da função
    }

    myItemList.push({
        task: taskText,
        completed: false
    });

    input.value = '';
    showTasks();
}

// Mostra as tarefas na tela
function showTasks() {
    let newLi = '';

    myItemList.forEach((item, index) => {
        newLi += `<li class="task ${item.completed ? "done" : ""}">
                    <img src="./img/checked.png" alt="check-na-tarefa" onClick="completeTask(${index})">
                    <p>${item.task}</p>
                    <div class="actions">
                        <img src="./img/edit.png" alt="editar-tarefa" onClick="editTask(${index}, this)">
                        <img src="./img/trash.png" alt="tarefa-para-lixo" onClick="deleteItem(${index})">
                    </div>
                  </li>`;
    });

    fulllist.innerHTML = newLi;
    localStorage.setItem('list', JSON.stringify(myItemList));
}

// Marca como concluída
function completeTask(index) {
    myItemList[index].completed = !myItemList[index].completed;
    showTasks();
}

// Exclui tarefa
function deleteItem(index) {
    myItemList.splice(index, 1);
    showTasks();
}

// Edita tarefa
function editTask(index, element) {
    const li = element.closest('li');
    const p = li.querySelector('p');
    const oldText = myItemList[index].task;

    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = oldText;
    inputEdit.className = 'edit-input';

    p.replaceWith(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener('blur', () => saveEdit(index, inputEdit.value));
    inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit(index, inputEdit.value);
        }
    });
}

// Salva a edição
function saveEdit(index, newText) {
    if (newText.trim() === '') return;
    myItemList[index].task = newText.trim();
    showTasks();
}

// Recarrega do localStorage
function reloadTasks() {
    const localStorageTasks = localStorage.getItem('list');
    if (localStorageTasks) {
        myItemList = JSON.parse(localStorageTasks);
    }
    showTasks();
}

// Enter também adiciona tarefa
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

button.addEventListener('click', addNewTask);
reloadTasks();

// Necessário para que os eventos funcionem ao usar atributos HTML como onClick
window.completeTask = completeTask;
window.deleteItem = deleteItem;
window.editTask = editTask;
