function calcola() {
    let input = document.getElementById('coeff').value;
    let coeff = input.split(',').map(x => parseFloat(x.trim()));
    
    let an = Math.abs(coeff[0]);
    let a0 = Math.abs(coeff[coeff.length - 1]);
    let radiciTrovate = [];

    // Funzione per convertire decimale in frazione (es. 0.5 -> "1/2")
    function decimaleAFrazione(n) {
        let tolleranza = 1.0E-6;
        let num = 1, den = 1;
        let valore = n;
        while (Math.abs(valore - Math.round(valore)) > tolleranza) {
            valore = 1 / (valore - Math.floor(valore));
            let temp = num;
            num = Math.round(Math.floor(valore) * num + den);
            den = temp;
        }
        let intero = Math.round(n * den);
        return intero + "/" + den;
    }

    // Ricerca radici (come prima)
    let candidati = new Set();
    for (let p = 1; p <= a0; p++) {
        if (a0 % p === 0) {
            for (let q = 1; q <= an; q++) {
                if (an % q === 0) {
                    candidati.add(p / q);
                    candidati.add(-p / q);
                }
            }
        }
    }

    for (let c of candidati) {
        let resto = 0;
        for (let i = 0; i < coeff.length; i++) resto = resto * c + coeff[i];
        if (Math.abs(resto) < 0.0001) radiciTrovate.push(c);
    }

    let display = document.getElementById('risultato');
    let uniche = [...new Set(radiciTrovate)].sort((a, b) => Math.abs(a) - Math.abs(b));
    
    if (uniche.length > 0) {
        // Ora il software mostra la frazione!
        let frazione = decimaleAFrazione(uniche[0]);
        display.innerHTML = "La radice da usare per Ruffini è: <strong>" + frazione + "</strong>";
    } else {
        display.innerHTML = "Nessuna radice razionale trovata.";
    }
}
