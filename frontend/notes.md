# FRONTEND

## TECHNOLOGIES
 - react
 - react router
 - vite
 - material ui
 - tailwind
 
##   FORM FIELDS AND PROPRETIES

### TEXT:
- max Length
- required
- label name

### DATE:
- min value
- max value
- required
- label name

### SELECT
 - label name
 - select name
 - options names
 - multiple? y/n
 - required? y/n
 - size


### EMAIL
- label name
- multiple? y/n

### PHONE NUMBER

- label name
- type tel

### NUMBER
 - min
 - max

### RADIO GROUP
- legend name
- radio buttons name
- checked? y/n for each button
- value for each button
- required

### SWITCH BUTTON
- value
- required? y/n
- label name
- button name


## routes

Rotta	Componente	Accesso
/admin/login	Login admin	Pubblico
/admin	Redirect alla dashboard	Protetto
/admin/forms	Tabella con tutti i form creati	Protetto
/admin/forms/new	Form builder per nuovo form	Protetto
/admin/forms/123/edit	Editor di un form esistente	Protetto

/forms tabella con forms disponibili per compilazione e invio Pubblico