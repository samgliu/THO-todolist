import * as Index from "../index.js";

function navCreator(parentDiv, list) {
    let uiDiv = document.createElement("ui");
    parentDiv.appendChild(uiDiv);
    for (let i = 0; i < list.length; i++) {
        let liDiv = document.createElement("li");
        liDiv.id = "list-" + i;
        liDiv.textContent = list[i].getProjName();

        if (i > 0) {
            let btn2 = document.createElement("button");
            btn2.id = "list-del-" + i;
            btn2.setAttribute("type", "button");
            btn2.classList.add("delbtn");
            btn2.innerHTML = "X";
            liDiv.appendChild(btn2);
        }
        uiDiv.appendChild(liDiv);
    }
    let btn = document.createElement("button");
    btn.id = "addListButton";
    btn.innerHTML = "+New List";
    uiDiv.appendChild(btn);
}

function displayCreator(parentDiv, index, list) {
    parentDiv.innerHTML = "";
    parentDiv.setAttribute("value", "list-" + index);
    for (let i = 0; i < list[index].getTheList().length; i++) {
        let singleDiv = document.createElement("div");
        singleDiv.classList.add("listEl");
        singleDiv.id = index + "-" + i;

        let btn2 = document.createElement("button");
        btn2.id = "deleteList-" + index + "-" + i;
        btn2.setAttribute("type", "button");
        btn2.innerHTML = "X";
        singleDiv.appendChild(btn2);

        let singleP = document.createElement("p");
        let text1 = list[index].getTheList()[i].getDuedate();
        singleP.textContent =
            text1 + " " + list[index].getTheList()[i].getTitle();
        singleDiv.appendChild(singleP);
        let btn1 = document.createElement("button");
        btn1.id = "detailList-" + index + "-" + i;
        btn1.setAttribute("type", "button");
        btn1.innerHTML = "Detail";
        singleDiv.appendChild(btn1);

        parentDiv.appendChild(singleDiv);

        btn2.addEventListener("mousedown", function () {
            delDetail(index, i, list);
        });
        btn1.addEventListener("mousedown", function () {
            showDetail(index, i, list);
        });
    }
}

function showDetail(index, id, list) {
    let detailDiv = document.getElementById("detail");
    detailPopup(index, id, list, detailDiv);
}

function detailPopup(index, id, list, parentDiv) {
    parentDiv.innerHTML = "";
    let theDiv = document.createElement("div");
    parentDiv.appendChild(theDiv);
    let popupDiv = document.createElement("div");
    popupDiv.id = "detailpopupForm";
    popupDiv.classList.add("formPopup");
    theDiv.appendChild(popupDiv);

    let head2 = document.createElement("h5");
    head2.textContent = "Detail: ";
    popupDiv.appendChild(head2);
    let formDiv = document.createElement("form");
    formDiv.classList.add("formContainer");
    popupDiv.appendChild(formDiv);

    let para1 = document.createElement("p");
    let para2 = document.createElement("p");
    let para3 = document.createElement("p");
    let para4 = document.createElement("p");
    para1.textContent = `Title: ${list[index].getTheList()[id].getTitle()}\n`;
    para2.textContent = `Description: ${list[index]
        .getTheList()
        [id].getDescription()}\n`;
    para3.textContent = `DueDate: ${list[index]
        .getTheList()
        [id].getDuedate()}\n`;
    para4.textContent = `Priority: ${list[index]
        .getTheList()
        [id].getPriority()}\n`;
    formDiv.appendChild(para1);
    formDiv.appendChild(para2);
    formDiv.appendChild(para3);
    formDiv.appendChild(para4);

    let btn1 = document.createElement("button");
    btn1.id = "detailBtnCancel";
    btn1.setAttribute("type", "button");
    btn1.setAttribute(
        "onclick",
        "document.getElementById('detailpopupForm').style.display='none';"
    );
    btn1.innerHTML = "Close";
    formDiv.appendChild(btn1);
    document.getElementById("detailpopupForm").style.display = "block";
}

function delDetail(index, id, list) {
    list[index].removeFromList(id);
    Index.reset(index);
}

export { navCreator, displayCreator };
