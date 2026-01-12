
const { ICONS } = require("./icons");

const shuffle = (array)=>{
    let currentIndex = array.length, randomIndex;

    while(currentIndex !== 0 ){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const generateCards = (size)=>{
    const numPairs= (size * size) /2;
    const iconsToMatch = ICONS.slice(0, numPairs);

    const cardPairs = iconsToMatch.flatMap((Icon , index)=>{

        const iconName = index.toString();

        const card = {      
            icon: Icon, iconName
        };
        return [
            {...card, id: `${iconName}-1`},
            {...card, id: `${iconName}-2`},
        ];
});

const shuffledCards = shuffle(cardPairs);

return shuffledCards.map((card)=>({
    ...card,
    isFlipped: false,
    isMatched: false,
}));

}

export {generateCards};