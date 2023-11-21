/******************************************************************************
 * SGA Old Functions JS
 ******************************************************************************
 *****************************************************************************/

function nuevoAjax() {
    var xmlhttp = false;
    try {
        // Creacion del objeto AJAX para navegadores no IE
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            // Creacion del objet AJAX para IE 
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != "undefined") {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}


function requestPOST(url, query, ajax, divMensaje, tipo, callback, param1 = "", param2 = "", param3 = "") {
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(query);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 1) {
            //divMensaje.innerHTML = '<div class="cargando-datos"></div>';
            divMensaje.innerHTML = spinner.circleplane;
        } else {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    if (tipo < 1) {
                        divMensaje.innerHTML = ajax.responseText;
                        console.log("CONTENEDOR: " + divMensaje.id);	//JLJL30032013
                        console.log("RESPONSE: " + ajax.responseText);	//JLJL30032013    

                        if (typeof callback !== 'undefined') {
                            console.log("llamando callback!");
                            callback(param1, param2, param3);
                        }
                        ;
                    } else {
                        var ventimp = window.open('plantilla_impresion.php', 'popimpr');
                        ventimp.document.getElementById("contentPlantilla").innerHTML = ajax.responseText;
                    }
                } else {
                    if (ajax.status === 404) {
                        divMensaje.innerHTML = "La p&aacute;gina no existe";
                    } else {
                        divMensaje.innerHTML = "Error:" + ajax.status;
                    }
                }
            } else {
                //divMensaje.innerHTML = '<div class="cargando-datos"></div>';
                divMensaje.innerHTML = spinner.circleplane;
            }
        }
    };
}

//JLJL 06/12/2015
function requestPost2(url, query, ajax, pid) {
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(query);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                proResponse(pid, ajax.responseText);
            }
        }
    };
}


//JLJL 06/12/2015
function proResponse(pid, response) {
    switch (pid) {
        case 1196:
            showNotification('Entrega de Acta Digital', response, 0, 'glyphicon glyphicon-ok', 'bg-green');
            setTimeout(function () {
                llamarAHAH('S_W_docente/contenido_docente_cursos_activados.php', 'page-content', 10);
            }, 2000);
            break;

        case 1104:
            if (response > 0) {
                showNotification('Metodo de Evaluación', 'El Metodo de Evaluacion ha sido registrado!', 0, 'fa fa-ok', 'bg-green');
                setTimeout(function () {
                    llamarAHAH('S_W_docente/contenido_docente_cursos.php', 'page-content', 1101);
                }, 3500);
            } else {
                showNotification('Metodo de Evaluación', 'No ha sido posible registrar su Metodo de Evaluacion, por favor intentelo nuevamente.', 0, 'fa fa-ok', 'bg-red');
            }
            break;
        case 60:
    }
}



function invoca(url, contenedor, id) {
    document.getElementById(contenedor).innerHTML = "";
    var varsem = document.getElementById(paramSem).value;
    var divMensaje = document.getElementById(contenedor);
    var varID = id;
    var ajax = nuevoAjax();
    requestPOST(url, "varID=" + varID + "&varsem=" + varsem, ajax, divMensaje, 0);
}

function invocador(contenedor, id) {
    var divMensaje = document.getElementById(contenedor);
    var varID = id;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID, ajax, divMensaje, 0);
}

function llamarAHAH(url, elementoPag, id) {
    //document.getElementById(elementoPag).innerHTML = '<div class="cargando-datos"></div>';	// JLJL
    if (elementoPag.indexOf("#") === 0) {
        $(elementoPag).html(spinner.circleplane);
    } else {
        $("#" + elementoPag).html(spinner.circleplane);
    }

    http = nuevoAjax();
    http.onreadystatechange = function () {
        respuestaAHAH(elementoPag, id);
    };
    http.open("POST", url, true);
    http.send(null);
    console.log('LlamarAHAH: ' + url + " : " + id);
}

function respuestaAHAH(elementoPag, id) {
    if (http.readyState === 4) {
        if (http.status === 200) {
            document.getElementById(elementoPag).innerHTML = http.responseText;
            console.log('llamando a select');
            selector(id);
        }
    }
}

function selector(id) {
    switch (id) {
        // Cargar datos del Alumno.
        case 5: invocador("contentalumnoDatos", 5); break;
        //Cargar Listado de cursos que tienen Silabos//Docentes
        case 13: cargarSilabosDocente("listcursdocSilab"); break;
        // Cargar datos del Alumno.
        case 18: invocador("contentdocenteDatos", 18); break;
        //carga Lista de Facultades para sus convalidaciones
        case 21: invocador("selectlistFacultades", 21); break;
        case 24: cargarCargaAcademicaFacultad("cargaAcademicaFacultad"); break;
        case 26: cargarCursosActivosFacultad("cursosActivosFacultad"); break;
        case 27: cargarListaDocentesFacultad("listDocsDepAcad"); break;
        //luego tengo que cambiar la denominacion por el banco
        case 28: cargarListaAlumnosFacultad("listAlumnosFacultad"); break;        
        case 29: cargarListaPagosBN("listAlumnosPagos"); break;
        //Nuevo: JLJL06112014: Para mostrar el plan curricular a JD y CSC
        case 30: invocador("planCurricular", 300); break;
        case 35: invocador("ficha_admision", 35); break;
        case 50: invocador("listCursMatri", 50); botonPrint("NotasParciales", "", 50); break;
        //Cargar Listado de cursos que tienen Silabos//Alumnos
        case 1301: cargarSilabosAlumno("listcursdocSilab"); break;
        //carga Lista de Facultades para sus planes curriculares	  
        case 30: invocador("selectlistFacultades", 30); break;
        //Cargar Record de los 2 ultimos semestres del alumno
        case 10600: invocador("wrapper-record", 10601); break;
        //carga Lista de Facultades para sus planes curriculares	  	   		
        case 102: invocador("MostrarFichaEstadistica", 102); break;
        //carga Lista de Facultades para sus planes curriculares	  
        case 104: invocador("estadodeudas", 104); break;
        //carga Lista de Facultades para sus planes curriculares	   
        case 1081: invocador("reportepagos", 1081); break;
        // Cargar Relacion de Alumnos - Consejeria Docente (04/12/2014)
        //invocador("reportealumnos",1175);   
        case 1175: mostrarConsejeria("reportealumnos");    break;
        //invocador("reportealumnos",1175);   
        case 1197: mostrarReporteEntregaActa("reportEntregaActa"); break;
        case 7425: invocador("cursosActivados", 7425); break;
        // Nuevos Selectores  - Docentes  
        case 11010: docenteCargarCursos(); break;
        case 11060: docenteCargarHorario(); break;
        case 11090: docenteCargarCursosAplazados(); break;
        default: break;
    }
}


function RequestAjax(url, data, context, callback, method = 'post', datatype = 'html') {
    
    callback = callback || function () {};
    
    $.ajax({
        url: url,
        type: method,
        dataType: datatype,
        context: context, // Objeto jQuery q sera el contenedor
        data: data,
        error: function () {
            $(this).html("<p>Page Not Found!!</p>");
        },
        beforeSend: function () {
            $(this).html(spinner.circleplane);
        },
        complete: function () {
            console.log("RequestAjax Complete");
        },
        success: function (received) {
            console.log("RequestAjax Success " + received);
            console.log(callback);
            if(context !== '' && context !== null) {     
                $(this).html(received);
                selector(data.pid);
                callback(received, data);
            }
        }
    });
}





//FUNCION DEPRECATED
function cargarConsultSilab(contenedor, semestre, nombre) {
    var divMensaje = document.getElementById(contenedor);
    var varsem = document.getElementById(semestre).value;
    var varnom = document.getElementById(nombre).value;
    var varID = 20;
    url = "varID=" + varID + "&postSem=" + varsem + "&postNom=" + varnom;
    var opcSilabos = document.getElementsByName("opcSilabos");
    for (i = 0; i < opcSilabos.length; i++)
        if (opcSilabos[i].checked)
            url += "&opcSilabos=" + opcSilabos[i].value;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", url, ajax, divMensaje, 0);
}


function showInfoDocente() {
    $(document).ready(function () {
        $('#infoDocente1').fadeIn("slow");
        $('#infoDocente2').fadeIn("slow");
        $('#menuProceos').fadeOut("slow");
    });
}
function hideInfoDocente() {
    $(document).ready(function () {
        $('#infoDocente1').fadeOut("slow");
        $('#infoDocente2').fadeOut("slow");
        $('#menuProceos').fadeIn("slow");
    });
}

function selectEscuelasProfesionales(obj) {
    $.ajax({
        type: "POST",
        url: "D_P_general/mapa.convalidacion.php",
        data: { action: "getescuelas" },
        success: function (html) {
            $(obj).html(html);
        }
    });
}
function selectMapasConvalidaciones(obj, codesp) {
    alert(obj + ' ' + codesp);
    $.ajax({
        type: "POST",
        url: "D_P_general/mapa.convalidacion.php",
        data: { action: "getmapasconv", codesp: codesp },
        success: function (html) {
            $(obj).html(html);
        }
    });
}

function clickmenuencuesta() {
    console.log('VirtualClik Encuestas');
    $('#side-menu li a[href$="#Encuestas"]').click();
}

/******************************************************************************
 * GRAFICOS ESTADISTICOS 
 * Obtener Data
 * Data: -------------------------------
 * $anioini = '2000';
 * $tiposem:
 * 0 = SEM VERANO
 * 1 = SEM IMPAR
 * 2 = SEM PAR
 *_S = APLAZADOS
 *_ = CUALQUIERA PAR, IMPAR O VERANO SIN APLAZADOS
 *_S = CUALQUIERA PAR, IMPAR Y APLAZADOS
 *****************************************************************************/

function estadisticas_jd_init() {
    $.getJSON("D_P_general/estadisticas_jd_data.php", { anioini: "2005", tiposem: "1" })
        .done(function (json1) {
            //alert( "JSON Data: " + json.S + "\n" + json.D );
            showGraphics(json1, "graphics1");
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            alert("Request Failed: " + err);
        });
}

function estadistica_jefedepaca(contenedor, anioini, tiposem) {
    var divContent = document.getElementById(contenedor);
    var sem = document.getElementById(paramSem).value;
    var varID = 1201;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&anioini=" + anioini + "&tiposem=" + tiposem, ajax, divContent, 0);
}

function showGraphics(data, renderTo) {
    var chart;
    // Matriculados por semestre 
    chart = new Highcharts.Chart({
        chart: {
            renderTo: renderTo,
            //defaultSeriesType: 'column',
            type: 'spline'
        },
        title: {
            text: 'Evolucion de Matriculados'
        },
        subtitle: {
            text: 'OCDA-UNAS / By JLJL'
        },
        xAxis: {
            categories: data.S
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Alumnos'
            }
        },
        tooltip: {
            formatter: function () {
                return '' +
                    this.x + ': ' + this.y + ' matriculados';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data.D
    });
}

/* ************************************************************************* */

// JLJL 12.08.2014
// Funcion pra validar el codigo de afiliacion y registrar en la base de datos. 
function validar_seguro_salud() {
    var idseg = document.getElementById("idseguro").value;
    var wrapercontainer = document.getElementById("afiliacionsegurodesalud");

    if (idseg == "") {
        alert("Ingrese su codigo afiliacion a un Seguro de Salud!");
    } else if (idseg.length < 8) {
        alert("Su codigo de afiliacion a un Seguro de Salud no es correcto!");
    } else if (idseg != "" && idseg.length > 7) {
        alert("Codigo de Afiliacion registrado!");
        $("#afiliacionsegurodesalud").html("<strong>JLJL</strong>");
        wrapercontainer.innerHTML = spinner.circleplane;
        var varID = 490;
        var ajax = nuevoAjax();
        var enviopost = "varID=" + varID + "&idseguro=" + idseg;
        requestPOST("tareas.php", enviopost, ajax, wrapercontainer, 0);
        //llamarAHAH('S_W_alumno/contenido_matricula_registro_cursos_alumno.php','page-content',0);
    }   //UserActivityLog("CLICK_MATRICULAR");
}

/* Cargar el plan curricular: contenido_plan_curricular_v2.php  Add JLJL17222012*/
function mostrarPlanCurricular(planEsp) {
    //llamarAHAH('S_W_general/PlanesCurriculares/'+ planEsp, 'contenedorPlanCurricular', 0);
    llamarAHAH('S_W_general/plan_curricular.php?plan=' + planEsp, 'contenedorPlanCurricular', 0);
    return false;
}

function activaboton(idboton, idchk) {
    document.getElementById(idboton).disabled = !document.getElementById(idchk).checked;
}
function msjproced(divmsj, divproc) {
    document.getElementById(divmsj).style.display = 'none';
    document.getElementById(divproc).style.display = 'block';
}

function validarCamposFichaPostulante() {
    var e = 1;
    e = validarCampo("espOpc1", "0", e);
    e = validarCampo("espOpc2", "0", e);
    e = validarCampo("tipoPostu", "0", e);
    e = validarCampo("anioEgreso", "", e);
    e = validarCampo("tipoColegio", "0", e);
    e = validarCampo("nombreColegio", "0000", e);
    e = validarCampo("lugarColeDep", "00", e);
    e = validarCampo("lugarColeProv", "00", e);
    e = validarCampo("lugarColeDist", "00", e);
    e = validarCampo("DNI", "", e);
    e = validarCampo("appaterno", "", e);
    e = validarCampo("apmaterno", "", e);
    e = validarCampo("nombres", "", e);
    e = validarCampo("lugarNaciDep", "00", e);
    e = validarCampo("lugarNaciProv", "00", e);
    e = validarCampo("lugarNaciDist", "00", e);
    e = validarCampo("sexo", "0", e);
    e = validarCampo("estcivil", "0", e);
    e = validarCampo("idioma", "0", e);
    e = validarCampo("encA1", "0", e);
    validarCampo("encA2", "0", e);
    validarCampo("encA3", "0", e);
    e = validarCampo("encB1", "0", e);
    e = validarCampo("encB2", "0", e);
    e = validarCampo("encB3", "0", e);
    e = validarCampo("encB4", "0", e);
    e = validarCampo("encB5", "0", e);
    e = validarCampo("encB6", "0", e);
    return e;
}

function guardarFichaPostulante() {
    var e = validarCamposFichaPostulante();
    if (e == 1) {
        var espOpc = document.getElementById("espOpc1").value + document.getElementById("espOpc2").value;
        var tipoPostu = document.getElementById("tipoPostu").value;
        var anioEgreso = document.getElementById("anioEgreso").value;
        var tipoColegio = document.getElementById("tipoColegio").value;
        var nombreColegio = document.getElementById("nombreColegio").value;
        var ubigeoColegio = document.getElementById("lugarColeDep").value + document.getElementById("lugarColeProv").value + document.getElementById("lugarColeDist").value;
        var DNI = document.getElementById("DNI").value;
        var appaterno = document.getElementById("appaterno").value;
        var apmaterno = document.getElementById("apmaterno").value;
        var nombres = document.getElementById("nombres").value;
        var ubigeoProcedencia = document.getElementById("lugarNaciDep").value + document.getElementById("lugarNaciProv").value + document.getElementById("lugarNaciDist").value;
        var sexo = document.getElementById("sexo").value;
        var estcivil = document.getElementById("estcivil").value;
        var idioma = document.getElementById("idioma").value;

        var encA = document.getElementsByName("encA");
        var AAA = "";
        for (i = 0; i < encA.length; i++)
            AAA += encA[i].value;
        var encB = document.getElementsByName("encB");
        var BBB = "";
        for (i = 0; i < encB.length; i++)
            BBB += encB[i].value;
        var encuesta = AAA + BBB;

        var divMensaje = document.getElementById('ficha_admision');
        var ajax = nuevoAjax();
        var varID = 36;
        requestPOST("tareas.php", "varID=" + varID + "&DNI=" + DNI + "&appaterno=" + appaterno + "&apmaterno=" + apmaterno + "&nombres=" + nombres + "&sexo=" + sexo + "&estcivil=" + estcivil + "&idioma=" + idioma + "&encuesta=" + encuesta + "&nombreColegio=" + nombreColegio + "&tipoColegio=" + tipoColegio + "&anioEgreso=" + anioEgreso + "&tipoPostu=" + tipoPostu + "&ubigeoColegio=" + ubigeoColegio + "&ubigeoProcedencia=" + ubigeoProcedencia + "&espOpc=" + espOpc, ajax, divMensaje, 0);
        document.location.href = "#cabeza_ficha_admision";
    } else {
        alert("FALTAN LLENAR CAMPOS O ESTAN ERRONEOS");
    }
}

function cargarProvincias(capaProv, capaDist, objDep, nomObjProv, nomObjDist) {
    var divMensaje = document.getElementById(capaProv);
    var lugarDep = objDep.value;
    var ajax = nuevoAjax();
    var varID = 37;
    requestPOST("tareas.php", "varID=" + varID + "&lugarDep=" + lugarDep + "&nomObjProv=" + nomObjProv + "&nomObjDist=" + nomObjDist + "&capaDist=" + capaDist, ajax, divMensaje, 0);
    //alert(capaDist);
    cargarDistritos(1, capaDist, lugarDep, nomObjProv, nomObjDist);
}

function cargarDistritos(estado, capaDist, lugarDep, nomObjProv, nomObjDist) {
    var divMensaje = document.getElementById(capaDist);
    var lugarProv = document.getElementById(nomObjProv).value;
    if (estado == 1)
        lugarProv = "-1";
    var ajax = nuevoAjax();
    var varID = 38;
    requestPOST("tareas.php", "varID=" + varID + "&lugarDep=" + lugarDep + "&lugarProv=" + lugarProv + "&nomObjDist=" + nomObjDist, ajax, divMensaje, 0);
}



function comprobarCambioPass(tipo_user) {
    varcod = document.getElementById('txtcod').value;
    varpassant = document.getElementById('txtpassant').value;
    varpassnew = document.getElementById('txtpassnew').value;
    varpassrenew = document.getElementById('txtpassrenew').value;

    if (tipo_user == 'docente') {
        var divMensaje = document.getElementById('contentdocenteDatos');
    }
    if (tipo_user == 'alumno') {
        var divMensaje = document.getElementById('contentalumnoDatos');
    }
    if (varpassnew == varpassrenew) {
        if ((trim(varcod).length > 0) || (trim(varpassant).length > 0) || (trim(varpassnew).length > 0) || (trim(varpassrenew).length > 0)) {
            if (varpassnew.length >= 8) {
                if (confirm('Seguro Que Desea Cambiar su Clave de Usuario')) {
                    var ajax = nuevoAjax();
                    var varID = 7;
                    requestPOST("tareas.php", "varID=" + varID + "&tipo_user=" + tipo_user + "&varcod=" + varcod + "&varpassant=" + varpassant + "&varpassnew=" + varpassnew + "&varpassrenew=" + varpassrenew, ajax, divMensaje, 0);
                } else
                    document.getElementById("paswmsginfo").innerHTML = '<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>El cambio de contraseña se ha cancelado! Su contraseña no ha sido cambiada</div>';
            } else {   //alert("La contraseña debe poseer almenos 6 caracteres");
                document.getElementById("paswmsginfo").innerHTML = '<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>La contraseña debe poseer al menos 8 caracteres!</div>';
            }
        } else {    //alert("No debe dejar vacio ninguno de los campos");
            document.getElementById("paswmsginfo").innerHTML = '<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>Todos los campos son obligatorios!</div>';
        }
    } else { //alert("Escriba la misma contraseña en los campos de Nueva Contraseña");
        document.getElementById("paswmsginfo").innerHTML = '<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>Las nuevas contraseñas son diferentes!</div>';
    }
}

function password_change() {
    var utype = $('#cp_usertype').val();
    var uname = $('#cp_username').val();
    var upwnow = $('#cp_userpasw').val();
    var upwnew = $('#cp_userpaswnew').val();
    var upwnew2 = $('#cp_userpaswnew2').val();
    var send = 1;

    if (utype === '0') {
        var container = $('#contentalumnoDatos');
    }
    if (utype === '1') {
        var container = $('#docente_password');
    }

    $('#cp_username').parent().parent().removeClass('has-error');
    $('#cp_userpasw').parent().parent().removeClass('has-error');
    $('#cp_userpaswnew').parent().parent().removeClass('has-error');
    $('#cp_userpaswnew2').parent().parent().removeClass('has-error');

    if (uname == '' || uname.length < 5) {
        $('#cp_username').parent().parent().addClass('has-error');
        send = 0;
    }
    if (upwnow == '' || upwnow.length < 5) {
        $('#cp_userpasw').parent().parent().addClass('has-error');
        $('#cp_userpasw').parent().parent().find('.help-block').text('Este campo debe ser mayor a 6 caracteres!');
        send = 0;
    }
    if (upwnew == '' || upwnew.length < 8) {
        $('#cp_userpaswnew').parent().parent().addClass('has-error');
        $('#cp_userpaswnew').parent().parent().find('.help-block').text('Este campo no debe ser menor a 8 caracteres!');
        send = 0;
    }
    if (upwnew2 == '' || upwnew2.length < 8) {
        $('#cp_userpaswnew2').parent().parent().addClass('has-error');
        $('#cp_userpaswnew2').parent().parent().find('.help-block').text('Este campo no debe ser menor a 8 caracteres!');
        send = 0;
    }
    if (upwnew != upwnew2) {
        $('#cp_userpaswnew').parent().parent().addClass('has-error');
        $('#cp_userpaswnew2').parent().parent().addClass('has-error');
        $('#cp_userpaswnew').parent().parent().find('.help-block').text('Contraseñas nuevas no coinciden');
        $('#cp_userpaswnew2').parent().parent().find('.help-block').text('Contraseñas nuevas no coinciden');
        send = 0;
    }

    if (send == 1) {
        cp_btnsave
        $('#cp_btnsave').prop("disabled", true);
        if (confirm('Se va proceder a efectuar el cambio de contraseña. ¿Esta seguro que desea realizar este proceso?')) {
            var ajax = nuevoAjax();
            var varID = 7;
            requestPOST("tareas.php", "varID=" + varID + "&tipo_user=" + utype + "&varcod=" + uname + "&varpassant=" + upwnow + "&varpassnew=" + upwnew + "&varpassrenew=" + upwnew2, ajax, container, 0);
        } else {
            $('#cp_btnsave').prop("disabled", false);
            //document.getElementById("paswmsginfo").innerHTML='<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>El cambio de contraseña se ha cancelado! Su contraseña no ha sido cambiada</div>';
        }

    }
}

//mostrarConsejeria(contenedor) nueva funcion 2015-01-05
function mostrarConsejeria(contenedor) {
    //var codSem =document.getElementById(paramSem).value;
    var divMensaje = document.getElementById(contenedor);
    var sem = document.getElementById(paramSem).value;
    var varID = 1175;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&semestre=" + sem, ajax, divMensaje, 0);
    //datatable_listAlumnos();
}

//mostrarConsejeria(contenedor) nueva funcion 2015-01-05
function mostrarReporteEntregaActa(contenedor) {
    //var codSem =document.getElementById(paramSem).value;
    var divMensaje = document.getElementById(contenedor);
    var sem = document.getElementById(paramSem).value;
    var varID = 1197;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID, ajax, divMensaje, 0);
}


function docenteCursosActivos(contenedor) {
    var codSem = document.getElementById(paramSem).value;
    var divMensaje = document.getElementById(contenedor);
    var varID = 1101;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&codSem=" + codSem, ajax, divMensaje, 0);
}

// + llamada desde docentes cursos
function cargarCursListAlu(contenedor, codCurso, codSem) {
    var varID = 11;
    var objContainer = document.getElementById(contenedor);
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&codCurso=" + codCurso + "&codSem=" + codSem, ajax, objContainer, 0);
    //botonPrint(contenedor,codCurso,11); agregado los botones al mismo reporte
    $("#notaOpciones").html("");
}


function docenteCargarCursosAplazados() {
    var codsem = document.getElementById(paramSem).value;
    var pid = 11091;
    var context = $("#doc-cursos");
    RequestAjax("tareas.php", {pid: pid, codsem: codsem}, context);
    //botonPrint(contenedor, codSem, 12); 
}

function docenteCargarHorario() {
    var codsem = document.getElementById(paramSem).value;
    var pid = 11061;
    var context = $("#doc-horario");
    RequestAjax("tareas.php", {pid: pid, codSem: codsem}, context);
    //botonPrint(contenedor, codSem, 12); 
}

function cargarSilabosDocente(contenedor) {
    var codSem = document.getElementById(paramSem).value;
    var varID = 13;
    var divMensaje = document.getElementById(contenedor);
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&codSem=" + codSem, ajax, divMensaje, 0);
}
function cargarSilabosAlumno(contenedor) {
    var varID = 13;
    var divMensaje = document.getElementById(contenedor);
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID, ajax, divMensaje, 0);
}
function get_codigo_alumno(txtNombre) {
    nomAlumno = document.getElementById(txtNombre).value;
    var divMensaje = document.getElementById("resultConsulNombres");
    var varID = 19;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&nomAlumno=" + nomAlumno, ajax, divMensaje, 0);
    //varNom=document.getElementById(txtNombre).value;	
}

function searchStudent() {
    textsearch = document.getElementById("textsearch").value;
    typesearch = document.getElementsByName("typesearch");
    for (i = 0; i < typesearch.length; i++) {
        if (typesearch[i].checked) {
            typesearch = typesearch[i].value;
        }
    }
    if (typesearch == "nombre") {
        var divMensaje = document.getElementById("searchresult");
        var varID = 19;
        var ajax = nuevoAjax();
        requestPOST("tareas.php", "varID=" + varID + "&nomAlumno=" + textsearch, ajax, divMensaje, 0);
        alert(typesearch + textsearch);
    }
    if (typesearch == "codigo") {
        alert("SGA");
    }
}


/******************************************************************************
 * JS SGA Functions Upload Files
 *****************************************************************************/
var httpU = nuevoAjax();
var uploader = '';
function mostrarParaSubir(contenedor, codCurso, nomCurso) {
    //var codSem =document.getElementById(paramSem).value;
    var divMensaje = document.getElementById(contenedor);
    var sem = document.getElementById(paramSem).value;
    var varID = 110;
    var ajax = nuevoAjax();
    requestPOST("tareas.php", "varID=" + varID + "&codCurso=" + codCurso + "&nomCurso=" + nomCurso + "&semestre=" + sem, ajax, divMensaje, 0);
}
function uploadFile(obj) {
    if (confirm("Seguro del archivo a subir?")) {
        var uploadDir = obj.value;
        uploaderId = 'uploader' + obj.name;
        uploader = obj.name;
        document.getElementById('formName' + obj.name).submit();
        traceUpload(uploadDir, obj.name);
    }
}
function traceUpload(uploadDir) {
    httpU.onreadystatechange = handleResponse;
    httpU.open("GET", 'D_P_docente/imageupload.php?uploadDir=' + uploadDir + '&uploader=' + uploader);
    httpU.send(null);
}

function handleResponse() {
    if (httpU.readyState == 4) {
        document.getElementById(uploaderId).innerHTML = httpU.responseText;
        httpU = nuevoAjax();
    } else {
        document.getElementById(uploaderId).innerHTML = "Uploading File. Please wait...";
    }
}
//fin de funciones pa subir archivos
/******************************************************************************
 * JS SGA Polls Functions
 *****************************************************************************/

var stepBloques = new Array();

// Script from: 
// http://www.naveen.com.au/javascript/jquery/encode-or-decode-html-entities-with-jquery/289
// ----------------------------------------------------------------------------
function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function longitud(object) {
    var tam = 0;
    for (o in object)
        tam++;
    return tam;
}

function obtenerDatosEncuesta(idEncuesta, idForm) {
    $.ajax({
        type: "POST",
        url: "encuestas/data.php",
        data: { idencuesta: idEncuesta },
        beforeSend: function () {
            $('#listEncuestas').slideUp("slow");
            $('#encuesta').slideDown("slow");
            //abrirLoading(); 
        },
        success: function (resultado) {
            dataEncuesta = $.parseJSON(resultado);
            generarEncuesta(dataEncuesta, idForm);
        }
    });
}

function generarEncuesta(Encuesta, idForm) 
{
    // Encuesta
    $('#nombre').html(Encuesta.nomencuesta);
    //$('#subnombre').html(Encuesta.E.subnomencuesta);
    $('#area').html(Encuesta.desareaimplic);
    $('#fecha').html(Encuesta.feccreacion);
    $('#finalTitulo').html(Encuesta.titulomsjfinal);
    $('#finalConten').html(Encuesta.contentmsjfinal);

    var sb = 0;

    //createInputHidden(id, clase, name, value, contenedor)
    createInputHidden("encuesta_id" + Encuesta.idencuesta, "encuesta_id", Encuesta.idencuesta, idForm);

    //Bloques
    for (b in Encuesta.Bloque) {
        Bloque = Encuesta.Bloque[b];
        var wrapperQuestionsId = createQuestionsBlock( "Bloque_" + Bloque.idbloque, Bloque.desbloque, idForm );
        stepBloques[sb++] = "Bloque_" + Bloque.idbloque; 	// Almaceno los bloques en un array.
        console.log('wrapperQuestionsId: ' +  wrapperQuestionsId);
        for (p in Bloque.Pregunta) {
            t = longitud(Encuesta.Bloque[b].Pregunta);

            Pregunta = Bloque.Pregunta[p];            
            var elementAlternativeId = createQuestion(
                "Pregunta_" + Pregunta.idpregunta,
                Pregunta.ordenpreg + ". " + Pregunta.despregunta,
                wrapperQuestionsId,
                "numpreg" + t
            );
            
            for (a in Pregunta.Alternativa) {
                Alternativa = Pregunta.Alternativa[a];

                // Pregunta Cerrada de Opcion unica.
                if (Alternativa.idtipoalternativa == 1 && Pregunta.respmultiple == 0) {

                    createInputRadio (
                        "ALTERN_B" + Pregunta.pidbloque + "P" + Alternativa.aidpregunta + "A" + Alternativa.idalternativa,
                        "btnradio",
                        "ALTERN_B" + Pregunta.pidbloque + "P" + Alternativa.aidpregunta,
                        Alternativa.desalternativa,
                        Alternativa.idalternativa,
                        Alternativa.ahabilitado,
                        elementAlternativeId
                    ); //createInputRadio(id, clase, name, text, value, enabled, contenedor)	
                }
                // Pregunta Cerrada de Opcion multiple.
                else if (Alternativa.idtipoalternativa == 1 && Pregunta.respmultiple == 1) {
                    //  createInputCheckbox(id, clase, name, text, value, enabled, contenedor)
                    createInputCheckbox(
                        "ALTERN_B" + Pregunta.pidbloque + "P" + Alternativa.aidpregunta + "A" + Alternativa.idalternativa,
                        "check",
                        "ALTERN_B" + Pregunta.pidbloque + "P" + Alternativa.aidpregunta,
                        Alternativa.desalternativa,
                        Alternativa.idalternativa,
                        Alternativa.ahabilitado,
                        elementAlternativeId
                    );
                }
                else if (Alternativa.idtipoalternativa == 2 ) {
                    //  createInputCheckbox(id, enabled, contenedor)
                    createInputText(
                        "ALTERN_B" + Pregunta.pidbloque + "P" + Alternativa.aidpregunta + "A" + Alternativa.idalternativa,
                        Alternativa.ahabilitado,
                        elementAlternativeId
                    );
                }
            }


            if (Pregunta.tienecomentario == 1) {
                createInputText(
                    "COMENT_B" + Pregunta.pidbloque + "P" + Pregunta.idpregunta,
                    Pregunta.etiquetacoment,
                    "Pregunta_" + Pregunta.idpregunta
                );
            }
        }
    }
    //formToMultiStep();
    //cerrarLoading();
}

// Bloque contenedor de un grupo de preguntas
function createQuestionsBlock(id, legendText, contenedor) {


    var elementQuestionBlockId = id;
    var elementQuestionsId = elementQuestionBlockId + '_Questions';
    console.log('cqb: ' + id + '   ' + elementQuestionsId);
    
    var divBloque = document.createElement("div");
    divBloque.setAttribute("id", id + "_Wrapper");
    divBloque.setAttribute("class", "form-bloqueContenedor");
    /*
     var divLegend = document.createElement("div");
     divLegend.setAttribute("class", "form-bloqueTitulo");	
     divLegend.appendChild(document.createTextNode(legendText));
     */
    //-----
    var divpnl = document.createElement("div");
    divpnl.setAttribute("class", "ibox border");

    var divpnlhdg = document.createElement("div");
    divpnlhdg.setAttribute("class", "ibox-title");
    divpnlhdg.appendChild(document.createTextNode(legendText));

    var divpnlbdy = document.createElement("div");
    divpnlbdy.setAttribute("id", id);
    divpnlbdy.setAttribute("class", "ibox-content");

    var divrow = document.createElement('div');
    divrow.setAttribute('id', elementQuestionsId);
    divrow.setAttribute('class', 'row row-cols-1 row-cols-md-3');

    divpnlbdy.appendChild(divrow);

    divpnl.appendChild(divpnlhdg);
    divpnl.appendChild(divpnlbdy);
    divBloque.appendChild(divpnl);
    //-----
    //divBloque.appendChild(divLegend);
    document.getElementById(contenedor).appendChild(divBloque);

    return elementQuestionsId;
}



function createFieldset(id, legendText, contenedor) {
    var fieldset = document.createElement("fieldset");
    fieldset.setAttribute("id", id);
    //fieldset.setAttribute("class", "form-bloqueContenedor");

    var legend = document.createElement("legend");
    //legend.setAttribute("class", "form-bloqueTitulo");	
    legend.appendChild(document.createTextNode(legendText));

    fieldset.appendChild(legend);
    document.getElementById(contenedor).appendChild(fieldset);
}


const Question = { //form-preguntaContenedor
    wrapper: 'question-wrapper card',
    heading: 'question-header card-header',
    title: 'question-title card-title',
    content: 'question-content card-body'
};

function createQuestion(id, text, container, classe) {

    /*
    <div class="col mb-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text"></p>
                <ul></ul>
            </div>
        </div>
    </div>
    */
    var elementQuestionId = id;
    var elementAlternativesId = elementQuestionId + '_Alternatives';
    
    var divcol = document.createElement('div');
    divcol.setAttribute('id', elementQuestionId);
    divcol.setAttribute('class', 'col mb-4');

    var divcard = document.createElement('div');
    divcard.setAttribute('class', 'card mb-3');

    var divcardheader = document.createElement('div');
    divcardheader.setAttribute('class', 'card-header');

    var h5 = document.createElement('h5');
    h5.appendChild(document.createTextNode(text));

    var ul = document.createElement('ul');
    ul.setAttribute('id', elementAlternativesId);
    ul.setAttribute('class', 'list-group list-group-flush');  

    divcardheader.appendChild(h5);    
    divcard.appendChild(divcardheader);
    divcard.appendChild(ul);
    divcol.appendChild(divcard);
    document.getElementById(container).appendChild(divcol);
    return elementAlternativesId;
}



function createCheckboxOrRadio(typeinput, id, clase, name, text, value, enabled, contenedor) {    
        
    /* Format Radio or Checkbox
    <li class="list-group-item">
        <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="customRadio1" name="customRadio" >
            <label class="custom-control-label" for="customRadio1">Toggle this custom radio</label>
        </div>
    </li>
    <li class="list-group-item">
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
        </div>
    </li>
    */    
    
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");//JL20150314 Add class radio

    var div = document.createElement("div");
    div.setAttribute("class", "custom-control custom-" + typeinput);
    
    var radio = document.createElement("input");
    radio.setAttribute("id", id);
    radio.setAttribute("class", "custom-control-input");    // + radio 
    radio.setAttribute("type", typeinput);
    radio.setAttribute("name", name);
    radio.setAttribute("value", value);
    if (!enabled) radio.setAttribute("disabled", "disabled"); 

    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.setAttribute("class", "custom-control-label   x-form-alternativaLabel");
    label.appendChild(document.createTextNode(text));

    //label.appendChild(radio);
    div.appendChild(radio);
    div.appendChild(label);
    li.appendChild(div);
    document.getElementById(contenedor).appendChild(li);
}

function createInputRadio(id, clase, name, text, value, enabled, contenedor)  {
    createCheckboxOrRadio('radio', id, clase, name, text, value, enabled, contenedor);
}

function createInputCheckbox(id, clase, name, text, value, enabled, contenedor)  {
    createCheckboxOrRadio('checkbox', id, clase, name, text, value, enabled, contenedor);
}




function createInputHidden(id, name, value, contenedor) {
    var hidden = document.createElement("input");
    hidden.setAttribute("id", id);
    hidden.setAttribute("class", "sga-poll-id");
    hidden.setAttribute("type", "hidden");
    hidden.setAttribute("name", name);
    hidden.setAttribute("value", value);
    document.getElementById(contenedor).appendChild(hidden);
}




function createInputText(id, enabled, contenedor) 
{
    /*
    <li class="list-group-item"></li>
    <input class="form-control" type="text" placeholder="Default input"></input>
    */

    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item form-comentarioContenedor");//JL20150314 Add class radio
    li.setAttribute("id", id);

    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("class", "form-control input form-comentarioInput form-comentario");
    input.setAttribute("type", "text");
    input.setAttribute("name", id);
    if (!enabled) input.setAttribute("disabled", "disabled"); 

    li.appendChild(input);
    document.getElementById(contenedor).appendChild(li);
}

function createInputComment(id, text, contenedor) 
{

    /*
    <li class="list-group-item"></li>
    <input class="form-control" type="text" placeholder="Default input"></input>
    */

    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item form-comentarioContenedor");//JL20150314 Add class radio
    li.setAttribute("id", id);

    // contenedor de desc pregunta
    var div = document.createElement("div");
    div.setAttribute("class", "form-comentarioTitulo");
    div.appendChild(document.createTextNode(text));

    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("class", "form-control input form-comentarioInput form-comentario");
    input.setAttribute("type", "text");
    input.setAttribute("name", id);
    
    div.appendChild(input);
    li.appendChild(div);
    document.getElementById(contenedor).appendChild(li);
}

function createErrorMessage(contenedor, msj) {
    if (!msj)
        msj = "Debe seleccionar una opción!";
    else
        msj = msj;
    var div = document.createElement("div");
    div.setAttribute("class", "alert alert-danger error-message");
    div.appendChild(document.createTextNode("Error: " + msj));
    document.getElementById(contenedor).appendChild(div);
}





// Indicador de Carga
function abrirLoading() {
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function cerrarLoading() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}



// Formulario Multi Step
var formPageStep = function () {
    this.p = new Number($("#formPageNum").html());// numero de pag
    this.t = new Number(stepBloques.length);// total pag 
}

function formToMultiStep() {
    alert("Tam: " + stepBloques.length);
    $("#formPageTotal").html(stepBloques.length);
    $("#formPageNum").html("1");

    for (i = 0; i < stepBloques.length; i++)
        $("#" + stepBloques[i]).hide();

    $("#" + stepBloques[0]).slideDown("slow");
    $("#formPaging").show();	// Mostrar el control de paginas.
}

function formNextStep() {
    $("#formnextstep").attr("disabled", "disabled")
    page = new formPageStep();
    if (page.p > 0 && page.p < page.t) {
        $("#" + stepBloques[page.p - 1]).fadeOut("slow", function () {
            $("#" + stepBloques[page.p]).slideDown("slow", function () {
                page.p++;
                $("#formPageNum").html(page.p);
                if (page.p != stepBloques.length)
                    $("#formnextstep").removeAttr("disabled");
                if (page.p != 1)
                    $("#formprevstep").removeAttr("disabled");
            });
        });
    } else
        alert("Fin");
}

function formPreviousStep() {
    $("#formprevstep").attr("disabled", "disabled");
    page = new formPageStep();
    if (page.p > 0) {
        page.p--;
        $("#" + stepBloques[page.p]).fadeOut("slow", function () {
            $("#" + stepBloques[page.p - 1]).slideDown("slow", function () {
                $("#formPageNum").html(page.p);
                $("#formprevstep").removeAttr("disabled");
                if (page.p != 1)
                    $("#formprevstep").removeAttr("disabled");
                if (page.p != stepBloques.length)
                    $("#formnextstep").removeAttr("disabled");
            });
        });
    } else
        alert("Inicio");
}

// Validar

function validarEncuesta() {
    $(".error-message").remove();
    $("div.form-preguntaContenedor").removeClass("error");

    var form = document.getElementById("formEncuesta");
    //var preguntas = form.getElementsByClassName("form-preguntaContenedor");
    var preguntas = $("#formEncuesta .form-preguntaContenedor .panel-body");	// JL20150314 Add .panel-body	
    var enviar = true;
    var respuestas = new Array();
    var r = 0;

    for (i = 0; i < preguntas.length; i++) {
        inputs = preguntas[i].getElementsByTagName("input");
        var numRptas = 0;	// Numero de respuesta por pregunta: 0 = Ninguna respuesta

        // Recorremos las alternativas por cada pregunta
        for (j = 0; j < inputs.length; j++) {
            input = inputs[j];
            if (input.type == "radio" && input.checked) {
                respuestas[r] = new Array(r, preguntas[i].id, input.name, input.value);
                r++;
                numRptas++;
            } else if (input.type == "checkbox" && input.checked) {
                respuestas[r] = new Array(r, preguntas[i].id, input.name, input.value);
                r++;
                numRptas++;
            } else if (input.type == "text" && input.value != "") {
                clas = input.getAttribute("class");
                if (clas.indexOf("form-comentario") != -1) {
                    respuestas[r] = new Array(r, preguntas[i].id, input.name, input.value, clas);
                    r++;
                }
                numRptas++;
            }
        }
        //verifico numero de respuesta de la pregunta.
        if (numRptas == 0) {
            createErrorMessage(preguntas[i].id);
            enviar = false;
            $("#" + preguntas[i].id).addClass("error");
        }
    }
    //print_r(respuestas);
    //var data = {array:respuestas, enviar:enviar};	

    idencuesta = $('#formEncuestaContent .sga-poll-id').val();

    //no enviar - demo
    //enviar = false;
    if (enviar) {
        respuestas = $.makeArray(respuestas);
        rptas = (JSON.stringify(respuestas));
        $.ajax({
            url: 'encuestas/guardar-encuesta.php', //server script to process data
            type: 'POST',
            data: { respuestas: rptas, encuesta: idencuesta },
            beforeSend: function (obj) { //abrirLoading(); 
            },
            success: function (data) {
                $("#encuesta").html(data);
                //cerrarLoading();
            }
        });
    }
    return false;
}

function llenarEncuesta() {
    var form = document.getElementById("formEncuesta");
    //var preguntas = form.getElementsByClassName("form-preguntaContenedor");		
    var preguntas = $("#formEncuesta .form-preguntaContenedor");

    for (i = 0; i < preguntas.length; i++) {
        inputs = preguntas[i].getElementsByTagName("input");
        var numRptas = 0;	// Numero de respuesta por pregunta: 0 = Ninguna respuesta

        // Recorremos las alternativas por cada pregunta
        for (j = 0; j < inputs.length; j++) {
            input = inputs[j];
            if (input.type == "radio" && !input.checked) {
                input.checked = true;
            } else if (input.type == "checkbox" && !input.checked) {
                input.checked = true;
            } else if (input.type == "text" && input.value == "") {
                input.value = "JLJL JorLu JarLin";
            }
        }
    }
}

/******************************************************************************
 * JS SGA Drag (Class_Drag.js)
 *****************************************************************************/

var Drag = {
    obj: null,
    init: function (o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
        o.onmousedown = Drag.start;

        o.hmode = bSwapHorzRef ? false : true;
        o.vmode = bSwapVertRef ? false : true;

        o.root = oRoot && oRoot != null ? oRoot : o;

        if (o.hmode && isNaN(parseInt(o.root.style.left)))
            o.root.style.left = "0px";
        if (o.vmode && isNaN(parseInt(o.root.style.top)))
            o.root.style.top = "0px";
        if (!o.hmode && isNaN(parseInt(o.root.style.right)))
            o.root.style.right = "0px";
        if (!o.vmode && isNaN(parseInt(o.root.style.bottom)))
            o.root.style.bottom = "0px";

        o.minX = typeof minX != 'undefined' ? minX : null;
        o.minY = typeof minY != 'undefined' ? minY : null;
        o.maxX = typeof maxX != 'undefined' ? maxX : null;
        o.maxY = typeof maxY != 'undefined' ? maxY : null;

        o.xMapper = fXMapper ? fXMapper : null;
        o.yMapper = fYMapper ? fYMapper : null;

        o.root.onDragStart = new Function();
        o.root.onDragEnd = new Function();
        o.root.onDrag = new Function();
    },

    start: function (e) {
        var o = Drag.obj = this;
        e = Drag.fixE(e);
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        o.root.onDragStart(x, y);

        o.lastMouseX = e.clientX;
        o.lastMouseY = e.clientY;

        if (o.hmode) {
            if (o.minX != null)
                o.minMouseX = e.clientX - x + o.minX;
            if (o.maxX != null)
                o.maxMouseX = o.minMouseX + o.maxX - o.minX;
        } else {
            if (o.minX != null)
                o.maxMouseX = -o.minX + e.clientX + x;
            if (o.maxX != null)
                o.minMouseX = -o.maxX + e.clientX + x;
        }

        if (o.vmode) {
            if (o.minY != null)
                o.minMouseY = e.clientY - y + o.minY;
            if (o.maxY != null)
                o.maxMouseY = o.minMouseY + o.maxY - o.minY;
        } else {
            if (o.minY != null)
                o.maxMouseY = -o.minY + e.clientY + y;
            if (o.maxY != null)
                o.minMouseY = -o.maxY + e.clientY + y;
        }
        document.onmousemove = Drag.drag;
        document.onmouseup = Drag.end;
        return false;
    },

    drag: function (e) {
        e = Drag.fixE(e);
        var o = Drag.obj;

        var ey = e.clientY;
        var ex = e.clientX;
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        var nx, ny;

        if (o.minX != null)
            ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
        if (o.maxX != null)
            ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
        if (o.minY != null)
            ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
        if (o.maxY != null)
            ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

        nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
        ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

        if (o.xMapper)
            nx = o.xMapper(y)
        else if (o.yMapper)
            ny = o.yMapper(x)

        Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
        Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
        Drag.obj.lastMouseX = ex;
        Drag.obj.lastMouseY = ey;

        Drag.obj.root.onDrag(nx, ny);
        return false;
    },

    end: function () {
        document.onmousemove = null;
        document.onmouseup = null;
        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
            parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
        Drag.obj = null;
    },

    fixE: function (e) {
        if (typeof e == 'undefined')
            e = window.event;
        if (typeof e.layerX == 'undefined')
            e.layerX = e.offsetX;
        if (typeof e.layerY == 'undefined')
            e.layerY = e.offsetY;
        return e;
    }
};



// From: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function romanize (num) {
    if (!+num)
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize (str) {
    var	str = str.toUpperCase(),
        validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        num = 0, m;
    if (!(str && validator.test(str)))
        return false;
    while (m = token.exec(str))
        num += key[m[0]];
    return num;
}

/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function (is224) {
    var method = createOutputMethod('hex', is224);
    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }
    method.create = function () {
      return new Sha256(is224);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }
    return method;
  };

  var nodeWrap = function (method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  var createHmacOutputMethod = function (outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (is224) {
    var method = createHmacOutputMethod('hex', is224);
    method.create = function (key) {
      return new HmacSha256(key, is224);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }
    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else { // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
      h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
      t1 = blocks[j - 2];
      s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;
    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }
        this.first = false;
      } else {
        s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        ab = a & b;
        maj = ab ^ (a & c) ^ bc;
        ch = (e & f) ^ (~e & g);
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }
      s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
      s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
      da = d & a;
      maj = da ^ (d & b) ^ ab;
      ch = (h & e) ^ (~h & f);
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
      s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
      cd = c & d;
      maj = cd ^ (c & a) ^ da;
      ch = (g & h) ^ (~g & e);
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
      s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
      bc = b & c;
      maj = bc ^ (b & d) ^ cd;
      ch = (f & g) ^ (~f & h);
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
      HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
      HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
      HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
      HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
      HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
      HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
      HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
      HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
      HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
      HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
      HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if (!this.is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
        HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
        HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
        HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var arr = [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
    ];
    if (!this.is224) {
      arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
    }
    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);
    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }
    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i, type = typeof key;
    if (type === 'string') {
      var bytes = [], length = key.length, index = 0, code;
      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = (new Sha256(is224, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();

// Variables Globales

var spinner = {
    circleplane: '<div class="spinner-wrapper">' +
		'<div class="sk-preloader"></div>' +
		'<div class="sk-texttop">DICDA</div>' +
		'<div class="sk-spinner sk-spinner-three-bounce">' +
		'<div class="sk-bounce1">S</div>' +
		'<div class="sk-bounce2">G</div>' +
		'<div class="sk-bounce3">A</div>' +
		'</div>' +
		'<div class="sk-textbottom">UNAS</div>' +
		'</div>'
};

var wrappers = {
    main: "#page-content"
};


function RequestAjax2(options) {

	let settings = {
		url: '/',
		data: null,
		context: null,
		method: 'POST',
		dataType: "html",	// [ default: automatic define, "xml", "html", "script", "json", "jsonp", "text" ]
		onbefore: null,
		oncomplete: null,
		success: null,
		complete: null,
		before: null,

		processData: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		cache: true,
		callback: function () {},
		//necesario para subir archivos via ajax
		//cache: true,   //default: true, false for dataType 'script' and 'jsonp'
		//xhr: false
	}

	let opt = Object.assign({}, settings, options);

	$.ajax({
		url: opt.url,
		type: opt.method,
		dataType: opt.dataType,
		context: opt.context, // Objeto jQuery q sera el contenedor
		data: opt.data,
		cache: opt.cache,
		contentType: opt.contentType,
		processData: opt.processData,

		xhr: function () {
			// console.log('RA2-XHR');
			// The response progress (XmlHttpRequest.onprogress)
			// This is when the browser is downloading the data from the server.
			// The request progress (XmlHttpRequest.upload.onprogress)
			// This is when the browser is sending the data to the server (including POST parameters, cookies, and files)
			// get the native XmlHttpRequest object
			var xhr = $.ajaxSettings.xhr();
			if (typeof opt.xhr === 'function') {
				opt.xhr(xhr);         //le paso el objeto xhr a la funcion que se invoke
			}
			return xhr;
		},

		error: function (jqXHR, textStatus, errorThrown) {
			console.error('RA2-' + textStatus.toUpperCase());
			console.error(errorThrown);
			console.error(jqXHR.readyState);
			console.error(jqXHR.responseText);
			console.error(jqXHR.statusCode);
			console.error(jqXHR.statusText);
		},

		beforeSend: function (jqXHR, options) {
			console.log('RA2-BEFORE');
			if (typeof opt.before === 'function') {
				console.log('OnBefore');
				opt.before(jqXHR, options);
			}
			else {
				if (opt.context === null || opt.context === 'modal') {
					console.log('Modal');
					overlayOn(spinner.circleplane);
					$('#ModalContent').remove();
					//console.log('ModalContent Remove!')
				}
				else if (opt.context === 'silent') {
					console.log('Before Silent');
				}
				else if (opt.context != '') {
					console.log('Before Not Empty');
					overlayOn(spinner.circleplane);
				}

				if (typeof opt.onbefore === "function") {
					opt.onbefore();
				}
			}
		},

		success: function (data, textStatus, jqXHR) {
			console.log('RA2-SUCCESS');
			if ( data == 'SESSION_EXPIRED' ) {
				Swal.fire({
					title: 'Su sesión ha expirado!',
					text: "Esto se debe a un largo periodo de inactividad en el sistema.",
					icon: 'warning',
					timer: 3000
				}).then((result) => {
					location.href='https://academico.unas.edu.pe/login';
				});
				return true;
			}

			if (typeof opt.success === 'function') {
				console.log('OnSuccess');
				opt.success(data, textStatus, jqXHR);
			}
			else {
				if (opt.dataType === 'json') {
					//console.log('content json');
				}
				else if (opt.context === 'print') {
					//console.log('Print');
					windowPrint = window.open();
					windowPrint.document.write(data);
					windowPrint.document.close();
					windowPrint.focus();
					setTimeout(() => { windowPrint.print(); }, 2000);
					setTimeout(() => { windowPrint.close(); }, 30000);
				}
				else if (opt.context === null || opt.context === 'modal') {
					//console.log('Modal');
					overlayOff();
					$(data).appendTo('body');
					$('#ModalContent').modal('show');
				}
				else if (opt.context === 'modal') {
					//console.log('Modal');
					overlayOff();
					$(data).appendTo('body');
					$('#ModalContent').modal('show');
				}
				else if (opt.context === 'silent') {
					console.log('Silent');
				}
				else if (opt.context === 'download') {
					console.log('Download');
					window.open("data:application/pdf;base64, " + data);
					var blob = new Blob([data], { type: 'application/octet-stream' });
					var link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					//link.download = "report.pdf";
					link.click();
				}
				else {
					overlayOff();
					//console.log('Page', opt.context);
					opt.context.html(data);
				}
				opt.callback(data, opt.data);
			}
		},

		complete: function (jqXHR, textStatus) {
			console.log('RA2-COMPLETE');
			if (typeof opt.complete === 'function') {
				console.log('OnComplete');
				opt.complete(jqXHR, textStatus);
			}
			else {
				overlayOff();
				if (typeof opt.oncomplete === "function") {
					console.log('Function OnComplete');
					opt.oncomplete();
				}
			}
		}

	});

}





var Download = function (element) {
	var xhr = new XMLHttpRequest();
	var link = element.getAttribute('href');
	console.log(link);

	xhr.open('POST', link, true);
	xhr.responseType = 'blob';

	xhr.onload = function (e) {
		if (this.status == 200) {
			var blob = new Blob([this.response], { type: 'application/octet-stream' });
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = "report.pdf";
			link.click();
		}
	};

	xhr.send();
}


/**
 * Registra actividad desde JavaScript
 * @requires RequestAjax2
 * @param {*} action
 * @param {*} param
 */
function UserActivityLog(action, param) {
	param || (param = null);
	RequestAjax2({
		data: { load: "TrackingController@index", action: action, param: param },
		context: 'silent',
		callback: function (response) {
			console.debug('UAL: ' + response)
		}
	});
}

/*
                                      __  ____      _______          
                                     |  \/  \ \    / /  __ \         
   ___ __ _ _ __ ___  _ __  _   _ ___| \  / |\ \  / /| |__) |__  ___ 
  / __/ _` | '_ ` _ \| '_ \| | | / __| |\/| | \ \/ / |  ___/ _ \/ __|
 | (_| (_| | | | | | | |_) | |_| \__ \ |  | |  \  /  | |_ |  __/\__ \
  \___\__,_|_| |_| |_| .__/ \__,_|___/_|  |_|   \/   |_(_) \___||___/
                     | |                                             
                     |_|                                             

Sample library created by Jose Alarcon (http://www.jasoft.org/)
*/

(function(w){

    //Helper class in order to define formats
    function Format(name, type) {
        this.name = name;
        this.mimeType = type;
    }

    ///// CONSTANTS
    const __formats = {
        'xls': new Format('Excel', 'data:application/vnd.ms-excel;base64'),
        'csv': new Format('CSV', 'data:text/plain'),
        'doc': new Format('Word', 'data:application/vnd.ms-word'),
        'html': new Format('HTML', 'data:text/html')
    };

    const __excelTemplate = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';    //The template to better export to Excel
    const __encodingMeta = '<meta charset="UTF-8">';  //The encoding to be able to work with non-english characters correctly
    ///// END CONSTANTS

    //// HELPER FUNCTIONS
    /**
     * Get the suitable format from the file extension
     * @param {string} fileName 
     */
    var __getFormatFromFileExt = function(fileName){
        var posDot = fileName.lastIndexOf('.');
        if (posDot <= 0)
            throw new Error('The file must have an extension');
        
        var ext = fileName.substring(posDot+1).toLowerCase();
        var formatInfo = __formats[ext];    //Get the format info from the proprties fo the format object
        if (!formatInfo)
            throw new Error('Unsupported format!!');
        else
            return formatInfo;
    };

    /**
     * Converto to base64
     * @param {string} str 
     */
    var __base64 = function(str) {
        return w.btoa(unescape(encodeURIComponent(str)))
    };

    /**
     * Replaces fields in the form {fieldName} in a template
     * @param {*} str The tempplate where field must be replaced
     * @param {*} fieldName The name of the field to be replaced (without the brackets)
     * @param {*} value The value to use as a replacement
     */
    var __replaceFields = function(template, fieldName, fieldValue) {
        return template.replace('{' + fieldName + '}', fieldValue);
    };

    /**
     * Converts a table element into a list using the specified separator, one row per line.
     * @param {DOMElement} eltTable 
     * @param {string} separator 
     */
    var __table2List = function (eltTable, separator) {
        if ( !(eltTable && eltTable.tagName == 'TABLE') )   //If it's not a table...
            throw new Error('Only tables can be converted to this format!!');
        
        //Hold the results in an array to optimize the process a little bit (instead of just using strings, althoug it could be obviously enhanced, it's not bad for a quick approach)
        var res = new Array(eltTable.rows.length);
        //loop through rows and cells to create each line
        for(var r=0; r<eltTable.rows.length; r++){
            var cells = eltTable.rows[r].cells;
            var line = new Array(cells.length);
            for(var c=0; c<cells.length; c++) {
                line[c] = cells[c].innerText;
            }
            res[r] = line.join(separator);
        }
        return res.join('\n');
    }
    //// END HELPER FUNCTIONS

    //// MAIN FUNCTION
    /**
     * Exports the table to the format specified by the filename
    var _export = function(DOMElmt, fileName, dataName) {
     * @param {element} objTable The DOM element to export (generally a table)
     * @param {string} fileName The name of the file to export the table to
     * @param {string} dataName Optional, the name of the worksheet when exporting to XLS
     */
    var _export = function(DOMElmt, fileName, dataName) {
        //Get the file format info from the file extension
        var format = __getFormatFromFileExt(fileName);

        //Get the info from the element
        var html = DOMElmt.outerHTML;

        //Generate file
        var rawData = '';   //For IE
        var resData = format.mimeType + ',';
        switch (format.name) {
            case 'Excel':
                dataName = dataName || 'ExportedData';    //Default name for the worksheet
                rawData = __replaceFields(__excelTemplate, 'table', html);    //The table data
                rawData = __replaceFields(rawData, 'worksheetName', dataName);  //The name of the Excel worksheet
                resData += __base64(__encodingMeta + rawData);
                break;
            case 'CSV':
                rawData = __table2List(DOMElmt);
                resData += '\ufeff' + encodeURIComponent(rawData);    //Adding the UTF-8 BOM to force Excel to interpret the data in UTF-8, so that non-English characters are correctly displayed
                break;
            case 'Word':
                rawData = html;
                resData += encodeURIComponent(__encodingMeta + html);
                break;
            case 'HTML':
                rawData = html;
                resData += __encodingMeta + html;
                break;
        }

        if (navigator.userAgent.indexOf('MSIE ') > 0 || navigator.userAgent.indexOf('Trident/') > 0)      // If Internet Explorer
        {
            //We need to append an iframe and write directly in it :-S Encodings don't work either: just the plain content.
            var ifr = w.document.createElement('iframe');
            ifr.style.display= 'none';
            w.document.body.appendChild(ifr);
            ifr.contentWindow.document.open("txt/html","replace");
            ifr.contentWindow.document.write(rawData);
            ifr.contentWindow.document.close();
            ifr.focus();
            ifr.contentWindow.document.execCommand("SaveAs",true,fileName);
            w.document.body.removeChild(ifr);
        }  
        else {  //Rest of the browsers (except MS Edge: no way to have it working there)
            //Create a link, not in the DOM, to get the resulting document
            var link = w.document.createElement('a');
            link.download = fileName;
            link.href = resData;
            //In firefox only links attached to the DOM will work so we need to attach it first
            link.style.display = 'none';
            w.document.body.appendChild(link);
            link.click();   //Simulation of a click on a real link
            w.document.body.removeChild(link);
        }
    };
    ////END MAIN FUNCTION

    //Export the funcionality through a global object
    if (!w.Exporter) {
        w.Exporter = {
            'export': _export
        };
    }
})(window);

(function (global) {
	var Timetables = function (option) {
		this.el = document.querySelector(option.el);
		this.Timetables = option.timetables || [];
		this.week = option.week || [];
		this.merge = typeof option.merge === "boolean" ? option.merge : true;		// Define si se fusiona las horas seguidas o genera un item por cada hora
		this.TimetableType = option.timetableType || [];
		this.leftHandText = [];
		this.highlightWeek = option.highlightWeek || "";
		this.gridOnClick = typeof option.gridOnClick === "function" ? option.gridOnClick : undefined;
		var styles = option.styles || {};
		this.leftHandWidth = styles.leftHandWidth || 40;
		this.Gheight = styles.Gheight || 48;

		this.topHeader = 24;

		this.defaultPalette = [
			"#f05261",
			"#48a8e4",
			"#ffd061",
			"#52db9a",
			"#70d3e6",
			"#52db9a",
			"#3f51b5",
			"#f3d147",
			"#4adbc3",
			"#673ab7",
			"#f3db49",
			"#76bfcd",
			"#b495e1",
			"#ff9800",
			"#8bc34a"
		];
		this.palette = typeof styles.palette === "boolean" && !styles.palett ? false : (styles.palette || []).concat(this.defaultPalette);
		this._init();
	};


	Timetables.prototype = {

		_init: function (option) {
			var option = option || {};
			var style = option.styles || {};
			var gridOnClick = option.gridOnClick || this.gridOnClick;
			var merge = typeof option.merge === "boolean" ? option.merge : this.merge;
			var highlightWeek = option.highlightWeek || this.highlightWeek;
			var leftHandText = this.leftHandText;
			var leftHandWidth = style.leftHandWidth || this.leftHandWidth;
			var Gheight = style.Gheight || this.Gheight;
			var topHeader = style.topHeader || this.topHeader;
			var palette;
			if (typeof style.palette === "boolean" && !style.palette) {
				palette = false;
			} else {
				palette = style.palette ? (style.palette || []).concat(this.defaultPalette) : this.palette;
			}

			var Timetables = option.timetables || this.Timetables;
			var week = option.week || this.week;
			var TimetableType = JSON.parse(
				JSON.stringify(option.timetableType || this.TimetableType)
			);
			var deepCopyTimetableType = option.timetableType || this.TimetableType;
			var TimetableTypeLength = TimetableType.length;

			var CoursesIndex = [];
			var daysOfTheWeek = 7;
			var startTime = 7;
			var endTime = 22;
			var innerWidth = Math.round((window.innerWidth - leftHandWidth) / week.length) - 10;

			Timetables.forEach(function(item, index){
				if ( item.courseid != "" && !CoursesIndex.includes(item.courseid) ) {
					CoursesIndex.push(item.courseid);
				}
			});

			if( !merge ) {
				let TimetablesDesconsolidate = [];
				Timetables.forEach(function(item, index){
					let obj = JSON.parse( JSON.stringify( item ) );
					if ( item.length > 1 ) {
						for(let i=0; i<item.length; i++) {
							obj.hour = (parseInt(item.hour) + i);
							obj.length = 1;
							this.push( JSON.parse( JSON.stringify(obj)) );
						}
					}
				}, TimetablesDesconsolidate);
				Timetables = TimetablesDesconsolidate.slice();
			}

			//console.log(Timetables);

			if (option.setNewOption) {
				this.el.removeChild(this.el.childNodes[0]);
			}

			var courseWrapper = document.createElement("div");
				courseWrapper.id = "JLTimetable";
				courseWrapper.style.position = "relative";
				courseWrapper.style.paddingLeft = leftHandWidth + "px";
				courseWrapper.style.border = "1px solid #dbdbdb";

			TimetableType.forEach(function (item, index) {
				item.unshift(index + 1);
			});

			var leftHand = document.createElement("div");
				leftHand.className = "Courses-leftHand";
				leftHand.style.position = "absolute";
				leftHand.style.left = 0;
				leftHand.style.top = 0;
				leftHand.style.width = leftHandWidth + "px";

			var layoutTimetable = {
				head: { className: "Courses-head" },
				content: { className: "Courses-content" },
				courseItems: { className: "stage_" }
			}

			var head = document.createElement("div");
			head.style.overflow = "hidden";
			head.className = layoutTimetable.head.className;
			week.forEach(function (item, index) {
				var weekItem = document.createElement("div");
				var highlightClass = highlightWeek === index + 1 ? "highlight-week " : "";
				weekItem.className = highlightClass + layoutTimetable.head.className + "-" + (index + 1);
				weekItem.innerText = item.toUpperCase();
				weekItem.style.cssFloat = "left";
				weekItem.style.boxSizing = "border-box";
				weekItem.style.whiteSpace = "nowrap";
				weekItem.style.height = topHeader + 'px';		// altura del encabezado
				weekItem.style.width = 100 / week.length + "%";
				head.appendChild(weekItem);
			});
			courseWrapper.appendChild(head);

			var courseListContent = document.createElement("div");
				courseListContent.className = layoutTimetable.content.className;

			week.forEach(function(itemWeek, indexWeek){
				let highlightClass = highlightWeek === indexWeek + 1 ? "highlight-week " : "";
				var courseItems = document.createElement("ul");
					courseItems.style.listStyle = "none";
					courseItems.style.width = (100 / week.length) + "%";
					courseItems.style.padding = "0px";
					courseItems.style.margin = "0px";
					courseItems.style.minHeight = (Gheight * TimetableType.length) + "px";
					courseItems.className = "weekday " + layoutTimetable.courseItems.className + (indexWeek+1) + ' ' + ((TimetableType[0] || [])[0] || "none") + ' ' + highlightClass;

				TimetableType.forEach(function(itemHour, indexHour){
					var courseItem = document.createElement("li");
						courseItem.style.cssFloat = "left";
						courseItem.style.width = "100%";
						courseItem.style.height = Gheight + "px";
						courseItem.style.boxSizing = "border-box";
						courseItem.style.position = "relative";
						courseItem.className = "cell-data";

					let schedule = [];
					Timetables.forEach(function(item, index) {
						if ( item.day == (indexWeek + 1) && item.hour == (indexHour + startTime) ) {
							schedule.push(item);
						}
					});

					schedule.forEach(function(item, index){
						var mergeDom = document.createElement("div");
							mergeDom.style.position = "relative";
							mergeDom.style.zIndex = 9;
							mergeDom.style.width = (100 / schedule.length) + "%";
							mergeDom.style.height = Gheight * item.length + "px";
							mergeDom.style.float = "left";
							mergeDom.style.left = 0;
							mergeDom.style.top = 0;
							mergeDom.className = "course-hasContent";

						if (palette) {
							mergeDom.style.backgroundColor = palette[CoursesIndex.indexOf(item.courseid)]; //palette[paletteIndex];
							mergeDom.style.color = "#fff";
						}

						let courseName = item.coursename;
						if ( innerWidth < 130 || (innerWidth/schedule.length) < 130 ) {
							let initials  = "";
							item.coursename.split(" ").forEach( value => {
								initials += (value.length>3) ? value[0] : "";
							});
							courseName = initials;
						}

						let textDisplay = item.courseid + '\n' + courseName + '\n' + item.classroomabbr;
						if( !item.istheory && item.practicegroup > 0 ) {
							textDisplay += '\nGrupo ' + item.practicegroup;
						}
						mergeDom.innerText = textDisplay;

						mergeDom.onclick = function (e) {
							var allList = document.querySelectorAll('.Courses-content ul li').forEach(function (v, i) {
								v.classList.remove('grid-active');
							});
							this.className = 'grid-active';

							item.hour = parseInt(item.hour);
							item.length = parseInt(item.length);
							item.istheory = parseInt(item.istheory);
							item.practicegroup = parseInt(item.practicegroup);

							let info = Object.assign({
								week: week[indexWeek],
								index: index + 1,
								typeclass: (item.istheory > 0) ? 'Teoría' : 'Práctica' + ( (item.practicegroup) ? ' - Grupo ' + item.practicegroup : '' ),
							}, item);
							gridOnClick && gridOnClick(info);
						};
						courseItem.appendChild(mergeDom);
					});
					courseItems.appendChild(courseItem);
				});
				courseListContent.appendChild(courseItems);
			});

			courseWrapper.appendChild(courseListContent);
			courseWrapper.appendChild(leftHand);
			this.el.appendChild(courseWrapper);

			var coursesHeadDomHeight = document.querySelector(".Courses-head").offsetHeight;
			var courseItemDomHeight = (document.querySelector(".stage_1 li") || document.querySelector(".stage_none li")).offsetHeight;

			if (!courseItemDomHeight) { courseItemDomHeight = Gheight }	// cuando muestra en modal tiene un valor 0. revisar!


			var leftHandTextDom = document.createElement("div");
				leftHandTextDom.className = "left-hand-TextDom";
				leftHandTextDom.style.height = topHeader + "px"; //coursesHeadDomHeight + "px";
				leftHandTextDom.style.boxSizing = "border-box";
				leftHandText.forEach(function (item) {
					var leftHandTextItem = document.createElement("div");
					leftHandTextItem.innerText = item;
					leftHandTextDom.appendChild(leftHandTextItem);
				});
				leftHand.appendChild(leftHandTextDom);

			deepCopyTimetableType.forEach(function (item, index) {
				var handItem = document.createElement("div");
					handItem.style.width = "100%";
					handItem.style.height = courseItemDomHeight * item[1] + "px";
					handItem.style.boxSizing = "border-box";
					handItem.style.textAlign = "center";
					handItem.style.lineHeight = Gheight + "px";

				if (typeof item[0] === "object") {
					for (var v in item[0]) {
						var handItemInner = document.createElement("p");
						handItemInner.innerText = item[0][v];
						handItemInner.style.margin = "0px";
						handItemInner.className = "left-hand-" + v;
						handItem.appendChild(handItemInner);
					}
				} else {
					handItem.innerText = item[0] || "";
				}
				handItem.className = "left-hand-" + (index + 1);
				leftHand.appendChild(handItem);
			});
		},

		setOption: function (option) {
			(option || {}).setNewOption = true;
			this._init(option);
		}
	};

	if (typeof module !== "undefined" && module.exports)
		module.exports = Timetables;

	if (typeof define === "function")
		define(function () {
			return Timetables;
		});
	global.Timetables = Timetables;
})(this);

// DataTables SGA

var datatables = {

	spanish: {
		"lengthMenu": "Visualizar _MENU_ registros por página",
		//"zeroRecords": "Lo siento, no se encontraron resultados!",
		"info": "Visualizando página _PAGE_ de _PAGES_",
		"infoEmpty": "No records available",
		"infoFiltered": "(filtradas de _MAX_ entradas totales)",
		"search": "Buscar:",
		"paginate": {
			"first": "Primero",
			"last": "Último",
			"next": "Siguiente",
			"previous": "Anterior"
		},
		"processing": spinner.circleplane + "Cargando datos.."
	},

	responsive: {

		rendererAsTable: function(api, rowIdx, columns) {
			let data = $.map(columns, function (col, i) {
				return col.hidden ?
					'<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
					'<td class="text-left align-middle">' + col.title + ':' + '</td> ' +
					'<td class="text-center align-middle">' + col.data + '</td>' +
					'</tr>' : '';
			}).join('');
			return data ? $('<table class="table table-sm"/>').append(data) : false;
		}

	}

}


/******************************************************************************
 *   IN Active Navbar
 *   version 2.9.3
 *****************************************************************************/

$(document).ready(function(){

    if ( $('header nav').hasClass('navbar-static-top') ) {
        $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
        $("body").removeClass('boxed-layout');
        $("body").addClass('fixed-nav');
        $('#boxedlayout').prop('checked', false);
    } 
    else if ( $('header nav').hasClass('navbar-fixed-top') ) {
        $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
        $("body").removeClass('fixed-nav');
        $("body").removeClass('fixed-nav-basic');
        $('#fixednavbar2').prop('checked', false);
    }

});

// DOCENTES FUNCTIONS
//=========================================================================

function docenteIngNotas() {
    var codcurso    = $("#btn-doc-ingnotas").data("codcurso");
    var subcodcurso = $("#btn-doc-ingnotas").data("subcodcurso");
    var codsem   = $("#btn-doc-ingnotas").data("codsem");
    var tiponota = parseInt($("#SelectEvalType").val());
    var nronota  = parseInt($("#SelectEvalNumber").val());
    //var contenedor = "#doc-cursos-notas";
    var contenedor = "#curso-notas-form";
    var container = $(contenedor)[0];
    var ajax = nuevoAjax();

    if (tiponota === 0) {
        //cargar el ingreso de todas las evaluaciones
        console.log('//cargar el ingreso de todas las evaluaciones');
        var pid = 58;
    } else if (tiponota > 0) {
        //cargar ingreso por tipo de evaluacion
        if ( (nronota > 0 && nronota < 50) || nronota === -1){
            //cargar ingreso por tipo y numero de evaluacion
            var pid = 54;
        } else {
            swal("Aviso", "Elija el Número de Evaluación!", "warning");
            return false;
        }
	}


	if (codcurso+subcodcurso == 'xcsdfs' || codcurso+subcodcurso == 'NIS605' ) { //|| codcurso+subcodcurso == 'BI010108D') {
		//for test only
		RequestAjax2({
			data: { load: 'ProfessorRegisterNotesController@index',
				codCurso: codcurso, codSem: codsem, tipoNota: tiponota, nroNota: nronota, subCodCurso: subcodcurso
			},
			context: $('#curso-notas-form'),
		});
	}
	else {
		$(contenedor).html(spinner.circleplane);
		var parametro = "varID=" + pid + "&codCurso=" + codcurso + "&codSem=" + codsem + "&tipoNota=" + tiponota + "&nroNota=" + nronota + "&subCodCurso=" + subcodcurso;
		$("#curslistAlu").html(spinner.circleplane);
		requestPOST("tareas.php", parametro, ajax, container, 0);
	}

}

function docenteVerNotas() {
    var subcodcurso = $("#btn-doc-vernotas").data("subcodcurso");
    var codcurso = $("#btn-doc-vernotas").data("codcurso");
    var codsem   = $("#btn-doc-vernotas").data("codsem");
    var tiponota = parseInt($("#SelectEvalType").val(), 10);
    var nronota  = parseInt($("#SelectEvalNumber").val(), 10);
    var ajax = nuevoAjax();
    var pid = 0;
    //var contenedor = "#doc-cursos-notas";
    var contenedor = "#curso-notas-form";
    var container = $(contenedor)[0];
    var parametro = "";

    //console.debug(codcurso, codsem, tiponota, nronota);

    if (tiponota === 0) {
        //visualizar todas las evaluaciones
        pid = 60;
        //parametro = "varID=" + pid + "&codCurso=" + codcurso + "&codSem=" + codsem;
        parametro = {varID: pid, codcurso: codcurso, codsem: codsem, subcodcurso:subcodcurso};
    } else if (tiponota > 0) {
        if (nronota > 0 && nronota < 50) {
            //ver notas segun tipo y nro nota
            pid = 11045;
            //parametro = "pid=" + pid + "&codcurso=" + codcurso + "&codsem=" + codsem + "&tiponota=" + tiponota + "&nronota=" + nronota;
            parametro = {pid: pid, codcurso: codcurso, codsem: codsem, tiponota: tiponota, nronota: nronota, subcodcurso:subcodcurso};
        } else if (nronota === -1) {
            //visualizar por tipo de evaluacion todas las notas
            pid = 57;
            //parametro = "varID=" + pid + "&codCurso=" + codcurso + "&codSem=" + codsem + "&tipoNota=" + tiponota + "&nroNota=" + nronota;
            parametro = {varID: pid, codcurso: codcurso, codsem: codsem, tiponota: tiponota, nronota: nronota, subcodcurso:subcodcurso};
        } else {
            swal("Lo siento :(", "Este tipo de Evaluación no esta considerado en su Método de Evalación!", "error");
            return false;
        }
    }
    $(contenedor).html(spinner.circleplane);
    //requestPOST("tareas.php", parametro, ajax, container, 0);
    RequestAjax("tareas.php", parametro, $(contenedor));
    //botonPrint("curso-notas-form", codcurso, pid);
}


//JLJL 06/12/2015
function entregarActa(codsem, codcurso) {

	Swal.fire({
		title: 'Entregar Acta Digital',
		html: '<div class="text-justify text-18rem"><ul>' +
			'<li>Una vez entregado el Acta, el curso será cerrado y bloqueado, por lo que no habrá opción a modificaciones y/o correciones de las notas registradas!</li>' +
			'<li>Al entregar el Acta usted garantiza que ha verificado todas las notas y da conformidad de que los promedios finales obtenidos son conformes.</li>' +
			//'<li>Toda error en el llenado de Notas es responsabilidad del Docente, y se someterá a las saciones establecidas según el caso y los costos estipulados en el TUPA para la correción del Acta.</li></div>' +
			'Confirma que desea cerrar y bloquear el Acta y proceder a entregarla?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Entregar Acta!',
		cancelButtonText: 'Aún No! Cancelar!!'
	}).then((result) => {
		if (result.isConfirmed) {
			RequestAjax2({
				data: { load: 'ActaDigitalController@send', data: { codcurso: codcurso, codsem: codsem } },
				context: null,
				callback: function (received) {
					Swal.fire({
						title: 'Entregar Acta Digital',
						html: received,
						icon: 'success'
					});
					RequestAjax2({
						data: { load: 'ProfessorCoursesController@index', codsem: codsem },
						context: $(wrappers.main)
					});
				}
			});
		}
	})

}



/******************************************************************************
 * JS SGA New Functions JS
 *****************************************************************************/

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


function overlayOn(content) {
	var content = '<div class="overlay-content">' + content + '</div>';
	document.getElementById('overlay').innerHTML = content;
	document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
	document.getElementById('overlay').innerHTML = '';
	document.getElementById('overlay').style.display = 'none';
}

function redirecTo(url) {
	if (url == '/') {
		url = 'https://academico.unas.edu.pe/';
	}
	window.location = url;
}

/**
 * Manejo de Modals
 * @param {*} params
 */
function showModal(params) {
	var def = {
		title: '',
		icon: 'fa-times',
		size: '',    //modal-sm modal-xlg
		content: '',
		time: 200,
		bgHeader: 'bg-green',
		btnType: 'btn-default',
		btnText: 'Cerrar',
		btnClose: true,
		btnAction: null,
		footer: ''
	};

	var opt = Object.assign({}, def, params);

	setTimeout(function () {
		$('#modalAlert').on('show.bs.modal', function () {
			$('#modalAlert .modal-header').addClass(opt.bgHeader);
			$('#modalAlert .modal-title').html(opt.title);
			$('#modalAlert .modal-icon').html('<i class="fa fa-2x fa-fw ' + opt.icon + '"></i>');
			$('#modalAlert .modal-message').html(opt.content);

			$('#modalAlert .modal-dialog').addClass(opt.size);

			if (opt.footer !== '') {
				$('#modalAlert .modal-footer').html(opt.footer);
			} else {
				if (opt.btnClose) {
					opt.footer = '<button type="button" data-dismiss="modal" class="btn ' + opt.btnType + '">' + opt.btnText + '</button>';
				} else {
					opt.footer = '<button type="button" class="btn ' + opt.btnType + '">' + opt.btnText + '</button>';
				}
				$('#modalAlert .modal-footer').html(opt.footer);
			}
		});

		$('#modalAlert').modal({
			backdrop: 'static', // evitar q cierre al hacer click en el fondo oscuro
			show: true
		});

		$('#modalAlert').on('hidden.bs.modal', function (e) {
			$('#modalAlert .modal-message').html('');
		})

		UserActivityLog("MODAL", opt.title.substring(0, 20));
	}, opt.time);
}

function hideModalContent() {
	console.log('cerando modal');
	$('#ModalContent').modal('hide');
	$('.modal-backdrop').remove();
}


function getNotifications() {
	RequestAjax2({
		data: { load: 'NotificationsController@show' },
		context: $('#navbarNotifications')
	});
}


const App = {

	getSemesterStatus: () => {
		RequestAjax2({
			data: { load: 'SemesterController@show' },
			context: $('#navbarSemester')
		});
	},

	getAcademicCalendar: (semesterId, numEvents = 5) => {
		RequestAjax2({
			data: { load: 'AcademicCalendarController@events', data: { codsem: semesterId, numevents: numEvents } },
			context: $('#CalendarioAcademico')
		});
	}

}

function setSemesterActive(semester) {
	if (semester.match(/([1-2][0-9][0-9][0-9])-[0-2]$/)) {
		RequestAjax2({
			data: { load: 'SemesterController@change', data: { codsem: semester } },
			callback: function (response) {
				if (response === '1') {
					Swal.fire({
						title: semester,
						text: 'Semestre Activado!',
						icon: 'success',
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Aceptar'
					}).then((result) => {
						redirecTo('/');
					});
				}
			}
		});
	}
}

function changeSemestre() {
	var semester = $("#txtSelectSem").val();
	setSemesterActive(semester);
}

// Professor Semestre
// ----------------------------------------------------------------------------

//editEvaluationMethod()


//saveEvaluationMethod()



// !!! Revisar !!!
function showNotification(title, message, time, classIcon, classBgHeader, btnClass, btnText, htmlFooter, modalSize) {
	time || (time = 200);
	classIcon || (classIcon = 'glyphicon glyphicon-info-sign');
	classBgHeader || (classBgHeader = 'bg-green');
	btnClass || (btnClass = 'btn-default');
	btnText || (btnText = 'Entendido!');
	htmlFooter || (htmlFooter = '<button type="button" data-dismiss="modal" class="btn ' + btnClass + '">' + btnText + '</button>');
	modalSize || (modalSize = '');

	setTimeout(function () {
		$('#modalAlert').on('hidden.bs.modal', function (e) {
			console.log('NOTIFY CLOSEDBYUSER');
			UserActivityLog('NOTIFY', 'CLOSEDBYUSER');
		});
		$('#modalAlert').on('show.bs.modal', function (event) {
			$('#modalAlert .modal-header').removeClass('bg-red bg-green bg-yellow bg-info bg-blue bg-blue2 bg-success bg-danger bg-primary');
			$('#modalAlert .modal-header').addClass(classBgHeader);
			$('#modalAlert .modal-title').html(title);
			$('#modalAlert .modal-icon').html('<span class="text-28 ' + classIcon + '"></span>&nbsp;&nbsp;');
			$('#modalAlert .modal-message').html(message);
			$('#modalAlert .modal-footer').html(htmlFooter);
			if (modalSize !== '') {
				$('#modalAlert .modal-dialog').css('width', '720px');
			}
		});
		$('#modalAlert').modal({
			backdrop: 'static', // evitar q cierre al hacer click en el fondo oscuro
			show: true
		});

		UserActivityLog("NOTIFY", title.substring(0, 20));
	}, time);
}


function loginAs(uid, rid) {
	Swal.fire({
		html: spinner.circleplane,
		showConfirmButton: false,
		timer: 2000,
		footer: '<a href="#">Accediendo al usuario...</a>'
	});
	$.post("/login/as", { userid: uid, roleid: rid }, function (response) {
		console.log(response);
		if (response) {
			switch (rid) {
				case 0: window.location.href = '/alumno'; break;
				//case 1: window.location.href = '/docente'; break;
				case 2: window.location.href = '/funcionario'; break;
				case 3: window.location.href = '/egresado'; break;
				default: window.location.href = '/'; break;
			}
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Cambio de Usuario',
				text: 'No es posible acceder al usuario!'
			});
		}
	});
}


function resetPasw(uid, rid) {

	if ( rid < 0 || rid > 3) {
		return false;
	}

	switch (rid) {
		case 0: request = '/mail/credentials/reset/student/' + uid; break;
		case 1: request = '/mail/credentials/reset/professor/' + uid; break;
		case 2: request = '/mail/credentials/reset/functionary/' + uid; break;
		case 3: request = '/mail/credentials/reset/graduate/' + uid; break;
	}


	console.log('passw reset 1!');

	RequestAjax2({
		context: 'silent',
		dataType: 'json',
		url: request,
		data: {},
		callback: function (response) {

			console.log('passw reset 2!');
			console.log(response);

			Swal.fire({
				icon: response.status,
				title: response.title,
				text: response.description
			});
		}
	});
}

function pideRequest(tdoc, ndni) {
	// $.post("https://dicda.unas.edu.pe/sga_getpide.php", { appkey: '1BF3798CCFBF9696352FAC20A1D7D47AAC7043C22ED90E8D1479D0423102F504', dni: ndni })
	// 	.done(function (result) {
	// 		// console.debug(result);
	// 		// console.log(JSON.parse(result));
	// 		RequestAjax2({
	// 			data: { load: 'StudentInformationController@savePideReniec', data: { tdoc: tdoc, ndni: ndni, data: result } },
	// 			context: 'silent',
	// 			callback: function (response) {
	// 				console.log(response);
	// 			}
	// 		});
	// 	});

	$.ajax({
		cache: false,
		type: "POST",
		crossDomain: true,
		url: "https://dicda.unas.edu.pe/sga_getpide.php",
		data: { appkey: '1BF3798CCFBF9696352FAC20A1D7D47AAC7043C22ED90E8D1479D0423102F504', dni: ndni },
		success: function (result){
			RequestAjax2({
				data: { load: 'StudentInformationController@savePideReniec', data: { tdoc: tdoc, ndni: ndni, data: result } },
				context: 'silent',
				callback: function (response) {
					//console.log(response);
				}
			});
		}
	});
}


// Hash any string into an integer value
// Then we'll use the int and convert to hex.
function hashCode(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
}

// Convert an int to hexadecimal with a max length
// of six characters.
function intToARGB(i) {
	var hex = ((i >> 24) & 0xFF).toString(16) +
		((i >> 16) & 0xFF).toString(16) +
		((i >> 8) & 0xFF).toString(16) +
		(i & 0xFF).toString(16);
	// Sometimes the string returned will be too short so we
	// add zeros to pad it out, which later get removed if
	// the length is greater than six.
	hex += '000000';
	return hex.substring(0, 6);
}

function strToHexRGB(str) {
	return intToARGB(hashCode(str));
}


/******************************************************************************
 * JS-SGA Functions for entering Notes
 *****************************************************************************/


function GuardarNotaTodas(codCurso, subCodCurso, codSem, cantTipo1, cantTipo2, cantTipo3, cantTipo4, cantTipo5, cantTipo6, cantAlum, nombrevar) {
    var i, j, da, c = 0, cadenanotas;
    cadenanotas = '';

    for (j = 1; j <= (cantTipo1); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-1-' + j + '-' + i).value) == '' || document.getElementById(nombrevar + '-1-' + j + '-' + i).disabled) {
            } else {
                cadenanotas = cadenanotas + '&' + ('1-' + j + '-' + i) + '=' + document.getElementById(nombrevar + '-1-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    for (j = 1; j <= (cantTipo2); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-2-' + j + '-' + i).value) == '' || document.getElementById(nombrevar + '-2-' + j + '-' + i).disabled) {
            } else {
                cadenanotas = cadenanotas + '&' + ('2-' + j + '-' + i) + '=' + document.getElementById(nombrevar + '-2-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    for (j = 1; j <= (cantTipo3); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-3-' + j + '-' + i).value) == '' || document.getElementById(nombrevar + '-3-' + j + '-' + i).disabled) {
            } else {
                cadenanotas = cadenanotas + '&' + ('3-' + j + '-' + i) + '=' + document.getElementById(nombrevar + '-3-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    for (j = 1; j <= (cantTipo4); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-4-' + j + '-' + i).value) == '' || document.getElementById(nombrevar + '-4-' + j + '-' + i).disabled) {
            } else {
                cadenanotas = cadenanotas + '&' + ('4-' + j + '-' + i) + '=' + document.getElementById(nombrevar + '-4-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    // EF guardar las notas bloqueadas por inasistencia: add:  &&
    // document.getElementById(nombrevar + '-5-' + j + '-' + i).className != 'form-control no-attendance'
    for (j = 1; j <= (cantTipo5); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if (
                document.getElementById(nombrevar + '-5-' + j + '-' + i).value == '' ||
                (
                    document.getElementById(nombrevar + '-5-' + j + '-' + i).disabled &&
                    document.getElementById(nombrevar + '-5-' + j + '-' + i).className != 'form-control no-attendance'
                )
            ) {
            } else {
                cadenanotas = cadenanotas + '&' + ('5-' + j + '-' + i) + '=' + document.getElementById(nombrevar + '-5-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    for (j = 1; j <= (cantTipo6); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById('susti' + '-' + j + '-' + i).value) == '' || document.getElementById('susti' + '-' + j + '-' + i).disabled) {
            } else {
                cadenanotas = cadenanotas + '&' + ('6-' + j + '-' + i) + '=' + document.getElementById('susti' + '-' + j + '-' + i).value;
                c += 1;
            }
        }
    }

    if (c > 0) {
        //        var ajax = nuevoAjax();
        //        var varID = 62;
        //        var contenedor = "curslistAlu";
        //        var divMensaje = document.getElementById(contenedor);
        //        requestPOST("tareas.php", "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&cantTipo6=" + cantTipo6 + "&varID=" + varID + cadenanotas, ajax, divMensaje, 0);
        //        //alert('Las Notas Fueron Guardadas..!');
        //        //codCurso = codCurso + subCodCurso;
        //        //veriOpcIngNotas(codCurso,codSem,'NtipoNota','NnroNota','Naccion');

        //var codalumnoss  = JSON.stringify(lisCodAlumno);
        //var notaalumnoss = JSON.stringify(lisNotaAlumno);
        Swal.fire({
            title: 'Registro de Notas',
            text: "Seguro de Guardar estas Notas?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, Guardar!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
            function () {
                var pid = 62;
                var container = $("curso-notas-form");
                RequestAjax(
                    "tareas.php",
                    //{ varID:pid, codCurso: codCurso, subCodCurso: subCodCurso, codSem: codSem, lisCodAlumno: codalumnoss, lisNotaAlumno: notaalumnoss, tipoNota: tipoNota, nroNota: nroNota },
                    "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&cantTipo6=" + cantTipo6 + "&varID=" + pid + cadenanotas,
                    container,
                    function () {
                        codCurso = codCurso + subCodCurso;
                        Swal.fire({
                            title: codCurso + ': Notas Guardadas!',
                            text: 'Las Notas han sido registradas exitosamente.',
                            icon: 'success'
						}); //veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
                        docenteIngNotas();  // Volver a cargar el formulario
                    }
                );
            });

        /*
		if (confirm('Seguro de guardar?')) {
		var ajax = nuevoAjax();
		var varID = 55;
		var contenedor = "curslistAlu";
		var divMensaje = document.getElementById(contenedor);
		requestPOST("tareas.php", "varID=" + varID + "&lisCodAlumno=" + lisCodAlumno + "&lisNotaAlumno=" + lisNotaAlumno + "&codCurso=" + codCurso + "&subCodCurso=" + subCodCurso + "&codSem=" + codSem + "&tipoNota=" + tipoNota + "&nroNota=" + nroNota, ajax, divMensaje, 0);

		alert('Las Notas Fueron Guardadas..!');
		codCurso = codCurso + subCodCurso;
		veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
		}
		*/
    } else {
        Swal.fire("Sin Notas", "No has ingresado ninguna nota!", "warning");
    }

} //End GuardarNotaTodas



function esGuardado() {
    document.getElementById('RGuardado').value = '1';
}

function calculapromparcial(tipoNota, cantNota, varNombre, nro) {
    var i, suma;
    var cajaprom = document.getElementById('Prom' + '-' + tipoNota + '-' + nro);
    suma = 0;
    for (i = 1; i <= (cantNota); i++) {
        if ((document.getElementById(varNombre + '-' + tipoNota + '-' + i + '-' + nro).value) == '') {
        } else {
            suma = suma + parseFloat(document.getElementById(varNombre + '-' + tipoNota + '-' + i + '-' + nro).value);
        }
    }
    varpreprom = (suma / cantNota);
    cajaprom.value = (Math.round((varpreprom) * 1000) / 1000);
    cajaprom.onchange();
}


function calculapromgen(cant1, peso1, cant2, peso2, cant3, peso3, cantmc, pesomc, cantef, pesoef, nro, varNombre) {
    var tip1, tip2, tip3, tipmc, tipef;
    var cajapromgen = document.getElementById('promGen-' + nro);

    if ((cant1 > 0) && (document.getElementById('Prom' + '-' + '1' + '-' + nro).value !== '')) {
        tip1 = (parseFloat(document.getElementById('Prom' + '-' + '1' + '-' + nro).value) * parseFloat(peso1));
    } else {
        tip1 = 0;
    }
    if ((cant2 > 0) && (document.getElementById('Prom' + '-' + '2' + '-' + nro).value !== '')) {
        tip2 = (parseFloat(document.getElementById('Prom' + '-' + '2' + '-' + nro).value) * parseFloat(peso2));
    } else {
        tip2 = 0;
    }
    if ((cant3 > 0) && (document.getElementById('Prom' + '-' + '3' + '-' + nro).value !== '')) {
        tip3 = (parseFloat(document.getElementById('Prom' + '-' + '3' + '-' + nro).value) * parseFloat(peso3));
    } else {
        tip3 = 0;
    }
    if ((cantmc > 0) && (document.getElementById(varNombre + '-' + '4' + '-' + '1' + '-' + nro).value !== '')) {
        tipmc = (parseFloat(document.getElementById(varNombre + '-' + '4' + '-' + '1' + '-' + nro).value) * parseFloat(pesomc));
    } else {
        tipmc = 0;
    }
    if ((cantef > 0) && (document.getElementById(varNombre + '-' + '5' + '-' + '1' + '-' + nro).value !== '')) {
        tipef = (parseFloat(document.getElementById(varNombre + '-' + '5' + '-' + '1' + '-' + nro).value) * parseFloat(pesoef));
    } else {
        tipef = 0;
    }
    cajapromgen.value = Math.floor((tip1 + tip2 + tip3 + tipmc + tipef) * 10) / 10;
    cajapromgen.onchange();
    //cajapromgen.value=5;
}

function calculapromfin(nro) {
    var cajapromfin = document.getElementById('promFin-' + nro);
    cajapromfin.value = Math.round(parseFloat(document.getElementById('promGen-' + nro).value));
    //    var objPromFin = $("#promFin-"+nro);
    //    var nota = Math.round(parseFloat( $('#promGen-'+nro).val() ));
    //    objPromFin.text(  );
    //    if( nota>=11 ) {
    //        objPromFin.removeClass("nota-desaprobado");
    //        objPromFin.addClass("nota-aprobado");
    //    } else {
    //        objPromFin.removeClass("nota-aprobado");
    //        objPromFin.addClass("nota-desaprobado");
    //    }
}
function autogenerar(codCurso, subCodCurso, codSem, cantTipo1, cantTipo2, cantTipo3, cantTipo4, cantTipo5, cantAlum, nombrevar) {
    var i, j, da, c = 0, cadenanotas;
    for (j = 1; j <= (cantTipo1); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-1-' + j + '-' + i).value) == '') {
            } else {
                document.getElementById(nombrevar + '-1-' + j + '-' + i).onchange();
            }
        }
    }
    for (j = 1; j <= (cantTipo2); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-2-' + j + '-' + i).value) == '') {
            } else {
                document.getElementById(nombrevar + '-2-' + j + '-' + i).onchange();
            }
        }
    }
    for (j = 1; j <= (cantTipo3); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-3-' + j + '-' + i).value) == '') {
            } else {
                document.getElementById(nombrevar + '-3-' + j + '-' + i).onchange();
            }
        }
    }
    for (j = 1; j <= (cantTipo4); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-4-' + j + '-' + i).value) == '') {
            } else {
                document.getElementById(nombrevar + '-4-' + j + '-' + i).onchange();
            }
        }
    }

    for (j = 1; j <= (cantTipo5); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            if ((document.getElementById(nombrevar + '-5-' + j + '-' + i).value) == '') {
            } else {
                document.getElementById(nombrevar + '-5-' + j + '-' + i).onchange();
            }
        }
    }
}
//buscaMinimo( 'SA305',    ''    ,'2014-0',   '1'  ,   '0.3' ,    '1'  ,   '0.2' ,   '3'   ,   '0.5' ,   '0'   ,    '0'  ,    '0'  ,  '0'    , '20'   , 'Nota'  , '1'    ,'0')
function buscaMinimo(codCurso, subCodCurso, codSem, cantTipo1, pesoTipo1, cantTipo2, pesoTipo2, cantTipo3, pesoTipo3, cantTipo4, pesoTipo4, cantTipo5, pesoTipo5, cantAlum, nombrevar, nrosusti, tipoProc) {
    var i, j, da, c = 0, cadenanotas, fac1, fac2;
    var camporeem, referencia, objreferencia;
    var cadenasusti;
    cadenasusti = '';

    for (i = 1; i <= (cantAlum); i++) {
        referencia = 20;
        objreferencia = '';
        var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;

        if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor != 'rgb(255, 255, 0)' && notasusti != '') {
            for (j = 1; j <= (cantTipo1); j++) {
                if ((document.getElementById(nombrevar + '-1-' + j + '-' + i).value) != '') {
                    document.getElementById(nombrevar + '-1-' + j + '-' + i).style.backgroundColor = '#fff';
                    fac1 = document.getElementById(nombrevar + '-1-' + j + '-' + i).value;
                    fac2 = referencia;
                    if (parseFloat(fac1) < parseFloat(fac2)) {
                        referencia = fac1;
                        objreferencia = '1-' + j + '-' + i;
                    }
                }
            }
            for (j = 1; j <= (cantTipo2); j++) {
                if ((document.getElementById(nombrevar + '-2-' + j + '-' + i).value) != '') {
                    document.getElementById(nombrevar + '-2-' + j + '-' + i).style.backgroundColor = '#fff';
                    fac1 = document.getElementById(nombrevar + '-2-' + j + '-' + i).value;
                    fac2 = referencia;
                    if (parseFloat(fac1) < parseFloat(fac2)) {
                        referencia = fac1;
                        objreferencia = '2-' + j + '-' + i;
                    }
                }
            }
            for (j = 1; j <= (cantTipo3); j++) {
                if ((document.getElementById(nombrevar + '-3-' + j + '-' + i).value) != '') {
                    document.getElementById(nombrevar + '-3-' + j + '-' + i).style.backgroundColor = '#fff';
                    fac1 = document.getElementById(nombrevar + '-3-' + j + '-' + i).value;
                    fac2 = referencia;
                    if (parseFloat(fac1) < parseFloat(fac2)) {
                        referencia = fac1;
                        objreferencia = '3-' + j + '-' + i;
                    }
                }
            }
            for (j = 1; j <= (cantTipo4); j++) {
                if ((document.getElementById(nombrevar + '-4-' + j + '-' + i).value) != '') {
                    document.getElementById(nombrevar + '-4-' + j + '-' + i).style.backgroundColor = '#fff';
                    fac1 = document.getElementById(nombrevar + '-4-' + j + '-' + i).value;
                    fac2 = referencia;
                    if (parseFloat(fac1) < parseFloat(fac2)) {
                        referencia = fac1;
                        objreferencia = '4-' + j + '-' + i;
                    }
                }
            }
            for (j = 1; j <= (cantTipo5); j++) {
                if ((document.getElementById(nombrevar + '-5-' + j + '-' + i).value) != '') {
                    document.getElementById(nombrevar + '-5-' + j + '-' + i).style.backgroundColor = '#fff';
                    fac1 = document.getElementById(nombrevar + '-5-' + j + '-' + i).value;
                    fac2 = referencia;
                    if (parseFloat(fac1) < parseFloat(fac2)) {
                        referencia = fac1;
                        objreferencia = '5-' + j + '-' + i;
                    }
                }
            }
        }
        if (objreferencia != '' && parseFloat(notasusti) > parseFloat(document.getElementById(nombrevar + '-' + objreferencia).value)) {
            document.getElementById(nombrevar + '-' + objreferencia).style.backgroundColor = '#F00';
            cadenasusti = cadenasusti + '&' + (objreferencia) + '=' + document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
        }
    }


    if (document.getElementById('RGuardado').value == '1') {
        UserActivityLog('APLICARSUSTI_M1', codCurso + subCodCurso);
        UserActivityLog('NOTAS_SIN_GUARDAR', codCurso + subCodCurso);
        Swal.fire("No ha Guardado sus Notas!", "Primero debe Guardar las Evaluaciones Registradas!", "warning");
    } else {
        if (tipoProc == '1' && cadenasusti != '') {
            //console.log(cadenasusti);
            UserActivityLog('APLICARSUSTI_M1', codCurso + subCodCurso);
            Swal.fire({
                title: 'Aplicación de Exámen Sustitutorio',
                text: "Confirma que desea reemplazar las notas del Examen Sustitutorio?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Sí, Reemplazar!',
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
			function () {
				var pid = 63;
				var container = $("curso-notas-form");
				RequestAjax(
					"tareas.php",
					"cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&nroSusti=" + nrosusti + "&varID=" + pid + cadenasusti,
					container,
					function () {
						codCurso = codCurso + subCodCurso;
						Swal.fire(codCurso + ': Exámen Sustitutorio Aplicado!', 'Las Notas han sido reemplazadas satisfactoriamente.', 'success');
						//veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
						UserActivityLog('NOTAS_REMPLAZADAS', codCurso);
						docenteIngNotas();  // Volver a cargar el formulario
					}
				);
			});

            /* OLD
            if (confirm('Esta Ud. Seguro de Aplicar el Sustitutorio Nro: ' + nrosusti + '?'))
            {
            if (document.getElementById('RGuardado').value == '1') {
            	alert('Antes debe guardar las Evaluaciones!');
            } else {
            var ajax = nuevoAjax();
            var varID = 63;
            var contenedor = "curslistAlu";
            var divMensaje = document.getElementById(contenedor);
            requestPOST("tareas.php", "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&nroSusti=" + nrosusti + "&varID=" + varID + cadenasusti, ajax, divMensaje, 0);
            }
            } */
        }
    }
}

// MUestra los Checkbox al activar el remplazo por eleccion de nota en el Susti
function mostrarChecks(obj, cantTipo1, cantTipo2, cantTipo3, cantTipo4, cantTipo5, cantAlum, nombrevar, nrosusti) {
    var mostrar;
    if (obj.checked) {
        mostrar = 'block';
    } else {
        mostrar = 'none';
    }

    for (j = 1; j <= (cantTipo1); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor !== 'rgb(255, 255, 0)' && notasusti !== '' && (document.getElementById(nombrevar + '-1-' + j + '-' + i).value) !== '') {
                document.getElementById('chk-' + nombrevar + '-1-' + j + '-' + i).style.display = mostrar;
            }
        }
    }
    for (j = 1; j <= (cantTipo2); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor !== 'rgb(255, 255, 0)' && notasusti !== '' && (document.getElementById(nombrevar + '-2-' + j + '-' + i).value) !== '') {
                document.getElementById('chk-' + nombrevar + '-2-' + j + '-' + i).style.display = mostrar;
            }
        }
    }
    for (j = 1; j <= (cantTipo3); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor !== 'rgb(255, 255, 0)' && notasusti !== '' && (document.getElementById(nombrevar + '-3-' + j + '-' + i).value) !== '') {
                document.getElementById('chk-' + nombrevar + '-3-' + j + '-' + i).style.display = mostrar;
            }
        }
    }
    for (j = 1; j <= (cantTipo4); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor !== 'rgb(255, 255, 0)' && notasusti !== '' && (document.getElementById(nombrevar + '-4-' + j + '-' + i).value) != '') {
                document.getElementById('chk-' + nombrevar + '-4-' + j + '-' + i).style.display = mostrar;
            }
        }
    }
    for (j = 1; j <= (cantTipo5); j++) {
        for (i = 1; i <= (cantAlum); i++) {
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            if (document.getElementById('susti' + '-' + nrosusti + '-' + i).style.backgroundColor !== 'rgb(255, 255, 0)' && notasusti !== '' && (document.getElementById(nombrevar + '-5-' + j + '-' + i).value) != '') {
                document.getElementById('chk-' + nombrevar + '-5-' + j + '-' + i).style.display = mostrar;
            }
        }
    }
}


function deterSelecNot(obj, cantTipo1, cantTipo2, cantTipo3, cantTipo4, cantTipo5, nroAlum, nombrevar) {
    var valor = obj.checked;
    for (j = 1; j <= (cantTipo1); j++) {
        if ((document.getElementById('chk-' + nombrevar + '-1-' + j + '-' + nroAlum).checked) == true) {
            document.getElementById('chk-' + nombrevar + '-1-' + j + '-' + nroAlum).checked = false;
        }
    }
    for (j = 1; j <= (cantTipo2); j++) {
        if ((document.getElementById('chk-' + nombrevar + '-2-' + j + '-' + nroAlum).checked) == true) {
            document.getElementById('chk-' + nombrevar + '-2-' + j + '-' + nroAlum).checked = false;
        }
    }
    for (j = 1; j <= (cantTipo3); j++) {
        if ((document.getElementById('chk-' + nombrevar + '-3-' + j + '-' + nroAlum).checked) == true) {
            document.getElementById('chk-' + nombrevar + '-3-' + j + '-' + nroAlum).checked = false;
        }
    }
    for (j = 1; j <= (cantTipo4); j++) {
        if ((document.getElementById('chk-' + nombrevar + '-4-' + j + '-' + nroAlum).checked) == true) {
            document.getElementById('chk-' + nombrevar + '-4-' + j + '-' + nroAlum).checked = false;
        }
    }
    for (j = 1; j <= (cantTipo5); j++) {
        if ((document.getElementById('chk-' + nombrevar + '-5-' + j + '-' + nroAlum).checked) == true) {
            document.getElementById('chk-' + nombrevar + '-5-' + j + '-' + nroAlum).checked = false;
        }
    }
    obj.checked = valor;
}

function buscaCheckSus(codCurso, subCodCurso, codSem, cantTipo1, pesoTipo1, cantTipo2, pesoTipo2, cantTipo3, pesoTipo3, cantTipo4, pesoTipo4, cantTipo5, pesoTipo5, cantAlum, nombrevar, nrosusti) {
    var i, j, da, c = 0, cadenanotas, fac1, fac2;
    var camporeem, referencia, objreferencia;
    var cadenasusti;
    cadenasusti = '';
    UserActivityLog('APLICARSUSTI_M2', codCurso + subCodCurso);
    if (document.getElementById('RGuardado').value == '1') {
        UserActivityLog('NOTAS_SIN_GUARDAR', codCurso + subCodCurso);
        swal("No ha Guardado sus Notas!", "Primero debe Guardar las Evaluaciones Registradas!", "warning");
    } else {
        for (i = 1; i <= (cantAlum); i++) {
            objreferencia = '';
            var notasusti = document.getElementById('susti' + '-' + nrosusti + '-' + i).value;

            for (j = 1; j <= (cantTipo1); j++) {
                if (document.getElementById('chk-' + nombrevar + '-1-' + j + '-' + i).checked) {
                    referencia = fac1 = document.getElementById(nombrevar + '-1-' + j + '-' + i).value;
                    objreferencia = '1-' + j + '-' + i;
                }
            }
            for (j = 1; j <= (cantTipo2); j++) {
                if (document.getElementById('chk-' + nombrevar + '-2-' + j + '-' + i).checked) {
                    referencia = document.getElementById(nombrevar + '-2-' + j + '-' + i).value;
                    objreferencia = '2-' + j + '-' + i;
                }
            }
            for (j = 1; j <= (cantTipo3); j++) {
                if (document.getElementById('chk-' + nombrevar + '-3-' + j + '-' + i).checked) {
                    referencia = document.getElementById(nombrevar + '-3-' + j + '-' + i).value;
                    objreferencia = '3-' + j + '-' + i;
                }
            }
            for (j = 1; j <= (cantTipo4); j++) {
                if (document.getElementById('chk-' + nombrevar + '-4-' + j + '-' + i).checked) {
                    referencia = document.getElementById(nombrevar + '-4-' + j + '-' + i).value;
                    objreferencia = '4-' + j + '-' + i;
                }
            }
            for (j = 1; j <= (cantTipo5); j++) {
                if (document.getElementById('chk-' + nombrevar + '-5-' + j + '-' + i).checked) {
                    referencia = document.getElementById(nombrevar + '-5-' + j + '-' + i).value;
                    objreferencia = '5-' + j + '-' + i;
                }
            }

            if (objreferencia != '') {
                document.getElementById(nombrevar + '-' + objreferencia).style.backgroundColor = '#f00';
                cadenasusti = cadenasusti + '&' + (objreferencia) + '=' + document.getElementById('susti' + '-' + nrosusti + '-' + i).value;
            }
        }

        /*
         if (confirm('Esta Ud. Seguro de Aplicar el Sustitutorio Nro.' + nrosusti + '?'))  {
         if (document.getElementById('RGuardado').value == '1')  {
         alert('Primero debe Guardar las Evaluaciones Registradas!');
         }
         else  {
         var ajax = nuevoAjax();
         var varID = 63;
         var contenedor = "curslistAlu";
         var divMensaje = document.getElementById(contenedor);
         requestPOST("tareas.php", "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&nroSusti=" + nrosusti + "&varID=" + varID + cadenasusti, ajax, divMensaje, 0);
         }
         }
         */

        swal({
            title: 'Aplicación de Exámen Sustitutorio',
            text: "Confirma que desea reemplazar las notas del Examen Sustitutorio?",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, Reemplazar!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
            function () {
                var pid = 63;
                var container = $("curso-notas-form");
                RequestAjax(
                    "tareas.php",
                    "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&nroSusti=" + nrosusti + "&varID=" + pid + cadenasusti,
                    container,
                    function () {
                        codCurso = codCurso + subCodCurso;
                        swal(
                            codCurso + ': Exámen Sustitutorio Aplicado!',
                            'Las Notas han sido reemplazadas satisfactoriamente.',
                            'success'
                        ); //veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
                        UserActivityLog('NOTAS_REMPLAZADAS', codCurso);
                        docenteIngNotas();  // Volver a cargar el formulario
                    }
                );
            });
    }
}
//Mostrar Opciones de Sustis y bloquear boton guardar notas
function mostrarTabOpc(obj, nroSusti, cantTipo6) {
    for (j = 1; j <= (cantTipo6); j++) {
        if (j != nroSusti) {
            document.getElementById('TabSusti' + j).style.display = 'none';
        }
    }
    if (obj.checked) {
        document.getElementById('TabSusti' + nroSusti).style.display = 'block';
        $("#btn-notas-saveall").attr("disabled", true);
        $("#table-notas-saveall-message").html('<em class="text-danger"><strong>Susti Activado:</strong> Haga click en el boton: <strong>Aplicar Sustitutorio</strong> ubicado en la parte superior.</em>');
        //console.log('Susti Activado');
        //document.getElementById('RGuardado').value = '1';
        //var statusSave = $('#RGuardado').val();
        UserActivityLog("ACTIVAR_SUSTI");
    } else {
        document.getElementById('TabSusti' + nroSusti).style.display = 'none';
        $("#btn-notas-saveall").attr("disabled", false);
        $("#table-notas-saveall-message").html('');
        UserActivityLog("DESACTIVAR_SUSTI");
    }
}

function deterSelecSusti(obj, nroSusti, cantTipo6) {
    /// Revisar esta funcion ya q no es llamada! JL230817
    for (j = 1; j <= (cantTipo6); j++) {
        if (j != nroSusti) {
            if ((document.getElementById('Susti' + j).checked) == true) {
                document.getElementById('Susti' + j).checked = false;
                document.getElementById('Opc_1_' + j).checked = false;
                document.getElementById('Opc_2_' + j).checked = false;
                document.getElementById('Opc_2_' + j).onclick();
                mostrarTabOpc(document.getElementById('Susti' + j), j, cantTipo6);
            }
        }
    }
}			// this,   1  ,   '1'
function deterSelecOpc(obj, nroOpc, nroSusti) {
    var valor = obj.checked;
    if ((document.getElementById('Opc_1_' + nroSusti).checked) == true) {
        document.getElementById('Opc_1_' + nroSusti).checked = false;
        document.getElementById('Btn_1_' + nroSusti).style.display = 'none';
    }
    if ((document.getElementById('Opc_2_' + nroSusti).checked) == true) {
        document.getElementById('Opc_2_' + nroSusti).checked = false;
        document.getElementById('Btn_2_' + nroSusti).style.display = 'none';
        document.getElementById('Opc_2_' + nroSusti).onclick();
    }
    obj.checked = valor;
    if (valor) {
        document.getElementById('Btn_' + nroOpc + '_' + nroSusti).style.display = 'block';
    } else {
        document.getElementById('Btn_' + nroOpc + '_' + nroSusti).style.display = 'none';
    }
}

function reestablecerSusti(codCurso, subCodCurso, codSem, nrosusti) {
    //var ajax = nuevoAjax();
    //var varID = 64;
    //var contenedor = "curslistAlu";
    //var divMensaje = document.getElementById(contenedor);
    //requestPOST("tareas.php", "codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&nroSusti=" + nrosusti + "&varID=" + varID, ajax, divMensaje, 0);

    swal({
        title: 'Restablecer Sustitutorio',
        text: "Este proceso restablecerá todas las notas reemplazadas por el Exámen Sustitutorio a su estado inicial, Deseas Realizarlo?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, Restablecer!',
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    },
        function () {
            var pid = 64;
            var container = $("curso-notas-form");
            RequestAjax(
                "tareas.php",
                "codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&nroSusti=" + nrosusti + "&varID=" + pid,
                container,
                function () {
                    codCurso = codCurso + subCodCurso;
                    swal(
                        codCurso + ': Notas Restablecidas!',
                        'Las Notas del Exámen Sustitutorio han sido Restablecidas.',
                        'success'
                    );
                    docenteIngNotas();  // Volver a cargar el formulario
                }
            );
        });
}



// JL.Rev 2019.04.05
function calculateAverage(number) {
    var evals = JSON.parse($("#Evaluations").val());
    var averagegen = 0;
    var averagefin = 0;

    for (i = 0; i < evals.length; i++) {
        var eval = evals[i];
        var sum = 0;
        console.log('#xPROM-' + eval.cod + '-' + number);
        for (nronote = 1; nronote <= eval.num; nronote++) {
            var note = $("#NOTE-" + eval.cod + '-' + nronote + '-' + number);
			//console.log('Nota '+ eval.nom + nronote + ':' + note.val() );

			if (!isNaN(parseFloat(note.val()))) {
				sum += parseFloat(note.val());
			}
            // if ($.isNumeric(note.val())) {
            //     sum += parseFloat(note.val());
            // }
        }

        var avg = (eval.num > 0) ? (Math.round((sum / eval.num) * 1000) / 1000) : 0;

        if (eval.cod != 4 && eval.cod != 5) {
            var average = $('#PROM-' + eval.cod + '-' + number);
            average.text(avg);
            average.parent().removeClass('note-disapproved note-approved');
            if (avg >= 11) {
                average.parent().addClass('note-approved');
            } else {
                average.parent().addClass('note-disapproved');
            }
        }

        averagegen += (avg * (eval.peso / 100));
        //console.debug(eval.nom, sum, avg, averagegen);
    }
    //console.log('AVG-GEN: ' + averagegen);

    averagegen = Math.round(averagegen * 100) / 100;
    var promgen = $('#PROM-GEN-' + number);
    promgen.text(averagegen);
    promgen.removeClass('note-disapproved note-approved');
    promgen.parent().removeClass('note-disapproved note-approved');
    if (averagegen >= 10.5) {
        promgen.parent().addClass('note-approved');
    } else {
        promgen.parent().addClass('note-disapproved');
    }

    averagefin = Math.round(parseFloat(averagegen));
    var promfin = $('#PROM-FIN-' + number);
    promfin.text(averagefin);
    promfin.removeClass('note-disapproved note-approved');
    promfin.parent().removeClass('note-disapproved note-approved');
    if (averagefin >= 10.5) {
        promfin.parent().addClass('note-approved');
    } else {
        promfin.parent().addClass('note-disapproved');
    }
}



// JL.Rev 2020.01.08
function calculateAverage2(number) {
    var evals = JSON.parse($("#Evaluations").val());
    var averagegen = 0;
    var averagefin = 0;

    for (i = 0; i < evals.length; i++) {
        var eval = evals[i];
        var sum = 0;
        for (nronote = 1; nronote <= eval.num; nronote++) {
            var note = $("#NOTE-" + eval.cod + '-' + nronote + '-' + number);
			if (!isNaN(parseFloat(note.val()))) {
				sum += parseFloat(note.val());
			}
        }

        var avg = (eval.num > 0) ? (Math.round((sum / eval.num) * 1000) / 1000) : 0;

        if (eval.cod != 4 && eval.cod != 5) {
            var average = $('#PROM-' + eval.nom + '-' + number);
            average.val(avg);
            average.removeClass('note-disapproved note-approved');
            if (avg >= 11) {
                average.addClass('note-approved');
            } else {
                average.addClass('note-disapproved');
            }
        }

        averagegen += (avg * (eval.peso / 100));
        //console.debug(eval.nom, sum, avg, averagegen);
    }

	// Promedio General
    averagegen = Math.round(averagegen * 100) / 100;
    var promgen = $('#PROM-GEN-' + number);
    promgen.val(averagegen);
    promgen.removeClass('note-disapproved note-approved');
    if (averagegen >= 10.5) {
        promgen.addClass('note-approved');
    } else {
        promgen.addClass('note-disapproved');
    }

	// Promedio Final
    averagefin = Math.round(parseFloat(averagegen));
    var promfin = $('#PROM-FIN-' + number);
    promfin.val(averagefin);
    promfin.removeClass('note-disapproved note-approved');
    if (averagefin >= 10.5) {
        promfin.addClass('note-approved');
    } else {
        promfin.addClass('note-disapproved');
    }
}


function saveAllNotes(codsem, codcurso, subcodcurso, cantalumnos) {
    var evals = JSON.parse($("#Evaluations").val());
    var j, k, da, c = 0, cadenanotas;
    cadenanotas = '';
    //console.debug(evals);en la
    var notes = [];
	var i = 0;
	var registerNotes = true;

    for (j = 1; j <= cantalumnos; j++) {
        for (k = 0; k < evals.length; k++) {
            var eval = evals[k];
            for (nronote = 1; nronote <= eval.num; nronote++) {
				var elemnote = $("#NOTE-" + eval.cod + '-' + nronote + '-' + j);

				var note = {
					studentid: elemnote.data('stcod'),
					evaluationid: elemnote.data('evcod'),
					evaluationnumber: elemnote.data('evnro'),
					fieldid: elemnote.attr('id'),
					note: elemnote.val()
				}

				// no registrar las notas que ya esten bloqueadas o
                if (!$.isNumeric(elemnote.val()) || elemnote.prop("disabled") ) {
					console.log('is numeric disbaled:', note);
                }
                else {
					if ( elemnote.hasClass('note-attendanceless') && note.note > 0 ) {
						console.log('***');
                        registerNotes = false;
						console.log('No Registrar: ' + note.studentid + 'no cumple con asistencia y ha registrado nota: ' + note.note );
					}
					else {
						console.log(note);
						notes[i] = note;
						i++;
						c++;
					}
                }
            }
        }
    }

    cadenanotas = JSON.stringify(notes);
    console.debug('Enviando..');
    console.debug(notes);

    if ( registerNotes && notes.length > 0 ) {
        //var ajax = nuevoAjax();
        //var varID = 62;
        //var contenedor = "curslistAlu";
        //var divMensaje = document.getElementById(contenedor);
        //requestPOST("tareas.php", "cant=" + cantAlum + "&codCurso=" + codCurso + "&subcodCurso=" + subCodCurso + "&codSem=" + codSem + "&cantTipo1=" + cantTipo1 + "&cantTipo2=" + cantTipo2 + "&cantTipo3=" + cantTipo3 + "&cantTipo4=" + cantTipo4 + "&cantTipo5=" + cantTipo5 + "&cantTipo6=" + cantTipo6 + "&varID=" + varID + cadenanotas, ajax, divMensaje, 0);
        //alert('Las Notas Fueron Guardadas..!');
        //codCurso = codCurso + subCodCurso;
        //veriOpcIngNotas(codCurso,codSem,'NtipoNota','NnroNota','Naccion');
        //var codalumnoss  = JSON.stringify(lisCodAlumno);
		//var notaalumnoss = JSON.stringify(lisNotaAlumno);


        Swal.fire({
            title: 'Registro de Notas',
            text: "Seguro de Guardar estas Notas?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, Guardar!',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then( (result) => {
			if (result.isConfirmed) {
				RequestAjax2({
					url: 'tareas.php',
					data: { cantalumnos: cantalumnos, codcurso: codcurso, subcodcurso: subcodcurso, codsem: codsem, varID: 62, notas: cadenanotas },
					context: $("curso-notas-form"),
					success: function () {
						Swal.fire({
							title: codcurso + subcodcurso + ': Notas Guardadas!',
							text: 'Las Notas han sido registradas exitosamente.',
							icon: 'success'
						});
						docenteIngNotas();
					}
				});
			} else if (result.isDenied) {
				Swal.fire('Operación Cancelada!', '', 'info')
			}
		});


			/*
			var pid = 62;
			var container = $("curso-notas-form");
			RequestAjax(
				"tareas.php",
				//{ varID:pid, codCurso: codCurso, subCodCurso: subCodCurso, codSem: codSem, lisCodAlumno: codalumnoss, lisNotaAlumno: notaalumnoss, tipoNota: tipoNota, nroNota: nroNota },
				"cantalumnos=" + cantalumnos + "&codcurso=" + codcurso + "&subcodcurso=" + subcodcurso + "&codsem=" + codsem + "&varID=" + pid + "&notas=" + cadenanotas,
				container,
				function () {
					Swal.fire({
						title: codcurso + subcodcurso + ': Notas Guardadas!',
						text: 'Las Notas han sido registradas exitosamente.',
						icon: 'success'
					});
					//veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
					docenteIngNotas();  // Volver a cargar el formulario
				}
			);
			*/
		//});

		/*
		if (confirm('Seguro de guardar?')) {
		var ajax = nuevoAjax();
		var varID = 55;
		var contenedor = "curslistAlu";
		var divMensaje = document.getElementById(contenedor);
		requestPOST("tareas.php", "varID=" + varID + "&lisCodAlumno=" + lisCodAlumno + "&lisNotaAlumno=" + lisNotaAlumno + "&codCurso=" + codCurso + "&subCodCurso=" + subCodCurso + "&codSem=" + codSem + "&tipoNota=" + tipoNota + "&nroNota=" + nroNota, ajax, divMensaje, 0);

		alert('Las Notas Fueron Guardadas..!');
		codCurso = codCurso + subCodCurso;
		veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
		}
		*/

    } else {

		if ( !registerNotes ) {
			Swal.fire({
				title: "Detectado Notas por Inasistencia a Clases!",
				html: "El alumno que acumule el treinta por ciento (30%) o más de inasistencias a clases está inhabilitado para rendir el examen final (Art. 55 del Reglamento de Estudios), por lo tanto la nota no puede ser mayor a 0. <br>Debe corregir esta observación para poder guardar sus notas!",
				icon: "danger"
			});
		} else {
			Swal.fire({
				title: "Sin Notas",
				text: "No has ingresado ninguna nota!",
				icon: "warning"
			});
		}
    }

} //End GuardarNotaTodas


/******************************************************************************
 *   INLayout Responsive Admin Theme
 *   version 2.9.3
 *****************************************************************************/

$(document).ready(function () {

	// Fast fix bor position issue with Propper.js
	// Will be fixed in Bootstrap 4.1 - https://github.com/twbs/bootstrap/pull/24092
	Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

	// Add body-small class if window less than 768px
	if (window.innerWidth < 769) {
		$('body').addClass('body-small')
	} else {
		$('body').removeClass('body-small')
	}

	// MetisMenu
	//var sideMenu = $('#side-menu').metisMenu();	// in sga.ajx

	// Collapse ibox function
	$('.collapse-link').on('click', function (e) {
		e.preventDefault();
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		var content = ibox.children('.ibox-content');
		content.slideToggle(200);
		button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
		ibox.toggleClass('').toggleClass('border-bottom');
		setTimeout(function () {
			ibox.resize();
			ibox.find('[id^=map-]').resize();
		}, 50);
	});

	// Close ibox function
	$('.close-link').on('click', function (e) {
		e.preventDefault();
		var content = $(this).closest('div.ibox');
		content.remove();
	});

	// Fullscreen ibox function
	$('.fullscreen-link').on('click', function (e) {
		e.preventDefault();
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		$('body').toggleClass('fullscreen-ibox-mode');
		button.toggleClass('fa-expand').toggleClass('fa-compress');
		ibox.toggleClass('fullscreen');
		setTimeout(function () {
			$(window).trigger('resize');
		}, 100);
	});

	// Close menu in canvas mode
	$('.close-canvas-menu').on('click', function (e) {
		e.preventDefault();
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();
	});

	// Run menu of canvas
	$('body.canvas-menu .sidebar-collapse').slimScroll({
		height: '100%',
		railOpacity: 0.9
	});

	// Open close right sidebar
	$('.right-sidebar-toggle').on('click', function (e) {
		e.preventDefault();
		$('#right-sidebar').toggleClass('sidebar-open');
	});

	// Initialize slimscroll for right sidebar
	$('.sidebar-container').slimScroll({
		height: '100%',
		railOpacity: 0.4,
		wheelStep: 10
	});

	// Open close small chat
	/*
    $('.open-small-chat').on('click', function (e) {
        e.preventDefault();
        $(this).children().toggleClass('fa-comments').toggleClass('fa-times');
        $('.small-chat-box').toggleClass('active');
	});
	*/

	// Initialize slimscroll for small chat
	$('.small-chat-box .content').slimScroll({
		height: '234px',
		railOpacity: 0.4
	});

	// Small todo handler
	$('.check-link').on('click', function () {
		var button = $(this).find('i');
		var label = $(this).next('span');
		button.toggleClass('fa-check-square').toggleClass('fa-square-o');
		label.toggleClass('todo-completed');
		return false;
	});
    /*
    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    $.get("skin-config2.html", function (data) {
		if (!$('body').hasClass('no-skin-config'))
    		$('body').append(data);
    });
    */

	// Minimalize menu // JL Show/Hide Sidebar
	$('.navbar-minimalize').on('click', function (event) {
		event.preventDefault();
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();
	});

	// Tooltips demo
	$('.tooltip-demo').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	});

	// Move right sidebar top after scroll
	$(window).scroll(function () {
		if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
			$('#right-sidebar').addClass('sidebar-top');
		} else {
			$('#right-sidebar').removeClass('sidebar-top');
		}
	});

	$("[data-toggle=popover]")
		.popover();

	// Add slimscroll to element
	$('.full-height-scroll').slimscroll({
		height: '100%'
	})
});

// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
	if (window.innerWidth < 769) {
		$('body').addClass('body-small')
	} else {
		$('body').removeClass('body-small')
	}
});

// Fixed Sidebar
$(window).bind("load", function () {
	if ($("body").hasClass('fixed-sidebar')) {
		$('.sidebar-collapse').slimScroll({
			height: '100%',
			railOpacity: 0.9
		});
	}
});


// check if browser support HTML5 local storage
function localStorageSupport() {
	return (('localStorage' in window) && window['localStorage'] !== null)
}

// Local Storage functions
/* JL Desactivado
// Set proper body class and plugins based on user configuration
$(document).ready(function () {

    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});
*/

// For demo purpose - animation css script
/*
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}
*/

function SmoothlyMenu() {
	if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		// Hide menu in order to smoothly turn on when maximize menu
		$('#side-menu').hide();
		// For smoothly turn on menu
		setTimeout(
			function () {
				$('#side-menu').fadeIn(400);
			}, 200);
	} else if ($('body').hasClass('fixed-sidebar')) {
		$('#side-menu').hide();
		setTimeout(
			function () {
				$('#side-menu').fadeIn(400);
			}, 100);
	} else {
		// Remove all inline style from jquery fadeIn function to reset menu state
		$('#side-menu').removeAttr('style');
	}
}

// Dragable panels
function WinMove() {
	var element = "[class*=col]";
	var handle = ".ibox-title";
	var connect = "[class*=col]";
	$(element).sortable(
		{
			handle: handle,
			connectWith: connect,
			tolerance: 'pointer',
			forcePlaceholderSize: true,
			opacity: 0.8
		})
		.disableSelection();
}

// By JLJL: Ocultar menu al hacer click en el content
function hideSidebar() {
	if ($('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		// $('#page-content').on('click', function (event) {
		// 	//event.preventDefault();
		// 	$("body").removeClass("mini-navbar");
		// });
		$("body").removeClass("mini-navbar");
	}
}


// REPORTES FUNCTIONS
//=========================================================================

function generarReporte(reporte) {
	var ficha = document.getElementById(reporte);
	var ventimp = window.open('imprimir.php?oid=' + reporte, 'popimpr');
}
function printReport(objRereport) {
	var ficha = document.getElementById(objRereport);
	var ventimp = window.open('imprimir.php?oid=' + objRereport, 'popimpr');
}

function printPDFReport(objReport) {
	var report = $(".report").html();
	var form = $("<form/>", { id: 'formReport', action: 'printer.php', method: 'POST', target: '_blank' });

	console.log('Report PDF');
	console.log(objReport);
	console.log(report);

	form.append(
		$("<input>",
			{
				type: 'hidden',
				id: 'type',
				name: 'type',
				value: 'html'
			}
		)
	);
	form.append(
		$("<input>",
			{
				type: 'text',
				id: 'data',
				name: 'data',
				value: report
			}
		)
	);
	$("#" + objReport).append(form);
	form.submit();
	$("#formReport").remove();
}





// Funciones para Reportes e Impresion
// ****************************************************************************
var wrapperReport = "#wrapper-report";  // In section page header


//IMPRIMIR BOTON DE OPCIONES
function botonPrint(reporte, secondParam, RepID) {
	var divMensaje = document.getElementById('rptOpciones');
	var varID = 100;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&reporte=" + reporte + "&segundo=" + secondParam + "&RepID=" + RepID, ajax, divMensaje, 0);
}
function botonPrint2(reporte, secondParam, RepID) {
	var divMensaje = document.getElementById('rptOpciones2');
	var varID = 101;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&reporte=" + reporte + "&segundo=" + secondParam + "&RepID=" + RepID, ajax, divMensaje, 0);
}
function botonPrint3(reporte, secondParam, RepID) {
	var divMensaje = document.getElementById('rptOpciones');
	var varID = 10000;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&reporte=" + reporte + "&segundo=" + secondParam + "&RepID=" + RepID, ajax, divMensaje, 0);
}



// $(document).ready(function() {

// 	// Imprimir Documentos
// 	$('body').on('click', '.print-report', function (e) {
// 		e.preventDefault();

// 		console.log('print reporting');
// 		var elementId = $(this).data('print');
// 		var type = $(this).data('type');
// 		var code = $(this).data('code');
// 		var name = $(this).data('name');
// 		var content = document.getElementById(elementId).innerHTML;
// 		//console.log(content);
// 		RequestAjax2({
// 			url: '/report/print',
// 			data: { type: type, code: code, content: content, title: name },
// 			context: 'print'
// 		});
// 	});

// });




const Report = {

	// data = '',
	// dataType: 'html',
	// dataElement: '',
	// title: '',
	// subtitle: '',

	// orientation: 'portrait',

	// printTest: () => {
	// 	RequestAjax2({
	// 		url: '/report/print/2',
	// 		data: {
	// 			type: type,
	// 			code: code,
	// 			content: content,
	// 			title: name,
	// 			subtitle: subtitle
	// 		},
	// 		context: 'print'
	// 	});
	// },


	print: (element) => {
		let report = $(element).data('print');
		let type = $(element).data('type');
		let code = $(element).data('code');
		let name = $(element).data('name');
		let content = document.getElementById(report).innerHTML;

		console.log('print reporting', report, type, code, name, element, content);
		RequestAjax2({
			url: '/report/print',
			data: { type: type, code: code, content: content, title: name },
			context: 'print'
		});
	}

}

/**
 * Load Syllabus
 * @version: 2.1
 * @author: JorLu JarLin (jorge.jara@unas.edu.pe )
 */

// Functions

function professorUpdateSyllabus() {
	RequestAjax2({ data: { load: "ProfessorSyllabusController@index", codsem: $('#semesterDisplayed').val() }, context: $(wrappers.main) });
}

function professorDownloadGuiaSyllabus() {
	document.location.href = 'download.php?file=SILABOS/Guia_Elaboracion_Silabo_UNAS_2017.zip';
}

function professorShowUploadSyllabus(obj) {
	var codcurso = $(obj).data("courseid");
	var nomcurso = $(obj).data("coursename");
	var context = $("#wrapperSyllabusFormUpload")[0];
	var codsem = $('#semactivo').text().trim();

	UserActivityLog('SILABO_CLICKBTN_LOAD', codcurso + '-' + codsem);
	RequestAjax2({
		data: { load: 'ProfessorSyllableController@form', data: { codsem: codsem, codcurso: codcurso, nomcurso: nomcurso } }
	});
}

function uploadSpinner(option) {
	if (option === 'show') {
		var html_spinner = '<div class="spinner-border text-primary" role="status">';
		html_spinner += '<span class="sr-only">Enviando...</span>';
		html_spinner += '</div>';
		$('#SyllabusUpload .message-info').html(html_spinner);
	}
	if (option === 'hide') {
		$('#SyllabusUpload .message-info .spinner-border').remove();
	}
}

function uploadProgress(action, now = 0, max = 0, min = 0) {
	if (action === 'start') {
		$('#SyllabusUpload .progress').show();
		$('#SyllabusUpload .progress-bar').attr('aria-valuenow', 0);
		$('#SyllabusUpload .progress-bar').attr('aria-valuemin', 0);
		$('#SyllabusUpload .progress-bar').attr('aria-valuemax', 0);
		$('#SyllabusUpload .progress-bar').css('width', '0%');
	}

	if (action === 'run') {
		$('#SyllabusUpload .progress-bar').attr('aria-valuenow', now);
		$('#SyllabusUpload .progress-bar').attr('aria-valuemax', max);
		$('#SyllabusUpload .progress-bar').css('width', String(now / max * 100) + '%');
	}
}

// Document Ready

$(document).ready(function () {

	$('body').on('change', '#SyllabusUpload #syllabus', function (e) {
		var fileInput = this; //document.getElementById('syllabusFile');
		var filePath = fileInput.value;
		var allowedExtensions = /(.pdf|.docx)$/i;
		var sizeByte = fileInput.files[0].size;
		var sizekiloByte = parseInt(sizeByte / 1024);
		var sizeMegaByte = parseInt(sizekiloByte / 1024);
		if (!allowedExtensions.exec(filePath)) {
			fileInput.value = '';
			$('#SyllabusUpload #syllabus').focus();
			$('#SyllabusUpload .message-info').html('El archivo no cumple con los formatos soportados: <strong>.PDF o .DOCX</strong>');
			return false;
		}
		// 6MB (1024 * 1024 * 6)
		if (sizeByte > 6291456) {
			$('#SyllabusUpload .message-info').html('El archivo excede el tamaño máximo permitido (6MB): ' + formatBytes(sizeByte));
			return false;
		}
		$('#SyllabusUpload :submit').attr('disabled', false);
	});

	$('body').on('submit', '#SyllabusUpload', function (event) {
		event.preventDefault();
		const $form = $('#SyllabusUpload');
		var courseId = $form.find('#courseId').val();
		var semesterId = $form.find('#semesterId').val();
		var formData = new FormData($form[0]);
		console.log(formData);
		RequestAjax2({
			url: "/professor/syllabus/upload/" + semesterId + '/' + courseId,
			data: formData,
			context: 'silent',

			processData: false,
			contentType: false,

			xhr: function (XHR) {
				// set the onprogress event handler
				XHR.upload.onprogress = function (evt) {
					console.log('jl-progress', evt.loaded / evt.total * 100)
					uploadProgress('run', evt.loaded, evt.total);
				};
				// set the onload event handler
				XHR.upload.onload = function () { console.log('JL-DONE!') };
				// return the customized object
			},

			before: function (jqXHR, settings) {
				$form.find(':submit').attr('disabled', true);
				uploadProgress('start');
				UserActivityLog('Syllabus/SubmitForm/' + courseId);
			},

			success: function (data, textStatus, jqXHR) {
				uploadSpinner('hide');
				UserActivityLog('Syllabus/SubmitResponse/' + data);
				if (data > 0) {
					$('#modalSyllabusUpload').modal('hide');
					Swal.fire({
						title: 'Sílabo Entregado',
						text: 'Su Sílabo ha sido cargado satisfactoriamente!',
						icon: 'success',
						html: true,
						confirmButtonText: 'Aceptar',
						closeOnConfirm: true
					}).then( (result)=> {
						professorUpdateSyllabus();
					});
				}
				else {
					$('#SyllabusUpload .message-info').html('Error: ' + data);
					$form.find(':submit').attr('disabled', false);
					Swal({
						title: 'Error!',
						text: data,
						icon: 'error',
						html: true,
						confirmButtonText: 'Aceptar',
						closeOnConfirm: true
					});
				}
			}
		});
	});

});

/******************************************************************************
 * JS SGA Validate Class
 *****************************************************************************/

/**
 * @class Validate
 */
class Validate {

	static dni(dni) {
		let reg = /^\d{8}(?:[-\s]\d{4})?$/;
		if (reg.test(dni)) {
			return true;
		}
		return false;
	}

	static email(email) {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(email)) {
			return true;
		}
		return false;
	}

	static institutionalEmail(email) {
		let reg = /^\w+([\.-]?\w+)*@unas.edu.pe+$/;
		if (reg.test(email)) {
			return true;
		}
		return false;
	}

	static utf8(str) {
		return str.replace(/[^\x20-\x7E]+/g, '');
	}

	static phoneNumber(phone) {
		/* Cell phone number
		Format 1
		XXX-XXX-XXXX
		XXX.XXX.XXXX
		XXX XXX XXXX
		Format 2
		+XX-XXXX-XXXX
		+XX.XXXX.XXXX
		+XX XXXX XXXX

		By JLJL
		format1: 961613274
		format2: +51961613274
		*/

		//let format1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		//let format2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

		let format1 = /^([9]{1})?([0-9]{2})?([0-9]{3})?([0-9]{3})$/;
		let format2 = /^\+?([0-9]{2})?([9]{1})?([0-9]{2})?([0-9]{3})?([0-9]{3})$/;

		if (format1.test(phone) || format2.test(phone)) {
			return true;
		}
		return false;
	}

	static url(url) {
		let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}

	static maxLength(str, max) {
		if ( str.length <= max ) {
			return true;
		}
		return false;
	}

	static minLength(str, min) {
		if ( str.length >= min ) {
			return true;
		}
		return false;
	}

}


/******************************************************************************
 * JS SGA Course Class
 *****************************************************************************/

class Course {
    constructor(code, group, credit, name, type) {
        this.code = code;
        this.group = group;
        this.credit = credit;
        this.name = name;
        this.type = type;    
    }
}
/******************************************************************************
 * JS SGA Enrollment Class
 *****************************************************************************/

/**
 * @class Enrollment
 */
class Enrollment {

    constructor(studentId, semesterId) {
        this.studentId = studentId;
        this.semesterId = semesterId;
        this.enrolledCourses = [];
		this.selectedCourses = [];
		this.totalCredits = 0;
		this.maxFreeActivities = 1;
		this.maxCredits = 0;	//22
		this.maxCourses = 0;	//10
    }

    /**
     * @param {number} maxFreeActivities
     */
    set maxCoursesFreeActivities(maxFreeActivities) {
        this.maxFreeActivities = maxFreeActivities;
	}

	setMaxCourses( maxCourses ) {
		this.maxCourses = maxCourses;
	}

	setMaxCredits( maxCredits ) {
		this.maxCredits = maxCredits;
	}

    get quantityCourses() {
        return this.selectedCourses.length;
    }

    addCourse (course) {
        if ( course.code.indexOf('L') == 0 && this.countFreeActivities() >= this.maxFreeActivities ) {
            return -1;
        }
        if ( this.searchCourse(course.code) >= 0 ) {
            return 0;
		}

		if ( this.countTotalCourses() >= this.maxCourses ) {
			console.log( 'addCourse excess courses' );
			// console.log( this.totalCredits );
			// console.log( this.maxCredits );
			// console.log( this.maxCourses );
			// console.log( this.totalCredits + course.credit );
			// console.log( this.countCourses() + 1 );
			// console.log( course );
			return 3;	// course exceed max courses
		}

		if ( (this.totalCredits + course.credit ) > this.maxCredits ) {
			console.log( 'addCourse excess credits' );
			// console.log( this.totalCredits );
			// console.log( this.maxCredits );
			// console.log( this.totalCredits + course.credit );
			// console.log( course );
			return 2;	// course excess max credits
		}

        this.selectedCourses.push(course);
        this.totalCredits += course.credit;
        return 1;	// Adding course
	}

	// revisar posteriormente para uniformizar este proceso JLJL.2021.01020 - No permite seleccionar actividades libres para retiro se quito la validacion de nro de act.lib
	addCourseForRetirement (course) {
        if ( this.searchCourse(course.code) >= 0 ) {
            return 0;
		}

		if ( this.countTotalCourses() >= this.maxCourses ) {
			console.log( 'addCourse excess courses' );
			// console.log( this.totalCredits );
			// console.log( this.maxCredits );
			// console.log( this.maxCourses );
			// console.log( this.totalCredits + course.credit );
			// console.log( this.countCourses() + 1 );
			// console.log( course );
			return 3;	// course exceed max courses
		}

		if ( (this.totalCredits + course.credit ) > this.maxCredits ) {
			console.log( 'addCourse excess credits' );
			// console.log( this.totalCredits );
			// console.log( this.maxCredits );
			// console.log( this.totalCredits + course.credit );
			// console.log( course );
			return 2;	// course excess max credits
		}

        this.selectedCourses.push(course);
        this.totalCredits += course.credit;
        return 1;	// Adding course
    }

    removeCourse (courseId, group=false) {
        var index = this.searchCourse(courseId, group);
        if ( index >= 0 ) {
            this.selectedCourses.splice(index, 1); // remover un elemento de la pos index;
            this.totalCredits = this.sumCredits();
            return true;
        }
        return false;
    }

    searchCourse (courseId, group=false) {
        for (var i=0; i<this.selectedCourses.length; i++) {
            var selectedCourseId = this.selectedCourses[i].code;
            if (group) {
                selectedCourseId += this.selectedCourses[i].group
            }
            if ( selectedCourseId === courseId ) {
                return i;
            }
        }
        return -1;
    }

    countFreeActivities () {
        var freeactivities = 0;
        for (var i=0; i<this.selectedCourses.length; i++) {
            if ( this.selectedCourses[i].code.indexOf('L') == 0 )
                freeactivities += 1;
		}

		for (var i=0; i<this.enrolledCourses.length; i++) {
            if ( this.enrolledCourses[i].code.indexOf('L') == 0 )
                freeactivities += 1;
		}

        return freeactivities;
	}

    sumCredits() {
		return this.sumSelectedCredits() + this.sumEnrolledCredits();
	}

	sumSelectedCredits() {
		let credits = 0;
        this.selectedCourses.forEach(function (course){
            credits += course.credit;
		});
        return credits;
	}

	sumEnrolledCredits() {
		let credits = 0;
		this.enrolledCourses.forEach(function (course){
            credits += course.credit;
        });
        return credits;
	}

	countCourses() {
        return this.selectedCourses.length;
	}

	countTotalCourses() {
        return (this.selectedCourses.length + this.enrolledCourses.length);
	}

	countSelectedCourses() {
        return this.selectedCourses.length;
	}

	countEnrolledCourses() {
        return this.enrolledCourses.length;
	}



    deleteSelectedCourses() {
        this.selectedCourses = [];
        this.totalCredits = this.sumCredits();
	}


	// Enrolled Courses

	addEnrolledCourse(course) {
		this.enrolledCourses.push(course);
		this.totalCredits = this.totalCredits + course.credit;
	}



	// Registrar Aumento de Cursos
	IncreasedCourses()
	{

		//console.log('Matirculando..');
		//console.log(Enroll);
		let Courses = Enroll.selectedCourses;

		if ( Courses.length > 0 )
		{
			let html = '<table class="table table-sm text-11">';
			html += '<tr>';
			html += '<th class="text-center">Código</th>';
			html += '<th class="text-left">Curso</th>';
			html += '<th class="text-center">Cred</th>';
			html += '</tr>';

			for ( let i=0; i<Courses.length; i++ ) {
				html += '<tr>';
				html += '<td class="text-center">' + Courses[i].code + '</td>';
				html += '<td class="text-left">'   + Courses[i].name + '</td>';
				html += '<td class="text-center">' + Courses[i].credit + '</td>';
				html += '</tr>';
			}
			html += '</table>';

			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success mx-2',
					cancelButton: 'btn btn-danger mx-2'
				},
				buttonsStyling: false
			});

			swalWithBootstrapButtons.fire({
				title: 'Confirmas que que deseas matricularte en los siguientes cursos?',
				icon: 'question',
				html: html,
				showCancelButton: true,
				confirmButtonText: 'Si, matricularme!',
				cancelButtonText: 'Cancelar',
				reverseButtons: true
			}).then((result) => {
				if (result.value) {

					RequestAjax2({
						//url: 'processor.php',	// PROCESSOR GENERA ERRORES DE SESION CREA LA SESSPHPID
						data: { load: 'StudentEnrollmentIncreasedController@save', data: { enrollment: JSON.stringify(Enroll) } },
						context: $(wrappers.main),
						callback: function (data){
							if ( data == 1 ) {
								swalWithBootstrapButtons.fire(
									'Aumento de cursos realizado!!',
									'Tu matrícula se ha registrado exitosamente en los cursos seleccionados!',
									'success'
								)
								RequestAjax2({
									data: { load: 'StudentEnrollmentController@index' },
									context: $(wrappers.main)
								});
								UserActivityLog('Aumento Cursos', 'Registrado!');
							}
							else {
								swalWithBootstrapButtons.fire(
									'Hubo un problema!',
									'No se ha registrado tu matrícula en los cursos seleccionados, por favor intentalo nuevamente!',
									'error'
								);
								UserActivityLog('Aumento Cursos', 'Error! No se registro!');
							}
						}
					});

				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire(
						'Has cancelado el aumento de cursos!',
						'Revisa detenidamente los cursos que vas a llevar en el presente semestre ;)',
						'error'
					);
					UserActivityLog('Aumento Cursos', 'Cancelado por el alumno');
				}
			})

		} else {
			Swal.fire('Seleccione cursos!', '', 'error');
			UserActivityLog('Aumento Cursos', 'Error! No Selecciono Cursos!');
		}

		return true;

	}




	// Registrar Retiro de Cursos
	WithdrawalOfCourses()
	{
		if ( this.selectedCourses.length <= 0 ) {
			UserActivityLog('Retiro Cursos', 'Error! No Selecciono Cursos!');
			Swal.fire('Selecciona al menos un curso!', 'No has seleccionado ningún curso para retirarte!', 'warning');
			return false;
		}

		if ( this.selectedCourses.length >= this.enrolledCourses.length ) {
			Swal.fire('No Permitido!', 'No puedes retirarte de todos los cursos matriculados.', 'error');
			UserActivityLog('Retiro Cursos', 'Error! Retiro de todos los cursos!');
			return false;
		}

		let html = '<table class="table table-sm text-12">';
			html += '<tr>';
			html += '<th class="text-center">Código</th>';
			html += '<th class="text-left">Curso</th>';
			html += '<th class="text-center">Cred</th>';
			html += '</tr>';

		for ( let i=0; i< this.selectedCourses.length; i++ ) {
			html += '<tr>';
			html += '<td class="text-center">' +  this.selectedCourses[i].code   + '</td>';
			html += '<td class="text-left">'   +  this.selectedCourses[i].name   + '</td>';
			html += '<td class="text-center">' +  this.selectedCourses[i].credit + '</td>';
			html += '</tr>';
		}

		html += '</table>';

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success mx-2',
				cancelButton: 'btn btn-danger mx-2'
			},
			buttonsStyling: false
		});

		swalWithBootstrapButtons.fire({
			title: 'Estas seguro de Retirarte de los siguientes cursos?',
			icon: 'question',
			html: html,
			showCancelButton: true,
			confirmButtonText: 'Sí, Retirarme!',
			cancelButtonText: 'No, no estoy seguro',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				RequestAjax2({
					//url: 'processor.php',	// PROCESSOR GENERA ERRORES DE SESION CREA LA SESSPHPID
					data: { load: 'StudentEnrollmentWithdrawalController@withdrawing', data: { enrollment: JSON.stringify(this) } },
					context: $(wrappers.main),
					callback: function (data){
						if ( data == 1 ) {
							swalWithBootstrapButtons.fire(
								'Curso(s) Retirado(s)',
								'Se te ha retirado de los cursos seleccionados!',
								'success'
							)
							RequestAjax2({
								data: { load: 'StudentEnrollmentWithdrawalController@index' },
								context: $(wrappers.main)
							});
							UserActivityLog('Retiro Cursos', 'Ok!');
						}
						else {
							swalWithBootstrapButtons.fire(
								'Ups, hubo un problema!',
								'No ha sido posible realizar el retiro de los cursos seleccionados, por favor intentalo nuevamente!',
								'error'
							);
							UserActivityLog('Retiro Cursos', 'Error! No se Guardo!');
						}
					}
				});
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					'Retiro de Cursos Cancelado',
					'No se te ha retirado de los cursos seleccionados!)',
					'info'
				)
			}
		})

		return true;
	}



}


/******************************************************************************
 * JS SGA Enrollment Functions
 *****************************************************************************/

function enrollmentDeleteSelectedCourses() {
	Enroll.deleteSelectedCourses();
	$('#tableEnrollmentCourses #totalCredits').text(Enroll.totalCredits);
	$('#tableEnrollmentCourses tbody').find('tr.course-selected').remove();
}
/*
function enrollmentAttachSelectedCourses() {
	// El html de esta parse debe igualarse con el html de EnrollmentAvailableCourses.html.twig.
    Enroll.selectedCourses.forEach(function (course) {
        let courseId = course.code.replace('*','X') + course.group ;
        let professor = $('#tableAvailableCourses tbody tr#Course' + courseId + ' td .course-professor').text().trim();
        let input = '<label>';
            input += '<div class="icheckbox checked">';
            input += '<input type="checkbox" name="enrollmentcourses[]" value="'+ course.code + course.group +'" checked>';
            input += '</div>';
            input += '</label>';

        let html = '<tr class="course-selected">';
            html += '<td class="text-center">' + input + '</td>';
            html += '<td>';
            html += '<span class="label bg-flat-asbestos text-10 text-white" style="padding-left: 0.6em;">'+ course.code +'</span>';
            html += '<span class="label label-primary text-10" style="margin-left: -0.6em; padding:3px 4px;">'+ course.group +'</span>';
            html += '</td>';
            html += '<td class="text-left">'   + course.name +'<br><span class="font-italic text-blue">'+ course.type +'</span></td>';
            html += '<td class="text-center">' + course.credit + '</td>';
            html += '<td class="text-cleft">'  + professor + '</td>';
            html += '</tr>';

        $('#tableEnrollmentCourses tbody').append(html);
    });

    $('#tableEnrollmentCourses tbody').find('input').iCheck({
        checkboxClass: 'icheckbox_square-purple',
        radioClass: 'iradio_square-purple',
        increaseArea: '20%' // optional
	});

    $('#tableEnrollmentCourses #totalCredits').text( Enroll.sumCredits() );
}
*/


function saveEnrollment() {

	//console.log('Matirculando..');
	//console.log(Enroll);
	let Courses = Enroll.selectedCourses;

	if ( Courses.length > 0 ) {

		let html = '<table class="table table-sm text-10">';
		html += '<tr>';
		html += '<th class="text-center">Código</th>';
		html += '<th class="text-left">Curso</th>';
		html += '<th class="text-center">Cred</th>';
		html += '</tr>';

		for ( i=0; i<Courses.length; i++ ) {
			html += '<tr>';
			html += '<td class="text-center">' + Courses[i].code + '</td>';
			html += '<td class="text-left">' + Courses[i].name + '</td>';
			html += '<td class="text-center">' + Courses[i].credit + '</td>';
			html += '</tr>';
		}
		html += '</table>';

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		});

		swalWithBootstrapButtons.fire({
			title: 'Deseas matricularte en los siguientes cursos?',
			icon: 'question',
			html: html,
			showCancelButton: true,
			confirmButtonText: 'Si, matricularme!',
			cancelButtonText: 'No, aún no',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {

				RequestAjax2({
					//url: 'processor.php',	// PROCESSOR GENERA ERRORES DE SESION CREA LA SESSPHPID
					data: { load: 'StudentEnrollmentController@save', data: { enrollment: JSON.stringify(Enroll) } },
					context: $(wrappers.main),
					callback: function (data){
						if ( data == 1 ) {
							swalWithBootstrapButtons.fire(
								'Felicidades, ya estás matriculado!',
								'Tu matrícula se ha registrado exitosamente en los cursos seleccionados!',
								'success'
							)

							RequestAjax2({
								data: { load: 'StudentEnrollmentController@index' },
								context: $(wrappers.main)
							})
						}
						else {
							swalWithBootstrapButtons.fire(
								'Hubo un problema!',
								'No se ha registrado tu matrícula en los cursos seleccionados, por favor intentalo nuevamente!',
								'error'
							)
						}
					}
				});

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					'Has cancelado tu matrícula!',
					'Revisa detenidamente los cursos que vas a llevar en el presente semestre ;)',
					'error'
				)
			}
		})

	} else {
		Swal.fire('Seleccione cursos!', '', 'error');
	}




	// Tipo: 0 = Matricula, 1 = Aumento, 2 = Retiro
	// var cursosx = $("#cursosx").val();                                  //lista de cursos con subcodigo
	// var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	// var listCodCursos = cursosx.replace(/'/g, "");
	// var resultContenedor = document.getElementById("ResultMatricula");

	// var paymentvisa = $("#paymentvisa").val();
	// var paymentsid  = $("#paymentsid").val();
	// var paymentssid = $("#paymentssid").val();

	// var varID = 49;
	// var ajax = nuevoAjax();

	// if (tipo === 2) {
	//     var cursosRet = document.getElementById("cursosRetir").value;
	//     var enviopost = "varID=" + varID + "&cod_cursos=" + cursosRet + "&tipoProc=" + tipo + "&paymentvisa="+paymentvisa + "&paymentsid=" + paymentsid + "&paymentssid=" + paymentssid;
	// } else {
	//     var enviopost = "varID=" + varID + "&cod_cursos=" + listCodCursos + "&tipoProc=" + tipo + "&paymentvisa="+paymentvisa + "&paymentsid=" + paymentsid + "&paymentssid=" + paymentssid;
	// }

	// requestPOST("tareas.php", enviopost, ajax, resultContenedor, 0);
	// $("#MarcoMatricula").hide("slow");

	// UserActivityLog("MATRICULA_GUARDAR");
}

// Variables

var paramSem = "txtSelectSem";
//var Semestre = $("#txtSelectSem");

var windowPrint = null;

// var spinner = {
//     circleplane: '<div class="spinner-wrapper">' +
// 		'<div class="sk-preloader"></div>' +
// 		'<div class="sk-texttop">DICDA</div>' +
// 		'<div class="sk-spinner sk-spinner-three-bounce">' +
// 		'<div class="sk-bounce1">S</div>' +
// 		'<div class="sk-bounce2">G</div>' +
// 		'<div class="sk-bounce3">A</div>' +
// 		'</div>' +
// 		'<div class="sk-textbottom">UNAS</div>' +
// 		'</div>'
// };

const DatatableLanguage = {
	//"lengthMenu": "Visualizar _MENU_ registros por página",
	"lengthMenu": "Registros por página: _MENU_",
	//"zeroRecords": "Lo siento, no se encontraron resultados!",
	"info": "Visualizando página _PAGE_ de _PAGES_",
	"infoEmpty": "No se ha encontrado registros disponibles",
	"infoFiltered": "(filtradas de _MAX_ entradas totales)",
	"search": "Buscar:",
	"paginate": {
		"first": "Primero",
		"last": "Último",
		"next": "Siguiente",
		"previous": "Anterior"
	},
	"processing": spinner.circleplane + "Cargando datos.."
};

$(function() {

	// Control Menu Actions
	$("body").on("click", "a.btn-action", function (e) {
		e.preventDefault();
		var href = $(this).attr("href");
		var toggle = ($(this).data('toggle') == 'modal') ? 1 : 0;
		var context = (toggle > 0) ? context = 'modal' : context = $(wrappers.main);

		console.log('Btn Action ' + href);
		RequestAjax2({
			url: href,
			data: { toggle: toggle },
			context: context
		});
	});

	// Control Menu Actions
	$("body").on("click", "a.btn-download", function (e) {
		e.preventDefault();
		Download(this);
	});

	$("#side-menu").metisMenu({ toggle: true, activeClass: 'active' });
	$('[data-toggle="popover"]').popover();

	if (user.type === 2) {
		$('.sidebar-collapse').removeClass('sidebar-light').addClass('sidebar-dark');
	}

	hideSidebar();

	App.getSemesterStatus();
	App.getAcademicCalendar(semester.current, 5);

	//-------------------------------------------------------------------

	$("#side-menu li, #navbarUser > ul.dropdown-user").on("click", "a", function (e) {

		var href = $(this).attr("href");
		var wrap = $(this).data("wrapper");
		var type = $(this).data("menu");
		var path = location.pathname.substring(1);

		console.log('lnk:', href, 'pth:', path, 'loc:', location.pathname);

		hideSidebar();
		history.pushState(null, "", "/");	// para todos los menus de sidebar hacer esto

		if (href === '#' || href.indexOf('#/') === 0 || href.indexOf('/') === 0) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		// if (href.indexOf('/') === 0) {
		// 	console.log('internal route ' + href);
		// 	window.location.href = href;
		// }else..

		if (href.indexOf('http') != 0) {

			console.log('path ' + path);

			// if (path != '' && path != '/' && path != '#') {
			// 	//window.location.href = '/';
			// 	history.pushState(null, "", "/");
			// 	//cambiar la url sin cambiar la pagina
			// }

			if (typeof (type) == "undefined") {
				if (typeof (wrap) == "undefined") {
					console.log('ActionEvent 1.2: ' + href);
					var codsem = semester.active;
					RequestAjax2({
						data: { load: href.substr(1) + 'Controller@index', codsem: codsem },
						context: $(wrappers.main)
					});
				}
			}
			else if (typeof (type) !== 'undefined' && type !== null) {
				e.preventDefault();
				var pid = parseInt($(this).data("pid"), 10);
				if (!$(this).data("twig")) {
					console.log('ActionEvent2.1: ' + href);
					var url = "S_W_" + type + "/contenido_" + href.substr(1) + ".php";
					if (type === 'alumno' && pid === 10600) {
						console.log('Alumno Registro Notas Header');
						RequestAjax('tareas.php', { pid: pid }, $(wrapper.main), function () { });
					} else {
						llamarAHAH(url, "page-content", parseInt(pid));
						if (href.substr(1) === 'matricula_registro_cursos_alumno') {
							//alumnoNotifications();  //visualizar anuncio de encuesta minedu 2017-2
						}
					}
				} else {
					console.log('ActionEvent2.2: ' + href);
					var cont = $(this).data("controller");
					if (typeof (cont) !== 'undefined' && cont !== null && cont === true) {
						//RequestAjax('processor.php', {load:'SGAController@showSemester'}, $('ul.dropdown-semester'));
					} else {
						RequestAjax("tareas.php", { pid: pid }, $(wrapper.main));
					}
				}
			} else {
				window.location.href = href;
			}
		} else {
			// link externo
			window.open(href, '_blank');
		}
	});

	//-------------------------------------------------------------------





	// Exportar Documentos
	$('body').on('click', '.export-report', function () {

		var format = $(this).data('export');
		var file = 'DICDA-SGA_' + $(this).data('title') + '.' + format;
		var sheet = $(this).data('title');
		let href = $(this).attr("href").substr(1);
		console.log('href: ' + href);

		if (href.indexOf('/', 0) === 0) {
			if (format == 'pdf') {
				if (href.indexOf('/', 0) === 0) {
					window.open('https://academico.unas.edu.pe' + href);
					// RequestAjax2({
					// 	url: href,
					// 	context: 'download'
					// });
				}
				else {
					cloneElement.prepend(div);
					printPDFReport(elementId);
				}
			}

		} else {

			let elementId = href;

			var Element = document.getElementById(elementId);
			var cloneElement = Element.cloneNode(true);

			const div = document.createElement('div');
			div.className = 'row';
			div.innerHTML = `
				<caption>
					<h5>Universidad Nacional Agraria de la Selva</h5>
					<h5>Dirección de Coordinación y Desarrollo Académico</h5>
				</caption>
			`;
			Exporter.export(cloneElement, file, sheet);
		}

	});




	//Para el SegCur
	$("body #page-content").on("mouseenter", "#wrapper-segcur div.curso", function (e) {
		$(this).addClass("select");
		var str = $(this).data("requisito");
		var prq = str.split(",");
		$('[data-toggle="tooltip"]').tooltip();
		for (i = 0; i < prq.length; i++) {
			if (prq[i] != "Ninguno" && prq[i].indexOf("Cred.") == -1) {
				prq[i] = prq[i].replace("*", "x");
				$("#" + prq[i]).addClass("select");
			}
		}
	});

	// horario de aula
	$('body #page-content').on('click', '.btn-classroom-schedule', function () {
		var codaula = $(this).data('codaula');
		var codsem = $(this).data('codsem');
		console.log('click');
		RequestAjax2({
			data: { load: 'SuperviseClassroomController@show', data: { codaula: codaula, codsem: codsem } }
		});
	});

	$("body #page-content").on("mouseleave", "#wrapper-segcur div.curso", function (e) {
		$(".select").removeClass("select");
	});

	// Change Semester
	// ------------------------------------------------------------------------

	// Select Semester
	$("body").on("click", "#btnSelectSemester", function (e) {
		RequestAjax2({ data: { load: 'SemesterController@select' } });
	});

	// Active Semester
	$("body").on("click", "#btnActiveSemester", function (e) {
		setSemesterActive($("#selectSemester").val());
	});



	// Enrollment Actions
	// ------------------------------------------------------------------------

	$(document).on('click', '#btnEnrollmentAvailableCourses', function () {
		RequestAjax2({
			data: { load: 'StudentEnrollmentController@showAvailableCourses' }
		});
	});

	$(document).on('click', '#btnEnrollmentDeleteCourses', function () {
		enrollmentDeleteSelectedCourses();
	});

	$(document).on('click', '#btnEnrollmentAttachCourses', function () {
		enrollmentAttachSelectedCourses();
	});

	// Boletines
	// ------------------------------------------------------------------------
	$("body").on("click", ".ibox-boletin a", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var letter = this.href.split("/");
		var size = letter.length;
		var codesp = letter[size - 1];
		var codsem = letter[size - 2];
		RequestAjax2({
			data: {
				load: 'NewslettersController@show',
				data: { codsem: codsem, acronym: codesp }
			}, context: $(wrapper.main)
		});
	});

	$("body").on("click", ".ibox-studyplans a.btn-showstudyplan", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var letter = this.href.split("/");
		var size = letter.length;
		var acronym = letter[size - 2];
		var codcurr = letter[size - 1];
		RequestAjax2({
			data: {
				load: 'StudyPlansController@showStudyPlan',
				data: { acronym: acronym, codcurr: codcurr }
			}
		});
	});

	// Calendario Academico
	// ------------------------------------------------------------------------

	$("body").on("click", ".btn-show-calendar", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var codsem = $(this).data('codsem');
		RequestAjax2({ data: { load: 'AcademicCalendarController@show', data: { codsem: codsem } }, context: $(wrapper.main) });
	});


	$("body").on("click", "#btnSaveStudentPersonalInfo", function (e) {
		let formData = $('#frmStudentPersonalInfo').serializeFormJSON();
		RequestAjax2({
			data: { load: 'StudentInformationController@updatePersonalInfo', data: formData },
			context: 'silent',
			callback: function (response) {
				Swal.fire('', response, 'info');
			}
		});
	});

	$("body").on("click", "#btnSaveStudentContactInfo", function (e) {
		let formData = $('#frmStudentContactInfo').serializeFormJSON();
		RequestAjax2({
			data: { load: 'StudentInformationController@updateContactInfo', data: formData },
			context: 'silent',
			callback: function (response) {
				Swal.fire('', response, 'info');
			}
		});
	});

	$("body").on("click", "#btnSaveStudentSocialNetworks", function (e) {
		let formData = $('#frmStudentSocialNetworks').serializeFormJSON();
		RequestAjax2({
			data: { load: 'StudentInformationController@updatSocialNetworks', data: formData },
			context: 'silent',
			callback: function (response) {
				Swal.fire('', response, 'info');
			}
		});
	});


	// Serializar un formulario en un objeto json
	(function ($) {
		$.fn.serializeFormJSON = function () {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
		};
	})(jQuery);


	//==============================================================================
	// ADMIN
	//==============================================================================

	$('body').on('click', '#reportingEntryNotes', function () {

		console.log('aqui!');
		var codsem = $('#codsem').val();
		var coddep = $('#coddep').val();
		var statusact = 9;
		var halfcourse = 0;

		if ($('#halfcourse').prop('checked')) { halfcourse = 1; }

		if ($('#allacts').prop('checked')) {
			statusact = 9;
		}
		else if ($('#incompleteacts').prop('checked')) {
			statusact = 1;
		}
		else if ($('#emptyacts').prop('checked')) {
			statusact = 0;
		}

		$("#wrapper-reportingresonotas").html(spinner.circleplane);
		RequestAjax2({
			data: { load: 'IngresoNotasController@show', data: { codsem: codsem, coddep: coddep, halfcourse: halfcourse, statusact: statusact } },
			context: $('#wrapper-reportingresonotas'),
		});
	});

});
// End Document Ready


/******************************************************************************
 * Funciones para la Carga de Silabos JLJL / Sistema Academico UNAS
 ******************************************************************************/

function showMessage(message) {
	$(".uploadermessages").html("").show();
	$(".uploadermessages").html(message);
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

//==============================================================================
// General
//==============================================================================

function showBoletin(obj) {
	//console.log( $(obj).href );
	RequestAjax2({ data: { load: 'BoletinesController@show', codsem: codsem, acronym: codesp }, context: $(wrapper.main) });
}



// Function Enrollment -
function get_codigo_curso(txtNombre, est) {
	var nomCurso = document.getElementById(txtNombre).value;
	var maxCreditos = document.getElementById("maxCreditos").value;  ///////// descomentar
	var cantCursos = document.getElementById("cantCursos").value;    ///////// descomentar
	//var maxCreditos=22;
	//var cantCursos=10;
	console.log("Cursos: " + maxCreditos + " / " + cantCursos);
	var divMensaje = document.getElementById("resultConsulNombres");
	var varID = 48;
	var ajax = nuevoAjax();

	if (est == 0 && nomCurso == "") {
		est = 2;
	}
	if (est == 1) {
		document.getElementById(txtNombre).value = "";
	}
	if (est > 1) {
		var varID = 481;
		document.getElementById(txtNombre).value = "";
	}
	divMensaje.innerHTML = spinner.circleplane;
	var enviopost = "nomCur=" + nomCurso + "&varID=" + varID + "&maxCreditos=" + maxCreditos + "&cantCursos=" + cantCursos + "&est=" + est;
	requestPOST("tareas.php", enviopost, ajax, divMensaje, 0);
	//varNom=document.getElementById(txtNombre).value;
}

function Notas_Alumno(codCurso, tipo) {
	var divMensaje = document.getElementById("DetalleNotasCurso");
	var varID = 51;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "codCurso=" + codCurso + "&tipo=" + tipo + "&varID=" + varID, ajax, divMensaje, 0);
}

function cargarCargaAcademicaFacultad(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	var semestre = document.getElementById(paramSem).value;
	var varID = 24;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varsem=" + semestre, ajax, divMensaje, 0);
	botonPrint3(contenedor, semestre, 24); // Incluido en la vista. JL.2016.02.02
}
function cargarCargaAcademicaDocente(obj, contenedor, codDocente) {
	var posY = findPosY(obj);
	mostrarBuscador('capaCargaAcaDocente', 'espaceCerrar');
	var capaLista = document.getElementById('capaCargaAcaDocente');
	capaLista.style.top = (posY + 25) + "px";
	var divMensaje = document.getElementById(contenedor);
	divMensaje.innerHTML = "";
	var varID = 25;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&cod_docente=" + codDocente, ajax, divMensaje, 0);
	botonPrint2(contenedor, codDocente, 25);
}
function cargarCursosActivosFacultad(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	var semestre = document.getElementById(paramSem).value;
	var varID = 26;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varsem=" + semestre, ajax, divMensaje, 0);
	botonPrint(contenedor, semestre, 26);
}
// + llamada desde funcionario listado
function cargarListaAlumnosCurso(obj, contenedor, codCurso, codSem) {
	var posY = findPosY(obj);
	mostrarBuscador('capaListaAlumnosCurso', 'espaceCerrar');
	var capaLista = document.getElementById('capaListaAlumnosCurso');
	capaLista.style.top = (posY + 25) + "px";
	var divMensaje = document.getElementById(contenedor);
	divMensaje.innerHTML = "";
	var varID = 11;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codCurso=" + codCurso + "&codSem=" + codSem, ajax, divMensaje, 0);
	botonPrint2(contenedor, codCurso, 11);
}
function cargarListaDocentesFacultad(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	var semestre = document.getElementById(paramSem).value;
	var varID = 27;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varsem=" + semestre, ajax, divMensaje, 0);
	botonPrint(contenedor, semestre, 27);
}

function professorSeeSchedule(obj) {
	var coddocente = $(obj).data('id');
	var codsem = semester.active;
	RequestAjax2({
		data: { load: 'DocenteHorarioController@index', coddocente: coddocente, codsem: codsem },
		context: null,
		callback: function (rsp) {
			showModal({
				title: 'Horario Docente',
				icon: 'fa-calendar',
				size: 'modal-xlg',    //modal-sm
				content: rsp,
				time: 0,
				bgHeader: 'bg-green',
				btnType: 'btn-danger',
				btnText: 'Cerrar',
				btnClose: true,
				btnAction: null,
				footer: ''
			});
		}
	});
}


function professorSeeCoursesAcademicCharge(obj) {

	//Name OLD: cargarCursosCargaAcademica(obj, contenedor, coddocente, codsem)
	//    var posY = findPosY(obj);
	//    mostrarBuscador('capaOpcionesDocentes', 'espaceCerrar');
	//    var capaLista = document.getElementById('capaOpcionesDocentes');
	//    capaLista.style.top = (posY + 25) + "px";
	//    var divMensaje = document.getElementById(contenedor);
	//    divMensaje.innerHTML = "";
	//    var varID = 25;
	//    var ajax = nuevoAjax();
	//    requestPOST("tareas.php", "varID=" + varID + "&cod_docente=" + codDocente + "&codsem=" + codSem, ajax, divMensaje, 0);
	//    botonPrint2(contenedor, codDocente, 25);

	var coddocente = $(obj).data('id');
	var codsem = semester.active;
	RequestAjax2({
		data: { load: 'DocentesController@academicCharge', data: { coddocente: coddocente } },
		context: null,
		callback: function (rsp) {
			console.log('Resp: ' + rsp);
			showModal({
				title: 'Carga Lectiva',
				icon: 'fa-clipboard',
				size: 'modal-xlg',    //modal-sm
				content: rsp,
				time: 0,
				bgHeader: 'bg-green',
				btnType: 'btn-danger',
				btnText: 'Cerrar',
				btnClose: true,
				btnAction: null,
				footer: ''
			});
		}
	});
}

function cargarListaAlumnosFacultad(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	var semestre = document.getElementById(paramSem).value;
	var varID = 28;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varsem=" + semestre, ajax, divMensaje, 0);
	botonPrint(contenedor, semestre, 28);
}


function cargarListaPagosBN(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	//var semestre =document.getElementById(paramSem).value;
	var fechapago = document.getElementById('cbAnio').value + '-' + document.getElementById('cbMes').value + '-' + document.getElementById('cbDia').value;
	var varID = 29;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varFecha=" + fechapago, ajax, divMensaje, 0);
	botonPrint(contenedor, fechapago, 29);
}

// Rev. SGAv4.0  - 12/11/2014
// En reemplazo de la funcion findPos() que establece los valores para mostrar los datos de los alumnos
// File: relacion_alumnos.php
function cargarOpcionesAlumnos(obj, contenedor, varID) {
	obj = obj.parentNode.parentNode.parentNode;
	var posY = findPosY(obj);
	mostrarBuscador('capaOpcionesAlumnos', 'espaceCerrar');

	//document.getElementById('menuAlumnos').style.display='none';
	var capaLista = document.getElementById('capaOpcionesAlumnos');
	capaLista.style.top = (posY + 25) + "px";
	var divMensaje = document.getElementById(contenedor);
	divMensaje.innerHTML = "";

	var codAlumno = document.getElementById('OpcionCodigo').value;
	var codSem = document.getElementById('OpcionSemestre').value;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codAlumno=" + codAlumno + "&codsem=" + codSem, ajax, divMensaje, 0);
	botonPrint2(contenedor, codAlumno, varID);
}

// Rev. SGAv4.0  - 12/11/2014
// En reemplazo de la funcion findPos() que establece los valores para mostrar los datos de los alumnos
// File: relacion_alumnos.php
function setOptionsAlumno(obj, Codigo) {
	document.getElementById('OpcionCodigo').value = Codigo;
}

/*****************************************************************************
 * Funciones de Matricula v1.7 (Obsoleto!)
 *****************************************************************************/

var i_Creditos = 0;
var i_Cod_Cursos = "";
var i_Cred_Cursos = "";
var i_Cant_Cursos = 0;
var i_Cod_Mat = "";
var i_Cod_Ret = "";

function Agregando(codCursox, nomCursox, credCursox, profCursox, maxcred, codCursoReal, maxCantCursos, cadDia, cadHora) {
	//Ag Filas cuando agregas curso en matricula
	//console.debug(codCursox + ' / ' + nomCursox + ' / ' + credCursox + ' / ' + profCursox + ' /mxCr ' + maxcred + ' / ' + codCursoReal + ' /mxCu ' + maxCantCursos + ' / ' + cadDia + ' / ' + cadHora);
	var imagen = "<img src='images/botones/borrar01.png' width='16' height='16' border='0' />";
	i_Creditos = parseInt($("#TotalCreditos").html());
	console.debug('i_Creditos: ' + i_Creditos);

	if (i_Creditos > 0 && i_Cod_Cursos == "") {
		var t = $("#addCurso").html();
		var j = t.lastIndexOf("<TBODY>");
		if (j == -1)
			j = t.lastIndexOf("<tbody>");
		var k = t.lastIndexOf("</TBODY>");
		if (k == -1)
			k = t.lastIndexOf("</tbody>");
		t = t.substring(j + 7, k);
		do {
			j = t.indexOf("<TR");
			if (j == -1)
				j = t.indexOf("<tr");
			j = t.indexOf("<TD");
			if (j == -1)
				j = t.indexOf("<td");
			k = t.indexOf("</TR>");
			if (k == -1)
				k = t.indexOf("</tr>");
			l = t.lastIndexOf("</TR>");
			if (l == -1)
				l = t.lastIndexOf("</tr>");
			tx = t.substring(j, k);
			//alert(tx);
			j = t.indexOf("</TD>");
			if (j == -1)
				j = t.indexOf("</td>");
			j = t.indexOf("<TD", j);
			if (j == -1)
				j = t.indexOf("<td", j);
			j = t.indexOf(">", j);
			if (j == -1)
				j = t.indexOf(">", j);
			j2 = t.indexOf("</TD>", j);
			if (j2 == -1)
				j2 = t.indexOf("</td>", j);
			txx = t.substring(j + 1, j2);
			i_Cod_Mat = i_Cod_Mat + "'" + txx + "'";

			t = t.substring(k + 5, l + 5);
			//alert(t);
			j = t.indexOf("<TR");
			if (j == -1)
				j = t.indexOf("<tr");
			i_Cant_Cursos += 1;
		} while (j != -1)
	}
	if (i_Creditos == 0) {
		i_Cod_Cursos = "";
		i_Cred_Cursos = "";
	}
	//    console.debug('JLDev. iQCred.' + i_Creditos + ' -iQCur.' + i_Cant_Cursos);

	i_Creditos = i_Creditos + parseInt(credCursox);
	i_Cant_Cursos += 1;

	nomCursox = nomCursox.replace(/_/gi, " ");
	profCursox = profCursox.replace(/_/gi, " ");

	if (!profCursox) {
		profCursox = "";
	}
	//    console.debug('JLDev. mxCred.' + maxcred + ' -mxCur.' + maxCantCursos);
	//    console.debug('JLDev. iQCred.' + i_Creditos + ' -iQCur.' + i_Cant_Cursos);

	if ((i_Creditos <= maxcred) && (i_Cant_Cursos <= maxCantCursos)) {
		if ((i_Cod_Cursos.indexOf(codCursoReal) == -1) && (i_Cod_Mat.indexOf(codCursoReal) == -1)) {
			i_Cod_Cursos = i_Cod_Cursos + "'" + codCursox + "'";
			i_Cred_Cursos = i_Cred_Cursos + "'" + credCursox + "'";
			var link_borrar = "<div title='Quitar Curso' style='cursor: pointer' onclick=Borrar_Fila(this,'" + codCursox + "'," + credCursox + ")>" + imagen + "</div>"
			var t = $("#addCurso").html();
			//t=t.substring(0,(t.length-16));
			t = t.substring(0, (t.indexOf("</tbody>")));
			console.debug('JLDev. Agregando t: ' + t);

			t += "<tr class='aggregate'><td class='text-center'>" + link_borrar + "</td><td class='text-left'>" + codCursox + "</td><td class='text-left'>" + nomCursox + "</td><td class='text-center'>" + credCursox + "</td><td class='text-left'>" + profCursox + "</td></tr></tbody></table>";
			//document.getElementById('addCurso').innerHTML=t;
			//document.getElementById('TotalCreditos').innerHTML = i_Creditos;
			$("#addCurso").html(t);
			$("#TotalCreditos").html(i_Creditos);
			UserActivityLog("MATR_ADDCURSO", codCursox);
		} else {
			alert("Este Curso Ya fue Agregado.");
			i_Creditos = i_Creditos - parseInt(credCursox);
			i_Cant_Cursos -= 1;
		}
	} else {
		alert("Estas excediendo en el maximo de Creditos o de Cursos Permitidos!"); // + i_Creditos + ' - ' + i_Cant_Cursos );
		console.debug('JLDev. Estas excediendo en el maximo de Creditos o de Cursos Permitidos: Cred.' + i_Creditos + ' - Cur.' + i_Cant_Cursos);
		i_Creditos = i_Creditos - parseInt(credCursox);
		i_Cant_Cursos -= 1;
	}
	//llenaHorario(cadDia,cadHora,codCursox,nomCursox);
}

function preActivando(codCursox, nomCursox, credCursox, maxcred, codCursoReal, maxCantCursos) {
	//Ag Filas cuando agregas curso en matricula
	var imagen = "<img src='images/botones/borrar01.png' width='16' height='16' border='0' />";
	i_Creditos = parseInt(document.getElementById('TotalCreditos').innerHTML);
	if (i_Creditos > 0 && i_Cod_Cursos == "") {
		var t = document.getElementById('addCurso').innerHTML;
		var j = t.lastIndexOf("<TBODY>");
		if (j == -1)
			j = t.lastIndexOf("<tbody>");
		var k = t.lastIndexOf("</TBODY>");
		if (k == -1)
			k = t.lastIndexOf("</tbody>");
		t = t.substring(j + 7, k);
		do {
			j = t.indexOf("<TR");
			if (j == -1)
				j = t.indexOf("<tr");
			j = t.indexOf("<TD");
			if (j == -1)
				j = t.indexOf("<td");
			k = t.indexOf("</TR>");
			if (k == -1)
				k = t.indexOf("</tr>");
			l = t.lastIndexOf("</TR>");
			if (l == -1)
				l = t.lastIndexOf("</tr>");
			tx = t.substring(j, k);
			//alert(tx);
			j = t.indexOf("</TD>");
			if (j == -1)
				j = t.indexOf("</td>");
			j = t.indexOf("<TD", j);
			if (j == -1)
				j = t.indexOf("<td", j);
			j = t.indexOf(">", j);
			if (j == -1)
				j = t.indexOf(">", j);
			j2 = t.indexOf("</TD>", j);
			if (j2 == -1)
				j2 = t.indexOf("</td>", j);
			txx = t.substring(j + 1, j2);
			i_Cod_Mat = i_Cod_Mat + "'" + txx + "'";

			t = t.substring(k + 5, l + 5);
			//alert(t);
			j = t.indexOf("<TR");
			if (j == -1)
				j = t.indexOf("<tr");
			i_Cant_Cursos += 1;
		} while (j != -1)
	}
	if (i_Creditos == 0) {
		i_Cod_Cursos = "";
		i_Cred_Cursos = "";
	}
	i_Creditos = i_Creditos + parseInt(credCursox);
	i_Cant_Cursos += 1;
	nomCursox = nomCursox.replace(/_/gi, " ");
	if ((i_Creditos <= maxcred) && (i_Cant_Cursos <= maxCantCursos)) {
		if ((i_Cod_Cursos.indexOf(codCursoReal) == -1) && (i_Cod_Mat.indexOf(codCursoReal) == -1)) {
			i_Cod_Cursos = i_Cod_Cursos + "'" + codCursox + "'";
			i_Cred_Cursos = i_Cred_Cursos + "'" + credCursox + "'";
			var link_borrar = "<div title='Quitar Curso' style='cursor: pointer' onclick=Borrar_Fila(this,'" + codCursox + "'," + credCursox + ")>" + imagen + "</div>"
			var t = document.getElementById('addCurso').innerHTML;
			t = t.substring(0, (t.length - 16));

			t += "<tr><td>" + link_borrar + "</td><td align='center'>" + codCursox + "</td><td>" + nomCursox + "</td><td align='center'>" + credCursox + "</td></tr></tbody></table>";
			document.getElementById('addCurso').innerHTML = t;
			document.getElementById('TotalCreditos').innerHTML = i_Creditos;
		} else {
			alert("Este Curso Ya fue Agregado.");
			i_Creditos = i_Creditos - parseInt(credCursox);
			i_Cant_Cursos -= 1;
		}
	} else {
		alert("Estas Excediendo en el Maximo de Creditos o de Cursos Permitidos!");
		i_Creditos = i_Creditos - parseInt(credCursox);
		i_Cant_Cursos -= 1;
	}
	//alert(cadDia);
	//llenaHorario(cadDia,cadHora,codCursox,nomCursox);
}

function Borrar_Fila(objeto, codCursox, credCursox) {
	//console.debug('--->BorrarFila: ' + i_Creditos + ' / ' + i_Cred_Cursos + ' / ' + i_Cod_Cursos + ' / ' + i_Cant_Cursos);
	i_Creditos = parseInt($("#TotalCreditos").html());//i_Creditos = parseInt( document.getElementById('TotalCreditos').innerHTML);
	i_Creditos = i_Creditos - parseInt(credCursox);
	i_Cant_Cursos = i_Cant_Cursos - 1;
	var td = objeto.parentNode;
	var tr = td.parentNode;
	var table = tr.parentNode;
	table.removeChild(tr);
	//console.debug(objeto + ' ' + codCursox + ' ' + credCursox);
	$("#TotalCreditos").html(i_Creditos); //document.getElementById('TotalCreditos').innerHTML = i_Creditos;
	i_Cod_Cursos = i_Cod_Cursos.replace("'" + codCursox + "'", "");
	cursosRet = document.getElementById("cursosRetir");
	cursosRet.value = cursosRet.value.replace("'" + codCursox + "'", "");
	i_Cred_Cursos = i_Cred_Cursos.replace("'" + credCursox + "'", "");
	//console.debug('--->BorrarFila: ' + i_Creditos + ' / ' + i_Cred_Cursos + ' / ' + i_Cod_Cursos + ' / ' + i_Cant_Cursos);
	UserActivityLog("DELETEROW", codCursox);
}
function RestablecerValoresMatricula() {
	i_Cod_Cursos = "";
	i_Cred_Cursos = "";
	i_Creditos = 0;
	i_Cant_Cursos = 0;
	console.log("Valores Matricula: " + i_Cod_Cursos + " / " + i_Cred_Cursos + " / " + i_Creditos + " / " + i_Cant_Cursos);
}
function Borrar_Todo() {
	var t = $("#addCurso").html();          //var t=document.getElementById('addCurso').innerHTML;
	var j = t.lastIndexOf("<TBODY>");
	if (j == -1) {
		j = t.lastIndexOf("<tbody>");
	}
	t = t.substring(0, j);
	t += "<tbody></tbody></table>";
	//console.debug('--> ' + t);
	$("#addCurso").html(t); //document.getElementById('addCurso').innerHTML=t;

	// JLJL 25/08/2013:
	// Correcion Bug: al establecer el valor en 0 permitia matricular en mas creditos de los permitidos
	// cuando se presionaba el 	boton Borrar Todo de la pagina de Aumento de Cursos!
	// document.getElementById('TotalCreditos').innerHTML = "0"; 		//<-- BUG
	if (!document.getElementById('creditosMatriculados')) {
		$("#TotalCreditos").html('0'); //document.getElementById('TotalCreditos').innerHTML = 0;
	} else {
		$("#TotalCreditos").html(document.getElementById('creditosMatriculados').value);
	}
	//document.getElementById('TotalCreditos').innerHTML = document.getElementById('creditosMatriculados').value;
	i_Cod_Cursos = "";
	i_Cred_Cursos = "";
	i_Creditos = 0;
	i_Cant_Cursos = 0;
	UserActivityLog("CLICK_BORRARTODO");
}

function Matricular_Ya(tipo) {
	//document.getElementById('ResultMatricula').innerHTML="Matricula Realizada";
	if (i_Creditos == 0) {
		alert("Agregue Cursos..!");
	}
	else {
		if (confirm('Esta Ud. Seguro de Continuar..?,')) {
			var divMensaje = document.getElementById("ResultMatricula");
			var varID = 49;
			var ajax = nuevoAjax();
			if (tipo == '2') {
				var cursosRet = document.getElementById("cursosRetir").value;
				i_Cred_Cursos = '';
				var enviopost = "varID=" + varID + "&cod_cursos=" + cursosRet + "&cred_cursos=" + i_Cred_Cursos + "&tipoProc=" + tipo;
			} else {
				var enviopost = "varID=" + varID + "&cod_cursos=" + i_Cod_Cursos + "&cred_cursos=" + i_Cred_Cursos + "&tipoProc=" + tipo;
			}
			requestPOST("tareas.php", enviopost, ajax, divMensaje, 0);
			var botones = document.getElementById("MarcoMatricula");
			botones.style.display = 'none';
			i_Cod_Cursos = "";
			//llamarAHAH('S_W_alumno/contenido_matricula_registro_cursos_alumno.php','page-content',0);
		}
	}
	UserActivityLog("MATRICULAR_GUARDAR");
}

function PreActivar_Ya(tipo) {
	if (i_Creditos == 0) {
		alert("Agregue Cursos..!");
	} else {
		if (confirm('Esta Ud. Seguro de Continuar..?')) {
			var divMensaje = document.getElementById("ResultMatricula");
			var varID = 492;
			var ajax = nuevoAjax();
			if (tipo == '2') {
				var cursosRet = document.getElementById("cursosRetir").value;
				i_Cred_Cursos = '';
				var enviopost = "varID=" + varID + "&cod_cursos=" + cursosRet + "&cred_cursos=" + i_Cred_Cursos + "&tipoProc=" + tipo;
			} else {
				var enviopost = "varID=" + varID + "&cod_cursos=" + i_Cod_Cursos + "&cred_cursos=" + i_Cred_Cursos + "&tipoProc=" + tipo;
			}
			requestPOST("tareas.php", enviopost, ajax, divMensaje, 0);
			var botones = document.getElementById("MarcoMatricula");
			botones.style.display = 'none';
			i_Cod_Cursos = "";
		}
	}
}

function Agregar_Retiro(obj, codCursox) {
	obj = obj.parentNode;
	obj = obj.parentNode;
	if (i_Cod_Ret.indexOf(codCursox) == -1) {
		obj.cells[2].innerHTML = "<input type='button' value='Anular Retiro' onclick=Anular_Retiro(this,'" + codCursox + "') />" + obj.cells[2].innerHTML;
		obj.setAttribute("style", "text-decoration:line-through");
		i_Cod_Ret = i_Cod_Ret + "'" + codCursox + "'";
	}
}

function Anular_Retiro(obj, codCursox) {
	obj = obj.parentNode;
	obj = obj.parentNode;
	obj.setAttribute("style", "text-decoration:none");
	t = obj.cells[2].innerHTML;
	var j = t.indexOf(">");
	t = t.substr(j + 1, t.length);
	obj.cells[2].innerHTML = t;
	i_Cod_Ret = i_Cod_Ret.replace("'" + codCursox + "'", "");
}

function procesar_Aumento_Retiro() {
	if ((i_Cod_Cursos == "") && (i_Cod_Ret == "")) {
		alert("No Hay Cursos Elegidos..!   ");
	} else {
		if (confirm('Seguro de Continuar..?')) {
			var divMensaje = document.getElementById("ResultMatricula");
			var varID = 491;
			var ajax = nuevoAjax();
			var enviopost = "varID=" + varID + "&cod_cursos=" + i_Cod_Cursos + "&cred_cursos=" + i_Cred_Cursos + "&cod_ret=" + i_Cod_Ret;
			requestPOST("tareas.php", enviopost, ajax, divMensaje, 0);
			var botones = document.getElementById("MarcoMatricula");
			botones.style.display = 'none';
			//llamarAHAH('S_W_Alumnos/content_registro_cursos_alumno.php','contenido',0)
		}
	}
}

function Matricular(tipo) {
	// Tipo: 0 = Matricula, 1 = Aumento, 2 = Retiro
	var cursosx = $("#cursosx").val();                                  //lista de cursos con subcodigo
	var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	var listCodCursos = cursosx.replace(/'/g, "");
	var resultContenedor = document.getElementById("ResultMatricula");

	var paymentvisa = $("#paymentvisa").val();
	var paymentsid = $("#paymentsid").val();
	var paymentssid = $("#paymentssid").val();

	var varID = 49;
	var ajax = nuevoAjax();

	if (tipo === 2) {
		var cursosRet = document.getElementById("cursosRetir").value;
		var enviopost = "varID=" + varID + "&cod_cursos=" + cursosRet + "&tipoProc=" + tipo + "&paymentvisa=" + paymentvisa + "&paymentsid=" + paymentsid + "&paymentssid=" + paymentssid;
	} else {
		var enviopost = "varID=" + varID + "&cod_cursos=" + listCodCursos + "&tipoProc=" + tipo + "&paymentvisa=" + paymentvisa + "&paymentsid=" + paymentsid + "&paymentssid=" + paymentssid;
	}

	requestPOST("tareas.php", enviopost, ajax, resultContenedor, 0);
	$("#MarcoMatricula").hide("slow");
	UserActivityLog("MATRICULA_GUARDAR");
}

///////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
	$('body').on('click', '.btn-save-enrollment', function () {
		saveEnrollment();
		UserActivityLog('Matricula', 'Guardar')
	});

	$('body').on('click', '.btn-save-withdrawal', function () {
		if (typeof Enroll !== 'undefined') {
			Enroll.WithdrawalOfCourses();
			UserActivityLog('Retiro Cursos', 'Guardar')
		}
	});
	$('body').on('click', '.btn-save-increased', function () {
		if (typeof Enroll !== 'undefined') {
			Enroll.IncreasedCourses();
			UserActivityLog('Aumento Cursos', 'Guardar')
		}
	});
});

///////////////////////////////////////////////////////////////////////////////

function RetirarCurso(curso) {
	var resultContenedor = document.getElementById("ResultMatricula");
	var varID = 49;
	var ajax = nuevoAjax();
	var cursosRet = curso;
	var enviopost = "varID=" + varID + "&cod_cursos=" + cursosRet + "&tipoProc=2";
	requestPOST("tareas.php", enviopost, ajax, resultContenedor, 0);
	$("#MarcoMatricula").hide("slow");
}
function eliminarcadena(strList, strDel) {
	var strList = strList.replace(/'/g, "");
	var arr = strList.split(",");
	for (i = 0; i < arr.length; i++) {
		if (arr[i] == strDel) {
			arr.splice(i, 1); //solo elimine una sola cadena
		}
	}
	sub = "";
	for (i = 0; i < arr.length; i++) {
		sub = sub + "'" + arr[i] + "'";
		if ((i + 1) != arr.length)
			sub += ",";
	}
	return sub;
}
function eliminarcadena2(strList, strDel) {
	var strList = strList.replace(/'/g, "");
	var arr = strList.split(",");
	for (i = 0; i < arr.length; i++) {
		if (arr[i] == strDel) {
			arr.splice(i, 1); //solo elimine una sola cadena
		}
	}
	sub = "";
	for (i = 0; i < arr.length; i++) {
		sub = sub + arr[i];
		if ((i + 1) != arr.length)
			sub += ",";
	}
	return sub;
}

function delRowTable(objeto, codCursoReal, codCursox, credCursox) {
	var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	var cursos = $("#cursos").val();     //lista de cursos  reales
	var cursosx = $("#cursosx").val();    //lista decursos
	//var creditosx     = $("#creditosx").val();  //lista de crditos
	cursos = eliminarcadena2(cursos, codCursoReal);
	cursosx = eliminarcadena(cursosx, codCursox);
	//creditosx = eliminarcadena(creditosx, credCursox);
	totalCreditos = totalCreditos - parseInt(credCursox, 10);
	$("#TotalCreditos").text(totalCreditos);
	$("#cursos").val(cursos);
	$("#cursosx").val(cursosx);
	//$("#creditosx").val(creditosx);
	$("#" + objeto).remove();
	UserActivityLog("DELETECURSO_", codCursox);
	//alert("CURSO: " + codCursox + "(" + credCursox+ " Cred.) ELIMINADO!" );
}


function addRowTable(codCursox, nomCursox, credCursox, profCursox, maxCred, codCursoReal, maxCantCursos) {
	var html = '';
	var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	var cursos = $("#cursos").val();     // Almacena los cursos que se va agregando antes de dar matricula
	var cursosx = $("#cursosx").val();   // Almacena los subcursos que se va agregando antes de dar matricula
	var cursosm = $("#cursosmat").val(); // Contiene los datos de los cursos matriculados
	nomCursox = nomCursox.replace(/_/gi, " ");
	profCursox = profCursox.replace(/_/gi, " ");
	console.debug('Cursos: ' + cursos);
	console.debug('CursosX: ' + cursosx);
	console.debug('CursosM: ' + cursosm);
	console.debug('CodCursoX: ' + codCursox);
	console.debug('CodCursoReal: ' + codCursoReal);
	//var creditosx = $("#creditosx").val();

	var rows = $("#matricula-cursos tbody").find("tr").length;  // numero de cursos matriculados

	//Solo una actividad libre x semestre por orden de la direccion desde el 20160816
	var nroActLibre = 0; //contador para cursos de actividad libre.

	//codCursox,nomCursox,credCursox,profCursox,maxCred,codCursoReal,maxCantCursos,---cadDia,cadHora
	//Agregando(  "CC*704", "CONTAB._INDUSTRIAS_EXTRACTIVAS","3","RIOS_FLORES,_ELFRED","12","CC*704","14")

	var agregar = 1;

	// validar si el curso no ha sido agregado
	if (cursosm.indexOf('L0') >= 0) {
		nroActLibre++;
		console.log('Actividad Libre Matriculado!');
	}

	console.log('Reporting CursosM:');
	console.log(cursosm);
	console.log('Reporting CursoReal:');
	console.log(codCursoReal);
	console.log('Reporting IndexOF:');
	console.log(cursosm.indexOf(codCursoReal));

	if (cursosm.indexOf(codCursoReal) >= 0 || cursos.indexOf(codCursoReal) >= 0) {
		agregar = 0;
		showNotification(
			'Agregar Curso',
			'<p class="text-left text-16">Este curso ya se ha agregado!</p>',
			0,
			'fa fa-fw fa-warning',
			'bg-warning'
		);
	}

	if (cursos !== '') {
		listCursos = cursos.split(',');

		for (i = 0; i < listCursos.length; i++) {

			//Contar las actividades libres agregadas
			if (listCursos[i].substring(0, 2) == 'L0') {
				nroActLibre++;
			}

			if (listCursos[i] == codCursoReal) {
				agregar = 0;
				showNotification(
					'Aumento de Cursos',
					'<p class="text-left text-16">Este curso ya ha sido seleccionado!</p>',
					0,
					'glyphicon glyphicon-ban-circle',
					'bg-red'
				);
			}

			if (codCursoReal.substring(0, 2) == 'L0' && nroActLibre > 0) {
				agregar = 0;
				showNotification(
					'Aumento de Cursos',
					'<p class="text-left text-16">S&oacutelo est&aacute; permitido matricularse en una s&oacutela Actividad Libre!</p>',
					0,
					'glyphicon glyphicon-ban-circle',
					'bg-red'
				);
			}
		}
		if (agregar) {
			cursos = cursos + ',' + codCursoReal; //agrego el curso a la lista de cursos matriculados
			cursosx = cursosx + ",'" + codCursox + "'";
			//creditosx =  creditosx + ",'" + credCursox + "'";
		}
	}
	else {

		if (codCursoReal.substring(0, 2) == 'L0' && nroActLibre > 0) {
			agregar = 0;
			showNotification(
				'Aumento de Cursos',
				'<p class="text-left text-16">S&oacutelo est&aacute; permitido matricularse en una s&oacutela Actividad Libre!</p>',
				0,
				'glyphicon glyphicon-ban-circle',
				'bg-red'
			);
		} else {
			cursos = codCursoReal;
			cursosx = "'" + codCursox + "'";
			//creditosx =  "'" + credCursox + "'";
		}
	}

	// validar el maximo de creditos o cursos permitidos
	if (agregar) {
		if ((totalCreditos + parseInt(credCursox, 10)) > maxCred) {
			agregar = 0;
			showNotification(
				'Aumento de Cursos',
				'<p class="text-left text-16">Solo te est&aacute; permitido matricularte en un m&aacute;ximo de ' + maxCred + ' Cr&eacute;ditos</p>',
				0,
				'glyphicon glyphicon-info-sign',
				'bg-red'
			);
		}
		if ((rows + 1) > maxCantCursos) {
			agregar = 0;
			showNotification(
				'Aumento de Cursos',
				'<p class="text-left text-16">Solo puedes matricularte en un m&aacute;ximo de ' + maxCantCursos + ' Cursos!</p>',
				0,
				'glyphicon glyphicon-info-sign',
				'bg-red'
			);
		}
	}

	if (agregar) {
		console.debug('Agregando Curso: ' + codCursox);
		html = '<tr id="Curso' + (rows + 1) + '">';
		html += '<td class="text-center">';
		html += "<div class='text-center cursor-pointer' onclick=delRowTable('Curso" + (rows + 1) + "','" + codCursoReal + "','" + codCursox + "'," + credCursox + ")>";
		html += '<span class="glyphicon glyphicon-trash text-14"></span></div></td>';
		html += '<td class="text-left">' + codCursox + '</td>';
		html += '<td class="text-left">' + nomCursox + '</td>';
		html += '<td class="text-center">' + credCursox + '</td>';
		html += '<td class="text-left">' + profCursox + '</td>';
		html += '</tr>';

		//agregamos el curso a la tabla de matricula
		if ($("#matricula-cursos tbody").find("tr").length) {
			$('#matricula-cursos tbody tr:last').after(html);
		} else {
			$('#matricula-cursos tbody').append(html);
		}

		totalCreditos = (totalCreditos + parseInt(credCursox, 10));
		$("#cursos").val(cursos);
		$("#cursosx").val(cursosx);
		//$("#creditosx").val(creditosx);
		$("#TotalCreditos").text(totalCreditos);
		UserActivityLog("ADDCURSO_", codCursox);
	}
}

/* Function verificarCruceHorarioAlumno
 * Ver 1.0 Rev.20150316
 * Funcion para verificar los cruces de horario de los alumnos al matricularse
 * @param {type} codCursox
 * @param {type} nomCursox
 * @param {type} credCursox
 * @param {type} profCursox
 * @param {type} maxCred
 * @param {type} codCursoReal
 * @param {type} maxCantCursos
 * @returns {undefined}
 */
function verificarCruceHorarioAlumno(codCursox, nomCursox, credCursox, profCursox, maxCred, codCursoReal, maxCantCursos) {
	addRowTable(codCursox, nomCursox, credCursox, profCursox, maxCred, codCursoReal, maxCantCursos);
    /* POR AUTORIZACION EXPRESA DEL JEFE DE LA OCDA SE ANULA ESTA VALIDACION!
     var listacursos = $("#cursosx").val();
     var codsem = $("#codsem").val();
     $("#resultConsulNombres").hide();
     $("#btnConsulTodo").hide();
     if(listacursos!=''){
     $.post( "procesardata/cruce.php", {curso:codCursox, codsem:codsem, lista:listacursos} )
     .done(function( data ) {
     $("#resultConsulNombres").show();
     $("#btnConsulTodo").show();
     if(data!="")
     alert(data);
     else
     addRowTable(codCursox,nomCursox,credCursox,profCursox,maxCred,codCursoReal,maxCantCursos);
     });
     } else {
     $("#resultConsulNombres").show();
     $("#btnConsulTodo").show();
     addRowTable(codCursox,nomCursox,credCursox,profCursox,maxCred,codCursoReal,maxCantCursos);
     }*/
}


//*** Funciones Nuevas
function confirmarMatricula(tipo) {
	var cursosx = $("#cursosx").val(); //lista de cursos con subcodigo
	var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	var listCodCursos = cursosx.replace(/'/g, "");
	if (tipo === 0) {
		var titulo = "Matricula";
	}
	if (tipo === 1) {
		var titulo = "Aumento de Cursos";
	}
	if (tipo === 2) {
		var titulo = "Retiro de Cursos";
	}

	//RevJL.20160803. En examen de aplazados no permitia matricular en un unico curso de 0 creditos (FT03)
	//RevJL.20160803. (totalCreditos > 0 && listCodCursos!="") cambia a: (totalCreditos >= 0 && listCodCursos!="")
	if (totalCreditos >= 0 && listCodCursos != "") {
		showNotification(
			'Confirmar ' + titulo,
			'<p class="text-left text-16">Estas seguro de matricularte en los cursos seleccionados?</p>',
			0,
			'fa fa-info-circle fa-fw text-22',
			'bg-green',
			'',
			'',
			'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar Matricula</button><button type="button" class="btn btn-success" data-dismiss="modal" onclick="Matricular(' + tipo + ')">S&iacute;, Matricularme!</button>'
		);
		UserActivityLog("MATRICULA_CONFIRMAR");
	} else {
		showNotification(
			titulo,
			'<p class="text-warning text-left text-16">Lo siento, no has selecciono ning&uacute;n curso!</p>',
			0,
			'fa fa-warning text-22 text-warning',
			'bg-red'
		);
		UserActivityLog("MATRICULA_CONFIRMAR_NOAGREGOCURSOS");
	}
}

function confirmarRetiroCurso(curso) {
	var totalCreditos = parseInt($("#TotalCreditos").text(), 10);
	var numCursos = $("#matricula-cursos tbody").find("tr").length;  // numero de cursos matriculados
	if (numCursos > 1 && totalCreditos > 0) {
		UserActivityLog("RETIRO_" + curso + "_CONFIRMAR");
		showNotification(
			'Confirmar Retiro de Curso',
			'<p class="text-warning text-left text-16">Se va proceder a eliminar el curso ' + curso + ' de tu matr&iacute;cula, esta acci&oacute;n es irreversible!.<br><br>Estas seguro de proceder a retirarte del curso ' + curso + '?</p>',
			0,
			'fa fa-warning fa-fw text-22',
			'bg-warning',
			'',
			'',
			'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar Retiro</button><button type="button" class="btn btn-success" data-dismiss="modal" onclick="RetirarCurso(\'' + curso + '\')">S&iacute;, Retirarme!</button>'
		);
	} else {
		// Retiro de Semestre
		UserActivityLog("RETIRO_" + curso + "_DENEGADO_RS");
		showNotification(
			'Retiro de Curso Denegado!',
			'<p class="text-warning text-left text-16">No puedes retirarte de todos los cursos!<br>Si deseas proceder con esta acci&oacute;n, debes solicitar el Retiro de Semestre en la DICDA.</p>',
			0,
			'fa fa-warning fa-fw text-22',
			'bg-red',
			'',
			'',
			'<button type="button" class="btn btn-default" data-dismiss="modal">Ok!</button>'
		);
	}
}


/* Funciones para la Confirmacion de Matricula */
function preConfirmarMatricula() {
	if (document.getElementById("aceptarMatricula").checked) {
		document.getElementById("btnConfirmar").disabled = false;
	} else {
		document.getElementById("btnConfirmar").disabled = true;
	}
}
function ConfirmarMatricula(obj) {
	if (document.getElementById("aceptarMatricula").checked) {
		document.getElementById("confirmacion-matricula").innerHTML = '<div class="alert alert-warning  text-center"><h4> .. <span class="glyphicon glyphicon-info-sign"></span> &nbsp;&nbsp;Confirmando Matricula ..</h4><br><br /><img style="margin:10px auto;" src="images/cargando2.gif" width="220" height="19" /></div>';

		var divMensaje = document.getElementById("confirmacion-matricula");
		var varID = 66;
		var ajax = nuevoAjax();
		var enviopost = "varID=" + varID;
		requestPOST("tareas.php", enviopost, ajax, divMensaje, 0);
	}
}

/* ************************************************************************* */

function validarMail(Campo, e) {
	var objeto = document.getElementById(Campo);
	var texto = objeto.value;
	var mailres = true;
	var cadena = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@._-";

	var arroba = texto.indexOf("@", 0);
	if ((texto.lastIndexOf("@")) != arroba) {
		arroba = -1;
	}
	var punto = texto.lastIndexOf(".");

	for (var contador = 0; contador < texto.length; contador++) {
		if (cadena.indexOf(texto.substr(contador, 1), 0) == -1) {
			mailres = false;
			break;
		}
	}

	if ((arroba > 1) && (arroba + 1 < punto) && (punto + 1 < (texto.length)) && (mailres == true) && (texto.indexOf("..", 0) == -1)) {
		Campo = "0";
	} else {
		objeto.style.backgroundColor = "#FFA6AE";
		e = 0;
	}
	return e;
}

function validarCamposFichaEstadistica() {
	var e = 1;
	e = validarMail("email", e);
	e = validarCampo("dni", "", e, 6);
	e = validarCampo("lugarDomiDep", "00", e, 2);
	e = validarCampo("lugarDomiProv", "00", e, 2);
	e = validarCampo("lugarDomiDist", "00", e, 2);
	e = validarCampo("lugarColeDep", "00", e, 2);
	e = validarCampo("lugarColeProv", "00", e, 2);
	e = validarCampo("lugarColeDist", "00", e, 2);
	e = validarCampo("examenAdmision", "0", e, 1);
	e = validarCampo("anioFinColegio", "0", e, 4);
	e = validarCampo("tipoColegio", "0", e, 1);
	e = validarCampo("tipoPreparacion", "0", e, 1);
	e = validarCampo("numero1", "", e, 6);
	e = validarCampo("numero2", "", e, 6);
	e = validarCampo("direccion", "", e, 10);
	e = validarCampo("nacionalidad", "0", e, 1);
	e = validarCampo("trabaja", "0", e, 1);
	e = validarCampo("idioma", "0", e, 1);
	e = validarCampo("estcivil", "0", e, 1);
	return e;
}

function grabar_ficha_estadistica() {
	var e = validarCamposFichaEstadistica();
	if (e == 1) {
		var divMensaje = document.getElementById("MostrarFichaEstadistica");
		var email = document.getElementById("email").value;
		var dni = document.getElementById("dni").value;
		var numero1 = document.getElementById("numero1").value;
		var numero2 = document.getElementById("numero2").value;
		//var fecnacimiento = document.getElementById("cbAnio").value+'-'+document.getElementById("cbMes").value+'-'+document.getElementById("cbDia").value;
		var fecnacimiento = document.getElementById("fecNacimiento").value;
		var idioma = document.getElementById("idioma").value;
		var direccion = document.getElementById("direccion").value;
		var ubigeoDireccion = document.getElementById("lugarDomiDep").value + document.getElementById("lugarDomiProv").value + document.getElementById("lugarDomiDist").value;
		var ubigeoColegio = document.getElementById("lugarColeDep").value + document.getElementById("lugarColeProv").value + document.getElementById("lugarColeDist").value;
		var examenAdmin = document.getElementById("examenAdmision").value;
		var tipoprepa = document.getElementById("tipoPreparacion").value;
		var anioSecund = document.getElementById("anioFinColegio").value;
		var tipocol = document.getElementById("tipoColegio").value;
		var nacionalidad = document.getElementById("nacionalidad").value;
		var estcivil = document.getElementById("estcivil").value;
		var trabaja = document.getElementById("trabaja").value;
		var varID = 103;
		var ajax = nuevoAjax();
		requestPOST("tareas.php", "varID=" + varID + "&email=" + email + "&dni=" + dni + "&numero1=" + numero1 + "&numero2=" + numero2 + "&direccion=" + direccion + "&ubigeoDireccion=" + ubigeoDireccion + "&estcivil=" + estcivil + "&trabaja=" + trabaja + "&idiomamat=" + idioma + "&fecnacimiento=" + fecnacimiento + "&ubigeoColegio=" + ubigeoColegio + "&examenAdmin=" + examenAdmin + "&tipoprepa=" + tipoprepa + "&anioSecund=" + anioSecund + "&tipocol=" + tipocol + "&nacionalidad=" + nacionalidad, ajax, divMensaje, 0);
	} else {
		alert("FALTAN LLENAR CAMPOS O ESTAN ERRONEOS!");
	}
}

//FUNCION ACTUALIZADA 27/03/2015
function consultarSilabos(contenedor, semestre, nombre) {
	var divMensaje = document.getElementById(contenedor);
	var varsem = document.getElementById(semestre).value;
	var varnom = document.getElementById(nombre).value;
	var varID = 20;
	url = "varID=" + varID + "&postSem=" + varsem + "&postNom=" + varnom;
	var opcSilabos = document.getElementsByName("opcSilabos");
	var opcBusq = document.getElementsByName("opcBusq");
	var opcOrden = document.getElementsByName("opcOrden");

	for (i = 0; i < opcSilabos.length; i++)
		if (opcSilabos[i].checked)
			url += "&opcSilabos=" + opcSilabos[i].value;

	for (i = 0; i < opcBusq.length; i++)
		if (opcBusq[i].checked)
			url += "&opcBusq=" + opcBusq[i].value;

	for (i = 0; i < opcOrden.length; i++)
		if (opcOrden[i].checked)
			url += "&opcOrden=" + opcOrden[i].value;

	var ajax = nuevoAjax();
	requestPOST("tareas.php", url, ajax, divMensaje, 0);
}

function cargarMetodoEvaluar(contenedor, varcodCur) {
	contenedor = "page-content";
	var codSem = document.getElementById(paramSem).value;
	var pid = 11030;
	var divMensaje = document.getElementById(contenedor);
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "codCurso=" + varcodCur + "&varID=" + pid + "&codSem=" + codSem, ajax, divMensaje, 0, function (codcurso, codsem) {
		chartMetodoEvaluacion(codcurso, codsem);
	}, varcodCur, '2017-1');

	var divMensaje = document.getElementById('rptOpciones');
	divMensaje.innerHTML = "";
	divMensaje = document.getElementById("notaOpciones");
	divMensaje.innerHTML = "";
}

function datoVacio(campo) {
	if (campo.value == "")
		campo.value = 0;
}

function datoVacio2(campo, otrocamp) {
	if (campo.value == "") {
		campo.value = 0;
		document.getElementById(otrocamp).value = 0;
	}
}

function pasarEntero(valor) {
	if (valor == "") {
		valor = 0;
	} else {
		valor = parseInt(valor);
	}
	return (valor);
}

function mostrarVentanita(obj1, obj2) {
	buscador = document.getElementById(obj1);
	buscador.style.display = 'block';
	dragdrag(obj1, obj2);
	if (obj1 === "rootMatricula" || obj1 === "rootNombre") {
		get_codigo_curso('txtConsulNom', 1);
	}
}

function ocultarVentanita(obj) {
	buscador = document.getElementById(obj);
	buscador.style.display = 'none';
}

function dragdrag(obj1, obj2) {
	var theRoot = document.getElementById(obj1);
	var theHandle = document.getElementById(obj2);
	Drag.init(theHandle, theRoot);
}

function mostrar_record(contenedor, idcodAlumno, tipo) {
	var codAlumno = document.getElementById(idcodAlumno).value;
	var divMensaje = document.getElementById(contenedor);
	divMensaje.innerHTML = spinner.circleplane;
	var varID = 16;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codAlumno=" + codAlumno, ajax, divMensaje, 0);
	botonPrint(contenedor, codAlumno, 16);
}

function cargarPlanCurricular(contenedor, lista) {
	var divMensaje = document.getElementById(contenedor);
	var codCurri = lista.value;
	var varID = 32;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codCurri=" + codCurri, ajax, divMensaje, 0);
}

function verDetalleMovimientoCuenta(contenedor, codPart) {
	var divMensaje = document.getElementById(contenedor);
	var varID = 105;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codPart=" + codPart, ajax, divMensaje, 0);
}


/******************************************************************************
 * Funciones para el Ingreso de Notas
 *****************************************************************************/

function limpiarSelect2() {
	var ntiponota = $("#NtipoNota").val();
	//var strevals = $("#NtipoNota").data("evals");
	var select = document.getElementById("NnroNota");
	while (select.length > 0) {
		select.remove(0);
	}
	select.options[select.options.length] = new Option('Seleccionar', 0);

	//00122111
	//var nroeval = strevals.charAt(ntiponota);
	var nroeval = parseInt($("#NtipoNota").data("me" + ntiponota));
	if (nroeval > 0) {
		for (i = 1; i <= nroeval; i++) {
			select.options[i - 1] = new Option(i, i);
		}
		select.options[select.options.length] = new Option('Todos', 99);
	} else {
		select.options[select.options.length] = new Option('No Tiene', 0);
	}
}
/* Reemplaza a limpiarSelect2 */

function resetSelectEvalNumber() {
	var evaltypeid = $("#SelectEvalType").val();
	var evaltypename = $("#SelectEvalType option:selected").text();
	//var strevals = $("#NtipoNota").data("evals");
	var select = document.getElementById("SelectEvalNumber");
	while (select.length > 0) {
		select.remove(0);
	}

	//00122111
	//var nroeval = strevals.charAt(ntiponota);
	var nroeval = parseInt($("#SelectEvalType").data("et" + evaltypeid));

	if (nroeval < 0) {
		select.options[select.options.length] = new Option('Todas las Evaluaciones', -1);
	}

	if (nroeval == 0) {
		select.options[select.options.length] = new Option('Evaluación No Considerada', 0);
	}
	if (nroeval > 0) {
		select.options[select.options.length] = new Option('Todas las Evaluaciones', -1);
		for (i = 1; i <= nroeval; i++) {
			select.options[i] = new Option(evaltypename + ' ' + i, i);
		}
	}
}


function docenteIngresoNotas() {
	//codCurso, nomCurso, semestre, nroprac, nrotrab, nroparc, nroemc, nroef, nrosusti
	var divMensaje = document.getElementById("notaOpciones");
	var datos, i;
	nomCurso = nomCurso.replace(/_/gi, " ");
	divMensaje.innerHTML = datos;
	divMensaje = document.getElementById('rptOpciones');
	divMensaje.innerHTML = "";
	divMensaje = document.getElementById("curslistAlu");
	divMensaje.innerHTML = "";
}

function GuardarNota(codCurso, subCodCurso, codSem, tipoNota, nroNota) {
	var lisCodAlumno = new Array();
	var lisNotaAlumno = new Array();
	var arraycod = document.getElementsByName('IcodAlumno');
	var arraynot = document.getElementsByName('InotaAlumno');
	var i;
	var c = 0;

	for (i = 0; i < (arraycod.length); i++) {
		if (arraynot[i].value == '' || arraynot[i].disabled) {
			// si el campo esta vacio o desabilitado
		} else {
			lisCodAlumno[c] = arraycod[i].value;
			lisNotaAlumno[c] = arraynot[i].value;
		}
		c++;
	}
	if (c > 0) {
		var codalumnoss = JSON.stringify(lisCodAlumno);
		var notaalumnoss = JSON.stringify(lisNotaAlumno);
		swal({
			title: 'Registro de Notas',
			text: "Seguro de Guardar estas Notas?",
			type: 'info',
			showCancelButton: true,
			confirmButtonText: 'Sí, Guardar!',
			closeOnConfirm: false,
			showLoaderOnConfirm: true
		},
			function () {
				var pid = 55;
				var container = $("curso-notas-form");
				RequestAjax(
					"tareas.php",
					{ varID: pid, codCurso: codCurso, subCodCurso: subCodCurso, codSem: codSem, lisCodAlumno: codalumnoss, lisNotaAlumno: notaalumnoss, tipoNota: tipoNota, nroNota: nroNota },
					container,
					function () {
						codCurso = codCurso + subCodCurso;
						swal(
							codCurso + ': Notas Guardadas!',
							'Las Notas han sido registradas exitosamente.',
							'success'
						); //veriOpcIngNotas(codCurso, codSem, 'NtipoNota', 'NnroNota', 'Naccion');
						docenteIngNotas();  // Volver a cargar el formulario
					}
				);
			});
	} else {
		swal("Sin Notas", "No has ingresado ninguna nota!", "warning");
	}
}

function showActaOfNotes(codcurso, subcodcurso, codsem, container, tiponota = 0, nronota = 0) {

	var container = document.getElementById('modalAlertMessage');
	var params = {};
	var pid = 0;

	if (tiponota === 0) {
		pid = 60;   //visualizar todas las evaluaciones
		params = { varID: pid, codcurso: codcurso, codsem: codsem, subcodcurso: subcodcurso };
	}
	else if (tiponota > 0) {
		if (nronota > 0 && nronota < 50) {
			pid = 11045;    //ver notas segun tipo y nro nota
			params = { pid: pid, codcurso: codcurso, codsem: codsem, tiponota: tiponota, nronota: nronota, subcodcurso: subcodcurso };
		}
		else if (nronota === -1) {
			pid = 57;       //visualizar todas las notas de un tipo de evaluacion
			params = { varID: pid, codcurso: codcurso, codsem: codsem, tiponota: tiponota, nronota: nronota, subcodcurso: subcodcurso };
		}
		else {
			swal("Lo siento :(", "Este tipo de Evaluación no esta considerado en su Método de Evalación!", "error");
			return false;
		}
	}

	RequestAjax("tareas.php", parametro, $(container));

	// generate modal
	var html = $('#modalAlertMessage').html();
	var def = {
		title: '',
		icon: 'fa-id-card-o',
		size: 'modal-xlg',    //modal-sm modal-xlg
		content: html,
		time: 0,
		bgHeader: 'bg-green',
		btnType: 'btn-default',
		btnText: 'Cerrar',
		btnClose: true,
		btnAction: null,
		footer: ''
	};
	showModal(def);

	return true;
}

/* JLJL.18.03.31 */
function showCourseNotes(codcurso, codsem) {
	var idContainer = 'modalAlertMessage';
	var container = document.getElementById(idContainer);
	var varID = 60;//ver todas las notas ingresadas
	var ajax = nuevoAjax();

	requestPOST("tareas.php", "varID=" + varID + "&codcurso=" + codcurso + "&codsem=" + codsem, ajax, container, 0);
	//botonPrint2('idContainer', codcurso, 60);
	//$('#modalCourseNotes').modal('show');
	var html = $('#modalAlertMessage').html();
	var def = {
		title: '',
		icon: 'fa-id-card-o',
		size: 'modal-xlg',    //modal-sm modal-xlg
		content: html,
		time: 0,
		bgHeader: 'bg-green',
		btnType: 'btn-default',
		btnText: 'Cerrar',
		btnClose: true,
		btnAction: null,
		footer: ''
	};
	showModal(def);
}

// Funcionario: Cargar Notas de un curso
function cargarNotasTodasDocenteCurso(obj, contenedor, codCurso, semestre) {
	var posY = findPosY(obj);
	var posX = findPosX(obj);
	mostrarBuscador('capaCargaAcaDocente', 'espaceCerrar');
	var capaLista = document.getElementById('capaCargaAcaDocente');
	capaLista.style.top = (posY + 25) + "px";
	capaLista.style.left = (posX - 500) + "px";
	var divMensaje = document.getElementById(contenedor);
	divMensaje.innerHTML = "";
	var varID = 60;//ver todas las notas ingresadas
	var ajax = nuevoAjax();

	var parametro = "varID=" + varID + "&codcurso=" + codCurso + "&codSem=" + semestre;

	requestPOST("tareas.php", parametro, ajax, divMensaje, 0);
	botonPrint2(contenedor, codCurso, 60);
}

function solonumeros(obj, e, limit, dec) {
	//obj = al imput desde donde se teclea
	//e = event que realizaste en el input
	// limit = numero maximo del objeto (20, 50, 99, etc); limit=-1 --> no hay limite max.
	//dec = esa entrada dejenlo en blanco.
	let key;
	let keychar;

	if (window.event) {
		key = window.event.keyCode;
	}
	else if (e) {
		key = e.which;
	} else {
		return true;
	}

	keychar = String.fromCharCode(key);

	// control keys
	if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
		return true;
	} // numbers
	else if ((("0123456789.").indexOf(keychar) > -1) && ((obj.value.toString().indexOf('.') < 0) || ((".").indexOf(keychar) < 0))) {
		if (limit <= -1)
			return true;
		else
			if ((parseFloat(obj.value + keychar) <= limit) || (parseFloat(keychar + obj.value) <= limit))
				return true;
			else
				return false;
	}
	// decimal point jump
	else
		if (dec && (keychar == ".")) {
			obj.form.elements[dec].focus();
			return false;
		} else
			return false;
}

function verificavalue(obj, limite, minlimite=0) {
	var attendanceless = false;

	// Desactivado temporalmente para pasar el lio de gozme
	if( $(obj).hasClass('note-input') ) {
        if( parseInt($(obj).data('evcod')) === 5 ) {
            if ( $(obj).hasClass('note-attendanceless') || (100 - parseInt($(obj).parents('td').siblings('td.student-assist').html()) >= 30 ) ) {
                limite = 0;
                attendanceless = true;
            }
        }
    }

	if (parseFloat(obj.value) > limite) {
		obj.value = '';
		obj.onchange();
		if (attendanceless) {
			Swal.fire(
				'Inasistencia a Clases ' + (100 - parseInt($(obj).parents('td').siblings('td.student-assist').html())) + '%',
				'La nota a ingresar no puede ser mayor a cero (0)!',
				'error'
			);
		} else {
			Swal.fire(
				'Nota Incorrecta!',
				'La nota a ingresar no puede ser mayor a: '+ limite,
				'error'
			);
		}
	}

	if (parseFloat(obj.value) < minlimite) {
		obj.value = '';
		obj.onchange();
		Swal.fire(
			'Nota Incorrecta!',
			'La nota a ingresar no puede ser menor a: '+ minlimite,
			'error'
		);
	}
}


//JLRev.20151226 Esta funcion debe reemplazar a ocultar_td y mostrar_td.
function nota_toggleTipoNota(classType) {
	$("." + classType).toggle();
}

//Mostrar y Ocultad TD
function ocultar_td(tipo, canttipo, cant) {
	//var Caja=document.getElementsById(idtd);
	var botton01 = document.getElementById(tipo + 'opcion01');
	var botton02 = document.getElementById(tipo + 'opcion02');
	//Caja[0].style.display = 'none';
	//Caja[1].style.display = 'none';

	for (j = 1; j <= (canttipo); j++) {
		document.getElementById(tipo + '-' + j).style.display = 'none';
	}

	for (j = 1; j <= (canttipo); j++) {
		for (i = 1; i <= (cant); i++) {
			document.getElementById(tipo + '-' + j + '-' + i).style.display = 'none';
		}
	}
	botton01.style.display = 'none';
	botton02.style.display = 'block';
}

function mostrar_td(tipo, canttipo, cant) {
	//var Caja=document.getElementsById(idtd);
	var botton01 = document.getElementById(tipo + 'opcion01');
	var botton02 = document.getElementById(tipo + 'opcion02');

	for (j = 1; j <= (canttipo); j++) {
		document.getElementById(tipo + '-' + j).style.display = 'table-cell';
	}

	for (j = 1; j <= (canttipo); j++) {
		for (i = 1; i <= (cant); i++) {
			document.getElementById(tipo + '-' + j + '-' + i).style.display = 'table-cell';
		}
	}
	botton01.style.display = 'block';
	botton02.style.display = 'none';
}

//MOSTRAR Y OCULTAD UNA CAPA
function ocultar_div(nomDiv) {
	var Caja = document.getElementById(nomDiv);
	var botton01 = document.getElementById('botton01');
	var botton02 = document.getElementById('botton02');
	Caja.style.display = 'none';
	botton01.style.display = 'block';
	botton02.style.display = 'none';
}
function mostrar_div(nomDiv) {
	var Caja = document.getElementById(nomDiv);
	var botton01 = document.getElementById('botton01');
	var botton02 = document.getElementById('botton02');
	Caja.style.display = 'block';
	botton01.style.display = 'none';
	botton02.style.display = 'block';
}

/* ************************************************************************* */

function DEPRECATED__cargarlogoFacu(codEspe) {
	var divMensaje = document.getElementById("contentLogo");
	document.getElementById("contentLogo").innerHTML = "";
	var varID = 33;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&codEspe=" + codEspe, ajax, divMensaje, 0);
}

function guardarDatosAlumno() {
	var direccion = document.getElementById('txtdireccion').value;
	var dni = document.getElementById('txtdni').value;
	var telcel = document.getElementById('txttelcel').value;
	var telfijo = document.getElementById('txttelfijo').value;
	var telextra = document.getElementById('txttelextra').value;
	var email = document.getElementById('txtemail').value;
	var fecnac = document.getElementById('txtfecnac').value;

	var fecnac2 = moment(fecnac, 'YYYY-MM-DD');
	fecnac2.locale('es');

	moment.fn.fromNow = function (a) {
		var duration = moment().diff(this, 'years');
		return duration;
	};

	// Sea una fecha valida y sea mayor de 15 años
	if (fecnac2.isValid() && fecnac2.fromNow() > 15) {
		var divMensaje = document.getElementById('contentalumnoDatos');
		var ajax = nuevoAjax();
		var varID = 6;

		RequestAjax('processor.php',
			{ load: 'AlumnoInformacionController@save', data: { dni: dni, direccion: direccion, telcel: telcel, telfijo: telfijo, telextra: telextra, fecnac: fecnac, email: email } },
			function (response) {
				if (response) {
					swal(
						'Informacion Personal Actualizado!',
						'Su informacion ha sido registrado exitosamente. ',
						'success'
					);
				} else {
					swal(
						'Error: Informacion Personal',
						'No ha sido posible actualizar sus datos intentelo nuevamente. ',
						'danger'
					);
				}
			}
		);
		//requestPOST("tareas.php", "varID=" + varID + "&vardireccion=" + direccion + "&vardni=" + dni + "&vartelcel=" + telcel + "&vartelfijo=" + telfijo + "&varfecnac=" + fecnac + "&varemail=" + email, ajax, divMensaje, 0);
	} else {
		showNotification(
			'Warning: Informacion Personal',
			'La Fecha de Nacimiento debe ser una fecha válida, cumplir con el siguiente formato: <strong>dd/mm/aaaa</strong>, y debe haber una diferencia de más de 15 años con la fecha actual.',
			0,
			'fa fa-warning',
			'bg-yellow'
		);
	}
}

function guardarDatosDocente() {
	var enviar = true;
	var error = "";
	vardireccion = document.getElementById('txtdireccion').value;
	vartelcel = document.getElementById('txttelcel').value;
	vartelfijo = document.getElementById('txttelfijo').value;

	// varfecnac=document.getElementById('txtfechanac').value;
	// varfecnac	 = document.getElementById("cbAnio").value+'-'+document.getElementById("cbMes").value+'-'+document.getElementById("cbDia").value;
	varfecnac = document.getElementById("cbDia").value + '/' + document.getElementById("cbMes").value + '/' + document.getElementById("cbAnio").value;
	varemail = document.getElementById('txtemail').value;

	vardni = document.getElementById('txtdni').value;
	varsex = document.getElementById('txtsex').value;

	// Docente
	varemailunas = document.getElementById('txtemailunas').value;
	vartelrpm = document.getElementById('txttelextra').value;
	varcategoria = document.getElementById('cbcategoria').value;

	//alert("Fecha: "+varfecnac+" | Validar: "+validarFormatoFecha(varfecnac) + " | Existe: "+ existeFecha(varfecnac) );
	if (!validarFormatoFecha(varfecnac) && !existeFecha(varfecnac)) {
		var error = error + "La Fecha de Nacimiento no es valido.\n";
		document.getElementById("cbDia").style.borderColor = "#EE0000";
		document.getElementById("cbMes").style.borderColor = "#EE0000";
		document.getElementById("cbAnio").style.borderColor = "#EE0000";
		enviar = false;
	}
	if (!validarEmail(varemail)) {
		var error = error + "Su correo personal no es una direccion de correo valida.\n";
		document.getElementById("txtemail").style.borderColor = "#EE0000";
		enviar = false;
	}
	if (!validarEmail(varemailunas)) {
		var error = error + "Su correo institucional no es una direccion de correo valida.\n";
		document.getElementById("txtemailunas").style.borderColor = "#EE0000";
		enviar = false;
	}
	if (error != "") {
		alert("Por favor corrija los siguientes campos: \n\n" + error);
	}
	//Si no hay errores en los datos enviar...
	if (enviar) {
		var divMensaje = document.getElementById('contentdocenteDatos');
		var ajax = nuevoAjax();
		var varID = 8;
		requestPOST("tareas.php", "varID=" + varID + "&vardireccion=" + vardireccion + "&vartelcel=" + vartelcel + "&vartelfijo=" + vartelfijo + "&varfecnac=" + varfecnac + "&varemail=" + varemail + "&vardni=" + vardni + "&varsex=" + varsex + "&varemailunas=" + varemailunas + "&vartelrpm=" + vartelrpm + "&varcategoria=" + varcategoria, ajax, divMensaje, 0);
	}
}

function validarFormatoFecha(campo) {
	var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
	if ((campo.match(RegExPattern)) && (campo != '')) {
		return true;
	} else {
		return false;
	}
}
function existeFecha(fecha) {
	var fechaf = fecha.split("/");
	var day = fechaf[0];
	var month = fechaf[1];
	var year = fechaf[2];
	var date = new Date(year, month, '0');
	if ((day - 0) > (date.getDate() - 0)) {
		return false;
	}
	return true;
}

function validarEmail(email) {
	expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!expr.test(email))
		return false;
	else
		return true;
}
function validarCampo(nomObj, valor, e, tam) {
	var objeto = document.getElementById(nomObj);
	if (objeto.value == valor || objeto.value.length < tam) {
		objeto.style.backgroundColor = "#FFA6AE";
		e = 0;
	}
	return (e);
}

function isDigit(theDigit) {
	var retorno = false;
	if (theDigit.length > 1)
		for (i = 0; i < theDigit.length; i++)
			retorno = isDigit(theDigit[i]);
	else {
		var digitArray = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
		for (j = 0; j < digitArray.length; j++)
			if (theDigit == digitArray[j])
				return true;
		return false;
	}
	return retorno;
}


/* ************************************************************************* */

function mostrarBuscador(obj1, obj2) {
	buscador = document.getElementById(obj1);
	buscador.style.display = 'block';
	dragdrag(obj1, obj2);
}

function ocultarBuscador(obj) {
	buscador = document.getElementById(obj);
	buscador.style.display = 'none';
	//var divMensaje=document.getElementById("resultConsulNombres");
	//divMensaje.innerHTML = "";
}

function findPosX(obj) {
	var posX = 0;
	if (obj.offsetParent) {
		do {
			posX += obj.offsetLeft;
		} while (obj = obj.offsetParent);
	}
	posX -= 217;
	return (posX);
}
function findPosY(obj) {
	var posY = 0;
	if (obj.offsetParent) {
		do {
			posY += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	posY -= 210;
	return (posY);
}

function findPos(obj, Codigo) {
	document.getElementById('OpcionCodigo').value = Codigo;
	var posX = findPosX(obj);
	var posY = findPosY(obj);
	var divMenu = document.getElementById('menuAlumnos');
	divMenu.style.display = 'block';
	divMenu.style.top = posY + 'px';
	divMenu.style.left = (posX - 125) + 'px';
}

function exportar(extension, reporte) {
	$(document).ready(function () {
		$("#" + extension).click(function (event) {
			$("#datos_a_enviar").val($("<div>").append($("#" + reporte).eq(0).clone()).html());
			$("#varExt").val(extension);
			$("#FormularioExportacion").submit();
			//alert("Generando Reporte");
		});
	});
}

function exportar2(extension, reporte) {
	document.getElementById('datos_a_enviar2').value = document.getElementById(reporte).innerHTML;
	document.getElementById('varExt2').value = extension;
	document.getElementById('FormularioExportacion2').submit();
}

function ListadoPrimeros(contenedor) {
	var divMensaje = document.getElementById(contenedor);
	var espe = document.getElementById('cbEspe').value;
	var varID = 1;
	var ajax = nuevoAjax();
	requestPOST("tareas.php", "varID=" + varID + "&varEspe=" + espe, ajax, divMensaje, 0);
}

function llenaHorario(cadDia, cadHora, codCurso, nomCurso) {
	var mul = cadDia.length % 3;
	var dia, hora;
	var j;
	for (j = 0; j < (mul); j++) {
		dia = cadDia.substr((j * 3), 2);
		hora = cadHora.substr(0, 1);
		alert("-" + hora + "-");
		if (dia == 'Lu') {
			document.getElementById('H_1_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Ma') {
			document.getElementById('H_2_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Mi') {
			document.getElementById('H_3_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Ju') {
			document.getElementById('H_4_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Vi') {
			document.getElementById('H_5_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Sa') {
			document.getElementById('H_6_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
		if (dia == 'Do') {
			document.getElementById('H_7_' + hora).innerHTML = codCurso + ' ' + nomCurso;
		}
	}
}

/* JLJL.18.03.31 */
function sendTeacherRequest() {
	showNotification('Enviar Solicitud de Docente', 'Solicitar Docente a un Departamento Académico<br><br>Esta opción estará disponible proximamente!', 0, 'fa fa-ok', 'bg-green');
	//showNotification('Metodo de Evaluación', 'El Metodo de Evaluacion ha sido registrado!', 0, 'fa fa-ok', 'bg-green');
}

/******************************************************************************
 * SCRIPT PARA AÑADIR O QUITAR CLASES CSS SOLO CON JAVASCRIP
 * @date 26/09/2014
 * @url http://www.tutsnt.com/addclass-y-removeclass-con-javascript-sin-jquery/
 *****************************************************************************/
//Función para verificar si existe una clase
function existeClase(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//Función para agregar una clase, si no existe la clase enviada - agrega la clase.
function addClass(obj, cls) {
	if (!existeClase(obj, cls)) {
		obj.className += " " + cls;
	}
}
//Función para Eliminar una clase
function removeClass(obj, cls) {
	if (existeClase(obj, cls)) {
		var exp = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(exp, "");
	}
}

function showFirstPlaces(elem) {
	var codesp = $(elem).data('codesp');
	var codsem = $('#inFirstPlacesSemesterId').val();
	$('.school-item').removeClass('active');
	$(elem).addClass('active');
	RequestAjax2({
		data: { load: 'FirstPlacesController@showList', data: { codesp: codesp, codsem: codsem } },
		context: $('#wrpFirstPlaces')
	});
}

function chartMorrisDonut(elem, data) {
	Morris.Donut({
		element: elem,
		data: data
	});
}

function docenteNotifications() {
    /*if(userStatus=='0')
     llamarAHAH('S_W_docente/contenido_docente_datos.php','page-content',18);
     /*
     $('#modalAlert').on('show.bs.modal', function (event) {
     $('#modalAlert').load('mensaje.php');
     });
     $('#modalAlert').modal('show');
     */
	/*showNotification("Registro de Evaluaciones",'<p>El día <strong>lunes 24</strong> del presente mes se dará inicio al proceso de Matrícula 2017-I, por lo que <strong>se le exorta al estricto cumplimiento</strong> de las fechas establecidas para el Registro de Notas del Curso de Nivelación. <strong>(Ultimo Día: 23/02/2017)</strong></p><p>Caso contrario estará afectando al normal desarrollo de este proceso, y será notificado al Vicerectorado Académico.</p><p class="text-center"><img src="images/temp_aviso_registro_notas.jpg" width="498" height="269" ></p>', 1000,"fa fa-warning fa-fw fa-2x", "bg-gold");    */

	// requiere toastr.js
    /*
     $(document).ready(function() {
     setTimeout(function() {
     toastr.options = {
     closeButton: true,
     debug: false,
     newestOnTop: false,
     progressBar: false,
     positionClass: "toast-top-center",
     preventDuplicates: false,
     onclick: null,
     showDuration: "300",
     hideDuration: "1000",
     timeOut: 0,
     extendedTimeOut: 0,
     showEasing: "swing",
     hideEasing: "linear",
     showMethod: "fadeIn",
     hideMethod: "fadeOut",
     tapToDismiss: false
     };
     toastr.error('<p>Último día de Registro de Evaluaciones hasta el Medio Curso:<br><br><strong>Viernes 07 de julio (Ampliado).</strong><br><br>De no cumplir será considerando extempráneo, y notificado por incumplimiento del Calendario Académico.</p>', 'Semestre 2017-1');
     }, 5000);
     });
     */
	swal({
		title: '<h2>Registro de Evaluaciones MC</h2>',
		text: '<p>El registro de Evaluaciones hasta el Medio Curso, ' +
			'estará habilitado hasta el día<br><strong>domingo 12 de noviembre</strong><br>' +
			'<small>(Último día de ampliación para todos los Docentes)</small></p>' +
			'<p style="font-size: 16px">Nota: ' +
			'<ol style="font-size: 16px; text-align: justify;"><li>Recuerde que para poder registrar sus notas primero debe haber cumplido ' +
			'con la entrega del Sílabo respectivo, posteriormente haber registrado el Método de Evaluación del Curso' +
			'<li>La entrega del Acta Digital se realiza al finalizar el semestre, ' +
			'y no al culminar de ingresar sus notas de medio curso.</li></ol></p>',
		type: 'info',
		html: true,
		showCloseButton: true
	});
}


function alumnoNotifications() {
	//showNotification(title, message, time, classIcon, classBgHeader, btnClass, btnText, htmlFooter, modalSize)
	showNotification(
		'Encuesta de Estudiantes Universitarios - MINEDU',
		'<p class="text-center text-18"><img src="images/Encuesta_Minedu.jpg" width="380"></p>' +
		'<p class="text-center text-18">Antes de proceder con su matrícula es necesario cumplir con el llenado de la Encuesta de Estudiantes y Egresados de universidades públicas y privadas exigida por el MINEDU. Es una ecuesta rápida cuyo cumplimiento es requisito para el proceso de matrícula 2017-2</p>' +
		'<p class="text-center text-18"><a href="http://form.jotformz.com/71296561349666" class="btn btn-warning btn-md">Ir a la  Encuesta</a></p>',
		700,
		'fa fa-fw fa-newspaper-o',
		'bg-blue',
		'',
		'', '', 'modal-md'
	);
}

//Control Aulas
function CAShowHorarioxDia() {
	var dia = $('#cahd-dia').val();
	var hora = $('#cahd-hora').val();
	var pabellon = $('#cahd-pabellon').val();
	var container = $('#cahd-report');
	var codsem = document.getElementById(paramSem).value;
	var data = { pid: 19311, codsem: codsem, numdia: dia, hora: hora, pabellon: pabellon };
	RequestAjax('tareas.php', data, container, function () {
		$("#cahd-tablereport").bootgrid({
			formatters: {
				commands: function (column, row) {
					/* "this" is mapped to the grid instance */
					console.log(column);
					console.log(row);
					return '<span class="label label-success">' + row[column.id] + '</span>';
				}
			}
		});
	});
}



// Para cerrar el modal: When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('overlay');
window.onclick = function (event) {
	if (event.target == modal) {
		overlayOff();
	}
}



/*
function guiarMatricula() {
    var tourMatricula = new Tour({
        steps: [{
			element: "#tourMatricula1",
			title: "Acceder a tu Matrícula",
			content: "Haz click aqui para accceder a las opciones de matrícula"
        },{
			element: "#tourMatricula2",
			title: "Matricula",
			content: "Continua haciedno click aqui para accceder a matricularte"
        }]
    });
    // Initialize the tour
    tourMatricula.init();
    // Start the tour
    tourMatricula.start();
*/



function onInput(obj) {
	console.log('onInput: ' + $(obj).val());
}


// mdc.autoInit();

/* Desarrollo
 ****************************************************************************
$("body").on("click", ".btn-controller", function (e) {
    var href = $(this).attr("href");
    var wrap = $(this).data("wrapper");
    var param = $(this).data("param");
    console.log(href);
    console.log(wrap);

    if( href.indexOf('http') < 0 ) {
        e.preventDefault();
        //e.stopPropagation();

        var pos = href.indexOf('@');
        var control = href.substr(1,pos-1);
        var action = href.substr(pos+1);

        console.debug(control);
        console.log(action);
        console.log('ActionEvent4.1: ' + href);

        if( typeof( wrap ) == "undefined" ) {
            wrap = '#page-content';
        }

        RequestAjax2({
            data: { load: control + 'Controller@' + action, param },
            context: $(wrap),
        });
    }
});
*/


// Para detectar abandono de pagina
window.onbeforeunload = function (e) {
	console.log('JLJL Exit: ' + window.location.host);
	//    debugger;
};





$(document).ready(function(){


	$('body').on('click', '.print-report', function (event) {
		event.preventDefault();
		Report.print(this);
	});

});



// Notification Encuestas PMESUT

$(document).ready(function(){

	if ( user.type === 0 ) {
		/*
		var showSPollIESALC = () => {
			Swal.fire({
				//title: 'Sweet!',
				html: '<span class="text-13">Click en el siguiente enlace para llenar la encusta:</span><br>'+
					'<a href="https://forms.gle/Yk1gLpy5CF4K31348" target="_blank" title="Encuesta a Estudiantes (UNAS)">https://forms.gle/Yk1gLpy5CF4K31348</a>'+
					'<br><em class="text-12">Si ya llenó la encuesta omita este mensaje!</em>',
				imageUrl: 'https://academico.unas.edu.pe/public/img/general/IESALCEncuestaAlumnos.png',
				imageWidth: 528,
				imageHeight: 562,
				imageAlt: 'Encuesta a Estudiantes (UNAS)',
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger'
				}
			});
		}
		showSPollIESALC();
		setInterval(showSPollIESALC, 240000);
		*/
	}


	if ( user.type === 1 ) {

		/*Swal.fire({
			title: 'Comunicado!',
			icon: 'warning',
			html: '<ul class="text-left text-14">' +
				'<li>El plazo para registrar el Método de Evaluación del curso vence el domingo <strong>04/10/2020</strong>. Pasada esta fecha deberá solicitar su habilitación a la DICDA y será considerado como una <strong class="text-danger">falta</strong>.</li>'  +
				'<li>En el caso de que ya haya registrado el Método de Evaluación del Curso y desea modificarlo, podrá realizarlo hasta el día domingo <strong>04/10/2020</strong> siempre y cuando la evaluación aún no haya sido registrada. </li>' +
				'<li>Por autorización del Vicerrectorado Académico el plazo para el Registro de las Evaluaciones realizadas hasta el Medio Curso ha sido ampliado como fecha máxima hasta el día <strike>miercoles 07/10/2020</strike> <strong class="text-danger">domingo 11/10/2020</strong>, pasada esta fecha será considerado <strong class="text-danger">falta</strong> y se emitirá el informe al Vicerrectorado Académico.</li>' +
				'<li>Le recordamos que el Registro de Sesiones de Clases y Asistencia es obligatorio para todos los cursos y no podrá completar el llenado de su Acta si no cuenta con el mínimo de sesiones registradas.</li>' +
				'</ul>',
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			}
		});*/

	}


});



$(function() {

	$('body').on('click', '#btnUserChangePassword', function (event) {
		event.preventDefault();
		User.changePassword();
	});

	// window.addEventListener("beforeunload", function (e) {
	// var confirmationMessage = "\o/";

	// (e || window.event).returnValue = confirmationMessage; //Gecko + IE
	// return confirmationMessage;                            //Webkit, Safari, Chrome
	// });

	// var timer = new Timer();
	// timer.callback = () => {
	// 	Swal.fire({
	// 		title: 'Are you sure?',
	// 		text: "You won't be able to revert this!",
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Yes, delete it!'
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			Swal.fire(
	// 				'Deleted!',
	// 				'Your file has been deleted.',
	// 				'success'
	// 			)
	// 		}
	// 	})
	// }


});


/**
 * @class EvaluationMethod
 */
class EvaluationMethod {

	static show = function(codcurso, codsem) {
		RequestAjax2({
            data: { load:'ProfessorEvaluationMethodController@index', codsem: codsem, codcurso:codcurso },
            context: $(wrappers.main)
        });
	}

    static load = function () {
        let codcurso    = $('#btnEditEvaluationMethod').data('codcurso');
        let subcodcurso = $('#btnEditEvaluationMethod').data('subcodcurso');
        let codsem      = $('#btnEditEvaluationMethod').data('codsem');
        UserActivityLog('Course/EvaluationMethod/BtnEditClick/', codcurso + subcodcurso);
        RequestAjax2({
            data: { load: 'ProfessorEvaluationMethodController@edit', data:{ codsem: codsem, codcurso: codcurso, subcodcurso: subcodcurso }}
        });
    }

    static save = function() {
        var codsem      = $('#btnSaveEvaluationMethod').data('codsem');
        var codcurso    = $('#btnSaveEvaluationMethod').data('codcurso');
        var subcodcurso = $('#btnSaveEvaluationMethod').data('subcodcurso');
        var evaluations = [];
        var msg = '';
		var sumpeso = 0;
		var fullcodcurso = codcurso + subcodcurso;

        $('.meteval-numeval').each(
            function(index, value) {
                var ideval = $(this).data('codeval');
                var nomeval = $(this).data('nomeval');
                var evaluation = {
                    codeval   : ideval,
                    numeval   : $(this).val(),
                    pesoeval  : $('#T'+ ideval + 'P').val(),
                    avanceeval: $('#T'+ ideval + 'A').length  ?  $('#T'+ ideval + 'A').val() : 0,
                    coddocente: $('#T'+ ideval + 'D').val()
                };
                if( (evaluation.numeval > 0 && evaluation.pesoeval == 0) || (evaluation.numeval == 0 && evaluation.pesoeval > 0) ) {
                    msg += "<br>No ha definido la cantidad o el peso para el Tipo de Evaluación: " + nomeval;
                }
                sumpeso += evaluation.pesoeval;
                evaluations.push(evaluation);
            }
        );

		if( sumpeso < 100 ) {
            msg += "<br><br>";
        }

        if ( msg == '' ) {
            UserActivityLog('Course/EvaluationMethod/Save/', fullcodcurso);
            RequestAjax2({
                data: {
                    load: 'ProfessorEvaluationMethodController@save2',
                    data: { codsem: codsem, codcurso: codcurso, subcodcurso: subcodcurso, meteval: evaluations }
                },
                callback: function (response, data) {
					console.log('response');
					let params = data.data;
					console.log(codcurso);
                    if (parseInt(response) > 0) {
						hideModalContent();
						let codcurso = params.codcurso + params.subcodcurso;
                        EvaluationMethod.swal_success(codcurso, codsem);
                    } else {
                        EvaluationMethod.swal_error();
                    }
                }
            });
        } else {
			UserActivityLog('Course/EvaluationMethod/Error/NoSave/'+msg, fullcodcurso);
            EvaluationMethod.swal_warning(msg);
        }
    };

    static swal_success = function(codcurso, codsem) {
        Swal.fire({
            title: 'Método de Evaluación',
            text: 'Método de Evaluación Guardado!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then( (result) => EvaluationMethod.show(codcurso, codsem) );
    }

    static swal_error = function() {
        Swal.fire({
            icon: "error",
            title: "Lo siento no he podido registrar su Método de Evaluación ",
            text: 'Método de Evaluación'
		});
    }

    static swal_warning = function(message) {
        Swal.fire({
            icon: "warning",
            //text: 'El peso total de todas las evaluaciones debe ser 100%' + message,
			html: 'Se produjo un error!<br>' + message,
            title: 'Método de Evaluación'
		});
	}

	static validate_numevals = function(element) {
		let max = parseInt( $(element).attr('max') );
        let min = parseInt( $(element).attr('min') );
        let num = parseInt( $(element).val() );
        let msg = '';
        if( Number.isInteger(num) ) {

            if ( num >= min && num <= max ) {
                //Sumar todos los input numeval
				console.log('sumar todos los input numeval', num, min, max);
                var tot = 0;
                $("input.meteval-numeval").each(
                    function(index, value) {
                        if ( Number.isInteger( $(this).val() ) ) {
                            tot += eval($(this).val());
                        }
                    }
                );
                // Mostrar el total de eval
                $('#emTotalEvals').html(tot);
            }
            else {
                if(num < min) {
                    msg = 'Esta evaluación requiere un numero mínimo de ' + min + ' evaluacione(s)'
                }
                if(num > max) {
                    msg = 'Esta evaluación requiere un numero máximo de ' + max + ' evaluacione(s)'
                }
            }
        }
        else {
            msg = 'Sólo se permiten valores numericos dentro del rango de ' + min + ' a ' + max;
        }
        if (msg!='') {
            Swal.fire("Número de Evaluaciones", msg, "warning");
        }
	}


	static chartDoughnut = function(labels, percentages, colors) {
		let settings = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: percentages,
					backgroundColor: colors,
					label: 'Porcentajes (%)'
				}],
				labels: labels
			},
			options: {
				responsive: true,
				legend: {
					display: true,
					position: 'right',
					reverse: false,
					labels: {
						boxWidth: 20,
						fontSize: 11
					},
					ticks: {

					}
				},
				title: {
					display: true,
					text: 'Pesos (%) por Evaluación'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};
		return settings;
	}

	static chartBar = function (labels, quantities, colors) {
		let settings = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					data: quantities,
					label: 'Nro. de Evaluaciones',
					backgroundColor: colors
				}]
			},
			options: {
				// Elements options apply to all of the options unless overridden in a dataset
				// In this case, we are setting the border of each horizontal bar to be 2px wide
				elements: {
					rectangle: {
						borderWidth: 2,
					}
				},
				responsive: true,
				legend: {
					position: 'bottom',
					align: 'center',
				},
				title: {
					display: true,
					text: 'Cantidad de Evaluaciones por Tipo'
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines: {
							offsetGridLines : true
						},
						ticks: {
							min: 0,
							beginAtZero: true,
							stepSize: 1
						}
					}],
					yAxes: [{
						display: true,
						gridLines: {
							offsetGridLines : true
						},
						ticks: {
							min: 0,
							beginAtZero: true,
							stepSize: 1
						}
					}]
				}
			}
		};
		return settings;
	}

}


// DOCENTES: FUNCIONES DEL METODO DE EVALUACION
//=========================================================================

function controlPorcentaje(obj) {
    var PorPR = pasarEntero($("#PorPR").val());
    var PorTE = pasarEntero($("#PorTE").val());
    var PorEP = pasarEntero($("#PorEP").val());
    var PorMC = pasarEntero($("#PorMC").val());
    var PorEF = pasarEntero($("#PorEF").val());
    var suma = PorPR + PorTE + PorEP + PorMC + PorEF;
    if (suma > 100) {
        suma = suma - parseInt(obj.value);
        obj.value = 0;
        alert("Excedes el 100%");
    }
    $("#ResultPorc").text(suma);
}

function controlAvance() {
    var avancePR = pasarEntero($("#avancePR").val());
    var avanceTE = pasarEntero($("#avanceTE").val());
    var avanceEP = pasarEntero($("#avanceEP").val());
    var NroPR = pasarEntero($("#NroPR").val());
    var NroTE = pasarEntero($("#NroTE").val());
    var NroEP = pasarEntero($("#NroEP").val());
    var NroMC = pasarEntero($("#NroMC").val());
    var NroEF = pasarEntero($("#NroEF").val());

    //Controlar Nro Evaluaciones
    var suma = (NroPR + NroTE + NroEP + NroMC + NroEF);
    $("#TotalEvals").text(suma);

    if ((avancePR > NroPR) || (avancePR < 0)) {
        $("#avancePR").val(0);
        alert("El avance no debe exceder a lo programado y debe ser mayor igual a cero");
    }
    if ((avanceTE > NroTE) || (avanceTE < 0)) {
        $("#avanceTE").val(0);
        alert("El avance no debe exceder a lo programado y debe ser mayor igual a cero");
    }
    if ((avanceEP > NroEP) || (avanceEP < 0)) {
        $("#avanceEP").val(0);
        alert("El avance no debe exceder a lo programado y debe ser mayor igual a cero");
    }
}

function validarCampEvaluar() {
    var Eval = {
        NroPR: pasarEntero($("#NroPR").val()),
        NroTE: pasarEntero($("#NroTE").val()),
        NroEP: pasarEntero($("#NroEP").val()),
        NroMC: pasarEntero($("#NroMC").val()),
        NroEF: pasarEntero($("#NroEF").val()),
        NroSU: pasarEntero($("#NroSusti").val()),

        PorPR: pasarEntero($("#PorPR").val()),
        PorTE: pasarEntero($("#PorTE").val()),
        PorEP: pasarEntero($("#PorEP").val()),
        PorMC: pasarEntero($("#PorMC").val()),
        PorEF: pasarEntero($("#PorEF").val()),

        NroPRMC: pasarEntero($("#avancePR").val()),
        NroTEMC: pasarEntero($("#avanceTE").val()),
        NroEPMC: pasarEntero($("#avanceEP").val()),

        TotalPor: pasarEntero($("#ResultPorc").text())
    };

    var mensaje = "";
    var meteval = {
        success: true,
        message: "",
        siseval: Eval
    }

    if ((Eval.NroPR == 0 && Eval.PorPR > 0) || (Eval.NroPR > 0 && Eval.PorPR == 0))
        mensaje += "<li>Ex. Pr&aacute;cticos : INCONGRUENCIAS</li>";
    if ((Eval.NroTE == 0 && Eval.PorTE > 0) || (Eval.NroTE > 0 && Eval.PorTE == 0))
        mensaje += "<li>Trab. Encargados : INCONGRUENCIAS</li>";
    if ((Eval.NroEP == 0 && Eval.PorEP > 0) || (Eval.NroEP > 0 && Eval.PorEP == 0))
        mensaje += "<li>Ex. Parciales : INCONGRUENCIAS</li>";

    if ((Eval.NroMC == 0 && Eval.PorMC > 0) || (Eval.NroMC > 0 && Eval.PorMC == 0))
        mensaje += "<li>Ex. MEdio Curso : INCONGRUENCIAS</li>";
    if ((Eval.NroEF == 0 && Eval.PorEF > 0) || (Eval.NroEF > 0 && Eval.PorEF == 0))
        mensaje += "<li>Ex. MEdio Curso : INCONGRUENCIAS</li>";

    if (Eval.NroPRMC > Eval.NroPR)
        mensaje += "<li>Defina correctamente el Nro. de Prácticas a tomar antes del Ex.Medio Curso</li>";
    if (Eval.NroTEMC > Eval.NroTE)
        mensaje += "<li>Defina correctamente el Nro. de Trabajos Encargados a evaluar antes del Ex.Medio Curso</li>";
    if (Eval.NroEPMC > Eval.NroEP)
        mensaje += "<li>Defina correctamente el Nro. de Exámenes Parciales a evaluar antes del Ex.Medio Curso</li>";
    /*
    if (Eval.NroSU <= 0 || Eval.NroSU > 1) {
        mensaje += "<li>Según el Reglamento de Estudios se debe considerar la aplicación de 01 Exámen Sustitutorio</li>";
    }
    */
    if (Eval.TotalPor != 100) {
        mensaje += "<li>El porcentaje total debe ser 100%</li>";
    }

    if (mensaje != "") {
        mensaje = '<ul>' + mensaje + '</ul>';
        mensaje += "Por favor verifique las observaciones presentadas.!";
        meteval = {
            success: false,
            message: mensaje,
            siseval: Eval
        };
    }
    return meteval;
}

function controlPercentage(selector) {
    var total = 0;
    $(selector).each(
        function(index, value) {
            if ( $.isNumeric( $(this).val() ) ){
                total += parseInt($(this).val());
                console.log( $(this).val() + '%' );
            }
        }
    );
    return total;
}


// Users
//=========================================================================

const User = {

	indexSchedule: () => {
		RequestAjax2({
			data: { load: 'ProfessorScheduleController@index' },
			context: $(wrappers.main)
        });
	},

	editAccount: () => {
		RequestAjax2({
			context: $(wrappers.main),
            data: { load: 'UserController@editAccount' }
        });
	},


	changePassword: () => {

		let passc = document.getElementById('current_pass');
		let passn = document.getElementById('new_pass');
		let passr = document.getElementById('renew_pass');

		let expreg = /^(?=.*[a-z]){1,}(?=.*[A-Z]){1,}(?=.*[0-9]){1,}(?=.*[!@#$%^&*()--__+.]){0,}(^\S).{8,16}$/;

		if ( passn.value == passr.value ) {

			if ( expreg.test(passn.value) ) {
				RequestAjax2({
					data: { load: 'UserController@changePassword', data: { passnow: passc.value, passnew: passn.value, passrnew: passr.value } },
					context: 'modal'
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Política de Contraseña',
					text: 'La contraseña indicada no cumple las politicas de seguridad de contraseñas!'
				});
			}

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error de Contraseña',
				text: 'Las contraseña nueva no coninciden!'
			});
		}
	}




	//



}


// STUDENTS
//==============================================================================

$(document).ready(function(){

    // Curso
    $("body #page-content").on("click", ".btn-alu-course", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");
        RequestAjax2({
            data: { load: 'StudentEnrolledCoursesController@show',  data: {codsem:codsem, codcurso:codcurso} },
            context: $(wrappers.main)
        });
    });

    // Asistencia
    $("body #page-content").on("click", ".btn-alu-assistcontrol", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");
        RequestAjax2({
            data: {load: 'StudentEnrolledCoursesController@showAssistControl', codcurso:codcurso, codsem:codsem}
        });
    });

    // Calificaciones
    $("body #page-content").on("click", ".btn-alu-califications", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");
        RequestAjax2({
			data: {load: 'StudentEnrolledCoursesController@showCalifications', codcurso:codcurso, codsem:codsem},
			context: $(wrappers.main)
        });
    });

    // Sesines de Clases
    $("body #page-content").on("click", ".btn-alu-classsessions", function (e) {
        e.preventDefault();
        let codcurso = $(this).data("codcurso");
        RequestAjax2({
			data: { load: 'StudentCourseSessionsController@index', codcurso:codcurso },
			context: $(wrappers.main)
        });
    });

    // Descargar Silabo
    $("body #page-content").on("click", ".btn-download-syllable", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");
        document.location.href = "descargar_archivo2.php?codsem=" + codsem + "&codcurso=" + codcurso;
    });


    // Cargar Encuestas
    $(wrappers.main).on("click", "a.poll", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        var href = $this.attr("href");
        var wrap = $this.data("wrapper");
        var iden = $this.data("id");
        console.log('----------------------->>>>>> ' + href.substr(1));
        /*
        RequestAjax2({
            data: { load: href.substr(1), data: { idencuesta:iden } },
            context: null,
            onbefore: function () {
                $('#listEncuestas').slideUp("slow");
                $('#encuesta').slideDown("slow");
                //abrirLoading();
            },
            callback: function (resultado, data) {
                //$("#formEncuestaContent").html("");
                var rs = $.parseJSON(resultado);
                if(rs.type === "AUTO") {
                    dataEncuesta = $.parseJSON(rs.poll);
                    generarEncuesta(dataEncuesta, 'formEncuestaContent');
                } else {
                    $(wrap).html(rs.poll);
                }
            }
        });
        */

        RequestAjax2({
            data: { load: href.substr(1), data: { idencuesta:iden } },
            context: $(wrappers.main) ,
            callback: function (resultado, data) {
                var rs = $.parseJSON(resultado);
                if(rs.type === "AUTO") {
                    dataEncuesta = $.parseJSON(rs.poll);
                    $('#encuesta').show();
                    generarEncuesta(dataEncuesta, 'formEncuestaContent');
                }
                /*else {
                    $(wrap).html(rs.poll);
                }*/
            }
        });
    });

});


// DOCENTES
//=========================================================================

const Professor = {


	indexSchedule: () => {
		RequestAjax2({
			data: { load: 'ProfessorScheduleController@index' },
			context: $(wrappers.main)
        });
	},

	showSchedule: (professorId, semesterId='', context=null) => {
		RequestAjax2({
			context: context,
            data: { load: 'ProfessorScheduleController@show', data: { professorId:professorId, semesterId:semesterId, context: context } }
        });
	},

	showSyllabus: () => {
		RequestAjax2({
			data: { load: 'ProfessorSyllabusController@index', codsem: semester.active },
			context: $(wrappers.main)
		});
	},

	showCourses: () => {
		RequestAjax2({
			data: { load: 'ProfessorCoursesController@index', codsem: semester.active },
			context: $(wrappers.main)
		});
	},

	showCoursesSubsanationExam: () => {
		let semesterId = semester.active + 'X';
		RequestAjax2({
			data: { load: 'ProfessorSubsanationExamController@index' },
			context: $(wrappers.main)
		});
	},

	showCoursesPostponementExam: () => {
		let semesterId = semester.active + 'S';
		RequestAjax2({
			data: { load: 'ProfessorPostponementExamController@index' },
			context: $(wrappers.main)
		});
	},


	// Cursos

	showCourseStudentsEnrolled: (courseId, semesterId=semester.active) => {
		console.log('showCourseStudentsEnrolled', courseId, semesterId);
		courseId = courseId.replace('x','*');
		RequestAjax2({
            data: { load: 'ProfessorCourseStudentsController@show', codcurso:courseId, codsem: semesterId },
            context: $(wrappers.main)
        });
	},

	showCourseEvaluationMethod: (courseId, semesterId=semester.active) => {
		courseId = courseId.replace('x','*');
		EvaluationMethod.show(courseId, semesterId);
	},

	showCourseManageSessions: (courseId, semesterId=semester.active) => {
		courseId = courseId.replace('x','*');
		RequestAjax2({
			data: { load: 'ProfessorClassRegistrationController@index', codcurso:courseId },
			context: $(wrappers.main)
		});
	},

	showCourseScheduledSessions: (courseId, semesterId=semester.active) => {
		courseId = courseId.replace('x','*');
		RequestAjax2({
			data: { load: 'ProfessorScheduledSessionsController@show', data: { courseId: courseId } },
			context: $(wrappers.main)
		});
	},

	showCourseRegisterEvaluations: (courseId, semesterId=semester.active) => {
		courseId = courseId.replace('x','*');
		RequestAjax2({
			data: { load: 'ProfessorNotesController@showOptions', data: { courseId:courseId, semesterId:semesterId} },
			context: $(wrappers.main)
		});
	},

	showCourseVerifyDigitalAct: (courseId, semesterId=semester.active) => {
		courseId = courseId.replace('x','*');
		RequestAjax2({
			data: { load: 'ActaDigitalController@show', data: { codsem:semesterId, codcurso:courseId} },
			context: $(wrappers.main)
		});
	},


	// Cursos de Examen de Aplazados:
	// ------------------------------------------------------------------------

	showPostponementExamStudentsEnrolled: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'S';
		Professor.showCourseStudentsEnrolled(courseId, semesterId);
	},

	showPostponementExamEvaluationMethod: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'S';
		Professor.showCourseEvaluationMethod(courseId, semesterId);
	},

	showPostponementExamRegisterEvaluations: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'S';
		Professor.showCourseRegisterEvaluations(courseId, semesterId);
	},

	showPostponementExamVerifyDigitalAct: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'S';
		Professor.showCourseVerifyDigitalAct(courseId, semesterId);
	},


	// Cursos de Examen de Subsanacion:
	// ------------------------------------------------------------------------

	showSubsanationExamStudentsEnrolled: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'X';
		Professor.showCourseStudentsEnrolled(courseId, semesterId);
	},

	showSubsanationExamEvaluationMethod: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'X';
		Professor.showCourseEvaluationMethod(courseId, semesterId);
	},

	showSubsanationExamRegisterEvaluations: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'X';
		Professor.showCourseRegisterEvaluations(courseId, semesterId);
	},

	showSubsanationExamVerifyDigitalAct: (courseId, semesterId=semester.active) => {
		semesterId = semesterId.slice(0,6) + 'X';
		Professor.showCourseVerifyDigitalAct(courseId, semesterId);
	}

}



$(document).ready(function() {

    // Mostrar alumnos matriculados
    // $("body #page-content").on("click", ".btn-doc-cursoalumnos", function (e) {
    //     e.preventDefault();
    //     var codcurso = $(this).data("codcurso");
    //     var codsem = $(this).data("codsem");
    //     RequestAjax2({
    //         data: { load: 'ProfessorCourseStudentsController@show', codcurso:codcurso, codsem:codsem },
    //         context: $(wrappers.main)
    //     });
    // });

	// Convert to director
    // $("body #page-content").on("click", ".btn-doc-notas", function (e) {
    //     e.preventDefault();
    //     var codsem = $(this).data("codsem");
    //     var codcurso = $(this).data("codcurso");
    //     var subcodcurso = $(this).data("subcodcurso");
    //     $("#doc-course-notes").html('');                //Limpiar el contenedor de notas
    //     RequestAjax2({
    //         data: { load: 'ProfessorNotesController@showOptions', codcurso:codcurso, codsem:codsem, subcodcurso },
    //         context: $(wrappers.main)
    //     });
    // });

    // Notas
    $("body").on("click", "input.note-input", function (e) {
        console.log('Clict Input Note: ' + $(this).attr('id') + ' - ' + $(this).data('evcod') );
    });

    // Entregar Acta -- director route
    // $("body #page-content").on("click", ".btn-doc-acta", function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     var codcurso = $(this).data("codcurso");
    //     var codsem = $(this).data("codsem");
    //     RequestAjax2({
    //         data: { load: 'ActaDigitalController@head', codsem:codsem, codcurso:codcurso },
    //         context: $(wrappers.main),
    //         callback: function() {
    //             RequestAjax2({
    //                 data: { load: 'ActaDigitalController@show', data:{codsem:codsem, codcurso:codcurso} },
    //                 context: $('#doc-curso-acta')
    //             });
    //         }
    //     });
    // });


	// Sumilla
    $(document).on('click', '#submitFrmPrSumilla', function (e) {
        e.preventDefault();
        var academicarea = $('#academicarea').val();
        var typeofcontent = $('#typeofcontent').val();
        var typeofstudy =  $('#typeofstudy').val();
        var basictext =  $('#basictext').val();
        var sumilla =  $('#sumilla').val();
        var researchtouse =  $('#researchtouse').val();
        var courseid = $('#courseid').val();
		let register = true;

        if( academicarea == '' || typeofcontent == '' || typeofstudy == '' || basictext == '' || sumilla == '' || researchtouse == '' ) {
            Swal.fire(
                'Error: Campos Faltantes!',
                'Debe rellenar todos los campos para proceder a registrarlos!',
                'warning'
			);
			return false;
		}


		if ( academicarea.length > 64 ) {
			Swal.fire(
                'Error en el campo Area Academica!',
                'La longitud del texto no debe exceder los 64 caracteres!',
                'warning'
			);
			return false;
		}
		if ( typeofcontent.length > 48 ) {
			Swal.fire(
                'Error en el campo Tipo de Contenido!',
                'La longitud del texto no debe exceder los 48 caracteres!',
                'warning'
			);
			return false;
		}
		if ( basictext.length > 128 ) {
			Swal.fire(
                'Error en el campo Texto Básico!',
                'La longitud del texto no debe exceder los 128 caracteres!',
                'warning'
			);
			return false;
		}
		if ( researchtouse.length > 128 ) {
			Swal.fire(
                'Error en el campo Innvestigación de la carrera a utilizar!',
                'La longitud del texto no debe exceder los 128 caracteres!',
                'warning'
			);
			return false;
		}


		if ( register )
		{
            RequestAjax2({
                data: { load: 'ProfessorSyllabusController@saveSumilla',
                    courseid: courseid, academicarea: academicarea, typeofcontent: typeofcontent, typeofstudy: typeofstudy, basictext: basictext, sumilla: sumilla, researchtouse: researchtouse
                },
                success: function(response) {
                    if(response) {
                        Swal.fire({
                            title: 'Información del Sílabo Registrado!',
                            text: 'Su información ha sido registrado exitosamente. ',
                            icon: 'success'
						});
						professorUpdateSyllabus();
                        hideModalContent();
                    } else {
                        Swal.fire({
                            title: 'Error: Información del Sílabo ',
                            text: 'No ha sido posible actualizar sus datos intentelo nuevamente. ',
                            icon: 'danger'
						});
                    }
                }
            });
        }
    });


    $('body').on('focus', '#curso-notas-form input', function(e){ $(this).parent().parent().css("background","#FFFFCC"); });
    $('body').on('blur' , '#curso-notas-form input', function(e){ $(this).parent().parent().css("background","#FFFFFF"); });

	// Metodo de Evaluacion

	// --> convert to route
	// $("body").on("click", ".btn-doc-meteval", function (e) {
    //     e.preventDefault();
    //     let codcurso = $(this).data("codcurso");
	// 	let codsem = $(this).data("codsem");
	// 	EvaluationMethod.show(codcurso, codsem);
	// });

    $("body").on("click", "#btnEditEvaluationMethod", function (e) {
		EvaluationMethod.load();
	});

	$("body").on("click", "#btnSaveEvaluationMethod", function (e) {
		EvaluationMethod.save();
    });

    $("body").on("change", "input.meteval-numeval", function (e) {
        EvaluationMethod.validate_numevals(this);
    });

    // Validar Peso de Evaluaciones
    $("body").on("change", "input.meteval-peseval", function (e) {
        var pes = parseInt( $(this).val() );
        var num = $('#T'+ $(this).data('codeval') + 'N' ).val();
        var msg = '';
        var tot = 0;

        if ( num > 0 ) {
            if ( pes>=0 && pes<=100  ) {
                tot = controlPercentage("input.meteval-peseval");
                if(tot > 100){
                    $(this).val(0);
                    msg = 'El Peso Total de las Evaluaciones excede el 100%!';
                    tot = controlPercentage("input.meteval-peseval");
                }
                $('#emResultPorc').html(tot);
            }
            else {
                msg = 'El peso de la evaluación debe ser un numero entero entre ' + min + ' y ' + max;
            }
        } else {
            $(this).val(0);
            msg = 'No ha definido la Cantidad para este Tipo de Evaluación!';
        }

        if (msg!='') {
            Swal.fire("Peso de Evaluaciones", msg, "warning");
        }
    });

    // Registrar Sesiones -- > convert to route director
    // $("body #page-content").on("click", ".btn-doc-sesiones", function (e) {
    //     e.preventDefault();
    //     let codcurso = $(this).data("codcurso");
    //     RequestAjax2({
    //         data: { load: 'ProfessorClassRegistrationController@index', codcurso:codcurso },
    //         context: $(wrappers.main)
    //     });
    // });

    // Asistencia Docente
    /* Obsolete
    $("body #page-content").on("click", ".btn-doc-asistencia", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");
        RequestAjax2({
            data: {load: 'DocenteAsistenciaController@index', codcurso:codcurso, codsem:codsem},
            context: $(wrappers.main)
        });
    }); */

    //reporte de sessiones
    $("body #page-content").on("click", ".btn-doc-sessionsinforme", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("codcurso");
        var codsem = $(this).data("codsem");

        RequestAjax2({
            data: {load: 'ProfessorClassRegistrationController@showInforme', codcurso:codcurso, codsem:codsem},
            context: $(wrappers.main)
        });
    });

    // Docente: Registrar Sumilla
    $("body #page-content").on("click", ".btn-sumilla-form", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("courseid");
        var codsem = $(this).data("codsem");
        RequestAjax2({
            data: { load: 'ProfessorSyllabusController@getCourseSumilla', data: { codcurso:codcurso, codsem:codsem } }
        });
	});

	$("body").on("click", ".btn-doc-schedule", function (e) {
        e.preventDefault();
        var codcurso = $(this).data("courseid");
        var codsem = $(this).data("codsem");
        RequestAjax2({
            data: { load: 'ProfessorScheduleChangeController@index', data: { codcurso:codcurso, codsem:codsem } }
        });
	});


    // Silabos - Deprecated!!! 2020.07.06
    // ------------------------------------------------------------------------
	/*
    // cargar el formulario de entrega de silabo
    $("body #page-content").on("click", ".btn-syllabus-upload", function () {
        professorShowUploadSyllabus(this);
        console.log('cargando silabos');
    });

    // observar los cambios del campo file y obtiene información
    $("body").on("change", "#silarchivo", function (e) {
        var file = $("#silarchivo")[0].files[0];    //obtenemos un array con los datos del archivo
        var fileSize = file.size;                   //obtenemos el tamaño del archivo
        var fileType = file.type;                   //obtenemos el tipo de archivo image/png ejemplo
        var fileName = file.name;                   //obtenemos el nombre del archivo
        console.log(fileType);
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);  //obtenemos la extensión del archivo

        //mensaje con la información del archivo
        if (isDocument(fileExtension)) {
            showMessage('<div class="alert alert-info"><i class="fa fa-info-circle"></i> Archivo: ' + fileName + '. /  Tamaño: ' + bytesToSize(fileSize) + '.</div>');
            UserActivityLog("SILAB_OKFILE");
            $('#btnSendSyllabus').prop('disabled', false);
        } else {
            showMessage('<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> El archivo seleccionado no es un formato válido para la presentaci&oacute;n de Sílabos.</div>');
            UserActivityLog('SILAB_ERRORFORMAT');
        }
    });

    // enviar el formulario de presentacion de silabo
    $("body").on("click", "#btnSendSyllabus", function () {
        professorSendSyllabus();
    });
	*/

    // enviar el formulario de presentacion de silabo
    $("body #page-content").on("click", "#btnDownGuiaSyllabus", function () {
        console.log('professorDownloadGuiaSyllabus');
        professorDownloadGuiaSyllabus();
    });


    // Fun.Professors Cargar Docentes de un Departamento Academico
    $("body #page-content").on("change", "#selectAcademicDepartmentProfessors", function (e) {
        var acadepid = $(this).val();
        RequestAjax2({
            data: { load: 'ProfessorsController@index',  departmentid: acadepid },
            context: $(wrappers.main)
        });
    });

});




// Save Session Class
function ClassRegistrationSave(sessionContent, tableSessions) {
	RequestAjax2({
		data: {
			load: 'ProfessorClassRegistrationController@save',
			data: { param: JSON.stringify(sessionContent) }
		},
		context: 'silent',
		callback: function (response) {
			console.log('callback ra2');
			if (response === 'registered') {
				Swal.fire(
					'Sesión de clases creada!',
					'Se ha registrado su sesión de clases #' + sessionContent.sesion,
					'success'
				);
				tableSessions.ajax.reload();
			} else {
				Swal.fire(
					'Ups, La sesión de clases no se ha creado!',
					'No se ha creado su sesión de clases #' + sessionContent.sesion + ', intentelo nuevamente!',
					'error'
				);
			}
		}
	});
}





$('document').ready(function() {

	// Caracteres no permitidos en url:
	//	! * ' ( ) ; : @ & = + $ , / ? # [ ]


	var routes = {

		'/hello': {
			'/world/(([A-Z])\w+)': function (a) {
				console.log('test path:', a);
			}
		},
		// '/docente/cursos/:courseId/alumnos': {
		// 	before: function(courseId) {
		// 		console.log('before route', courseId);
		// 	},
		// 	on: function(courseId) {
		// 		Professor.showCourseStudentsEnrolled(courseId)
		// 	},

		// },

		'/docente': {
			before: function() {
				console.log('before', user);
			},
			'/silabos': Professor.showSyllabus,
			'/horario': Professor.indexSchedule,
			'/carga-lectiva': Professor.showWorkload,
			'/tutoria': Professor.showTutorship,
			'/cursos': {
				'':	Professor.showCourses,
				'/:courseId': {
					'/alumnos':	Professor.showCourseStudentsEnrolled,
					'/metodo-evaluacion': Professor.showCourseEvaluationMethod,
					'/gestionar-sesiones': Professor.showCourseManageSessions,
					'/sesiones-programadas': Professor.showCourseScheduledSessions,
					'/registro-evaluaciones': Professor.showCourseRegisterEvaluations,
					'/acta-digital': Professor.showCourseVerifyDigitalAct,
				},
			},
			'/subsanacion': {
				'':	Professor.showCoursesSubsanationExam,
				'/:courseId': {
					'/alumnos':	Professor.showSubsanationExamStudentsEnrolled,
					'/metodo-evaluacion': Professor.showSubsanationExamEvaluationMethod,
					'/registro-evaluaciones': Professor.showSubsanationExamRegisterEvaluations,
					'/acta-digital': Professor.showSubsanationExamVerifyDigitalAct,
				},
			},
			'/aplazados': {
				'':	Professor.showCoursesPostponementExam,
				'/:courseId': {
					'/alumnos':	Professor.showPostponementExamStudentsEnrolled,
					'/metodo-evaluacion': Professor.showPostponementExamEvaluationMethod,
					'/registro-evaluaciones': Professor.showPostponementExamRegisterEvaluations,
					'/acta-digital': Professor.showPostponementExamVerifyDigitalAct,
				},
			}
		},



		// Usuarios
		'/usuario': {
			before: function() {
				console.log('before user route', user);
			},
			'/editar-cuenta': User.editAccount,
		}

		// '/books': [books, function() {
		// 	console.log("An inline route handler.");
		// }],
		// '/books/view/:bookId': viewBook

	};

	//
	// instantiate the router.
	//
	// var router = Router(routes);

	var router = Router(routes);

	router.param('courseId', /([A-Z])\w+/);

	router.init();

	// router.on('/docente/cursos/:courseId/sesiones-programadas', function(courseId){
	// 	console.log('courseId');
	// 	Professor.showCourseScheduledSessions(courseId)
	// });


});

/**
 * @class Timer
 * @author Jorge L. Jara
 * Created: 2021/02/08 16:48:00
 * Last modified: 2021/02/08 17:14:46
 */
class Timer {

    constructor() {
        this.timer;
		this.callback;
    }

	start(sec) {
		this.timer = setInterval(() => {
			sec--;
			console.log(sec);
			if (sec < 0) {
				this.stop();
				console.log('start timer', this);
				if ( typeof this.callback === 'function' ) {
					console.log('callback', this);
					this.callback();
				}
			}
		}, 1000);
	}

	stop() {
		console.log('stop timer', this);
		clearInterval(this.timer);
	}

}
