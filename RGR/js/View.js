var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var ctx = this.ctx;
	
	ctx.clearRect(0, 0, 1000, 600);
	
	if (this.controller.menu()) {
		this.drawElement('menu', 1000 / 2, 600 / 2, 1000, 600);
		
		ctx.fillStyle = 'black';
		
		ctx.fillRect(100 - 30, 200 - 20, 140, 50);
		ctx.fillRect(100 - 30, 300 - 20, 140, 50);
		
		ctx.fillStyle = 'white';
		
		ctx.fillRect(100 - 30 + 5, 200 - 20 + 5, 140 - 10, 50 - 10);
		ctx.fillRect(100 - 30 + 5, 300 - 20 + 5, 140 - 10, 50 - 10);
		
		ctx.fillStyle = 'black';
		
		ctx.fillText("Уровень 1", 90, 210);
		ctx.fillText("Уровень 2", 90, 310);
	}
	else {
		var level = this.controller.getLevel();
		
		this.drawElement('back' + level, 1000 / 2, 600 / 2, 1000, 600);
		this.drawElement('land', 1000 / 2, 600 - 60 / 2, 1000, 60);
		
		this.drawElement('base' + level, 150 / 2, 600 - 60 - 200 / 2, 150, 200);
		this.drawElement('base' + level, 1000 - 150 / 2, 600 - 60 - 200 / 2, 150, 200, true);
		
		this.drawElement('unit1_buy', 1000 / 2 - 64, 64 / 2, 64, 64);
		this.drawElement('unit2_buy', 1000 / 2, 64 / 2, 64, 64);
		this.drawElement('unit3_buy', 1000 / 2 + 64, 64 / 2, 64, 64);
		
		var units = this.controller.getUnits();
		
		for (var i = 0; i < units.length; i++) {
			var u = units[i];
			this.drawElement('unit' + u.type, u.x, u.y, 58, 109, u.player == 2);
			
			var hp = u.hp;
			ctx.fillStyle = 'black';
			ctx.fillRect(u.x - 25 - 1, u.y - 90 - 1, 52, 10);
			
			ctx.fillStyle = 'red';
			ctx.fillRect(u.x - 25, u.y - 90, hp / 2, 8);
		
		}
		
		var fires = this.controller.getFires();
		
		for (var i = 0; i < fires.length; i++) {
			var u = fires[i];
			this.drawElement('fire', u.x, u.y, 15, 15);
		
		}
		
		var yhp = this.controller.getYourHP();
		var ehp = this.controller.getEnemyHP();
		
		ctx.fillStyle = 'black';
		ctx.fillRect(4, 4, 302, 17);
		ctx.fillRect(694, 4, 302, 17);
		
		ctx.fillStyle = 'red';
		ctx.fillRect(5, 5, yhp / 10 * 3, 15);
		ctx.fillRect(695, 5, ehp / 10 * 3, 15);
		
		
		// save / load
		ctx.fillStyle = 'black';
		
		ctx.fillRect(55 - 2, 85 - 2, 130 + 4, 40 + 4);
		ctx.fillRect(55 - 2, 145 - 2, 130 + 4, 40 + 4);
		
		ctx.fillStyle = 'white';
		
		ctx.fillRect(55, 85, 130, 40);
		ctx.fillRect(55, 145, 130, 40);
		
		ctx.fillStyle = 'black';
		
		ctx.fillText("Сохранить", 70, 110);
		ctx.fillText("Загрузить", 70, 170);
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
	this.ctx.font = "22px Arial";
	
	this.t = [];
	this.loadTextures();
	
	field.appendChild(this.canvas);
}

View.prototype.loadTextures = function() {
	this.t['back1'] = new Image(1000, 600);
	this.t['back1'].src = 'assets/img/back1.png';
	
	this.t['back2'] = new Image(1000, 600);
	this.t['back2'].src = 'assets/img/back2.png';
	
	this.t['menu'] = new Image(1000, 600);
	this.t['menu'].src = 'assets/img/menu.png';

	this.t['base1'] = new Image(150, 200);
	this.t['base1'].src = 'assets/img/base1.png';
	
	this.t['base2'] = new Image(150, 200);
	this.t['base2'].src = 'assets/img/base2.png';
	
	this.t['land'] = new Image(1000, 60);
	this.t['land'].src = 'assets/img/land.png';
	
	this.t['unit1'] = new Image(58, 109);
	this.t['unit1'].src = 'assets/img/unit1.png';
	
	this.t['unit2'] = new Image(58, 109);
	this.t['unit2'].src = 'assets/img/unit2.png';
	
	this.t['unit3'] = new Image(58, 109);
	this.t['unit3'].src = 'assets/img/unit3.png';
	
	this.t['unit1_buy'] = new Image(64, 64);
	this.t['unit1_buy'].src = 'assets/img/unit1_buy.png';
	
	this.t['unit2_buy'] = new Image(64, 64);
	this.t['unit2_buy'].src = 'assets/img/unit2_buy.png';
	
	this.t['unit3_buy'] = new Image(64, 64);
	this.t['unit3_buy'].src = 'assets/img/unit3_buy.png';
	
	this.t['fire'] = new Image(15, 15);
	this.t['fire'].src = 'assets/img/fire.png';
}

var view = new View();