var jsonDept = [
    { 'SNAME': 'Astro Club' },

    { 'SNAME': 'Coding Club' },

    { 'SNAME': 'CrAC' },

    { 'SNAME': 'Dance Club' },

    { 'SNAME': 'ELAS' },

    { 'SNAME': 'Embryo Club' },

    { 'SNAME': 'Fashp' },

    { 'SNAME': 'FMac' },

    { 'SNAME': 'Gurukul' },

    { 'SNAME': 'Matrix' },

    { 'SNAME': 'Mime Club' },

    { 'SNAME': 'Mountaineering and Adventure Club (MAC)' },

    { 'SNAME': 'Music Club' },

    { 'SNAME': 'Nirmaan' },

    { 'SNAME': 'NSS' },

    { 'SNAME': 'OEP' },

    { 'SNAME': 'Oasis Hindi Press' },

    { 'SNAME': 'Photog' },

    { 'SNAME': 'Punjabi Cultural Association (PCA)' },

    { 'SNAME': 'Radioaktiv Club' },

    { 'SNAME': 'Ragamalika' },

    { 'SNAME': 'Renewable Energy Club' },

    { 'SNAME': 'WRS' },

    { 'SNAME': 'Poetry Club' },

    { 'SNAME': 'HAS' },

    { 'SNAME': 'ARBITS' },

    { 'SNAME': 'Public Policy Club' },

    { 'SNAME': 'AUDI FORCE' },

    { 'SNAME': 'DLE' },

    { 'SNAME': 'BOSM Sponz' },
    

    { 'SNAME': 'NSS(BOSM)' },

    { 'SNAME': 'DoPy' },

    { 'SNAME': 'Department of Theatre' },

    { 'SNAME': 'Department of firewallz' },

    { 'SNAME': 'INFORMALZ' },

    { 'SNAME': 'Lights' },

    { 'SNAME': 'SMAC' },

    { 'SNAME': 'SOVESA' },

    { 'SNAME': 'SSMS' },

    { 'SNAME': 'Drama Club' },

    { 'SNAME': 'SU' },

    { 'SNAME': 'Union Council' },

    { 'SNAME': 'CRC' },

    { 'SNAME': 'StuCCA' },

    { 'SNAME': 'The Eastern Outlook' },

    { 'SNAME': 'Sounds' },

    { 'SNAME': 'Stage Controls' },

    { 'SNAME': 'ADP' },

    { 'SNAME': 'Controls' },

    { 'SNAME': 'DVM' },

    { 'SNAME': 'PCr' },

    { 'SNAME': 'RecnAcc' },

    { 'SNAME': 'Sponz' },

    { 'SNAME': 'President' },

    { 'SNAME': 'General Secretary' }

]

var deptName = [];
    for (var i = 0; i < jsonDept.length; i++) {
        var obj = jsonDept[i];
        deptName.push(obj.SNAME);

    }

var jsonDeptString = JSON.stringify(jsonDept)

// function dept()
// {
//     var obj=document.getElementById("dept");
//     obj.style.display="block";
// }
var c=0;
function students() {
    var obj = document.getElementById("students");
    var initial_row = document.getElementById("initial_row");
    var rec = document.getElementById("add_record");
    if (c == 0) {
        obj.style.display = "block";
        c++;
    }
    else if (c > 0) {
        var record = document.getElementById("students_table");
        var row = record.insertRow(c);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = "Standing " + c;
        cell2.innerHTML = "Students : <textarea class = 'blank students students" + c + "'></textarea>";
        cell3.innerHTML = "Name : <div class = 'autocomplete' ><input type='text' class='blank rows row" + c + "'> </div>";
        c++;
    }

    var currentName = document.getElementsByClassName("rows")[c - 1];
    var currentStudents = document.getElementsByClassName("students")[c - 1];
    currentName.addEventListener("keydown", function (e) {
      if (e.keyCode == 13 && currentName.value != "" && document.querySelectorAll("#autocomplete-list div").length == 0) {
            if (currentStudents.value == "") {
                currentStudents.value = currentName.value;
            }
            else {
                currentStudents.value += ", " + currentName.value;
            }

            currentName.value = "";
        }
    });

    autocomplete(currentName, countries);

    console.log(c);
}

autocomplete(document.getElementById("deptName"), deptName);

document.getElementById("submitBtn").addEventListener("click", function (f) {
    var deptName = document.getElementById("deptName").value;
    var rows = [];
    var rowCounter = 0;
    var students = document.getElementsByClassName("students");
    for (var k = 0; k < students.length; k++) {
      if (students[k].value != "") {
        rows[rowCounter] = {
            level: rowCounter,
            people: students[k].value
        }
        rowCounter++;
      }
    }

    var json = {
        entry: deptName,
        rows: rows
    };

    console.log(json);

    URL = "http://bits-oasis.org/oasis-snaps/submit";
    $.ajax({
        type:'POST',
        contentType: 'application/json',
        url: URL,
        data: json,
        dataType: "json",
        error:function(xhr,textstatus,err){
            console.log('error');
        }
    }).done(function(response){
        console.log(response.message);
    });

	f.preventDefault();


});
