extends Control
## Native Godot 4 vertical slice. No HTML, DOM or browser runtime.
## Layout is a real Control tree; the ad dock is the final, fixed-height row.

const SIZE := 9
const CELL_COLORS: Array[Color] = [
	Color("#4CD9FF"), Color("#48E2A0"), Color("#FFC15E"),
	Color("#FF6FA8"), Color("#A18AFF"), Color("#FFE56B")
]
const SHAPES: Array[Array] = [
	[[0,0]], [[0,0],[1,0]], [[0,0],[0,1]],
	[[0,0],[1,0],[2,0]], [[0,0],[0,1],[0,2]],
	[[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[2,0],[0,1]],
	[[0,0],[1,0],[2,0],[1,1]], [[0,0],[0,1],[0,2],[1,2]],
	[[0,0],[1,0],[2,0],[0,1],[1,1]]
]

var model := PuzzleModel.new()
var cells: Array[Button] = []
var piece_buttons: Array[Button] = []
var pieces: Array[Dictionary] = []
var selected_piece := -1
var score := 0
var turn := 0
var score_label: Label
var turn_label: Label
var status_label: Label
var board_grid: GridContainer
var tray: HBoxContainer
var game_column: VBoxContainer
var ad_dock: PanelContainer
var rng := RandomNumberGenerator.new()

func _ready() -> void:
	rng.randomize()
	_build_ui()
	_new_pieces()
	_refresh_board()
	get_viewport().size_changed.connect(_on_viewport_resized)

func _draw() -> void:
	var r := Rect2(Vector2.ZERO, size)
	draw_rect(r, Color("#080E24"))
	draw_circle(Vector2(size.x * 0.12, size.y * 0.12), size.x * 0.34, Color(0.10, 0.24, 0.55, 0.18))
	draw_circle(Vector2(size.x * 0.94, size.y * 0.54), size.x * 0.38, Color(0.36, 0.12, 0.55, 0.13))
	draw_circle(Vector2(size.x * 0.18, size.y * 0.76), size.x * 0.22, Color(0.05, 0.55, 0.65, 0.08))

func _build_ui() -> void:
	var safe := MarginContainer.new()
	safe.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	safe.add_theme_constant_override("margin_left", 18)
	safe.add_theme_constant_override("margin_right", 18)
	safe.add_theme_constant_override("margin_top", 14)
	safe.add_theme_constant_override("margin_bottom", 8)
	add_child(safe)

	var root := VBoxContainer.new()
	root.add_theme_constant_override("separation", 10)
	safe.add_child(root)

	var header := HBoxContainer.new()
	header.add_theme_constant_override("separation", 10)
	root.add_child(header)

	var brand := VBoxContainer.new()
	brand.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	brand.add_theme_constant_override("separation", 0)
	header.add_child(brand)
	var logo := Label.new()
	logo.text = "RADDYKALL"
	logo.add_theme_font_size_override("font_size", 17)
	logo.add_theme_color_override("font_color", Color("#7DEBFF"))
	brand.add_child(logo)
	var subtitle := Label.new()
	subtitle.text = "PUZZLE  •  EDIZIONE DELUXE"
	subtitle.add_theme_font_size_override("font_size", 10)
	subtitle.add_theme_color_override("font_color", Color("#9DAED7"))
	brand.add_child(subtitle)
	var pause := _make_button("", Color("#27365E"), 48)
	pause.icon = load("res://assets/ui/btn_pause.png")
	pause.expand_icon = true
	pause.pressed.connect(_show_pause)
	header.add_child(pause)

	var score_panel := PanelContainer.new()
	score_panel.add_theme_stylebox_override("panel", _panel_style(Color("#152344"), Color("#3A568B"), 18))
	root.add_child(score_panel)
	var score_row := HBoxContainer.new()
	score_row.add_theme_constant_override("separation", 12)
	score_panel.add_child(score_row)
	var score_info := VBoxContainer.new()
	score_info.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	score_info.add_theme_constant_override("separation", 1)
	score_row.add_child(score_info)
	var score_caption := Label.new()
	score_caption.text = "PUNTUACIÓN"
	score_caption.add_theme_font_size_override("font_size", 11)
	score_caption.add_theme_color_override("font_color", Color("#A7B8E1"))
	score_info.add_child(score_caption)
	score_label = Label.new()
	score_label.text = "0"
	score_label.add_theme_font_size_override("font_size", 29)
	score_label.add_theme_color_override("font_color", Color.WHITE)
	score_info.add_child(score_label)
	turn_label = Label.new()
	turn_label.text = "TURNO 01"
	turn_caption.add_theme_font_size_override("font_size", 11)
	turn_caption.add_theme_color_override("font_color", Color("#7DEBFF"))
	score_row.add_child(turn_label)

	var status_panel := PanelContainer.new()
	status_panel.add_theme_stylebox_override("panel", _panel_style(Color("#10213B"), Color("#263F6C"), 12))
	root.add_child(status_panel)
	status_label = Label.new()
	status_label.text = "Elige una pieza y toca una casilla para colocarla."
	status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	status_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	status_label.add_theme_font_size_override("font_size", 13)
	status_label.add_theme_color_override("font_color", Color("#DDE9FF"))
	status_panel.add_child(status_label)

	var board_frame := PanelContainer.new()
	board_frame.size_flags_vertical = Control.SIZE_EXPAND_FILL
	board_frame.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	board_frame.add_theme_stylebox_override("panel", _panel_style(Color("#111B39"), Color("#40588D"), 17))
	root.add_child(board_frame)
	var board_margin := MarginContainer.new()
	board_margin.add_theme_constant_override("margin_left", 5)
	board_margin.add_theme_constant_override("margin_right", 5)
	board_margin.add_theme_constant_override("margin_top", 5)
	board_margin.add_theme_constant_override("margin_bottom", 5)
	board_frame.add_child(board_margin)
	board_grid = GridContainer.new()
	board_grid.columns = SIZE
	board_grid.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	board_grid.size_flags_vertical = Control.SIZE_EXPAND_FILL
	board_grid.add_theme_constant_override("h_separation", 3)
	board_grid.add_theme_constant_override("v_separation", 3)
	board_margin.add_child(board_grid)
	for i in SIZE * SIZE:
		var cell := Button.new()
		cell.name = "Cell_%02d" % i
		cell.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		cell.size_flags_vertical = Control.SIZE_EXPAND_FILL
		cell.focus_mode = Control.FOCUS_NONE
		cell.custom_minimum_size = Vector2(0, 0)
		cell.add_theme_stylebox_override("normal", _cell_style(Color("#202D50")))
		cell.add_theme_stylebox_override("hover", _cell_style(Color("#2C416F")))
		cell.add_theme_stylebox_override("pressed", _cell_style(Color("#4CD9FF")))
		cell.add_theme_stylebox_override("focus", _cell_style(Color("#4CD9FF")))
		cell.pressed.connect(_on_cell_pressed.bind(i % SIZE, int(i / SIZE)))
		cells.append(cell)
		board_grid.add_child(cell)

	var tray_title := Label.new()
	tray_title.text = "TUS PIEZAS"
	tray_title.add_theme_font_size_override("font_size", 11)
	tray_title.add_theme_color_override("font_color", Color("#9DAED7"))
	root.add_child(tray_title)
	tray = HBoxContainer.new()
	tray.custom_minimum_size.y = 94
	tray.add_theme_constant_override("separation", 8)
	root.add_child(tray)

	var nav := HBoxContainer.new()
	nav.add_theme_constant_override("separation", 8)
	root.add_child(nav)
	var mission := _make_button("Misiones", Color("#273B70"), 44)
	mission.icon = load("res://assets/ui/btn_star.png")
	mission.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	mission.pressed.connect(func(): _set_status("Misiones: objetivos diarios en preparación."))
	nav.add_child(mission)
	var shop := _make_button("Tienda", Color("#225A66"), 44)
	shop.icon = load("res://assets/ui/btn_shop.png")
	shop.expand_icon = false
	shop.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	shop.pressed.connect(func(): _set_status("Tienda: catálogo visual en construcción."))
	nav.add_child(shop)
	var settings := _make_button("Ajustes", Color("#49366D"), 44)
	settings.icon = load("res://assets/ui/btn_gear.png")
	settings.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	settings.pressed.connect(func(): _set_status("Ajustes: controles nativos en construcción."))
	nav.add_child(settings)

	# Ad region is deliberately the last fixed-height UI row, never over the board.
	ad_dock = PanelContainer.new()
	ad_dock.custom_minimum_size.y = 68
	ad_dock.size_flags_vertical = Control.SIZE_SHRINK_END
	ad_dock.add_theme_stylebox_override("panel", _panel_style(Color("#050916"), Color("#30436E"), 10))
	root.add_child(ad_dock)
	var ad_label := Label.new()
	ad_label.text = "ESPACIO PUBLICITARIO  •  BANNER ADAPTATIVO"
	ad_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	ad_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	ad_label.add_theme_font_size_override("font_size", 10)
	ad_label.add_theme_color_override("font_color", Color("#8FA1CD"))
	ad_dock.add_child(ad_label)

func _make_button(text_value: String, color: Color, min_height: float) -> Button:
	var button := Button.new()
	button.text = text_value
	button.custom_minimum_size.y = min_height
	button.focus_mode = Control.FOCUS_NONE
	button.add_theme_font_size_override("font_size", 13)
	button.add_theme_color_override("font_color", Color.WHITE)
	button.add_theme_stylebox_override("normal", _panel_style(color, color.lightened(0.25), 13))
	button.add_theme_stylebox_override("hover", _panel_style(color.lightened(0.12), color.lightened(0.35), 13))
	button.add_theme_stylebox_override("pressed", _panel_style(color.darkened(0.18), Color("#7DEBFF"), 13))
	return button

func _panel_style(fill: Color, border: Color, radius: int) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = fill
	style.border_color = border
	style.set_border_width_all(1)
	style.set_corner_radius_all(radius)
	style.content_margin_left = 12
	style.content_margin_right = 12
	style.content_margin_top = 7
	style.content_margin_bottom = 7
	return style

func _cell_style(fill: Color) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = fill
	style.border_color = fill.lightened(0.14)
	style.set_border_width_all(1)
	style.set_corner_radius_all(5)
	return style

func _new_pieces() -> void:
	pieces.clear()
	for i in 3:
		var shape: Array = SHAPES[rng.randi_range(0, SHAPES.size() - 1)].duplicate(true)
		pieces.append({"shape": shape, "color": CELL_COLORS[rng.randi_range(0, CELL_COLORS.size() - 1)], "used": false})
	selected_piece = -1
	_render_tray()

func _render_tray() -> void:
	for child in tray.get_children():
		child.queue_free()
	piece_buttons.clear()
	for i in pieces.size():
		var piece: Dictionary = pieces[i]
		var button := Button.new()
		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		button.size_flags_vertical = Control.SIZE_EXPAND_FILL
		button.focus_mode = Control.FOCUS_NONE
		button.disabled = bool(piece.used)
		button.add_theme_stylebox_override("normal", _panel_style(Color("#172342"), Color("#354B7B"), 12))
		button.add_theme_stylebox_override("hover", _panel_style(Color("#243960"), Color("#5F82C4"), 12))
		button.add_theme_stylebox_override("pressed", _panel_style(Color("#1B4760"), Color("#7DEBFF"), 12))
		button.add_theme_font_size_override("font_size", 14)
		var shape: Array = piece.shape
		var width := 1
		for point in shape:
			width = maxi(width, int(point[0]) + 1)
		var preview := ""
		for point in shape:
			preview += "◆ "
		button.text = ("PIEZA %d\n" % (i + 1)) + preview.strip_edges()
		button.add_theme_color_override("font_color", piece.color if not piece.used else Color("#536080"))
		button.pressed.connect(_on_piece_selected.bind(i))
		tray.add_child(button)
		piece_buttons.append(button)

func _on_piece_selected(index: int) -> void:
	if pieces[index].used:
		return
	selected_piece = index
	_set_status("Pieza %d seleccionada: toca el tablero para colocarla." % (index + 1))
	for i in piece_buttons.size():
		var button := piece_buttons[i]
		if i == index:
			button.add_theme_stylebox_override("normal", _panel_style(Color("#214D67"), Color("#7DEBFF"), 12))
		else:
			button.add_theme_stylebox_override("normal", _panel_style(Color("#172342"), Color("#354B7B"), 12))

func _on_cell_pressed(x: int, y: int) -> void:
	if selected_piece < 0:
		_set_status("Primero elige una pieza de la bandeja.")
		return
	var piece: Dictionary = pieces[selected_piece]
	var shape: Array = piece.shape
	var value := CELL_COLORS.find(piece.color) + 1
	if not model.place(shape, x, y, value):
		_set_status("Esa posición no cabe. Prueba otra casilla.")
		return
	piece.used = true
	score += shape.size()
	turn += 1
	var cleared := _clear_complete_lines()
	score += cleared * SIZE * 2
	score_label.text = str(score)
	turn_label.text = "TURNO %02d" % (turn + 1)
	_set_status("¡Bien! +%d puntos%s" % [shape.size(), " · líneas despejadas: %d" % cleared if cleared > 0 else ""])
	selected_piece = -1
	if pieces.all(func(p): return bool(p.used)):
		_new_pieces()
	else:
		_render_tray()
	_refresh_board()
	if not _has_any_move():
		_set_status("No hay movimientos disponibles. Reinicia para volver a jugar.")

func _clear_complete_lines() -> int:
	return model.clear_complete_lines()

func _has_any_move() -> bool:
	return model.has_any_move(pieces)

func _refresh_board() -> void:
	for y in SIZE:
		for x in SIZE:
			var button: Button = cells[y * SIZE + x]
			var value: int = grid[y][x]
			var color := Color("#202D50") if value == -1 else CELL_COLORS[(value - 1) % CELL_COLORS.size()]
			button.add_theme_stylebox_override("normal", _cell_style(color))
			button.add_theme_stylebox_override("hover", _cell_style(color.lightened(0.14)))
			button.add_theme_stylebox_override("pressed", _cell_style(Color("#7DEBFF")))
			button.text = "" if value == -1 else "◆"
			button.add_theme_font_size_override("font_size", 14)
			button.add_theme_color_override("font_color", Color(1, 1, 1, 0.86))
	queue_redraw()

func _set_status(message: String) -> void:
	if is_instance_valid(status_label):
		status_label.text = message

func _show_pause() -> void:
	var dialog := ConfirmationDialog.new()
	dialog.title = "Pausa"
	dialog.dialog_text = "¿Quieres reiniciar la partida?"
	dialog.ok_button_text = "Reiniciar"
	dialog.cancel_button_text = "Continuar"
	add_child(dialog)
	dialog.confirmed.connect(_restart)
	dialog.canceled.connect(dialog.queue_free)
	dialog.confirmed.connect(dialog.queue_free)
	dialog.popup_centered(Vector2i(320, 180))

func _restart() -> void:
	model.reset()
	score = 0
	turn = 0
	score_label.text = "0"
	_new_pieces()
	_refresh_board()
	_set_status("Partida nueva. ¡Vamos!")

func _on_viewport_resized() -> void:
	queue_redraw()
