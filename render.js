import store from "./store.js";


function render(){
    let randomNum = 1 + Math.floor(Math.random()*1000);
    document.documentElement.style.setProperty("--hue", randomNum);
    const todos = document.querySelector(".todos");
    const todoElements = store.todos.map(
        (todo)=> `<li class="todo" data-id=${todo.id}>
        <span class="todo-title ${todo.completed ? "completed": ""}">${todo.title}</span>
        <div class="toggle-delete">
          <input type="checkbox" name="completed" class="todo-checkbox" ${todo.completed? "checked": " "}/>
          <buttton class="delete-todo-button">x</buttton>
        </div>
      </li>`
    ).join(""); 
    todos.innerHTML = todoElements;
};

export default render;