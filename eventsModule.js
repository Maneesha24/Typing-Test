var eventsModule = (function (dataModule, UIModule, certificationModule, wordsModule) {
	var addEventListeners = function () {
		UIModule.getDOMElements().textInput.addEventListener('input', function (event) {
			if (dataModule.testEnded()) {
				return;
			}

			if (!dataModule.testStarted()) {

			}

			var typedWord = UIModule.getTypedWord();

			dataModule.updateCurrentWord(typedWord);

			var currentWord = dataModule.getCurrentWord();
			UIModule.formatWord(currentWord);

			if (UIModule.spacePressed(event) || UIModule.enterPressed()) {
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
