        // Products Data
        const products = [
            { id: 1, name: "Laptop Pro 2024", category: "Laptops", brand: "TechPro", price: 1299.99, image: "img/laptop.jpg" },
            { id: 2, name: "Smartphone X Plus", category: "Smartphones", brand: "SmartTech", price: 899.99, image: "img/smartphone.jpg" },
            { id: 3, name: "Auriculares Pro Noise", category: "Audio", brand: "SoundMax", price: 249.99, image: "img/auriculares.jpg" },
            { id: 4, name: "Tablet Ultra HD", category: "Laptops", brand: "TechPro", price: 599.99, image: "img/tablet.jpg" },
            { id: 5, name: "Smartwatch Fitness", category: "Accesorios", brand: "SmartTech", price: 299.99, image: "img/smartwatch.jpg" },
            { id: 6, name: "Teclado Mecánico RGB", category: "Accesorios", brand: "TechPro", price: 129.99, image: "img/teclado.jpg" },
            { id: 7, name: "Mouse Gaming Pro", category: "Accesorios", brand: "TechPro", price: 79.99, image: "img/mouse.jpg" },
            { id: 8, name: "Cámara Web 4K", category: "Accesorios", brand: "SmartTech", price: 149.99, image: "img/camara.jpg" },
            { id: 9, name: "Altavoz Bluetooth", category: "Audio", brand: "SoundMax", price: 89.99, image: "img/altavoz.jpg" },
            { id: 10, name: "Smartphone Mini", category: "Smartphones", brand: "SmartTech", price: 499.99, image: "img/smartphonemini.jpg" },
            { id: 11, name: "Laptop Gaming", category: "Laptops", brand: "TechPro", price: 1799.99, image: "img/laptopgaming.jpg" },
            { id: 12, name: "Auriculares Deportivos", category: "Audio", brand: "SoundMax", price: 79.99, image: "img/auricularesdeportivos.png" }
        ];

        let currentProducts = [...products];

        // Initialize products
        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = productsToShow.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <div class="product-price">S/.${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    </div>
                </div>
            `).join('');
            
            document.getElementById('productCount').textContent = `Mostrando ${productsToShow.length} productos`;
        }

        // Filter products
        function filterProducts() {
            let filtered = [...products];

            // Category filters
            const categories = [];
            if (document.getElementById('laptops').checked) categories.push('Laptops');
            if (document.getElementById('smartphones').checked) categories.push('Smartphones');
            if (document.getElementById('audio').checked) categories.push('Audio');
            if (document.getElementById('accesorios').checked) categories.push('Accesorios');

            if (categories.length > 0) {
                filtered = filtered.filter(p => categories.includes(p.category));
            }

            // Brand filters
            const brands = [];
            if (document.getElementById('techpro').checked) brands.push('TechPro');
            if (document.getElementById('soundmax').checked) brands.push('SoundMax');
            if (document.getElementById('smarttech').checked) brands.push('SmartTech');

            if (brands.length > 0) {
                filtered = filtered.filter(p => brands.includes(p.brand));
            }

            // Price filter
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

            currentProducts = filtered;
            sortProducts();
        }

        // Sort products
        function sortProducts() {
            const sortValue = document.getElementById('sortSelect').value;
            let sorted = [...currentProducts];

            switch(sortValue) {
                case 'price-asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }

            displayProducts(sorted);
        }

        // Carousel functionality
        let currentSlide = 0;
        const totalSlides = 3;

        function updateCarousel() {
            const track = document.getElementById('carouselTrack');
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Initialize
        displayProducts(products);

        // Auth System
        let currentUser = null;
        let cart = [];
        let users = JSON.parse(localStorage.getItem('users')) || [];

        function openLoginModal() {
            document.getElementById('authModal').classList.add('active');
            showLoginForm();
        }

        function closeAuthModal() {
            document.getElementById('authModal').classList.remove('active');
            document.getElementById('loginError').classList.remove('show');
            document.getElementById('registerError').classList.remove('show');
        }

        function showLoginForm() {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
        }

        function showRegisterForm() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                loadUserCart();
                updateUserSection();
                closeAuthModal();
                showMessage('¡Bienvenido de vuelta!', 'success');
            } else {
                const errorDiv = document.getElementById('loginError');
                errorDiv.textContent = 'Correo o contraseña incorrectos';
                errorDiv.classList.add('show');
            }
        }

        function handleRegister(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            if (users.find(u => u.email === email)) {
                const errorDiv = document.getElementById('registerError');
                errorDiv.textContent = 'Este correo ya está registrado';
                errorDiv.classList.add('show');
                return;
            }

            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password,
                cart: []
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            updateUserSection();
            closeAuthModal();
            showMessage('¡Cuenta creada exitosamente!', 'success');
        }

        function logout() {
            currentUser = null;
            cart = [];
            localStorage.removeItem('currentUser');
            updateUserSection();
            updateCartCount();
            showMessage('Sesión cerrada correctamente', 'success');
        }

        function updateUserSection() {
            const userSection = document.getElementById('userSection');
            
            if (currentUser) {
                const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                userSection.innerHTML = `
                    <div class="user-info">
                        <div class="user-avatar">${initials}</div>
                        <span>${currentUser.name.split(' ')[0]}</span>
                        <button class="logout-btn" onclick="logout()">Salir</button>
                    </div>
                `;
            } else {
                userSection.innerHTML = `
                    <button class="login-btn" onclick="openLoginModal()">Iniciar Sesión</button>
                `;
            }
        }

        function loadUserCart() {
            if (currentUser) {
                const user = users.find(u => u.id === currentUser.id);
                cart = user.cart || [];
                updateCartCount();
            }
        }

        function saveUserCart() {
            if (currentUser) {
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                users[userIndex].cart = cart;
                localStorage.setItem('users', JSON.stringify(users));
                currentUser.cart = cart;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }

        function addToCart(productId) {
            if (!currentUser) {
                showMessage('Por favor inicia sesión para agregar productos al carrito', 'warning');
                openLoginModal();
                return;
            }

            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            saveUserCart();
            updateCartCount();
            showMessage('Producto agregado al carrito', 'success');
        }

        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }

        function openCart() {
            if (!currentUser) {
                showMessage('Por favor inicia sesión para ver tu carrito', 'warning');
                openLoginModal();
                return;
            }

            displayCart();
            document.getElementById('cartModal').classList.add('active');
        }

        function closeCartModal() {
            document.getElementById('cartModal').classList.remove('active');
        }

        function displayCart() {
            const cartContent = document.getElementById('cartContent');
            
            if (cart.length === 0) {
                cartContent.innerHTML = '<p style="text-align: center; padding: 2rem; color: #888;">Tu carrito está vacío</p>';
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            cartContent.innerHTML = `
                <div style="max-height: 400px; overflow-y: auto;">
                    ${cart.map(item => `
                        <div style="display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
                            <img src="${item.image}" style="width: 60px; height: 60px; object-fit: contain; margin-right: 1rem;">
                            <div style="flex: 1;">
                                <h4>${item.name}</h4>
                                <p style="color: #667eea; font-weight: bold;">${item.price.toFixed(2)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <button onclick="updateQuantity(${item.id}, -1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 5px;">-</button>
                                <span style="font-weight: bold;">${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 5px;">+</button>
                                <button onclick="removeFromCart(${item.id})" style="color: #d63031; border: none; background: none; cursor: pointer; font-size: 1.2rem;">🗑️</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 2px solid #333;">
                    <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
                        <span>Total:</span>
                        <span style="color: #667eea;">S/.${total.toFixed(2)}</span>
                    </div>
                    <button class="submit-btn" onclick="proceedCheckout()">Proceder al Pago</button>
                </div>
            `;
        }

        function updateQuantity(productId, change) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveUserCart();
                    updateCartCount();
                    displayCart();
                }
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveUserCart();
            updateCartCount();
            displayCart();
        }

        function proceedCheckout() {
            if (!currentUser || cart.length === 0) {
                showMessage('No hay productos en el carrito', 'warning');
                return;
            }

            // Guardar datos del pedido en localStorage
            const orderData = {
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                user: {
                    name: currentUser.name,
                    email: currentUser.email
                },
                date: new Date().toISOString()
            };
            
            localStorage.setItem('currentOrder', JSON.stringify(orderData));
            
            // Redirigir a la página de checkout
            window.location.href = 'checkout.html';
        }

        function showMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 2rem;
                background: ${type === 'success' ? '#00b894' : type === 'warning' ? '#fdcb6e' : '#d63031'};
                color: white;
                border-radius: 8px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
            messageDiv.textContent = message;
            document.body.appendChild(messageDiv);

            setTimeout(() => {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => messageDiv.remove(), 300);
            }, 3000);
        }

        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            loadUserCart();
            updateUserSection();
        }

        // Check if purchase was successful
        const purchaseSuccess = localStorage.getItem('purchaseSuccess');
        if (purchaseSuccess === 'true') {
            const email = localStorage.getItem('purchaseEmail') || 'su correo';
            localStorage.removeItem('purchaseSuccess');
            localStorage.removeItem('purchaseEmail');
            
            setTimeout(() => {
                showPurchaseSuccessModal(email);
            }, 500);
        }

        function showPurchaseSuccessModal(email) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;

            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 3rem;
                    border-radius: 15px;
                    max-width: 500px;
                    text-align: center;
                    animation: slideUp 0.5s ease;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
                        border-radius: 50%;
                        margin: 0 auto 1.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 3rem;
                    ">✓</div>
                    <h2 style="color: #00b894; font-size: 2rem; margin-bottom: 1rem;">¡Compra Realizada con Éxito!</h2>
                    <p style="color: #666; font-size: 1.1rem; margin-bottom: 0.5rem;">
                        Su pedido ha sido procesado correctamente.
                    </p>
                    <p style="color: #888; font-size: 1rem; margin-bottom: 2rem;">
                        Hemos enviado un correo de confirmación a:<br>
                        <strong style="color: #667eea;">${email}</strong>
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        padding: 1rem 3rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 25px;
                        font-size: 1.1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: transform 0.3s;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        Continuar Comprando
                    </button>
                </div>
            `;

            document.body.appendChild(modal);

            // Cerrar al hacer click fuera del modal
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
            }
        }

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
