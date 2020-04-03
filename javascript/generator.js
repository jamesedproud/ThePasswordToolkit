var resultDOM = document.getElementById("generated");
var selectedLength = document.getElementById("slideroutput");
var lowerCaseDOM = document.getElementById("lowercase");
var upperCaseDOM = document.getElementById("uppercase");
var numbersDOM = document.getElementById("numbers");
var symbolsDOM = document.getElementById("symbols");
var result;
var length;

document.getElementById("generateButton").addEventListener('click', function(e) {
    
    length = selectedLength.innerText;
    result = generatePassword(length);
    resultDOM.value = result;

});

function generatePassword(length) {
    var lower = "abcdefghijklmnopqrstuvwxyz", upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", ints = "0123456789", symbols = "@#$%^&*()_+-=[]{};':\"|,.<>\/?£!~"
        retVal = "";

    var charset = "";

    if (lowerCaseDOM.checked) {
        charset += lower;
    }
    if (upperCaseDOM.checked) {
        charset += upper;
    }
    if (numbersDOM.checked) {
        charset += ints;
    }
    if (symbolsDOM.checked) {
        charset += symbols;
    }

    if (charset == "") {
        retVal = "No character pool";
    } else {
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
    }
    return retVal;
}