const targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
let previousGuesses = new Set();

let matchedLetters = '_____';
displayMatchedLetters(matchedLetters);

document.getElementById('submitGuess').addEventListener('click', handleGuess);
document.getElementById('guessInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

function createLettersList(word) {
    word = word.toUpperCase();
    const lettersList = document.createElement('div');
    lettersList.style.display = 'inline-flex';

    for (let i = 0; i < word.length; i++) {
	const letterSquare = document.createElement('span');
	letterSquare.className = 'letter-square'; // Use CSS class
	letterSquare.textContent = word[i]; // Show guessed letter

	if (word.slice(0, i+1) === targetWord.slice(0, i+1)) {
	    letterSquare.classList.add('match');
	}

        lettersList.appendChild(letterSquare);
    }

    return lettersList;
}

function displayMatchedLetters(guess) {
    const matchedOutput = document.getElementById('matchedOutput');
    matchedOutput.innerHTML = ''; // Clear previous letters

    const maxLength = Math.min(guess.length, targetWord.length);
    let currentMatchedLetters = '';

    guess = guess.toUpperCase();

    for (let i = 0; i < maxLength; i++) {
	if (guess[i] === targetWord[i]) {
	    currentMatchedLetters += guess[i].toUpperCase();
	} else {
	    break;
	}
    }

    for (let i = currentMatchedLetters.length; i < targetWord.length; i++) {
	currentMatchedLetters += "_";
    }

    matchedLetters = matchedLetters < currentMatchedLetters ? matchedLetters : currentMatchedLetters;
    matchedOutput.append(createLettersList(matchedLetters));
}

function handleGuess() {
    const input = document.getElementById('guessInput');
    const guess = input.value.trim().toLowerCase();
    const warningMessage = document.getElementById('warningMessage');
    const invalidWord = document.getElementById('invalidWord');

    warningMessage.style.display = "none";

    if (guess) {
	if (previousGuesses.has(guess)) {
            input.value = "";
            return;
        }

	if (!validWords.includes(guess)) {
	    invalidWord.textContent = guess.toUpperCase();
	    warningMessage.style.display = 'block';
            input.value = "";
            return;
        }

	previousGuesses.add(guess);

	displayMatchedLetters(guess);

	// check guess and display
	const guessedLettersList = createLettersList(guess);

        if (guess.toLowerCase() === targetWord.toLowerCase()) {
            document.getElementById('submitGuess').disabled = true;
	    document.getElementById('revealNext').disabled = true;
            document.getElementById('giveUp').disabled = true;
            document.getElementById('correctWord').textContent = targetWord.toUpperCase();
            document.getElementById('congratulations').style.display = 'block';
        } else if (guess.toLowerCase() < targetWord.toLowerCase()) {
            document.getElementById('guesses_before').appendChild(guessedLettersList);
            sortList('guesses_before');
        } else {
            document.getElementById('guesses_after').appendChild(guessedLettersList);
            sortList('guesses_after');
        }

        input.value = "";
    }
}

function sortList(listId) {
    const list = document.getElementById(listId);
    const items = Array.from(list.children);

    items.sort((a, b) => a.textContent.localeCompare(b.textContent));

    // Clear the list and re-append sorted items
    list.innerHTML = '';
    items.forEach(item => list.appendChild(item));
}

document.getElementById('giveUp').addEventListener('click', function() {
    document.getElementById('revealedWord').textContent = targetWord.toUpperCase();
    document.getElementById('giveUpMessage').style.display = 'block';
    document.getElementById('submitGuess').disabled = true;
    document.getElementById('revealNext').disabled = true;
    document.getElementById('giveUp').disabled = true;

    displayMatchedLetters(targetWord);
});

document.getElementById('revealNext').addEventListener('click', function() {

    console.log(matchedLetters);

    for (let i = 0; i < matchedLetters.length; i++) {
	if (matchedLetters[i] === '_') {
	    matchedLetters = targetWord.slice(0, i+1);
	    for (let i = matchedLetters.length; i < targetWord.length; i++) {
		matchedLetters += "_";
	    }

	    break;
	}
    }

    displayMatchedLetters(matchedLetters);
});
