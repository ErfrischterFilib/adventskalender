let backgroundImage = document.getElementById('background');
let iframe = document.getElementById('iframe');
/*
TODO: activate when live
let day = new Date().getDate();
*/

let today = 24; // TODO: dynamic when live. see above

console.log('Today is ' + today) //debug

backgroundImage.addEventListener('load', function () {
    let backgroundContent = backgroundImage.contentDocument;

    for (let i = 1; i <= today; i++) {
        let window = backgroundContent.getElementById(i);
        window.addEventListener('click', function () {
            openModal(i)
        })
    }
})
// Get the modal
let modal = document.getElementById("modal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
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

    if (day < today) {
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

