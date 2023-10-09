// Project 1 - Basic SPS

var numberOfGames = 0;
var userWins = 0;
var computerWins = 0;
var numberOfDraws = 0;
var userWinsPercentage = 0;
var computerWinsPercentage = 0;
var username = "";
var gameMode = "waiting"; // default gameMode

// User Name
// To make this game more personal, add a feature to collect the user's name as the first input after the page loads. We can prompt the user to enter their name first by adding to the page's HTML. Once the user submits their name, the program can return output to prompt the user to start playing Scissors Paper Stone by entering one of the 3 objects. Use the user's name to personalise win-loss record and other relevant output.
// make an if else if condition in main that uses gameMode to decide the logic switch
// if gameMode = "waiting for username", then take the input as the user's user name and store in global var username
// inside this loop, switch the gameMode to "SPS"
// else if gameMode == "SPS", then copy paste all the old code inside
// will need to also declare myOutputValue earlier on because now will have two myOutputValues - 1 for the first username input, 2nd one for the game

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "waiting") {
    username = input;
    myOutputValue =
      "Hello " + username + "! Welcome to Scissors Paper Stone ✂️ 🧻 🪨";
    gameMode = "SPS"; // switches gameMode after we get username
  } else if (gameMode == "SPS") {
    var baseUserInput = returnUserInput(input);
    // user validation that they have input the right input
    if (
      baseUserInput == "scissors" ||
      baseUserInput == "paper" ||
      baseUserInput == "stone"
    ) {
      var userInput = addEmojisToUserInput(baseUserInput);
      console.log(userInput);
      var computerInput = generateComputerInput();
      var finalResult = decideResult(userInput, computerInput);
      updateStates(finalResult);
      calcUserWinPercentage();
      calcComputerWinPercentage();
      myOutputValue = outputFinalStatement(
        finalResult,
        userInput,
        computerInput
      );
    } else {
      myOutputValue = "Only enter scissors, paper or stone! 🔪 🩸";
    }
  }
  return myOutputValue;
};

// User Input Helper Function - will return the input in lowercase
var returnUserInput = function (originalUserInput) {
  lowercaseUserInput = originalUserInput.toLowerCase();
  return lowercaseUserInput;
};

// Add emojis to userInput
var addEmojisToUserInput = function (noEmojiUserInput) {
  if (noEmojiUserInput == "scissors") var withEmojiUserInput = "scissors ✂️";
  else if (noEmojiUserInput == "paper") withEmojiUserInput = "paper 🧻";
  else if (noEmojiUserInput == "stone") withEmojiUserInput = "stone 🪨";
  return withEmojiUserInput;
};

// Computer Input Helper Function - Use Math.random to then tag the number 0, 1 or 2 to generate computer's input of scissors, paper or stone
var generateComputerInput = function () {
  // first generates a decimal between 0 and 3. Then floor it to round down to 0, 1 or 2
  randomInteger = Math.floor(Math.random() * 3);
  // next three if statements will evaluate if the randomInteger is 0, 1 or 2 then return the appropriate computerInput to main
  if (randomInteger == 0) {
    return "scissors ✂️";
  }
  if (randomInteger == 1) {
    return "paper 🧻";
  }
  if (randomInteger == 2) {
    return "stone 🪨";
  }
};

// Decide the result Helper Function
var decideResult = function (userInput, computerInput) {
  var result = "";
  // checks the user win condition
  if (
    (userInput == "scissors" && computerInput == "paper") ||
    (userInput == "paper" && computerInput == "stone") ||
    (userInput == "stone" && computerInput == "scissors")
  ) {
    result = "user";
  }
  // if no user win condition, check draw condition
  else if (userInput == computerInput) {
    result = "draw";
  }
  // if no user win condition and draw condition, automatically return that the computer wins
  else {
    result = "computer";
  }
  return result;
};

// SPS 2 - Win-Loss Record
// Add state to your program such that it keeps track of the number of times the user has won and the number of times the computer has won. Output this win-loss record in a format you like in the program output. You can also output the number of draws and/or each party's winning percentage if you'd like.
// end result is to output:
// no. of user wins
// no. of computer wins
// no. of draws
// user win percentage
// computer win percentage
// global variable to track number of games played (this will be the denominator to calculate percentage)
// global variable to track user wins
// global variable to track computer wins
// global variable to track no. of draws
// global var to track user win percentage
// global var to track computer win %
// helper function to do logic to update the states: if winner == "user", then userWins += 1, else if winner == "computer", computerWins += 1, else draw += 1
// helper function to calculate the win percentage

// takes in the result from decideResult helper function to do the logic and update the state. Doesn't need to return anything because it just updates the state according to the result
var updateStates = function (result) {
  numberOfGames += 1; // everytime i call this function, the num of games will +1
  if (result == "user") userWins += 1;
  else if (result == "computer") computerWins += 1;
  else numberOfDraws += 1;
};

var calcUserWinPercentage = function () {
  userWinsPercentage = ((userWins / numberOfGames) * 100).toFixed(2);
};

var calcComputerWinPercentage = function () {
  computerWinsPercentage = ((computerWins / numberOfGames) * 100).toFixed(2);
};

// Helper Function to output the final statement
var outputFinalStatement = function (result, userInput, computerInput) {
  if (result == "user") {
    var outputStatement = `Hi ${username}!<br>
    You chose ${userInput}.<br>
    Computer chose ${computerInput}.<br>
    You won! PHEW! 🥳<br>
    You've won ${userWins}/${numberOfGames} and your win percentage is ${userWinsPercentage}%.<br>
    The computer has won ${computerWins}/${numberOfGames} and its win percentage is ${computerWinsPercentage}%. The number of draws is ${numberOfDraws}<br>
    Dare to try again? 😠`;
  } else if (result == "computer") {
    outputStatement = `Hi ${username}.<br>
    You chose ${userInput}.<br>
    Computer chose ${computerInput}.<br>
    You lost! Boooooooooo! ☠️<br>
    You've won ${userWins}/${numberOfGames} and your win percentage is ${userWinsPercentage}%.<br>
    The computer has won ${computerWins}/${numberOfGames} and its win percentage is ${computerWinsPercentage}%. The number of draws is ${numberOfDraws}<br>.
    Dare to try again? 😠`;
  } else {
    // accounting for draw result in a different output statement
    outputStatement = `Hi ${username}.<br>
    You chose ${userInput}.<br>
    Computer chose ${computerInput}.<br>
    You drew! Not too shabby! 🙃<br>
    You've won ${userWins}/${numberOfGames} and your win percentage is ${userWinsPercentage}%.<br>
    The computer has won ${computerWins}/${numberOfGames} and its win percentage is ${computerWinsPercentage}%.The number of draws is ${numberOfDraws}<br>.
    Dare to try again? 😠`;
  }
  return outputStatement;
};

// create emojis in output statement for each differnt input

// `Hi ${username}. You chose ${userInput}. Result is ${result} wins. ${username}'s input is ${userInput}. Computer input is ${computerInput}. Number of ${username}'s wins is ${userWins} and win percentage is ${userWinsPercentage}%. Number of computer wins is ${computerWins} and win percentage is ${computerWinsPercentage}%. Number of draws is ${numberOfDraws}`;
