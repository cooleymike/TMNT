//=============MAIN FIREBASE===================================

//============================================================  
//Our To Do Constructor
var User = function (task, chirps) {
    this.task = task,
    this.chirps = chirps
}
//Central Data Container/Array
var todoArray = [];
//This variable will keep track of current item
var currId;

//Fetch data from Firebase 
var fetch = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://watchthis.firebaseio.com/.json", true);
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.response)
            callback(JSON.parse(this.response))
        }
    }
    xhr.send();
}
fetch(showresults);
fetch(showresultstopanel);

//Callback for fetch
function showresults(data) {
    var indexCounter = 0;
    var htmlstr = "<table class='table table-bordered table-condensed table-striped'>";
    for (var i in data) {
        console.log(data[i].User, data[i].chirp);
        todoArray.push({
            id: i,
            User: data[i].User,
            chirp: data[i].chirp
        })

        htmlstr += "<tr><td>";
        htmlstr += "<td>" + data[i].User + "</td>" + "<td>" + data[i].chirp + "</td>";
        htmlstr += "<td><button onclick='dodeletetodo(" + indexCounter + ")' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-scissors'></span></button></td>";
        // htmlstr += "<button onclick='doupdatetodo(" + indexCounter + ")' class='btn btn-xs btn-warning'><span class='glyphicon glyphicon-erase'></span></button>";
        htmlstr += "</td></tr>";
        indexCounter++;
    }
    htmlstr += "</table>"
    $("#ToDoList").html(htmlstr);
}
function showresultstopanel(data) {

    var indexCounter = 0;
    var htmlstrtopanel = "";
    var htmlstrtopanelName = "";
    for (var i in data) {
        console.log(data[i].User, data[i].chirp);
        todoArray.push({
            id: i,
            User: data[i].User,
            chirp: data[i].chirp
        })a 

        htmlstrtopanel += "<span class='chat-img pull-left'><img src='http://salmonriverresources.com/wp-content/uploads/2015/03/hawaiian-islands-beach-sunset-GwWz-50x50.jpg' alt='User Avatar' class='img-circle' /></span>";
        htmlstrtopanel += "<strong class='primary-font'>" + data[i].User + "</strong>";
        $("#myChirp").html(htmlstrtopanel);
        htmlstrtopanel += "<small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>12 mins ago</small>";
        htmlstrtopanel += "<li><br/>" + data[i].chirp + "</li>";
        //htmlstr += "<td><button onclick='dodeletetodo(" + indexCounter + ")' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-scissors'></span></button></td>";
        // htmlstr += "<button onclick='doupdatetodo(" + indexCounter + ")' class='btn btn-xs btn-warning'><span class='glyphicon glyphicon-erase'></span></button>";

        indexCounter++;
    }


    $("#myChirp").html(htmlstrtopanel);

}



function doaddtodo() {
    console.log($("#todotext").val())
    console.log($("#todocompleted").val())
    var newtodo = {
        User: $("#todotext").val(),
        chirp: $("#todocompleted").val()
    }
    sendToAjax(newtodo)
}
//Send to Ajax
function sendToAjax(objToPost) {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://watchthis.firebaseio.com/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            fetch(showresults);
            fetch(showresultstopanel);

        }
        else {
            //Do Something On Error
        }
    };
    request.send(JSON.stringify(objToPost));
}

//Delete Chirps
function dodeletetodo(index) {
    console.log("Index to delete:", index);
    console.log(todoArray[index])
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://watchthis.firebaseio.com/" + todoArray[index].id + "/.json", true)
    xhr.send();
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            fetch(showresults);
            fetch(showresultstopanel);
        }
        else {
            //Do Something On Error
        }

    };
}
//POLLING (reason why need to keep refreshing)
function init() {
    fetch(showresults);
    fetch(showresultstopanel);
    myTimer = setInterval(fetch(showresults), 1000);
    myTimer2 = setInterval(fetch(showresultstopanel), 1000);
}
init();