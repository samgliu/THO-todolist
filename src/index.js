import "./css/style.css";
import { compareAsc, format, toDate, parse } from "date-fns";
import * as defaultLoader from "./modules/defaultLoader";
import * as pageCreator from "./modules/pageCreator";

let toDoList = []; // default project lists

const projList = (theName) => {
    let projName = theName;
    let theList = [];

    const getProjName = () => projName;
    const getTheList = () => theList;
    const pushToList = (obj) => {
        theList.push(obj);
        sortList();
    };
    const removeFromList = (ind) => theList.splice(ind, 1);
    const toJSON = () => theList;
    const sortList = () => {
        let newList = theList.sort(function (a, b) {
            return (
                parse(a.getDuedate(), "yyyy-MM-dd", new Date()) -
                parse(b.getDuedate(), "yyyy-MM-dd", new Date())
            );
        });
        theList = newList;
    };

    return {
        getProjName,
        getTheList,
        pushToList,
        removeFromList,
        toJSON,
    };
};

const ListObj = (theTitle, des, dueDate, prior, index) => {
    let title = theTitle;
    let description = des;
    let duedate = dueDate;
    let priority = prior;
    let ind = index;
    let isDone = false;

    const getTitle = () => title;
    const getDescription = () => description;
    const getDuedate = () => duedate;
    const getPriority = () => priority;
    const getIndex = () => ind;
    const getIsDone = () => isDone;

    const toJSON = () =>
        title +
        "--" +
        description +
        "--" +
        duedate +
        "--" +
        priority +
        "--" +
        ind;

    return {
        getTitle,
        getDescription,
        getDuedate,
        getPriority,
        getIndex,
        getIsDone,
        toJSON,
    };
};

function isLocalEmpty() {
    if (
        localStorage.getItem("toDoList") &&
        localStorage.getItem("toDoList").length > 4
    ) {
        return false;
    }
    return true;
}

function loader() {
    if (isLocalEmpty()) {
        let list1 = ListObj(
            "finish the THO-todolist",
            "finish the todolist",
            "2021-09-21",
            "high",
            0
        );
        let list2 = ListObj("test2", "test2", "2021-09-20", "medium", 0);
        let inbox = projList("Inbox");

        toDoList[0] = inbox;
        toDoList[0].pushToList(list1);
        toDoList[0].pushToList(list2);
    }
    let headDiv = document.getElementById("header");
    defaultLoader.headerCreator(headDiv);
    defaultLoader.listCreator(headDiv, toDoList);
    //let data1 = parse('2021-09-20', 'yyyy-MM-dd', new Date());
    reset(0);
}

function reset(ind) {
    let leftDiv = document.getElementById("leftcontent");
    leftDiv.innerHTML = "";
    pageCreator.navCreator(leftDiv, toDoList);
    defaultLoader.newListFormCreator(leftDiv);
    let rightDiv = document.getElementById("rightcontent");
    pageCreator.displayCreator(rightDiv, ind, toDoList);
    registerEventListener();
    savetoDoList();
}

function openForm() {
    let projselDiv = document.getElementById("projsel");
    defaultLoader.projOptionCreator(projselDiv, toDoList);
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function addToDoList() {
    let name = document.getElementById("title").value;
    let des = document.getElementById("description").value;
    let date = document.getElementById("duedate").value;
    let pro = document.getElementById("priority").value;
    let proj = document.getElementById("projsel").value;
    let list1 = ListObj(name, des, date, pro, proj);
    toDoList[proj].pushToList(list1);
    reset(proj);
    closeForm();
}

function addListopenForm() {
    document.getElementById("listpopupForm").style.display = "block";
}

function addListcloseForm() {
    document.getElementById("listpopupForm").style.display = "none";
}

function addList() {
    let listName = document.getElementById("listName").value;
    if (listName != "") {
        let list1 = projList(listName);
        toDoList.push(list1);
    }
    /*let leftDiv = document.getElementById("leftcontent");
    clearDiv(leftDiv);
    pageCreator.navCreator(leftDiv, toDoList);
    defaultLoader.newListFormCreator(leftDiv);
    registerEventListener();*/
    reset(0);
}

function registerEventListener() {
    document.querySelector("#addButton").addEventListener("click", openForm);
    document
        .querySelector("#addButtonCancel")
        .addEventListener("click", closeForm);
    document
        .querySelector("#popupForm")
        .addEventListener("submit", addToDoList);
    document
        .querySelector("#addListButton")
        .addEventListener("click", addListopenForm);
    document
        .querySelector("#addListButtonCancel")
        .addEventListener("click", addListcloseForm);
    document.querySelector("#addlistbutton").addEventListener("click", addList);
    registerListEventListener();
}

function registerListEventListener() {
    for (let i = 0; i < toDoList.length; i++) {
        document
            .querySelector(`#list-${i}`)
            .addEventListener("mousedown", function (e) {
                displayRight(e.target.id);
            });
        if (i > 0) {
            document
                .querySelector(`#list-del-${i}`)
                .addEventListener("mousedown", function (e) {
                    e.stopPropagation();
                    delList(e.target.id);
                });
        }
    }
}

function displayRight(inputid) {
    let id = parseInt(inputid.replace("list-", ""));
    let rightDiv = document.getElementById("rightcontent");
    pageCreator.displayCreator(rightDiv, id, toDoList);

    let theDiv = document.getElementById(inputid);
    document.querySelectorAll(`.selected`).forEach(function (el) {
        el.classList.remove("selected");
    });
    theDiv.classList.add("selected");

    document.querySelectorAll(`.btnselected`).forEach(function (el) {
        el.classList.remove("btnselected");
    });
    let theBtn = document.getElementById("list-del-" + id);
    if (theBtn) theBtn.classList.add("btnselected");
}

function delList(inputid) {
    let index = parseInt(inputid.replace("list-del-", ""));
    toDoList.splice(index, 1);
    reset(0);
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function savetoDoList() {
    if (toDoList.length > 0 || toDoList[0].getTheList().length > 0) {
        clearLocal();
    }
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    let listArr = [];
    for (let i = 0; i < toDoList.length; i++) {
        listArr.push(toDoList[i].getProjName());
    }
    localStorage.setItem("listArr", JSON.stringify(listArr));
}

function clearLocal() {
    localStorage.removeItem("toDoList");
    localStorage.removeItem("listArr");
}

function gettoDoListLoc() {
    if (storageAvailable) {
        const myArrayFromLocalStorage = localStorage.getItem("toDoList");
        const arrName = localStorage.getItem("listArr");
        if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
            let arrNameStr = JSON.parse(arrName);
            let toDoListStr = JSON.parse(myArrayFromLocalStorage);
            JSONtoList(arrNameStr, toDoListStr);
            loader();
        } else {
            loader();
        }
    } else {
        loader();
    }
}

function JSONtoList(nameArr, listArr) {
    for (let i = 0; i < nameArr.length; i++) {
        let newprojlist = projList(nameArr[i]);
        for (let j = 0; j < listArr[i].length; j++) {
            let arr = listArr[i][j].split("--");
            let listobj = ListObj(
                `${arr[0]}`,
                `${arr[1]}`,
                `${arr[2]}`,
                `${arr[3]}`,
                parseInt(arr[4])
            );
            newprojlist.pushToList(listobj);
        }
        toDoList.push(newprojlist);
    }
}

gettoDoListLoc();

export { reset };
