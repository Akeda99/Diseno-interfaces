let orderData = null;
let selectedPaymentMethod = 'credit';

// Validadores RegEx
const validators = {
    cardNumber: /^(\d{4}\s?){3}\d{4}$/,
    cvv: /^\d{3,4}$/,
    expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
    cardName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{9}$/,
    address: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.-]{5,100}$/,
    zipCode: /^\d{5}$/,
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/
};

const errorMsg = {
    cardNumber: 'Número de tarjeta inválido (16 dígitos)',
    cvv: 'CVV inválido (3-4 dígitos)',
    expiryDate: 'Fecha inválida (MM/YY)',
    cardName: 'Nombre inválido',
    email: 'Email inválido',
    phone: 'Teléfono inválido (9 dígitos)',
    address: 'Dirección inválida',
    zipCode: 'Código postal inválido (5 dígitos)',
    name: 'Nombre inválido',
    required: 'Campo obligatorio'
};

// Validar campo
const validateField = (val, type) => val?.trim() && validators[type]?.test(val.trim());

// Validar tarjeta no vencida
const validateExpiryNotExpired = (date) => {
    if (!validators.expiryDate.test(date)) return false;
    const [m, y] = date.split('/');
    const exp = new Date(2000 + +y, +m - 1);
    const now = new Date();
    now.setDate(1);
    return exp >= now;
};

// Tipo de tarjeta
const validateCardType = (num) => {
    const clean = num.replace(/\s/g, '');
    if (/^4/.test(clean)) return 'Visa';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    return 'Desconocida';
};

// Mostrar/limpiar error
const showError = (id, msg) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    const err = inp.parentElement.querySelector('.field-error');
    if (err) err.remove();
    inp.style.border = '2px solid #d63031';
    const div = document.createElement('div');
    div.className = 'field-error';
    div.style.cssText = 'color:#d63031;font-size:0.85rem;margin-top:0.25rem;animation:shake 0.3s';
    div.textContent = msg;
    inp.parentElement.appendChild(div);
};

const clearError = (id) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.style.border = '';
    inp.parentElement.querySelector('.field-error')?.remove();
};

// Cargar orden
function loadOrderData() {
    orderData = JSON.parse(localStorage.getItem('currentOrder'));
    if (!orderData) {
        window.location.href = 'index.html';
        return;
    }
    const sum = document.getElementById('orderSummary');
    const tot = orderData.total;
    const tax = tot * 0.16;
    sum.innerHTML = `
        <div class="summary-row"><span>Productos (${orderData.items.length}):</span><span>S/.${tot.toFixed(2)}</span></div>
        <div class="summary-row"><span>Envío:</span><span style="color:#00b894">Gratis</span></div>
        <div class="summary-row"><span>IVA (16%):</span><span>S/.${tax.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total a Pagar:</span><span class="amount">S/.${(tot+tax).toFixed(2)}</span></div>
    `;
}

// Seleccionar método de pago
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
    document.querySelector(`input[value="${method}"]`)?.closest('.payment-method')?.classList.add('selected');
    const det = document.getElementById('cardDetails');
    const req = method !== 'paypal';
    det.classList.toggle('active', req);
    ['cardNumber', 'cardName', 'expiryDate', 'cvv'].forEach(id => {
        document.getElementById(id)?.[req ? 'setAttribute' : 'removeAttribute']('required', 'required');
    });
}

// Event listeners
const setupInput = (id, format, validate) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    if (format) inp.addEventListener('input', format);
    if (validate) inp.addEventListener('blur', validate);
};

setupInput('cardNumber', 
    (e) => {
        clearError('cardNumber');
        let v = e.target.value.replace(/[^\d\s]/g, '');
        const d = v.replace(/\s/g, '');
        if (d.length > 16) v = d.slice(0, 16);
        e.target.value = v.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || v.replace(/\s/g, '');
        if (d.length >= 4) {
            const ind = document.getElementById('cardTypeIndicator');
            if (ind) {
                const type = validateCardType(e.target.value);
                ind.textContent = `Tipo: ${type}`;
                ind.style.color = type !== 'Desconocida' ? '#00b894' : '#888';
            }
        }
    },
    (e) => e.target.value && !validateField(e.target.value, 'cardNumber') && showError('cardNumber', errorMsg.cardNumber)
);

setupInput('expiryDate',
    (e) => {
        clearError('expiryDate');
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 4) v = v.slice(0, 4);
        if (v.length >= 2) {
            const m = v.slice(0, 2);
            const y = v.slice(2, 4);
            v = (+m > 12 ? '12' : +m === 0 ? '01' : m) + (y ? '/' + y : '');
        }
        e.target.value = v;
    },
    (e) => {
        const v = e.target.value.trim();
        if (v && !validateField(v, 'expiryDate')) showError('expiryDate', errorMsg.expiryDate);
        else if (v && !validateExpiryNotExpired(v)) showError('expiryDate', 'Tarjeta vencida');
    }
);

setupInput('cvv',
    (e) => {
        clearError('cvv');
        let v = e.target.value.replace(/\D/g, '');
        e.target.value = v.length > 4 ? v.slice(0, 4) : v;
    },
    (e) => e.target.value && !validateField(e.target.value, 'cvv') && showError('cvv', errorMsg.cvv)
);

setupInput('cardName',
    (e) => {
        clearError('cardName');
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    },
    (e) => e.target.value && !validateField(e.target.value, 'cardName') && showError('cardName', errorMsg.cardName)
);

// Validar info de envío
const validateShipping = () => {
    let ok = true;
    const fields = [
        ['fullName', 'name'], ['phone', 'phone'], ['address', 'address'],
        ['postalCode', 'zipCode'], ['city', 'name'], ['state', 'name']
    ];
    fields.forEach(([id, type]) => {
        const el = document.getElementById(id);
        if (el?.value) {
            const v = id === 'phone' ? el.value.replace(/[\s\-\+]/g, '') : el.value;
            if (!validateField(v, type)) {
                showError(id, errorMsg[type] || 'Inválido');
                ok = false;
            } else clearError(id);
        }
    });
    return ok;
};

// Procesar pago
function processPayment(e) {
    e.preventDefault();
    let err = false;

    if (selectedPaymentMethod !== 'paypal') {
        ['cardNumber', 'cardName', 'expiryDate', 'cvv'].forEach(id => {
            const v = document.getElementById(id)?.value.trim();
            if (!v) {
                showError(id, errorMsg.required);
                err = true;
            } else if (!validateField(v, id)) {
                showError(id, errorMsg[id]);
                err = true;
            } else if (id === 'expiryDate' && !validateExpiryNotExpired(v)) {
                showError(id, 'Tarjeta vencida');
                err = true;
            } else clearError(id);
        });
    }

    if (!validateShipping()) err = true;

    if (err) {
        showMessage('Corrija los errores', 'error');
        return;
    }

    const btn = document.getElementById('payButton');
    btn.disabled = true;
    btn.textContent = 'Procesando...';

    setTimeout(() => {
        localStorage.removeItem('currentOrder');
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const idx = users.findIndex(u => u.id === user.id);
            if (idx !== -1) {
                users[idx].cart = [];
                localStorage.setItem('users', JSON.stringify(users));
                user.cart = [];
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }
        localStorage.setItem('purchaseSuccess', 'true');
        localStorage.setItem('purchaseEmail', orderData.user.email);
        window.location.href = 'index.html';
    }, 2000);
}

// Mensaje toast
const showMessage = (msg, type) => {
    const div = document.createElement('div');
    div.style.cssText = `position:fixed;top:100px;right:20px;padding:1rem 2rem;background:${type==='success'?'#00b894':'#d63031'};color:white;border-radius:8px;z-index:3000;animation:slideIn 0.3s;box-shadow:0 4px 12px rgba(0,0,0,0.2)`;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.animation = 'slideOut 0.3s';
        setTimeout(() => div.remove(), 300);
    }, 3000);
};

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('cardNumber');
    if (inp && !document.getElementById('cardTypeIndicator')) {
        const ind = document.createElement('div');
        ind.id = 'cardTypeIndicator';
        ind.style.cssText = 'font-size:0.85rem;margin-top:0.25rem;color:#888';
        inp.parentElement.appendChild(ind);
    }
});

const style = document.createElement('style');
style.textContent = `
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}
`;
document.head.appendChild(style);

window.onload = loadOrderData;