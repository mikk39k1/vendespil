"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Card = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {

    let initialCards: Card[] = [];
    for (let i = 0; i < 8; i++) {
      initialCards.push({ id: i * 2, value: i, isFlipped: false, isMatched: false });
      initialCards.push({ id: i * 2 + 1, value: i, isFlipped: false, isMatched: false });
    }
    initialCards = initialCards.sort(() => Math.random() - 0.5);
    setCards(initialCards);
  };


  const handleCardClick = (card: Card) => {
    if (flippedCards.length < 2 && !card.isFlipped) {
      const newFlippedCards = [...flippedCards, { ...card, isFlipped: true }];
      setFlippedCards(newFlippedCards);
      const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
      setCards(newCards);

      if (newFlippedCards.length === 2) {
        checkForMatch(newFlippedCards);
      }
    }
  };


  const checkForMatch = (flippedCards: Card[]) => {
    setTimeout(() => {
      let newCards: Card[];
      if (flippedCards[0].value === flippedCards[1].value) {
        newCards = cards.map(card =>
          flippedCards.find(fCard => fCard.id === card.id) ? { ...card, isMatched: true } : card
        );
      } else {
        newCards = cards.map(card =>
          flippedCards.find(fCard => fCard.id === card.id) ? { ...card, isFlipped: false } : card
        );
      }
      setCards(newCards);
      setFlippedCards([]);
    }, 1000);
  };



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`h-24 w-24 bg-blue-500 flex justify-center items-center rounded-md cursor-pointer ${card.isFlipped || card.isMatched ? 'bg-green-500' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? card.value : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
