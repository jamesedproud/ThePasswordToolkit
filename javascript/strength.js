var pass = "";
var strengthDOM = document.getElementById("strength");
var ratingDOM = document.getElementById("rating");
var passDOM = document.getElementById("password");
var score;
var trueLength;

//CHECK THE STRENGTH OF THE USER'S PASSWORD////////////////////////////////////
passDOM.addEventListener('keyup', function(e) { 

    trueLength = checkPasswordLength(); //check the current number of characters in the textbox

    //if the backspace is pressed trim a character
    if (e.keyCode == 8) {

        if (trueLength <= 1) { //check to see if user deleted the password
            score = ["Very Weak", 0];
            trueLength == 0 ? l = 0 : pass = pass.substr(0, trueLength - 1);
        } else {
            pass = pass.substr(0, trueLength - 1);
            score = PasswordSecurity(pass);
        }
    } else {
        pass += e.key
        score = PasswordSecurity(pass);
    }
  
    strengthDOM.textContent = `Password Strength: ${score[0]}`;
    ratingDOM.textContent = `Rating: ${score[1]} /100`;
       
    
    //TODO: Display the score /100. Show pointers for how to improve. Change the bar depending on the strength.
    //TODO: Breakdown of each area /25 etc

});

function checkPasswordLength()
{
    return passDOM.value.length < 1 ?  0: passDOM.value.length;
}

function PasswordSecurity(pass)
{
    var passDOM = document.getElementById("password");
    var score = 0;
    var passLength = pass.length; //get the length of the password
    var numUpper;
    var numLower;
    var numInts;
    var numCharacters;
    var numLetters;
    var strength;

    if (!pass) //return 0 if no password is entered
        return score;

     //TODO: if the user highlights and deletes the entire password reset score

    //award points for password length
    if (passLength >= 12) {  // 12 +
        score += 25;
    } else if (passLength > 8 && passLength <= 11) { // 9 - 11
        score += 10;
    } else if (passLength > 4 && passLength <= 8) { //5 - 8
        score += 5;
    } else if (passLength <= 4) { // < 4
        score += 0;
    }

    numUpper = pass.length - pass.replace(/[A-Z]/g, '').length; //returns number of upper case
    numLower = pass.length - pass.replace(/[a-z]/g, '').length; //returns number of lower case

    //award points depending on how many upper and lower case characters using REGEX
    if (!pass) 
        return score;
    if (numUpper > 2 && numLower > 2) { //if there are multiple upper and lower case letters
        score += 25;
    } else if (numUpper != 0 && numLower != 0) { //if there are a mix of upper and lower case letters
        score += 20;
    } else if (passLength == numLower && passLength > 4) { //all letters are lower case
        score += 10;
    }
    //TODO: if the first characters is uppercase letter this is a pattern


    //return the number of integers in the password
    numInts = pass.replace(/[^0-9]/g,"").length;

    //award points depending on the number of integers in the password
    if (numInts == 0) {
        score += 0; //no integers
    } 
    if (numInts > 0 && numInts <= 3) { //1 - 3 numbers
        score += 10;
    } 
    if (numInts > 3) { //4 or more numbers
        score += 20;
    }

    //return the number of characters in the string
    numCharacters = (pass.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?£!~`§±]/g) || []).length;

    //award points depending on the special characters
    if (numCharacters == 0) { //no special character
        score += 0;
    }  
    if (numCharacters == 1) { //1 special character
        score += 5;
    } 
    if (numCharacters >= 2) { //2+ special chatacters
        score += 25;
    }

    //the number of chars in the password
    numLetters = pass.replace(/[a-zA-Z]/g, '').length;

    //award bonus points depending on the mixture of characters, numbers, letters
    if (numLetters!= 0 && numInts != 0) {
        score += 2; //mixture of numbers and letters
    } 
    if (numLetters != 0 && numInts != 0 && numCharacters != 0) {
        score += 3; //mixture of letters, numbers, and special characters
    } 
    if (numLower != 0 && numCharacters != 0 && numInts != 0) {
        score += 5; //mixture of upper, lower, numbers and special characters
    }

    //TODO: check for common words
    

    //award a final score depending on password strength
    if (score >= 90)
    {
        strength = "Very Secure"; //black
        passDOM.style.borderColor = "black";
    } else if (score >= 80) {
        strength = "Very Strong"; //green
        passDOM.style.borderColor = "#009900";
    } else if (score >= 70) {
        strength = "Strong" //green
        passDOM.style.borderColor = "#1aff1a";
    } else if (score >= 60) {
        strength = "Above Average"; //orange
        passDOM.style.borderColor = "#e67300";
    } else if (score >= 50) {
        strength = "Average"; //orange
        passDOM.style.borderColor = "#ffa64d";
    } else if (score >= 25) {
        strength = "Weak"; //red
        passDOM.style.borderColor = "#DA252E";
    } else if (score >= 0) {
        strength = "Very Weak"; //red
        passDOM.style.borderColor = "#DA252E";
    }
    
    var output = [strength,score];   
    return output;
}


function Generator()
{
    //TODO: Generate a random password
}


function Encryption(pass)
{
    //TODO: encrpyt an entered password
}

