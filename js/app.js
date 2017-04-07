


let $divGrid;
let $boardEnd;
let $start;
let $body;
let $bombCells;
let $grid;
let $seconds;
let $gameMessage;
let $message;
let $you;
let $cells;
let $sweets;
let counter;
let seconds;
let arrayOfObstacles;
let idSetter;
const width = 10;
const numOfObstacles = 24;
const numOfSweets = 2;
let arrayOfSweets;





$(init);

function init() {
  // Find anything from the dom
  $start       = $('#startGame');
  $body        = $('body');
  $seconds     = $('#seconds');
  $gameMessage = $('#game-message');
  $message     = $('#message');
  $sweets      = $('.sweet');

  // Setup eventListeners
  $start.on('click', start);
  // $body.on('click', '.cell[data-id="1"]', clearCell);

  $(document).keydown(moveCharacter);

  const sound1 = document.getElementById('sound1');
  sound1.src = './sounds/80s-music-synth-pop.mp3';
  sound1.play();


}

function start() {
  //set to hide tiles in the beginning
  clearInterval(counter);

  seconds = 0;
  counter = setInterval(time, 1000);
  gridCreate(width);

  // on click we want to show blocks that are underneath.
  $bombCells = $('.bomb-hidden');
  $sweets = $('.sweet');

  // setting timeout to reveal all tiles on loading of game.
  setTimeout(function() {
    for (var i = 0; i < $bombCells.length; i++) {
      //adding class to reveal for one sec
      $bombCells.addClass('covering-top');
      $sweets.removeClass('sweet');
      $sweets.addClass('sweetReveal');

    }
  }, 1000);

  setTimeout(function(){
    $bombCells.removeClass('covering-top');
    $sweets.addClass('sweet');
    $sweets.removeClass('sweetReveal');
  }, 2500);

  $boardEnd = $('.cell[data-id="100"]');
  $boardEnd.addClass('door_close');

  $divGrid = $('.cell[data-id="1"]');
  $divGrid.addClass('door');
  $divGrid.addClass('flash');

  $you   = $('.flash');
  $cells = $('.cell');
}

function gridCreate(num) {
  $grid = $('#grid-holder');
  $grid.empty();
  arrayOfObstacles = [];
  arrayOfSweets = [];

  idSetter = 1;

  for (let i = 0; i < numOfObstacles; i++) {
    const randomNum = Math.floor(Math.random() * num);
    const randomCell = Math.floor(Math.random() * num);
    const arr = [randomNum,randomCell];
    arrayOfObstacles[i] = arr;
  }

  for (var i = 0; i < numOfSweets; i++) {
    const randomNum = Math.floor(Math.random() * num);
    const randomCell = Math.floor(Math.random() * num);
    const arr = [randomNum,randomCell];
    arrayOfSweets[i] = arr;
  }

  // creates col + rows and randomly assigns obstacles to positions.
  for (let i = 0; i < num; i++) {
    const $row = $('<div>', { class: 'row' });
    $grid.append($row);

    for (let j = 0; j < num; j++) {
      const $cell = $('<div>', { class: 'cell', 'data-id': idSetter });
      idSetter++;

      //randomly assigns obstacles to created grid
      for (let n = 0; n < arrayOfObstacles.length; n++) {
        const newArr = arrayOfObstacles[n];
        if (newArr[0] === i && newArr[1] === j) {
          $cell.addClass('bomb-hidden');
        }
      }
      for (let m = 0; m < arrayOfSweets.length; m++) {
        const newArr = arrayOfSweets[m];
        if (newArr[0] === i && newArr[1] === j) {
          $cell.addClass('sweet');

        }
      }
      $row.append($cell);
    }
  }
}

function time() {
  seconds++;
  if (seconds === 0) {
    clearInterval(counter);
  }
  $seconds.html(seconds);
}

function moveCharacter(e) {
  // prevent the default action (scroll / move caret)
  e.preventDefault();

  const currentIndex = $cells.index($you);
  let newIndex;

  switch(e.which) {
    case 37: // left
      newIndex = currentIndex - 1;
      break;
    case 38: // up
      newIndex = currentIndex - width;
      break;
    case 39: // right
      newIndex = currentIndex + 1;
      break;
    case 40: // down
      newIndex = currentIndex + width;
      break;

    default: return; // exit this handler for other keys
  }

  if (newIndex < 0 || newIndex > width*width) return;

  // HERE CHECK FOR THE EDGES...
  // if ((newIndex % width) - (currentIndex  % width))

  $you.removeClass('flash');
  $you = $($cells.get(newIndex));
  $you.addClass('flash');
  $bombCells = $('.bomb-hidden');


  if ($you.hasClass('bomb-hidden')) {
    $you.removeClass('bomb-hidden');
    $you.addClass('bomb-exposed');

    // console.log('hit a bomb!!');
    clearInterval(counter);
    $seconds.html('');

    //clears board on hitting a bomb
    $grid.empty();
    $gameMessage.html('Bang Bang!');
    $message.html(` You just took ${seconds} seconds..Pathetic!!`);
    $('#startGame').html('Restart?');

    //reset game board

  } else if($you.hasClass('door_close')){
    clearInterval(counter);
    $seconds.html('');
    $message.html(` You took ${seconds} seconds to get to the promised land...All hail you!!`);
    $grid.empty();
    $gameMessage.html('OMG! OMG!! OMG!!!');
    $('#startGame').html('Play Again?');
  } else {
    $you.addClass('reveal');
  }

  if($you.hasClass('sweet')){
    // $you.addClass('reveal');
    setTimeout(function() {
      for (var i = 0; i < $bombCells.length; i++) {
        //adding class to reveal for one sec
        $bombCells.addClass('covering-top');
        $sweets.removeClass('sweet');
        $sweets.addClass('sweetReveal');
      }
    }, 1000);

    setTimeout(function(){
      $bombCells.removeClass('covering-top');
      $sweets.addClass('sweet');
      $sweets.removeClass('sweetReveal');
    }, 2500);


  }

}
