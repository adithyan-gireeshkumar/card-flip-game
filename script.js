const gameIcons = ["😊", "😎", "🤩", "😇", "🥳", "🤯", "😴", "🤔", "😈", "👹"];
const cardContainer = document.querySelector(".card-container");
const mismatchDelay = 800;

const gameState = {
    cards: [],
    firstCard: null,
    secondCard: null,
    isChecking: false,
};

const shuffle = (items) => {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledItems[index], shuffledItems[randomIndex]] = [
            shuffledItems[randomIndex],
            shuffledItems[index],
        ];
    }

    return shuffledItems;
};

const createCard = (icon, position) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `Flip card ${position + 1}`);
    card.setAttribute("aria-pressed", "false");
    card.dataset.position = String(position);

    const front = document.createElement("span");
    front.className = "card-front";
    front.setAttribute("aria-hidden", "true");

    const back = document.createElement("span");
    back.className = "card-back";
    back.textContent = icon;
    back.setAttribute("aria-hidden", "true");

    card.append(front, back);
    card.addEventListener("click", () => handleCardClick(card));

    return { card, icon, isMatched: false };
};

const setCardFlipped = (card, isFlipped) => {
    card.classList.toggle("is-flipped", isFlipped);
    card.setAttribute("aria-pressed", String(isFlipped));
};

const resetTurn = () => {
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.isChecking = false;
};

const finishTurn = () => {
    const { firstCard, secondCard } = gameState;

    if (!firstCard || !secondCard) {
        return;
    }

    const isMatch = firstCard.icon === secondCard.icon;

    if (isMatch) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        firstCard.card.classList.add("is-matched");
        secondCard.card.classList.add("is-matched");
        firstCard.card.disabled = true;
        secondCard.card.disabled = true;
        firstCard.card.setAttribute("aria-label", "Matched card");
        secondCard.card.setAttribute("aria-label", "Matched card");
        resetTurn();
        return;
    }

    window.setTimeout(() => {
        setCardFlipped(firstCard.card, false);
        setCardFlipped(secondCard.card, false);
        resetTurn();
    }, mismatchDelay);
};

function handleCardClick(cardElement) {
    if (gameState.isChecking) {
        return;
    }

    const selectedCard = gameState.cards.find(
        ({ card }) => card === cardElement,
    );

    if (
        !selectedCard ||
        selectedCard.isMatched ||
        selectedCard === gameState.firstCard
    ) {
        return;
    }

    setCardFlipped(cardElement, true);

    if (!gameState.firstCard) {
        gameState.firstCard = selectedCard;
        return;
    }

    gameState.secondCard = selectedCard;
    gameState.isChecking = true;
    finishTurn();
}

const startGame = () => {
    const shuffledIcons = shuffle([...gameIcons, ...gameIcons]);

    gameState.cards = shuffledIcons.map(createCard);
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.isChecking = false;

    cardContainer.replaceChildren(
        ...gameState.cards.map(({ card }) => card),
    );
};

startGame();
