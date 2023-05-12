// By Roni Kaufman

let M, N; // number of tiles in width and height
let s; // grid unit square size

let palette = ["#abcd5e", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
let baseColors = ["#050505", "#fffbe6"];
let possibilities = [0, 1, 2];
let colorMode;
let buffer;
let cachedImage;

function initParams() {
  if (random() < 3/4) {
    shuffle(possibilities, true);
    possibilities.pop();
  }
  colorMode = random([0, 1]);
  N = random([10, 7, 3]);
  s = windowHeight/N;
  M = N;
  while (M*s + 400 > windowWidth) M--;
}

function generateGreetings() {
  let word1 = random(["Hey", "Hi", "Hello"]);
  let word2 = random(["", " there"]);
  let punctuation = random(["!", " :)"]);
  let lenguas = random(["こんにちは!", "Ciao!", "Hola!", "Bonjour!", "안녕하세요!"])
  return random([word1+word2+punctuation, lenguas]);
}

function makeGreeting() {
  let greetings = select('#greetings');
  if (greetings) {
    greetings.html(generateGreetings());
  }
}

function colorLinks() {
  let links = selectAll(".colorMe");
  let linkColors = shuffle(palette);
  for (let i = 0; i < links.length; i++) {
    links[i].style("color", linkColors[i%linkColors.length]);
  }
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, buffer.canvas.toDataURL());
}

// returns a dataURL
function createBufferImageDataURL() {
  for (let i = 0; i < windowWidth/M; i++) {
    for (let j = 0; j < windowHeight/N; j++) {
      buffer.fill(random(palette));
      makeTile(buffer, i*s, j*s);
    }
  }
  return {dataURL: buffer.canvas.toDataURL(), buffer: buffer};
}

function windowResized() {
  initParams();
  resizeCanvas(M*s, N*s-1);
}

function preload() {
  let base64Image = localStorage.getItem('buffer');
  if (base64Image) {
    console.log("here");
    // Load the image from the base64 string
    cachedImage = loadImage(base64Image, (result) => {
      // This is the callback function that gets called once the image has loaded
      console.log("Image loaded.", result);
    });
  } else {
    initParams();
    buffer = createGraphics(windowWidth, windowHeight);
    buffer.noStroke();
    data = createBufferImageDataURL();
    saveToLocalStorage('buffer', data.dataURL);
    cachedImage = createBufferImageDataURL().buffer;
  }
}

function setup() {
  makeGreeting();
  colorLinks();
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("p5sketch");
  noLoop();
}

function draw() {
  image(cachedImage, 0, 0, windowWidth, windowHeight);
}

function makeTile(buffer, x, y) {
  buffer.push();
  buffer.translate(x+s/2, y+s/2);
  buffer.rotate(random([0, PI/2, PI, 3*PI/2]));
  buffer.translate(-x-s/2, -y-s/2);

  let u = s/5;

  let r = random(possibilities);
  if (r == 0) {
    buffer.fill(baseColors[1]);
    buffer.square(x, y, s);

    buffer.fill(baseColors[0]);
    buffer.arc(x, y, 4*u, 4*u, 0, PI/2);
    buffer.arc(x+s, y, 2*u, 2*u, PI/2, PI);
    buffer.arc(x+s, y, 4*u, 4*u, PI/2, PI);
    buffer.arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    buffer.arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);
    buffer.arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);
    buffer.arc(x, y+s, 4*u, 4*u, 3*PI/2, TAU);
    buffer.circle(x+s/2, y+s/2, 2*u);

    buffer.fill(baseColors[1]);
    buffer.arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);
    buffer.arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    buffer.arc(x+s, y, 2*u, 2*u, PI/2, PI);
    buffer.arc(x, y, 2*u, 2*u, 0, PI/2);
  } else if (r == 1) {
    buffer.fill(baseColors[0]);
    buffer.square(x, y, s);

    buffer.fill(baseColors[1]);
    buffer.arc(x, y, 6*u, 6*u, 0, PI/2);
    buffer.arc(x+s, y, 2*u, 2*u, PI/2, PI);
    buffer.arc(x+s, y+s, 6*u, 6*u, PI, 3*PI/2);
    buffer.arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);

    buffer.fill(baseColors[0]);
    buffer.arc(x, y, 4*u, 4*u, 0, PI/2);
    buffer.arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);

    buffer.fill(baseColors[1]);
    buffer.arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    buffer.arc(x, y, 2*u, 2*u, 0, PI/2);
  } else if (r == 2) {
    buffer.fill(baseColors[1]);
    buffer.square(x, y, s);

    buffer.fill(baseColors[0]);
    buffer.arc(x, y, 8*u, 8*u, 0, PI/2);
    buffer.arc(x+s, y+3*u/2, u, u, PI/2, 3*PI/2);
    buffer.arc(x+3*u/2, y+s, u, u, PI, TAU);
    buffer.arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);

    buffer.fill(baseColors[1]);
    buffer.arc(x, y, 6*u, 6*u, 0, PI/2);
    buffer.arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);

    buffer.fill(baseColors[0]);
    buffer.arc(x, y, 4*u, 4*u, 0, PI/2);

    buffer.fill(baseColors[1]);
    buffer.arc(x, y, 2*u, 2*u, 0, PI/2);
  } else {
    // nothing
  }

  buffer.fill(baseColors[0]);
  buffer.circle(x+3*u/2, y, u);
  buffer.circle(x+7*u/2, y, u);
  buffer.circle(x+s, y+3*u/2, u);
  buffer.circle(x+s, y+7*u/2, u);
  buffer.circle(x+3*u/2, y+s, u);
  buffer.circle(x+7*u/2, y+s, u);
  buffer.circle(x, y+3*u/2, u);
  buffer.circle(x, y+7*u/2, u);

  buffer.fill(baseColors[1]);
  buffer.circle(x, y, 2*u);
  buffer.circle(x+s, y, 2*u);
  buffer.circle(x, y+s, 2*u);
  buffer.circle(x+s, y+s, 2*u);

  if (colorMode == 0) {
    buffer.fill(random(palette));
    buffer.circle(x, y, u);
    buffer.fill(random(palette));
    buffer.circle(x+s, y, u);
    buffer.fill(random(palette));
    buffer.circle(x, y+s, u);
    buffer.fill(random(palette));
    buffer.circle(x+s, y+s, u);
  }

  buffer.fill(baseColors[1]);
  if (colorMode == 1) buffer.fill(random(palette));
  buffer.circle(x+s/2, y, u);
  if (colorMode == 1) buffer.fill(random(palette));
  buffer.circle(x+s, y+s/2, u);
  if (colorMode == 1) buffer.fill(random(palette));
  buffer.circle(x+s/2, y+s, u);
  if (colorMode == 1) buffer.fill(random(palette));
  buffer.circle(x, y+s/2, u);

  buffer.pop();
}
