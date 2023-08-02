

function aleh() {
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var validRegex = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
    if (name === "") {
        alert("Please enter your name!");
    } else if (email === "") {
        alert("Please enter your email!");
    }
    else if (!email.match(validRegex)) {
        alert("Please enter a valid email!");
    }

    else {
        alert("Hello " + name + "! " + "Your results will be sent to " + email + ".");
        window.location.href = "index2.html?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email);
    }
}

function ValidateEmail(email) {



    if (input.value.match(validRegex)) {

        alert("Valid email address!");

        document.form1.text1.focus();

        return true;

    } else {

        alert("Invalid email address!");

        document.form1.text1.focus();

        return false;

    }

}
