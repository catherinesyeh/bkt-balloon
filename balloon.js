var balloon = document.getElementById("balloon");
init();

function init() {
  balloon.style.left = "100px";
  balloon.style.top = "100px";
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
