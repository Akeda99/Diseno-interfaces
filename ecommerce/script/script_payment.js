        let orderData = null;
        let selectedPaymentMethod = 'credit';

        // Cargar datos del pedido
        function loadOrderData() {
            orderData = JSON.parse(localStorage.getItem('currentOrder'));
            
            if (!orderData) {
                window.location.href = 'index.html';
                return;
            }

            displayOrderSummary();
        }

        // Mostrar resumen del pedido
        function displayOrderSummary() {
            const summaryDiv = document.getElementById('orderSummary');
            const total = orderData.total;
            const tax = total * 0.16;
            const finalTotal = total + tax;

            summaryDiv.innerHTML = `
                <div class="summary-row">
                    <span>Productos (${orderData.items.length}):</span>
                    <span>S/.${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Envío:</span>
                    <span style="color: #00b894;">Gratis</span>
                </div>
                <div class="summary-row">
                    <span>IVA (16%):</span>
                    <span>S/.${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total a Pagar:</span>
                    <span class="amount">S/.${finalTotal.toFixed(2)}</span>
                </div>
            `;
        }

        // Seleccionar método de pago
        function selectPaymentMethod(method) {
            selectedPaymentMethod = method;
            
            // Actualizar estilos de métodos de pago
            document.querySelectorAll('.payment-method').forEach(el => {
                el.classList.remove('selected');
            });
            event.target.closest('.payment-method').classList.add('selected');

            // Mostrar/ocultar detalles de tarjeta
            const cardDetails = document.getElementById('cardDetails');
            if (method === 'paypal') {
                cardDetails.classList.remove('active');
                document.getElementById('cardNumber').removeAttribute('required');
                document.getElementById('cardName').removeAttribute('required');
                document.getElementById('expiryDate').removeAttribute('required');
                document.getElementById('cvv').removeAttribute('required');
            } else {
                cardDetails.classList.add('active');
                document.getElementById('cardNumber').setAttribute('required', 'required');
                document.getElementById('cardName').setAttribute('required', 'required');
                document.getElementById('expiryDate').setAttribute('required', 'required');
                document.getElementById('cvv').setAttribute('required', 'required');
            }
        }

        // Formatear número de tarjeta
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Formatear fecha de vencimiento
        document.getElementById('expiryDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // Solo números en CVV
        document.getElementById('cvv').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Procesar pago
        function processPayment(event) {
            event.preventDefault();

            const payButton = document.getElementById('payButton');
            payButton.disabled = true;
            payButton.textContent = 'Procesando pago...';

            // Simular procesamiento de pago
            setTimeout(() => {
                // Limpiar datos del pedido
                localStorage.removeItem('currentOrder');
                
                // Limpiar carrito del usuario
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex(u => u.id === currentUser.id);
                    if (userIndex !== -1) {
                        users[userIndex].cart = [];
                        localStorage.setItem('users', JSON.stringify(users));
                        currentUser.cart = [];
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                }

                // Marcar que la compra fue exitosa
                localStorage.setItem('purchaseSuccess', 'true');
                localStorage.setItem('purchaseEmail', orderData.user.email);

                // Redirigir a la página principal
                window.location.href = 'index.html';
            }, 2000);
        }

        // Cargar datos al iniciar
        window.onload = loadOrderData;
  