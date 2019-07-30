var balloon = document.getElementById("balloon");
var balloonHeight = balloon.clientHeight;

// set height of game
var game = document.getElementById("game");
var gameHeight = game.clientHeight;
var height = gameHeight - balloonHeight;

// clouds
var cloud1 = document.getElementById("cloud1");
var cloud2 = document.getElementById("cloud2");
var cloud3 = document.getElementById("cloud3");
var cloud4 = document.getElementById("cloud4");

drift(cloud1, 0, 200, 50);
drift(cloud2, 0, -200, -50);
drift(cloud3, 0, 150, 25);
drift(cloud4, 0, -150, -25);

// move clouds side to side
function drift(cloud, start, max, dir) {
   setInterval(frame, 2000);
   var maxDist = max,
   pos = start,
   end = maxDist,
   direction = dir;

   function frame() {
      if (pos === end) {
         direction *= -1; // reverse direction
         end = ((cloud === cloud2 || cloud === cloud4) && end === 0) ?
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

   // change balloon position
   balloon.style.bottom = (val * height) + "px";
}

// P(trans)
function updateT(val) {
   document.getElementById("demoT").innerHTML = val;
   updateProbs();
   adjustClouds(val);
}

// deal with clouds
function adjustClouds(val) {
   if (val < 0.15) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "block";
      cloud4.style.display = "block";
      cloud1.style.filter = "brightness(55%)";
      cloud2.style.filter = "brightness(55%)";
      cloud3.style.filter = "brightness(55%)";
      cloud4.style.filter = "brightness(55%)";
   } else if (val < 0.3) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "block";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(55%)";
      cloud2.style.filter = "brightness(55%)";
      cloud3.style.filter = "brightness(55%)";
   } else if (val < 0.4) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "block";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(70%)";
      cloud2.style.filter = "brightness(70%)";
      cloud3.style.filter = "brightness(70%)";
   } else if (val < 0.55) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(70%)";
      cloud2.style.filter = "brightness(70%)";
   } else if (val < 0.7) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(85%)";
      cloud2.style.filter = "brightness(85%)";
   } else if (val < 0.8) {
      cloud1.style.display = "block";
      cloud2.style.display = "none";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(85%)";
   } else if (val < 0.95) {
      cloud1.style.display = "block";
      cloud2.style.display = "none";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(100%)";
   } else { // val <= 1
      cloud1.style.display = "none";
      cloud2.style.display = "none";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
   }
}

// show additional info for prompt
function showMore(b, id) {
   id.classList.toggle("extra");
   (document.body.clientWidth > 1330) ? shiftFooter() : positionElements();
   b.value = (b.value === "More" ? "Less" : "More");
}

// show formulas
function showMath(b, id) {
   id.classList.toggle("extra");
   b.value = (b.value === "See the math" ? "Hide the math" : "See the math");
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

// update P(learned)
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
   cor.innerHTML = learnC.toFixed(2);

   var learnW =  w + (1.0 - w) * t,
   wro = document.getElementById("wrong");
   wro.innerHTML = learnW.toFixed(2);

   // deal with balloon
   if (learnW > learnC && i >= 0.95) { // flip balloon & mastered
      balloon.style.backgroundImage = "url('images/udmastered.png')";
   } else if (learnW > learnC) { // flip balloon
      balloon.style.backgroundImage = "url('images/upsidedown.png')";
   } else if (i >= 0.95) { // mastered
      balloon.style.backgroundImage = "url('images/mastered.png')";
   } else { // normal balloon
      balloon.style.backgroundImage = "url('images/balloon.png')";
   }
}

// display/hide parameter descriptions
function displayInfo(p) {
   p.style.display = "block";
}

function hideInfo(p) {
   p.style.display = "none";
}

var prompts = document.getElementById("p-contain");
// shift footer down if prompts expanded
function shiftFooter() {
   var promptHeight = prompts.clientHeight;
   var refs = document.getElementById("refs");
   if (promptHeight > gameHeight) {
      refs.style.paddingTop = (promptHeight - gameHeight + 100) + "px";
   } else {
      refs.style.paddingTop = 50 + "px";
   }
}

// position elements for smaller screens
if (document.body.clientWidth <= 1330) {
   positionElements();
}

function positionElements() {
   var sliders = document.getElementById("slidecontain");
   var sliderHeight = sliders.clientHeight;
   var promptHeight = prompts.clientHeight;

   if (document.body.clientWidth <= 1330) {
      sliders.style.marginTop = promptHeight + "px";
      game.style.marginTop = (promptHeight + sliders.clientHeight + 0.5 * balloonHeight + 50) + "px";
   } else {
      sliders.style.marginTop = 0 + "px";
      game.style.marginTop = 0 + "px";
   }
}
