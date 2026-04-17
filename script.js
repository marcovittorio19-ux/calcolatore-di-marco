function calcola() {
    let input = document.getElementById('coeff').value;
    // Trasforma l'input in numeri
    let coeff = input.split(',').map(Number);
    let termineNoto = Math.abs(coeff[coeff.length - 1]);
    let radiciTrovate = [];

    // Cerchiamo tra i divisori del termine noto
    for (let i = 1; i <= termineNoto; i++) {
        if (termineNoto % i === 0) {
            // Proviamo sia il numero positivo che quello negativo
            [i, -i].forEach(c => {
                let resto = 0;
                // Qui applichiamo la regola di Ruffini/Sostituzione
                for (let j = 0; j < coeff.length; j++) {
                    resto = resto * c + coeff[j];
                }
                
                // Se il resto è 0, abbiamo trovato il numero che cerchi!
                if (resto === 0) {
                    radiciTrovate.push(c);
                }
            });
        }
    }

    // Mostriamo il risultato
    let display = document.getElementById('risultato');
    if (radiciTrovate.length > 0) {
        // Usiamo un Set per rimuovere eventuali duplicati
        let uniche = [...new Set(radiciTrovate)];
        display.innerHTML = "Il valore (o i valori) che annullano il resto sono: <strong>" + uniche.join(', ') + "</strong>";
    } else {
        display.innerHTML = "Non ho trovato radici intere tra i divisori del termine noto.";
    }
}