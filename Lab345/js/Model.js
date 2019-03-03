var Model = function() {
	this.units = [];
}

Model.prototype.init = function() {
}

Model.prototype.update = function(dt) {
	this.units.forEach(function(e, i, o) {
		e.x += e.vx * dt;
		
		if (e.x > 1000 - 150 - 58 / 2)
			o.splice(i, 1);
	}.bind(this));
}

Model.prototype.mouseDown = function(x, y) {
	if (this.mouseInRect(x, y, 1000 / 2 - 64 / 2, 0, 64, 64)) {
		this.units.push({
			x: 150 + 58 / 2,
			y: 600 - 60 - 109 / 2,
			vx: 50
		});
	}
}

Model.prototype.mouseInRect = function(mx, my, x, y, w, h) {
	return mx > x && mx < x + w && my > y && my < y + h;
}

var model = new Model();