$( document ).ready(function() {
	//declare global variables
	var userNumber = '';
	// var userReply = '';
	var userWon = false;
	var textIsYellow = true;
	var computerNumber;
	var randomEmoji;
	var emojis = ['(و˃ᴗ˂)و', '＼（＾○＾）人（＾○＾）／', '(✿ ♥‿♥)', '\\(^-^)/', '٩( ´◡` )۶', '(つ◕౪◕)つ━☆ﾟ.*･｡ﾟ', '♪ヽ( ⌒o⌒)/', '(~˘▾˘)~'];
	var doesNotCompute = ['Does not compute へ[ •́‸ •̀ ]ʋ', 'I only understand numbers (◕︿◕✿)', 'bruh (・_・ヾ', 'write numbers when?! (ლಠ益ಠ)ლ', '(╯°□°）╯︵ ┻━┻', 'kind annoying (◡ ﹏ ◡)', 'ಠ_ಠ'];
	var sadface = 0;
	var guess = 1;
	var wins = 0;
	//initate game!
	playGame();

	function playGame() {
		// pick random number and initiate prompt
		initiateGuessing();
		
		// user picks a number
		$('#userGuess').keydown(function(e){
			// submit on enter
			if ((e.keyCode === 13)) {
				if ($('#userGuess').val() != '') {
					// user num = input
					userNumber = $('#userGuess').val();
					// print user num in html
					printUserReply(userNumber);
					// clear input 
					$('#userGuess').val('');
					// check if usernum = winner
					checkMyNum(userNumber);
					// scroll to bottom of chatbox
					scrollDown();
					//if player won, play again
					playAgain(userWon);
				}
				else {
					if (textIsYellow) {
						$('#guessing-inner').append('<div class="computerTxt-container"><i class="fa fa-terminal"></i><span class="computerTxt">Please enter something!</span></div>');
						scrollDown()
					}
					else {
						$('#guessing-inner').append('<div class="computerTxt-container"><i class="fa fa-terminal"></i><span class="computerTxT new-color">Please enter something!</span></div>');
						scrollDown()
					}
				}
			}
		});
	}	

	function checkMyNum(guessNum) {
		var ifNumber = $.isNumeric(userNumber);
		if (ifNumber === false) {
			printComputerReply(doesNotCompute[sadface], textIsYellow);
			scrollDown();
			sadface++;
			if (sadface === doesNotCompute.length) {
				sadface = 0;
			}
			userWon = false;
			return;
		}
		else {
			document.getElementById("guesses").innerHTML = "Guesses:  "+guess
			if (computerNumber < userNumber) {
				printComputerReply('Too high! Guess again', textIsYellow);
				guess++
				return userWon = false;
			}
			else if (computerNumber > userNumber){
				printComputerReply('Too low! Guess again', textIsYellow);
				guess++
				return userWon = false;
			}
			else {
				wins++
				guess++
				// pick random emoji for the you win msg
				randomEmoji = randomEmojis();
				// print winning msg
				printComputerReply('You win! ' + randomEmoji, textIsYellow);
				if (wins == 1) {
					printComputerReply('So far you have '+wins+' win', textIsYellow);
				}
				else {
					printComputerReply('So far you have '+wins+' wins', textIsYellow);
				}
				printComputerReply('Let\'s play again!', textIsYellow);
				return userWon = true;
			}
		}
	}


	function playAgain(userWon) {
		if (userWon) {
			if (wins < 20) {
				document.getElementById("wins").innerHTML = "Wins:  "+wins
				//set new bg color for computer
				textIsYellow = !textIsYellow;
				//wait a minute before initiating new game
				setTimeout(initiateGuessing, 1000);
				return textIsYellow;
			}
			else {
				printComputerReply2('You won the game! You deserve a reward, here are some sweet things...');
				printComputerReply2('🍫 🍪 🍩 🍧 🍦 🍰 🧁 🍬 🍭')
				scrollDown()
			}
		}
	}

	function randomNum() {
		return Math.ceil(Math.random()*((wins+1)*5000));
	}

	function randomEmojis() {
		return emojis[Math.floor(Math.random()*emojis.length)];
	}

	function initiateGuessing() {
		// computer picks a number from 1-100
		computerNumber = randomNum();	
		// print initiate prompt
		printComputerReply('I have a number in mind between 1 &amp; '+(wins+1)*5000, textIsYellow);
		// focus on guess field - hide on portfolio site
		// $('#userGuess').focus();
		scrollDown();
		return computerNumber;
	}

	function printComputerReply(computerReply, textIsYellow) {
		if (textIsYellow) {
			$('#guessing-inner').append('<div class="computerTxt-container"><i class="fa fa-terminal"></i><span class="computerTxt">' + computerReply + '</span></div>');
		}
		else {
			$('#guessing-inner').append('<div class="computerTxt-container"><i class="fa fa-terminal"></i><span class="computerTxt new-color">' + computerReply + '</span></div>');
		}
	}

	function printComputerReply2(computerReply) {
		$('#guessing-inner').append('<div class="computerTxt-container"><i class="fa fa-terminal"></i><span class="computerTxt final-color">' + computerReply + '</span></div>');
	}

	function printUserReply(text) {
		$('#guessing-inner').append('<div class="userTxt-container"><span class="userTxt">' + text + '</span><i class="fa fa-user-secret""></i></div>');
	}

	function scrollDown() {
		$('#guessing-text').scrollTo($('#guessing-text')[0].scrollHeight, 350);
	}

});
