var turtles=[];

function turtle(TurtleName, TurtleWeapon, TurtleColor){
    this.name = TurtleName;
    this.weapon = TurtleWeapon;
    this.color = TurtleColor;
}


// general placeholder
var guid;

////
$('#target').click(function(){
    var name = $('#AddTurtleName').val();
    var weapon = $('#AddTurtleWeapon').val();
    var color = $('#AddTurtleColor').val();  
    var newTurtle = new turtle(name, weapon, color);

    turtles.push(newTurtle);
    console.log(turtles.sort(function (a, b) { return a.name > b.name; }));
    var tRtl = $('#newturtle');
    tRtl.empty();
    for (var i = 0; i < turtles.length; i++) {
        var tds = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="Deleteturtle(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Add to Firebase</button></td></tr>';

        tRtl.append(tds);
        console.log("this button is working")
    }

})
// Ajax post
function AJAX(i) {
    console.log("working");
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", "https://tmnturtles.firebaseio.com/.json", true);
    xhr.onload = function() {
        if(this.status >=200 && this.status < 400){
            console.log("success");
        } else {
            console.log("error on send");

        }
    }
    xhr.send(JSON.stringify(turtles[i]));
}

         //Save
        function doSave(){
            turtles[guid].name = $("#editName").val();
            turtles[guid].weapon = $("#editWeapon").val();
            turtles[guid].color = $("#editColor").val();
            var tRes = $("#newturtle");
            console.log("working");
            tRes.empty();
            for (var i = 0; i < turtles.length; i++){
        
                var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="Deleteturtle(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
                tRes.append(dis);
            }
        }

        



        //Edit
        var turtleUpdate;
        function editTurtle(tempid){
            turtleUpdate = tempid;
            guid = tempid;
            var tempTurtle = turtles[tempid];
            $("#editName").val(tempTurtle.name);
            $("#editWeapon").val(tempTurtle.weapon);
            $("#editColor").val(tempTurtle.color);
    
            $("#myEditModal").modal("show");
            console.log(tempTurtle);
            console.log(turtleUpdate);
            var tRes = $("#newturtle");
            tRes.empty();
            for(var i = 0; i < turtles.length; i++){

                var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="Deleteturtle(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
                tRes.append(dis);
            }
        }
        
        //Delete
        function Deleteturtle(i) {
            turtles.splice(i, 1);
            var tRes = $('#newturtle');
            tRes.empty();
            console.log("workingbutton")
            for (var i = 0; i < turtles.length; i++) {

                var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="Deleteturtle(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
                tRes.append(dis);
            }
        }





    
