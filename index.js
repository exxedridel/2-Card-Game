let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
            }
        })
})

/**
 * Challenge:
 * 
 * Keep score! Every time the computer wins a hand, add a point to
 * the computer's score. Do the same for every time you win a hand.
 * If it's a war, no points are awarded to either player. If it's 
 * a war (same card values), no one is awarded points.
 * 
 * Display the computer's score above the top card, display your
 * own score BELOW the bottom card.
 * 
 * Track the scores in a global variable defined at the top of this file
 * 
 * Add to the global scores inside the `determineCardWinner` function below.
 */

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}

/* --------------------------------------------Exercises--------------------------------------------- */

// function callback() {
//     console.log("I finally ran!")
// }
// setTimeout(callback, 2000)

/**
 * Challenge: .filter()
 * Part 1: Given the array of objects below, create a new array with the `.filter()` array method that contains only the objects where "hasPet" is true
 * Part 2: Move the anonymous in-line function to its own, named function
 */
const people = [
  { name: "Jack", hasPet: true, age: 12 },
  { name: "Jill", hasPet: false, age: 18 },
  { name: "Alice", hasPet: true, age: 22 },
  { name: "Bob", hasPet: false, age: 32 },
];

// function gimmeThePets(loQueSea) {
//   return loQueSea.hasPet; // condition that want to filter (can be ex. loQueSea.age >= 18)
// }

// const peopleWithPets = people.filter(gimmeThePets);
// console.log(peopleWithPets);

// https://www.javascripttutorial.net/javascript-array-filter

/**
 * 2.1 Challenge: Use your own made filter array method!
 * Given the above `people` array, return a new array with only people that have the age of majority
 * Note: Remember that your callback function will be given the individual item in the array for a parameter
 */

function filterArray(array, callback) {
  const resultingArray = [];
  // Filtering logic here
  for (let item of array) {
    const shouldBeIncluded = callback(item);
    if (shouldBeIncluded) {
      resultingArray.push(item);
    }
  }
  return resultingArray;
}

const peopleWithMajority = filterArray(people, function (person) {
  return person.age >= 18;
});
console.log(peopleWithMajority);

// 3. Given the array below, chain the `.filter` and `.map` array methods together to turn the array into
// an array of string email addresses of only the people in the array who voted. Log the array of email
// addresses to the console

const voters = [
  { name: "Joe", email: "joe@joe.com", voted: true },
  { name: "Jane", email: "jane@jane.com", voted: true },
  { name: "Bo", email: "bo@bo.com", voted: false },
  { name: "Bane", email: "bane@bane.com", voted: false },
];
// Write your code below
const finalResult = voters
  .filter((voter) => voter.voted)
  .map((voter) => voter.email);

console.log(finalResult);
// Final result: ["joe@joe.com", "jane@jane.com"]

/**
 * 4. Challenge:
 * pass the string "World" down to a 3rd .then() block
 * and log it to the console inside the body of this new
 * 3rd .then() block
 */
fetch("https://apis.scrimba.com/bored/api/activity")
  .then(function (res) {
    return res;
  })
  .then(function (whatever) {
    console.log(whatever);
    return "World";
  })
  .then(function (another) {
    console.log(another);
  });
