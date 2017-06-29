(function () {
    var alphaBet, texasSymbol, guessInput, guess, guessButton, lettersGuessed, lettersMatch, output, man, letters, guesses, currentWord, numlettersMatch, messages;

    function setup() {
        alphaBet = "abcdefghijklmnopqrstuvwxyz";
        guesses = 6;
        texasSymbol = ["longhorn", "pecan", "armidillo", "mockingbird", "bluebonnet", "friendship", "texas"];
        messages = { win: 'You must be a Texan', lose: 'To The Gallows!', guessed: ' You picked this already', validLetter: 'Pick from A-Z'
        };
        
        lettersGuessed = lettersMatch = '';
        numlettersMatch = 0;

        currentWord = texasSymbol[Math.floor(Math.random() * texasSymbol.length)];

        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'You have ' + guesses + ' guesses remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        // enabled button
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        // display letters in the current word
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Texas State Symbol:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    //start the game
    window.onload = setup();

    //buttons
    document.getElementById("restart").onclick = setup;

    //reset the letters to be guessed
    guessInput.onclick = function () {
        this.value = '';
    };

    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        if (guess) {
            if (alphaBet.indexOf(guess) > -1) {
              if ((lettersMatch && lettersMatch.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                  //check for multiple letters
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numlettersMatch += 1;
                        }
                    }

                    lettersMatch += guess;
                    if (numlettersMatch === currentWord.length) {
                        gameOver(true);
                    }
                }
                else {
                    lettersGuessed += guess;
                    guesses--;
                    man.innerHTML = 'You have ' + guesses + ' guesses remaining';
                    if (guesses === 0) gameOver();
                }
            }
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());