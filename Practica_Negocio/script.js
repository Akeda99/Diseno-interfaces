document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const formControls = contactForm.querySelectorAll('.form-control, .form-select');
    
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
        } else if (field.id === 'telefono') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (field.value.trim() === '' || !phoneRegex.test(field.value.trim()) || field.value.trim().length < 8) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                return true;
            }
        } else if (field.id === 'fecha') {
            const selectedDate = new Date(field.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (field.value.trim() === '' || selectedDate < today) {
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
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const productosSection = document.querySelector('#servicios');
            if (productosSection) {
                const offsetTop = productosSection.offsetTop - 76;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content border-0">
                            <div class="modal-header border-0">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body p-0">
                                <img src="${img.src}" class="img-fluid" alt="${img.alt}">
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                modal.addEventListener('hidden.bs.modal', function() {
                    document.body.removeChild(modal);
                });
            }
        });
    });
    
    const today = new Date().toISOString().split('T')[0];
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.setAttribute('min', today);
    }
});

