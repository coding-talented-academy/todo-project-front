const todoInput = document.querySelector("#input-todo")
const todoForm = document.querySelector("#todo-form")
const todoList = document.querySelector("#todo-list")

const BASE_URL = "http://localhost:8080";
let todoArray = [];

function removeAllTodos(){
    while(todoList.hasChildNodes()){
        todoList.removeChild(todoList.firstChild);
    }
}

function getClickedTodoId(event){
    const clicked = event.target.parentNode; //li 엘리먼트
    const todoId= clicked.id;

    return todoId;
}

function handleCompleteTodo(event){

    //const clicked = event.target.parentNode; //li 엘리먼트
    //const todoId= clicked.id;

    const todoId = getClickedTodoId(event);
    const todo = todoArray.find(todo => todo.id==todoId)

    const url = `${BASE_URL}/todos/${todoId}`;
    const body = {
        contents : todo.contents,
        isDone : !todo.isDone, // !false  => true , !true => false
        userName : todo.userName
    }

    //api 통신
    fetch(url, {
        method : 'PUT',
        body : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(()=>{
        getAllTodos()
    })        
}

function handleDeleteTodo(event){
    const todoId = getClickedTodoId(event);

    const url = `${BASE_URL}/todos/${todoId}`;

    fetch(url, {
        method : 'DELETE'
    }).then(()=>{
        getAllTodos()
    })
}

function paintAllToDos(){    
    removeAllTodos()

    todoArray.forEach(todo =>{
        const li = document.createElement("li");
        const text = todo.isDone===true ? document.createElement("del") : document.createElement("span");
        const completeBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        
        li.id=todo.id
        text.innerText = todo.contents;
        completeBtn.innerText = "✔️";
        deleteBtn.innerText = "❌";

        completeBtn.addEventListener("click", handleCompleteTodo)
        deleteBtn.addEventListener("click", handleDeleteTodo)

        li.appendChild(text);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        todoList.appendChild(li)
    })
}

function getAllTodos(){

    const userName = localStorage.getItem(USERNAME_KEY);
    const url = `${BASE_URL}/todos/users?userName=${userName}`;

    fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data)
            
            todoArray = data;
            paintAllToDos()
        })
}

function postNewTodo(newTodo){
    
    //api 와 POST 통신을 해서 DB에 저장해야함
    const url = `${BASE_URL}/todos`
    
    const body = {
        contents : newTodo,
        userName : localStorage.getItem(USERNAME_KEY)
    }

    fetch(url, {
        method : 'POST',
        body : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(()=>{
        getAllTodos()
    })
}

function onTodoSubmit(e){
    e.preventDefault();

    const newTodo = todoInput.value;
    todoInput.value = "";

    if(localStorage.getItem(USERNAME_KEY)!==null){
        postNewTodo(newTodo)
    } else {
        alert("사용자 이름을 먼저 입력하세요.")
    }
    
}

if(localStorage.getItem(USERNAME_KEY)!==null){
    getAllTodos()
}

todoForm.addEventListener("submit", onTodoSubmit)