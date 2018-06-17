var eventsModule = (function (dataModule, UIModule, certificationModule, wordsModule) {
	var addEventListeners = function () {

	}
	return {
		init: function (duration, textNumber) {
			var words = wordsModule.getWords(textNumber);
			dataModule.fillListOfTestWords(textNumber, words);
			var lineReturn = dataModule.getLineReturn();
			var testWords = dataModule.getListOfTestWords();
			UIModule.fillContent(testWords, lineReturn);
			addEventListeners();
		}
	};
})(dataModule, UIModule, certificationModule, wordsModule);
