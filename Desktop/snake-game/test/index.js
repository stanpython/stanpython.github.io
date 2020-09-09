describe('Snake', function() {

  var SPEED;
  var BORDER_WIDTH = parseInt($('#board').css("border-left-width"), 10);
  
  // prevent alert dialogs
  window.alert = function() {
    console.log.apply(console, arguments);
  };

  function move(direction) {
    var keyCodes = { 'left': 37, 'up': 38, 'right': 39, 'down': 40 };
    $('body').trigger(jQuery.Event("keydown", {keyCode: keyCodes[direction]}));
    clock.tick(SPEED);
  }

  beforeEach(function() {
    board = $('#board');
    SPEED = head.SPEED;

    // place head in middle of board
    var midX = board.position().left + BORDER_WIDTH + Math.floor(board.width() / 2) - 50;
    var midY = board.position().top + BORDER_WIDTH + Math.floor(board.height() / 2) - 50;
    head.node.offset({ left: midX, top: midY });

    // start head moving right
    move('right');
  });

  afterEach(function() {
    // clock.restore();
  });

  describe('Head', function() {

    describe('Responds to keyboard input', function() {

      it('should move right if right button is pressed', function() {      
        var oldPosition = head.node.position();
        move('right');
        var newPosition = head.node.position();
        expect(newPosition.top).to.eql(oldPosition.top);
        expect(newPosition.left).to.be.greaterThan(oldPosition.left);
      });

      it('should move left if left button is pressed', function() {
        // Should not be moving right before moving left
        move('down');
        var oldPosition = head.node.position();
        move('left');
        var newPosition = head.node.position();
        expect(newPosition.top).to.eql(oldPosition.top);
        expect(newPosition.left).to.be.lessThan(oldPosition.left);
      });

      it('should move up if up button is pressed', function() {
        var oldPosition = head.node.position();
        move('up');
        var newPosition = head.node.position();
        expect(newPosition.top).to.lessThan(oldPosition.top);
        expect(newPosition.left).to.eql(oldPosition.left);
      });

      it('should move down if down button is pressed', function() {
        var oldPosition = head.node.position();
        move('down');
        var newPosition = head.node.position();
        expect(newPosition.top).to.be.greaterThan(oldPosition.top);
        expect(newPosition.left).to.eql(oldPosition.left);
      });

    });

    describe('Game ends if head moves out of the board', function() {

      afterEach(function() {
        // place head in middle of board
        var midX = board.position().left + BORDER_WIDTH + Math.floor(board.width() / 2) - 50;
        var midY = board.position().top + BORDER_WIDTH + Math.floor(board.height() / 2) - 50;
        head.node.offset({ left: midX, top: midY });

        // get head moving again
        head.currentDirection = 'up';
        head.move();
      });

      it('should not be able to move outside of the top of the board', function() {
        var oldPosition = head.node.position();

        // position head at top of board
        oldPosition.top = board.position().top + BORDER_WIDTH;
        head.node.offset(oldPosition);

        // try to move up
        move('up');
        var newPosition = head.node.position();
        expect(newPosition.top).to.eql(oldPosition.top);
      });

      it('should not be able to move outside of the right of the board', function() {
        var oldPosition = head.node.position();

        // position head at right of board
        oldPosition.left = board.position().left + board.width() - 50 + BORDER_WIDTH;
        head.node.offset(oldPosition);

        // try to move up
        move('right');
        var newPosition = head.node.position();
        expect(newPosition.left).to.eql(oldPosition.left);
      });

      it('should not be able to move outside of the bottom of the board', function() {
        var oldPosition = head.node.position();

        // position head at bottom of board
        oldPosition.top = board.position().top + board.height() - 50 + BORDER_WIDTH;
        head.node.offset(oldPosition);

        // try to move down
        move('down');
        var newPosition = head.node.position();
        expect(newPosition.top).to.eql(oldPosition.top);
      });

      it('should not be able to move outside of the left of the board', function() {
        var oldPosition = head.node.position();
        
        // position head at left of board
        oldPosition.left = board.position().left + BORDER_WIDTH;
        head.node.offset(oldPosition);

        // Should not be moving right before moving left
        move('down');
        // try to move left
        move('left');
        var newPosition = head.node.position();
        expect(newPosition.left).to.eql(oldPosition.left);
      });

    });

    describe('**BONUS** Cannot move backwards', function() {

      it('should not move left if currently moving right', function() {
        var oldPosition = head.node.position();
        move('right');
        var newPosition = head.node.position();
        expect(newPosition.left).to.be.greaterThan(oldPosition.left);
        oldPosition = head.node.position();
        move('left');
        newPosition = head.node.position();
        expect(newPosition.left).to.be.greaterThan(oldPosition.left);
        expect(newPosition.top).to.eql(oldPosition.top);
      });

      it('should not move right if currently moving left', function() {
        var oldPosition = head.node.position();
        move('down');
        move('left');
        var newPosition = head.node.position();
        expect(newPosition.left).to.be.lessThan(oldPosition.left);
        oldPosition = head.node.position();
        move('right');
        newPosition = head.node.position();
        expect(newPosition.left).to.be.lessThan(oldPosition.left);
        expect(newPosition.top).to.eql(oldPosition.top);
      });

      it('should not move up if currently moving down', function() {
        var oldPosition = head.node.position();
        move('down');
        var newPosition = head.node.position();
        expect(newPosition.top).to.be.greaterThan(oldPosition.top);
        oldPosition = head.node.position();
        move('up');
        newPosition = head.node.position();
        expect(newPosition.top).to.be.greaterThan(oldPosition.top);
        expect(newPosition.left).to.eql(oldPosition.left);
      });

      it('should not move down if currently moving up', function() {
        // move('right');
        var oldPosition = head.node.position();
        move('up');
        var newPosition = head.node.position();
        expect(newPosition.top).to.be.lessThan(oldPosition.top);
        oldPosition = head.node.position();
        move('down');
        newPosition = head.node.position();
        expect(newPosition.top).to.be.lessThan(oldPosition.top);
        expect(newPosition.left).to.eql(oldPosition.left);
      });
    });
  });

  describe('Apple', function() {
    var apple;
    var board;
    var $apple;

    beforeEach(function() {
      board = $('#board');
      $apple = $('#apple');
    });

    it('should generate an apple within the parameters of the board', function() {
      var board_position = board.position();
      var board_height = board.height();
      var board_width = board.width();

      for (var i = 0; i < 10; i ++) {
        if ($('#apple').length > 0) {
          $('#apple').detach();
        }
        apple = new Apple(board);
        var apple_position = apple.node.position();
        var apple_height = apple.node.height();
        var apple_width = apple.node.width();

        expect(apple_position.top).to.be.greaterThan(board_position.top);
        expect(apple_position.left).to.be.greaterThan(board_position.left);
        expect(apple_position.top + apple_height).to.be.lessThan(board_position.top + board_height + (BORDER_WIDTH * 2));
        expect(apple_position.left + apple_width).to.be.lessThan(board_position.left + board_width + (BORDER_WIDTH * 2));
      }
    });

    it('should generate an apple randomly on the board', function() {
      var oldPosition = apple.node.position();

      for (var i = 0; i < 10; i ++) {
        if ($('#apple').length > 0) {
          $('#apple').detach();          
        }
        apple = new Apple(board);
        var newPosition = apple.node.position();
        expect(oldPosition).to.not.eql(newPosition);
        oldPosition = newPosition;     
      }
    });

    it('should remove the apple and regenerate at a new location when the head of the snake reaches the apple', function() {
      var applePosition = apple.node.position();
      var newPosition;

      // make sure apple not moving right/left
      move('down');

      // if apple on left wall
      if (applePosition.left === board.position().left + BORDER_WIDTH) {
        newPosition = {
          left: applePosition.left + 50,
          top: applePosition.top
        };
        head.node.offset(newPosition);
        move('left');
      } else {
        // place head to left of apple
        newPosition = {
          left: applePosition.left - 50,
          top: applePosition.top
        };
        head.node.offset(newPosition);
        move('right');
      }

      var newApple = $('#apple');
      expect(newApple.length).to.be.greaterThan(0);
      expect(newApple.position()).to.not.eql(applePosition);
    });

  });
});
mocha.globals();
if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
