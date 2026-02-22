// 1.Find the Anchor: The computer scans all the points to find the absolute leftmost point.
//  Because it's the furthest left, we know with 100% certainty it must be on the outer edge.

// 2.Cast a Line: From this anchor point, the computer essentially "sweeps" a line across the board.
//  It checks the angle to every single other point to find the one that makes the widest outer angle (most counter-clockwise).

// 3.Wrap It: Once it finds that point, it draws a line connecting them.
//  That new point becomes our brand-new anchor.

// 4.Repeat: The computer repeats step 2 and 3, hopping from point to point around the outside edge,
//  until it finally wraps all the way back to the very first anchor point.


MARGIN = 50
N = 20

class track_generator {
    constructor(width, height) {
        this.width = width - MARGIN;
        this.height = height - MARGIN;
        this.randomPoints = [];
    }

    #generateXY() {
        let x = Math.random() * (this.width - MARGIN + 1) + MARGIN;
        let y = Math.random() * (this.height - MARGIN + 1) + MARGIN;
        return [x, y];
    }

    generateRandomNumbers() {
        for (let i = 0; i < N; i++) {
            this.randomPoints.push(this.#generateXY());
        }
    }

    #findLeftPoint() {
        const listX = this.randomPoints.map(innerArray => innerArray[0]);
        // console.log(listX)
        let min = Math.min(...listX);
        // console.log("min", min);
        return listX.indexOf(min);
    }

    drawPoint(ctx, x, y, radius = 3, color = "#FFFF00") {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawPoints(ctx) {
        let leftP = this.#findLeftPoint();
        // console.log(leftP);
        for (let i = 0; i < N; i++) {
            if (i == leftP)
                this.drawPoint(ctx, this.randomPoints[i][0], this.randomPoints[i][1], 5, "#FF0000")
            this.drawPoint(ctx, this.randomPoints[i][0], this.randomPoints[i][1])
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
            if (checking === current){
                continue;
            }
            if (nextPoint === current || this.#isLeftTurn(current, nextPoint, checking)) {
                nextPoint = checking;
            }
        }
        return nextPoint;
    }

    #drawline(ctx,x1, y1, x2, y2, color = "#F0000F", lineWidth = 3) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawLines(ctx) {
        let anchorPoint = this.#findLeftPoint();
        for (let i = 0; i < N; i++) {
            let bp = this.bestPoint(anchorPoint);
            // console.log("bp", bp);
            // this.drawPoint(ctx, bp[0], bp[1], 2, "#FF5FF0");
            // this.#drawline(ctx, anchorPoint.x, anchorPoint.y, bp.x, bp.y)
            anchorPoint = bp;
        }
    }

    track_init(ctx) {
        this.generateRandomNumbers();
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

console.log(raceLoop.randomPointsoints);
