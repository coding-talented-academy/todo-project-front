const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector("#login-form input")
const greeting = document.querySelector("#greeting")

const USERNAME_KEY = "userName";
const HIDDEN_CLASS = "hidden";

function onInputNameSubmit(e) {

    e.preventDefault(); //브라우저의 기본 함수 : 브라우저의 기본 동작 막아줌

    const userName = loginInput.value;

    localStorage.setItem(USERNAME_KEY, userName);

    paintGreetings(userName)
    getAllTodos()
}

function paintGreetings(userName){
    
    greeting.innerText = `Hello ${userName}`;

    //form 은 없애고, greeting 은 보이게
    greeting.classList.remove(HIDDEN_CLASS) // greeting은 보인다.
    loginForm.classList.add(HIDDEN_CLASS) //form이 안보인다.
}

const savedUser = localStorage.getItem(USERNAME_KEY)

if(savedUser === null){ //사용자가 사용자 이름을 입력하지 않았을때
    
    loginForm.classList.remove(HIDDEN_CLASS) // 로그인 폼을 보여주고
    loginForm.addEventListener("submit", onInputNameSubmit)

} else {
    paintGreetings(savedUser)
}