let cartCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cartCount');
    const contactForm = document.getElementById('contactForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            cartCountElement.style.animation = 'none';
            setTimeout(() => {
                cartCountElement.style.animation = 'pulse 0.3s ease';
            }, 10);
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check"></i> Agregado';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
                this.disabled = false;
            }, 1500);
        });
    });
    
    const formControls = contactForm.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            validateField(this);
        });
        
        control.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value.trim() === '' || !emailRegex.test(field.value.trim())) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                return true;
            }
        } else {
            if (field.value.trim() === '') {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                return true;
            }
        }
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        let isValid = true;
        
        formControls.forEach(control => {
            if (!validateField(control)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            successModal.show();
            contactForm.reset();
            formControls.forEach(control => {
                control.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        
        contactForm.classList.add('was-validated');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 76;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

