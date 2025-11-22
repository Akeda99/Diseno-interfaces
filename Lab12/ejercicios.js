/*1.	Según el video visto, modifique el código JavaScript para solicitar al usuario los datos en un prompt y mostrarlos en un alert. */
const boton1 = document.getElementById("ejercicio1");

boton1.addEventListener("click", function() {
  let comida= parseInt(prompt("Dame el monto total de comida: "))
  let bebida = parseInt(prompt("Dame el monto total de bebida: "))
  let suma = 0
  suma = comida + bebida
  alert(`Su total es: ${suma}`)
});
/* 2.	Elabore un programa en JavaScript, en el cual se introduzca cinco (5) números enteros separados por comas; luego el programa calcule: la suma, el promedio y la factorial del número mayor. */

const boton2 = document.getElementById("ejercicio2");

boton2.addEventListener("click", function() {
let lista=[]
let suma=0
let promedio=0
let mayor=0
let factorial=1
for(let i=1; i<=5;i++){
    let numero = parseInt(prompt(`Dame el ${i} numero: `))
    lista.push(numero)
    suma=suma+numero
}
 mayor=Math.max(...lista)
 promedio=suma/5
 for(let i=1; i<=mayor;i++){
    factorial*=i;
 }
 alert(`
  La lista de numeros es: ${lista}
  La suma es: ${suma}
  El promedio es: ${promedio}
  La factorial del numero mayor es: ${factorial}
    `)
});
/*3.	Cree un programa que contenga un objeto, este objeto tendrá mínimo 4 propiedades, dos de ellas serán del tipo método. Muestre las propiedades de su objeto y ejecute los dos métodos. */
const boton3 = document.getElementById("ejercicio3");

boton3.addEventListener("click", function() {
const carro ={
    marca: "Ferrari",
    anio: 2025,

    presentacion(){
        alert(`Mi carro es un ${this.marca}`);
    },
    presentacion2(){
        alert(`Y es del anio ${this.anio}`);
    }
}
carro.presentacion();
carro.presentacion2();
});

const boton4 = document.getElementById("ejercicio4");

boton4.addEventListener("click", function() {
  const filas = 4;
  const columnas = 3;
  let matriz = [];
  for (let i = 0; i < filas; i++) {
    matriz[i] = [];

    for (let j = 0; j < columnas; j++) {
      let valor = parseInt(prompt(`Ingrese el valor para la fila ${i + 1}, columna ${j + 1}:`));
      matriz[i][j] = valor;
    }
  }
  let resultado = "Esta es la matriz:\n";
  for (let i = 0; i < filas; i++) {
    resultado += matriz[i].join(" | ") + "\n";
  }

  alert(resultado);
});
