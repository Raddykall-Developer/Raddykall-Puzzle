extends RefCounted
class_name PuzzleModel
## Deterministic rules for the 9x9 block puzzle. No scene/UI dependencies.

const SIZE := 9
var grid: Array = []

func _init() -> void:
	reset()

func reset() -> void:
	grid.clear()
	for y in SIZE:
		var row: Array[int] = []
		for x in SIZE:
			row.append(-1)
		grid.append(row)

func can_place(shape: Array, origin_x: int, origin_y: int) -> bool:
	for point in shape:
		var x := origin_x + int(point[0])
		var y := origin_y + int(point[1])
		if x < 0 or y < 0 or x >= SIZE or y >= SIZE:
			return false
		if grid[y][x] != -1:
			return false
	return true

func place(shape: Array, origin_x: int, origin_y: int, value: int) -> bool:
	if not can_place(shape, origin_x, origin_y):
		return false
	for point in shape:
		grid[origin_y + int(point[1])][origin_x + int(point[0])] = value
	return true

func clear_complete_lines() -> int:
	var rows_to_clear: Array[int] = []
	var cols_to_clear: Array[int] = []
	for y in SIZE:
		var full := true
		for x in SIZE:
			if grid[y][x] == -1:
				full = false
				break
		if full:
			rows_to_clear.append(y)
	for x in SIZE:
		var full := true
		for y in SIZE:
			if grid[y][x] == -1:
				full = false
				break
		if full:
			cols_to_clear.append(x)
	for y in rows_to_clear:
		for x in SIZE:
			grid[y][x] = -1
	for x in cols_to_clear:
		for y in SIZE:
			grid[y][x] = -1
	return rows_to_clear.size() + cols_to_clear.size()

func has_any_move(pieces: Array) -> bool:
	for piece in pieces:
		if bool(piece.get("used", false)):
			continue
		for y in SIZE:
			for x in SIZE:
				if can_place(piece.shape, x, y):
					return true
	return false
