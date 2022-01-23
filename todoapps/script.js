const icons = {
    completed: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="white"
    viewBox="0 0 16 16">
    <path
        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
</svg>`,
    delete: `                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="white"
    viewBox="0 0 16 16">
    <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path fill-rule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg>`
}

const todoContainer = document.querySelector(".todo-container");
const newToDoInput = document.querySelector("#newToDo");
const addNewToDoBtn = document.querySelector("#addNewToDo");

addNewToDoBtn.addEventListener("click", () => {
    let todo = {
        text: newToDoInput.value,
        completed: false
    }

    addTodo(todo);

    newToDoInput.value = "";
})

function addTodo(todo){
    if(localStorage.todos === undefined || localStorage.todos === ""){
        localStorage.todos = JSON.stringify(todo);
    }else{
        let todos = localStorage.todos;
        todos += ":::" + JSON.stringify(todo);
        localStorage.todos = todos;
    }

    renderTodos();
}

function renderTodos(){
    let todos = localStorage.todos;

    if(todos !== undefined && todos !== ""){
        todos.split(":::")
             .map(todo => JSON.parse(todo))
             .forEach(todo => {
                createToElement(todo);
             });
    }
}

function createToElement(todo){
    let todoDov = document.createElement("div");
    todoDov.className = "todo";

    todoContainer.appendChild(todoDov);

    let todoText = document.createElement("p");
    todoText.className = "todo-text";
    todoText.innerText = todo.text;

    todoDov.appendChild(todoText);

    let iconGrp = document.createElement("icon-grp");
    iconGrp.className = "icon-grp";

    todoDov.appendChild(iconGrp);

    let completeIcon = document.createElement("div");
    completeIcon.className = "complete todo-icon";
    completeIcon.innerHTML = icons.completed;

    let deleteIcon = document.createElement("div");
    deleteIcon.className = "delete todo-icon";
    deleteIcon.innerHTML = icons.delete;

    todoDov.appendChild(completeIcon);
    todoDov.appendChild(deleteIcon);
}

//renderTodos()