class Body {
  constructor($el) {
    this.node = $('<div class="body"><div class="spots"></div></div>');
    this.currentDirection = "right";
    this.SPEED = 200;
    $el.append(this.node);
    // this.node.css({ top: 0, left: 0 });
    // setTimeout(this.move.bind(this), this.SPEED);
    // this.lastDirection = 'right';
  }

  move() {
    this.node.css(position);
    // setTimeout(this.move.bind(this), this.SPEED);
  }
}
