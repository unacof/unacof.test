# Site LUNACOF — mode d'emploi

Le site était un seul fichier de 1 226 lignes. Il est maintenant découpé en
5 pages + 3 fichiers communs, pour pouvoir travailler **page par page**.

---

## 1. Les fichiers

```
site-lunacof/
│
├── index.html            ← PAGE PRINCIPALE (Accueil). C'est elle qu'on ouvre.
├── federation.html       ← La fédération (ancienne section #about)
├── associations.html     ← Associations membres + carte (ancienne section #map)
├── actualites.html       ← Actualités (ancienne section #news)
├── adherer.html          ← Adhérer + newsletter (ancienne section #cta)
│
├── assets/
│   ├── css/style.css     ← TOUT le design des 5 pages (l'ancien <style>)
│   ├── js/main.js        ← TOUTES les animations des 5 pages (l'ancien <script>)
│   ├── js/overrides.js   ← réglages du panneau de design (ne rien toucher)
│   └── img/              ← tes photos à toi (vide pour l'instant)
│
├── partials/
│   ├── header.html       ← modèle du menu du haut
│   └── footer.html       ← modèle du pied de page
│
├── original/
│   └── LUNACOF_Communaute.html   ← le fichier de départ, intact (sécurité)
│
└── README.md             ← ce fichier
```

**Pour voir le site :** double-clic sur `index.html`.

---

## 2. La règle à retenir

Il y a **deux types de contenu** dans chaque page :

| Type | Où | Si tu le modifies |
|---|---|---|
| **Commun** : header, footer, style, scripts | répété dans les 5 pages / fichiers `assets/` | CSS et JS → 1 seule modif suffit. Header/footer → il faut recopier dans les 5 pages. |
| **Propre à la page** : le bloc entre les deux gros cadres `CONTENU DE LA PAGE` | une seule page | modif isolée, aucun risque pour le reste |

Donc pour travailler tranquillement page par page : reste **entre les deux
cadres `CONTENU DE LA PAGE`**. Tout ce qui est au-dessus ou en dessous est
partagé.

---

## 3. Remplacer les images

Les images ne sont **pas** des balises `<img>`. Elles sont écrites en fond de
bloc, comme ceci :

```html
<div class="ph p1" style="background-image:url('https://images.unsplash.com/photo-1559027615-...')"></div>
                                            └──────── c'est ça qu'on remplace ────────┘
```

### La méthode, en 3 gestes

1. Mets ta photo dans `assets/img/` — nom simple, sans accent ni espace
   (`apropos-1.jpg`, pas `À propos (1).JPG`).
2. Dans le fichier HTML, remplace **toute l'adresse** entre les apostrophes par
   le chemin de ta photo :
   ```html
   style="background-image:url('assets/img/apropos-1.jpg')"
   ```
3. Enregistre, puis rafraîchis le navigateur avec **Ctrl + F5** (sinon
   l'ancienne image reste en mémoire).

### Les 16 images du site

| Fichier | Ligne env. | Repère dans le code | Ce que c'est | Format conseillé |
|---|---|---|---|---|
| index.html | 147-150 | `<div class="avatars">` | 4 petits ronds sous l'accroche | carré 300×300 |
| index.html | 186 | `class="island gc"` | Grande Comore (grande forme) | paysage 900×700 |
| index.html | 187 | `class="island an"` | Anjouan | paysage 700×550 |
| index.html | 188 | `class="island mo"` | Mohéli | carré 500×500 |
| index.html | 189 | `class="island my"` | Mayotte | carré 500×500 |
| federation.html | 119 | `class="ph p1"` | grande photo À propos | portrait 800×1000 |
| federation.html | 120-122 | `class="ph p2/p3/p4"` | 3 photos secondaires | carré 500×500 |
| federation.html | 148 | `<span class="av">` | photo du président | carré 400×400 |
| actualites.html | 128 | 1er `class="news-img"` | couverture actu 1 | paysage 1200×800 |
| actualites.html | 140 | 2e `class="news-img"` | couverture actu 2 | paysage 1200×800 |
| actualites.html | 152 | 3e `class="news-img"` | couverture actu 3 | paysage 1200×800 |

Chacune de ces zones a un commentaire explicatif juste au-dessus dans le code.

### Bon à savoir

- Les **formes arrondies des îles** viennent du CSS, pas de la photo. Une photo
  rectangulaire normale sera recadrée automatiquement.
- Le **logo LUNACOF**, le **croissant**, la **carte de France**, l'**archipel du
  bloc vert** et le **drapeau du bas de page** sont dessinés en SVG dans le code :
  ce ne sont pas des fichiers image, il n'y a rien à remplacer.
- Les **icônes** (`<i data-lucide="user">`) viennent de la librairie Lucide.
  Pour en changer une, va sur lucide.dev/icons, copie le nom de l'icône et
  remplace la valeur de `data-lucide`.
- Poids : vise **moins de 300 Ko par photo**, sinon le site devient lent.

---

## 4. Modifier une page sans rien casser

**Changer un chiffre du compteur** (index.html) : `data-target="30"` → le
nombre final. Le `0` affiché à côté est juste le point de départ de l'animation.

**Ajouter une actualité** (actualites.html) : copier un bloc `<article
class="news-card ...">` entier, le coller après, puis changer la photo, la
date, le titre et le texte. La pastille de couleur se règle avec la classe :
`cat evt` (événement), `cat aap` (appel à projets), `cat fmt` (formation).

**Ajouter une association sur la carte** (associations.html) : copier une ligne
`<button class="pin" ...>` et changer `data-name`, `data-city`, `data-tag`, puis
la position `style="top:..%;left:..%"` (0 % = haut/gauche de la carte).

**Changer une couleur partout** : `assets/css/style.css`, tout en haut, bloc
`:root`. Exemple : `--green:#1B5E3F` change le vert de l'ensemble du site.

**Ajouter un lien dans le menu** : modifier `partials/header.html`, puis
recopier le bloc dans les 5 pages (entre les deux repères HEADER).

---

## 5. Les seules choses que j'ai modifiées

Le code (HTML, CSS, JS) est identique à l'original. Trois exceptions, obligatoires
pour que plusieurs pages fonctionnent :

1. **Les liens du menu** : `href="#about"` est devenu `href="federation.html"`,
   `#map` → `associations.html`, `#news` → `actualites.html`,
   `#cta` → `adherer.html`, `#top` → `index.html`.
   Seul `#footer` (Contact) reste une ancre : il descend au pied de la page en cours.
2. **`class="active"`** est placé sur le lien de la page affichée, dans chaque page.
3. **`<title>` et `<meta description>`** sont différents sur chaque page.

Le CSS et le JavaScript n'ont **aucune** modification : ils ont seulement été
sortis du HTML vers `assets/`.

---

## 6. Ce qui reste à faire

- **Page Contact** : elle n'existait pas dans l'original. Pour l'instant le lien
  « Contact » descend vers le pied de page. À créer quand tu veux, sur le modèle
  d'une page existante.
- **`tweaks-panel.jsx` et `tweaks-app.jsx`** : ces deux fichiers étaient appelés
  par l'original mais n'ont pas été fournis. Les appels ont été retirés des pages
  (ils produisaient une erreur 404). `overrides.js` est conservé : remets les deux
  lignes si tu récupères les fichiers.
- **Boutons `href="#"`** : « Espace membre », « Notre histoire », « Lire
  l'article », « Adhérer en ligne »… pointent dans le vide, comme dans l'original.
  À brancher page par page.
- **Surlignage du menu au défilement** : le script d'origine (bloc 7 de
  `main.js`) surligne le lien correspondant à la section visible. Il a été écrit
  pour une page unique : sur les pages internes, il finit par éteindre le
  surlignage quand on descend. Le lien est bien surligné à l'ouverture de la
  page. Je n'ai pas touché au JavaScript pour respecter la consigne ; on
  s'en occupera quand on travaillera sur `main.js`.
