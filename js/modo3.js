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

let correctCount = 0;
let incorrectCount = 0;
let currentWordIndex = Math.floor(Math.random() * words.length);
let questionType = Math.random() > 0.5 ? "englishToRussian" : "russianToEnglish";

function updateStatistics() {
    const totalAttempts = correctCount + incorrectCount;
    const accuracy = totalAttempts > 0 ? ((correctCount / totalAttempts) * 100).toFixed(2) : 0;

    document.getElementById('correctCount').innerText = correctCount;
    document.getElementById('incorrectCount').innerText = incorrectCount;
    document.getElementById('accuracy').innerText = accuracy;
}

function showWordAndOptions() {
    // Selección de tipo de pregunta (50/50)
    questionType = Math.random() > 0.5 ? "englishToRussian" : "russianToEnglish";

    const wordElement = document.getElementById('word');
    const correctTranslation =
        questionType === "englishToRussian"
            ? words[currentWordIndex].russian
            : words[currentWordIndex].english;

    // Opciones incorrectas
    const incorrectOptions = words
        .filter((_, index) => index !== currentWordIndex)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(word => (questionType === "englishToRussian" ? word.russian : word.english));

    // Mezclar opciones
    const allOptions = [correctTranslation, ...incorrectOptions].sort(() => 0.5 - Math.random());

    // Mostrar palabra y opciones
    wordElement.innerText =
        questionType === "englishToRussian"
            ? `Переведи на русский: ${words[currentWordIndex].english}`
            : `Переведи на английский: ${words[currentWordIndex].russian}`;

    // Generar botones de opciones
    const optionsForm = document.getElementById('optionsForm');
    optionsForm.innerHTML = ""; // Limpiar opciones anteriores
    allOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = "form-check";
        optionElement.innerHTML = `
            <input class="form-check-input" type="radio" name="options" value="${option}" id="${option}">
            <label class="form-check-label" for="${option}">${option}</label>
        `;
        optionsForm.appendChild(optionElement);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (!selectedOption) {
        document.getElementById('resultMessage').innerText = "Выбери один вариант ответа.";
        document.getElementById('resultMessage').classList.add("text-danger");
        return;
    }

    const selectedValue = selectedOption.value;
    const correctTranslation =
        questionType === "englishToRussian"
            ? words[currentWordIndex].russian
            : words[currentWordIndex].english;

    if (selectedValue === correctTranslation) {
        document.getElementById('resultMessage').innerText = "Правильно!";
        document.getElementById('resultMessage').classList.add("text-success");
        document.getElementById('resultMessage').classList.remove("text-danger");
        correctCount++;
    } else {
        document.getElementById('resultMessage').innerText = "Не правильно.";
        document.getElementById('resultMessage').classList.add("text-danger");
        document.getElementById('resultMessage').classList.remove("text-success");
        incorrectCount++;
    }

    updateStatistics();

    // Generar nueva palabra y opciones después de 2 segundos
    setTimeout(() => {
        currentWordIndex = Math.floor(Math.random() * words.length);
        showWordAndOptions();
        document.getElementById('resultMessage').innerText = "";
    }, 1000);
}

function resetStatistics() {
    correctCount = 0;
    incorrectCount = 0;
    updateStatistics();
}

// Asociar eventos
document.getElementById('submitButton').addEventListener('click', checkAnswer);
document.getElementById('resetButton').addEventListener('click', resetStatistics);

// Mostrar la primera palabra y opciones al cargar la página
showWordAndOptions();
