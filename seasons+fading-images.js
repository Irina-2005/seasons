let isButtonClicked = false;

let buttonClick = 'btn1';
let buttons = ['Spring', 'Winter', 'Summer', 'Autumn']

let quotes = ['Every spring is the only spring, a perpetual astonishment.', 'The world laughs in flowers!', 'Even the strongest blizzards start with a single snowflake.', 'Winter reminds us to slow down and appreciate the stillness of the world.', 'It was June, and the world smelled of roses. The sunshine was like powdered gold over the grassy hillside.', 'I have only to break into the tightness of a strawberry, and I see summer—its dust and lowering skies.', 'Every leaf speaks bliss to me, fluttering from the autumn tree.', 'Autumn leaves don’t fall, they fly. They take their time and wander on this their only chance to soar.',]

let colors = ['rgb(190, 18, 119) 0px 0px 5px', 'rgb(0, 213, 255) 0px 0px 5px', 'rgb(255, 242, 0) 0px 0px 5px', 'rgb(255, 106, 0) 0px 0px 5px'];

function getAQuote(btn) {
  let randomNumber = (Math.random());

  let quoteForYou = '';

  for (i = 0; i < buttons.length; i++) {
    if (btn === buttons[i]) {
      if (randomNumber <= 0.5) {
        quoteForYou = quotes[2 * i];
      } else {
        quoteForYou = quotes[2 * i + 1];
      }
    }
  }

  return quoteForYou;
}

function glowButton(btn) {
  quoteForYou = getAQuote(btn);

  buttonClick = btn;

  isButtonClicked = true;

  let buttonStyle = document.querySelectorAll('button');

  for (i = 0; i < buttons.length; i++) {
    buttonStyle[i].style.boxShadow = 'none';

    if (btn === buttons[i] && (quoteForYou === quotes[2 * i] || quoteForYou === quotes[2 * i + 1])) {
      buttonStyle[i].style.boxShadow = colors[i];
    }
  }

  const showResult = document.querySelector('.js-result');

  showResult.innerText = `You chose ${btn}. Your quote is: "${quoteForYou}".`;
}


let differentBackgrounds = document.querySelectorAll('.background');

let imageIndex = 0;

function changeBackground() {
  differentBackgrounds[imageIndex].classList.remove('showing');

  imageIndex++;

  if (imageIndex >= differentBackgrounds.length) {
    imageIndex = 0;
  }

  differentBackgrounds[imageIndex].classList.add('showing');
}

setInterval(changeBackground, 3000);


const canvas = document.getElementById('myCanvas');

const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let h = canvas.height;
let w = canvas.width;

let fallingObjects = [];

function init() {
  while (fallingObjects.length < initFallingObjects) {
    fallingObjects.push(createFallingObject());
  }
  draw();
}

let initFallingObjects = 50;
let minFallingObjects = 20;

let images = []

let imgAnimations = ['images/flowerAnimation.png', 'images/snowflakeAnimation.png', 'images/watermelonAnimation.png', 'images/leafAnimation.png']

let numImagesLoaded = 0;

for (i = 0; i < 4; i++) {
  const img = new Image();
  img.src = imgAnimations[i];
  images.push(img)

  img.addEventListener('load', function () {
    numImagesLoaded++;

    if (numImagesLoaded === 4) {
      init();
    }
  });
}

function FallingObject(x, y, r, vx, vy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  // this.img = img;
  this.draw = function (img) {
    c.beginPath();
    c.drawImage(img, this.x, this.y, this.r, this.r);
    c.closePath();
  }
}

function createFallingObject() {
  x = Math.random() * w;
  y = Math.random() * h;
  r = Math.floor(Math.random() * 31) + 25;
  vx = (Math.random() * 4) - 2;
  vy = (Math.random() * 3) + 1;

  return new FallingObject(x, y, r, vx, vy);
}

function btnToNumber(buttonClick) {
  for (i = 0; i < buttons.length; i++) {
    if (buttonClick === buttons[i]) {
      return i;
    }
  }
}

function draw() {
  c.clearRect(0, 0, w, h);
  let selectedButton = btnToNumber(buttonClick);

  if (isButtonClicked == true) {
    for (i = 0; i < fallingObjects.length; i++) {
      let currentFallingObject = fallingObjects[i];

      currentFallingObject.x += currentFallingObject.vx;
      currentFallingObject.y += currentFallingObject.vy;

      currentFallingObject.draw(images[selectedButton]);

      if (currentFallingObject.x > w || currentFallingObject.y < 20 || currentFallingObject.y > h) {
        fallingObjects.splice(i, 1);
      }

      if (fallingObjects.length < minFallingObjects) {
        fallingObjects.splice(i, 0, createFallingObject());
      }
    }
  }

  requestAnimationFrame(draw);
}