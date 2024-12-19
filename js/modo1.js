// Lista de palabras en inglés y sus traducciones en ruso
const words = [
    { english: "acid", russian: "кислота" },
    { english: "periapical tissues", russian: "периапикальные ткани" },
    { english: "to accumulate", russian: "скапливаться" },
    { english: "root caries", russian: "корневой кариес" },
    { english: "cavitation", russian: "кариозная полость" },
    { english: "spot", russian: "пятно" },
    { english: "cusp", russian: "бугор" },
    { english: "tooth decay", russian: "поражение зуба" },
    { english: "cause", russian: "причина" },
    { english: "to remove plaque", russian: "удалять налет" },
    { english: "demineralization", russian: "деминерализация" },
    { english: "prevention", russian: "профилактика" },
    { english: "disintegration", russian: "разложение" },
    { english: "enamel-dentine junction", russian: "стык эмали и дентина" },
    { english: "fluoride", russian: "фтор" },
    { english: "food deposits", russian: "остатки пищи" },
    { english: "dental plaque", russian: "зубной налет" },
    { english: "gum diseases", russian: "болезни десен" },
    { english: "groove", russian: "ямка" },
    { english: "interproximal surface", russian: "проксимальная поверхность" },
    { english: "inflammation", russian: "воспаление" },
    { english: "intact surface", russian: "интактная поверхность" },
    { english: "invasion", russian: "заражение" },
    { english: "lesion", russian: "повреждение" },
    { english: "oral cavity", russian: "ротовая полость" }
];

let currentWordIndex = Math.floor(Math.random() * words.length);
let correctCount = 0;
let incorrectCount = 0;

function updateStatistics() {
    const totalAttempts = correctCount + incorrectCount;
    const accuracy = totalAttempts > 0 ? ((correctCount / totalAttempts) * 100).toFixed(2) : 0;

    document.getElementById('correctCount').innerText = correctCount;
    document.getElementById('incorrectCount').innerText = incorrectCount;
    document.getElementById('accuracy').innerText = accuracy;
}

function showWord() {
    document.getElementById('word').innerText = `Переведи: ${words[currentWordIndex].english}`;
}

function checkTranslation() {
    const userTranslation = document.getElementById('translationInput').value.trim();
    const correctTranslation = words[currentWordIndex].russian;

    if (userTranslation === correctTranslation) {
        document.getElementById('resultMessage').innerText = "Правильно!";
        document.getElementById('resultMessage').classList.add("text-success");
        document.getElementById('resultMessage').classList.remove("text-danger");
        correctCount++;

        // Reemplazar el botón de enviar con el botón de siguiente palabraІF
        const buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.innerHTML = '<button id="nextWordButton" class="btn btn-secondary">Следующее слово</button>';
        document.getElementById('nextWordButton').addEventListener('click', nextWord);
    } else {
        document.getElementById('resultMessage').innerText = "Попробуй еще раз.";
        document.getElementById('resultMessage').classList.add("text-danger");
        document.getElementById('resultMessage').classList.remove("text-success");
        incorrectCount++;
    }

    updateStatistics();
}

function nextWord() {
    document.getElementById('translationInput').value = "";
    document.getElementById('resultMessage').innerText = "";

    // Reemplazar el botón de siguiente palabra con el botón de enviar
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = '<button id="submitButton" class="btn btn-primary">Enviar</button>';
    document.getElementById('submitButton').addEventListener('click', checkTranslation);

    currentWordIndex = Math.floor(Math.random() * words.length);
    showWord();
}

function resetStatistics() {
    correctCount = 0;
    incorrectCount = 0;
    updateStatistics();
}

document.getElementById('submitButton').addEventListener('click', checkTranslation);
document.getElementById('resetButton').addEventListener('click', resetStatistics);

// Mostrar la primera palabra al cargar la página
showWord();
