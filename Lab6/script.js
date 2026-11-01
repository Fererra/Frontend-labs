const API_URL = 'https://randomuser.me/api';

const button = document.getElementById('get-user-btn');
const statusText = document.getElementById('status');
const usersList = document.getElementById('users');

function addInfoRow(list, label, value) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = label + ': ';
    li.appendChild(span);
    li.appendChild(document.createTextNode(value));
    list.appendChild(li);
}

function renderUser(user) {
    const card = document.createElement('div');
    card.className = 'user-card';

    const header = document.createElement('div');
    header.className = 'user-card-header';

    const img = document.createElement('img');
    img.src = user.picture.large;
    img.alt = 'Фото користувача';
    header.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
    header.appendChild(name);

    card.appendChild(header);

    const info = document.createElement('ul');
    info.className = 'user-info';
    addInfoRow(info, 'Місто', user.location.city);
    addInfoRow(info, 'Індекс', user.location.postcode);
    addInfoRow(info, 'Email', user.email);
    card.appendChild(info);

    usersList.prepend(card);
}

button.addEventListener('click', () => {
    button.disabled = true;
    statusText.className = 'status';
    statusText.textContent = 'Завантаження...';

    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            renderUser(data.results[0]);
            statusText.textContent = '';
        })
        .catch((error) => {
            statusText.className = 'status error';
            statusText.textContent = 'Помилка отримання даних: ' + error.message;
        })
        .finally(() => {
            button.disabled = false;
        });
});
