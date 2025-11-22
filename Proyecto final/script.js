// Estado global de la aplicación
const appState = {
    days: [],
    expenses: [],
    checklist: [],
    map: null,
    markers: [],
    currentDay: 1
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeItinerary();
    initializeCosts();
    initializeChecklist();
    initializeCurrency();
    loadFromLocalStorage();
});

// Sistema de Tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar active al seleccionado
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Si es la pestaña de mapas, inicializar el mapa
            if (targetTab === 'mapas' && !appState.map) {
                initMap();
            }
        });
    });
}

// ITINERARIO
function initializeItinerary() {
    document.getElementById('add-day-btn').addEventListener('click', addDay);
    loadItineraryFromStorage();
}

function addDay() {
    const startDate = document.getElementById('start-date').value;
    if (!startDate) {
        alert('Por favor, selecciona una fecha de inicio');
        return;
    }

    const dayNumber = appState.days.length + 1;
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayNumber - 1);
    
    const day = {
        id: Date.now(),
        number: dayNumber,
        date: date.toISOString().split('T')[0],
        activities: []
    };

    appState.days.push(day);
    renderItinerary();
    saveToLocalStorage();
}

function renderItinerary() {
    const container = document.getElementById('itinerary-days');
    container.innerHTML = '';

    appState.days.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">
                <div class="day-title">Día ${day.number} - ${formatDate(day.date)}</div>
                <button class="delete-day-btn" onclick="deleteDay(${day.id})">🗑️ Eliminar</button>
            </div>
            <div class="activities-list" id="activities-${day.id}"></div>
            <div class="add-activity-form">
                <input type="time" id="activity-time-${day.id}" class="input-field" style="max-width: 150px;">
                <input type="text" id="activity-name-${day.id}" placeholder="Actividad" class="input-field">
                <button class="btn-primary" onclick="addActivity(${day.id})">➕ Agregar</button>
            </div>
        `;
        container.appendChild(dayCard);
        renderActivities(day.id);
    });
}

function renderActivities(dayId) {
    const day = appState.days.find(d => d.id === dayId);
    if (!day) return;

    const container = document.getElementById(`activities-${dayId}`);
    container.innerHTML = '';

    day.activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <span class="activity-time">${activity.time}</span>
            <span class="activity-name">${activity.name}</span>
            <button class="delete-activity-btn" onclick="deleteActivity(${dayId}, ${activity.id})">Eliminar</button>
        `;
        container.appendChild(activityItem);
    });
}

function addActivity(dayId) {
    const day = appState.days.find(d => d.id === dayId);
    if (!day) return;

    const timeInput = document.getElementById(`activity-time-${dayId}`);
    const nameInput = document.getElementById(`activity-name-${dayId}`);

    if (!timeInput.value || !nameInput.value) {
        alert('Por favor, completa todos los campos');
        return;
    }

    const activity = {
        id: Date.now(),
        time: timeInput.value,
        name: nameInput.value
    };

    day.activities.push(activity);
    day.activities.sort((a, b) => a.time.localeCompare(b.time));
    
    renderActivities(dayId);
    saveToLocalStorage();
    
    timeInput.value = '';
    nameInput.value = '';
}

function deleteActivity(dayId, activityId) {
    const day = appState.days.find(d => d.id === dayId);
    if (day) {
        day.activities = day.activities.filter(a => a.id !== activityId);
        renderActivities(dayId);
        saveToLocalStorage();
    }
}

function deleteDay(dayId) {
    appState.days = appState.days.filter(d => d.id !== dayId);
    // Renumerar días
    appState.days.forEach((day, index) => {
        day.number = index + 1;
    });
    renderItinerary();
    saveToLocalStorage();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// CALCULADORA DE COSTOS
function initializeCosts() {
    document.getElementById('add-expense-btn').addEventListener('click', addExpense);
    renderExpenses();
    updateCostSummary();
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (!name || !amount || amount <= 0) {
        alert('Por favor, completa todos los campos correctamente');
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    appState.expenses.push(expense);
    renderExpenses();
    updateCostSummary();
    saveToLocalStorage();

    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
}

function renderExpenses() {
    const container = document.getElementById('expenses-list');
    container.innerHTML = '';

    appState.expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-info">
                <div class="expense-name">${expense.name}</div>
                <div class="expense-category">${getCategoryName(expense.category)}</div>
            </div>
            <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            <button class="delete-expense-btn" onclick="deleteExpense(${expense.id})">Eliminar</button>
        `;
        container.appendChild(expenseItem);
    });
}

function deleteExpense(expenseId) {
    appState.expenses = appState.expenses.filter(e => e.id !== expenseId);
    renderExpenses();
    updateCostSummary();
    saveToLocalStorage();
}

function updateCostSummary() {
    const categoryTotals = {};
    let grandTotal = 0;

    appState.expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
        grandTotal += expense.amount;
    });

    const container = document.getElementById('category-totals');
    container.innerHTML = '';

    Object.keys(categoryTotals).forEach(category => {
        const categoryTotal = document.createElement('div');
        categoryTotal.className = 'category-total';
        categoryTotal.innerHTML = `
            <strong>${getCategoryName(category)}</strong><br>
            $${categoryTotals[category].toFixed(2)}
        `;
        container.appendChild(categoryTotal);
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

function getCategoryName(category) {
    const names = {
        transporte: '🚗 Transporte',
        alojamiento: '🏨 Alojamiento',
        comida: '🍽️ Comida',
        actividades: '🎯 Actividades',
        compras: '🛍️ Compras',
        otros: '📦 Otros'
    };
    return names[category] || category;
}

// CHECKLIST
function initializeChecklist() {
    document.getElementById('add-checklist-btn').addEventListener('click', addChecklistItem);
    renderChecklist();
    updateChecklistStats();
}

function addChecklistItem() {
    const item = document.getElementById('checklist-item').value;
    const category = document.getElementById('checklist-category').value;

    if (!item) {
        alert('Por favor, ingresa un item');
        return;
    }

    const checklistItem = {
        id: Date.now(),
        text: item,
        category: category,
        completed: false
    };

    appState.checklist.push(checklistItem);
    renderChecklist();
    updateChecklistStats();
    saveToLocalStorage();

    document.getElementById('checklist-item').value = '';
}

function renderChecklist() {
    const container = document.getElementById('checklist-items');
    container.innerHTML = '';

    // Agrupar por categoría
    const grouped = {};
    appState.checklist.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
    });

    Object.keys(grouped).forEach(category => {
        grouped[category].forEach(item => {
            const checklistItem = document.createElement('div');
            checklistItem.className = `checklist-item ${item.completed ? 'completed' : ''}`;
            checklistItem.innerHTML = `
                <input type="checkbox" ${item.completed ? 'checked' : ''} 
                       onchange="toggleChecklistItem(${item.id})">
                <label>${item.text}</label>
                <span class="category-badge">${getCategoryIcon(item.category)}</span>
                <button class="delete-checklist-btn" onclick="deleteChecklistItem(${item.id})">Eliminar</button>
            `;
            container.appendChild(checklistItem);
        });
    });
}

function toggleChecklistItem(itemId) {
    const item = appState.checklist.find(i => i.id === itemId);
    if (item) {
        item.completed = !item.completed;
        renderChecklist();
        updateChecklistStats();
        saveToLocalStorage();
    }
}

function deleteChecklistItem(itemId) {
    appState.checklist = appState.checklist.filter(i => i.id !== itemId);
    renderChecklist();
    updateChecklistStats();
    saveToLocalStorage();
}

function updateChecklistStats() {
    const completed = appState.checklist.filter(i => i.completed).length;
    const total = appState.checklist.length;
    
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('total-count').textContent = total;
}

function getCategoryIcon(category) {
    const icons = {
        documentos: '📄',
        ropa: '👕',
        electronica: '📱',
        salud: '💊',
        otros: '📦'
    };
    return icons[category] || '📦';
}

// MAPAS (Leaflet con OpenStreetMap - Sin API Key)
function initMap() {
    if (appState.map) return;

    // Inicializar mapa con Leaflet
    appState.map = L.map('map').setView([-12.0464, -77.0428], 10); // Lima, Perú por defecto

    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(appState.map);

    // Buscar ubicación
    document.getElementById('search-location-btn').addEventListener('click', searchLocation);
    document.getElementById('add-marker-btn').addEventListener('click', addCurrentLocationMarker);
    document.getElementById('clear-markers-btn').addEventListener('click', clearMarkers);
}

async function searchLocation() {
    const address = document.getElementById('location-input').value;

    if (!address) {
        alert('Por favor, ingresa una dirección');
        return;
    }

    try {
        // Usar Nominatim (geocodificador gratuito de OpenStreetMap)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'TravelPlanner/1.0' // Requerido por Nominatim
                }
            }
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            const displayName = data[0].display_name;

            // Centrar mapa en la ubicación
            appState.map.setView([lat, lng], 15);

            // Agregar marcador
            const marker = L.marker([lat, lng]).addTo(appState.map);
            marker.bindPopup(`<b>${displayName}</b>`).openPopup();

            appState.markers.push({ marker, address: displayName, lat, lng });
            addLocationTag(displayName);
        } else {
            alert('No se pudo encontrar la ubicación. Intenta con una búsqueda más específica.');
        }
    } catch (error) {
        console.error('Error al buscar ubicación:', error);
        alert('Error al buscar la ubicación. Por favor, verifica tu conexión.');
    }
}

function addCurrentLocationMarker() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Centrar mapa en la ubicación actual
            appState.map.setView([lat, lng], 15);

            // Agregar marcador
            const marker = L.marker([lat, lng]).addTo(appState.map);
            marker.bindPopup('<b>Mi ubicación actual</b>').openPopup();

            appState.markers.push({ 
                marker, 
                address: 'Mi ubicación actual', 
                lat, 
                lng 
            });
            addLocationTag('Mi ubicación actual');
        }, (error) => {
            alert('Error al obtener tu ubicación: ' + error.message);
        });
    } else {
        alert('La geolocalización no está disponible en tu navegador');
    }
}

function clearMarkers() {
    appState.markers.forEach(({ marker }) => {
        appState.map.removeLayer(marker);
    });
    appState.markers = [];
    document.getElementById('saved-locations').innerHTML = '';
}

function addLocationTag(address) {
    const container = document.getElementById('saved-locations');
    const tag = document.createElement('div');
    tag.className = 'location-tag';
    const shortAddress = address.length > 30 ? address.substring(0, 30) + '...' : address;
    tag.innerHTML = `
        ${shortAddress}
        <span class="remove-location" onclick="removeLocation('${address.replace(/'/g, "\\'")}')">×</span>
    `;
    container.appendChild(tag);
}

function removeLocation(address) {
    const index = appState.markers.findIndex(m => m.address === address);
    if (index !== -1) {
        appState.map.removeLayer(appState.markers[index].marker);
        appState.markers.splice(index, 1);
    }
    // Remover el tag
    const tags = document.querySelectorAll('.location-tag');
    tags.forEach(tag => {
        if (tag.textContent.includes(address.substring(0, 30))) {
            tag.remove();
        }
    });
}

// CONVERSIÓN DE MONEDA
function initializeCurrency() {
    document.getElementById('convert-btn').addEventListener('click', convertCurrency);
    
    // Convertir al cambiar la cantidad
    document.getElementById('amount-input').addEventListener('input', convertCurrency);
    document.getElementById('from-currency').addEventListener('change', convertCurrency);
    document.getElementById('to-currency').addEventListener('change', convertCurrency);
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount-input').value);
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;

    if (!amount || amount <= 0) {
        document.getElementById('converted-amount').value = '';
        document.getElementById('exchange-rate').innerHTML = '';
        return;
    }

    if (from === to) {
        document.getElementById('converted-amount').value = amount.toFixed(2);
        document.getElementById('exchange-rate').innerHTML = 'Las monedas son iguales';
        return;
    }

    try {
        // Usar ExchangeRate-API (gratuita, sin API key necesaria para uso básico)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        
        if (data.rates && data.rates[to]) {
            const rate = data.rates[to];
            const converted = amount * rate;
            
            document.getElementById('converted-amount').value = converted.toFixed(2);
            document.getElementById('exchange-rate').innerHTML = 
                `Tasa de cambio: 1 ${from} = ${rate.toFixed(4)} ${to}`;
        } else {
            throw new Error('Moneda no encontrada');
        }
    } catch (error) {
        console.error('Error al convertir moneda:', error);
        // Fallback: usar tasas aproximadas si la API falla
        const fallbackRates = getFallbackRates(from, to);
        if (fallbackRates) {
            const converted = amount * fallbackRates;
            document.getElementById('converted-amount').value = converted.toFixed(2);
            document.getElementById('exchange-rate').innerHTML = 
                `Tasa aproximada: 1 ${from} = ${fallbackRates.toFixed(4)} ${to} (modo offline)`;
        } else {
            document.getElementById('exchange-rate').innerHTML = 
                'Error al obtener la tasa de cambio. Por favor, verifica tu conexión.';
        }
    }
}

function getFallbackRates(from, to) {
    // Tasas aproximadas como fallback (actualizar periódicamente)
    const rates = {
        'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150, 'MXN': 17, 'PEN': 3.7, 'ARS': 850, 'BRL': 5.0 },
        'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 163, 'MXN': 18.5, 'PEN': 4.0, 'ARS': 925, 'BRL': 5.4 },
        'GBP': { 'USD': 1.27, 'EUR': 1.16, 'JPY': 190, 'MXN': 21.5, 'PEN': 4.7, 'ARS': 1080, 'BRL': 6.3 },
        'MXN': { 'USD': 0.059, 'EUR': 0.054, 'GBP': 0.047, 'JPY': 8.8, 'PEN': 0.22, 'ARS': 50, 'BRL': 0.29 },
        'PEN': { 'USD': 0.27, 'EUR': 0.25, 'GBP': 0.21, 'JPY': 40.5, 'MXN': 4.6, 'ARS': 230, 'BRL': 1.35 },
        'ARS': { 'USD': 0.0012, 'EUR': 0.0011, 'GBP': 0.00093, 'JPY': 0.18, 'MXN': 0.02, 'PEN': 0.0043, 'BRL': 0.0059 },
        'BRL': { 'USD': 0.20, 'EUR': 0.18, 'GBP': 0.16, 'JPY': 30, 'MXN': 3.4, 'PEN': 0.74, 'ARS': 170 }
    };
    
    return rates[from] && rates[from][to] ? rates[from][to] : null;
}

// LOCAL STORAGE
function saveToLocalStorage() {
    localStorage.setItem('travelPlanner_days', JSON.stringify(appState.days));
    localStorage.setItem('travelPlanner_expenses', JSON.stringify(appState.expenses));
    localStorage.setItem('travelPlanner_checklist', JSON.stringify(appState.checklist));
}

function loadFromLocalStorage() {
    const savedDays = localStorage.getItem('travelPlanner_days');
    const savedExpenses = localStorage.getItem('travelPlanner_expenses');
    const savedChecklist = localStorage.getItem('travelPlanner_checklist');

    if (savedDays) {
        appState.days = JSON.parse(savedDays);
        renderItinerary();
    }

    if (savedExpenses) {
        appState.expenses = JSON.parse(savedExpenses);
        renderExpenses();
        updateCostSummary();
    }

    if (savedChecklist) {
        appState.checklist = JSON.parse(savedChecklist);
        renderChecklist();
        updateChecklistStats();
    }
}

function loadItineraryFromStorage() {
    // Ya se carga en loadFromLocalStorage
}