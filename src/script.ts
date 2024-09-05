//SETTINGS//

const cactus_speed = 1.3;

//SETTINGS//

let gameStarted = false;
let score = 0;
let jumping = false;

const dinosaur = document.getElementById("dinosaur")!;
const cactus = document.getElementById("cactus")!;
const h2 = document.querySelector("h2")!;

document.addEventListener("keypress", async (event) => {
  if (event.code != "Space" || jumping) return;

  jumping = true;
  gameStarted = true;
  handleGame();
  handleH2();

  dinosaur.style.top = "50px";

  await new Promise((resolve) =>
    setTimeout(() => {
      dinosaur.style.top = "150px";
      resolve(true);
    }, 280)
  );
  setTimeout(() => (jumping = false), 300);
});

cactus.addEventListener("animationiteration", (event) => {
  if (!checkIfAlive()) {
    gameStarted = false;
    score = 0;
    handleH2();
    h2.innerHTML = "You died! | Press space to start";
    handleGame();
    return;
  }

  score += 1;
  handleH2();
});

function checkIfAlive(): boolean {
  let dinoTop = parseInt(
    window.getComputedStyle(dinosaur).getPropertyValue("top")
  );
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  return cactusLeft <= 570 && dinoTop >= 140 ? false : true;
}

function handleH2() {
  h2.innerHTML = gameStarted ? score.toString() : "Press space to start";
}

function handleGame() {
  cactus.style.animation = gameStarted
    ? `cactusMove ${cactus_speed}s linear infinite`
    : "";
}
