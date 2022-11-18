let backgroundImage = document.getElementById('background');
let iframe = document.getElementById('iframe');
/*
TODO: activate when live
let day = new Date().getDate();
*/

let today = 8; // TODO: dynamic when live. see above

console.log('Today is ' + today) //debug

backgroundImage.addEventListener('load', function () {
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
// Get the modal
let modal = document.getElementById("modal");

let span = document.getElementsByClassName("close")[0];

function openModal(day) {
    let arrowLeft = iframe.contentDocument.getElementById("arrowLeft");
    let arrowRight = iframe.contentDocument.getElementById("arrowRight");
    modal.style.display = "block";
    iframe.contentDocument.getElementById('dayGif').src = "/assets/images/gifs/" + day + ".gif"
    iframe.contentDocument.getElementById('dayToday').innerHTML = day.toString()
    iframe.contentDocument.getElementById('storyText').innerHTML = getText(day);

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
        iframe.contentDocument.getElementById('arrowRight').addEventListener("click", function () {
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

