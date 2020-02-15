const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//function filterFn(toDo){
    //forEach에서 Function을 실행시키는 것과같이 각각의 item들이
    //같이 실행되게 할 것이다.
    //filter가 하는일은 Array를 하나 만드는 것이다.
    //함수가 true를하는 아이템들이 있는
    //fileter는 array의 모든 아이템을 통해 함수를 실행하고
    //그리고 true인 아이템들만 가지고 새로운 array를 만든다.
//    return toDo.id === 1;
//}

let toDos = [];

function deleteToDo(event){
    //console.log(event.target.parentNode);
    //consol.dir:이것을 쓰면 해당 찍히는 console.log에 해당 부품세부내역을 알 수 있다.

    const btn = event.target;//해당 번호를 찍은것을 보여줌
    const li = btn.parentNode;
    toDoList.removeChild(li);

    //const cleanToDos = toDos.filter(filterFn);//filter는 함수하나를 실행시킬것이다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); 
    });
    toDos = cleanToDos;
    saveToDos(); 
}

function saveToDos(){//여기 toDos를 가져와서 로컬에 저장하는것을 할 Function이다.
    //localStorage.setItem(TODOS_LS, toDos);local storage에서는 js데이터를 저장할수가 없다 그래서 이대로 저장하면 object object라는게 저장된다. 오직 String만 저장할 수 있다.
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));//Json.stringify는 js Object를 String으로 바꿔준다가 중요한것

}

function paintToDo(text){
    const li = document.createElement("li");//document.creatElement는 html에서 기존에 document.querySelector할필요없이 태그를 통해 값을 가져왔다면 이것은 직접 만드는 것이다
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1//이렇게 하면 0으로 시작하는게 아니라, 1로시작한다. 
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId   
    };
    toDos.push(toDoObj);
    saveToDos();
 
}

function handleSubmit(evnet){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        /*
        JSON:javascriptObjectNation:데이터를 전달할떄, 자바스크립트가
        그걸 다룰수 있도록 object로 바꿔주는 기능인셈이다.

        지금 JSON을 한번더 해야하는이유는 우리가 위에서 TODOS를 저장할때
        js는 Object로 저장하기때문에, 브라우저에서는 String밖에 인식을
        못하니까 바꿔줬었는데 그것을 다시 js로 얻어오려면 Object로 바꿔줘야함 
        */

       function something(toDo){
           console.log(toDo.text);
           paintToDo(toDo.text);
       }

       const parsedToDos = JSON.parse(loadedToDos);//String -> Object
       parsedToDos.forEach(something);//forEach는 기본적으로 함수를 실행하는데 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 주는 역할
       //위에 Something(){}을 안쓰고 parsedToDos.forEach(function(todo){console.log(toDo.text);};를 할 수도 있다.
       //list에 있는 모든 item을 위한 함수를 실행시키는것이다.
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();

 