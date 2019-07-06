$(function () {

    $.ajaxSetup({
        xhref:{
            withCredentials: true
        }

    });

    let base_url = 'http://localhost:3000/';


    $("#signup-btn").on('click', function (e) {
        e.preventDefault();
        let users = {
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        username: $("#uname").val(),
        password: $("#pass").val()
        };

        $.ajax({
            type: 'POST',
            url: base_url + 'users/signup',
            data: users,
            success: function (user) {
               alert("signup success");
               window.location="login.html";
            },
            error: function () {
                alert("signup failed");
            }
        });
    });

});


