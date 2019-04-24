# QUICKPIC App

> **Note:** Parceque faire une App c'est bien mais faire **un Jeu** c'est mieux.

## Présentation

Le but de ce projet est de créer un Jeu Mobile de Rapidité et de compétition ou l'on doit prendre en Photo IRL les mots annoncées le plus rapidement possible pour gagné des points

Ce projet est composé de deux parties le FRONT et le [BACK](https://github.com/aawfrancois/QuickPic_back/)
Vous retrouvez içi l'Application mobile à savoir le FRONT

## Features

- [x] Cross-platform
- [x] SignIn | SignUp | Login
- [x] Profil - CRUD
- [x] Auto-SignIn
- [x] LocalStorage
- [x] Partie Tout les X temps
- [x] Un Classement Mondial
- [x] Prendre en photo
- [x] Stockage Image Sur AWS - S3
- [x] Reconnaissance D'image avec l'API : [Imagga](https://imagga.com/)
- [x] Un Historique des Parties
- [ ] Didacticiel
- [ ] Son quand tu gagnes des Points
- [ ] Rajouter Des Items | Bonus

## Détails des Fonctionnalitées

### Des Parties En Cours & à venir

Tu peux faire les Parties en Cours & visualiser le thème des prochaines parties pour te tenir informer

- Un timer pour savoir quand la partie se finit
- Un timer pour savoir quand la partie commence

### Fonctionement d'une Partie

Un mot Apparait c'est simple prends le en photo dans la vie réel le plus rapidement possible

- Bien que la rapidité compte pour gagner des points
- La qualité de l'image est essentiel pour reconnaitre si l'image correspond au mot alors applique toi ;)

### Stockage sur S3

Tout est dit, nous stockons les images sur S3 l'annalyse et garder un historique alors ne poste pas n'importe quoi 😏

### Recconnaissance D'image

- Afin de reconnaitre si ton objet corresponds au mot nous utilisons une API externe [Imagga](https://imagga.com/) qui s'occupe de traiter l'image et de nous renvoyer les correspondances
- Je tiens d'ailleurs à les remercier d'avoir soutenu ce projet !

### Alert

- Un suivie par alert lors pour que tu ne sois pas trop perdu pour ta première parti :)
- Te préviens quand tu gagnes des Points

### AsyncStorage

- Je pense que vous avez compris le principe après sa première utilisation si tu as lancé l'app donc pas besoin de se répéter :P
- Evite de te connecter à chaque fois
  > Simple mais très pratique !! 😄
- Stocke les infos du player Pour éviter les Appels à L'API trop souvent

## Exécution

Ce projet est créer en React Native pour l'installer / le lancer merci de suivre les étapes suivantes :

### Create a file Private const.js

Ce fichier contiendra vos accès privée au service S3 Aws et pour utiliser l'api Immaga de reconnaissance d'image

il ira donc dans le dossier utils :

```js
-- utils/
	|-- const.js
```

```js
// Key OPTION FOR CONNECT ON AWS
export const OPTIONS_AWS = {
  keyPrefix: "DossierDesFuturesImage/",
  bucket: "nameOfBucket",
  region: "us-east-1",
  accessKey: "<accessKey>",
  secretKey: "<secretKey>",
  successActionStatus: 201
};

// KEY ACCESS FOR IMMAGA API
export const KEY_IMMAGA = "Basic  SECRET_KEY ";
```

<kbd>npm i</kbd> - Instal Dependencies

<kbd> expo start</kbd> - Run the App

- En savoir plus sur :
- React-Native: ([Create React Native App](https://facebook.github.io/react-native/)).
- Expo : [For Run the App](https://expo.io/learn)

ENJOY 🙂

## Team

- [Antoine françois](https://github.com/aawfrancois)
- [Thomas Pelfrene](https://github.com/Thomas-Pelfrene/)
- [Jeremy Noh](https://github.com/JeremyNoh)

Merci à vous
