class Apple {

  constructor($el) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', './apple5.png');
    $el.append(this.node);
    this.node.css({ top: Math.round((Math.random() * 650) / 50) * 50, left: Math.round((Math.random() * 650) / 50) * 50 });
  }

}

