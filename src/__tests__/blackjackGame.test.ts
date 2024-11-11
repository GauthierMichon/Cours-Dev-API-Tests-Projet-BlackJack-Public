import { BlackjackGame } from "../blackJackGame"; // Assure-toi que le chemin est correct
import { Card } from "../card";
import { Deck } from "../deck";

describe("BlackjackGame", () => {
  let game: BlackjackGame;

  beforeEach(() => {
    game = new BlackjackGame("Player 1", 500);

    // Mock pour bypass la demande de mise
    jest.spyOn(require("readline-sync"), "question").mockReturnValue("100"); // Par exemple, une mise de 100
  });

  it("Le jeu start correctement", () => {
    // Étant donné un espion sur le console.log
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Quand le jeu commence
    game.startGame();

    // Alors la console affiche "Game Started!"
    expect(consoleSpy).toHaveBeenCalledWith("Game Started!");

    // Nettoyer l'espion
    consoleSpy.mockRestore();
  });

  it("Lorsque le joueur choisi de tirer une carte, la taille de sa main change", () => {
    // Étant donné que le jeu a démarré
    // Et une taille initiale de la main du joueur
    // Et une simulation de l'entrée utilisateur pour 'hit'
    game.startGame();
    let oldHandValue: number = game.player.getHandValue();
    jest.spyOn(require("readline-sync"), "question").mockReturnValue("hit");
    const readlineMock = jest.spyOn(require("readline-sync"), "question");
    readlineMock.mockReturnValueOnce("100");

    // Quand le joueur décide de tirer une carte
    game.playerTurn("hit");

    // Récupération de la nouvelle taille de la main
    let newHandValue: number = game.player.getHandValue();

    // Alors la valeur de la main du joueur doit changer
    expect(oldHandValue).not.toBe(newHandValue);
    readlineMock.mockRestore();
  });

  it("Le joueur ne peut pas parier plus que sa bankroll", () => {});

  it("Le joueur ne peut pas doubler s'il n'a pas assez d'argent", () => {
    // Étant donné une bankroll de 150, et une mise initiale de 100
    game = new BlackjackGame("Player 1", 150);
    const mockDeck = jest.spyOn(Deck.prototype, "drawCard");
    mockDeck
      .mockReturnValueOnce(new Card("Hearts", "10"))
      .mockReturnValueOnce(new Card("Spades", "K"))
      .mockReturnValueOnce(new Card("Diamonds", "5"));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const readlineMock = jest.spyOn(require("readline-sync"), "question");
    readlineMock.mockReturnValueOnce("100"); // Parier 100 sur la première main
    readlineMock.mockReturnValueOnce("double");
    readlineMock.mockReturnValueOnce("stand");

    game.startGame();

    // Simuler que le joueur choisit "double" mais il n'a pas assez pour doubler
    game.playerTurn("double");

    // Alors il ne devrait pas être possible de doubler
    expect(game.playerBankroll).toBe(50);

    // Alors la console affiche "Vous ne pouvez pas doubler, bankroll insuffisante."
    expect(consoleSpy).toHaveBeenCalledWith(
      "Vous ne pouvez pas doubler, bankroll insuffisante."
    );

    // Nettoyer les espions
    consoleSpy.mockRestore();
    readlineMock.mockRestore();
  });

  it("Le joueur ne peut pas parier une somme négative ou invalide", () => {});

  it("Le joueur récupère sa mise en cas d'égalité (push)", () => {});

  it("Le joueur perd s'il dépasse 21 (bust)", () => {});
});
