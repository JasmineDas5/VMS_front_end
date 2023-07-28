function roleData() {
    $.ajax({
        type: 'POST',
        url: apiUrl + "getRoleDropdown",
        // data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            if (response["status"] == 1) {
                $("#exampleRoleName").empty();
                $("#exampleRoleName").append("<option value='0'>Select Role Name</option>")
                $.each(response.data.allRoleDetails, function (key, val) {
                    $("#exampleRoleName").append("<option value='" + val.id + "'>" + val.roleName + "</option>")
                }
                );

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                }).then(function () {
                    location.reload();
                });
            }
            console.log(response);
        }
    });


}
function roleChange(roleId) {
    if (roleId == 4) {
        $("#dlDiv").css("display", "block");
    }
    else {
        $("#dlDiv").css("display", "none");
    }

}

function registerUser() {
    var dataDetails = {
        fullName: document.getElementById("exampleFullName").value,
        emailId: document.getElementById("exampleInputEmail").value,
        phoneNo: document.getElementById("examplePhoneNo").value,
        address: document.getElementById("exampleInputAddress").value,
        roleId: document.getElementById("exampleRoleName").value,
        password: document.getElementById("exampleInputPassword").value
    }
    var newData = new FormData();
    newData.append("data", JSON.stringify(dataDetails));
    if (document.getElementById("exampleDl").value != null && document.getElementById("exampleDl").value != "") {
        newData.append("dlImage", document.getElementById("exampleDl").files[0]);
    }
    if (document.getElementById("exampleAadhar").value != null && document.getElementById("exampleAadhar").value != "") {
        newData.append("aadharImage", document.getElementById("exampleAadhar").files[0]);
    }
    if (document.getElementById("examplePanCard").value != null && document.getElementById("examplePanCard").value != "") {
        newData.append("panImage", document.getElementById("examplePanCard").files[0]);
    }
    console.log(JSON.stringify(newData));

    $.ajax({
        type: 'POST',
        url: apiUrl + "registerUserDetails",
        data: newData,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            if (response["status"] == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Good job!',
                    text: 'User inserted successfully!'
                }).then(function () {
                    location.reload();
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                }).then(function () {
                    location.reload();
                });
            }
        },
        error: function (textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        }
    });
}

function getUser() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getAllUserDetails",
        cache: false,
        processData: false,
        contentType: false,

        success: function (response) {
            if (response["status"] == 1) {
                $("#userTable").DataTable({
                    "bDestroy": true,
                    columns: [
                        { title: 'Full Name', data: 'fullName' },
                        { title: 'Email Id', data: 'emailId' },
                        { title: 'Phone No', data: 'phoneNo' },
                        { title: 'Address', data: 'address' },
                        { title: 'Role Name', data: 'roleName' },
                        {
                            title: 'Action', data: function (row, type, val, meta) {

                                return '<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog" aria-hidden="true"></i></button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li><a class="dropdown-item" href="#" onclick="viewDetails(' + row.id + ')">View Details</a></li><li><a class="dropdown-item" href="#" onclick="editDetails(' + row.id + ')">Edit Details</a></li></ul></div>';
                            }
                        }
                    ],
                    data: response.data.AllDetails
                });

            } else {
                alert("Unable to load");
            }

        }
    });
}

function viewDetails(id) {
    var data = new FormData();
    data.append("id", id);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getUserDetails",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                $("#myModal").modal('show');
                var dats = response.data.SomeDetails;
                var image1 = response.data.panImage;
                var image2 = response.data.aadharImage;
                var image3 = response.data.dlImage;
                document.getElementById("id").innerHTML = dats.id;
                document.getElementById("full_name").innerHTML = dats.fullName;
                document.getElementById("email_id").innerHTML = dats.emailId;
                document.getElementById("address").innerHTML = dats.address;
                document.getElementById("phone_nos").innerHTML = dats.phoneNo;
                document.getElementById("role_name").innerHTML = dats.roleName;
                // if (image1 != null) {
                //     $("#pan_image").attr("src", '../uploads/' + image1);
                // }
                // if (image1 != null) {
                //     document.getElementById("aadhar_image").innerHTML = image2.aadharNo;
                // }
                // if (image1 != null) {
                //     document.getElementById("dl_image").innerHTML = image3.dl;
                // }
            } else {
                alert("Invalid inputs");
            }
            console.log(response);
        }
    });
}

function editDetails(id) {
    var data = new FormData();
    data.append("id", id);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getUserDetails",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                $("#myModalEdit").modal('show');
                roleData();
                var dats = response.data.SomeDetails;
                document.getElementById("edit_id").value = dats.id;
                document.getElementById("edit_Fname").value = dats.fullName;
                document.getElementById("edit_email_id").value = dats.emailId;
                document.getElementById("edit_address").value = dats.address;
                document.getElementById("edit_phone_no").value = dats.phoneNo;
                document.getElementById("exampleRoleName").value = dats.roleId;

            } else {
                alert("Invalid input");
            }
            console.log(response);
        }
    });
}

function editUserDetails() {
    var editdata = new FormData();
    editdata.append("id", document.getElementById("edit_id").value);
    editdata.append("fullName", document.getElementById("edit_Fname").value);
    editdata.append("emailId", document.getElementById("edit_email_id").value);
    editdata.append("address", document.getElementById("edit_address").value);
    editdata.append("phoneNo", document.getElementById("edit_phone_no").value);
    editdata.append("roleId", document.getElementById("exampleRoleName").value);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/updateUserDetails",
        data: editdata,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                Swal.fire(
                    'Good job!',
                    'Your data is saved ',
                    'success'
                ).then(function () {
                    location.reload();
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
            console.log(response);
        }
    });
}