#!/bin/bash
# 🚀 Script de déploiement GitHub pour Syndicat-autonome80
# Copie-colle ces commandes dans votre terminal

# Assurez-vous d'être dans le dossier du projet
cd syndicat-messages-app

# Initialiser le repo Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit : Boîte du Syndicat v1.0"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (l'URL du repo GitHub)
git remote add origin https://github.com/croisetmickael/Syndicat-autonome80.git

# Pousser le code sur GitHub
git push -u origin main

# ✅ Terminé ! Votre code est sur GitHub

echo "✅ Code poussé sur GitHub !"
echo "Repo : https://github.com/croisetmickael/Syndicat-autonome80"
echo ""
echo "Prochaines étapes :"
echo "1. Allez sur Vercel (vercel.com)"
echo "2. Créez un nouveau projet"
echo "3. Importez le repo GitHub"
echo "4. Configurez les variables d'environnement"
echo "5. Cliquez Deploy !"
