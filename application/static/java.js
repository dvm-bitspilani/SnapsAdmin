var jsonDept = [

        {
            'SNAME': "Coding Club"
        },
        {
            'SNAME': "Audi Force "
        },
        {
            'SNAME': "Photography Club "
        },
        {
            'SNAME': "Firewallz "
        },
        {
            'SNAME': "Informalz "
        },
        {
            'SNAME': "Hindi Activities Society"
        },
        {
            'SNAME': "Dept. of Photography "
        },
        {
            'SNAME': "Creative Activities Club "
        },
        {
            'SNAME': "Gaming Club"
        },
        {
            'SNAME': "English Press Club "
        },
        {
            'SNAME': "Dept. of Live Events "
        },
        {
            'SNAME': "BITS Firefox Community "
        },
        {
            'SNAME': "Hindi Press Club "
        },
        {
            'SNAME': "Radioaktiv "
        },
        {
            'SNAME': "Sounds"
        },
        {
            'SNAME': "Lights "
        },
        {
            'SNAME': "BOSM Publicity Team "
        },
        {
            'SNAME': "Rec. & Acc "
        },
        {
            'SNAME': "Dept. of Controls "
        },
        {
            'SNAME': "Dept. of Sponsorship "
        },
        {
            'SNAME': "Department of PCr "
        },
        {
            'SNAME': "SFC "
        },
        {
            'SNAME': "CoSSAc Body "
        },
        {
            'SNAME': "Athletics(Boys) "
        },
        {
            'SNAME': "Athletics (Girls) "
        },
        {
            'SNAME': "Badminton (Boys) "
        },
        {
            'SNAME': "Badminton (Girls) "
        },
        {
            'SNAME': "Basketball (Boys)"
        },
        {
            'SNAME': "Basketball (Girls) "
        },
        {
            'SNAME': "Carrom "
        },
        {
            'SNAME': "Power Lifting "
        },
        {
            'SNAME': "Pool "
        },
        {
            'SNAME': "Football (Boys) "
        },
        {
            'SNAME': "Football (Girls) "
        },
        {
            'SNAME': "Hockey (Boys) "
        },
        {
            'SNAME': "Lawn Tennis (Boys) "
        },
        {
            'SNAME': "Lawn Tennis (Girls) "
        },
        {
            'SNAME': "Chess "
        },
        {
            'SNAME': "Swimming "
        },
        {
            'SNAME': "Squash (Boys) "
        },
        {
            'SNAME': "Table Tennis (Boys) "
        },
        {
            'SNAME': "Table Tennis (Girls) "
        },
        {
            'SNAME': "Volleyball (Boys) "
        },
        {
            'SNAME': "Volleyball (Girls) "
        },
        {
            'SNAME': "Taekwondo "
        },
        {
            'SNAME': "Cricket (Boys) "
        },
        {
            'SNAME': "Captains "
        },
        {
            'SNAME': "Sports Union "
        },
        {
            'SNAME': "Sports Council "
        },
        {
            'SNAME': "SMAC "
        },
        {
            'SNAME': "SSMS "
        },
        {
            'SNAME': "National Service Scheme "
        },
        {
            'SNAME': "HCA "
        },
        {
            'SNAME': "Embryo "
        },
        {
            'SNAME': "MAC "
        },
        {
            'SNAME': "Gurukul "
        },
        {
            'SNAME': "ELAS"
        }

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

    URL = "http://bits-dvm.org/bosm-snaps/submit";
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
