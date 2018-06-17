var UIModule = (function () {
	
	var DOMElements = {
		timeLeft : '',
		wpm: '',
		wpmChange: '',
		cpm : '',
		cpmChange: '',
		accuracy: '',
		accuracyChange: '',
		textInput: '',
		nameInput: '',
		content: document.getElementById('content'),
		activeWord : '',
		modal: ''
	};

	var splitArray = function (string) {
		return string.split('');
	};
	var addSpace = function (array) {
		array.push(' ');
		return array;
	};

	var addSpanTag = function (array) {
		return array.map(function (currentCharacter) {
			return '<span>' + currentCharacter + '</span>'
		});
	};

	var addWordSpanTag = function (array) {
		array.push('</span>');
		array.unshift('<span>');
		return array;
	};
	
	var joinEachWord = function(array){
		return array.join('');
	}
	return {
		fillContent: function (array, lineReturn) {

			var content = array.map(splitArray);
			content = content.map(addSpace);
			content = content.map(addSpanTag);
			content = content.map(addWordSpanTag);
			content = content.map(joinEachWord);
			content = content.join('');
			content = content.split('<span>' + lineReturn +'</span>').join('<span>&crarr;</span>');
			DOMElements.content.innerHTML = content;

		},
	}
})()
