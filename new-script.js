var grid = {
	array = [],
	rows = 0,
	columns = 0,
	isInitialized = false,
	create = function(rows, columns) {
		if (rows < 1 || columns < 1) { return; }
		this.rows = rows;
		this.columns = columns;
		for (var row = 0; row < rows; row++) {
			this.array[row] = [];
			for (var column = 0; column < columns; column++) {
				this.array[row][column] = {
					isAlive = false;
					numAliveNeighbors = 0;
				}
			}
		}
		this.isInitialized = true;
	},
	countNeighborsForAllCells: function() {
		this.array.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {
				cell.numAliveNeighbors = 0;
				this.countNeighborsForCellAt(rowIndex, columnIndex);
			}, this);
		}, this);
	},
	countNeighborsForCellAt: function(row, column) {
		for (var i = row - 1; i <= row + 1; i++) {

			if (i < 0 || i >= this.rows) { continue; }

			for (var j = column - 1; j <= column + 1; j++) {

				if (j < 0 || j >= this.columns) { continue; }
				if (i === row && j === column) { continue; }

				if (array[i][j].isAlive) {
					array[row][column].numAliveNeighbors++;
				}
			}
		}
	},
	updateAllCells: function() {
		this.array.forEach(function(row) {
			row.forEach(function(cell) {
				var numAliveNeighbors = cell.numAliveNeighbors;
				if (numAliveNeighbors === 3) {
					cell.isAlive = true;
				} else if (numAliveNeighbors < 2 || numAliveNeighbors > 3) {
					cell.isAlive = false;
				}
			});
		});
	},
	advance: function() {
		this.countNeighborsForAllCells();
		this.updateAllCells();
	},
	reset: function() {
		if (!isInitialized) { return; }
		this.array.forEach(function(row) {
			row.forEach(function(cell) {
				cell = {
					isAlive = false;
					numAliveNeighbors = 0;
				}
			});
		});
	}
};

var game = {
	isPlaying = false;
	timer;
};

var handlers = {
	create: function() {
		var rowsInputValue = document.getElementById("rowsInput").valueAsNumber;
		var columnsInputValue = document.getElementById("columnsInput").valueAsNumber;
		grid.create(rowsInputValue, columnsInputValue);
		view.createGrid(rowsInputValue, columnsInputValue);
	},
	advance: function() {
		grid.advance();
	},
	start: function() {
		if (!game.isPlaying) {
			game.timer = setInterval(advanceGrid, 250);
		} else {
			clearInterval(game.timer);
		}
	},
	reset: function() {
		grid.reset();
	}
};

var view = {
	createGrid: function(rows, columns) {

	},
	displayGrid: function() {

	}
};