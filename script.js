const add_button = document.getElementById("add");
const todo_list = document.getElementById("todo-list");
const localStorageKey = "key";

function render() {
  todo_list.innerHTML = "";
  if (localStorage.getItem(localStorageKey) !== null) {
    let todos = JSON.parse(localStorage.getItem(localStorageKey));
    for (let todo of todos) {
      visualize(todo);
    }
  }
}

render();

function visualize(todoObject) {
  // Checkbox erstellen
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  //checkbox.name = "done";
  checkbox.checked = todoObject.done;
  // Span erstellen
  const span = document.createElement("span");
  span.textContent = todoObject.description;
  // Label erstellen
  const label = document.createElement("label");
  // Span und Checkbox in das Label einfügen
  label.append(span, checkbox);
  //Form erstellen
  const form = document.createElement("form");
  // Label in Form einfügen
  form.append(label);
  // List erstellen
  const list = document.createElement("li");
  list.append(form);
  todo_list.appendChild(list);
}

function createTodoObject(todo_txt) {
  let todo = {};
  todo.id = Date.now();
  todo.description = todo_txt;
  todo.done = false;
  console.log(todo);
  return todo;
}

add_button.addEventListener("click", () => {
  const todo_input = document.getElementById("input");
  const todoObject = createTodoObject(todo_input.value);
  visualize(todoObject);
  if (localStorage.getItem(localStorageKey) !== null) {
    let todos = JSON.parse(localStorage.getItem(localStorageKey));
    todos.push(todoObject);
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  } else {
    let arr = [];
    arr.push(todoObject);
    localStorage.setItem(localStorageKey, JSON.stringify(arr));
  }
  todo_input.value = "";
});
