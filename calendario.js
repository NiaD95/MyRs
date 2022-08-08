
//CALENDARIO

    //Arrays de datos:
    meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    lasemana= ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    diassemana= ["lun","mar","mie","jue","vie","sab","dom"];

    //Tras cargarse la página ...
        window.onload = function(){
            //fecha actual
                hoy = new Date(); 
            //dia semana actual
                diasemhoy = hoy.getDay();
            //dia mes actual
                diahoy = hoy.getDate();
            //mes actual
                meshoy = hoy.getMonth();
            //anio actual
                annohoy = hoy.getFullYear();

    // Elementos del DOM: en cabecera de calendario 
            tit=document.getElementById("titulos"); //cabecera del calendario
            ant=document.getElementById("anterior"); //mes anterior /prev
            pos=document.getElementById("posterior"); //mes posterior /next

    // Elementos del DOM en primera fila
            f0=document.getElementById("fila0");

    //Pie de calendario
    pie=document.getElementById("fechaactual");
    pie.innerHTML+=lasemana[diasemhoy]+", "+diahoy+" de "+meses[meshoy]+" de "+annohoy;

    //formulario: datos iniciales:
    document.buscar.buscaanno.value=annohoy;

    // Definir elementos iniciales:
    mescal = meshoy; //mes principal
    annocal = annohoy //año principal

    //iniciar calendario:
    cabecera() 
    primeralinea()
    escribirdias()
    }

    //FUNCIONES de creación del calendario:
    //cabecera del calendario
    function cabecera() {
            tit.innerHTML=meses[mescal]+" de "+annocal;
            mesant=mescal-1; //mes anterior
            mespos=mescal+1; //mes posterior
            if (mesant<0) {mesant=11;}
            if (mespos>11) {mespos=0;}
            ant.innerHTML=meses[mesant]
            pos.innerHTML=meses[mespos]
            } 
    //primera línea de tabla: días de la semana.
    function primeralinea() {
            for (i=0;i<7;i++) {
                celda0=f0.getElementsByTagName("th")[i];
                celda0.innerHTML=diassemana[i]
                }
            }
    //rellenar celdas con los días
    function escribirdias() {
            //Buscar dia de la semana del dia 1 del mes:
            primeromes=new Date(annocal,mescal,"1") //buscar primer día del mes
            prsem=primeromes.getDay() //buscar día de la semana del día 1
            prsem--; //adaptar al calendario español (empezar por lunes)

            if (prsem==-1) {prsem=6;}
            //buscar fecha para primera celda:
            diaprmes=primeromes.getDate() 
            prcelda=diaprmes-prsem; //restar días que sobran de la semana
            empezar=primeromes.setDate(prcelda) //empezar= tiempo UNIX 1ª celda
            diames=new Date() //convertir en fecha
            diames.setTime(empezar); //diames=fecha primera celda.

            //Recorrer las celdas para escribir el día:
            for (i=1;i<7;i++) { //localizar fila
                fila=document.getElementById("fila"+i);
                for (j=0;j<7;j++) {
                    midia=diames.getDate() 
                    mimes=diames.getMonth()
                    mianno=diames.getFullYear()
                    celda=fila.getElementsByTagName("td")[j];
                    celda.innerHTML=midia;

                    //Recuperar estado inicial al cambiar de mes:
                    celda.style.backgroundColor="#dd91bb";
                    celda.style.color="#492736";

                    //domingos en blanco
                    if (j==6) { 
                        celda.style.color="white";
                        }

                    //dias restantes del mes en gris
                    if (mimes!=mescal) { 
                        celda.style.color="#3d4658";
                        }

                    //destacar la fecha actual
                    if (mimes==meshoy && midia==diahoy && mianno==annohoy ) { 
                        celda.style.backgroundColor="#f0b19e";
                        celda.innerHTML="<cite title='Fecha Actual'>"+midia+"</cite>";
                        }

                    //pasar al siguiente día
                    midia=midia+1;
                    diames.setDate(midia);
                    }
                }
            }

    //Ver mes anterior
            function mesantes(){
                nuevomes=new Date() //nuevo objeto de fecha
                primeromes--; //restamos un dia al 1 del mes visualizado
                nuevomes.setTime(primeromes) //cambiamos fecha al mes anterior
                mescal=nuevomes.getMonth() //cambiamos las variables que usará las funciones
                annocal=nuevomes.getFullYear()
                cabecera() //llamamos a la funcion de la cabecera para cambiarla
                escribirdias() //llamamos a la funcion para rellenar los días
            }

    //ver mes posterio
            function mesdespues(){
                nuevomes=new Date() //nuevo objeto de fecha
                tiempounix=primeromes.getTime() //fecha del primero mes
                tiempounix=tiempounix+(45*24*60*60*1000) //le aniadimos 45 dias
                nuevomes.setTime(tiempounix) //fecha con mes posterior
                mescal=nuevomes.getMonth() //cambiamos variables
                annocal=nuevomes.getFullYear()
                cabecera() //llamamos cabecera
                escribirdias() //llamamos dias de la tabla
            }

    //volver al mes actual
            function actualizar(){
                mescal=hoy.getMonth(); //cambiamos al mes actual
                annocal=hoy.getFullYear(); //cambiamos al año actual
                cabecera() //llamamos cabecera
                escribirdias() //llamamos dias de la tabla
            }


    //BUSQUEDA DE FECHA
    //ir al mes buscado
            function mifecha(){
                //recoge el dato del año del formulario
                mianno=document.buscar.buscaanno.value;
                //recoge el dato de mes del formulario
                listameses=document.buscar.buscames;
                opciones=listameses.options;
                num=listameses.selectedIndex
                mimes=opciones[num].value;
                //comprobamos si el año está bien escrito
                if (isNaN (mianno) || mianno<1){
                    //anio mal escrito:mensaje de error
                    alert("El año no es válido:\n debe ser un número mayor de 0")
                }else{
                    //anio bien escrito:muestra el mes
                    mife=new Date(); //nueva fecha
                    mife.setMonth(mimes); //añade mes y anio indicados
                    mife.setFullYear(mianno);
                    mescal=mife.getMonth(); //cambiar a mes y año indicados
                    annocal=mife.getFullYear();
                    cabecera();
                    escribirdias();
                }
            }
