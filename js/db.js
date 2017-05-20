var fdb = new ForerunnerDB();
var db = fdb.db("myDB");


var studentCollection = db.collection('students');

// for (var i = 0; i < 10; i++) {
// 	var newStudent = {
// 		name: "Orange" + i,
// 		age: 10 + i
// 	}
// 	studentCollection.insert(newStudent)
// }
// studentCollection.save()


studentCollection.load()

function afterLoad() {
    var students = studentCollection.find();
    console.log(students)
    for (var i = 0; i < students.length; i++) {
    	console.log(students[i]._id);
    	$("#studentsTable").append("<tr><td class='studentsId'>"+students[i]._id+"</td><td>"+students[i].name+"</td></tr>");
    }
    $(".studentsId").click(function(){
    	var studentId = $(this).text();
    	console.log(studentId)

    	var query = {
    		_id: studentId
    	}
    	var student = studentCollection.find(query)[0];

    	$("#studentsName").text(student.name);
    	$("#studentsAge").text(student.age);
    	$("#studentsId").text(student._id);

    	$("#studentsInfo").modal('show');
    });
}

setTimeout(afterLoad, 500);

function addData() {
	var name = $("#newName").val();
	var age = $("#age").val() ;
	var newStudent = {
    name: name,
    age: age
};
studentCollection.insert(newStudent);
studentCollection.save();
var student = studentCollection.find(newStudent)[0];
console.log(student);

$("#studentsTable").append("<tr><td class='studentsId'>"+student._id+"</td><td>"+student.name+"</td></tr>");
}
$("#addData").click(addData) 