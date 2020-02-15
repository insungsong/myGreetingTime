const form = document.querySelector(".js-form");
const input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");

const USER_STORAGE = "currentUser",
SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_STORAGE,text);//User_STORAGE:키값, text(우항):Value
}

function handleSubmit(event){
    event.preventDefault();//이벤트를 보내도 즉, submit해도 새로고침이 안되도록 하는 코드
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}   

function loadName(){
    const currentUser = localStorage.getItem(USER_STORAGE);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();