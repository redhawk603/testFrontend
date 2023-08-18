

// Get name and email from URL parameters
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('name');
var email = urlParams.get('email');

// Set name and email values in the form fields
document.getElementById('username').value = username || '';
document.getElementById('email').value = email || '';

var userId = ""
console.log(userId, "outside")



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




        try {
            document.getElementById("page1Btn").innerHTML = ""
            let btn = document.getElementById("page1Btn")
            btn.classList.add("loading")
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
            userId = result.result.insertedId
            console.log({ userId }, result.result.insertedId)
            btn.classList.remove("loading")
            document.getElementById("page1Btn").innerHTML = "Submit"
            //data(userId)
            console.log(result)
            alert(result.msg)
            alert("Hello " + name + "! " + "Your results will be sent to " + email + ".");

            window.location.href = "index2.html?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&_id=" + encodeURIComponent(userId) ;
            // document.getElementById("username").value = name;
            // document.getElementById("useremail").value = email;

        }
        catch (err) {
            document.getElementById("page1Btn").innerHTML = ""
            let btn = document.getElementById("page1Btn")
            btn.classList.add("loading")
            console.log(err);
            alert("This email already exists in the database.")
            btn.classList.remove("loading")
            document.getElementById("page1Btn").innerHTML = "Submit"
        }


    }
}

function declareData(name, email) {
    const username = urlParams.get('name');
    const useremail = urlParams.get('email');
    document.getElementById("username").innerHTML = username;
    document.getElementById("useremail").innerHTML = useremail;
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

// var resultDesc = "";
async function submit2() {
    var answer1 = document.getElementById("question1").value;
    var answer2 = document.getElementById("question2").value;
    var answer3 = document.getElementById("question3").value;
    var answer4 = document.getElementById("question4").value;
    var answer5 = document.getElementById("question5").value;

    const urlParams = new URLSearchParams(window.location.search);

    // console.log(urlParams.toString())

    const userId = urlParams.get('_id');
    console.log(userId, username, useremail)

    // var userId = document.getElementById("userid").value;
    // console.log(userId,"div")

    // Calculate the total score based on the selected answers
    var anSum = parseInt(answer1) + parseInt(answer2) + parseInt(answer3) + parseInt(answer4) + parseInt(answer5);
    var GryffindorViews = 0
    var HufflepuffViews = 0
    var RavenclawViews = 0
    var SlytherinViews = 0
    var aResult = "Muggle";
    var reDesc = "normal person. Please answer the questions";
    if (answer1 === "0" || answer2 === "0" || answer3 === "0" || answer4 === "0" || answer5 === "0") {
        alert("You are a Muggle! Answer the questions!");
    }
    else if (anSum === 50 || anSum === 60 || anSum === 70 || anSum === 80) {
        aResult = "Hufflepuff";
        reDesc = "loyal and friendly person! People enjoy being around you, and you can always put a smile on someone's face. You are a hard worker and are always willing to help others. You are a great friend to have";
        alert("Your results will be sent to your email by clicking the button below!");
        var HufflepuffViews = HufflepuffViews + 1
    }
    else if (anSum === 90 || anSum === 100 || anSum === 110 || anSum === 120) {
        aResult = "Ravenclaw";
        reDesc = "intelligent and creative person! You are always looking for new ways to learn and grow. You are a great problem solver and are always willing to help others. You are very intelligent"
        alert("Your results will be sent to your email by clicking the button below!");
        var RavenclawViews = RavenclawViews + 1
    }
    else if (anSum === 130 || anSum === 140 || anSum === 150 || anSum === 160) {
        aResult = "Gryffindor";
        reDesc = "brave and courageous person! You are always willing to stand up for what you believe in and are not afraid to take risks. You are a great leader and are always willing to help others. You are very brave"
        alert("Your results will be sent to your email by clicking the button below!");
        var GryffindorViews = GryffindorViews + 1
    }
    else if (anSum === 170 || anSum === 180 || anSum === 190 || anSum === 200) {
        aResult = "Slytherin";
        reDesc = "ambitious and cunning person! You are always looking for new ways to get ahead and are not afraid to take risks. You are a great leader and are always willing to help others. You are very ambitious";
        alert("Your results will be sent to your email by clicking the button below!");
        var SlytherinViews = SlytherinViews + 1;

    }
    else {
        alert("You are a Muggle! Answer the questions!");
    }

    anResult = aResult;
    resultDesc = reDesc;
    console.log(GryffindorViews, HufflepuffViews, RavenclawViews, SlytherinViews,"submit 2")
    console.log(resultDesc)
    document.getElementById("page2Btn").innerHTML = ""

    const emailButton = document.querySelector("#emailBtn");

    let btn = document.getElementById("page2Btn")
    btn.classList.add("loading")
    try {
        emailButton.setAttribute('disabled', 'disabled')
        const response = await
            fetch(`https://test-backend-q.onrender.com/userData/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    result: anResult,
                    views: {
                        GryffindorViews: GryffindorViews,
                        HufflepuffViews: HufflepuffViews,
                        RavenclawViews: RavenclawViews,
                        SlytherinViews: SlytherinViews
                    }

                }),
            })
        const result = await response.json();
        console.log(result)
        btn.classList.remove("loading")
        document.getElementById("page2Btn").innerHTML = "Submit"
        // emi(userId, username, useremail, GryffindorViews, HufflepuffViews, RavenclawViews, SlytherinViews)
        // window.location.href = "index2.html?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&_id=" + encodeURIComponent(userId) + "?GryffindorViews=" + encodeURIComponent(GryffindorViews) + "&HufflepuffViews=" + encodeURIComponent(HufflepuffViews) + "&RavenclawViews=" + encodeURIComponent(RavenclawViews) + "&SlytherinViews=" + encodeURIComponent(SlytherinViews) ;
       console.log(112233)
        await viewData()
        history.pushState({}, null, `index2.html?name=${username}&email=${useremail}&_id=${userId}&GryffindorViews=${GryffindorViews}&HufflepuffViews=${HufflepuffViews}&RavenclawViews=${RavenclawViews}&SlytherinViews=${SlytherinViews}`);

    }

    catch (err) {
        document.getElementById("page2Btn").innerHTML = ""
        let btn = document.getElementById("page2Btn")
        btn.classList.add("loading")
        console.log(err);
        btn.classList.remove("loading")
        document.getElementById("page2Btn").innerHTML = "Submit"
    }

    emailButton.removeAttribute('disabled')


}

var check = GryffindorViews, HufflepuffViews, RavenclawViews, SlytherinViews

function emi(to_name, to_email, anResult, resultDesc) {
    var viewParams = new URLSearchParams(window.location.search);
    let GryffindorViews = viewParams.get('GryffindorViews');
    let HufflepuffViews = viewParams.get('HufflepuffViews');
    let RavenclawViews = viewParams.get('RavenclawViews');
    let SlytherinViews = viewParams.get('SlytherinViews');
    document.getElementById("page2Btn").innerHTML = ""
    let btn = document.getElementById("page2Btn")
    btn.classList.add("loading")
    console.log(GryffindorViews, HufflepuffViews, RavenclawViews, SlytherinViews)
    console.log(resultDesc)
    var templateParams = {
        tonam: to_name,
        emil: to_email,
        result: anResult,
        resultDesc: resultDesc,


    };
    console.log(templateParams)

    emailjs.send('Formservice', 'template_am9aazu', templateParams, "6c7eE2eVv1kXg44En")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            console.log(resultDesc);
        }, function (error) {
            console.log('FAILED...', error);
        });

    alert("Your results have been sent to your email!");
    window.location.href = "index4.html" + "?GryffindorViews=" + encodeURIComponent(GryffindorViews) + "&HufflepuffViews=" + encodeURIComponent(HufflepuffViews) + "&RavenclawViews=" + encodeURIComponent(RavenclawViews) + "&SlytherinViews=" + encodeURIComponent(SlytherinViews);
    btn.classList.remove("loading")
    document.getElementById("page2Btn").innerHTML = "Submit"
};

async function submit3() {
    console.log(userId, "test")
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

    try {
        document.getElementById("page1Btn").innerHTML = ""
        let btn = document.getElementById("page1Btn")
        btn.classList.add("loading")
        const userId = new URL(window.location.href).searchParams.get("_id");

        const response = await
            fetch(`https://test-backend-q.onrender.com/api/update/${encodeURIComponent(userId)}`, {
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

        console.log(result)
        // const userId = result.result.insertedId
        //data(userId)
        btn.classList.remove("loading")
        document.getElementById("page1Btn").innerHTML = "Submit"

        console.log(result)
        alert("User updated!")
        alert("Hello " + name + "! " + "Your results will be sent to " + email + ".");

        window.location.href = "index2.html?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&_id=" + encodeURIComponent(userId);
    }

    catch (err) {
        document.getElementById("page1Btn").innerHTML = ""
        let btn = document.getElementById("page1Btn")
        btn.classList.add("loading")
        console.log(err);
        alert("There was an error! Please try again!")
        btn.classList.remove("loading")
        document.getElementById("page1Btn").innerHTML = "Submit"
    }

}

function back() {
    userId = new URL(window.location.href).searchParams.get("_id");
    window.location.href = "index3.html" + "?_id=" + encodeURIComponent(userId);

}
async function viewData() {

    console.log(889977)


    var viewParams = new URLSearchParams(window.location.search);
    let GryffindorViews = viewParams.get('GryffindorViews');
    let RavenclawViews = viewParams.get('RavenclawViews');
    let HufflepuffViews = viewParams.get('HufflepuffViews');
    let SlytherinViews = viewParams.get('SlytherinViews');
    

    try {
       
        const response = await
            fetch("https://test-backend-q.onrender.com/views/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    GryffindorViews: Number(GryffindorViews),
                    HufflepuffViews: Number(HufflepuffViews),
                    RavenclawViews: Number(RavenclawViews),
                    SlytherinViews:Number (SlytherinViews)

                }),
            })
        const result = await response.json();
        console.log(result)
    }
    catch (err) {
       console.log(err)
    }
    console.log(4567899000)
  
} 


// try {
//     const response = await
//     fetch(`https://test-backend-q.onrender.com/views`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
            
//                     GryffindorViews: GryffindorViews,
//                     // HufflepuffViews: HufflepuffViews,
//                     // RavenclawViews: RavenclawViews,
//                     // SlytherinViews: SlytherinViews
//             }),
//         })
//         const result = await response.json();

//         console.log(result)
//     }

//     catch(err) {
//         console.log(err)
//     }

function getV() {
    fetch("https://test-backend-q.onrender.com/views").then(res=>res.json()).then(data=>
    {

        const {

            GryffindorViews,
    RavenclawViews,
    HufflepuffViews,
    SlytherinViews,
        } = data
    document.getElementById("GryffindorViews").innerHTML= GryffindorViews
    document.getElementById("RavenclawViews").innerHTML= RavenclawViews
    document.getElementById("HufflepuffViews").innerHTML= HufflepuffViews
    document.getElementById("SlytherinViews").innerHTML= SlytherinViews
    console.log(4456677)

    }
    
    ).catch(err=> alert('There was an error! Please try again!'))
}