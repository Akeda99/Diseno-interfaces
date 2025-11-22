
// Función auxiliar para mostrar resultados
        function mostrarResultado(id, contenido) {
            const resultado = document.getElementById(id);
            resultado.innerHTML = contenido;
            resultado.classList.add('show');
        }

        // EJERCICIO 1: 
       /* Escribe un programa en JavaScript que solicite al usuario un número N. Luego, el programa deberá pedirle al usuario que ingrese N nombres y almacenarlos en una lista. Finalmente, mostrará la lista completa de nombres ingresados.
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta.*/

        function ejercicio1() {
            let lista=[]
            let  solicitar = parseInt(prompt("Ingrese la cantidad de nombres que quiere ingresar: "))
            for(i=1; i<=solicitar;i++){
                let nombre= prompt(`Ingrese el nombre del alumno ${i}:`)
                lista.push(nombre)
            }
            alert(`Los nombres de los alumnos son: ${lista}`)
            
        }
       /* Elabore un programa en JavaScript usando estructuras iterativas (For o While, usted elije), el programa solicitará un valor numérico N, la estructura se repetirá N veces y cada vez que se ejecute agregará un nuevo elemento en un arreglo.
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta.*/

        // EJERCICIO 2: 
        function ejercicio2() {
            let lista=[]
            let i=1
            let  solicitar = parseInt(prompt("Ingrese la cantidad de elementos a ingresar: "))
            while(i<=solicitar){
                let elemento= prompt(`Ingrese el elemento ${i}: `)
                lista.push(elemento)
                i++
            }
            alert(`Estos son los elementos de la lista: ${lista}`)
        }
        /*Elabore un programa en JavaScript que permita ingresar N números y los almacene en una lista y al finalizar el registro muestre el promedio de esos números.
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta.*/

        // EJERCICIO 3: 
        function ejercicio3() {
            let lista=[]
            let solicitar = parseInt(prompt("Ingrese la cantidad de numeros a ingresar: "))
            for(i=1; i<=solicitar; i++){
                let numero = parseInt(prompt("Digite el numero: "))
                lista.push(numero)
            }
            alert(`La lista de numeros son: ${lista}`)
        }

        // EJERCICIO 4: 
        /*Elabore un programa en JavaScript que calcule e imprima la suma, el promedio, el mayor y el menor de N valores ingresados en una lista.
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta

        */
        function ejercicio4() {
            let lista=[]
            let suma=0
            let solicitar = parseInt(prompt("Ingrese la cantidad de numeros a ingresar: "))
            for(let i=1; i<=solicitar; i++){
                let numero = parseInt(prompt("Digite el numero: "))
                suma += numero
                lista.push(numero)
            }
            let promedio = suma/solicitar
            let mayor= Math.max(...lista)
            let menor = Math.min(...lista)
            alert(` La suma es: ${suma} \n El promedio es: ${promedio} \n El mayor es: ${mayor} \n El menor es: ${menor} `)
        }
        /*Elabore un programa en JavaScript que almacene 10 números en una lista y calcule cuantos números de la lista son pares e impares.
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta. */

        // EJERCICIO 5: 
        function ejercicio5() {
            let lista =[]
            let contadorpar=0
            let contadorimpar=0
            for(let i=1; i<=10;i++){
                let solicitar = parseInt(prompt("Ingrese el numero: "))
                lista.push(solicitar)
                if(solicitar%2==0){
                    contadorpar++
                }else{
                    contadorimpar++
                }
            }
            alert(`Cantidad de Numeros Pares: ${contadorpar} \n Cantidad de Numeros Impares: ${contadorimpar}`)
        }
        /*Elabore un programa en JavaScript que contenga un objeto, este objeto tendrá por lo menos 5 propiedades, dos de ellas serán del tipo método. Muestre las propiedades de su objeto y ejecute los dos métodos. 
Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta. */

        // EJERCICIO 6: 
        function ejercicio6() {
            let persona ={
                nombre: "",
                edad: 0,
                ciudad: "",
                presentarse: function(){
                return `Hola, soy ${this.nombre}, tengo ${this.edad} anios y vivo en ${this.ciudad}`
            },
            anioNacimiento: function(){
                let anioActual= new Date().getFullYear();
                return anioActual-this.edad;
            }

            }
            persona.nombre = prompt("Ingresa tu nombre:");
            persona.edad = parseInt(prompt("Ingresa tu edad:"));
            persona.ciudad = prompt("Ingresa tu ciudad:");
            let presentacion = persona.presentarse();
            let anio = persona.anioNacimiento();
            alert(`PROPIEDADES DEL OBJETO:
            Nombre: ${persona.nombre}
            Edad: ${persona.edad}
            Ciudad: ${persona.ciudad}

            MÉTODOS EJECUTADOS:
            1. ${presentacion}
            2. Naciste aproximadamente en el año ${anio}`);
        }
        /*
Elabore un programa en JavaScript que permita gestionar una lista de alumnos almacenados en una lista. El programa debe realizar las siguientes operaciones:

•	Crear un array vacío llamado alumnos.
•	Solicitar al usuario cuántos alumnos desea registrar y usar un bucle para pedir los datos de cada alumno: Nombre, apellido y nota.
•	Guarda cada alumno como un objeto con esas propiedades dentro del array.
•	Mostrar en consola todos los alumnos registrados (nombre completo y nota).
•	Solicitar al usuario el nombre de un alumno para modificar su nota. Si lo encuentra, pedir la nueva nota y actualizarla.
•	Mostrar la lista de alumnos actualizada.
•	Solicitar al usuario el nombre de un alumno que desee eliminar. Si se encuentra, eliminarlo del array usando splice().
•	Mostrar la lista final de alumnos.

Los datos serán ingresados en un prompt y los resultados se imprimirán en consola y se mostrarán en una alerta. */


        // EJERCICIO 7: 
        function ejercicio7() {
            let alumnos = [];
            let cantidad = parseInt(prompt("¿Cuántos alumnos deseas registrar?"));

            for (let i = 0; i < cantidad; i++) {
            let nombre = prompt(`Ingresa el nombre del alumno ${i + 1}:`);
            let apellido = prompt(`Ingresa el apellido del alumno ${i + 1}:`);
            let nota = parseFloat(prompt(`Ingresa la nota del alumno ${i + 1}:`));
            let alumno = { nombre: nombre, apellido: apellido, nota: nota };
            alumnos.push(alumno);
            }

            console.log("Lista de alumnos registrados:");
            alumnos.forEach(al => console.log(`${al.nombre} ${al.apellido} - Nota: ${al.nota}`));
            alert("Lista de alumnos registrada correctamente. Revisa la consola para más detalles.");

            let nombreBuscar = prompt("Ingresa el nombre del alumno cuya nota deseas modificar:");
            let encontrado = alumnos.find(al => al.nombre.toLowerCase() === nombreBuscar.toLowerCase());

            if (encontrado) {
            let nuevaNota = parseFloat(prompt(`Ingresa la nueva nota para ${encontrado.nombre}:`));
            encontrado.nota = nuevaNota;
            alert(`Nota actualizada para ${encontrado.nombre}.`);
            } else {
            alert("Alumno no encontrado.");
            }

            console.log("Lista de alumnos actualizada:");
            alumnos.forEach(al => console.log(`${al.nombre} ${al.apellido} - Nota: ${al.nota}`));

            let nombreEliminar = prompt("Ingresa el nombre del alumno que deseas eliminar:");
            let indice = alumnos.findIndex(al => al.nombre.toLowerCase() === nombreEliminar.toLowerCase());

            if (indice !== -1) {
            alumnos.splice(indice, 1);
            alert("Alumno eliminado correctamente.");
            } else {
            alert("Alumno no encontrado.");
            }

            console.log("Lista final de alumnos:");
            alumnos.forEach(al => console.log(`${al.nombre} ${al.apellido} - Nota: ${al.nota}`));
            alert("Proceso completado. Revisa la consola para ver la lista final.");

        }

        // EJERCICIO 8: 
        function ejercicio8() {
            let cuenta = {
  titular: prompt("Ingrese el nombre del titular de la cuenta:"),
  saldo: 0,
  depositar: function(cantidad) {
    this.saldo += cantidad;
    alert(`Has depositado ${cantidad}. Saldo actual: ${this.saldo}`);
    console.log(`Has depositado ${cantidad}. Saldo actual: ${this.saldo}`);
  },
  retirar: function(cantidad) {
    if (cantidad <= this.saldo) {
      this.saldo -= cantidad;
      alert(`Has retirado ${cantidad}. Saldo actual: ${this.saldo}`);
      console.log(`Has retirado ${cantidad}. Saldo actual: ${this.saldo}`);
    } else {
      alert("Fondos insuficientes.");
      console.log("Fondos insuficientes.");
    }
  },
  mostrarSaldo: function() {
    alert(`Saldo actual: ${this.saldo}`);
    console.log(`Saldo actual: ${this.saldo}`);
  }
};

let opcion;

do {
  opcion = prompt(
    "Elija una opción:\n1. Depositar\n2. Retirar\n3. Consultar saldo\n4. Salir"
  );

  switch (opcion) {
    case "1":
      let deposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));
      cuenta.depositar(deposito);
      break;
    case "2":
      let retiro = parseFloat(prompt("Ingrese la cantidad a retirar:"));
      cuenta.retirar(retiro);
      break;
    case "3":
      cuenta.mostrarSaldo();
      break;
    case "4":
      alert("Saliendo del programa...");
      console.log("Saliendo del programa...");
      break;
    default:
      alert("Opción no válida.");
      console.log("Opción no válida.");
  }
} while (opcion !== "4");

            
        }