var fdb = new ForerunnerDB();
var db = fdb.db("myDB");


var studentCollection = db.collection('students');
var parentCollection = db.collection('parent');

// for (var i = 0; i < 10; i++) {
// 	var newStudent = {
// 		name: "Orange" + i,
// 		age: 10 + i
// 	}
// 	studentCollection.insert(newStudent)
// }
// studentCollection.save()


studentCollection.load()
parentCollection.load()

function createHTMLString(_id, name) {

    return "<tr><td class='studentsId'>" + _id + "</td><td>" + name + "</td><td><button class='updateButton btn btn-warning' data-id='" + _id + "''>修改</button><button class='deleteButton btn btn-danger' data-id='" + _id + "''>刪除</button></td></tr>";

}
function createParentHTMLString(_id, name) {
    return"<option value='"+_id+"'>"+name+"</option>"
}

function afterLoad() {
    var students = studentCollection.find();
    console.log(students)
    for (var i = 0; i < students.length; i++) {
        console.log(students[i]._id);
        $("#studentsTable").append(createHTMLString(students[i]._id, students[i].name));
    }

    var parents = parentCollection.find();
    console.log(parents)
    for (var i = 0; i < parents.length; i++) {
        console.log(parents[i]._id);
        $("#parent-id").append(createParentHTMLString(parents[i]._id, parents[i].name));
        $("#updateParent-id").append(createParentHTMLString(parents[i]._id, parents[i].name));    
    }

    $("#studentsTable").on("click", ".studentsId", function() {
        var studentId = $(this).text();
        console.log(studentId)

        var query = {
            _id: studentId
        }
        var student = studentCollection.find(query)[0];

        $("#studentsName").text(student.name);
        $("#studentsAge").text(student.age);
        $("#studentsGender").text(student.gender);
        $("#studentsId").text(student._id);
        $("#studentsParent").text(student.parentID);

        $("#studentsInfo").modal('show');

    });
}

setTimeout(afterLoad, 500);

function addData() {
    var name = $("#newName").val();
    var age = $("#newAge").val();
    var gender = $("#newGender").val();
    var parentID = $("#parents-id").val()
    var newStudent = {
        name: name,
        age: age,
        gender: gender,
        parentID:parentID
    };
    studentCollection.insert(newStudent);
    studentCollection.save();
    var student = studentCollection.find(newStudent)[0];
    console.log(student);

    $("#studentsTable").append(createHTMLString(student._id, student.name));
}

function gtAge(){
    var gtAge = $("#gtAge").val();
    console.log(gtAge);
    var selectedClasse=[]

    if ($("#male").prop("checked")) {
     selectedClasse.push("男")
}
     if ($("#female").prop("checked")) {
     selectedClasse.push("女")
 }
    var result = studentCollection.find({
    age: {
        $gte: gtAge/1
    },
    gender:{
        $in:selectedClasse
    }

});
    console.log(result);

    $("#studentsTable").find("tr").remove();

    for (var i = 0; i < result.length; i++) {
        console.log(result[i]._id);
        $("#studentsTable").append(createHTMLString(result[i]._id, result[i].name));
    }
}

$("#addData").click(addData)
$("#search").click(gtAge)



function deleteData() {
    var id = $(this).attr("data-id")
    console.log(id)

    studentCollection.remove({
        _id: id
    });
    studentCollection.save()

    $(this).parents("tr").remove()
}
$("#studentsTable").on("click", ".deleteButton", deleteData)

function updateDate() {
    var studentId = $(this).attr("data-id");
    console.log(studentId)

    var query = {
        _id: studentId
    }
    var student = studentCollection.find(query)[0];

    $("#updateName").val(student.name);
    $("#updateAge").val(student.age);
    $("#updateGender").val(student.gender);
    $("#updateParent-id").val(student.parentID);
     $("#updateSave").attr("data-id",studentId);

    $("#updateDateModal").modal('show');
}

$("#studentsTable").on("click", ".updateButton", updateDate)

function updateSave(){
    var studentId = $(this).attr("data-id");
    console.log(studentId)
    var name = $("#updateName").val();
    var age = $("#updateAge").val();
    var gender = $("#updateGender").val();
    var parentID = $("#updateParent-id").val();
    var newStudent = {
        name: name,
        age: age,
        gender: gender,
        parentID: parentID

    };
    studentCollection.updateById(studentId,newStudent);
    studentCollection.save();
    $("#updateDateModal").modal('hide');
}

$("#updateSave").on("click",updateSave)