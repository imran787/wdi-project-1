//pseudo----------
//way to reveal tiles on initialisation for 1 sec then .8secs then .6 - reveal hideen image then quickly flip back
// click handler when player clicks start game button - runs init function
//init func sets up new game board - sets up random obstacles - shows hidden tiles with setTimout
//player navigates by selecting one tile at a time which reveael.
//obstacle landed on then game over . effect?
//timer countdown - when reaches 0 game over or keep record of how long it takes and use that to keep score.
//limit player moves only to adjacent tiles (r,l,u,d,and diagonal);
//minimum of 2 tiles to chose max of 7.
//find a way to limit moves only to active position
//start point last col left top5, end first col right bot5;
//game win logic!
// each level up would add shake event

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

// let cellsArray;
let counter;
let seconds;
let arrayOfObstacles;
let idSetter;
const width = 10;
const numOfObstacles = 17;

$(init);

function init() {
  // Find anything from the dom
  $start       = $('#startGame');
  $body        = $('body');
  $seconds     = $('#seconds');
  $gameMessage = $('#game-message');
  $message     = $('#message');

  // Setup eventListeners
  $start.on('click', start);
  // $body.on('click', '.cell[data-id="1"]', clearCell);

  $(document).keydown(moveCharacter);
}

function start() {
  //set to hide tiles in the beginning
  clearInterval(counter);

  seconds = 0;
  counter = setInterval(time, 1000);
  gridCreate(width);

  // on click we want to show blocks that are underneath.
  $bombCells = $('.bomb-hidden');

  // setting timeout to reveal all tiles on loading of game.
  setTimeout(function() {
    for (var i = 0; i < $bombCells.length; i++) {
      //adding class to reveal for one sec
      $bombCells.addClass('covering-top');
    }
  }, 1000);

  setTimeout(function(){
    $bombCells.removeClass('covering-top');
  }, 2000);

  $boardEnd = $('.cell[data-id="100"]');
  $boardEnd.addClass('door');

  $divGrid = $('.cell[data-id="1"]');
  $divGrid.addClass('door');
  $divGrid.addClass('flash');

  $you   = $('.flash');
  $cells = $('.cell');
}

function gridCreate(num) {
  $grid = $('#grid-holder');

  arrayOfObstacles = [];
  idSetter = 1;

  for (let i = 0; i < numOfObstacles; i++) {
    const randomNum = Math.floor(Math.random() * num);
    const randomCell = Math.floor(Math.random() * num);
    const arr = [randomNum,randomCell];
    arrayOfObstacles[i] = arr;
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

  if ($you.hasClass('bomb-hidden')) {
    $you.removeClass('bomb-hidden');
    $you.addClass('bomb-exposed');

    // console.log('hit a bomb!!');
    clearInterval(counter);
    $seconds.html('000');

    //clears board on hitting a bomb
    $grid.empty();
    $gameMessage.html('Bang Bang!');
    $message.html(` You just took ${seconds} seconds..Pathetic!!`);

    //reset game board
    // gameOver();
  } else {
    $you.addClass('reveal');
  }
}
