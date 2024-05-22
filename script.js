let clients = [];
let services = [];
let ads = [];

// Функція для збереження клієнтів в локальному сховищі
function saveClients() {
    localStorage.setItem('clients', JSON.stringify(clients));
}

// Функція для завантаження клієнтів з локального сховища
function loadClients() {
    let storedClients = localStorage.getItem('clients');
    if (storedClients) {
        clients = JSON.parse(storedClients);
    }
}

// Функція для збереження послуг в локальному сховищі
function saveServices() {
    localStorage.setItem('services', JSON.stringify(services));
}

// Функція для завантаження послуг з локального сховища
function loadServices() {
    let storedServices = localStorage.getItem('services');
    if (storedServices) {
        services = JSON.parse(storedServices);
    }
}

// Функція для збереження реклам в локальному сховищі
function saveAds() {
    localStorage.setItem('ads', JSON.stringify(ads));
}

// Функція для завантаження реклам з локального сховища
function loadAds() {
    let storedAds = localStorage.getItem('ads');
    if (storedAds) {
        ads = JSON.parse(storedAds);
    }
}

// Завантажуємо клієнтів, послуги та реклами при відкритті сторінки
loadClients();
loadServices();
loadAds();

function showClients() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Список клієнтів</h2>';
    if (clients.length === 0) {
        content.innerHTML += '<p>Немає клієнтів.</p>';
    } else {
        content.innerHTML += '<ul>';
        clients.forEach((client, index) => {
            content.innerHTML += `
                <li>${client.fullName} (${client.phone}) - ${client.email} 
                    <button onclick="editClient(${index})">Редагувати</button>
                    <button onclick="deleteClient(${index})">Видалити</button>
                </li>`;
        });
        content.innerHTML += '</ul>';
    }
}

function showAddClientForm() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Додати клієнта</h2>';
    content.innerHTML += `
        <form onsubmit="addClient(event)">
            <label for="fullName">Повне ім'я:</label><br>
            <input type="text" id="fullName" name="fullName" required><br>
            <label for="phone">Номер телефону:</label><br>
            <input type="tel" id="phone" name="phone" required><br>
            <label for="email">Електронна адреса:</label><br>
            <input type="email" id="email" name="email" required><br><br>
            <button type="submit">Додати</button>
        </form>
    `;
}

function addClient(event) {
    event.preventDefault();
    let fullName = document.getElementById('fullName').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    if (fullName && phone && email) {
        clients.push({ fullName, phone, email });
        saveClients(); // Зберігаємо клієнтів в локальному сховищі
        alert('Клієнт доданий успішно!');
        showClients();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function editClient(index) {
    let newFullName = prompt('Введіть нове повне ім\'я клієнта:');
    let newPhone = prompt('Введіть новий номер телефону клієнта:');
    let newEmail = prompt('Введіть нову електронну адресу клієнта:');
    if (newFullName && newPhone && newEmail) {
        clients[index].fullName = newFullName;
        clients[index].phone = newPhone;
        clients[index].email = newEmail;
        saveClients(); // Зберігаємо оновлені дані про клієнта в локальному сховищі
        alert('Дані клієнта успішно змінені!');
        showClients();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function deleteClient(index) {
    if (confirm('Ви впевнені, що хочете видалити цього клієнта?')) {
        clients.splice(index, 1);
        saveClients(); // Зберігаємо оновлений список клієнтів в локальному сховищі
        alert('Клієнт успішно видалений!');
        showClients();
    }
}

function showServices() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Список послуг</h2>';
    if (services.length === 0) {
        content.innerHTML += '<p>Немає послуг.</p>';
    } else {
        content.innerHTML += '<ul>';
        services.forEach((service, index) => {
            content.innerHTML += `
                <li>${service.name} - ${service.description} - ${service.price} грн
                    <button onclick="editService(${index})">Редагувати</button>
                    <button onclick="deleteService(${index})">Видалити</button>
                </li>`;
        });
        content.innerHTML += '</ul>';
    }
}

function showAddServiceForm() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Додати послугу</h2>';
    content.innerHTML += `
        <form onsubmit="addService(event)">
            <label for="name">Назва послуги:</label><br>
            <input type="text" id="name" name="name" required><br>
            <label for="description">Опис:</label><br>
            <textarea id="description" name="description" required></textarea><br>
            <label for="price">Ціна (грн):</label><br>
            <input type="number" id="price" name="price" min="0" required><br><br>
            <button type="submit">Додати</button>
        </form>
    `;
}

function addService(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = parseFloat(document.getElementById('price').value);
    if (name && description && !isNaN(price) && price >= 0) {
        services.push({ name, description, price });
        saveServices(); // Зберігаємо послуги в локальному сховищі
        alert('Послуга додана успішно!');
        showServices();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function editService(index) {
    let newName = prompt('Введіть нову назву послуги:');
    let newDescription = prompt('Введіть новий опис:');
    let newPrice = parseFloat(prompt('Введіть нову ціну (грн):'));
    if (newName && newDescription && !isNaN(newPrice) && newPrice >= 0) {
        services[index].name = newName;
        services[index].description = newDescription;
        services[index].price = newPrice;
        saveServices(); // Зберігаємо оновлені дані про послугу в локальному сховищі
        alert('Дані послуги успішно змінені!');
        showServices();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function deleteService(index) {
    if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
        services.splice(index, 1);
        saveServices(); // Зберігаємо оновлений список послуг в локальному сховищі
        alert('Послуга успішно видалена!');
        showServices();
    }
}

function showAds() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Список реклам</h2>';
    if (ads.length === 0) {
        content.innerHTML += '<p>Немає реклам.</p>';
    } else {
        content.innerHTML += '<ul>';
        ads.forEach((ad, index) => {
            let clientName = ad.client.fullName ? ad.client.fullName : 'Не вказано';
            let clientPhone = ad.client.phone ? ad.client.phone : 'Не вказано';
            let totalPrice = ad.service.price * ad.quantity;
            content.innerHTML += `
                <li>${clientName} (${clientPhone}) - ${ad.service.name} - ${ad.date} - Сума: ${totalPrice} грн
                    <button onclick="editAd(${index})">Редагувати</button>
                    <button onclick="deleteAd(${index})">Видалити</button>
                </li>`;
        });
        content.innerHTML += '</ul>';
    }
}

function showAddAdForm() {
    let content = document.getElementById('content');
    content.innerHTML = '<h2>Додати рекламу</h2>';
    content.innerHTML += `
        <form onsubmit="addAd(event)">
            <label for="client">Клієнт:</label><br>
            <select id="client" name="client" required>
                <option value="" disabled selected>Виберіть клієнта</option>
                ${clients.map((client, index) => `<option value="${index}">${client.fullName} (${client.phone})</option>`).join('')}
            </select><br>
            <label for="service">Послуга:</label><br>
            <select id="service" name="service" required>
                <option value="" disabled selected>Виберіть послугу</option>
                ${services.map((service, index) => `<option value="${index}">${service.name} - ${service.price} грн</option>`).join('')}
            </select><br>
            <label for="quantity">Кількість:</label><br>
            <input type="number" id="quantity" name="quantity" min="1" required><br><br>
            <button type="submit">Додати</button>
        </form>
    `;
}

function addAd(event) {
    event.preventDefault();
    let clientIndex = document.getElementById('client').value;
    let serviceIndex = document.getElementById('service').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let date = new Date().toLocaleDateString();
    if (clientIndex && serviceIndex && quantity > 0) {
        ads.push({
            client: clients[clientIndex],
            service: services[serviceIndex],
            quantity: quantity,
            date: date
        });
        saveAds(); // Зберігаємо реклами в локальному сховищі
        alert('Реклама додана успішно!');
        showAds();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function editAd(index) {
    let newClientIndex = prompt('Введіть новий індекс клієнта:');
    let newServiceIndex = prompt('Введіть новий індекс послуги:');
    let newQuantity = parseInt(prompt('Введіть нову кількість:'));
    if (newClientIndex && newServiceIndex && newQuantity > 0) {
        ads[index].client = clients[newClientIndex];
        ads[index].service = services[newServiceIndex];
        ads[index].quantity = newQuantity;
        saveAds(); // Зберігаємо оновлені дані про рекламу в локальному сховищі
        alert('Дані реклами успішно змінені!');
        showAds();
    } else {
        alert('Будь ласка, заповніть всі поля коректно.');
    }
}

function deleteAd(index) {
    if (confirm('Ви впевнені, що хочете видалити цю рекламу?')) {
        ads.splice(index, 1);
        saveAds(); // Зберігаємо оновлений список реклам в локальному сховищі
        alert('Реклама успішно видалена!');
        showAds();
    }
}
