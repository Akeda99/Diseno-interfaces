        function loadOrderData() {
            const orderData = JSON.parse(localStorage.getItem('currentOrder'));
            const checkoutContent = document.getElementById('checkoutContent');

            if (!orderData || !orderData.items || orderData.items.length === 0) {
                checkoutContent.innerHTML = `
                    <div class="empty-order">
                        <h3>😕 No hay productos en tu pedido</h3>
                        <p>Por favor regresa a la tienda y agrega productos a tu carrito.</p>
                        <a href="index.html" class="back-link" style="display: inline-block; margin-top: 1rem; padding: 0.8rem 2rem; background: #667eea; color: white; border-radius: 8px; text-decoration: none;">Volver a la Tienda</a>
                    </div>
                `;
                return;
            }

            const date = new Date(orderData.date);
            const formattedDate = date.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            checkoutContent.innerHTML = `
                <div class="user-info">
                    <h3>📋 Información del Cliente</h3>
                    <p><strong>Nombre:</strong> ${orderData.user.name}</p>
                    <p><strong>Email:</strong> ${orderData.user.email}</p>
                    <p class="order-date"><strong>Fecha del pedido:</strong> ${formattedDate}</p>
                </div>

                <div class="order-items">
                    <h3>🛍️ Productos en tu Pedido</h3>
                    ${orderData.items.map(item => `
                        <div class="item">
                            <img src="${item.image}" alt="${item.name}" class="item-image">
                            <div class="item-details">
                                <div class="item-name">${item.name}</div>
                                <div class="item-category">${item.category}</div>
                            </div>
                            <div class="item-price">
                                <div class="item-quantity">Cantidad: ${item.quantity}</div>
                                <div class="item-subtotal">S/.${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>S/.${orderData.total.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Envío:</span>
                        <span>Gratis</span>
                    </div>
                    <div class="summary-row">
                        <span>IVA (16%):</span>
                        <span>S/.${(orderData.total * 0.16).toFixed(2)}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total a Pagar:</span>
                        <span class="amount">S/.${(orderData.total * 1.16).toFixed(2)}</span>
                    </div>
                </div>

                <button class="next-button" onclick="proceedToPayment()">
                    Siguiente →
                </button>

                <a href="index.html" class="back-link">← Volver a la tienda</a>
            `;
        }

        function proceedToPayment() {
            // Redirigir a la página de pago
            window.location.href = 'payment.html';
        }

        // Cargar datos al cargar la página
        window.onload = loadOrderData;
