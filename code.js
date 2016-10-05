var table;
var grid = [];
var rows = 12;
var cols = 12;
var isPlaying = false;
var timer;

$(document).ready(function() {
  table = document.getElementById('myTable');
  createTable();
  $('td').click(function() {
    cellClicked(this);
  });
  isMouseDown = false;

  $('td').mousedown(function() {
    isMouseDown = true;
    console.log(isMouseDown);
  })
  .mouseup(function() {
    isMouseDown = false;
  });

  $('td').mouseenter(function() {
    if (isMouseDown) {
      cellClicked(this);
    }
  });

  $('#advance-button').click(function() {
    advanceGrid();
  });

  $('#start-button').click(function() {
    start();
  });

  $('#reset-button').click(function() {
    resetGrid();
  });
});

function createTable() { 
  for (var row = 0; row < rows; row++) {
    grid[row] = [];
    var tableRow = table.insertRow(row);
    for (var col = 0; col < cols; col++) {
      grid[row][col] = 0;
      var tableCol = tableRow.insertCell(col);
    }
  }
}

function logGrid() {
  var gridString = '';
  for (i = 0; i < grid.length; i++) {
    gridString += '|';
    for (j = 0; j < grid[0].length; j++) {
      gridString += grid[i][j] + '|';
    }
    gridString += '\n';
  }
  console.log(gridString);
}

function cellClicked(cell) {
  $(cell).toggleClass('filled');
  var col = $(cell).index();
  var $tr = $(cell).closest('tr');
  var row = $tr.index();
  var clickedCell = grid[row][col]
  grid[row][col] = clickedCell ? 0 : 1;
}

function advanceGrid() {

  var newGrid = [];

  for (row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (col = 0; col < grid[0].length; col++) {

      var numNeighbors = countNeighbors(row, col);
      var cellIsAlive = grid[row][col];

      if (cellIsAlive) {
        if (numNeighbors < 2 || numNeighbors > 3) {
          newGrid[row].push(0);
          table.rows[row].cells[col].className = '';
        } else {
          newGrid[row].push(1);
          table.rows[row].cells[col].className = 'filled';
        }
      } else {
        if (numNeighbors === 3) {
          newGrid[row].push(1);
          table.rows[row].cells[col].className = 'filled';
        } else {
          newGrid[row].push(0);
          table.rows[row].cells[col].className = '';
        }
      }
    }
  }

  grid = newGrid;

  logGrid();
}

function countNeighbors(row, col) {
  var neighbors = 0;

  for (i = row - 1; i < row + 2; i++) {
    for (j = col - 1; j < col + 2; j++) {

      if (i >= 0 && j >= 0) {
        if (i < rows && j < cols) {
          if (grid[i][j] === 1) {
            neighbors++;
          }
        }
      }
    }
  }

  neighbors -= grid[row][col];

  return neighbors;
}

function start() {
  if (!isPlaying) {
    timer = setInterval(advanceGrid, 250);
    isPlaying = true;
    // $('#start-button').css('background-color', 'green');
  } else {
    clearInterval(timer);
    isPlaying = false;
    // $('#start-button').css('background-color', 'transparent');
  }
}

function resetGrid() {
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      grid[row][col] = 0;
      table.rows[row].cells[col].className = '';
    }
  }
}