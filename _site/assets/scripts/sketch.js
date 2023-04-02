// By Roni Kaufman

let M, N; // number of tiles in width and height
let s; // grid unit square size

let palette = ["#abcd5e", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
let baseColors = ["#050505", "#fffbe6"];
let possibilities = [0, 1, 2];
let colorMode;

function setup() {
  let greetings = select('#greetings');
  greetings.html(generateGreetings());

  let links = selectAll(".colorMe");
  let linkColors = shuffle(palette);
  for (let i = 0; i < links.length; i++) {
    links[i].style("color", linkColors[i%linkColors.length]);
  }

  if (random() < 3/4) {
    shuffle(possibilities, true);
    possibilities.pop();
  }
  colorMode = random([0, 1]);

  initParams();
  console.log(M, N, s);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("p5sketch");
  noLoop();
  noStroke();
}

function draw() {
	for (let i = 0; i < windowWidth/M; i++) {
    for (let j = 0; j < windowHeight/N; j++) {
      fill(random(palette));
      makeTile(i*s, j*s);
    }
  }
}

function initParams() {
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

function windowResized() {
  initParams();
  resizeCanvas(M*s, N*s-1);
}

function makeTile(x, y) {
  push();
  translate(x+s/2, y+s/2);
  rotate(random([0, PI/2, PI, 3*PI/2]));
  translate(-x-s/2, -y-s/2);

  let u = s/5;

  let r = random(possibilities);
  if (r == 0) {
    fill(baseColors[1]);
    square(x, y, s);

    fill(baseColors[0]);
    arc(x, y, 4*u, 4*u, 0, PI/2);
    arc(x+s, y, 2*u, 2*u, PI/2, PI);
    arc(x+s, y, 4*u, 4*u, PI/2, PI);
    arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);
    arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);
    arc(x, y+s, 4*u, 4*u, 3*PI/2, TAU);
    circle(x+s/2, y+s/2, 2*u);

    fill(baseColors[1]);
    arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);
    arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    arc(x+s, y, 2*u, 2*u, PI/2, PI);
    arc(x, y, 2*u, 2*u, 0, PI/2);
  } else if (r == 1) {
    fill(baseColors[0]);
    square(x, y, s);

    fill(baseColors[1]);
    arc(x, y, 6*u, 6*u, 0, PI/2);
    arc(x+s, y, 2*u, 2*u, PI/2, PI);
    arc(x+s, y+s, 6*u, 6*u, PI, 3*PI/2);
    arc(x, y+s, 2*u, 2*u, 3*PI/2, TAU);

    fill(baseColors[0]);
    arc(x, y, 4*u, 4*u, 0, PI/2);
    arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);

    fill(baseColors[1]);
    arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);
    arc(x, y, 2*u, 2*u, 0, PI/2);
  } else if (r == 2) {
    fill(baseColors[1]);
    square(x, y, s);

    fill(baseColors[0]);
    arc(x, y, 8*u, 8*u, 0, PI/2);
    arc(x+s, y+3*u/2, u, u, PI/2, 3*PI/2);
    arc(x+3*u/2, y+s, u, u, PI, TAU);
    arc(x+s, y+s, 4*u, 4*u, PI, 3*PI/2);

    fill(baseColors[1]);
    arc(x, y, 6*u, 6*u, 0, PI/2);
    arc(x+s, y+s, 2*u, 2*u, PI, 3*PI/2);

    fill(baseColors[0]);
    arc(x, y, 4*u, 4*u, 0, PI/2);

    fill(baseColors[1]);
    arc(x, y, 2*u, 2*u, 0, PI/2);
  } else {

  }

  fill(baseColors[0]);
  circle(x+3*u/2, y, u);
  circle(x+7*u/2, y, u);
  circle(x+s, y+3*u/2, u);
  circle(x+s, y+7*u/2, u);
  circle(x+3*u/2, y+s, u);
  circle(x+7*u/2, y+s, u);
  circle(x, y+3*u/2, u);
  circle(x, y+7*u/2, u);

  fill(baseColors[1]);
  circle(x, y, 2*u);
  circle(x+s, y, 2*u);
  circle(x, y+s, 2*u);
  circle(x+s, y+s, 2*u);

  if (colorMode == 0) {
    fill(random(palette));
    circle(x, y, u);
    fill(random(palette));
    circle(x+s, y, u);
    fill(random(palette));
    circle(x, y+s, u);
    fill(random(palette));
    circle(x+s, y+s, u);
  }

  fill(baseColors[1]);
  if (colorMode == 1) fill(random(palette));
  circle(x+s/2, y, u);
  if (colorMode == 1) fill(random(palette));
  circle(x+s, y+s/2, u);
  if (colorMode == 1) fill(random(palette));
  circle(x+s/2, y+s, u);
  if (colorMode == 1) fill(random(palette));
  circle(x, y+s/2, u);

  pop();
}
