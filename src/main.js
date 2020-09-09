$(document).ready(function () {
  $("#my_audio").get(0).play();

  const welcomeScreen = document.querySelector(".welcome");
  const board = document.querySelector("#board");
  const scoreBoard = document.querySelector(".scoreBoard");
  const sbutton = document.querySelector(".start");

  sbutton.addEventListener("click", function (e) {
    $(welcomeScreen).css("display", "none");
    $(board).css("display", "block");
    $(scoreBoard).css("display", "block");
  });

  const reload = document.querySelector(".reload");

  reload.addEventListener("click", function () {
    location.reload();
  });

  const head = new Head($("#board"));
  const apple = new Apple($("#board"));

  const headimg = document.getElementById("head");
  $(headimg).css("transform", "rotate(-90deg)");

  const song = $("audio");
  song.autoplay = true;

  $("body").on("keydown", function (e) {
    // console.log(apple.style.top, head.style.top);

    if (e.keyCode === 37) {
      // console.log('pressed left');
      if (head.currentDirection !== "right") {
        $(headimg).css("transform", "rotate(90deg)");
        head.currentDirection = "left";
      }
    } else if (e.keyCode === 40) {
      // console.log('pressed down');
      if (head.currentDirection !== "up") {
        $(headimg).css("transform", "rotate(0deg)");
        head.currentDirection = "down";
      }
    } else if (e.keyCode === 38) {
      // console.log('pressed up');
      if (head.currentDirection !== "down") {
        $(headimg).css("transform", "rotate(180deg)");
        head.currentDirection = "up";
      }
    } else if (e.keyCode === 39) {
      // console.log('pressed right');
      if (head.currentDirection !== "left") {
        $(headimg).css("transform", "rotate(-90deg)");
        head.currentDirection = "right";
      }
    }
  });
});
