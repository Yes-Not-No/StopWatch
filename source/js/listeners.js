import {content, contentMillisecs} from "./main.js";

const setButton = document.querySelector(".timer_setButton");
const clearButton = document.querySelector(".timer_clearButton");
const setTimeBlock = document.querySelector(".timer_setTime");
const changeModeButton = document.querySelector(".change-mode");
const changeModePoint = document.querySelector(".change-mode_point");

setButton.addEventListener("click", function(){
    const setTimeElement = document.createElement("div");
    setTimeBlock.append(setTimeElement);
    setTimeElement.textContent = "content.textContent";
});

clearButton.addEventListener("click", function(){
    setTimeBlock.textContent = '';
});

changeModeButton.addEventListener("click", function(){
    if(changeModePoint.classList.contains("change-mode_point--time")){
        changeModePoint.classList.add("change-mode_point--stopwatch");
        changeModePoint.classList.remove("change-mode_point--time");
    } else {
        changeModePoint.classList.remove("change-mode_point--stopwatch");
        changeModePoint.classList.add("change-mode_point--time");
    }
});