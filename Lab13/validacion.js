document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
    const regexApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
    const regexDni = /^\d{8}$/; 
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    
    function validarCampo(input, regex, errorElementId, mensajeError) {
        const valor = input.value.trim();
        const errorElement = document.getElementById(errorElementId);
        
        if (valor === '') {
            errorElement.textContent = 'Este campo es obligatorio';
            input.classList.add('error');
            return false;
        }
        
        if (!regex.test(valor)) {
            errorElement.textContent = mensajeError;
            input.classList.add('error');
            return false;
        }
        
        errorElement.textContent = '';
        input.classList.remove('error');
        return true;
    }
    
    
    document.getElementById('nombre').addEventListener('blur', function() {
        validarCampo(
            this, 
            regexNombre, 
            'errorNombre', 
            'El nombre solo debe contener letras'
        );
    });
    
    document.getElementById('apellido').addEventListener('blur', function() {
        validarCampo(
            this, 
            regexApellido, 
            'errorApellido', 
            'El apellido solo debe contener letras'
        );
    });
    
    document.getElementById('dni').addEventListener('blur', function() {
        validarCampo(
            this, 
            regexDni, 
            'errorDni', 
            'El DNI debe contener exactamente 8 dígitos'
        );
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        validarCampo(
            this, 
            regexEmail, 
            'errorEmail', 
            'Ingrese un correo válido (debe contener @)'
        );
    });
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const dni = document.getElementById('dni');
        const email = document.getElementById('email');
        
        
        const nombreValido = validarCampo(
            nombre, 
            regexNombre, 
            'errorNombre', 
            'El nombre solo debe contener letras'
        );
        
        const apellidoValido = validarCampo(
            apellido, 
            regexApellido, 
            'errorApellido', 
            'El apellido solo debe contener letras'
        );
        
        const dniValido = validarCampo(
            dni, 
            regexDni, 
            'errorDni', 
            'El DNI debe contener exactamente 8 dígitos'
        );
        
        const emailValido = validarCampo(
            email, 
            regexEmail, 
            'errorEmail', 
            'Ingrese un correo válido (debe contener @)'
        );
        
        
        if (nombreValido && apellidoValido && dniValido && emailValido) {
            alert('Datos ingresados con éxito');
            
            form.reset(); 
        } else {
            alert('Datos Incorrectos, por favor revise los datos ingresados');
        }
    });
    
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});