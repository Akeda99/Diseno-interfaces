function ejercicio1(){
let nombreEmpleado = prompt("Ingrese el nombre del empleado:");
let numeroHijos = parseInt(prompt("Ingrese el número de hijos del empleado:"));
let bono = 0;

if (numeroHijos < 3) {
    bono = 200;
} else if (numeroHijos >= 3 && numeroHijos < 5) {
    bono = 350;
} else if (numeroHijos >= 5) {
    bono = 500;
}

let mensaje = `Empleado: ${nombreEmpleado}\nNúmero de hijos: ${numeroHijos}\nBono asignado: $${bono}`;

console.log(`Empleado: ${nombreEmpleado}`);
console.log(`Número de hijos: ${numeroHijos}`);
console.log(`Bono asignado: $${bono}`);

alert(mensaje);
}

function ejercicio2(){
let multiplicando = parseInt(prompt("Ingrese multiplicando:"))
let multiplicador = parseInt(prompt("Ingrese multiplicador:"))
let tabla =""

for(let i=1; i <= multiplicador; i++){
    let resultado= multiplicando * i
    let linea= `${multiplicando} x ${i} = ${resultado}`;
    console.log(linea);

    tabla+=linea + "\n"
    
}

alert(tabla)
}

function ejercicio3(){
    let primernumero= parseInt(prompt("Ingrese Primer Numero:"))
    let segundonumero=parseInt(prompt("Ingrese Segundo Numero:"))

    if (primernumero>segundonumero){
        mensaje =`El numero mayor es: ${primernumero}`
        
    } else if (segundonumero>primernumero){
        mensaje =`El numero mayor es: ${segundonumero}`
        
    }else if (primernumero==segundonumero){
        mensaje =`Los numeros son iguales.`
        
    }
    console.log(mensaje)
    alert(mensaje)
}

function ejercicio4 (){
    let monto= parseInt(prompt("Ingrese el monto a pagar: "))
    let newmonto=0
    if (monto<100) {
        mensaje= `No hay descuento`
        alert(mensaje)

    } else if (monto>=100 && monto <500){
        newmonto = monto * 0.9
        alert(`El monto nuevo a pagar es: ${newmonto}`)
    }
    else if (monto>=500){
        newmonto = monto * 0.8
        alert(`El monto nuevo a pagar es: ${newmonto}`)
    }
}
function ejercicio5 () {
    let numero = parseInt(prompt("Ingrese el numero a evaluar: "))
    if(numero % 2 ==0){
        alert(`El Numero es par`)
    }else {
        alert(`El Numero es Impar`)
    }
}
function ejercicio6 (){
    let numero = parseInt(prompt("Ingrese el numero: "))
    let acumulador=0
    let suma=0
    for(let i=1; i <= numero; i++){
        acumulador+=i
        suma+=i

            if (i < numero) {
            suma += " + ";
        }
        
    
}
let mensaje = `Suma: ${suma} = ${acumulador}`
alert(mensaje)
}

function ejercicio7 () {
    let numero = parseInt(prompt("Ingrese el numero: "))
    let pares=[]
    for(let i=1; i <= numero; i++){
        if(i % 2==0){
            pares.push(i)
        }
}
let mensaje = `Los numeros pares son: ${pares}`
alert(mensaje)
}

function ejercicio8 (){
    let numero = parseInt(prompt("Ingrese el numero: "))
    let mensaje=""
    if(numero<0){
        mensaje = `El numero es negativo`
    }else if (numero ==0){
        mensaje = `El numero es neutro`
    } else if (numero>0){
        mensaje= `El numero es positivo`
    }
    alert(mensaje)
}
function ejercicio9(){
    let cantidad = parseInt(prompt("Cuantas Notas quiere ingresar?: "))
    let suma=0
    let promedio=0
    for(i=1; i<=cantidad; i++){
        let numero= parseInt(prompt(`Ingrese la ${i} nota: `))
        suma+=numero
    }
    promedio=suma/cantidad
    alert(`El promedio es: ${promedio}`)
    
}
function ejercicio10(){
    let cantidad = parseInt(prompt("Ingrese el numero que quiere su factorial: "))
    let factorial=1
    let operacion=""
    if (cantidad === 0) {
        operacion = "0! = 1";
    } else {
    for(let i=cantidad;i>=1;i--){
        factorial*=i
        operacion+=i
        if (i > 1) {
                operacion += " × ";
            }
    }
    operacion += ` = ${factorial}`;
    }
     
     let mensaje = `Factorial de ${cantidad}:\n${operacion}`;
    alert(mensaje)
}