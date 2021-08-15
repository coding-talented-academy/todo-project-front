const logoutButton = document.querySelector("#logout")

function handleLogout(){
    if(localStorage.getItem(USERNAME_KEY)!==null){
        localStorage.removeItem(USERNAME_KEY);
    }

    greeting.classList.add(HIDDEN_CLASS) // greeting 숨기기
    loginForm.classList.remove(HIDDEN_CLASS) //form 보여주기

    loginInput.value = "";

    removeAllTodos()
}

logoutButton.addEventListener("click", handleLogout)