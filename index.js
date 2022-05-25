var todos = [];
const baseUrl = "https://peaceful-coast-70180.herokuapp.com";

var n = 201;

async function add() {
  var text = document.getElementById("form2").value;
  if (text === "") return;
  console.log(text);
  var todo = {
    userId: 1,
    id: n,
    title: text,
    completed: false,
  };
  var response = await fetch(`${baseUrl}/todos`, {
    // Adding method type
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify(todo),
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  var responseJson = await response.json();
  console.log(responseJson);
  document.getElementById("form2").value = "";
  n++;
  loadTodo();
}

async function marked(id) {
  var response = await fetch(`${baseUrl}/todos/${id}`, {
    // Adding method type
    method: "PUT"
  });
  var responseJson = await response.json();
  console.log(responseJson);
  loadTodo();
}

async function cancel(id) {
  var response = await fetch(`${baseUrl}/todos/${id}`, {
    // Adding method type
    method: "DELETE"
  });
  var responseJson = await response.json();
  console.log(responseJson);
  loadTodo();
}

var loadTodo = async function () {
  var response = await fetch(`${baseUrl}/todos`);
  var json = await response.json();
  console.log(json);
  todos = [...json];
  var out = "";
  todos.forEach(function (todo) {
    console.log(todo);
    out += `<li
          class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
          style="background-color: #f4f6f7"
        > 
        <input
          class="form-check-input me-2"
          onclick="marked(${todo.id})"
          type="checkbox"
          value=""
          aria-label="..."
          ${todo.completed ? "checked" : ""}
        />
        ${todo.completed ? `<s>${todo.title}</s>` : todo.title}
        <div class="flex-fill"></div>
        <a style="color: black;" href="#!" role="button" onclick="cancel(${
          todo.id
        })">
            <i class="fab fa-x fa-lg"></i>
        </a>
        </li>`;
  });
  document.getElementById("stuff").innerHTML = out;
};

window.onload = loadTodo;
