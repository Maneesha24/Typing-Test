var eventsModule = (function (dataModule, UIModule, certificationModule, wordsModule) {
	var addEventListeners = function () {

		UIModule.getDOMElements().textInput.addEventListener('keydown', function (event) {
			console.log(event);

			if (dataModule.testEnded()) {
				return;
			}
			var key = event.keyCode;
			if (key == 13) {
				UIModule.getDOMElements().textInput.value += dataModule.getLineReturn() + ' ';

				var inputEvent = new Event('input');
				UIModule.getDOMElements().textInput.dispatchEvent(inputEvent);
			}

		});

		UIModule.getDOMElements().textInput.addEventListener('input', function (event) {
			if (dataModule.testEnded()) {
				return;
			}

			if (!dataModule.testStarted()) {
				dataModule.startTest();

				var b = setInterval(function () {

					var results = {};
					[results.wpm, results.wpmChange] = dataModule.calculateWpm();

					[results.cpm, results.cpmChange] = dataModule.calculateCpm();

					[results.accuracy, results.accuracyChange] = dataModule.calculateAccuracy();

					UIModule.updateResults(results);


					if (dataModule.timeLeft()) {

						var timeLeft = dataModule.reduceTime();

						UIModule.updateTimeLeft(timeLeft);
					}


				}, 1000);
			}

			var typedWord = UIModule.getTypedWord();

			dataModule.updateCurrentWord(typedWord);

			var currentWord = dataModule.getCurrentWord();
			UIModule.formatWord(currentWord);

			if (UIModule.spacePressed(event) || UIModule.enterPressed(dataModule.getLineReturn())) {
				UIModule.emptyInput();
				UIModule.deactivateCurrentWord();
				dataModule.moveToNewWord();

				var index = dataModule.getCurrentWordIndex();
				UIModule.setActiveWord(index);

				var currentWord = dataModule.getCurrentWord();
				UIModule.formatWord(currentWord);

				UIModule.scroll();

			}
		});

	};

	window.addEventListener('resize', UIModule.scroll);


	return {
		init: function (duration, textNumber) {
			var words = wordsModule.getWords(textNumber);
			dataModule.fillListOfTestWords(textNumber, words);

			var lineReturn = dataModule.getLineReturn();
			var testWords = dataModule.getListOfTestWords();

			UIModule.fillContent(testWords, lineReturn);
			dataModule.setTestTime(duration);
			dataModule.initializeTimeLeft();

			var timeLeft = dataModule.getTimeLeft();
			UIModule.updateTimeLeft(timeLeft);
			dataModule.moveToNewWord();

			var index = dataModule.getCurrentWordIndex();
			UIModule.setActiveWord(index);

			var currentWord = dataModule.getCurrentWord();
			UIModule.formatWord(currentWord);

			UIModule.inputFocus();


			addEventListeners();
		}
	};
})(dataModule, UIModule, certificationModule, wordsModule);
