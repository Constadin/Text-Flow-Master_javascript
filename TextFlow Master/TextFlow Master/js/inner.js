'use strict';

// Η συνάρτηση αυτή προσθέτει μορφοποιημένο κείμενο στο #result element
function appendFormattedTextToResultDiv(text) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    const paragraphs = text.split('\n\n'); // Διαχωρίζει το κείμενο σε παραγράφους με βάση το διπλό enter

    paragraphs.forEach(paragraph => {
        const innerDiv = document.createElement('div');
        innerDiv.style.marginTop = '30px'; // Προσθέτει κενό ανάμεσα στις παραγράφους
        innerDiv.textContent = paragraph;
        innerDiv.classList.add('innerDiv'); // Προσθέτει μια κλάση για CSS στυλισμό
        resultDiv.appendChild(innerDiv); // Προσθέτει κάθε παράγραφο στο #result element
    });
}

// Η συνάρτηση αυτή επισημαίνει το κείμενο που περιέχεται στο #result element βάσει της αναζήτησης του χρήστη
function highlightCharacter() {
    const searchTerm = document.getElementById('searchTerm').value; // Παίρνει την αναζήτηση του χρήστη
    const textContent = document.getElementById('result').innerText; // Παίρνει το κείμενο από το #result element

    const regex = new RegExp(searchTerm, 'g'); // Δημιουργεί regular expression για την αναζήτηση
    const newTextContent = textContent.replace(regex, `<span class="highlight">${searchTerm}</span>`); // Επισημαίνει τις αντιστοιχίες με ένα span με κλάση highlight
    
    document.getElementById('result').innerHTML = newTextContent; // Ενημερώνει το κείμενο με τις επισημάνσεις
    
    // Η συνάρτηση που ακολουθεί μορφοποιεί ξανά το κείμενο σε παράγραφοι
    function formatTextWithParagraphs() {
        const resultDiv = document.getElementById('result');
        const newTextContent = resultDiv.innerHTML;
        
        resultDiv.innerHTML = ''; // Καθαρίζει το περιεχόμενο του #result element
        
        const paragraphs = newTextContent.split('\n'); // Διαχωρίζει το κείμενο σε παραγράφους
    
        paragraphs.forEach(paragraph => {
            const innerDiv = document.createElement('div');
            innerDiv.innerHTML = paragraph + '</span>'; // Προσθέτει το κλείσιμο του span που χρησιμοποιήθηκε για το highlight
            innerDiv.classList.add('innerDiv');
            resultDiv.appendChild(innerDiv); // Προσθέτει κάθε παράγραφο στο #result element
        });
    }
    formatTextWithParagraphs(); // Καλεί αυτή τη συνάρτηση για μορφοποίηση του κειμένου
}

// Κώδικας για τη λειτουργία του ακορντεόν
// (Παίρνει τα στοιχεία με κλάση "accordion" και προσθέτει ακροατές για την εμφάνιση/απόκρυψη του περιεχομένου τους)
const accordions = document.getElementsByClassName("accordion");
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
            panel.style.width = "720px";
            panel.style.borderRadius = "10px";
            panel.style.marginBottom = "3%";
        }
    });
}

// Οι ακόλουθες συναρτήσεις χειρίζονται την απόθεση αρχείου και την επεξεργασία του περιεχομένου του
function dropHandler(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        appendFormattedTextToResultDiv(content); // Προσθέτει το μορφοποιημένο κείμενο στο #result element
    };
    
    reader.readAsText(file);
}

function dragOverHandler(event) {
    event.preventDefault();
}

// Κώδικας για το κουμπί Clear που καθαρίζει το περιεχόμενο του #result element
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    resultDiv.style.cssText= 'display: flex; flex-direction:column ; justify-content: flex-start; align-items: center;';
    resultDiv.textContent = ''; // Καθαρίζει το περιεχόμενο του #result element όταν το κουμπί πατηθεί
});

// Κώδικας που επισημαίνει το κείμενο καθώς ο χρήστης πληκτρολογεί στο πεδίο αναζήτησης
const searchTermInput = document.getElementById('searchTerm');
searchTermInput.addEventListener('input', highlightCharacter);



function replaceSearchTermAndHighlight() {
    const replaceTerm = document.getElementById('replace').value;
    const selection = window.getSelection().toString();

    if (selection && selection !== '' && replaceTerm !== '') {
        const resultDiv = document.getElementById('result');
        const newTextContent = resultDiv.innerHTML.replace(selection, `<span style="color: blue ;font-weight: bold; font-size: 1.4rem;">${replaceTerm}</span>`);
        resultDiv.innerHTML = newTextContent;
    }
}

const replaceButton = document.getElementById('selected-text');
replaceButton.addEventListener('click', function(event) {
    event.preventDefault(); // Ακυρώνει την προεπιλεγμένη συμπεριφορά του κουμπιού
    console.log('Button clicked!'); // Έλεγχος αν η συνάρτηση καλείται όταν πατάς το κουμπί
    replaceSearchTermAndHighlight(); // Καλεί τη συνάρτηση που αντικαθιστά το κείμενο
});


function replaceText() {
    const replaceTerm = document.getElementById('replace').value;
    const searchTerm = document.getElementById('searchTerm').value;

    if (searchTerm && searchTerm !== '' && replaceTerm !== '') {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = resultDiv.innerHTML.replaceAll(searchTerm, `<span style="color: blue; font-weight: bold; font-size: 1.4rem;">${replaceTerm}</span>`);
    }
}

const repaceButton = document.getElementById('replaceButton');
repaceButton.addEventListener('click', function(event) {
    event.preventDefault();
    replaceText();
});

