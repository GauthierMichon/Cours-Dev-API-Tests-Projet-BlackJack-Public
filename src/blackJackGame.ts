import { Deck } from "./deck";
import { Player } from "./player";
import * as readlineSync from "readline-sync";

export class BlackjackGame {
  deck: Deck;
  dealer: Player;
  player: Player;
  playerBankroll: number;
  playerBet: number;

  constructor(playerName: string, initialBankroll: number) {
    this.deck = new Deck();
    this.dealer = new Player("Dealer");
    this.player = new Player(playerName);
    this.playerBankroll = initialBankroll;
    this.playerBet = 0;
  }

  startGame(): void {
    if (this.playerBankroll <= 0) {
      console.log("Vous avez atteint 0. La partie est terminée.");
      return;
    }

    // Afficher la bankroll du joueur
    console.log(`Votre bankroll est de: ${this.playerBankroll}`);

    // Demander la mise du joueur
    do {
      this.playerBet = parseFloat(readlineSync.question("Placer votre mise: "));
      if (this.playerBet > this.playerBankroll) {
        console.log("Vous ne pouvez pas parier plus que votre bankroll.");
      } else if (this.playerBet <= 0) {
        console.log("Vous ne pouvez pas parier une somme négative ou nulle.");
      }
    } while (
      this.playerBet > this.playerBankroll ||
      isNaN(this.playerBet) ||
      this.playerBet <= 0
    );

    // Déduire la mise de la bankroll
    this.playerBankroll -= this.playerBet;

    // Distribuer deux cartes au joueur et une au croupier
    this.player.addCard(this.deck.drawCard());
    this.player.addCard(this.deck.drawCard());

    this.dealer.addCard(this.deck.drawCard());

    console.log("Game Started!");
    this.player.showHand();
    this.dealer.showHand();
  }

  getPlayerAction(): string {
    return readlineSync.question("> ").toLowerCase();
  }

  playerTurn(action: string | null = null): void {
    while (this.player.getHandValue() < 21) {
      // Demander une action valide jusqu'à ce que l'utilisateur entre une action correcte
      while (action !== "hit" && action !== "stand" && action !== "double") {
        console.log("What do you want to do? (hit/stand/double)");
        action = this.getPlayerAction();
      }

      // Gérer les différentes actions
      if (action === "hit") {
        // Si le joueur choisit de tirer une carte
        this.player.addCard(this.deck.drawCard());
        this.player.showHand();

        action = null;

        // Si après avoir tiré une carte, le joueur dépasse 21, il est "busted"
        if (this.player.getHandValue() >= 21) {
          break; // Sortir de la boucle si le joueur dépasse 21
        }
      } else if (action === "double") {
        // Si le joueur veut doubler sa mise
        if (this.playerBet > this.playerBankroll) {
          console.log("Vous ne pouvez pas doubler, bankroll insuffisante.");
          action = null;
        } else {
          this.doubleDown();
          break; // Le joueur ne peut plus tirer de carte après avoir doublé
        }
      } else if (action === "stand") {
        // Si le joueur décide de rester (stand), on sort de la boucle
        break;
      } else {
        // Si l'action est invalide, demander à nouveau une action
        console.log(
          "Action invalide, veuillez entrer 'hit', 'stand', ou 'double'."
        );
      }
    }
  }

  doubleDown(): void {
    console.log("You chose to double down!");

    this.playerBankroll -= this.playerBet; // Retirer la deuxième moitié de la mise
    this.playerBet *= 2;
    console.log(`Your bet is now doubled to: ${this.playerBet}`);

    this.player.addCard(this.deck.drawCard());
    this.player.showHand();
  }

  dealerTurn(): void {
    while (this.dealer.getHandValue() < 17) {
      this.dealer.addCard(this.deck.drawCard());
    }
    this.dealer.showHand();
  }

  checkWinner(): void {
    const playerValue = this.player.getHandValue();
    const dealerValue = this.dealer.getHandValue();

    if (playerValue > 21) {
      console.log("Player busted! Dealer wins.");
    } else if (dealerValue > 21) {
      console.log("Dealer busted! Player wins.");
    } else if (playerValue > dealerValue) {
      console.log("Player wins!");
    } else if (playerValue < dealerValue) {
      console.log("Dealer wins!");
    } else {
      console.log("It's a tie!");
    }

    // Mise à jour de la bankroll
    if (playerValue > 21 || (dealerValue <= 21 && dealerValue > playerValue)) {
      console.log(`You lost your bet of ${this.playerBet}.`);
    } else if (dealerValue > 21 || playerValue > dealerValue) {
      console.log(`You won! Your winnings are: ${this.playerBet * 2}`);
      this.playerBankroll += this.playerBet * 2;
    } else {
      console.log("It's a tie! You get your bet back.");
      this.playerBankroll += this.playerBet;
    }

    console.log(`Votre bankroll actuelle est de: ${this.playerBankroll}`);

    if (this.playerBankroll <= 0) {
      console.log("Vous avez atteint 0. La partie est terminée.");
    }
  }

  play(): void {
    // Boucle tant que le joueur a de l'argent et souhaite continuer
    while (this.playerBankroll > 0) {
      this.startGame();

      if (this.playerBankroll <= 0) break; // Fin du jeu si bankroll épuisée

      this.playerTurn();
      this.dealerTurn();
      this.checkWinner();

      // Demander si le joueur souhaite continuer si sa bankroll le permet
      if (this.playerBankroll > 0) {
        const continuePlaying = readlineSync
          .question("Voulez-vous rejouer ? (yes/no): ")
          .toLowerCase();

        if (continuePlaying !== "yes") {
          console.log(
            "Merci d'avoir joué! Votre bankroll finale est de: " +
              this.playerBankroll
          );
          break;
        }
      }

      // Réinitialiser la main pour la prochaine manche
      this.player.hand = [];
      this.dealer.hand = [];
      this.deck = new Deck(); // Recréer un deck pour éviter de manquer de cartes
    }
  }
}
