$(() => {

  //pseudo----------
  //way to reveal tiles on initialisation for 1 sec then .8secs then .6 - reveal hideen image then quickly flip back
  // click handler when player clicks start game button - runs init function
  //init func sets up new game board - sets up random obstacles - shows hidden tiles with setTimout
  //player navigates by selecting one tile at a time which reveael.
  //obstacle landed on then game over . effect?
  //



  const $one = $('.one');

  // $one.on('click', function(){
  //   // console.log('working');
  //   $('.one').effect('shake');
  // });

  // $('.one').on('click',function() {
  //   $( ".one" ).effect( "shake" );
  // });

  $('#startGame').on('click',function() {

    // initGame();
    //set timeout to hide tiles in the beginning
    // setTimeout();
    gridCreate(7);

  });

//func to create number of tiles and assign them to game board.
  var gridCreate = function (num) {
    var grid = document.getElementById("grid-holder");
    for (let i = 0; i < num; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      grid.appendChild(row);
      for (let j = 0; j < num; j++) {
        let cell = document.createElement('div');
        cell.classList.add("cell");
        row.appendChild(cell);
      }
    }

  };

  //randomly assigns obstacles to created grid
  function obstacleAssign (){

  };


  //initialises the game - creates board/sets tiles -

  // Randomly create twenty tiles and render to board

});
