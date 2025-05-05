## PROJECT STRUCTURE

form-builder/
│
├── frontend/              # Applicazione React (Vite)
│   ├── public/            # File statici
│   ├── src/               
│   │   ├── components/    # Componenti riutilizzabili React
│   │   ├── pages/         # Pagine principali dell'app
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Funzioni di utilità
│   │   ├── services/      # Chiamate API (es. Axios)
│   │   ├── App.tsx        # Componente principale
│   │   └── main.tsx       # Punto di ingresso
│   ├── vite.config.ts     # Configurazione Vite
│   └── package.json       # Dipendenze e script NPM
│
├── backend/               # Applicazione Laravel
│   ├── app/               
│   │   ├── Http/
│   │   │   ├── Controllers/  # Controller API
│   │   │   └── Requests/     # Validazione delle richieste
│   │   └── Models/          # Modelli Eloquent
│   ├── database/
│   │   ├── migrations/      # Migrazioni DB
│   │   └── seeders/         # Dati iniziali
│   ├── routes/
│   │   └── api.php          # Rotte API REST
│   ├── config/              # Configurazioni Laravel
│   ├── .env                 # Variabili d'ambiente
│   └── composer.json        # Dipendenze PHP
│
├── docker/                 # File per setup Docker (facoltativo)
│   └── docker-compose.yml
│
└── README.md               # 
