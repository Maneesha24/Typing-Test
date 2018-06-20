var certificationModule = (function () {

	return {
		generateCertificate: function (data) {
			var imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAC7CAMAAABIKDvmAAAAJFBMVEX///8AAAB3d3c/Pz98fHw5OTkdHR1GRkZ/f39CQkI+Pj4PDw+DNMNQAAABl0lEQVR4nO3bQQ6CQBQFQRQU0fvf1522mQOMCVUn+OnFCySwXPhaZh/wV9QoNUqNUqPUKDXqU+O1P9dzOo77UGNfzusx1FhnnzTRVY1Qo9SoscYx+6SJ1Cg1So1So9QoNcrzRqlRapQapUapUWqUGqVGqVFqlPeUUqPUKDXKipYapUapUVa01Cg1ym6UGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVG+ni01So2yG6VGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVG+ZOr1Cg1So2yoqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGjXW2GefNNE21Lhv17PabkMNLmr8UqPUKDVKjVKj1Kg3FHckehXgbgMAAAAASUVORK5CYII=";

			var doc = new jsPDF();
			doc.addImage(imageData, 'JPEG', 15, 40, 180, 160);

			doc.setFont("times");
			doc.setFontType("bold");
			doc.setTextColor(49, 216, 189);
			doc.setFontSize(25);
			doc.text(105, 70, 'TYPING SPEED CERTIFICATE', 'center');

			doc.setFontSize(14);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("italic");
			doc.text(108, 83, 'This Certificate is Hereby Awarded to :', 'center');

			var button = event.target;
			var nameField = button.parentElement.previousElementSibling.children[1].children[1];
			var name = nameField.value;
			doc.setTextColor(49, 216, 189);
			doc.setFontSize(19);
			doc.setFontType("bold");
			doc.text(108, 92, name, 'center');

			doc.setFontSize(14);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("italic");
			doc.text(108, 103, 'For achieving results noted below as documented', 'center');
			doc.text(108, 110, 'and verified.', 'center');

			var level = event.target.getAttribute('level');
			doc.setFontType("normal");
			doc.text(110, 123, 'Level: ' + level, 'center');
			doc.text(110, 133, 'Average Speed: ' + data.wpm + ' wpm', 'center');
			doc.text(110, 143, 'Accuracy: ' + data.accuracy + '%', 'center');

			var date = new Date();
			date = date.toLocaleDateString('en-US');
			doc.setFontType("italic");
			doc.text(133, 165, 'Awarded on :' + date);
			doc.setTextColor(49, 216, 189);
			doc.setFontSize(19);
			doc.setFontType("bold");
			doc.text(155, 173, 'xxxxx')

			doc.save('certificate.pdf');

		}
	};
})();
