## PROJECT STRUCTURE

form-builder/
│
├── frontend/              #  React App (Vite)
│   ├── public/            
│   ├── src/               
│   │   ├── components/├── #  React components
                       UI ├── reusable UI components 
│   │   ├── routes/       # app pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # utilities functions
│   │ 
│   │   ├── App.tsx        # main component
│   │   └── main.tsx       # entry point
│   ├── vite.config.ts     #  Vite configuration
│   └── package.json       # dependecies
│
├── backend/               # Laravel App
│   ├── app/               
│   │   ├── Http/
│   │   │   ├── Controllers/  # Controller API
│   │   │   └── Requests/     # Validazione delle richieste
│   │   └── Models/          #Eloquent models
│   ├── database/
│   │   ├── migrations/      #  DB migrations
│   │   └── seeders/         # data
│   ├── routes/
│   │   └── api.php          #  API REST routes
│   ├── config/              #  Laravel configurations
│   ├── .env                 # env variables
│   └── composer.json        #  PHP dependecies
│
│
└── README.md               # 
