export function removeActive() {
    let currActive = document.getElementsByClassName("active-lesson");
    currActive[0].classList.remove("active-lesson");
}

export function addActive(lessonNum) {
    console.log("234");
    document.getElementById("lesson" + lessonNum).classList += "active-lesson";
}
