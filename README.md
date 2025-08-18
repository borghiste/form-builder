# Form Based

**Form Builder** is a full-stack web application that allows you to create, edit, and fill dynamic forms. The project provides an intuitive interface to add custom fields, configure options, and handle validations both on the client and server side via REST APIs.  

---

##  Key Features

- Create dynamic forms with custom fields(in progress).
- Supports multiple field types: text, number, email, checkbox, radio, select(in progress).

- Live preview of the form while building it(in progress).
- Save and manage forms through REST APIs.
- Modern and responsive user interface.
- Easily extendable with new field types or validations.

---

## 🔹 Tech Stack

- **Front-end:** React, Material UI
- **Back-end:** Laravel (REST API)
- **Database:** MySQL/PostgreSQL (configurable)
- **Other tools:** Docker for development environment

---

## 🔹 Installation

### Prerequisites

- Node.js >= 18
- Composer
- Docker (optional but recommended)
- MySQL/PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/your-username/form-builder.git
cd form-builder

```
### 2. install dependecies with setup script
```bash
cd backend
cp .env.example .env
php artisan key:generate
```

### 3. Environment Configuration (.env)
generate .env file
```bash

cp .env.example .env
php artisan key:generate
```

### 4. Database Configuration
Open .env and update the following fields:
```bash
APP_NAME=Formuilder
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=form_builder_database
DB_USERNAME=root
DB_PASSWORD=

# Optional: API or JWT secrets
# JWT_SECRET=your_jwt_secret_here

```

### 5. Run the application

```bash
chmod +x start.sh
./start.sh
```

