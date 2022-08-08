//CALCULADORA

window.onload = function(){ //acciones tras cargar la pantalla
    pantalla=document.getElementById("textoPantalla"); 
    // elemento de la pantalla de salida
    x=0; //guarda numero de pantalla
    xi=1; //inicia numero en pantalla: 1=si, 0=no
    coma=0; // estado coma decimal 0=no, 1=si
    ni=0; //numero oculto o en espera
    op="no"; //operacion en curso: "no"= sin operacion
}

function numero(xx){ //recoge el numero pulsado en el argumento
    if (x=="0" || xi==1){ //iniciamos un numero
        pantalla.innerHTML=xx; //muestra en pantalla
        x=xx; //guarda el numero
        if (xx=="."){ //si escribimos una coma al principio del numero
            pantalla.innerHTML="0."; //escribimos 0
            x=xx; //guarda numero
            coma=1; //cambia estado de la coma
        }
    }else{ //continuar un numero
        if(xx=="." && coma==0){ //si escribimos copa por 1a vex
            pantalla.innerHTML+=xx;
            x+=xx;
            coma=1; //cambia estado de la coma
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna accion
        else if ( xx=="." &&  coma==1){}
        //resto de casos: escribir un numero del 0 al 9
        else {
        pantalla.innerHTML+=xx; //añade y muestra en pantalla
        x+=xx; //añade y guarda
        }
    }
    xi=0 //el numero está iniciaddo y puede ampliarse
}

function operar(s){
    igualar(); //si hay operaciones pendientes se realizan primero
    ni=x; //ponemos el 1er numero en "espera" para poder escribir el siguiente
    op=s; //guardamos el tipo de operacion
    xi=1; //iniciasmos pantalla
}

function igualar(){
    if(op=="no"){//no hay ninguna operacion pendiente
        pantalla.innerHTML=x; //mostramos el mismo numero
    }else{ //con operacion pendiente resolvemos
        sl=ni+op+x; //operacion en cadena
        sol=eval(sl); //convertimos la cadena a codigo y resolvemos
        pantalla.innerHTML=sol; //mostramos en pantalla
        x=sol; //guardamos la solucion
        op="no"; //ya no hya operaciones pendientes
        xi=1; //se puede reiniciar la pantalla
    }
}

function raiz(){
    x=Math.sqrt(x) // resolver raiz cuadrada
    pantalla.innerHTML=x; //mostrar en pantalla resultado
    op="no"; //ya no hya operaciones pendientes
    xi=1; //se puede reiniciar la pantalla
}

function porcent(){
    x=x/100 //dividir por 100 el numero
    pantalla.innerHTML=x; //muestra por pantalla
    igualar() //resuelve y muestra operaciones pendientes
    xi=1 //reinicia la pantalla
}

function opuest(){
    nx=Number(x); //convertimos a numero
    nx=-nx; //cambiamos de signo
    x=String(nx); //volvemos a convertir en cadena
    pantalla.innerHTML=x; //muestra por pantalla
}

function inve(){
    nx=Number(x);
    nx=(1/nx);
    x=String(nx);
    pantalla.innerHTML=x;
    xi=1
}


function retro(){ //Borrar sólo el último número escrito.
    cifras=x.length; //hayar número de caracteres en pantalla
    br=x.substr(cifras-1,cifras) //describir último caracter
    x=x.substr(0,cifras-1) //quitar el ultimo caracter
    if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
    if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
    pantalla.innerHTML=x; //mostrar resultado en pantalla	 
    }

function borradoParcial(){
    pantalla.innerHTML=0; //borrado de pantalla
    x=0; //borrado indicador numero pantalal
    coma=0; //reiniciamos tambien la coma
}

function borradoTotal() {
    pantalla.innerHTML=0; //pantalla a 0
    x="0"; //reinicia la pantalla
    coma=0; //reinicia la coma
    ni=0; //indicado de numero oculto a 0
    op="no"; // borra operacion en curso
}