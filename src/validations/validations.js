import * as validators from "@vuelidate/validators";

validators.required.$message = "Feld darf nicht leer sein!"
validators.integer.$message = "Bitte eine Zahl eingeben"
validators.numeric.$message = "Der Preis darf nicht unter 0€ liegen"