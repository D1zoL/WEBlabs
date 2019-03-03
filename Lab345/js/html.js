var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var field = document.getElementById('field');
	
	while (field.firstChild)
		field.removeChild(field.firstChild);
	
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
	var field = document.getElementById('field');
	
	var i = document.createElement('div');
	
	i.className = 'image ' + image;
	i.style.left =  (x - w / 2) + 'px';
	i.style.top =  (y - h / 2) + 'px';
	
	if (mirror)
		i.style.transform = 'scale(-1, 1)';
	
	field.appendChild(i);
}

View.prototype.init = function() {
}

var view = new View();