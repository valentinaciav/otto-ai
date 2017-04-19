window.$ = require('jquery');

const Chessboard = require('./chessboard.js');
const Chess = require('chess.js').Chess;

const game = new Chess();

const sessionId = decodeURIComponent(window.location.hash.replace('#', ''));

////////////
// Socket //
////////////

const socket = io();

socket.emit('start', {
	sessionId: sessionId,
});

socket.on('fen', (fen) => {
	console.log('FEN', fen);
	if (game.fen() != fen) {
		game.load(fen);
		board.position(fen);
	}
});

////////////
// Events //
////////////

function onDragStart(source, piece, position, orientation) {
	if (piece.color === 'b') return false;
	if (game.game_over() === true || game.turn() === 'b') return false;
}

function onDrop(source, target) {
	socket.emit('move', {
		sessionId: sessionId,
		from: source,
		to: target
	});
}

var removeGreySquares = function() {
	$('.square-55d63').css('background', '');
};

function greySquare(square) {
	var squareEl = $('.square-' + square);

	var background = '#a9a9a9';
	if (squareEl.hasClass('black-3c85d') === true) {
		background = '#696969';
	}

	squareEl.css('background', background);
}

function onMouseoverSquare(square, piece) {
	var moves = game.moves({
		square: square,
		verbose: true
	});

	if (moves.length === 0) return;

	greySquare(square);

	for (var i = 0; i < moves.length; i++) {
		greySquare(moves[i].to);
	}
}

function onMouseoutSquare(square, piece) {
	removeGreySquares();
}

const board = ChessBoard('board1', {
	draggable: true,
	position: 'start',
	onDragStart: onDragStart,
	onDrop: onDrop,
	onMouseoutSquare: onMouseoutSquare,
	onMouseoverSquare: onMouseoverSquare
});