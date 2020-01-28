$(document).ready(function() {

    var loginInput = $("#login-input");
    var passwordInput = $("#password-input");

    $(document).on("click", ".login-button", handleLoginPress);
    $(document).on("click", ".register-button", handleCreateAccountPress);

//login button
//redirects to authentication then to userPlaylists
function handleLoginPress(e){
    e.preventDefault();
    if (!loginInput || !passwordInput) {
        alert("Please enter your username and password");
        return;
    }
    $.ajax('/api/users/login', {
        data: {
          username: $('.login-input').val().trim(),
          password: $('.password-input').val().trim()
        },
        type: "POST"
    }).then(function(response) {
        if (response.username) {
            console.log("Logged In!");
            location.replace('/profile');
        }
        });
};

function handleCreateAccountPress(e){
    e.preventDefault();
    console.log("cool")
    if (!loginInput || !passwordInput) {
        alert("Please enter your username and password");
        return;
    }
    $.ajax('/api/users/register', {
        data: {
          username: $('.login-input').val().trim(),
          password: $('.password-input').val().trim()
        },
        type: "POST"
    }).then(function(response) {
        if (response.username) {
            console.log("Logged In!");
            location.replace('/profile');
        }
    });
    
}
});
