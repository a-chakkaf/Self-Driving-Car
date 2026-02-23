// 1.Find the Anchor: The computer scans all the points to find the absolute leftmost point.
//  Because it's the furthest left, we know with 100% certainty it must be on the outer edge.

// 2.Cast a Line: From this anchor point, the computer essentially "sweeps" a line across the board.
//  It checks the angle to every single other point to find the one that makes the widest outer angle (most counter-clockwise).

// 3.Wrap It: Once it finds that point, it draws a line connecting them.
//  That new point becomes our brand-new anchor.

// 4.Repeat: The computer repeats step 2 and 3, hopping from point to point around the outside edge,
//  until it finally wraps all the way back to the very first anchor point.


MARGIN = 50
N = 7

class track_generator {
    constructor(width, height) {
        this.width = width - MARGIN;
        this.height = height - MARGIN;
        this.randomPoints = [];
    }

    #generateXY() {
        let val_x = Math.random() * (this.width - MARGIN + 1) + MARGIN;
        let val_y = Math.random() * (this.height - MARGIN + 1) + MARGIN;
        return { x: val_x, y: val_y };
    }

    #generateRandomNumbers() {
        for (let i = 0; i < N; i++) {
            this.randomPoints.push(this.#generateXY());
        }
    }

    #findLeftPoint() {
        const listX = this.randomPoints.map(innerArray => innerArray.x);
        let min = Math.min(...listX);
        return this.randomPoints[listX.indexOf(min)];
    }

    drawPoint(ctx, p, radius = 3, color = "#FFFF00") {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawPoints(ctx) {
        for (let i = 0; i < N; i++) {
            this.drawPoint(ctx, this.randomPoints[i].x, this.randomPoints[i].y)
        }
    }

    #isLeftTurn(p, q, r) {
        let turn = (q.x - p.x) * (r.y - q.y) - (q.y - p.y) * (r.x - q.x);
        return turn < 0;
    }

    bestPoint(anchorPoint) {
        let current = anchorPoint;
        let nextPoint = this.randomPoints[0];

        for (let i = 0; i < N; i++) {
            let checking = this.randomPoints[i];
            if (checking === current) {
                continue;
            }
            if (nextPoint === current || this.#isLeftTurn(current, nextPoint, checking)) {
                nextPoint = checking;
            }
        }
        return nextPoint;
    }

    #drawline(ctx, p1, p2, color = "#F0000F", lineWidth = 3) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    drawLines(ctx) {
        let anchorPoint = this.#findLeftPoint();
        for (let i = 0; i < N; i++) {
            let bp = this.bestPoint(anchorPoint);
            this.drawPoint(ctx, bp, 2, "#FF5FF0");
            this.#drawline(ctx, anchorPoint, bp);
            anchorPoint = bp;
        }
    }

    track_init(ctx) {
        this.#generateRandomNumbers();
        this.drawPoints(ctx);
        this.drawLines(ctx);
    }
}


const canvas = document.getElementById("Canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let raceLoop = new track_generator(canvas.width, canvas.height);


raceLoop.track_init(ctx);

// console.log(raceLoop.randomPointsoints);
