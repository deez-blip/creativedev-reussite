let cards = document.querySelectorAll('.card')
// console.log(cards[1])
let cardList = [];

// Ajouter les as
cardList.push('As coeur', 'As carreaux', 'As pique', 'As trefle');

// Ajouter les rois
cardList.push('Roi coeur', 'Roi carreaux', 'Roi pique', 'Roi trfle');

// Ajouter les dames
cardList.push('Dame coeur', 'Dame carreaux', 'Dame pique', 'Dame trfle');

// Ajouter les valets
cardList.push('Valet coeur', 'Valet carreaux', 'Valet pique', 'Valet trefle');

let currentShowed = 0
let showedCard = []
let firstCardTake = true
let haveCard = false
const listeners = [];

cards.forEach(card => {
    card.addEventListener('click', function(){
        // if(currentShowed == 2){
        //     showedCard.splice(0, showedCard.length)
        //     setTimeout(resetHidden, 2000);
        // }
        // text.classList.remove("hidden")
        // showedCard.push(text)
        // currentShowed++
        // console.log(showedCard)
        if(firstCardTake){
            haveCard = true
            let text = card.querySelector('p')
            let cardPreview = document.querySelector('.showedCard')
            cardPreview.classList.add('cardPreview')
            cardPreview = cardPreview.querySelector('p')
            cardPreview.textContent = text.textContent

            if(firstCardTake){
                card.classList.remove('card')
                firstCardTake = false
            }
            let className = text.textContent;
            whereToPlay(className, cardPreview)
        }else{
            let cardPreview = document.querySelector('.showedCard')
            cardPreview = cardPreview.querySelector('p')
            whereToPlay(cardPreview.textContent, cardPreview)
            haveCard = true
        }
    })
});

function whereToPlay(className, cardPreview){
    let totalWords = className;
    let firstWord = totalWords.replace(/ .*/,'');
    // console.log('totalwords', totalWords)
    // console.log('first', totalWords.replace(/ .*/,''))

    cards.forEach(card => {
        //console.log(card.className.includes(firstWord))
        if(card.className.includes(firstWord)){
            console.log('init')
            card.classList.add('border')

            createCardClickListener(card,cardPreview, cards)
        }
    })
}

function createCardClickListener(card, cardPreview, cards){
    function cardColListener(){
        if(haveCard){
            haveCard = false
            // console.log('cardpreviex: ',cardPreview)
            // console.log('juste card: ',card)
            let newTextValue = cardPreview.textContent
            let oldTextValue = card.textContent
            
            cardPreview.textContent = oldTextValue.trim()
            card.textContent = newTextValue.trim()
            card.classList.remove('hidden')
    
            className = oldTextValue.trim()
            resetBorder()
            // // console.log(card)
            listeners.forEach(listener => {
                cards.forEach(card => {
                  card.removeEventListener('click', listener);
                });
              });
            whereToPlay(className,cardPreview)
        }
    }

    function clickHandlerRemove() {
        cardColListener();
      }

    // ajouter l'eventListener à l'élément de carte
    card.addEventListener('click', clickHandlerRemove);

    // ajouter l'eventListener à l'élément de carte
    const listener = clickHandlerRemove;
    card.addEventListener('click', listener);
    listeners.push(listener);
}

function resetHidden(){
    cards.forEach(card => {
        let text = card.querySelector('p')
        text.classList.add("hidden")
        currentShowed = 0
    })
}

function resetBorder(){
    cards.forEach(card => {
        card.classList.remove("border")
    })
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Face caché toutes les cartes + choisis la carte
for(i = 0; i <= 15; i++){
    let rdm = random(0,(cardList.length - 1))
    let card = cards[i].querySelector('p')
    card.textContent = cardList[rdm]
    card.classList.add("hidden")
    cardList.splice(rdm,1)
}

// const onClickFn = function(){
//     // cardColListener(card, cardPreview)
//     console.log(card)
// }

// function cardColListener(card, cardPreview){
//     if(haveCard){
//         haveCard = false
//         console.log('cardpreviex: ',cardPreview.textContent)
//         console.log('juste card: ',card)
//         let newTextValue = cardPreview.textContent
//         let oldTextValue = card.textContent

//         cardPreview.textContent = oldTextValue.trim()
//         card.textContent = newTextValue.trim()
//         card.classList.remove('hidden')

//         className = oldTextValue.trim()
//         resetBorder()
//         // // console.log(card)
//         // // card.removeEventListener('click', cardColListener('a','b'))
//         whereToPlay(className,cardPreview)
//         // console.log('fin ------------------------------')
//     }
// }

// function removeListener(){
//     console.log('remove')

// }