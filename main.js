const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [
    new Car(road.getLaneCenter(2), -100, 30, 50, "DOMMY", 1.5),
    new Car(road.getLaneCenter(1), -150, 30, 50, "DOMMY", 1),
    new Car(road.getLaneCenter(0), -10, 30, 50, "DOMMY", 2)
]

animation();

function animation() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "blue");
    }
    car.draw(ctx, "black");

    ctx.restore();
    requestAnimationFrame(animation);
}
