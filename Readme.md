# Tutikone

Bienvenue sur le git de Tutikone ! L'objectif est simple, créer tous ensemble une infinité de jeux de quiz spécialisés !
L'objectif est de créer des ensembles de questions/réponses pour chaque sujet. Les sujets sont chacuns liés à une ou plusieurs catégories. Les catégories sont elles même regroupées par thèmes.
Vous pouvez directement contribuer à la base de donnée sur https://tutikone.onrender.com.


# Le fonctionnement 

Voici une liste de principes qui peuvent évoluer :

1. Seuls les sujets ont des auteurs.
2. Les formules sont écrites en latex. (l'interface actuelle ne l'interprete pas encore)
3. Il est conseillé d'indiquer les sources qui justifient la réponse à une question, surtout si vous êtes l'auteur de la question. (souvent la page wikipedia du sujet suffit)

# Architecture Logicielle

Tutikone est composé de 3 services : 
- Une base de donnée postgresSQL
- Un serveur express.js pour le backend (elle fait le lien entre l'interface et la base de donnée)
- Une interface web react pour le frontend

## Architecture de la base donnée

L'architecture de la base de donnée est détaillée dans la section documentation.


 # How to Launch for developpers

1. cloner le git sur votre ordinateur avec 

    ```git clone https://github.com/RobinMenestret/Tutikone.git```

## Lancer le backend

1. Se rendre dans le repertoire "backend" (cd .\backend)
2. Installer les dépendances : ```npm install``` 
3. Lancer la commande : ```npm run dev```

## Lancer le frontend

1. Se rendre dans le repertoire "frontend" (cd .\frontend)
2.2. Installer les dépendances : ```npm install``` 
3. Lancer la commande : ```npm run dev```
4. Se rendre sur localhost:5173/ sur votre navigateur.

## Communication avec la base de donnée

Pour avoir accès à la base de donnée, il est necessaire d'avoir les privilèges, il est en revanche possible de créer sa propre base de donnée local pour faire ses tests et de créer une base de donnée locale.
Une fois créée, il est nécessaire de donner l'accès à l'application à des variable d'environnement via un .env contenant les informations suivantes (n'oubliez pas d'enlever les parenthèses notamment pour les lignes qui peuvent être directement copiées):

1. pour le frontend :

* REACT_APP_CLIENT_GOOGLE= **ID CLIENT de votre compte googleAuth** (necessaire si vous voulez faire des tests sur l'authentification google)
* REACT_APP_REDIRECT_GOOGLE=http://localhost:5173/callback (adresse de redirection à donner à google auth) (necessaire si vous voulez faire des tests sur l'authentification google)
* REACT_APP_API_URL=http://localhost:4000 (adresse du backend)

2. pour le backend : 

* PORT=4000
* DATABASE_URL= **URL POSTGRES**
* JWT_SECRET= **TOKEN D AUTHENTIFICATION VIA JWT**
* SENDGRID_API_KEY= **CLE d API** (pour la validation du mail)
* EMAIL_FROM= **MAIL D EXPEDITION** 
* BASE_URL=http://localhost:4000 (adresse du backend)
* POSTGRES_MDP= **MOT DE PASSE DE LA BASE DE DONNEE LOCALE**
* CLIENT_ID= **ID CLIENT de votre compte googleAuth** (necessaire si vous voulez faire des tests sur * l'authentification google)
* CLIENT_SECRET= **SECRET CLIENT de votre compte googleAuth** (necessaire si vous voulez faire des tests sur l'authentification google)
* REDIRECT_URI=http://localhost:5173/callback (adresse de callback du frontend)
* FRONTEND_URL=http://localhost:5173 (adresse du front)