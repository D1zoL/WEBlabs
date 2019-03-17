var Model = function() {
	this.units = [];
	this.fires = [];
}

Model.prototype.init = function() {
	this.yHp = 1000;
	this.eHp = 1000;
	
	this.spawnTimer1 = 0.0;
	this.spawnTimer2 = 0.0;
	this.spawnTimer3 = 0.0;
	
	this.menu = true;
	
	this.level = 1;
}

Model.prototype.update = function(dt) {
	if (this.menu)
		return;
	
	this.spawnTimer1 += dt;
	if (this.spawnTimer1 > 6.0) {
		this.units.push({
			x: 1000 - 150 - 58 / 2,
			y: 600 - 60 - 109 / 2,
			vx: -100,
			player: 2,
			hp: 100,
			cd: 0.0,
			type: 1
		});
		
		this.spawnTimer1 = 0.0;
	}
	
	this.spawnTimer2 += dt;
	if (this.spawnTimer2 > 12.0) {
		this.units.push({
			x: 1000 - 150 - 58 / 2,
			y: 600 - 60 - 109 / 2,
			vx: -100,
			player: 2,
			hp: 100,
			cd: 0.0,
			type: 2
		});
		
		this.spawnTimer2 = 0.0;
	}
	
	this.spawnTimer3 += dt;
	if (this.spawnTimer3 > 19.0) {
		this.units.push({
			x: 1000 - 150 - 58 / 2,
			y: 600 - 60 - 109 / 2,
			vx: -100,
			player: 2,
			hp: 100,
			cd: 0.0,
			type: 3
		});
		
		this.spawnTimer3 = 0.0;
	}
	
	this.fires.forEach(function(e, i, o) {
		e.x += e.vx * dt;
		
		var ex = true;
		
		for (var j = 0; j < this.units.length; j++) {
			var u = this.units[j];
			
			var ep = e.player;
			var up = u.player;
			
			if (ep != up) {			
				if (e.x > u.x - 58 / 2 && e.x < u.x + 58 / 2) {
					this.units[j].hp -= e.damage;
					if (this.units[j].hp <= 0) {
						this.units.splice(j, 1);
					}
					
					o.splice(i, 1);
					ex = false;
					break;
				}
			}
		}
		
		if (ex) {
			if (e.x > 1000 - 150) {
				o.splice(i, 1);
				
				this.eHp -= e.damage;
				if (this.eHp <= 0) {
					alert("You win");
					location.reload();
				}
			}
			else if (e.x < 150) {
				o.splice(i, 1);
				
				this.yHp -= e.damage;
				if (this.yHp <= 0) {
					alert("You lose");
					location.reload();
				}
			}
		}
	}.bind(this));
	
	this.units.forEach(function(e, i, o) {
		e.cd += dt;
		
		var collide = false;
		var friend = false;
		
		if (e.player == 1)
			collide = e.x > 1000 - 150 - 58 / 2 - 100;
		else
			collide = e.x < 150 + 58 / 2 + 200;
		
		if (!collide) {
			for (var i = 0; i < this.units.length; i++) {
				var cr = e.x + 58 / 2;
				if (e.player == 2)
					cr = e.x - 58 / 2;
				
				var or = this.units[i].x + 58 / 2;
				var ol = this.units[i].x - 58 / 2;
				
				if (cr > ol && cr < or) {
					collide = true;
					
					friend = e.player == this.units[i].player;
					
					break;
				}
			}
		}
		
		if (collide) {
			if (e.cd > 1.0 && !friend)
			{
				this.fires.push({
					x: e.x,
					y: e.y,
					vx: e.vx * 2,
					player: e.player,
					damage: e.type * 20
				});
				
				e.cd = 0.0;
			}
		}
		else
			e.x += e.vx * dt;
	}.bind(this));
}

Model.prototype.mouseDown = function(x, y) {
	if (this.menu) {
		if (this.mouseInRect(x, y, 100 - 30, 200 - 20, 140, 50)) {
			this.menu = false;
			this.level = 1;
		}
		else if (this.mouseInRect(x, y, 100 - 30, 300 - 20, 140, 50)) {
			this.menu = false;
			this.level = 2;
		}
	}
	else {
		if (this.mouseInRect(x, y, 1000 / 2 - 64 / 2 - 64, 0, 64, 64)) {
			this.units.push({
				x: 150 + 58 / 2,
				y: 600 - 60 - 109 / 2,
				vx: 100,
				player: 1,
				hp: 100,
				cd: 0.0,
				type: 1
			});
		}
		else if (this.mouseInRect(x, y, 1000 / 2 - 64 / 2, 0, 64, 64)) {
			this.units.push({
				x: 150 + 58 / 2,
				y: 600 - 60 - 109 / 2,
				vx: 100,
				player: 1,
				hp: 100,
				cd: 0.0,
				type: 2
			});
		}
		else if (this.mouseInRect(x, y, 1000 / 2 - 64 / 2 + 64, 0, 64, 64)) {
			this.units.push({
				x: 150 + 58 / 2,
				y: 600 - 60 - 109 / 2,
				vx: 100,
				player: 1,
				hp: 100,
				cd: 0.0,
				type: 3
			});
		}
		else if (this.mouseInRect(x, y, 55 - 2, 85 - 2, 130 + 4, 40 + 4))
			this.save();
		else if (this.mouseInRect(x, y, 55 - 2, 145 - 2, 130 + 4, 40 + 4))
			this.load();
	}
}

Model.prototype.save = function() {
	localStorage.setItem("aow", JSON.stringify({
		units: this.units,
		fires: this.fires,
		yHp: this.yHp,
		eHp: this.eHp,
		level: this.level,
		spawnTimer1: this.spawnTimer1,
		spawnTimer2: this.spawnTimer2,
		spawnTimer3: this.spawnTimer3
	}));
}

Model.prototype.load = function() {
	var data = JSON.parse(localStorage.getItem("aow"));
	
	this.units = data.units;
	this.fires = data.fires;
	this.yHp = data.yHp;
	this.eHp = data.eHp;
	this.level = data.level;
	this.spawnTimer1 = data.spawnTimer1;
	this.spawnTimer2 = data.spawnTimer2;
	this.spawnTimer3 = data.spawnTimer3;
}

Model.prototype.mouseInRect = function(mx, my, x, y, w, h) {
	return mx > x && mx < x + w && my > y && my < y + h;
}

var model = new Model();