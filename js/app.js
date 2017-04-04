$(() => {

  //pseudo----------
  //way to reveal tiles on initialisation for 1 sec then .8secs then .6 - reveal hideen image then quickly flip back
  // click handler when player clicks start game button - runs init function
  //init func sets up new game board - sets up random obstacles - shows hidden tiles with setTimout
  //player navigates by selecting one tile at a time which reveael.
  //obstacle landed on then game over . effect?
  //timer countdown - when reaches 0 game over or keep record of how long it takes and use that to keep score.


  //limit player moves only to adjacent tiles (r,l,u,d,and diagonal);
  //minimum of 2 tiles to chose max of 7.

  //start point last col left top5, end first col right bot5;
  //game win logic!



  // each level up would add shake event



  // const $one = $('.one');


  $('#startGame').on('click',function(){

    //func to create number of tiles and assign them to game board.
    const gridCreate = function (num) {
      const grid = document.getElementById('grid-holder');
      const numOfObstacles = 17;
      const arrayOfObstacles = [];
      var idSetter = 1;

      for (let i = 0; i < numOfObstacles; i++) {
        const randomNum = Math.floor(Math.random() * num);
        const randomCell = Math.floor(Math.random() * num);
        const arr = [randomNum,randomCell];
        arrayOfObstacles[i] = arr;
      }
      // creates col + rows and randomly assigns obstacles to positions.
      for (let i = 0; i < num; i++) {

        const row = document.createElement('div');
        row.classList.add('row');
        // row.setAttribute('id', i);
        grid.appendChild(row);

        for (let j = 0; j < num; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('data-id',idSetter);
          idSetter++;


          // const $eq = $('div').eq(4).css('background-color', 'black');
          // console.log($eq);


          //randomly assigns obstacles to created grid
          for (let n = 0; n < arrayOfObstacles.length; n++) {
            const newArr = arrayOfObstacles[n];
            if(newArr[0] === i && newArr[1] === j) {
              // cell.style.backgroundColor = 'red';
              cell.classList.add('bomb-hidden');
              // cell.className = 'bomb';
            }
          }
          row.appendChild(cell);
        }
      }
    };


    //set to hide tiles in the beginning
    gridCreate(10);

    //on click we want to show blocks that are underneath.
    // $('#grid-holder').css('display','inline-block');
    const $bombCells = $('.bomb-hidden');
    // setting timeout to reveal all tiles on loading of game.
    setTimeout(function() {
      for (var i = 0; i < $bombCells.length; i++) {
        // $bombCells.css('background-color', 'blue');
        //adding class to reveal for one sec
        $bombCells.addClass('covering-top');
      }
    }, 1000);

    setTimeout(function(){
      $bombCells.removeClass('covering-top');
      // console.log('finished');
    }, 2000);

    const $divGrid = $('.cell[data-id="1"]');
    //
    $divGrid.on('click', clearCell);




    function clearCell(){
      console.log($(this).attr('data-id'));
      checkAdjacentPossibilities($(this).attr('data-id'));
      if ($(this).hasClass('bomb-hidden')) {
        $(this).removeClass('bomb-hidden');
        $(this).addClass('bomb-exposed');
        console.log('hit a bomb!!');
      } else {
        $(this).addClass('reveal');
      }
    }

    // fucntion to check adjacent cells and limit move only to cross
    function checkAdjacentPossibilities(id){
      var rows = 10;
      // var cols = 9;
      var i = parseInt(id);
      $('.cell[data-id="'+(i-rows)+'"]').on('click', clearCell);
      (i-1) % rows === 0 || $('.cell[data-id="'+(i-1)+'"]').on('click', clearCell);
      i % rows === 0 || $('.cell[data-id="'+(i+1)+'"]').on('click', clearCell);
      $('.cell[data-id="'+(i+rows)+'"]').on('click', clearCell);
    }
  });



});

//
//
//
// $(document).on('click', '.cell', function(){
//   var $this  = $(this);
//   var id = $this.attr('data-id');
//   checkAdjacentPossibilities(id);
// });








//select outer parts of grid going around on all four sides
//create random start and end points to be displayed on outer grid border

//show grid for a timed duration
//countdown timer - when countdown reached initiate game end - reveal tiles -

//




//


//initialises the game - creates board/sets tiles -

// Randomly create twenty tiles and render to board



//logic for win conditions..
// player must reach finish from start without hitting any obstacles - if so wins round
//only allow adjacent tiles to be clicked once first tile has been hit.-- (recursion??) - use an array

//if player clicks on tile that does not have class of bomb then carry on, otherwise game over!(show )
//on game over show path taken.(done)



//check adjacent tiles
// function checkTiles(id){
//
// };
//
// $('.cell').on('click', function(){
//   const $this = $(this);
//   const id = $this.attr('id');
//   checkTiles(id);
// })
//game over
//show all moves and reveal all board.
// show moves taken on board..
//initiate game over once bomb has been hit;

// if ($(this).hasClass('bomb-exposed')){
//   console.log('hit a bomb');
//   // $divGrid.addClass('reveal');
// }
