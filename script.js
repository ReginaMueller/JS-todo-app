const todo_list = document.getElementById("todo-list");
const add_form = document.getElementById("add-form");
const all_filter = document.getElementById("all");
const open_filter = document.getElementById("open");
const done_filter = document.getElementById("done");

const localStorageKey = "key";

let state = [];
let filter = all_filter;

function refresh() {
  fetch("http://localhost:4730/todos")
    .then((res) => res.json())
    .then((todosFromApi) => {
      state = todosFromApi;
      render();
    });
}

function postTodo(todoObject) {
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todoObject),
  })
    .then((res) => res.json())
    .then(() => {});
}

function putTodo(todoObject) {
  fetch("http://localhost:4730/todos/" + todoObject.id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todoObject),
  })
    .then((res) => res.json())
    .then(() => {});
}

function deleteTodo(id) {
  fetch("http://localhost:4730/todos/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {});
}

function render() {
  todo_list.innerHTML = "";
  all_filter.style.backgroundColor = "";
  open_filter.style.backgroundColor = "";
  done_filter.style.backgroundColor = "";
  filter.style.backgroundColor = "white";

  if (filter == all_filter) {
    for (let todo of state) {
      visualize(todo);
    }
  } else if (filter == open_filter) {
    for (let todo of state) {
      if (!todo.done) visualize(todo);
    }
  } else if (filter == done_filter) {
    for (let todo of state) {
      if (todo.done) visualize(todo);
    }
  }
}

function visualize(todoObject) {
  // Span erstellen
  const span = document.createElement("span");
  span.textContent = todoObject.description;
  //Form erstellen
  const form = document.createElement("form");
  // Label in Form einfügen
  form.append(span);
  form.checked = todoObject.done;
  form.id = todoObject.id;
  styleForm(form);
  form.addEventListener("click", () => {
    form.checked = !form.checked;
    todoObject.done = form.checked;
    styleForm(form);
    putTodo(todoObject);
  });

  todo_list.appendChild(form);
}

function styleForm(form) {
  if (form.checked) {
    form.style.border = "0.2rem solid";
    form.style.borderColor = "white";
    form.style.backgroundColor = "inherit";
    form.style.color = "white";
    handleIcons(form);
  } else {
    form.style.backgroundColor = "";
    form.style.color = "";
    const check = document.getElementById(form.id + "check");
    if (check != null) {
      check.parentNode.removeChild(check);
    }
    const trash = document.getElementById(form.id + "trash");
    if (trash != null) {
      trash.parentNode.removeChild(trash);
    }
  }
}

function handleIcons(form) {
  const check_square = document.createElement("i");
  check_square.classList.add("fa-regular", "fa-square-check");
  const trash = document.createElement("i");
  trash.classList.add("fa-regular", "fa-trash-can");
  const h2_check = document.createElement("h2");
  h2_check.id = form.id + "check";
  h2_check.appendChild(check_square);
  h2_check.style.color = "white";
  const h2_trash = document.createElement("h2");
  h2_trash.id = form.id + "trash";
  h2_trash.appendChild(trash);
  h2_trash.style.color = "white";
  h2_trash.style.zIndex = "2";
  h2_trash.hidden = "true";
  form.append(h2_trash, h2_check);
  form.addEventListener("mouseover", () => {
    h2_trash.hidden = "";
  });
  form.addEventListener("mouseout", () => {
    h2_trash.hidden = "true";
  });
  trash.addEventListener("click", (e) => {
    e.stopPropagation();
    state = state.filter((todo) => todo.id != form.id);
    deleteTodo(form.id);
    refresh();
  });
}

function createTodoObject(todo_txt) {
  let todo = {};
  todo.description = todo_txt;
  todo.done = false;
  return todo;
}

all_filter.addEventListener("click", () => {
  if (filter != all_filter) {
    filter = all_filter;
    refresh();
  }
});

open_filter.addEventListener("click", () => {
  if (filter != open_filter) {
    filter = open_filter;
    refresh();
  }
});

done_filter.addEventListener("click", () => {
  if (filter != done_filter) {
    filter = done_filter;
    refresh();
  }
});

add_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo_input = document.getElementById("input");
  const todoObject = createTodoObject(todo_input.value.trim());
  visualize(todoObject);
  state.push(todoObject);
  postTodo(todoObject);
  todo_input.value = "";
});

refresh();
render();
