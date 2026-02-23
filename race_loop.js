// 1.Find the Anchor: The computer scans all the points to find the absolute leftmost point.
//  Because it's the furthest left, we know with 100% certainty it must be on the outer edge.

// 2.Cast a Line: From this anchor point, the computer essentially "sweeps" a line across the board.
//  It checks the angle to every single other point to find the one that makes the widest outer angle (most counter-clockwise).

// 3.Wrap It: Once it finds that point, it draws a line connecting them.
//  That new point becomes our brand-new anchor.

// 4.Repeat: The computer repeats step 2 and 3, hopping from point to point around the outside edge,
//  until it finally wraps all the way back to the very first anchor point.


MARGIN = 50
N = 27

class track_generator {
    constructor(width, height) {
        this.width = width - MARGIN;
        this.height = height - MARGIN;
        this.randomPoints = [];
        this.trackCorners = [];
    }

    #generateXY() {
        let val_x = Math.random() * (this.width - MARGIN + 1) + MARGIN;
        let val_y = Math.random() * (this.height - MARGIN + 1) + MARGIN;
        return { x: val_x, y: val_y };
    }

    generateRandomNumbers() {
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

    // POINTS is an array
    drawPoints(ctx, points, radius = 3, color = "#FFFF00") {
        for (let i = 0; i < points.length; i++) {
            this.drawPoint(ctx, points[i], radius, color)
        }
    }

    #isLeftTurn(p, q, r) {
        let turn = (q.x - p.x) * (r.y - q.y) - (q.y - p.y) * (r.x - q.x);
        return turn < 0;
    }

    bestPoint(anchorPoint) {
        let current = anchorPoint;
        let nextPoint = this.randomPoints[0];

        for (let i = 0; i < this.randomPoints.length; i++) {
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
        ctx.lineJoin = "round"
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    cornerPoints() {
        // Save the very first point so we know when to stop
        let firstAnchor = this.#findLeftPoint();
        let anchorPoint = firstAnchor;
        do {
            this.trackCorners.push(anchorPoint);
            let bp = this.bestPoint(anchorPoint);
            anchorPoint = bp;
        } while (anchorPoint !== firstAnchor); // Stop the moment we connect back to the start!
    }

    linkCorners(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.trackCorners[0].x, this.trackCorners[0].y);

        for(let i = 1; i < this.trackCorners.length; i++){
            ctx.lineTo(this.trackCorners[i].x, this.trackCorners[i].y);
        }

        ctx.closePath();

        ctx.lineWidth = 100;
        ctx.strokeStyle = "gray";
        ctx.lineJoin = "round";

        ctx.stroke();
    }

    cornerCuttingMath(a, b) {
        let x = a.x * 0.75 + b.x * 0.25;
        let y = a.y * 0.75 + b.y * 0.25;
        let X1 = { x, y };
        x = a.x * 0.25 + b.x * 0.75;
        y = a.y * 0.25 + b.y * 0.75;
        let X2 = { x, y };

        return [X1, X2];
    }

    cornerCutting() {
        let points = [];

        // points.push(this.trackCorners[0]);
        for (let i = 0; i < this.trackCorners.length; i++) {
            let A = this.trackCorners[i];
            let B = this.trackCorners[(i + 1) % this.trackCorners.length];
            let [X1, X2] = this.cornerCuttingMath(A, B);

            points.push(X1, X2);
        }
        this.trackCorners = points;
    }

    track_init(ctx) {
        this.generateRandomNumbers();
        this.cornerPoints();
        this.cornerCutting();
        this.linkCorners(ctx);
        // this.drawPoints(ctx, this.trackCorners);
    }
}


const canvas = document.getElementById("Canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let raceLoop = new track_generator(canvas.width, canvas.height);


raceLoop.track_init(ctx);

// console.log(raceLoop.randomPointsoints);
