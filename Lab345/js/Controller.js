var Controller = function (View, Model) {
    this.view = View;
    this.model = Model;
};

Controller.prototype.init = function() {
    this.model.init();
	this.view.init();
	
	document.onmousedown = this.handleMouseDown.bind(this);
	
	this.loop();
};

Controller.prototype.loop = function() {
	var then = 0;
	
	function render(now) {
		now *= 0.001;
		const dt = now - then;
		then = now;
		
		this.update(dt);
		this.view.redraw();
		
		requestAnimationFrame(render.bind(this));
	}
	
	requestAnimationFrame(render.bind(this));
}

Controller.prototype.update = function(dt) {
	this.model.update(dt);
}

Controller.prototype.handleMouseDown = function(event) {
	event = event || window.event;
	
	var field = document.getElementById('field');
	
	var elemLeft = field.offsetLeft;
	var elemTop = field.offsetTop;
	
	var x = event.pageX - elemLeft;
	var y = event.pageY - elemTop;
	
	this.model.mouseDown(x, y);
}

Controller.prototype.getUnits = function() {
	return this.model.units;
}

var controller = new Controller(view, model);

view.bindController(controller);

controller.init();