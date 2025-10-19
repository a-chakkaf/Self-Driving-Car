class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 4;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4;

        this.rays = [];
        this.readings = [];
    }

    update(borders) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReadings(this.rays[i], borders)
            );
        }
    }

    #getReadings(ray, borders) {
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                borders[i][0],
                borders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }

            if (touches.length == 0){
                return null;
            }else{
                const offsets = touches.map(e=>e.offset);
            }
        }
    }

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const angle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 1 ? 0.5 : (i / (this.rayCount - 1))
            ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };

            const end = {
                x: this.car.x - Math.sin(angle) * this.rayLength,
                y: this.car.y - Math.cos(angle) * this.rayLength
            }
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        this.rays.forEach(ray => {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(ray[0].x, ray[0].y);
            ctx.lineTo(ray[1].x, ray[1].y);
            ctx.stroke();
        });
    }
}
