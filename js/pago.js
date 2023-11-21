
function AbrirModalPagos() {
    $("#modad_pagos").modal({
        backdrop: 'static',
        keyboard: false
    })
      $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modad_pagos").modal('show');
}



function ModalReport() {
    $("#reporte_pago").modal({
        backdrop: 'static',
        keyboard: false
    })
      $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#reporte_pago").modal('show');
}


var table_pagos;

function listar_pagosAlu() {

    table_pagos = $("#Tabla_Pagos_Alumno").DataTable({
        "ordering": true,
        "bLengthChange": false,
        "searching": {
            "regex": false
        },
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ] ,
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            url: "../controlador/administrador/controlador_listar_pagos.php",
            type: 'POST'
        },

        "columns": [{
            "data": "idalumno"
        }, 
        {
            "data": "apellidop"
        },
          
        {
            "data": "gradonombre" 
        },
          {
            "data": "fechaRegisto"//,
             //"render": {
                    //  "_": "display",
                    //  "sort": "timestamp",
                      // "filter": "timestamp"
           // }
        },
         {
            "data": "fechaUpdate"
        }, {
            "data": "stadoPago",
            render: function(data, type, row) {
                if (data == 'PAGADO') {
                    return "<span class='label label-primary'>" + data + "</span>";
                 }
                 if(data == 'PROCESANDO..'){
                    return "<span class='label label-warning'>" + data + "</span>";
                }else {
                   return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='pagar btn btn-info'><i class='fa fa-money' title='pagar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='reporte btn btn-warning' title='reporte'><i class='fa fa-eye'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("Tabla_Pagos_Alumno_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}
function filterGlobal() {
    $('#Tabla_Pagos_Alumno').DataTable().search($('#global_filter').val(), ).draw();
}

$('#Tabla_Pagos_Alumno').on('click', '.reporte', function() {
    var data = table_pagos.row($(this).parents('tr')).data();
   
    if (table_pagos.row(this).child.isShown()) {
        var data = table_pagos.row(this).data();
    }

    $("#reportidalumno").val(data.idalumno);
     $("#reportnombreAlumno").html(data.apellidop);
      $("#reportgradoAlumno").html(data.gradonombre);
      listar_Reportepago(data.idalumno);
      ModalReport() ;
    });




$('#Tabla_Pagos_Alumno').on('click', '.pagar', function() {
    var data = table_pagos.row($(this).parents('tr')).data();
   
    if (table_pagos.row(this).child.isShown()) {
        var data = table_pagos.row(this).data();
    }

   $("#idalumno").val(data.idalumno);

     $("#Alumno").val(data.apellidop);
     $("#nombreAlumno").html(data.apellidop);
      $("#gradoAlumno").html(data.gradonombre);
      var fecha = new Date(data.fechaRegisto);
     var options = { year: 'numeric', month: 'long', day: 'numeric' };
     var uuu = fecha.toLocaleDateString("es-ES", options)
       $("#fechadeutimopago").html(uuu);
       $("#pagadpfer").val(data.fechaRegisto);
    
    AbrirModalPagos();
    });

var num=1;
var total = 0;
var cambioYear=false;
function Agregar_tabla_Pagos(){

     
     ///FECHA QUE PAGO ALUMNO///
   var fechpagado = $("#pagadpfer").val();
   var f=new Date(fechpagado);

     
  var dia = f.getDate() ;
  var mes = parseInt(f.getMonth()) + 1 ;
  var YearF = f.getFullYear();

    ///FECHA A PAGAR//////
  var mesing= $("#cbm_mes").val();
  if(mesing.length==""){
    return;
  }


  var fnew=new Date();
   fnew.setDate(dia) ;
  var mesSel = parseInt(fnew.setMonth(mesing -1)); 
   fnew.setFullYear(YearF);
  
  var fechaSelec = new Date((fnew));
  //FECHA SELECCIONADO CON FORMATO DE DATE PARA BD
  var fechaSelecnormal = new Date(fnew);
    var event = new Date(fechaSelecnormal);
    var date = JSON.stringify(event)
    var fechaSelecnormal  = date.slice(1,11);

/////////////////ALTEARCION DE FECHAS/////////////////////////////////*/
var MesUtimoPago =parseInt(f.getMonth()) + 1 ;

if(MesUtimoPago==12){
  fechaSelec =new Date(fechaSelec.setFullYear(fechaSelec.getFullYear()+1));
  //SUMANDO UNO AL AÑO para BD
  var fechaparaBD= new Date(fnew);
  var event = new Date(fechaparaBD.setFullYear(fechaparaBD.getFullYear()+1));
  var date = JSON.stringify(event)
  fechaSelecnormal  = date.slice(1,11);
}

if(cambioYear==true){
  //SUMANDO UNO AL AÑO para UI
  fechaSelec =new Date(fechaSelec.setFullYear(fechaSelec.getFullYear()+1));
  //SUMANDO UNO AL AÑO para BD
  var fechaparaBD= new Date(fnew);
  var event = new Date(fechaparaBD.setFullYear(fechaparaBD.getFullYear()+1));
  var date = JSON.stringify(event)
  fechaSelecnormal  = date.slice(1,11);
}

/*|||| SI MES ES IGUAL A 12 ALTERAMOS EL AÑO EN UNO MAS||||||*/
var MesSeleclrDiciembre =parseInt(fechaSelec.getMonth()) + 1 ;

///COMPARA FECHA//////////////
   if ((fechaSelec<f)){
   
          var options = { year: 'numeric', month: 'long', day: 'numeric' };
          var selectFecha=(fechaSelec.toLocaleDateString("es-ES", options));
          return Swal.fire("Mensaje De Advertencia","FECHA : " +selectFecha+ " !!YA PAGADO ","warning");
       }
      else{


        if (fechaSelec.getMonth()==f.getMonth()&& fechaSelec.getFullYear()==f.getFullYear()) {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var selectFecha=(fechaSelec.toLocaleDateString("es-ES", options));
            return Swal.fire("Mensaje De Advertencia","El Pago se acepta pasado un mes de su ultimo pago","warning");

            }
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
               var selectFecha=(fechaSelec.toLocaleDateString("es-ES", options));
                var precio = 120;
                 
               if (verificarid(mesing)) {
                   return Swal.fire("Mensaje de Advertencia", "Mes ya esta Seleccionada", "warning");
              }
                    var datos_add = "<tr>";
                    datos_add += "<td for='id'>" + mesing + "</td>";
                    datos_add += "<td >" + selectFecha + "</td>";
                    datos_add += "<td hidden >" + fechaSelecnormal  + "</td>";
                    fechaSelecnormal=null;
                    datos_add += "<td >" + precio + "</td>";
              
                    datos_add += "<td><button id='aqui' class='btn btn-danger' onclick = 'remove(this)'> <i class='fa fa-trash'></button></i></td>";
                    datos_add += "<tr>";
                    calcularTotal();
                    num ++;
                    $("#tbody_tabla_detall").append(datos_add);
           
           if(MesSeleclrDiciembre==12 ){
               cambioYear =true;
              
            }
                 
         }
}


function verificarid(mesing) {

    let ident = document.querySelectorAll('#tbody_tabla_detall td[for="id"]');
    return [].filter.call(ident, td => td.textContent == mesing).length == 1;
}
var uno=0;
function remove(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    RestarTotal();
 uno++;
   cambioYear=false;   
}

function calcularTotal(){
  var precio=120;
 // console.log("numero  mul:"+num);
        var total = 0; 
            var element = Number(precio * num);
            $("#total").html(element);
      
       
}

function RestarTotal(){
  num--;
  var precio=120;
        var total = 0; 
            var element = Number(precio * num);
            $("#total").html(element-precio);
            // console.log("numero  rest:"+num);

}

function Refresmodal(){
  $('#modad_pagos .modal-body ').find("#tbody_tabla_detall").html("");
  $("#total").html("");
  $('#cbm_mes').val("").trigger("change");
  cambioYear=false; 
}

function Pagar_Alumno(){
    var alum = $("#idalumno").val();
    var alumnomb =$("#Alumno").val();
    var fechprueva = $("#pagadpfer").val();

    var cont = 0;
    var arrayFEcha = new Array();
    $('#tbody_tabla_detall#tbody_tabla_detall tr').each(function() {
        arrayFEcha.push($(this).find('td').eq(2).text());
        cont++;
    })
    var cant = 0;
    var arrayPrecio = new Array();
    $('#tbody_tabla_detall#tbody_tabla_detall tr').each(function() {
        arrayPrecio.push($(this).find('td').eq(3).text());
        cant++;
    });

    ////////////SACAR LA FECHA MAYOR /////////////////////
     
  var mayorDate= new Date(arrayFEcha[0]);
  var menorDate= new Date(arrayFEcha[0]);

for (var i = 0; i<arrayFEcha.length; i++){
  var arrDate= new Date(arrayFEcha[i]);
  if(arrDate > mayorDate){
    mayorDate=arrDate
  }
  if(arrDate < menorDate){
    menorDate=arrDate
    }
  }

    ///Combertir FEchaformato Mysql////
    var fechcomp = new Date(mayorDate);
    var datejson = JSON.stringify(fechcomp)
    var fechmay = datejson.slice(1,11);

    ///////////////////////////
    // alert(arrayFEcha+'--'+arrayPrecio);
     
    var arrayF = arrayFEcha.toString();
    var arrayP = arrayPrecio.toString(); //
    if (cont == 0) {
        return;
    }
     num=1;
   
   console.log(arrayF);

   $.ajax({
        url : '../controlador/administrador/controlador_pagos_alumnos.php',
        type :'POST',
        data :{
             alum:alum,
             alumnomb:alumnomb,
             arrayF:arrayF,
             arrayP:arrayP,
             fechmay:fechmay
        }
    }).done(function(resp){
           if (resp == 0 || resp == 1) {
            
               //LIMPIAR TODA LA TABLA
               $('#modad_pagos .modal-body ').find("#tbody_tabla_detall").html("");

            $("#total").html("");
                $('#cbm_mes').val("").trigger("change");
                $("#modad_pagos").modal('hide');
               Swal.fire("Mensaje De Confirmación", "Datos correctamente,Pago registrado", "success").then((value) => {
                    table_pagos.ajax.reload();
                });
            } else {
               return Swal.fire("Mensaje De Advertencia", "Lo sentimos,algo salio mal", "warning");
           }
        
    })


}


function listar_Reportepago(id) { 
    $.ajax({
        url: '../controlador/administrador/controlador_meses_pagados.php',
        type: 'POST',
        data: {
            id:id
        }
    }).done(function(resp) {
       
        var datos = JSON.parse(resp);
        var cont=1;
         
        let template = '';
        datos["data"].forEach(tarea => {
            template += `
                   <tr>
                   <td>${cont}</td>
                   <td>${tarea.montopago}</td>
                   <td>${tarea.description}</td>
                   <td> <a >${tarea.fechasPagados} </a></td>
                   <td> <a > ${tarea.fechaUpdate}</a></td>
                    <td> ${tarea.stado} </td>
                   </tr>
                 `
                 cont++;
        });
        $('#tabla_meses_pagado').html(template);
    }) 
    $('#tabla_meses_pagado').html('<br> <center> REALIZA TU PRIMER PAGO !!</center>');
}




function Comparar_Fecha(){
$.ajax({
        "url": "../controlador/administrador/controlador_cambiar_estado.php",
        type: 'POST'  
        }).done(function(resp) {
     
        if (resp > 0) {
    
         //  return Swal.fire("Mensaje De Confirmacion", "verificado y actualizado la BD", "success");
            
        } else {

           return Swal.fire("Mensaje De Advertencia", "NO SE ACTUALIZO LA BD", "warning");
        }
    })

}