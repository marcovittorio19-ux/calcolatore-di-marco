function calcola() {
    let input = document.getElementById('coeff').value;
    // Pulisce l'input e crea un array di numeri
    let coeff = input.split(',').map(x => parseFloat(x.trim()));
    
    // an = coefficiente di grado massimo (primo elemento)
    // a0 = termine noto (ultimo elemento)
    let an = Math.abs(coeff[0]);
    let a0 = Math.abs(coeff[coeff.length - 1]);

    let radiciTrovate = [];

    // Funzione per trovare i divisori di un numero
    const getDivisori = (n) => {
        let div = [];
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) div.push(i, -i);
        }
        return div;
    };

    let divA0 = getDivisori(a0);
    let divAn = getDivisori(an);

    // Proviamo tutte le combinazioni p/q (Teorema Radici Razionali)
    let candidati = new Set();
    for (let p of divA0) {
        for (let q of divAn) {
            candidati.add(p / q);
        }
    }

    // Testiamo ogni candidato con il metodo di Horner
    for (let c of candidati) {
        let resto = 0;
        for (let i = 0; i < coeff.length; i++) {
            resto = resto * c + coeff[i];
        }
        
        // Se il resto è vicino a 0 (tolleranza per errori di virgola)
        if (Math.abs(resto) < 0.000001) {
            radiciTrovate.push(c);
        }
    }

    let display = document.getElementById('risultato');
    // Ordiniamo le radici e rimuoviamo duplicati
    let uniche = [...new Set(radiciTrovate)].sort((a, b) => a - b);
    
    if (uniche.length > 0) {
        display.innerHTML = "Il valore (o i valori) che annullano il resto sono: <strong>" + uniche.join(', ') + "</strong>";
    } else {
        display.innerHTML = "Nessuna radice razionale trovata tra i divisori.";
    }
}
