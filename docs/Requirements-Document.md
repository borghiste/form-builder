# Form Builder – Requirements Document

## 1. Project overview
The PickForm project is a full-stack application that allows users to create, edit, and manage company forms to centralize internal employee data. It is composed of a React front end and a Laravel REST API back end, with a relational database for persistence.

### Main objectives
- Allow users to build forms visually using a drag-and-drop interface.
- Support customizable field types such as text, number, email, select, checkbox, and radio.
- Provide client-side and server-side validation.
- Save, load, update, and validate forms through REST APIs.
- Offer a real-time form preview.
- Provide administrative features for managing submitted form data.

---

## 2. Architecture

### 2.1 Front end
- Framework: React with TypeScript
- Core libraries:
  - Material UI for UI components and layout
  - Axios for API communication
  - React Hook Form for state management and validation
- Key features:
  - form creation and editing interface
  - real-time preview
  - immediate field validation on the client side
  - split layout with a field palette and form preview area

### 2.2 Back end
- Framework: Laravel
- API endpoints:
  - GET /forms → list all saved forms
  - GET /forms/{id} → retrieve a specific form
  - POST /forms → create a new form
  - PUT /forms/{id} → update an existing form
  - DELETE /forms/{id} → delete a form
  - POST /forms/{id}/validate → validate form data against the form rules
  - POST /forms/{id}/submit → submit a completed form
  - GET /admin/forms/{id}/submissions → admin view for submissions of a specific form
  - GET /admin/submissions/new → admin view of the most recent submissions
- Authentication: Laravel Sanctum
- Server-side validation: enforced according to the form definition

### 2.3 Database
- Schema overview:
  - forms
    - id
    - name
    - description
    - created_at
    - updated_at
  - fields
    - id
    - form_id
    - label
    - type
    - options (JSON)
    - validations (JSON)
    - order
    - required
  - submissions
    - id
    - form_id
    - data (JSON)
    - created_at
  - users
    - id
    - name
    - email
    - role
    - password

---

## 3. Functional requirements

| ID | Description | Priority |
|----|-------------|----------|
| FR01 | Create a new blank form | High |
| FR02 | Add a new field to a form | High |
| FR03 | Remove an existing field | High |
| FR04 | Edit field properties such as label, type, options, and validation rules | High |
| FR05 | Reorder fields within a form | Medium |
| FR06 | Display a live preview while editing a form | High |
| FR07 | Save a form to the database | High |
| FR08 | Load and edit an existing form | High |
| FR09 | Validate data on the client side | High |
| FR10 | Validate data on the server side | High |
| FR11 | Delete a saved form | Medium |
| FR12 | Handle user feedback and errors | High |
| FR13 | Export a form to JSON | Low |
| FR14 | Import a form from JSON | Low |
| FR15 | Submit a completed form | High |
| FR16 | Allow admins to view submitted records | High |
| FR17 | Allow admins to filter submissions by form or date | Medium |
| FR18 | Allow admins to mark submissions as reviewed | Low |

---

## 4. Non-functional requirements

| Category | Description |
|----------|-------------|
| Usability | The interface should be intuitive, responsive, and accessible for non-technical users. |
| Performance | Form rendering and validation should occur in under 200 ms. |
| Scalability | The system must support multiple users and large numbers of forms and submissions. |
| Security | Input validation, authentication, and authorization are required to guard against SQL injection, XSS, and CSRF. |
| Compatibility | Support modern browsers such as Chrome, Firefox, Safari, and Edge. |
| Extensibility | The system must support additional field types and validation rules. |
| Maintainability | Use clear code structures, modular components, and consistent naming patterns. |

---

## 5. UX/UI design

### Layout
- Left sidebar: list of available field types such as text, number, select, and checkbox
- Main area: live preview of the form being built
- Top toolbar: form name and actions such as Save, Load, and Preview
- Field settings panel: label, required flag, validation rules, and options

### Admin dashboard
- Page: /admin
- Main features:
  - view all submitted forms
  - filter by form name, submission date, or user
  - mark submissions as reviewed or pending
  - access detailed submission data
- Notifications: show new submissions since the last login

### Visual style
- Minimalist and aligned with Material UI
- Neutral light palette with gray and blue tones
- Real-time feedback via snackbars or toast notifications

---

## 6. User flows

### Form creator flow
1. The user opens the form builder page.
2. They click Add Field to create a new field.
3. They configure field details such as label, type, and validation rules.
4. They view the live preview.
5. They save the form, which sends data to the API and stores it in the database.
6. They can reopen, edit, or delete the form later.
7. During form submission, data is validated on both the client and server.

### Admin flow
1. The admin logs into the system.
2. They navigate to the admin dashboard.
3. They review all submissions.
4. They filter by date or form.
5. They mark submissions as reviewed or export them if needed.

---

## 7. Future extensions
- user authentication and role management
- drag-and-drop reordering of fields
- predefined form templates such as contact or registration surveys
- export filled forms as PDF or HTML
- third-party integrations such as webhooks and email notifications
- analytics dashboard for form performance insights

---

## 8. Technical requirements
- Front end: React 18+, TypeScript, Vite, Material UI, Axios, React Hook Form
- Back end: Laravel 11+, PHP 8.2+, MySQL or PostgreSQL
- Development environment: Docker
- Build and deployment: Docker Compose for dev/prod environments
- Version control: Git and GitHub or GitLab

---

## 9. Success metrics
- average form creation time under 3 minutes
- form validation time under 200 ms
- zero critical production bugs
- 95% test coverage on core features including validation, saving, loading, and submissions
- admin can view new submissions within 2 seconds of page load

---

## 10. Final notes
This document defines the baseline requirements for the Form Builder application. Any future updates or scope changes should be tracked in a dedicated changelog and reviewed prior to implementation.
