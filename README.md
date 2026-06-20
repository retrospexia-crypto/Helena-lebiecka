# Helena Lebiecka — Gallery

Strona artystki malarki z panelem administracyjnym opartym na Firebase.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Firebase 10** (Authentication, Firestore, Storage)
- **React Router v6**
- Netlify Redirects (`public/_redirects`)

## Szybki start

```bash
npm install
npm run dev
```

## Konfiguracja Firebase (wymagana przed uruchomieniem)

### 1. Firebase Authentication

W [Firebase Console](https://console.firebase.google.com/) → projekt `helena-lebiecka-gallery`:

1. **Authentication → Sign-in method** → włącz **Email/Password**
2. **Authentication → Users** → dodaj konto admina:
   - Email: `admin@helena-lebiecka.pl`
   - Hasło: dowolne silne hasło

> Login do panelu `/admin`:  
> - Login: `admin` (lub pełny e-mail)  
> - Hasło: to które ustawiono w Firebase Console

### 2. Firestore

1. **Firestore Database → Utwórz bazę danych** (tryb produkcyjny lub testowy)
2. Dodaj reguły bezpieczeństwa (Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gallery/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Firebase Storage

1. **Storage → Rozpocznij** (tryb produkcyjny)
2. Dodaj reguły (Storage → Rules):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Wdrożenie na Netlify

```bash
npm run build
# Wgraj folder dist/ na Netlify, lub użyj Netlify CLI:
netlify deploy --prod --dir=dist
```

Plik `netlify.toml` i `public/_redirects` są już skonfigurowane dla React Router SPA.

## Struktura projektu

```
src/
├── firebase.js          # konfiguracja Firebase (auth, db, storage)
├── hooks/
│   ├── useAdminAuth.js  # Firebase Authentication
│   └── useGallery.js    # Firestore + Firebase Storage
├── admin/
│   ├── AdminLogin.jsx
│   └── AdminPanel.jsx
├── pages/
│   ├── HomePage.jsx
│   └── AdminPage.jsx
└── components/
    └── ...
```
