# Mini-programme WeChat Clarins

Simulateur de mini-programme WeChat pour Clarins, permettant de visualiser les fonctionnalités de scan QR code et d'authentification de produits.

## Fonctionnalités

- Navigation entre différents onglets
- Scan de QR code
- Affichage de détails de produits
- Authentification de produits

## Installation locale

```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Le serveur sera accessible à l'adresse http://localhost:3001

## Déploiement sur Render

1. Créez un compte sur [Render](https://render.com/)
2. Connectez votre compte GitHub ou importez directement ce dépôt
3. Créez un nouveau service Web
4. Configurez le service avec les paramètres suivants :
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Cliquez sur "Create Web Service"

L'application sera automatiquement déployée et accessible via l'URL fournie par Render.
