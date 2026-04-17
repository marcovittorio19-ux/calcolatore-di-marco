function calcola() {
    let input = document.getElementById('coeff').value;
    let coeff = input.split(',').map(x => parseFloat(x.trim()));
    
    let an = Math.abs(coeff[0]);
    let a0 = Math.abs(coeff[coeff.length - 1]);
    
    let radiciTrovate = [];

    // Trova divisori di n
    const getDivisori = (n) => {
        let div = [];
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) div.push(i, -i);
        }
        return div;
    };

    let divA0 = getDivisori(a0);
    let divAn = getDivisori(an);

    // Genera candidati p/q (Teorema delle radici razionali)
    let candidati = new Set();
    for (let p of divA0) {
        for (let q of divAn) {
            candidati.add(p / q);
        }
    }

    // Testiamo con Horner
    for (let c of candidati) {
        let resto = 0;
        for (let i = 0; i < coeff.length; i++) {
            resto = resto * c + coeff[i];
        }
        if (Math.abs(resto) < 0.000001) {
            radiciTrovate.push(c);
        }
    }

    let display = document.getElementById('risultato');
    let uniche = [...new Set(radiciTrovate)].sort((a, b) => Math.abs(a) - Math.abs(b));
    
    if (uniche.length > 0) {
        // Mostriamo il primo valore trovato che è matematicamente corretto
        display.innerHTML = "Radice trovata (usa questa per Ruffini): <strong>" + uniche[0] + "</strong>";
    } else {
        display.innerHTML = "Nessuna radice trovata. Controlla di aver inserito i coefficienti correttamente.";
    }
}
