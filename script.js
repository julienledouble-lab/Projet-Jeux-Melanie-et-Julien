/* general game variables */
let playerScore = 0; // means that the score of the player is at 0 when the player starts the game and is counter for the clicks //
const basicGainPerClick = 1; // means that when the player clicks the player score will go up by 1 --> start value can evolve during the game //
let bonusGainPerClick = 0; // bonus click that will be added once the player bought some upgrades
//const startTime = Date.now(); // takes into account when the user opens the game in the browser for the first time
localStorage.setItem("startTime", startTime); // saves the variable startTime in local storage under the name startTime.
let totalClickperSecond = 0;

/*Select the element that allows the score to go up by 1 while the player clicks element*/
const addOnePointToScorePerClick = document.querySelector(".centralpicture");
const countDisplay = document.getElementById("total_output");
//let displayGrey = document.querySelector("an_upgrade_grey");

/* Add clicker event to the image*/
addOnePointToScorePerClick.addEventListener("click", () => {
  addFiveCoffeePerClick();
  playerScore += basicGainPerClick + bonusGainPerClick; // adds 1 coffee per click to score of Player
  countDisplay.textContent = `${playerScore} café`;
});
/* function that will add 5 coffee per click once the player has 40 coffees and bought the upgrade*/
function addFiveCoffeePerClick() {
  if (playerScore >= 40) {
    bonusGainPerClick = 5; // adds 5 coffee per click to score of Player = total of coffees par click = 6
    //countDisplay.textContent = `${playerScore} café`;//
  }
}

class Upgrades {
  constructor(
    name,
    basicPrice,
    output,
    isClick,
    unlockUpgradeMinimum,
    owned = 0
  ) {
    this.name = name;
    this.basicPrice = basicPrice;
    this.output = output;
    this.isClick = isClick;
    this.unlockUpgradeMinimum = unlockUpgradeMinimum;
    this.owned = owned;
  }
  get updatedPriceAfterPurchase() {
    return this.basicPrice * Math.pow(1.08, this.owned);
  }
}

const ListOfUpgrades = [
  new Upgrades("Strong Coffee", 10, 1, true, 5),
  new Upgrades("Mug Isothermal", 40, 3, true, 30),
  new Upgrades("Fixed Coffee Machine", 200, 1, false, 150),
  new Upgrades("New Filter", 500, 5, false, 250),
  new Upgrades("Mug XXL", 1200, 10, true, 700),
  new Upgrades("Turbo Spout", 3000, 10, false, 2200), //bac verseur turbo
  new Upgrades("Mix Premium", 10000, 20, true, 6000),
  new Upgrades("Coffee Machine 2.0", 33000, 25, false, 15000),
  new Upgrades("Robot Barista Intern", 80000, 50, false, 55000),
];

/* to mesure the time that has passed since the tab was opened in a browser 
  () => {
    let elapsedTime = Date.now() - startTime;
    let elapsedSeconds = Math.floor(elapsedTime / 1000);
    console.log(`Elapsed time ${elapsedSeconds} seconds`); //just to check the logic won't be shown in final game
  },
  1000 // updates every second
); */

/* save the time spent in the game even when user closes the tap / the browser or restarts computer */
let savedStartTime = localStorage.getItem("startTime");
/*first time playing - no startTime saved*/
if (savedStartTime != null) {
  savedStartTime = Date.now();
  localStorage.setItem("startTime", savedStartTime);
}

function updateTimer() {
  let elapsed = Date.now() - savedStartTime;
  let seconds = Math.floor(elapsed / 1000);
  console.log(`Elapsed : ${seconds} seconds`);
}

setInterval(updateTimer, 1000);

/* funtion to buy upgrades */
function buyUpgrades(name) {
  let checkItemInList = ListOfUpgrades.find((x) => x.name === name); // looks if the item is in the list
  if (!checkItemInList) return; // if the item is not in the list stops the function

  playerScore -= checkItemInList.price; // substracrs the price of the upgrade from the playerScore
  checkItemInList.owned += 1;

  if (checkItemInList.isClick) {
    bonusGainPerClick + checkItemInList.output;
  } else {
    totalClickperSecond + checkItemInList.output;
  }
}
