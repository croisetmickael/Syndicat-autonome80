# 🚀 QUICK START — Syndicat-autonome80

Vous avez cloné ce repo ? Bienvenue ! Suivez ces 3 étapes pour lancer l'app.

---

## 📋 PRÉ-REQUIS

✅ Node.js (v16+) installé  
✅ Compte Google Cloud (gratuit)  
✅ Compte Vercel (gratuit)  
✅ Google Sheet ID : `1-5aee7zMGkIbIn9P3PkozWCZvHgj9kdFAAe5CCyYJ7s`

---

## ⚡ ÉTAPE 1 : Configuration locale (5 min)

```bash
# Cloner le repo (si pas déjà fait)
git clone https://github.com/croisetmickael/Syndicat-autonome80.git
cd Syndicat-autonome80

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
```

Éditez `.env.local` :
```env
GOOGLE_SHEET_ID=1-5aee7zMGkIbIn9P3PkozWCZvHgj9kdFAAe5CCyYJ7s
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

⚠️ Pour la clé JSON : consultez README.md > "Google Cloud Setup"

---

## ⚡ ÉTAPE 2 : Tester localement (2 min)

```bash
npm start
```

Accédez à http://localhost:3000 — L'app s'affiche ! ✅

---

## ⚡ ÉTAPE 3 : Déployer sur Vercel (5 min)

1. Allez sur [vercel.com](https://vercel.com)
2. New Project → Import Git Repository
3. Sélectionnez **Syndicat-autonome80**
4. Cliquez **Import**
5. Configurez les variables d'environnement :
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_KEY`
6. Cliquez **Deploy**

**Voilà ! Votre app est en ligne ! 🎉**

URL : `https://syndicat-autonome80.vercel.app`

---

## 📚 DOCUMENTATION COMPLÈTE

- **README.md** — Configuration Google Cloud + tout les détails
- **DEPLOYMENT_QUICK_START.md** — Guide déploiement étape par étape
- **PUSH_TO_GITHUB.sh** — Script de push sur GitHub

---

## 🆘 PROBLÈMES ?

**"Erreur npm install"**  
→ Assurez-vous que Node.js est installé (`node --version`)

**"API error en production"**  
→ Vérifiez les variables Vercel Settings > Environment Variables

**"Les emails ne sont pas reçus"**  
→ Configurez Apps Script dans le Google Sheet (voir README.md)

---

## ✅ C'EST PRÊT !

Plus qu'à remplir le Google Sheet avec vos données et partager le lien ! 📬

**Questions ?** Consultez README.md
