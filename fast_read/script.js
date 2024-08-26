var txtArray;
var txt;
var elem;
var inp;

async function preload() {
    try {
        const response = await fetch('If.txt');
        const data = await response.text();
        txtArray = data.split('\n');
        processText(txtArray);
        elem.innerHTML = txt;
        sessionStorage.setItem("autosave", elem.innerHTML);
    } catch (error) {
        console.error('Error loading the text file:', error);
    }
}

function processText(arr) {
    let words;
    for (var i = 0; i < arr.length; i++) {
        words = arr[i].trim().split(' ');
        for (var j = 0; j < words.length; j++) {
            for (let k = 0; k < words[j].length; k++) {
                if (/[a-zA-Z0-9]/.test(words[j][k])) {
                    words[j] = words[j].slice(0, k) + "<strong>" + words[j][k] + "</strong>" + words[j].slice(k + 1);
                    break;
                }
            }
        }
        arr[i] = words.join(" ");
    }
    txt = arr.join("<br/>");
}

function userInput(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = function(event) {
        let content = event.target.result;
        txtArray = content.split('\n');
        processText(txtArray);
        elem.innerHTML = txt;
        localStorage.setItem("autosave", elem.innerHTML);
    };
    reader.readAsText(file);
}

function setup() {
    inp = document.getElementById("input_fast");
    elem = document.getElementById("fast");
    const ht = sessionStorage.getItem("autosave");
    if (ht) {
        elem.innerHTML = ht;
    } else {
        preload();
    }
    inp.addEventListener("input", userInput);
}

document.addEventListener("DOMContentLoaded", setup);