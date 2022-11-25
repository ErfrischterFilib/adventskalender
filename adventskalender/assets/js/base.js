let backgroundImage = document.getElementById('background');

let date = new Date(2022, 11, 11);
let year = date.getFullYear();
let month = date.getMonth(); // Achtung Dez = 11
let day = date.getDate();
let today = day;
let bg = today + ".svg";

console.log('Today is ' + today) //debug

let bgImage = document.getElementById('background');
let button = document.getElementById('openToday');

if (today >= 25 || year > 2022) {
    bgImage.data = "./assets/images/bg/25.svg";
    button.style.display = 'none';
} else if (month < 11 && year === 2022) {
    bgImage.data = "./assets/images/bg/0.svg";
    button.style.display = 'none';
} else {
    bgImage.data = "./assets/images/bg/" + bg;
}

backgroundImage.addEventListener('load', function () {
    if (month < 11 && year === 2022) {
        today = 0;
    } else if (year > 2022) {
        today = 25;
    }
    let backgroundContent = backgroundImage.contentDocument;
    for (let i = 1; i <= today; i++) {
        let window = backgroundContent.getElementById(i);
        window.style.cursor = 'zoom-in';
        window.setAttribute('id', i.toString())
        window.addEventListener('click', function () {
            openModal(i)
        })
    }
})

let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close")[0];

function openModal(day) {
    let arrowLeft = document.getElementById("arrowLeft");
    let arrowRight = document.getElementById("arrowRight");
    modal.style.display = "block";
    document.getElementById('dayGif').src = "./assets/images/gifs/" + day + ".gif"
    document.getElementById('dayToday').innerHTML = day.toString()
    document.getElementById('storyText').innerHTML = getText(day);

    if (day > 1) {
        arrowLeft.style.display = "";
        arrowLeft.addEventListener("click", function () {
                openModal(day - 1)
            }
        )
    } else {
        arrowLeft.style.display = "none";
    }

    if (day < today && day < 24) {
        arrowRight.style.display = "";
        document.getElementById('arrowRight').addEventListener("click", function () {
                openModal(day + 1)
            }
        )
    } else {
        arrowRight.style.display = "none";
    }
}

span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}