// creates a constructor function - research ES6 classes
class Head {
  // this is what's called when you use the "new" keyword
  constructor($el) {
    this.node = $('<div id="head"><img src="./snake_face.png" width="70px"></div>');
    this.currentDirection = "right";
    this.SPEED = 200;
    $el.append(this.node);
    this.node.css({ top: 0, left: 0 });
    setTimeout(this.move.bind(this), this.SPEED);
    this.pastPositions = [];
    this.length = 0;
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let direction = this.currentDirection;
    let last = this.lastDirection;
    let position = this.node.position();

    let ourHead = document.getElementById("head");
    this.pastPositions.push([ourHead.style.top, ourHead.style.left]);

    const score = document.querySelector("span");
    score.innerText = this.length;

    const board = document.querySelector("#board");
    const youLost = document.querySelector(".youLost");

    if (direction === "right") {
      if (position.left > 600) {
        this.speed = 0;
        $(board).css("display", "none");
        $(youLost).css("display", "block");
        // alert('game over!')
      } else {
        position.left += 50;
      }
    } else if (direction === "down") {
      if (position.top > 600) {
        this.speed = 0;
        $(board).css("display", "none");
        $(youLost).css("display", "block");
        // alert('game over!')
      } else {
        position.top += 50;
      }
    } else if (direction === "left") {
      if (position.left < 25) {
        this.speed = 0;
        $(board).css("display", "none");
        $(youLost).css("display", "block");
        // alert('game over!')
      } else {
        position.left -= 50;
      }
    } else if (direction === "up") {
      if (position.top < 25) {
        this.speed = 0;
        $(board).css("display", "none");
        $(youLost).css("display", "block");
        // alert('game over!')
      } else {
        position.top -= 50;
      }
    }

    const bodies = document.querySelectorAll(".body");

    // if (this.pastPositions.length > this.length && this.count > 1) {
    //   const difference = this.pastPositions.length - this.length;
    //   this.pastPositions = this.pastPositions.slice(difference);
    // }
    // console.log(bodies)

    if (bodies.length > 0) {
      bodies.forEach((body, i) => {
        body.style.top = this.pastPositions[this.pastPositions.length - i - 1][0];
        body.style.left = this.pastPositions[this.pastPositions.length - i - 1][1];
      });

      if (this.pastPositions.length > this.length) {
        const difference = this.pastPositions.length - this.length;
        this.pastPositions = this.pastPositions.slice(difference);
      }

      this.pastPositions.forEach((pair, i) => {
        if (i !== this.pastPositions.length - 1) {
          if (pair[0] === ourHead.style.top && pair[1] === ourHead.style.left) {
            $(board).css("display", "none");
            $(youLost).css("display", "block");
          }
        }
      });

      // for (let i = 0; i < this.pastPositions.length - 1; i++) {
      //   const past = this.pastPositions[i];
      //   // console.log(past)
      //   if (past[0] === ourHead.style.top && past[1] === ourHead.style.left) {
      //     alert('YOU ATE YOURSELF!!');
      //   }
      // }
    }

    this.node.css(position);
    setTimeout(this.move.bind(this), this.SPEED);

    let ourApple = document.getElementById("apple");

    // console.log(ourApple.style.top.slice(0, -2) * 1);
    // console.log(Math.ceil(ourHead.style.left.slice(0, -2)));

    if (
      ourApple.style.top.slice(0, -2) * 1 === Math.ceil(ourHead.style.top.slice(0, -2)) &&
      ourApple.style.left.slice(0, -2) * 1 === Math.ceil(ourHead.style.left.slice(0, -2))
    ) {
      let appleTop = Math.round((Math.random() * 650) / 50) * 50;
      let appleLeft = Math.round((Math.random() * 650) / 50) * 50;
      let array = [appleTop + "px", appleLeft + "px"];

      let stringedPosition = JSON.stringify(array);
      const stringedPastPositions = JSON.stringify(this.pastPositions);

      // console.log(stringedPosition);
      // console.log(stringedPastPositions);

      while (stringedPastPositions.includes(stringedPosition)) {
        console.log("I GOT IN ");
        appleTop = Math.round((Math.random() * 650) / 50) * 50;
        appleLeft = Math.round((Math.random() * 650) / 50) * 50;
        stringedPosition = JSON.stringify([appleTop + "px", appleLeft + "px"]);
      }

      // this.pastPositions.forEach(pair => {
      //   while (appleTop === pair[0] && appleLeft === pair[1]) {
      //     appleTop = Math.round((Math.random() * 650) / 50) * 50;
      //     appleLeft = Math.round((Math.random() * 650) / 50) * 50;
      //   }
      // })

      ourApple.style.top = appleTop;
      ourApple.style.left = appleLeft;

      const body = new Body($("#board"));
      const newBody = document.querySelectorAll(".body");
      // console.log(this.pastPositions);
      newBody[newBody.length - 1].style.top = this.pastPositions[this.pastPositions.length - 1][0];
      newBody[newBody.length - 1].style.left = this.pastPositions[this.pastPositions.length - 1][1];
      newBody[newBody.length - 1].style.backgroundColor = "rgb(158, 198, 72)";
      this.length++;
    }
  }
}
