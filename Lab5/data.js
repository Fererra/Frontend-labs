const RULES = {
    pib: {
        title: "ПІБ",
        regex: /^[A-ZА-ЯЁІЇЄҐ][a-zа-яёіїєґ'’]+(-[A-ZА-ЯЁІЇЄҐ][a-zа-яёіїєґ'’]+)? [A-ZА-ЯЁІЇЄҐ]\. ?[A-ZА-ЯЁІЇЄҐ]\.$/,
        message: 'Поле "ПІБ" повинно мати формат "Прізвище І.П." (наприклад, Сухоруков М.С.)'
    },
    variant: {
        title: "Варіант",
        regex: /^\d{2}$/,
        message: 'Поле "Варіант" повинно мати формат "ЧЧ" (наприклад, 09)'
    },
    group: {
        title: "Група",
        regex: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2}-\d{2}$/,
        message: 'Поле "Група" повинно мати формат "ТТ-ЧЧ" (наприклад, ІМ-43)'
    },
    faculty: {
        title: "Факультет",
        regex: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{4}$/,
        message: 'Поле "Факультет" повинно містити 4 літери (наприклад, ФІОТ)'
    },
    birthdate: {
        title: "Дата народження",
        regex: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,
        message: 'Поле "Дата народж." повинно мати формат "ДД.ММ.РРРР" (наприклад, 01.01.2005)'
    }
};

function isRealDate(value) {
    const parts = value.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day &&
        date <= new Date();
}

function isValid(name, value) {
    const rule = RULES[name];
    if (!rule.regex.test(value)) {
        return false;
    }
    if (name === "birthdate" && !isRealDate(value)) {
        return false;
    }
    return true;
}

function markRow(name, hasError) {
    const row = document.getElementById("row-" + name);
    if (hasError) {
        row.classList.add("error");
    } else {
        row.classList.remove("error");
    }
}

function checkField(input) {
    const row = document.getElementById("row-" + input.name);
    if (row.classList.contains("error") && isValid(input.name, input.value.trim())) {
        markRow(input.name, false);
    }
}

function Formdata(data) {
    const errors = [];
    const values = {};

    for (const name in RULES) {
        const value = data[name].value.trim();
        values[name] = value;

        if (value.length === 0) {
            errors.push('Поле "' + RULES[name].title + '" порожнє');
            markRow(name, true);
        } else if (!isValid(name, value)) {
            errors.push(RULES[name].message);
            markRow(name, true);
        } else {
            markRow(name, false);
        }
    }

    const errorBox = document.getElementById("error-message");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        alert("Форма містить помилки. Виправте виділені поля.");
        return false;
    }

    errorBox.innerHTML = "";
    showData(values);

    return false;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildResultTable(values) {
    let html = '<table class="result-table">';
    html += "<tr><th>Поле</th><th>Значення</th></tr>";
    for (const name in RULES) {
        html += "<tr><td>" + RULES[name].title + "</td><td>" + escapeHtml(values[name]) + "</td></tr>";
    }
    html += "</table>";
    return html;
}

function showData(values) {
    const table = buildResultTable(values);
    const win = window.open("", "resultWindow", "width=500,height=400");

    if (win) {
        win.document.open();
        win.document.write(
            '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8">' +
            "<title>Введені дані</title>" +
            "<style>" +
            "body{font-family:Arial,sans-serif;padding:20px;background-color:#f3f2f3;}" +
            "table{border-collapse:collapse;width:100%;background-color:#ffffff;}" +
            "th,td{border:1px solid #333;padding:8px;text-align:left;}" +
            "th{background-color:#c0d3e5;}" +
            "</style></head><body>" +
            "<h2>Введені дані</h2>" + table +
            '<p><button onclick="window.close()">Закрити</button></p>' +
            "</body></html>"
        );
        win.document.close();
        win.focus();
    } else {
        document.getElementById("modal-content").innerHTML = "<h2>Введені дані</h2>" + table;
        document.getElementById("modal").classList.add("open");
    }
}

function closeModal() {
    document.getElementById("modal").classList.remove("open");
}
