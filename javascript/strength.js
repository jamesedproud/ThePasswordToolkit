var pass = "";
var contentDOM = document.getElementsByClassName("content");
var passDOM = document.getElementById("password");

var finalScore;
var trueLength;


//CHECK THE STRENGTH OF THE USER'S PASSWORD////////////////////////////////////
passDOM.addEventListener('keyup', function(e) {
    //TODO: Show pointers for how to improve. 
    var trueL = checkPasswordLength();
    strengthInit(trueL, e);
});

function strengthInit(trueL,eKey) {

    //var html = ' <div id = "resultContainer"><p id = "strength"></p><p id = "rating"></p><hr><p id = "lengthScore"></p><p id = "lowerAndUpperScore"></p><p id = "noOfIntsScore"></p><p id = "noOfSpecialsScore"></p><p id = "mixtureScore"></p></div>';
    var html =  '<div id = "resultContainer"><p id = "strength"></p><p id = "rating"></p><hr><p id = "lengthScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "lengthTip"></span></span><br><br><p id = "lowerAndUpperScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "lowerUpperHint"></span></span><br><br><p id = "noOfIntsScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "intHint"></span></span><br><br><p id = "noOfSpecialsScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "specialHint"></span></span><br><br><p id = "mixtureScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "bonusHint"></span></span></div>';

     //TODO: if the user copy and pastes a password.

        //if the backspace is pressed trim a character
        if (eKey.keyCode == 8) {
            if (trueL < 1) { //check to see if user deleted the password
                finalScore = ["Very Weak", 0];
                document.getElementById("password").style.borderColor = "#DA252E";
                pass = "";
                trueL == 0 ? trueL = 0 : pass = pass.substr(0, trueL);
                document.getElementById("resultContainer").remove(); //remove the results container
            } else {
                pass = pass.substr(0, trueL);
                finalScore = PasswordSecurity(pass);
            }
        } else if (eKey.keyCode == 46 ) {  //Delete key was pressed  //TODO: determine the lcoation of the cursor and delete one before or after
            console.log("delete key pressed");
        } else if (eKey.keyCode == 16 || eKey.keyCode == 17 || eKey.keyCode == 18 || eKey.keyCode == 27 || eKey.keyCode == 37 || eKey.keyCode == 38 || eKey.keyCode == 39 || eKey.keyCode == 40 || 
            eKey.keyCode == 45 || eKey.keyCode == 144 || eKey.keyCode == 145 || eKey.key == "ctrlKey" || eKey.keyCode ==  91 || eKey.keyCode == 224 || eKey.keyCode == 55 || eKey.keyCode == 13) {
                console.log("invalid key"); //block invalid keys
        } else { //user has entered a new character, add to the end of the string
            pass += eKey.key
            finalScore = PasswordSecurity(pass);
        }

        if (trueL < 1) //clear the DOM if no password has been entered
        {
            //remove the results container
            //if (document.body.contains(document.getElementById("resultContainer")));
               // document.getElementById("resultContainer").remove();
        } else { //print the results of the password to the DOM

            //insert the results containers
            if (!document.body.contains(document.getElementById("resultContainer")))
                passDOM.insertAdjacentHTML('afterend',html);

            //scores and rating
            document.getElementById("strength").textContent = `Password Strength: ${finalScore[0]}`;
            document.getElementById("rating").textContent = `Rating: ${finalScore[1]} / 100`;
            document.getElementById("rating").style.fontWeight = "bold";
            document.getElementById("lengthScore").textContent = `Length Score: ${finalScore[2]} / 25`;
            document.getElementById("lowerAndUpperScore").textContent = `Lower/Upper Case Characters: ${finalScore[3]} / 25`;
            document.getElementById("noOfIntsScore").textContent = `Numbers: ${finalScore[4]} / 20`;
            document.getElementById("noOfSpecialsScore").textContent = `Symbols: ${finalScore[5]} / 25`;
            document.getElementById("mixtureScore").textContent = `Variety Bonus: ${finalScore[6]} / 5`;

            //tips
            document.getElementById("lengthTip").textContent = finalScore[7];
            document.getElementById("lowerUpperHint").textContent = finalScore[8];
            document.getElementById("intHint").textContent = finalScore[9];
            document.getElementById("specialHint").textContent = finalScore[10];
            document.getElementById("bonusHint").textContent = finalScore[11];
        }

        //console.clear();
        console.log("Password: " + pass + "// Length: " + trueL  + "// Keycode = " + eKey.keyCode + "/" + eKey.key);
        

}

function checkPasswordLength() {
    return passDOM.value.length < 1 ?  0 : passDOM.value.length;
}

function PasswordSecurity(pass)
{
    var passDOM = document.getElementById("password");
    var passLength = pass.length; //get the length of the password
    var numUpper, numLower, numInts, numCharacters, numLetters,strength,lengthScore,lowerAndUpperScore,noOfIntsScore,noOfSpecialCharsScore,mixtureScore;
    var countScore = 0;
    var score = 0;
    var lengthTip, upperLowerTip, intTip, specialsTip, bonusTip;

    //TODO: here for password entropy
   // var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //special characters
    //format.test(pass);

    //formula: only lowercase = 26
    //uppercase and lowercase = 52
    //numbers = 10
    //symbols, space and upper and lower case = 95
    //symbols, numbers, upper/lower case = 105
    //Log2(S^L) S = size of unique pool (above) L = length of password
    

    if (!pass) //return 0 if no password is entered
        return score;

    //award points for password length
    if (passLength >= 12) {  // 12 +
        score += 25;
        countScore += 25;
        lengthTip = "Perfect!";
    } else if (passLength > 8 && passLength <= 11) { // 9 - 11
        score += 10;
        countScore += 10;
        lengthTip = "Strong, but try to add " + (12 - passLength) + " more characters";
    } else if (passLength > 4 && passLength <= 8) { //5 - 8
        score += 5;
        countScore += 5;
        lengthTip = "Not strong enough";
    } else if (passLength <= 4) { // < 4
        score += 0;
        lengthTip = "Very weak";
    }

    //return the score for this check only and then reset for the next check
    lengthScore = countScore;
    countScore = 0;

    numUpper = pass.length - pass.replace(/[A-Z]/g, '').length; //returns number of upper case
    numLower = pass.length - pass.replace(/[a-z]/g, '').length; //returns number of lower case

    //award points depending on how many upper and lower case characters using REGEX
    if (!pass) 
        return score;
    if (numUpper >= 2 && numLower >= 2) { //if there are multiple upper and lower case letters
        score += 25;
        countScore += 25;
        upperLowerTip = "Perfect!";
    } else if (numUpper != 0 && numLower != 0) { //if there are a mix of upper and lower case letters
        score += 20;
        countScore += 20;
        upperLowerTip = "Try to add more upper case letters";
    } else if (passLength == numLower && passLength > 4) { //all letters are lower case
        score += 10;
        countScore += 10;
        upperLowerTip = "No upper case";
    } else if (passLength <=4) {
        upperLowerTip = "Not long enough";
    } else {
        upperLowerTip = "No upper case";
    }


    lowerandUpperScore = countScore;
    countScore = 0;
    //TODO: if the first characters is uppercase letter this is a pattern


    //return the number of integers in the password
    numInts = pass.replace(/[^0-9]/g,"").length;

    //award points depending on the number of integers in the password
    if (numInts == 0) {
        score += 0; //no integers
        intTip = "No numbers";
    } 
    if (numInts > 0 && numInts <= 3) { //1 - 3 numbers
        score += 10;
        countScore += 10;
        intTip = "1 or 2 more numbers";
    } 
    if (numInts > 3) { //4 or more numbers
        score += 20;
        countScore += 20;
        intTip = "Perfect!";
    }


    noOfIntsScore = countScore;
    countScore = 0;

    //return the number of characters in the string
    numCharacters = (pass.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?£!~`§±]/g) || []).length;

    //award points depending on the special characters

    if (pass.length > 4) {
        if (numCharacters == 0) { //no special character
            score += 0;
            specialsTip = "No special characters";
        }  
        if (numCharacters == 1) { //1 special character
            score += 5;
            countScore += 5;
            specialsTip = "Good. Try adding an extra character";
        } 
        if (numCharacters >= 2) { //2+ special chatacters
            score += 25;
            countScore += 25;
            specialsTip = "Perfect!";
        }
    } else {
        specialsTip = "Not long enough";
    }

    noOfSpecialCharsScore = countScore;
    countScore = 0;

    //the number of chars in the password
    numLetters = pass.replace(/[a-zA-Z]/g, '').length;

    //award bonus points depending on the mixture of characters, numbers, letters
    if (numLower != 0 && numCharacters != 0 && numInts != 0 && numUpper != 0) {
        score += 5; //mixture of upper, lower, numbers and special characters
        countScore += 5;
        bonusTip = "Perfect!";
    } else if (numLetters != 0 && numInts != 0 && numCharacters != 0) {
        score += 3; //mixture of letters, numbers, and special characters
        countScore += 3;
        bonusTip = "Try adding upper or lower case";
    } else if (numLetters!= 0 && numInts != 0) {
        score += 2; //mixture of numbers and letters
        countScore += 2;
        bonusTip = "No special characters";
    } else {
        bonusTip = "Very weak variety";
    }

    mixtureScore = countScore;
    countScore = 0;

    //TODO: check for common words
    

    //award a final score depending on password strength
    if (score >= 90)
    {
        strength = "Extremely Strong"; //black
        passDOM.style.borderColor = "black";
    } else if (score >= 80) {
        strength = "Very Strong"; //green
        passDOM.style.borderColor = "#009900";
    } else if (score >= 70) {
        strength = "Strong" //green
        passDOM.style.borderColor = "#1aff1a";
    } else if (score >= 60) {
        strength = "Above Average"; //blue
        passDOM.style.borderColor = "#0099ff";
    } else if (score >= 50) {
        strength = "Average"; //yellow
        passDOM.style.borderColor = "#e6e600";
    } else if (score >= 25) {
        strength = "Weak"; //orange
        passDOM.style.borderColor = "#ffa64d";
    } else if (score >= 0) {
        strength = "Very Weak"; //red
        passDOM.style.borderColor = "#DA252E";
    }
    
    var output = [strength,score,lengthScore,lowerandUpperScore,noOfIntsScore,noOfSpecialCharsScore,mixtureScore,lengthTip,upperLowerTip,intTip,specialsTip,bonusTip];   
    return output;
}

function Generator()
{
    //TODO: Generate a random password
}


function Encryption(pass)
{
    //TODO: Press enter to encrpyt. Password box changes to green after encypted. be careful maybe sepetare box is better
}


