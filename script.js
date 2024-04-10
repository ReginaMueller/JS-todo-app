const todo_list = document.getElementById("todo-list");
const add_button = document.getElementById("add");
const rmv_button = document.getElementById("remove");
const all_filter = document.getElementById("all");
const open_filter = document.getElementById("open");
const done_filter = document.getElementById("done");
const localStorageKey = "key";

let state = [];

function render() {
  todo_list.innerHTML = "";
  updateState();
  visualizeState();
}

render();

function updateState() {
  if (localStorage.getItem(localStorageKey) !== null)
    state = JSON.parse(localStorage.getItem(localStorageKey));
}

function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function visualizeState() {
  if (state.length != 0) {
    if (all_filter.checked) {
      for (let todo of state) {
        visualize(todo);
      }
    } else if (open_filter.checked) {
      for (let todo of state) {
        if (!todo.done) visualize(todo);
      }
    } else if (done_filter.checked) {
      for (let todo of state) {
        if (todo.done) visualize(todo);
      }
    }
  }
}

function visualize(todoObject) {
  // Checkbox erstellen und mit EventListener versehen
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "done";
  checkbox.checked = todoObject.done;
  checkbox.id = todoObject.id;
  checkbox.addEventListener("change", (e) => {
    todoObject.done = e.target.checked;
    updateLocalStorage();
  });
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
  // Form in List einfügen
  list.append(form);
  todo_list.appendChild(list);
}

function createTodoObject(todo_txt) {
  let todo = {};
  todo.id = Date.now();
  todo.description = todo_txt;
  todo.done = false;
  return todo;
}

add_button.addEventListener("click", () => {
  const todo_input = document.getElementById("input");
  const todoObject = createTodoObject(todo_input.value.trim());
  visualize(todoObject);
  state.push(todoObject);
  updateLocalStorage();
  todo_input.value = "";
});

rmv_button.addEventListener("click", () => {
  console.log(state);
  state = state.filter((todo) => !todo.done);
  updateLocalStorage();
  render();
});

all_filter.addEventListener("change", () => {
  render();
});

open_filter.addEventListener("change", () => {
  render();
});

done_filter.addEventListener("change", () => {
  render();
});
