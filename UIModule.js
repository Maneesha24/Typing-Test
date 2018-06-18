var UIModule = (function () {

	var DOMElements = {
		timeLeft: document.getElementById('timeLeft'),
		wpm: document.getElementById('wpm'),
		wpmChange: document.getElementById('wpmChange'),
		cpm: document.getElementById('cpm'),
		cpmChange: document.getElementById('cpmChange'),
		accuracy: document.getElementById('accuracy'),
		accuracyChange: document.getElementById('accuracyChange'),
		textInput: document.querySelector('#input'),
		nameInput: document.querySelector('.form-group'),
		content: document.getElementById('content'),
		activeWord: '',
		modal: $('#myModal')
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

	var joinEachWord = function (array) {
		return array.join('');
	};

	var userValue;
	var returnCharClass = function (currentCharacter, index) {
		return (index < userValue.length) ? (currentCharacter == userValue[index] ? 'correctCharacter' : 'wrongCharacter') : '0';


	};

	return {
		inputFocus: function () {
			DOMElements.textInput.focus();
		},
		getDOMElements: function () {
			return {
				textInput: DOMElements.textInput
			};
		},

		fillContent: function (array, lineReturn) {

			var content = array.map(splitArray);
			content = content.map(addSpace);
			content = content.map(addSpanTag);
			content = content.map(addWordSpanTag);
			content = content.map(joinEachWord);
			content = content.join('');
			content = content.split('<span>' + lineReturn + '</span>').join('<span>&crarr;</span>');
			DOMElements.content.innerHTML = content;

		},

		scroll: function () {
			var activeWord = DOMElements.activeWord;
			var top1 = activeWord.offsetTop;
			var top2 = DOMElements.content.offsetTop;
			var diff = top1 - top2;
			DOMElements.content.scrollTop = diff - 40;
		},

		spacePressed: function (event) {
			return event.data == ' '
		},

		enterPressed: function (lineReturn) {

			return this.getTypedWord().includes(lineReturn + ' ');
		},

		emptyInput: function () {
			DOMElements.textInput.value = '';
		},

		getTypedWord: function () {
			return DOMElements.textInput.value;
		},

		formatWord: function (wordObject) {
			var activeWord = DOMElements.activeWord;
			activeWord.className = 'activeWord';

			var correctValue = wordObject.value.correct;
			userValue = wordObject.value.user;


			var classes = Array.prototype.map.call(correctValue,
				returnCharClass);
			var activeWord = DOMElements.activeWord;
			var characters = activeWord.children;

			for (var i = 0; i < characters.length; i++) {
				characters[i].removeAttribute('class');
				characters[i].className = classes[i];
			}

		},

		updateTimeLeft: function (x) {
			DOMElements.timeLeft.innerHTML = x;
		},

		setActiveWord: function (index) {

			DOMElements.activeWord = DOMElements.content.children[index];

		},
		deactivateCurrentWord: function () {
			DOMElements.activeWord.removeAttribute('class');
		}
	}
})()
