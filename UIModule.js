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
	}
	return {
		inputFocus: function () {
			DOMElements.textInput.focus();
		},
getDOMElements : function(){
	return{
		textInput : DOMElements.textInput;
	};
}

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
		
		spacePressed:  function(){
			
		}
	
	enterPressed :  function(){
		
	}
	
	getTypedWord : function(){
		return DOMElements.textInput.value;
	}

		formatWord: function (wordObject) {
			var activeWord = DOMElements.activeWord;
			activeWord.className = 'activeWord';


		},

		updateTimeLeft: function (x) {
			DOMElements.timeLeft.innerHTML = x;
		},

		setActiveWord: function (index) {

			DOMElements.activeWord = DOMElements.content.children[index];

		}
	}
})()
