# Étape 1 : Utiliser une image de base avec Node.js pour construire l'application
FROM node:20 as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Utiliser une image de base légère pour exécuter l'application
FROM nginx:alpine

# Copier les fichiers de l'application construite à partir de l'étape précédente dans le répertoire de contenu de Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Exposer le port 80 pour que l'application soit accessible
EXPOSE 80

# Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
