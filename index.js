
const express = require('express');
const app =express();
const bodyParser= require("body-parser");
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3003, function() {
    console.log("The server is running!");
    

    })
 

var task = [];
 
var complete = [];
 
app.post("/addtask", function(req, res) {
var newTask = req.body.newtask;
task.push(newTask);
res.redirect("/");
});


 
app.post("/removetask", function(req, res) {
var completeTask = req.body.check;
//check for the “typeof” the different completed task, then add into the complete task
if (typeof completeTask === "string") {
complete.push(completeTask);
//check if the completed task already exits in the task when checked, then remove it
task.splice(task.indexOf(completeTask), 1);
} else if (typeof completeTask === "object") {
for (var i = 0; i < completeTask.length; i++) {
complete.push(completeTask[i]);
task.splice(task.indexOf(completeTask[i]), 1);
}
}
res.redirect("/");
});

app.post("/clear", function(req, res){
     task = [];
 
     complete = [];
    res.redirect("/");
   
});
 
//render the ejs and display added task, completed task
app.get("/", function(req, res) {
res.render("index", { task: task, complete: complete });
});
 














