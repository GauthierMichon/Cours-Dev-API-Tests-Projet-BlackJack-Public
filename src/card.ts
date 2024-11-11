export class Card {
  constructor(public suit: string, public value: string) {}

  getValue(): number {
    if (this.value === "A") return 11;
    if (["K", "Q", "J"].includes(this.value)) return 10;
    return parseInt(this.value);
  }

  toString(): string {
    return `${this.value} of ${this.suit}`;
  }
}
