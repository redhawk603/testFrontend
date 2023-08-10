

// Get name and email from URL parameters
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('name');
var email = urlParams.get('email');

// Set name and email values in the form fields
document.getElementById('username').value = username || '';
document.getElementById('email').value = email || '';

var userid = ""
console.log(userid, "outside")

function back() {
    window.location.href = "index.html";

}

async function submit() {
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    console.log(name, email)
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



        try {
            const response = await
                fetch("https://test-backend-q.onrender.com/userData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email
                    }),
                })
            const result = await response.json();
            const userId = result.insertedId
            //data(userId)
            console.log(userId, "inside")
            window.location.href = "index2.html?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&_id=" + encodeURIComponent(userId);
        }

        catch (err) {
            console.log(err);
        }

    }
}

function data(data) {
    var data = data
    console.log(data, "data function")
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


async function submit2() {
    var answer1 = document.getElementById("question1").value;
    var answer2 = document.getElementById("question2").value;
    var answer3 = document.getElementById("question3").value;
    var answer4 = document.getElementById("question4").value;
    var answer5 = document.getElementById("question5").value;

    const urlParams = new URLSearchParams(window.location.search);

    // console.log(urlParams.toString())

    const userId = urlParams.get('_id');
    console.log(userId)

    // var userId = document.getElementById("userid").value;
    // console.log(userId,"div")

    // Calculate the total score based on the selected answers
    var anSum = parseInt(answer1) + parseInt(answer2) + parseInt(answer3) + parseInt(answer4) + parseInt(answer5);

    var aResult = "Muggle";
    if (answer1 === "0" || answer2 === "0" || answer3 === "0" || answer4 === "0" || answer5 === "0") {
        alert("You are a Muggle! Answer the questions!");
    }
    else if (anSum === 50 || anSum === 60 || anSum === 70 || anSum === 80) {
        aResult = "Hufflepuff";
        alert("Your results will be sent to your email by clicking the button below!");
    }
    else if (anSum === 90 || anSum === 100 || anSum === 110 || anSum === 120) {
        aResult = "Ravenclaw";
        alert("Your results will be sent to your email by clicking the button below!");
    }
    else if (anSum === 130 || anSum === 140 || anSum === 150 || anSum === 160) {
        aResult = "Gryffindor";
        alert("Your results will be sent to your email by clicking the button below!");
    }
    else if (anSum === 170 || anSum === 180 || anSum === 190 || anSum === 200) {
        aResult = "Slytherin";
        alert("Your results will be sent to your email by clicking the button below!");

    }
    else {
        alert("You are a Muggle! Answer the questions!");
    }
    anResult = aResult;
    try {
        const response = await
            fetch(`https://test-backend-q.onrender.com/userData/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    result: anResult
                }),
            })
        const result = await response.json();
        console.log(result)
    }

    catch (err) {
        console.log(err);
    }

}
anResult = aResult;

function emi(to_name, to_email, anResult, user_email) {
    var templateParams = {
        tonam: to_name,
        emil: to_email,
        result: anResult,
        usemill: user_email,

    };

    emailjs.send('Formservice', 'template_am9aazu', templateParams, "6c7eE2eVv1kXg44En")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

    alert("Your results have been sent to your email!");

};
