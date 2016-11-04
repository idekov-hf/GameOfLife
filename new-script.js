var grid = {

	array = [],
	rows = 0,
	columns = 0,
	create = function(rows, columns) {
		this.rows = rows;
		this.columns = columns;
		for (var row = 0; row < rows; row++) {
			this.array[row] = [];
			for (var column = 0; column < columns; column++) {
				this.array[row][column] = {
					isAlive = false;
					aliveNeighbors = 0;
				}
			}
		}
	},
	countAllNeighbors: function() {
		array.forEach(function(row, rowIndex) {
			row.forEach(function(column, columnIndex) {
				this.countNeighborsForCellAt(rowIndex, columnIndex);
			});
		});
	},
	countNeighborsForCellAt: function(row, column) {
		for (var i = row - 1; i <= row + 1; i++) {
			if (i < 0 || i >= this.rows) { continue; }
			for (var j = column - 1; j <= column + 1; j++) {
				if (j < 0 || j >= this.columns) { continue; }
				if (i === row && j === column) { continue; }

				if (array[i][j].isAlive) {
					array[row][column].aliveNeighbors++;
				}
			}
		}
	}
};