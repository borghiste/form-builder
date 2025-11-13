# 📋 Form Builder – Requirements Document

## 1. Project Overview

The **Form Builder** is a **full-stack application** that enables users to create, edit, and manage custom forms.  
It consists of a **React front-end** and a **Laravel REST API back-end**, with a **relational database** for data persistence.

### Main Objectives
- Allow users to build forms visually, either by clicking or using drag-and-drop.
- Support **customizable field types** (text, number, email, select, checkbox, etc.).
- Provide **client-side and server-side validation**.
- Save, load, update, and validate forms through REST APIs.
- Offer a **real-time form preview**.
- Provide **admin features** for viewing and managing submitted form data.

---

## 2. Architecture

### 2.1 Front-End
- **Framework:** React (TypeScript)
- **Core Libraries:**
  - Material UI → UI components and layout
  - Axios → API communication
  - React Hook Form → state management and validation
- **Main Features:**
  - Form creation and editing interface.
  - Real-time form preview.
  - Instant field validation (client-side).
  - Split layout:
    1. **Field palette** (available field types)
    2. **Form preview area**.

### 2.2 Back-End
- **Framework:** Laravel
- **API Endpoints:**
  - `GET /forms` → list all saved forms
  - `GET /forms/{id}` → retrieve a specific form
  - `POST /forms` → create a new form
  - `PUT /forms/{id}` → update an existing form
  - `DELETE /forms/{id}` → delete a form
  - `POST /forms/{id}/validate` → validate form data based on field rules
  - `POST /forms/{id}/submit` → submit a completed form
  - `GET /admin/forms/{id}/submissions` → (admin) view submissions for a specific form
  - `GET /admin/submissions/new` → (admin) view the most recent form submissions
- **Authentication:** (future extension) JWT or Laravel Sanctum.
- **Server-side validation:** enforced according to the form’s defined rules.

### 2.3 Database
- **Schema Overview:**
  - `forms`
    - `id`
    - `name`
    - `description`
    - `created_at`
    - `updated_at`
  - `fields`
    - `id`
    - `form_id`
    - `label`
    - `type` (text, number, email, select, checkbox, etc.)
    - `options` (JSON)
    - `validations` (JSON)
    - `order`
    - `required`
  - `submissions`
    - `id`
    - `form_id`
    - `data` (JSON)
    - `created_at`
  - `users` *(future feature)*  
    - `id`
    - `name`
    - `email`
    - `role` (user/admin)
    - `password`

---

## 3. Functional Requirements

| ID | Description | Priority |
|----|--------------|-----------|
| FR01 | Create a new blank form | High |
| FR02 | Add a new field to a form | High |
| FR03 | Remove an existing field | High |
| FR04 | Edit field properties (label, type, options, validations) | High |
| FR05 | Reorder fields within a form | Medium |
| FR06 | Display a live preview of the form | High |
| FR07 | Save a form to the database | High |
| FR08 | Load and edit an existing form | High |
| FR09 | Client-side validation | High |
| FR10 | Server-side validation | High |
| FR11 | Delete a saved form | Medium |
| FR12 | Handle errors and user feedback | High |
| FR13 | Export a form to JSON | Low |
| FR14 | Import a form from JSON | Low |
| FR15 | Submit a completed form | High |
| FR16 | Admin can view submitted records | High |
| FR17 | Admin can filter new submissions by form or date | Medium |
| FR18 | Admin can mark submissions as reviewed | Low |

---

## 4. Non-Functional Requirements

| Category | Description |
|-----------|--------------|
| **Usability** | The UI should be intuitive, responsive, and accessible for non-technical users. |
| **Performance** | Form rendering and validation should execute in under 200ms. |
| **Scalability** | The system must handle multiple users and large numbers of forms and submissions. |
| **Security** | Input validation, authentication, and authorization are required; protect against SQL injection, XSS, and CSRF. |
| **Compatibility** | Support for all modern browsers (Chrome, Firefox, Safari, Edge). |
| **Extensibility** | The system must support the addition of new field types and validation rules. |
| **Maintainability** | Clear code structure, modular components, and consistent naming conventions. |

---

## 5. UX/UI Design

### Layout
- **Left Sidebar:** list of available field types (Text, Number, Select, Checkbox, etc.)
- **Main Area:** live preview of the form being built.
- **Top Toolbar:** form name, buttons for “Save”, “Load”, “Preview”.
- **Field Settings Drawer:** field configuration (label, required, validation rules, options).

### Admin Dashboard
- **Page:** `/admin`
- **Main Features:**
  - View a list of all form submissions.
  - Filter by form name, submission date, or user.
  - Mark submissions as “reviewed” or “pending”.
  - Access detailed submission data (JSON view).
- **Notifications:** show new submissions since the last login.

### Visual Style
- Minimalist and consistent with Material UI.
- Neutral light color palette (gray and blue tones).
- Real-time feedback via snackbar/toast notifications.

---

## 6. User Flows

### Form Creator Flow
1. User opens the Form Builder page.
2. Clicks “+ Add Field” to create a new field.
3. Configures field properties (label, type, validations, etc.).
4. Views the real-time preview.
5. Saves the form → sends to back-end → stored in the database.
6. Can reopen, edit, or delete a form later.
7. During submission, data is validated on both client and server.

### Admin Flow
1. Admin logs into the system.
2. Navigates to the Admin Dashboard.
3. Views a list of all form submissions.
4. Filters for new submissions or specific forms.
5. Marks submissions as reviewed or exports them if needed.

---

## 7. Future Extensions

- User authentication and role management (admin/user).
- Drag-and-drop field reordering.
- Predefined form templates (e.g., contact, registration, survey).
- Export filled forms as PDF/HTML.
- Integration with third-party services (webhooks, email notifications).
- Data analytics dashboard for form performance insights.

---

## 8. Technical Requirements

- **Front-end:** React 18+, TypeScript, Vite, Material UI, Axios, React Hook Form  
- **Back-end:** Laravel 11+, PHP 8.2+, MySQL or PostgreSQL  
- **Development Environment:** Docker  
- **Build & Deployment:** Docker Compose (dev/prod environments)  
- **Version Control:** Git (GitHub or GitLab)  

---

## 9. Success Metrics

- Average form creation time < 3 minutes  
- Form validation time < 200 ms  
- 0 critical bugs in production  
- 95% test coverage on core features (validation, saving, loading, submissions)  
- Admin can view new submissions within 2 seconds of page load  

---

## 10. Final Notes

This document defines the baseline requirements for the *Form Builder* application.  
Any future updates or scope changes should be tracked in a dedicated **Changelog section** and reviewed before implementation.
