# BlackJack - Jeu en CLI

## Description

Ce projet est un jeu de BlackJack en ligne de commande (CLI) développé en TypeScript. Il simule une partie de BlackJack classique contre un croupier, où le joueur peut choisir entre tirer une carte, doubler la mise ou rester. Le jeu comprend des règles de pari, la gestion des gains et des pertes.

## Prérequis

Assurez-vous d'avoir **Node.js** installé sur votre machine.

## Installation

Clonez le dépôt, puis installez les dépendances nécessaires en utilisant :

```bash
npm install
```

## Lancer le projet

### Étape 1 : Compiler le projet

Avant de lancer le jeu, compilez le code TypeScript en JavaScript en exécutant la commande suivante :

```bash
npx tsc
```

Si vous rencontrez une erreur, essayez la commande suivante pour modifier temporairement les permissions d'exécution :

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Puis, relancez la commande :

```bash
npx tsc
```

### Étape 2 : Lancer le projet

Une fois le projet compilé, vous pouvez lancer le jeu.

```bash
node dist/index.js
```

## Règles du jeu

### BlackJack Classique

Le but du jeu est de s'approcher le plus possible de 21 (sans le dépasser) en cumulant les valeurs des cartes tirées. Les têtes valent 10, et l'As prend une valeur de 11 mais peut être réduit à 1 si le total dépasse 21.

- Le joueur et le croupier tentent d'atteindre 21 sans le dépasser.
- Si le joueur dépasse 21, la partie est perdue.
- Si le joueur reste en dessous de 21 et que le croupier dépasse 21, la partie est gagnée.
- Si le joueur fait égalité avec le croupier sans dépasser 21, la mise est récupérée.
- Si le joueur fait plus que le croupier, il gagne 2x sa mise.
- Si le joueur fait un BlackJack (As + une carte valant 10), il gagne 2.5x sa mise.

Exemple pour l'As : Si le joueur a un As et un 4, son total est de 15. S'il tire un 8, le total devient 23, et l'As passe à une valeur de 1, ramenant le total à 13.

Lors d'une partie de blackjack, le joueur tire 2 carte et le croupier 1 seule
Le joueur a alors le choix entre 3 options :

- hit : tirer une nouvelle carte qui viendra s'ajouter aux précédentes, il pourra en tirer d'autres s'il le souhaite
- stand : ne rien faire et laisser la main au croupier
- double : doubler sa mise et tirer une seule carte, laissant ensuite la main au croupier

Lorsque c'est le tour du croupier, celui-ci tire des cartes jusqu'à avoir au moins 17, après il s'arrête.

## Tests

Les tests unitaires sont à effectuer dans le fichier `blackjackGame.test.ts`.

### Exécution des tests

- Utilisez la fonction `expect()` pour effectuer les vérifications.
- La méthode `jest.spyOn` peut être utilisée pour surveiller le comportement d'une fonction spécifique.
- Utilisez `.mockImplementation` si vous avez besoin de forcer une fonction à prendre des valeurs spécifiques pour vos tests.
- Utilisez `.mockReturnValue` si vous avez besoin de forcer une fonction à retourner des valeurs spécifiques pour vos tests.

Pour lancer les tests, utilisez la commande suivante :

```bash
npm run test
```
