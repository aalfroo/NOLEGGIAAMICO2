// Ristrutturiamo i prezzi per marca e modello
const prezziAuto = {
  "Alfa Romeo": {
    Junior: 110,
    Stelvio: 150,
    Tonale: 125,
    Giulia: 150,
    Giulietta: 60,
  },
  Audi: {
    A3: 95,
    A6: 195,
    Q3: 150,
    Q5: 165,
    Q8: 280,
  },
  BMW: {
    "Serie 1": 110,
    "Serie 2": 120,
    "Serie 3": 145,
    "Serie 4": 190,
    X1: 140,
  },
  Mercedes: {
    GLC: 190,
    GLA: 145,
    GLB: 160,
    CLA: 165,
    "A45 AMG": 350,
  },
  Volvo: {
    "XC 40": 150,
    "XC 60": 165,
    "XC 90": 200,
    "V 40": 95,
    "V 60": 155,
  },
};

// NUOVA FUNZIONE: Popola il menu dei modelli in base alla marca selezionata
function popolaModelli() {
  const marcaSelezionata = document.getElementById("marcaAuto").value;
  const modelloSelect = document.getElementById("modelloAuto");

  // Pulisce le opzioni precedenti
  modelloSelect.innerHTML =
    '<option value="">-- Seleziona un modello --</option>';

  if (marcaSelezionata && prezziAuto[marcaSelezionata]) {
    const modelli = prezziAuto[marcaSelezionata];
    for (const modello in modelli) {
      if (Object.hasOwnProperty.call(modelli, modello)) {
        const prezzo = modelli[modello];
        const option = document.createElement("option");
        option.value = modello;
        option.textContent = `${modello} (${prezzo} €/giorno)`;
        modelloSelect.appendChild(option);
      }
    }
    modelloSelect.disabled = false; // Abilita il menu dei modelli
  } else {
    modelloSelect.disabled = true; // Disabilita se la marca non è valida
  }
}

// FUNZIONE AGGIORNATA: Calcola il noleggio usando entrambi i menu
function calcolaNoleggio() {
  // OTTENIMENTO DATI PERSONALI
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const telefono = document.getElementById("telefono").value;
  const via = document.getElementById("via").value;

  // OTTENIMENTO NUOVI DATI AUTO
  const marcaAuto = document.getElementById("marcaAuto").value;
  const modelloAuto = document.getElementById("modelloAuto").value;
  const giorni = parseInt(document.getElementById("giorni").value);

  // CONTROLLO CAMPI OBBLIGATORI
  if (
    !nome ||
    !cognome ||
    !telefono ||
    !via ||
    !marcaAuto || // Controllo sulla marca
    !modelloAuto || // Controllo sul modello
    isNaN(giorni) ||
    giorni <= 0
  ) {
    document.getElementById("risultato").innerHTML =
      " **Errore** Non tutti i campi obbligatori sono stati inseriti";
    return;
  }

  // Calcolo del costo: accediamo all'oggetto multidimensionale
  const prezzoAutoGiornaliero = prezziAuto[marcaAuto][modelloAuto];

  // CONTROLLO NEL CASO CI SIANO ERRORI NEL CALCOLO COSTO
  if (!prezzoAutoGiornaliero) {
    document.getElementById("risultato").innerHTML =
      " **Errore** al momento l'auto da lei selezionata non è disponibile, Ci scusiamo dell'incoveniente";
    return;
  }

  //CALCOLO COSTO TOTALE
  const costoTotale = prezzoAutoGiornaliero * giorni;

  // OUTPUT
  const risultatoDiv = document.getElementById("risultato");
  risultatoDiv.innerHTML = `
      <p> Riepilogo Noleggio Effettuato</p>
      <p>Cliente: ${nome} ${cognome}</p>
      <p>Indirizzo: ${via} - Tel: ${telefono}</p>
      <p>Auto Scelta: ${marcaAuto} ${modelloAuto.toUpperCase()} (${prezzoAutoGiornaliero} €/giorno)</p>
      <p>Durata: ${giorni} giorni</p>
      <hr style="border-top: 1px dashed #28a745;">
      <p style="font-size: 1.2em;">COSTO TOTALE STIMATO: ${costoTotale.toFixed(
        2
      )} €</p> `;
}
