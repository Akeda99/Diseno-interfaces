        const form = document.getElementById('contactForm');
        const successAlert = document.getElementById('successAlert');
        const formControls = form.querySelectorAll('.form-control');
        
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
        
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            successAlert.classList.add('d-none');
            
            let isValid = true;
            
            formControls.forEach(control => {
                if (control.id === 'email') {
                    if (control.value.trim() === '' || !validateEmail(control.value.trim())) {
                        control.classList.add('is-invalid');
                        control.classList.remove('is-valid');
                        isValid = false;
                    } else {
                        control.classList.remove('is-invalid');
                        control.classList.add('is-valid');
                    }
                } else {
                    if (!validateField(control)) {
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                successAlert.classList.remove('d-none');
                
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                setTimeout(() => {
                    form.reset();
                    formControls.forEach(control => {
                        control.classList.remove('is-valid', 'is-invalid');
                    });
                    successAlert.classList.add('d-none');
                }, 5000);
            } else {
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
            
            form.classList.add('was-validated');
        });