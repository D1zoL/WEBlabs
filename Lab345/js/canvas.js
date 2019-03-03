var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var ctx = this.ctx;
	
	ctx.clearRect(0, 0, 1000, 600);
	
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
	var ctx = this.ctx;
	
	ctx.save();
    ctx.translate(x, y);
	if (mirror)
		ctx.scale(-1, 1);
    ctx.drawImage(this.t[image], -w / 2, -h / 2);
    ctx.restore();
}

View.prototype.init = function() {
	var field = document.getElementById('field');
	
	this.canvas = document.createElement('canvas');
	this.canvas.id = 'canvas';
	this.canvas.setAttribute('width', '1000px');
	this.canvas.setAttribute('height', '600px');
	
	this.ctx = this.canvas.getContext('2d');
	
	this.t = [];
	this.loadTextures();
	
	field.appendChild(this.canvas);
}

View.prototype.loadTextures = function() {
	this.t['back'] = new Image(1000, 600);
	this.t['back'].src = 'assets/img/back.png';

	this.t['base'] = new Image(150, 200);
	this.t['base'].src = 'assets/img/base.png';
	
	this.t['land'] = new Image(1000, 60);
	this.t['land'].src = 'assets/img/land.png';
	
	this.t['unit'] = new Image(58, 109);
	this.t['unit'].src = 'assets/img/unit.png';
	
	this.t['unit_buy'] = new Image(64, 64);
	this.t['unit_buy'].src = 'assets/img/unit_buy.png';
}

var view = new View();