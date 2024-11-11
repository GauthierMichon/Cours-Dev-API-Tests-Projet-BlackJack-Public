import { Card } from "./card";

export class Player {
  hand: Card[] = [];

  constructor(public name: string) {}

  addCard(card: Card): void {
    this.hand.push(card);
  }

  getHandValue(): number {
    let value = 0;
    let aceCount = 0;

    for (const card of this.hand) {
      value += card.getValue();
      if (card.value === "A") aceCount++;
    }

    // Ajustement si l'As fait dépasser 21
    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount--;
    }

    return value;
  }

  showHand(): void {
    console.log(
      `${this.name}'s hand:`,
      this.hand.map((card) => card.toString()).join(", ")
    );
    console.log(`${this.name}'s hand value:`, this.getHandValue());
  }
}
