var certificationModule = (function(){
    
    return {
        generateCertificate: function(data){
			var imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAC7CAMAAABIKDvmAAAAJFBMVEX///8AAAB3d3c/Pz98fHw5OTkdHR1GRkZ/f39CQkI+Pj4PDw+DNMNQAAABl0lEQVR4nO3bQQ6CQBQFQRQU0fvf1522mQOMCVUn+OnFCySwXPhaZh/wV9QoNUqNUqPUKDXqU+O1P9dzOo77UGNfzusx1FhnnzTRVY1Qo9SoscYx+6SJ1Cg1So1So9QoNcrzRqlRapQapUapUWqUGqVGqVFqlPeUUqPUKDXKipYapUapUVa01Cg1ym6UGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVG+ni01So2yG6VGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVG+ZOr1Cg1So2yoqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGqVGqVFqlBqlRqlRapQapUapUWqUGjXW2GefNNE21Lhv17PabkMNLmr8UqPUKDVKjVKj1Kg3FHckehXgbgMAAAAASUVORK5CYII=";
			
			var doc = new jsPDF();
			doc.addImage(imageData, 'JPEG', 15,40,180,160);
			doc.save('certificate.pdf');
			
		}
    };
})();