var apiUrl = "http://localhost:8080/api/vms/vehicle/";


if (localStorage.getItem("datas") == null) {
    location.href = "login.html";
}


var val= JSON.parse(localStorage.getItem("datas"));
JSON.parse(localStorage.datas).fullMane;
document.getElementById("topBarName").innerHTML=val["fullName"];

function logout()
{
    localStorage.clear();
}

