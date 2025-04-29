const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const fulllist = document.querySelector('.list-task')

let myItemList = []

function addNewTask() {
    myItemList.push({
        task: input.value,
        completed: false
    })

    input.value = ''

    showTasks()
}

function showTasks() {

    let newLi = ''

    myItemList.forEach((item, index) => {

        newLi = newLi + `<li class="task ${item.completed && "done"}">
                            <img src="./img/checked.png" alt="check-na-tarefa" onClick="completeTask(${index})">
                            <p>${item.task}</p>
                            <img src="./img/trash.png" alt="tarefa-para-lixo" onClick="deleteItem(${index})">
                        </li>`
    })

    fulllist.innerHTML = newLi

    localStorage.setItem('list', JSON.stringify(myItemList))

}

function completeTask(index){
    myItemList[index].completed = !myItemList[index].completed

    showTasks()
    
}

function deleteItem(index){
    myItemList.splice(index, 1)
    
    showTasks()
    
}

function reloadTasks(){
    const localStorageTasks = localStorage.getItem('list')

    if(localStorageTasks){
        myItemList = JSON.parse(localStorageTasks)
    }

    showTasks()
    
}

reloadTasks()

button.addEventListener('click', addNewTask)