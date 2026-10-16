const gameIcons = ["😊", "😎", "🤩", "😇", "🥳", "🤯", "😴", "🤔", "😈", "👹"];
const cardContainer = document.querySelector(".card-container");

gameIcons.forEach((icon, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `Flip card ${index + 1}`);

    const front = document.createElement("span");
    front.className = "card-front";
    front.setAttribute("aria-hidden", "true");

    const back = document.createElement("span");
    back.className = "card-back";
    back.textContent = icon;
    back.setAttribute("aria-hidden", "true");

    card.append(front, back);
    card.addEventListener("click", () => {
        const isFlipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", String(isFlipped));
    });

    cardContainer.append(card);
});

const startGame = () => {
    const duplicateGameIcons = gameIcons.concat(gameIcons);
    const [pieces, setPieces] = React.useState([]);
    const newGameIcons = [];

    while(newGameIcons.length < GameIcons.length*2) {
        const randomIndex = Math.floor(Math.random()*duplicateGameIcons.length);
        newGameIcons.push(
            emoji:duplicateGameIcons[randomIndex],
            flipped: false,
            solved: false,
            position: newGameIcons.length,
        );
    }



        setPieces(newGameIcons);
    
}