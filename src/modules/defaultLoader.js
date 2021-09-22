function headerCreator(headDiv) {
    let head1 = document.createElement("h1");
    let btn1 = document.createElement("button");
    head1.textContent = "My ToDo List";
    btn1.id = "addButton";
    btn1.innerHTML = "+";
    headDiv.appendChild(head1);
    headDiv.appendChild(btn1);
}

function listCreator(parentDiv, toDoList) {
    let theDiv = document.createElement("div");
    parentDiv.appendChild(theDiv);
    let popupDiv = document.createElement("div");
    popupDiv.id = "popupForm";
    popupDiv.classList.add("formPopup");

    theDiv.appendChild(popupDiv);

    let formDiv = document.createElement("form");
    formDiv.classList.add("formContainer");
    formDiv.setAttribute("onsubmit", "return false");
    let head2 = document.createElement("h3");
    head2.textContent = "New Task";
    popupDiv.appendChild(head2);
    popupDiv.appendChild(formDiv);

    let newlabel1 = document.createElement("label");
    newlabel1.setAttribute("for", "title");
    newlabel1.innerHTML = "Title: ";
    let newinputl = document.createElement("input");
    newinputl.setAttribute("type", "text");
    newinputl.id = "title";
    newinputl.name = "title";
    formDiv.appendChild(newlabel1);
    formDiv.appendChild(newinputl);

    let newlabel2 = document.createElement("label");
    newlabel2.setAttribute("for", "description");
    newlabel2.innerHTML = "Description: ";
    let newinput2 = document.createElement("input");
    newinput2.setAttribute("type", "text");
    newinput2.id = "description";
    newinput2.name = "description";
    formDiv.appendChild(newlabel2);
    formDiv.appendChild(newinput2);

    let newlabel3 = document.createElement("label");
    newlabel3.setAttribute("for", "duedate");
    newlabel3.innerHTML = "Due Date: ";
    let newinput3 = document.createElement("input");
    newinput3.setAttribute("type", "date");
    newinput3.id = "duedate";
    newinput3.name = "duedate";
    formDiv.appendChild(newlabel3);
    formDiv.appendChild(newinput3);

    let newlabel4 = document.createElement("label");
    newlabel4.setAttribute("for", "priority");
    newlabel4.innerHTML = "Priority: ";
    formDiv.appendChild(newlabel4);
    let selectList = document.createElement("select");
    selectList.id = "priority";
    selectList.name = "priority";
    formDiv.appendChild(selectList);
    let option1 = document.createElement("option");
    option1.value = "high";
    option1.text = "high";
    selectList.appendChild(option1);
    let option2 = document.createElement("option");
    option2.value = "medium";
    option2.text = "medium";
    selectList.appendChild(option2);
    let option3 = document.createElement("option");
    option3.value = "low";
    option3.text = "low";
    selectList.appendChild(option3);

    let newlabel5 = document.createElement("label");
    newlabel5.setAttribute("for", "proj");
    newlabel5.innerHTML = "Project: ";
    formDiv.appendChild(newlabel5);
    let selectList2 = document.createElement("select");
    selectList2.id = "projsel";
    selectList2.name = "projsel";
    formDiv.appendChild(selectList2);
    projOptionCreator(selectList2, toDoList);

    let btnDiv = document.createElement("div");
    btnDiv.id = "buttonconatiner";
    formDiv.appendChild(btnDiv);
    let btn1 = document.createElement("button");
    btn1.id = "addButtonCancel";
    btn1.setAttribute("type", "button");
    btn1.innerHTML = "Close";
    let btn2 = document.createElement("button");
    btn2.id = "addtaskbutton";
    btn2.setAttribute("type", "submit");
    btn2.innerHTML = "Add Task";
    btnDiv.appendChild(btn1);
    btnDiv.appendChild(btn2);
}

function projOptionCreator(theDiv, thelist) {
    theDiv.innerHTML = "";
    for (let i = 0; i < thelist.length; i++) {
        let name = thelist[i].getProjName();
        theDiv.appendChild(optionCreator(i, name));
    }
}

function optionCreator(index, name) {
    let option1 = document.createElement("option");
    option1.value = index;
    option1.text = name;
    return option1;
}

function newListFormCreator(parentDiv) {
    let theDiv = document.createElement("div");
    parentDiv.appendChild(theDiv);
    let popupDiv = document.createElement("div");
    popupDiv.id = "listpopupForm";
    popupDiv.classList.add("formPopup");
    theDiv.appendChild(popupDiv);

    let head2 = document.createElement("h4");
    head2.textContent = "New List";
    popupDiv.appendChild(head2);
    let formDiv = document.createElement("form");
    formDiv.classList.add("formContainer");
    formDiv.setAttribute("onsubmit", "return false");
    popupDiv.appendChild(formDiv);

    let newinputl = document.createElement("input");
    newinputl.setAttribute("type", "text");
    newinputl.id = "listName";
    newinputl.name = "listName";
    newinputl.required = true;
    formDiv.appendChild(newinputl);

    let btnDiv = document.createElement("div");
    btnDiv.id = "listbuttonconatiner";
    formDiv.appendChild(btnDiv);
    let btn1 = document.createElement("button");
    btn1.id = "addListButtonCancel";
    btn1.setAttribute("type", "button");
    btn1.innerHTML = "Close";
    let btn2 = document.createElement("button");
    btn2.id = "addlistbutton";
    btn2.setAttribute("type", "button");
    btn2.innerHTML = "Add List";
    btnDiv.appendChild(btn1);
    btnDiv.appendChild(btn2);
}

export { headerCreator, listCreator, newListFormCreator, projOptionCreator };
