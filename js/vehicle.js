function registerVehicle() {
    var newData = {
        vehicleName: document.getElementById("exampleVehicleName").value,
        vehicleNo: document.getElementById("exampleVehNo").value,
        model: document.getElementById("exampleModel").value,
        rcNo: document.getElementById("exampleInputRc").value,
        chassisNo: document.getElementById("exampleChassisNo").value,
        engineNo: document.getElementById("exampleEngineNo").value,
        ownerId: document.getElementById("exampleOwner").value
    }
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/createVehicleDetails",
        data: JSON.stringify(newData),
        contentType: "application/json",
        success: function (response) {
            if (response["status"] == 1) {
                Swal.fire(
                    'Good job!',
                    'Vehicle inserted successfully!',
                    'success'
                ).then(function(){
                    location.reload();
                }); 

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
        }
        // error: function (textStatus, errorThrown) {
        //     alert(textStatus, errorThrown);
        // }
    });
}

function getVehicleDetails() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getAllVehicleDetails",
        cache: false,
        processData: false,
        contentType: false,

        success: function (response) {
            if (response["status"] == 1) {
                $("#vehicleTable").DataTable({
                    "bDestroy": true,
                    columns: [
                        { title: 'Vehicle No', data: 'vehicleNo' },
                        { title: 'Vehicle Name', data: 'vehicleName' },
                        { title: 'Model', data: 'model' },
                        { title: 'Registration Certificate', data: 'rcNo' },
                        { title: 'Chassis No', data: 'chassisNo' },
                        { title: 'Engine No', data: 'engineNo' },
                        { title: 'Driver', data: 'fullName' },
                        {
                            title: 'Action', data: function (row, type, val, meta) {

                                return '<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog" aria-hidden="true"></i></button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li><a class="dropdown-item" href="#" onclick="viewVehicleDetails(' + row.id + ')">View Details</a></li><li><a class="dropdown-item" href="#" onclick="editVehicle(' + row.id + ')">Edit Details</a></li><li><a class="dropdown-item" href="#" onclick="assignDriver(' + row.id + ')">Assign Driver</a></li><li><a class="dropdown-item" href="#" onclick="unassignDriver(' + row.id + ')">Unassign Driver</a></li></ul></div>';
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

function viewVehicleDetails(id) {
    var data = new FormData();
    data.append("id", id);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getVehicleDetails",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                $("#myVehicleModal").modal('show');
                var dats = response.data.SomeDetails;
                document.getElementById("vehicle_no").innerHTML = dats.vehicleNo;
                document.getElementById("vehicle_name").innerHTML = dats.vehicleName;
                document.getElementById("model").innerHTML = dats.model;
                document.getElementById("rc_no").innerHTML = dats.rcNo;
                document.getElementById("chassis_no").innerHTML = dats.chassisNo;
                document.getElementById("engine_no").innerHTML = dats.engineNo;
                document.getElementById("driver_name").innerHTML = dats.fullName;

            } else {
                alert("Invalid inputs of data");
            }
            console.log(response);
        }
    });
}

function editVehicle(id) {
    var data = new FormData();
    data.append("id", id);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getVehicleDetails",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                $("#myModalVehicleEdit").modal('show');
                var dats = response.data.SomeDetails;
                document.getElementById("edit_id_vehicle").value = dats.id;
                document.getElementById("edit_Vno").value = dats.vehicleNo;
                document.getElementById("edit_veh_name").value = dats.vehicleName;
                document.getElementById("edit_model").value = dats.model;
                document.getElementById("edit_rcNo").value = dats.rcNo;
                document.getElementById("edit_chassis_no").value = dats.chassisNo;
                document.getElementById("edit_engine_no").value = dats.engineNo;

            } else {
                alert("Invalid input");
            }
            console.log(response);
        }
    });
}

function editVehicleDetails() {
    var editdata = new FormData();
    editdata.append("id", document.getElementById("edit_id_vehicle").value);
    editdata.append("vehicleNo", document.getElementById("edit_Vno").value);
    editdata.append("vehicleName", document.getElementById("edit_veh_name").value);
    editdata.append("model", document.getElementById("edit_model").value);
    editdata.append("rcNo", document.getElementById("edit_rcNo").value);
    editdata.append("chassisNo", document.getElementById("edit_chassis_no").value);
    editdata.append("engineNo", document.getElementById("edit_engine_no").value);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/updateVehicleDetails",
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
                ).then(function(){
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

function driverData() {
    $.ajax({
        type: 'POST',
        url: apiUrl + "getDriverDropdown",
        // data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            if (response["status"] == 1) {
                $("#exampleDriver").empty();
                $("#exampleDriver").append("<option value='0'>Select Driver Name</option>")
                $.each(response.data.allDriverDetails, function (key, val) {
                    $("#exampleDriver").append("<option value='" + val.id + "'>" + val.fullName + "</option>")
                }
                );

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

function assignDriver(id) {
    var data = new FormData();
    data.append("id", id);
    document.getElementById("id_vehicle").value = data.id;
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getDriverDropdown",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                $("#myVehicleDriver").modal('show');
                document.getElementById("id_vehicle").value = id;
            } else {
                alert("Invalid input");
            }
            console.log(response);
        }
    });
}

function editDriver() {
    var data = new FormData();
    data.append("id", document.getElementById("id_vehicle").value);
    data.append("driverId", document.getElementById("exampleDriver").value);
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getDriverAssigned",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                Swal.fire(
                    'Good job!',
                    'Driver is assigned',
                    'success'
                ).then(function(){
                    location.reload();
                }); 
            } else {
                alert("Invalid input");
            }
            console.log(response);
        }
    });
}

function unassignDriver(id) {
    var data = new FormData();
    data.append("id", id);
    // document.getElementById("id_vehicle").value = data.id;
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/vms/vehicle/getDriverUnassigned",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response["status"] == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Done...',
                    text: 'The driver is sucessfully unassigned!!!'
                }).then(function(){
                    location.reload();
                });  
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!!!'
                });

            }
            console.log(response);
        }
    });
}

function ownerData() {
    $.ajax({
        type: 'POST',
        url: apiUrl + "getOwnerDropdown",
        // data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            if (response["status"] == 1) {
                $("#exampleOwner").empty();
                $("#exampleOwner").append("<option value='0'>Select Owner Name</option>")
                $.each(response.data.allOwnerDetails, function (key, val) {
                    $("#exampleOwner").append("<option value='" + val.id + "'>" + val.fullName + "</option>")
                }
                );

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
