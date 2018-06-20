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

			doc.setTextColor(49, 216, 189);
			doc.setFontSize(19);
			doc.setFontType("bold");
			doc.text(108, 92, 'Name', 'center');
			
			doc.setFontSize(14);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("italic");
			doc.text(108,103,'For achieving results noted below as documented','center');
			doc.text(108,110,'and verified.','center');
			
			doc.setFontType("oblique");
			doc.text(110,123,'Level: Expert','center');
			doc.text(110,133,'Average Speed: 84 wpm','center');
			doc.text(110,143,'Accuracy:100%','center');
			
			doc.text(133,173,'Awarded on 10/31/2017')
			

			doc.save('certificate.pdf');

		}
	};
})();
