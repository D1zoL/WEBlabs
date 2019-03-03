var ns = 'http://www.w3.org/2000/svg';

var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var svg = document.getElementById('svg');
	
	while (svg.firstChild)
		svg.removeChild(svg.firstChild);
	
	this.drawElement('back', 1000 / 2, 600 / 2, 1000, 600);
	this.drawElement('land', 1000 / 2, 600 - 60 / 2, 1000, 60);
	
	this.drawElement('base', 150 / 2, 600 - 60 - 200 / 2, 150, 200);
	this.drawElement('base', 1000 - 150 / 2, 600 - 60 - 200 / 2, 150, 200, true);
	
	this.drawElement('unit_buy', 1000 / 2, 64 / 2, 64, 64);
	
	var units = this.controller.getUnits();
	
	for (var i = 0; i < units.length; i++) {
		var u = units[i];
		this.drawElement('unit', u.x, u.y, 58, 109);
	}
}

View.prototype.drawElement = function(image, x, y, w, h, mirror) {
	var svg = document.getElementById('svg');
	
	var i = document.createElementNS(ns, 'image');
	
	var cx = (x - w / 2);
	var cy = (y - h / 2);
	
	i.setAttributeNS(null, 'x', '' + cx);
	i.setAttributeNS(null, 'y', '' + cy);
	i.setAttributeNS(null, 'width', '' + w);
	i.setAttributeNS(null, 'height', '' + h);
	i.setAttributeNS(null, 'href', 'assets/img/' + image + '.png');
	
	if (mirror) {
		i.setAttributeNS(null, 'transform', 'scale(-1,1)');
		i.setAttributeNS(null, 'transform-origin', '' + x + ' ' + y);
	}
	
	svg.appendChild(i);	
}

View.prototype.init = function() {
	var field = document.getElementById('field');
	
	var svg = document.createElementNS(ns, 'svg');
	
	svg.id = 'svg';
	svg.setAttribute('width', '1000px');
	svg.setAttribute('height', '600px');
	
	field.appendChild(svg);
}

var view = new View();