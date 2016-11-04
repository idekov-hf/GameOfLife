var grid = {
	array: [],
	rows: 0,
	columns: 0,
	isInitialized: false,
	create: function(rows, columns) {
		this.array = [];
		this.rows = rows;
		this.columns = columns;
		for (var row = 0; row < rows; row++) {
			this.array[row] = [];
			for (var column = 0; column < columns; column++) {
				this.array[row][column] = {
					isAlive: false,
					numAliveNeighbors: 0
				};
			}
		}
		this.isInitialized = true;
	},
	countNeighborsForAllCells: function() {
		this.array.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {
				cell.numAliveNeighbors = 0;
				this.countNeighborsForCellAtPosition(rowIndex, columnIndex);
			}, this);
		}, this);
	},
	countNeighborsForCellAtPosition: function(row, column) {
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
		if (!this.isInitialized) { return; }
		this.array.forEach(function(row) {
			row.forEach(function(cell) {
				cell.isAlive = false;
				cell.numAliveNeighbors = 0;
			});
		});
	},
	toggleCellAtPosition: function(row, column) {
		var cell = this.array[row][column];
		cell.isAlive = !cell.isAlive;
	},
	getCellAtPosition: function(row, column) {
		return this.array[row][column];
	},
	log: function() {
		var string = "";
		this.array.forEach(function(row) {
			string += "|";
			row.forEach(function(cell) {
				string += cell.isAlive ? "1|" : "0|";
			});
			string += "\n";
		});
		console.log(string);
	}
};

var controller = {
	isPlaying: false,
	timer: undefined,
	create: function() {
		var rowsInputValue = document.getElementById("rowsInput").valueAsNumber;
		var columnsInputValue = document.getElementById("columnsInput").valueAsNumber;
		grid.create(rowsInputValue, columnsInputValue);
		view.createTable(rowsInputValue, columnsInputValue);
	},
	advance: function() {
		grid.advance();
	},
	start: function() {
		if (!this.isPlaying) {
			this.timer = setInterval(this.advance, 250);
		} else {
			clearInterval(this.timer);
		}
		this.isPlaying = !this.isPlaying;
	},
	reset: function() {
		grid.reset();
		view.resetTable();
	},
	toggleCell: function(td) {
		var rowNum = parseInt(td.parentNode.id);
		var columnNum = parseInt(td.id); 

		grid.toggleCellAtPosition(rowNum, columnNum);
		var cell = grid.getCellAtPosition(rowNum, columnNum);
		td.className = cell.isAlive ? "filled" : "empty"
	}
};

var view = {
	table: document.getElementById("grid"),
	createTable: function(rows, columns) {
		this.table.innerHTML = "";
		for (var row = 0; row < rows; row++) {
			var tr = this.table.insertRow(row);
			tr.id = row;
			for (var column = 0; column < columns; column++) {
				var td = tr.insertCell(column);
				td.id = column;
			}
		}
	},
	resetTable: function() {
		for (row = 0; row < this.table.rows.length; row++) {
			var tr = this.table.rows[row];
			for (column = 0; column < tr.cells.length; column++) {
				tr.cells[column].className = "empty";
			}
		}
	},
	setUpEventListeners: function() {
		var table = document.getElementById("grid");
		table.addEventListener("mouseup", function(event) {
			var elementClicked = event.target;
			controller.toggleCell(elementClicked);
		});
	}
};

view.setUpEventListeners();