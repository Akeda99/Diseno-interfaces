        function openModal(type) {
            if (type === 'trabajo') {
                document.getElementById('modalTrabajo').classList.add('active');
            } else {
                document.getElementById('modalDistribuidor').classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        }

        function closeModal(type) {
            if (type === 'trabajo') {
                document.getElementById('modalTrabajo').classList.remove('active');
            } else {
                document.getElementById('modalDistribuidor').classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }

        function submitForm(event, type) {
            event.preventDefault();
            
            // Simular envío del formulario
            const form = event.target;
            const submitBtn = form.querySelector('.submit-btn');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Mostrar mensaje de éxito
                if (type === 'trabajo') {
                    document.getElementById('successTrabajo').classList.add('show');
                } else {
                    document.getElementById('successDistribuidor').classList.add('show');
                }
                
                // Resetear formulario
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Solicitud';
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    if (type === 'trabajo') {
                        document.getElementById('successTrabajo').classList.remove('show');
                    } else {
                        document.getElementById('successDistribuidor').classList.remove('show');
                    }
                }, 5000);
                
                // Cerrar modal después de 3 segundos
                setTimeout(() => {
                    closeModal(type);
                }, 3000);
            }, 2000);
        }

        // Cerrar modal al hacer click fuera
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
