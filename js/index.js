
let todos =
    JSON.parse(localStorage.getItem("todos")) || [];

const todoInput =
    document.getElementById("todoInput");

const todoList =
    document.getElementById("todoList");

const count =
    document.getElementById("count");

const addBtn =
    document.getElementById("addBtn");

function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}
const now = new Date();

const createTime =
`${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
function updateCount() {

    count.innerText =
        `共 ${todos.length} 项任务`;
}

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li =
            document.createElement("li");

        li.className = "todo-item";

        li.innerHTML = `

        <div class="todo-left">

            <input
                type="checkbox"
                ${todo.done ? "checked" : ""}
            >

          <div class="todo-content">

    <span class="${todo.done ? "completed" : ""
            }">

        ${todo.text}

    </span>

    <small>

        ${todo.createTime}

    </small>

</div>

        </div>

        <button class="delete-btn">
            ✕
        </button>

        `;

        li.querySelector("input")
            .addEventListener("change", () => {

                todos[index].done =
                    !todos[index].done;

                saveTodos();

                renderTodos();
            });

        li.querySelector(".delete-btn")
            .addEventListener("click", () => {

                todos.splice(index, 1);

                saveTodos();

                renderTodos();
            });

        todoList.appendChild(li);

    });

    updateCount();
}

function addTodo() {

    const text =
        todoInput.value.trim();

    if (!text) return;

    todos.push({

        text: text,

        done: false,

        createTime: new Date().toLocaleString()

    });

    todoInput.value = "";

    saveTodos();

    renderTodos();
}

addBtn.addEventListener(
    "click",
    addTodo
);

todoInput.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            addTodo();
        }
    }
);

renderTodos();

