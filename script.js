const add_button = document.getElementById("add");
const localStorageKey = "key";

function render() {
  if (localStorage.getItem(localStorageKey) !== null) {
    let todos = JSON.parse(localStorage.getItem(localStorageKey));
    for (let todo of todos) {
      visualize(todo);
    }
  }
}

render();

function visualize(todoDescription) {
  const new_todo = document.createElement("li");
  new_todo.textContent = todoDescription;
  document.getElementById("todo-list").appendChild(new_todo);
}

add_button.addEventListener("click", () => {
  const todo_input = document.getElementById("input");
  visualize(todo_input.value);
  if (localStorage.getItem(localStorageKey) !== null) {
    let a = JSON.parse(localStorage.getItem(localStorageKey));
    a.push(todo_input.value);
    localStorage.setItem(localStorageKey, JSON.stringify(a));
  } else {
    let arr = [];
    arr.push(todo_input.value);
    localStorage.setItem(localStorageKey, JSON.stringify(arr));
  }
  todo_input.value = "";
});
