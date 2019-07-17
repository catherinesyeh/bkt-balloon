var balloon = document.getElementById("balloon");
init();

var cloud1 = document.getElementById("cloud1");
var cloud2 = document.getElementById("cloud2");
drift(cloud1, 0, 400, 100);
drift(cloud2, 0, -400, -100);

function init() {
  balloon.style.bottom = "20px";
}

function move(event) {
  var key = event.which || event.keyCode;

  switch(key) {
    case 38: // up arrow key
      moveUp();
      break;
    case 40: // down arrow key
      moveDown();
      break;
  }
}

function moveUp() {
  balloon.style.bottom = parseInt(balloon.style.bottom) + 5 + "px";
}

function moveDown() {
  balloon.style.bottom = parseInt(balloon.style.bottom) - 5 + "px";
}

function drift(cloud, start, max, dir) {
  setInterval(frame, 2000);
  var maxDist = max,
      pos = start,
      end = maxDist,
      direction = dir;

  function frame() {
    if (pos === end) {
      direction *= -1; // reverse direction
      end = (cloud === cloud2 && end === 0) ?
        maxDist - end :
        Math.abs(maxDist - end);
    }
    pos += direction;
    cloud.style.left = pos + "px";
  }
}

// change P(init)
function changeP(val, slide) {
   slide.value = val.innerHTML;
   updateI(slide.value);
}

reset();

// display initial values for each parameter
function reset() {
   var i = document.getElementById("init");
   i.value = i.defaultValue;
   updateI(i.defaultValue);

   var t = document.getElementById("trans");
   t.value = t.defaultValue;
   updateT(t.defaultValue);

   var s = document.getElementById("slip");
   s.value = s.defaultValue;
   updateS(s.defaultValue);

   var g = document.getElementById("guess");
   g.value = g.defaultValue;
   updateG(g.defaultValue);
}

// update slider values
// P(init)
function updateI(val) {
   document.getElementById("demoI").innerHTML = val;
   updateProbs();
}

// P(trans)
function updateT(val) {
   document.getElementById("demoT").innerHTML = val;
   updateProbs();
}

// P(slip)
function updateS(val) {
   document.getElementById("demoS").innerHTML = val;
   updateProbs();
}

// P(guess)
function updateG(val) {
   document.getElementById("demoG").innerHTML = val;
   updateProbs();
}

// update P(learned) and P(correct)
function updateProbs() {
   // get the parameter values
   var i = document.getElementById("init").value,
       i_c = 1.0 - i,
       t = document.getElementById("trans").value,
       t_c = 1.0 - t,
       s = document.getElementById("slip").value,
       s_c = 1.0 - s,
       g = document.getElementById("guess").value,
       g_c = 1.0 - g;

   // conditional probabilities
   var r = (i * s_c) / (i * s_c + i_c * g),
       w = (i * s) / (i * s + i_c * g_c);

   var learnC = r + (1.0 - r) * t,
       cor = document.getElementById("correct");
   cor.innerHTML = learnC;

   var learnW =  w + (1.0 - w) * t,
       wro = document.getElementById("wrong");
   wro.innerHTML = learnW;
}
