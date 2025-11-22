
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Cerrar todas las preguntas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la pregunta clickeada si no estaba abierta
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        }

        // Smooth scroll para los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
 