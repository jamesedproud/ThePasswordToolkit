var pass = "";
var contentDOM = document.getElementsByClassName("content");
var passDOM = document.getElementById("password");
var finalScore;
var byId = document.getElementById.bind(document);


//CHECK THE STRENGTH OF THE USER'S PASSWORD////////////////////////////////////
passDOM.addEventListener('keydown', function(e) {
    strengthInit(e);
});


function strengthInit(eKey) {

    //var html = ' <div id = "resultContainer"><p id = "strength"></p><p id = "rating"></p><hr><p id = "lengthScore"></p><p id = "lowerAndUpperScore"></p><p id = "noOfIntsScore"></p><p id = "noOfSpecialsScore"></p><p id = "mixtureScore"></p></div>';
    var html =  '<div id = "resultContainer"><h3><u>Overall Results</u></h3><p id = "strength"></p><p id = "entropy"></p><p id = "rating" class = "resultItem"></p><span class = "tooltip">Info<span class = "tooltiptext" id= "ratingHint"></span></span><hr><div style = "margin-top: 10px;"><p id = "lengthScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "lengthTip"></span></span><br><br><p id = "lowerAndUpperScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "lowerUpperHint"></span></span><br><br><p id = "noOfIntsScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "intHint"></span></span><br><br><p id = "noOfSpecialsScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "specialHint"></span></span><br><br><p id = "mixtureScore" class = "resultItem"></p><span class = "tooltip">Hint<span class = "tooltiptext" id= "bonusHint"></span></span><hr><h3>Dictionary Attacks</h3><p id = "bonus" class = "bonus"></p></div></div>';
    var result;

     //TODO: if the user copy and pastes a password.

        //if the backspace is pressed trim a character
        if (eKey.keyCode == 8) {
            if (pass.length == 0) { //nothing to remove
                console.log("No");
            } else  if (pass.length == 1) { //check to see if user deleted the password 
                deletePassword();
            } else {
                if (passDOM.selectionStart == 0 && passDOM.selectionEnd == pass.length) { //user deleted entire password
                    deletePassword();
                } else if (passDOM.selectionStart == passDOM.selectionEnd) { //only deleting one character
                    if (passDOM.selectionEnd > 0) {
                         pass = pass.slice(0, passDOM.selectionStart - 1) + pass.slice(passDOM.selectionStart);
                        finalScore = PasswordSecurity(pass);
                    }
                } else { //deleting a selection
                    result = pass.substring(passDOM.selectionStart, passDOM.selectionEnd);
                    pass = pass.replace(result,"");
                    finalScore = PasswordSecurity(pass);
                }
            }
        } else if (eKey.keyCode == 46 ) {  //Delete key was pressed  
            pass = pass.replace(pass[passDOM.selectionEnd +1], ""); //TODO: need to test this
        } else if (eKey.keyCode == 16 || eKey.keyCode == 17 || eKey.keyCode == 18 || eKey.keyCode == 27 || eKey.keyCode == 37 || eKey.keyCode == 38 || eKey.keyCode == 39 || eKey.keyCode == 40 || 
            eKey.keyCode == 45 || eKey.keyCode == 144 || eKey.keyCode == 145 || eKey.key == "ctrlKey" || eKey.keyCode ==  91 || eKey.keyCode == 224  || eKey.keyCode == 13 || eKey.keyCode == 20) {
                console.log("invalid key"); //block invalid keys
        } else if (passDOM.selectionStart < pass.length && passDOM.selectionEnd == pass.length || passDOM.selectionEnd < pass.length) { //highlight and replace
            result = pass.substring(passDOM.selectionStart, passDOM.selectionEnd);
            pass = pass.replace(result,"");
            pass = pass.slice(0, passDOM.selectionStart) + eKey.key + pass.slice(passDOM.selectionStart);
            finalScore = PasswordSecurity(pass);
        } else { //user has entered a new character, add to the end of the string
            pass = pass.slice(0, passDOM.selectionStart) + eKey.key + pass.slice(passDOM.selectionStart);
            finalScore = PasswordSecurity(pass);
        }

        if (pass.length >= 1) {
            //insert the results containers
            if (!document.body.contains(document.getElementById("resultContainer")))
                passDOM.insertAdjacentHTML('afterend',html);

            var results = ["strength","rating","entropy","lengthScore","lowerAndUpperScore","noOfIntsScore","noOfSpecialsScore","mixtureScore"];
            var labels = ["Password Strength: ", "Rating: ", "Entropy: ", "Length: ", "Lower/Upper Case: ", "Numbers: ","Symbols: ","Variety: "];
            var totals = ["", " / 100", "", " / 25", " / 25", " / 20", " / 25", " / 5"];

            //populate the results container
            byId("rating").style.fontWeight = "bold";
            updateResults(finalScore,results,labels,totals);
            byId("bonus").textContent = finalScore[13];

            //populate the tooltips
            var tips = ["lengthTip", "lowerUpperHint", "intHint", "specialHint", "bonusHint"];
            updateTips(finalScore,tips);
            document.getElementById("ratingHint").textContent = "This score is only to encourage entropy";
        }

        console.clear();
        console.log("Password: " + pass + "// Length: " + pass.length  + "// Keycode = " + eKey.keyCode + "/" + eKey.key + " /" + finalScore[2] + " // " + passDOM.selectionStart + " | " + passDOM.selectionEnd);
        
}

function deletePassword() {

    if (passDOM.selectionEnd > 0) { //in case the cusor is before the final character
        finalScore = ["Very Weak", 0];
        document.getElementById("password").style.borderColor = "#DA252E";
        pass = "";
        document.getElementById("resultContainer").remove(); //remove the results container
    }
}

function updateResults(finalScore,results,labels,totals) {

   for (let i = 0; i < results.length; i++) {
       byId(results[i]).textContent = `${labels[i]}${finalScore[i]}${totals[i]}`;
   }
}

function updateTips(finalScore,tips) {

    let j = 8;
    for (let i = 0; i < tips.length; i++) {
        byId(tips[i]).textContent = finalScore[j];
        j++;
    }
}

function PasswordSecurity(pass)
{
    var passDOM = document.getElementById("password");
    var passLength = pass.length; //get the length of the password
    var numUpper, numLower, numInts, numCharacters, numLetters,strength,lengthScore,lowerAndUpperScore,noOfIntsScore,noOfSpecialCharsScore,mixtureScore;
    var countScore = 0, score = 0;
    var lengthTip, upperLowerTip, intTip, specialsTip, bonusTip;
    var possibleCombinations, entropy, poolSize = 0;
    var hasRepetition = false;

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
        lengthTip = "Ok, but try to add " + (12 - passLength) + " more characters";
    } else if (passLength > 4 && passLength <= 8) { //5 - 8
        score += 5;
        countScore += 5;
        lengthTip = "Weak. Add at least " + (9 - passLength) + " more characters";
    } else if (passLength <= 4) { // < 4
        score += 0;
        lengthTip = "Extremely vulnerable";
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
        if (numUpper >= 2)
            upperLowerTip = "Try to add more lower case letters";
        else 
            upperLowerTip = "Try to add more upper case letters";
    } else if (passLength == numLower && passLength > 4) { //all letters are lower case
        score += 10;
        countScore += 10;
        upperLowerTip = "Does not contain upper case";
    } else if (passLength <=4) {
        upperLowerTip = "Not long enough";
    } else if (numLower > 0 && numUpper == 0){
        upperLowerTip = "Does not contain upper case";
    } else if (numUpper > 0 && numLower == 0) {
        upperLowerTip = "Does not contain lower case";
    }

    lowerandUpperScore = countScore;
    countScore = 0;

    //return the number of integers in the password
    numInts = pass.replace(/[^0-9]/g,"").length;

    //award points depending on the number of integers in the password
    if (numInts == 0) {
        score += 0; //no integers
        intTip = "Does not contain numbers";
    } 
    if (numInts > 0 && numInts <= 3) { //1 - 3 numbers
        score += 10;
        countScore += 10;
        intTip = "Try to add " + (4 - numInts) + " more numbers";
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
            specialsTip = "Does not contain symbols";
        }  
        if (numCharacters == 1) { //1 special character
            score += 5;
            countScore += 5;
            specialsTip = "Good. Try adding an extra symbol";
        } 
        if (numCharacters >= 2) { //2+ special chatacters
            score += 25;
            countScore += 25;
            specialsTip = "Perfect!";
        }
    } else if (numCharacters == 0){
        specialsTip = "No symbols";
    } else if (numCharacters == 1) {
        specialsTip = "Good. Try adding an extra symbol";
    } else if (numCharacters >= 2) {
        specialsTip = "Must contain at least 5 characters";
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
    } else if (numLower != 0 && numInts != 0 && numCharacters != 0) {
        score += 3; //mixture of letters, numbers, and special characters
        countScore += 3;
        bonusTip = "Does not contain upper case";
    } else if (numUpper != 0 && numInts != 0 && numCharacters != 0) {
        score += 3;
        countScore += 3;
        bonusTip = "Does not contain lower case";
    } else if (numLower!= 0 && numUpper != 0 && numInts != 0 && numCharacters == 0) {
        score += 2; //mixture of numbers and letters
        countScore += 2;
        bonusTip = "Does not contain any symbols";
    } else if (numLower != 0 && numUpper != 0 && numCharacters != 0) {
        score += 2;
        countScore += 2;
        bonusTip = "Does not contain numbers";
    } else if (numLower != 0 && numUpper != 0) {
        bonusTip = "Does not contain numbers or symbols"
    } else if (numCharacters != 0 && numInts != 0) {
        bonusTip = "Does not contain letters";
    } else {
        bonusTip = "Very weak variety";
    }

    mixtureScore = countScore;
    countScore = 0;

    //TODO: check for repetition, patterns and commonly used words for dictionary attack
    //calculate pool size
    numUpper > 0 ? poolSize += 26 : poolSize += 0;
    numLower > 0 ? poolSize += 26 : poolSize += 0;
    numInts > 0 ? poolSize += 10 : poolSize += 0;
    numCharacters > 0 ? poolSize += 33 : poolSize += 0;

    //calculate possible combinations
    possibleCombinations = poolSize ** pass.length;

    //calculate password entropy to 2 decimal places
    entropy = Math.log2(possibleCombinations).toFixed(2);

    //check for sequencial repetition
   var count = 1;
   var result = pass.charAt(0);
    for (var i = 1; i < pass.length; i++) {
        if (pass.charAt(i) != pass.charAt(i-1)) {
            result += count + pass.charAt(i);
            count = 1;
        } else {
            count++;
        }
        if (count >= 5) {
            hasRepetition = true;
            break;
        } else { 
            hasRepetition = false;
        }
    }

    //check against common passwords

    //TODO: check for repetition based on sequences. L33T checking, keyboard runs
    
 
    //TODO: add an image based on the score
    //award a final score based on password entropy
    if (entropy >= 300 && !hasRepetition) {
        strength = "You are just mashing the keyboard, aren't you?"
        passDOM.style.borderLeftStyle = "black";
    } else if (entropy >= 130 && !hasRepetition) {
        strength = "Potentially Overkill";
        passDOM.style.borderColor = "black";
    } else if (entropy >= 110 && !hasRepetition) {
        strength = "Very Strong";
        passDOM.style.borderColor = "#39e600";
    } else if (entropy >= 90 && !hasRepetition) {
        strength = "Strong" ;
        passDOM.style.borderColor = "#00cccc" //green
    } else if (entropy >= 60) {
        strength = "Above Average"
        passDOM.style.borderColor = "#aa00ff"; //blue
    } else if (entropy >= 45) {
        strength = "Average";
        passDOM.style.borderColor = "#0099ff"; //yellow
    } else if (entropy >= 35) {
        strength = "Weak";
        passDOM.style.borderColor = "#ffa64d"; //orange
    } else if (entropy >= 0) {
        strength = "Very Weak";
        passDOM.style.borderColor = "#DA252E"; //red
    } else { //contains repetition
        strength = "Average";
        passDOM.style.borderColor = "#e6e600"; //yellow
    }

    var extra;

    if (hasRepetition)
        extra = "Repetition: Password contains a repeated pattern";
    else
        extra = "Repetition: Nothing unusual";


    var output = [strength,score,entropy,lengthScore,lowerandUpperScore,noOfIntsScore,noOfSpecialCharsScore,mixtureScore,lengthTip,upperLowerTip,intTip,specialsTip,bonusTip,extra];   
    return output;
}






