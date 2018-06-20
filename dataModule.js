var dataModule = (function () {

	var lineReturn = '|';
	var shuffle = function (array) {
		var newArray = [];
		var randomIndex;
		var randomElement;
		while (array.length > 0) {
			randomIndex = Math.floor(Math.random() * array.length);
			randomElement = array[randomIndex];
			newArray.push(randomElement);
			array.splice(randomIndex, 1);
		}
		return newArray;
	};

	String.prototype.capitalize = function () {
		var newString = '';
		var firstCharCap = this.charAt(0).toUpperCase();
		var remainingChar = this.slice(1);
		newString = firstCharCap + remainingChar;
		return newString;
	};

	var capitalizeRandom = function (arrayOfStrings) {
		return arrayOfStrings.map(function (currentWord) {

			var x = Math.floor(4 * Math.random());
			return (x == 3) ? currentWord.capitalize() : currentWord;
		})
	};

	var addRandomPunctuation = function (arrayOfStrings) {
		return arrayOfStrings.map(function (currentWord) {
			var randomPunctuation;
			var items = [lineReturn, '?', '', '', '', '', '.', '', ',', '', '', '', '', '', '', '!', '', '', '', '', ''];
			var randomIndex = Math.floor(Math.random() * items.length);
			randomPunctuation = items[randomIndex];
			return currentWord + randomPunctuation;
		});
	};

	var nbCorrectChar;
	var charCallback = function (currentElement, index) {
		nbCorrectChar += (currentElement == this.characters.user[index]) ? 1 : 0;
	};


	var appData = {
		indicators: {
			testStarted: false,
			testEnded: false,
			totalTestTime: 0,
			timeLeft: 0
		},
		results: {
			wpm: 0,
			wpmChange: 0,
			cpm: 0,
			cpmChange: 0,
			accuracy: 0,
			accuracyChange: 0,
			numOfCorrectWords: 0,
			numOfCorrectCharacters: 0,
			numOfTestCharacters: 0
		},
		words: {
			currentWordIndex: -1,
			testWords: [],
			currentWord: {}
		},
	};

	var word = function (index) {
		this.value = {
			correct: appData.words.testWords[index] + ' ',
			user: '',
			isCorrect: false
		};
		this.characters = {
			correct: this.value.correct.split(''),
			user: [],
			totalCorrect: 0,
			totalTest: this.value.correct.length
		};

	};

	word.prototype.update = function (value) {
		this.value.user = value;
		this.value.isCorrect = (this.value.correct == this.value.user);

		this.characters.user = this.value.user.split('');
		nbCorrectChar = 0;

		var charCallback2 = charCallback.bind(this);
		this.characters.correct.forEach(charCallback2);

		this.characters.totalCorrect = nbCorrectChar;

	};


	return {
		setTestTime: function (x) {
			appData.indicators.totalTestTime = x;
		},

		initializeTimeLeft: function (x) {

			appData.indicators.timeLeft = appData.indicators.totalTestTime;
		},

		startTest: function () {
			appData.indicators.testStarted = true;
		},
		
		endTest :  function(){
			appData.indicators.testEnded = true;
		},

		getTimeLeft: function () {
			return appData.indicators.timeLeft;
		},

		reduceTime: function () {
			appData.indicators.timeLeft--;
			return appData.indicators.timeLeft;
		},

		timeLeft: function () {
			return appData.indicators.timeLeft != 0;
		},

		testEnded: function () {
			return appData.indicators.testEnded;
		},

		testStarted: function () {
			return appData.indicators.testStarted;
		},

		calculateWpm: function () {
			var wpmOld = appData.results.wpm;
			var numOfCorrectWords = appData.results.numOfCorrectWords;
			if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
				appData.results.wpm = Math.round(60 * numOfCorrectWords / (appData.indicators.totalTestTime - appData.indicators.timeLeft));


			} else {
				appData.results.wpm = 0;
			}

			appData.results.wpmChange = appData.results.wpm - wpmOld;

			return [appData.results.wpm, appData.results.wpmChange];
		},

		calculateCpm: function () {

			var cpmOld = appData.results.cpm;
			var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
			if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
				appData.results.cpm = Math.round(60 * numOfCorrectCharacters / (appData.indicators.totalTestTime - appData.indicators.timeLeft));


			} else {
				appData.results.cpm = 0;
			}

			appData.results.cpmChange = appData.results.cpm - cpmOld;

			return [appData.results.cpm, appData.results.cpmChange];

		},

		calculateAccuracy: function () {
			var accuracyOld = appData.results.accuracy;
			var numOfCorrectCharacters = appData.results.numOfCorrectCharacters;
			var numOfTestCharacters = appData.results.numOfTestCharacters;

			if (appData.indicators.timeLeft != appData.indicators.totalTestTime) {
				if (numOfTestCharacters != 0) {
					appData.results.accuracy = Math.round(100 * numOfCorrectCharacters / numOfTestCharacters);
				} else {
					appData.results.accuracy = 0
				}
			} else {
				appData.results.accuracy = 0;
			}
			appData.results.accuracyChange = appData.results.accuracy - accuracyOld;

			return [appData.results.accuracy, appData.results.accuracyChange];

		},


		fillListOfTestWords: function (textNumber, words) {
			var result = words.split(" ");

			if (textNumber == 0) {
				result = shuffle(result);
				result = capitalizeRandom(result);
				result = addRandomPunctuation(result);

			}
			appData.words.testWords = result;
		},

		getListOfTestWords: function () {
			return appData.words.testWords;
		},

		moveToNewWord: function () {
			if (appData.words.currentWordIndex > -1) {

				if (appData.words.currentWord.value.isCorrect == true) {

					appData.results.numOfCorrectWords++;
				}

				appData.results.numOfCorrectCharacters += appData.words.currentWord.characters.totalCorrect;

				appData.results.numOfTestCharacters += appData.words.currentWord.characters.totalTest;

			}

			appData.words.currentWordIndex++;
			var currentIndex = appData.words.currentWordIndex;
			var newWord = new word(currentIndex);
			appData.words.currentWord = newWord;
		},

		getCurrentWordIndex() {
			return appData.words.currentWordIndex;
		},

		getCurrentWord() {
			var currentWord = appData.words.currentWord;
			return {
				value: {
					correct: currentWord.value.correct,
					user: currentWord.value.user
				}
			};
		},

		updateCurrentWord: function (value) {
			appData.words.currentWord.update(value);
		},

		getLineReturn() {
			return lineReturn;
		},
		 
		getCertificateData (){
			return{
				wpm: appData.indicators.wpm,
				accuracy : appData.indicators.accuracy
			}
		},

		returnData() {
			console.log(appData);
		}
	}
})();
