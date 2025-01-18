const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

// Heart object
class Heart {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.x - this.size,
            this.y + this.size / 3,
            this.x,
            this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size,
            this.y + this.size / 3,
            this.x + this.size / 2,
            this.y - this.size / 2,
            this.x,
            this.y
        );
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 50) * 2;
        if (this.y + this.size < 0) {
            this.y = canvas.height + this.size;
        }
    }
}

// Create random hearts
function createHearts() {
    const x = Math.random() * canvas.width;
    const y = canvas.height + Math.random() * 100;
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 1 + 0.5;
    const color = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 0.8)`;
    hearts.push(new Heart(x, y, size, speed, color));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

// Generate hearts continuously
setInterval(createHearts, 200);
animate();

// Button functionality
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

yesButton.addEventListener('click', () => {
    alert('Yay! You said yes! 💖');
});

noButton.addEventListener('click', () => {
    alert('Oh no! But I’ll keep trying to win your heart! ❤️');
});
