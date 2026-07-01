# 🚀 Déploiement rapide sur Vercel

Guide complet en 10 minutes pour faire passer votre app en production.

---

## ✅ Pré-requis

- ✓ Compte GitHub (gratuit sur github.com)
- ✓ Compte Vercel (gratuit sur vercel.com)
- ✓ Google Sheet configuré avec 5 onglets
- ✓ Compte de service Google créé et partagé
- ✓ Variables d'environnement prêtes

---

## 📋 Étapes de déploiement

### **ÉTAPE 1 : Créer un repo GitHub (5 minutes)**

#### A) Sur GitHub.com
1. Connectez-vous à votre compte GitHub
2. Cliquez sur **+** (en haut à droite) > New repository
3. Remplissez :
   - **Repository name** : `syndicat-messages-app`
   - **Description** : "Boîte de messages pour le syndicat local"
   - Sélectionnez **Public** (pour que Vercel puisse le voir)
4. Cliquez **Create repository**

#### B) Sur votre ordinateur
```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Remplacez USERNAME par votre nom GitHub
git remote add origin https://github.com/USERNAME/syndicat-messages-app.git
git push -u origin main
```

---

### **ÉTAPE 2 : Connecter Vercel à GitHub (5 minutes)**

#### A) Sur Vercel.com
1. Connectez-vous à [vercel.com](https://vercel.com)
2. Cliquez sur **Add New** > **Project**
3. Cliquez sur **Import Git Repository**
4. Autorisez Vercel d'accéder à GitHub
5. Cherchez et sélectionnez `syndicat-messages-app`
6. Cliquez **Import**

#### B) Configurer les variables d'environnement
1. La page "Configure Project" s'affiche
2. Cliquez sur **Environment Variables**
3. Ajoutez les deux variables :

```
Nom: GOOGLE_SHEET_ID
Valeur: 1-5aee7zMGkIbIn9P3PkozWCZvHgj9kdFAAe5CCyYJ7s

Nom: GOOGLE_SERVICE_ACCOUNT_KEY
Valeur: {"type":"service_account","project_id":"...","..."}
```

⚠️ **IMPORTANT** : La clé doit être sur **UNE SEULE LIGNE**, sans sauts.

4. Cliquez **Deploy**

---

### **ÉTAPE 3 : Vérifier le déploiement (1 minute)**

1. Vercel affiche une page avec l'URL de votre app
2. L'URL ressemble à : `https://syndicat-messages-app.vercel.app`
3. Cliquez sur le lien ou attendez quelques secondes
4. Vous devriez voir la page d'accueil ✅

---

### **ÉTAPE 4 : Configurer les emails (Google Apps Script)**

#### A) Ouvrir Apps Script
1. Allez sur votre Google Sheet
2. Extensions > Apps Script
3. Une onglet s'ouvre

#### B) Copier-coller le code
1. Supprimez tout le code existant
2. Collez le contenu du fichier `email-notification.gs` du projet
3. **Ligne 7** : Remplacez `bureau@syndicat.local` par votre vraie adresse email
4. Sauvegardez (Ctrl+S)

#### C) Exécuter le script
1. Dans le menu, cherchez la fonction `setupEmailTrigger`
2. Cliquez sur ▶️ Exécuter
3. Autorisez l'accès quand demandé
4. Un message "✅ Trigger configuré" apparaît

#### D) Tester
1. Appelez la fonction `sendTestEmail`
2. Vérifiez que vous avez reçu un email ✅

---

## 🧪 Test complet

### Test 1 : Formulaire et message
1. Allez sur votre URL Vercel
2. Remplissez le formulaire
3. Cliquez "Envoyer le message"
4. Vous devriez voir un numéro de ticket ✅
5. Vérifiez votre email (bureau@...) pour la notification ✅

### Test 2 : Suivi du message
1. Copiez le numéro de ticket
2. Allez à la section "🔍 Suivi de votre message"
3. Entrez le ticket
4. Vérifiez que le statut est "Reçu" ✅

### Test 3 : Modifier le statut
1. Ouvrez votre Google Sheet, onglet "Messages"
2. Trouvez le message que vous venez d'envoyer
3. Colonne "Statut traitement" : changez à "Traité"
4. Retournez sur Vercel
5. Re-vérifiez le ticket → doit afficher "Traité" ✅

---

## 🔗 Partager l'app aux adhérents

Une fois vérifiée, partagez l'URL :

```
https://votre-domaine.vercel.app
```

Vous pouvez aussi :
- Personnaliser le domaine dans Vercel Settings > Domains
- Ajouter un certificat SSL (gratuit par défaut)

---

## 📊 Monitoring

### Vérifier les logs
1. Allez sur Vercel Dashboard
2. Cliquez sur votre projet
3. Allez à **Functions** pour voir les logs des APIs

### Vérifier les erreurs
- Si quelque chose ne marche pas, les logs Vercel vont vous dire pourquoi
- Vérifiez aussi les variables d'environnement

---

## 🔄 Mettre à jour l'app

Chaque fois que vous pushez du code sur GitHub :
```bash
git add .
git commit -m "Votre message"
git push origin main
```

Vercel redéploiera automatiquement en 2-3 minutes.

---

## ⚠️ Troubleshooting

### "Impossible de charger les actualités"
→ Vérifiez que le Google Sheet a un onglet "Actualités" avec des données

### "Erreur lors de l'enregistrement du message"
→ Vérifiez les variables d'environnement Vercel (Settings > Environment Variables)

### "Les emails ne sont pas reçus"
→ Vérifiez le code Apps Script, testez avec `sendTestEmail()`

### "Le formulaire ne s'affiche pas"
→ Vérifiez qu'il n'y a pas d'erreur JavaScript (F12 > Console)

---

## 🎉 Vous avez fini !

Votre application est en ligne et prête à recevoir des messages du syndicat ! 

**Partagez le lien à vos adhérents et c'est parti ! 🚀**
