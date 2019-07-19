var balloon = document.getElementById("balloon");

// set height of game
var gameHeight = document.getElementById("game").clientHeight;
var windowHeight = window.innerHeight;
var height;
windowHeight < gameHeight ?
  height = windowHeight - 0.5 * balloon.clientHeight :
  height = gameHeight - 0.5 * balloon.clientHeight;

// clouds
var cloud1 = document.getElementById("cloud1");
var cloud2 = document.getElementById("cloud2");
var cloud3 = document.getElementById("cloud3");
var cloud4 = document.getElementById("cloud4");
drift(cloud1, 0, 400, 100);
drift(cloud2, 0, -400, -100);
drift(cloud3, 0, 300, 50);
drift(cloud4, 0, -300, -50);

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
      cloud1.style.filter = "brightness(25%)";
      cloud2.style.filter = "brightness(25%)";
      cloud3.style.filter = "brightness(25%)";
      cloud4.style.filter = "brightness(25%)";
   } else if (val < 0.3) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "block";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(25%)";
      cloud2.style.filter = "brightness(25%)";
      cloud3.style.filter = "brightness(25%)";
   } else if (val < 0.4) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "block";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(50%)";
      cloud2.style.filter = "brightness(50%)";
      cloud3.style.filter = "brightness(50%)";
   } else if (val < 0.55) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(50%)";
      cloud2.style.filter = "brightness(50%)";
   } else if (val < 0.7) {
      cloud1.style.display = "block";
      cloud2.style.display = "block";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(75%)";
      cloud2.style.filter = "brightness(75%)";
   } else if (val < 0.8) {
      cloud1.style.display = "block";
      cloud2.style.display = "none";
      cloud3.style.display = "none";
      cloud4.style.display = "none";
      cloud1.style.filter = "brightness(75%)";
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

   if (learnW > learnC) {
      balloon.style.backgroundImage = "url('images/upsidedown.png')";
   } else {
      balloon.style.backgroundImage = "url('images/balloon.png')";
   }

   // check if mastery achieved
   if (i >= 0.95) {
      mastered();
   }
}

// display message upon mastery (P(L) >= 0.95)
function mastered() {
   // Get the modal
   var modal = document.getElementById("myModal");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // Display pop-up
   modal.style.display = "block";

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() {
      modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
      if (event.target == modal) {
         modal.style.display = "none";
      }
   }
}
