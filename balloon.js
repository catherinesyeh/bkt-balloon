var balloon = document.getElementById("balloon");
init();

var cloud1 = document.getElementById("cloud1");
var cloud2 = document.getElementById("cloud2");
drift(cloud1, 0, 400, 100);
drift(cloud2, 0, -400, -100);

function init() {
  balloon.style.left = "100px";
  balloon.style.top = "50px";
}

function move(event) {
  var key = event.which || event.keyCode;

  switch(key) {
    case 37: // left arrow key
      moveLeft();
      break;
    case 38: // up arrow key
      moveUp();
      break;
    case 39: // right arrow key
      moveRight();
      break;
    case 40: // down arrow key
      moveDown();
      break;
  }
}

function moveLeft() {
  balloon.style.left = parseInt(balloon.style.left) - 5 + "px";
}

function moveUp() {
  balloon.style.top = parseInt(balloon.style.top) - 5 + "px";
}

function moveRight() {
  balloon.style.left = parseInt(balloon.style.left) + 5 + "px";
}

function moveDown() {
  balloon.style.top = parseInt(balloon.style.top) + 5 + "px";
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
      console.log(end);
      end = (cloud === cloud2 && end === 0) ?
        maxDist - end :
        Math.abs(maxDist - end);
      console.log(end);
    }
    pos += direction;
    cloud.style.left = pos + "px";
  }
}
