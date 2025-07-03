# 🧰 Configurateur 3D - Babylon.js + React

Ce projet est un démonstrateur de configurateur 3D interactif construit avec **React** et **Babylon.js**.

Il permet à l'utilisateur de :
- Changer dynamiquement de modèle 3D (cube ou table)
- Sélectionner une partie du modèle (face ou mesh enfant)
- Appliquer une **couleur** ou une **texture réaliste** (bois ou métal) à la partie sélectionnée

---

## 🚀 Installation

### Étapes (npm requis) :

```bash
git clone ******
cd configurator3d
npm install
npm run dev
```

🎯 Objectif du projet

Le but est de montrer une interface simple, efficace et évolutive pour configurer des modèles 3D dans un navigateur.

Il peut être utilisé comme base pour :

    Un configurateur de meuble

    Une application de démonstration produit

    Une vitrine technique 3D web

🔍 Fonctionnalités

    Modèles dynamiques : chargement d’un cube généré à la main ou d’un modèle .glb (table avec textures).

    Textures appliquées à la volée sur une partie sélectionnée du modèle.

    Support des matériaux Babylon.js : couleurs (Color3) ou textures jpg.

    Sélection contextuelle des parties du modèle (faces pour cube, mesh enfant pour la table).

    Architecture modulaire pour extension facile (ajout d'autres modèles, textures, animations...).

---


🧱 Structure du projet

configurator3d/
├── public/
│   └── textures/               # Images pour bois et métal
├── src/
│   ├── components/
│   │   ├── BabylonCanvas.tsx   # Moteur 3D Babylon + rendu
│   │   └── UIControls.tsx      # Boutons de contrôle
│   ├── scenes/
│   │   ├── CubeScene.ts        # Génération du cube multimatériau
│   │   └── TableScene.ts       # Chargement du fichier .glb
│   └── App.tsx                 # Logique principale React


---

 Textures

Les textures sont stockées dans public/textures/ :

    wood-diffuse_124.jpg

    metal_basecolor.jpg

Tu peux les remplacer par tes propres images (attention à bien garder les chemins).
🔧 Améliorations possibles

    ✅ UI plus riche (avec vignettes de preview pour les textures)

    ⏳ Support des animations pour les modèles .glb

    💾 Sauvegarde de configuration (via localStorage ou base de données)

    🌍 Déploiement en ligne (ex : Vercel, Netlify)

👨‍💻 Auteur

Projet développé par Zakaria Oubbéa – 2025
