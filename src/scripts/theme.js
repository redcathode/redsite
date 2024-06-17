const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let gl = canvas.getContext('webgl');

let currentTheme;

function hsvToRgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [r * 255, g * 255, b * 255];
}

class BackgroundTheme {
    constructor(ctx, canvas, gl) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.gl = gl;
    }

    start() {
        // Implement this method in subclasses
    }
}

// Star class used by StarryNightTheme
class Star {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.2;
    }

    update() {
        this.x += this.speed;
        if (this.x > this.canvasWidth + this.size * 2) {
            this.x = -2 * this.size;
            this.y = Math.random() * this.canvasHeight;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

class StarryNightTheme extends BackgroundTheme {
    initialize() {
        // console.log('starrynight initialize');
        // Initialize stars array and other properties specific to the StarryNightTheme
        this.stars = [];
        for (let i = 0; i < 1000; i++) {
            this.stars.push(new Star(this.canvas.width, this.canvas.height));
        }
    }

    update() {
        // console.log('starrynight update');
        // Update the stars
        for (let star of this.stars) {
            star.update();
        }
    }

    draw() {
        // console.log('starrynight draw');
        // Draw the stars
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let star of this.stars) {
            star.draw(this.ctx);
        }
    }
    start() {
        this.update();
        this.draw();
        requestAnimationFrame(this.start.bind(this));
    }
}


function setupTheme() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    currentTheme = new StarryNightTheme(ctx, canvas, gl);
    currentTheme.initialize();
    currentTheme.start();
}

// Resize the canvas to fill browser window dynamically
window.addEventListener('resize', setupTheme);
setupTheme();

function decodeEmail(emailElement, buttonElement) {
    let decodedEmail = '';
    let encodedEmail = emailElement.innerHTML;
    for (let i = 0; i < encodedEmail.length; i++) {
        let charCode = encodedEmail.charCodeAt(i);
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            let offset = (charCode >= 97) ? 97 : 65;
            decodedEmail += String.fromCharCode((charCode - offset + 13) % 26 + offset);
        } else {
            decodedEmail += encodedEmail[i];
        }
    }
    emailElement.outerHTML = `<a href="mailto:${decodedEmail}">${decodedEmail}</a>`
    buttonElement.remove();
}