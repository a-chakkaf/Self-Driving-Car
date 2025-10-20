class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.accelaration = 0.2;
		this.maxSpeed = 3;
		this.friction = 0.05;
		this.angle = 0;
		this.damaged = false;
		this.points = [];

		this.sensor = new Sensor(this);
		this.control = new Control();
	}

	update(borders) {
		this.#move();
		this.points = this.#createPolygon();
		this.damage = this.#assessDamage(borders);
		this.sensor.update(borders);
	}

	#assessDamage(borders){

		// for (let i  = 0; i < this.points.length; i++){
		// 	for(let j = 0; j < borders.length; j++){
		// 		const damage = getIntersection(
		// 			borders[j][0],
		// 			borders[j][1],
		// 			this.points[i], this.points[i])
		// 	}

		// }
		j
	}

	#move() {
		if (this.control.forward) {
			this.speed += this.accelaration;
		}
		if (this.control.reverse) {
			this.speed -= this.accelaration;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}
		if (this.speed < -this.maxSpeed / 2) {
			this.speed = -this.maxSpeed / 2;
		}

		if (this.speed > 0) {
			this.speed -= this.friction;
		}
		if (this.speed < 0) {
			this.speed += this.friction;
		}

		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed != 0) {

			const flip = this.speed > 0 ? 1 : -1;

			if (this.control.left) {
				this.angle += 0.03 * flip;
			}
			if (this.control.right) {
				this.angle -= 0.03 * flip;
			}
		}

		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

	#createPolygon() {

		const points = [];
		const rad = Math.hypot(this.width, this.height) / 2;
		const alpha = Math.atan2(this.width, this.height);

		points.push({
			x: this.x - rad * Math.sin(this.angle - alpha),
			y: this.y - rad * Math.cos(this.angle - alpha)
		});

		points.push({
			x: this.x - rad * Math.sin(this.angle + alpha),
			y: this.y - rad * Math.cos(this.angle + alpha)
		});

		points.push({
			x: this.x - rad * Math.sin(Math.PI + this.angle - alpha),
			y: this.y - rad * Math.cos(Math.PI + this.angle - alpha)
		});

		points.push({
			x: this.x - rad * Math.sin(Math.PI + this.angle + alpha),
			y: this.y - rad * Math.cos(Math.PI + this.angle + alpha)
		});

		return points;
	}

	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for(let i = 1; i < this.points.length; i++){
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}

		ctx.fill();
		ctx.restore();

		this.sensor.draw(ctx);
	}
}
