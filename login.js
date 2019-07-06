

    $(function(){
        $.ajaxSetup({
            xhrFields:{
                withCredentials:true
            }
        })
    });



    $("#login-form").on('submit', function (e) {
        e.preventDefault();
        let user = {
            name: $("#username").val(),
            desc: $("#password").val(),
    
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/login',
            data: user,
            success: function (reply) {
               reply.alert("logging in");
            
            },
            error: function (reply) {
                alert("Fill all the form fields!");
                location.reload();
            }
        });
    });


