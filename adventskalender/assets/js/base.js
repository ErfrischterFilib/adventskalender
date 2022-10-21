let backgroundImage = document.getElementById('background');
let iframe = document.getElementById('iframe');
/*
TODO: activate when live
let today = new Date().getDate();
*/

let day = 2; // TODO: dynamic when live. see above

console.log('Today is ' + day) //debug

backgroundImage.addEventListener('load', function() {
    let backgroundContent = backgroundImage.contentDocument;

for (let i = 1; i <= day; i++){
     let window = backgroundContent.getElementById(i);
    window.addEventListener('click', function() {
        openModal(i)
    })
}})
// Get the modal
let modal = document.getElementById("modal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal(window){
    modal.style.display = "block";
    iframe.contentDocument.getElementById('dayGif').src = "./../../images/gifs/" + window + ".gif"
    iframe.contentDocument.getElementById('dayToday').innerHTML = window.toString()
    iframe.contentDocument.getElementById('storyText').innerHTML = getText(window);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

