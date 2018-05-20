var
  rotationSlider,
  amountSlider,
  showdotsCheckbox,
  showlinesCheckbox,
  minSlider,
  maxSlider,
  autorefreshCheckbox;
var shape = [];
var
  amount = -1,
  minL = -1,
  maxL = -1;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  showdotsCheckbox = createCheckbox('Show dots', true);
  showlinesCheckbox = createCheckbox('Show lines', true);
  autorefreshCheckbox = createCheckbox('Auto refresh', true);
  rotateSlider = createSlider(0, 360, 0);
  amountSlider = createSlider(3, 3600, 3);
  minSlider = createSlider(0, 350, 300);
  maxSlider = createSlider(0, 350, 300);

  showdotsCheckbox.position(width - 200, height - 275);
  showlinesCheckbox.position(width - 200, height - 250);
  autorefreshCheckbox.position(width - 200, height - 225);
  rotateSlider.position(width - 200, height - 200);
  amountSlider.position(width - 200, height - 150);
  minSlider.position(width - 200, height - 100);
  maxSlider.position(width - 200, height - 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  showdotsCheckbox.position(width - 200, height - 275);
  showlinesCheckbox.position(width - 200, height - 250);
  autorefreshCheckbox.position(width - 200, height - 225);
  rotateSlider.position(width - 200, height - 200);
  amountSlider.position(width - 200, height - 150);
  minSlider.position(width - 200, height - 100);
  maxSlider.position(width - 200, height - 50);
}

function draw() {
  background(180);
  keyDown();

  let showdots = showdotsCheckbox.checked();
  let showlines = showlinesCheckbox.checked();
  let autorefresh = autorefreshCheckbox.checked();
  let rotation = rotateSlider.value();

  if (
    autorefresh &&
    (amount != amountSlider.value()) ||
    (minL != minSlider.value()) ||
    (maxL != maxSlider.value())
  ) {
    amount = amountSlider.value();
    minL = minSlider.value();
    maxL = maxSlider.value();
    shape = [];
    for (let i = 0; i < TAU; i += (TAU / amount)) {
      let angle = p5.Vector.fromAngle(i).mult(round(random(minL, maxL)));
      shape.push({
        x: angle.x,
        y: angle.y,
        a: i
      });
    }
  }

  push();
  text(`fps: ${round(getFrameRate())}`, 10, 20);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(radians(rotation));
  beginShape();
  shape.forEach(v => {
    vertex(v.x, v.y);
  });
  endShape(CLOSE);
  pop();

  if (showdots) {
    push();
    translate(width / 2, height / 2);
    rotate(radians(rotation));
    stroke(0);
    strokeWeight(8);
    point(0, 0);
    shape.forEach(v => {
      point(v.x, v.y);
    });
    pop();
  }
  if (showlines) {
    push();
    translate(width / 2, height / 2);
    rotate(radians(rotation));
    stroke(0);
    strokeWeight(0.5);
    shape.forEach(v => {
      line(0, 0, v.x, v.y);
    });
    pop();
  }
}

function keyDown() {
  if (keyIsDown(87)) {
    if (keyIsDown(16)) {
      maxSlider.value(maxSlider.value() + 5);
    } else {
      minSlider.value(minSlider.value() + 5);
    }
  } else if (keyIsDown(83)) {
    if (keyIsDown(16)) {
      maxSlider.value(maxSlider.value() - 5);
    } else {
      minSlider.value(minSlider.value() - 5);
    }
  }
  if (keyIsDown(68)) {
    amountSlider.value(amountSlider.value() + 1);
  } else if (keyIsDown(65)) {
    amountSlider.value(amountSlider.value() - 1);
  }
  if (keyIsDown(69)) {
    rotateSlider.value(rotateSlider.value() + 2);
  } else if (keyIsDown(81)) {
    rotateSlider.value(rotateSlider.value() - 2);
  }
}

function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case 32:
      showdotsCheckbox.checked(!showdotsCheckbox.checked());
      break;
    case 17:
      showlinesCheckbox.checked(!showlinesCheckbox.checked());
      break;
    case 82:
      autorefreshCheckbox.checked(!autorefreshCheckbox.checked());
      break;
  }
}