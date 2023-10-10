const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100; 
const angularSpeed = 0.01; 
const maxDistance = 5; // Maximum distance from the center

class Tihar {
    constructor(angle) {
        this.angle = angle;
        this.x = centerX + radius * Math.cos(angle);
        this.y = centerY + radius * Math.sin(angle);
        this.distance = 0; 
        this.opacity = 1; 
        this.rotation = 0; 
        setInterval(() => {           
            this.color = this.getRandomColor();
        }, 200);
    }

    draw() {
        for (let i = 0; i < 50; i++) {
            const circleX = this.x + (this.distance + i * 5) * Math.cos(this.angle);
            const circleY = this.y + (this.distance + i * 5) * Math.sin(this.angle);
            c.beginPath();
            c.arc(circleX, circleY, 10, 0, 2 * Math.PI);
            c.fillStyle = `rgba(${this.color}, ${this.opacity})`; // Corrected variable name
            c.fill();
        }
    }

    move() {
        if (this.distance < maxDistance) {
            this.distance += 0.03; // Increase the distance from the center with a smaller increment
        }
        const expandFactor = Math.min(1, this.distance / 5); // Calculate the expand factor based on the distance
        this.x = centerX + (radius + this.distance) * Math.cos(this.angle) * expandFactor;
        this.y = centerY + (radius + this.distance) * Math.sin(this.angle) * expandFactor;
        this.rotation += angularSpeed; // Update the rotation angle
        const newX = (this.x - centerX) * Math.cos(this.rotation) - (this.y - centerY) * Math.sin(this.rotation);
        const newY = (this.x - centerX) * Math.sin(this.rotation) + (this.y - centerY) * Math.cos(this.rotation);
        this.x = newX + centerX;
        this.y = newY + centerY;
    }

    update() {
        this.move();
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "";
        for (let i = 0; i < 3; i++) {
            const component = Math.floor(Math.random() * 256);
            color += component + ",";
        }
        return color.slice(0, -1); 
    }

     star()
     {
    for(let i = 1; i<=523; i++)

    {
        let color1 = getRandomColor();
     c.beginPath();
    c.fillStyle = "white";
    c.rect(Math.random() * 800, Math.random() * 800, 5,5);
    c.fill();
  } 
}
}

const arr = [];

for (let i = 0; i < 30; i++) {
    const angle = (Math.PI * 2 * (i + 20)) / 30 + Math.PI; // Divide the circle into 30 equal parts for the additional objects and add Math.PI to rotate them in the outer circular motion
    const obj = new Tihar(angle);
    obj.distance = maxDistance + 0.5; // Set the initial distance for the additional objects
    arr.push(obj);
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < arr.length; i++) {
        arr[i].update();
        arr[i].draw();
        
    }

    requestAnimationFrame(animate);
}

animate();
