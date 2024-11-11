import { Card } from "./card";

export class Deck {
  suits: string[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
  values: string[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  cards: Card[] = [];

  constructor() {
    this.generateDeck();
    this.shuffle();
  }

  generateDeck(): void {
    for (const suit of this.suits) {
      for (const value of this.values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle(): void {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  drawCard(): Card {
    return this.cards.pop()!;
  }
}
