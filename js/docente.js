function AbrirModalDocente() {
    $("#modal_registro_docente").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_registro_docente").modal('show');
}


function AbrirModalAsignar() {
    $("#modal_agregar_curso").modal({
        backdrop: 'static',
        keyboard: false
    })
    $('#modal_agregar_curso .modal-body').find("#tbody_tabla_detall").html("");
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_agregar_curso").modal('show');

}

function ModalverCurso_grado() {
    $("#modal_ver_curso").modal({
        backdrop: 'static',
        keyboard: false
    })
    //$('#modal_ver_curso .modal-body').find("#tabla_cursogrado_docent").html("");
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_ver_curso").modal('show');

}

var table_docente;

function listar_docente() {
    table_docente = $("#tabla_Docentes").DataTable({
        "ordering": false,
        "bLengthChange": false,
        "searching": {
            "regex": false
        },
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/docente/controlador_listar_docente.php",
            type: 'POST'  
        },
        "columns": [{
            "data": "iddocente"
        }, {
            "data": "nombre"
        }, {
            "data": "apellido"
        }, 
         {
            "data": "tipo"
        },
          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='agregar btn btn-warning'><i class=' glyphicon glyphicon-plus' title='agregar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='ver btn btn-info'><i class=' glyphicon glyphicon-eye-open' title='ver'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class='fa fa-edit' title='editar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_Docentes_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
}
function filterGlobal() {
    $('#tabla_Docentes').DataTable().search($('#global_filter').val(), ).draw();
}

$('#tabla_Docentes').on('click', '.edit', function() {
    var data = table_docente.row($(this).parents('tr')).data();
   
    if (table_docente.row(this).child.isShown()) {
        var data = table_docente.row(this).data();
    } 
     $("#docente_edit").modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#docente_edit").modal('show');

    $("#id_docent").val(data.iddocente);
    $("#docentenom").val(data.nombre);
    $("#appdocent").val(data.apellido);
    $("#statusdocent").val(data.status).trigger("change");
    $("#docentsex").val(data.sexo).trigger("change");
   $("#tipodocebt").val(data.tipo).trigger("change");


});




$('#tabla_Docentes').on('click', '.agregar', function() {
    var data = table_docente.row($(this).parents('tr')).data();
   
    if (table_docente.row(this).child.isShown()) {
        var data = table_docente.row(this).data();
    } 
     //alert(data.iddocente +'--'+data.nombre );
         $("#txtiddocente").val(data.iddocente).trigger("change");
     listar_combo_niveles();
    AbrirModalAsignar();
})


$('#tabla_Docentes').on('click', '.ver', function() {
    var data = table_docente.row($(this).parents('tr')).data();
   
    if (table_docente.row(this).child.isShown()) {
        var data = table_docente.row(this).data();
    }
    VerCursos_grados_docente(data.iddocente);
    //ModalverCurso_grado();
      
})

$('#tabla_Docentes').on('click', '.eliminar', function() {
    var data = table_docente.row($(this).parents('tr')).data();
   
    if (table_docente.row(this).child.isShown()) {
        var data = table_docente.row(this).data();
        var idprofe=data.iddocente;
    }
     var idprofe=data.iddocente;

     $.ajax({
    "url": "../controlador/docente/controlador_eliminar_docente.php",
        type: 'POST',
        data: {
            idprofe:idprofe
        }
        }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Eliminado", "success").then((value) => {
                    table_docente.ajax.reload();
                });
               
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo completr,Docente esta  accion, primero quita los cargos que tiene", "warning");
        }
    })
   
      
})


function Registrar_Docente(){
var nombre=$("#txt_nombre").val();
var apellido=$("#txt_app").val();
var contra1=$("#txt_con1").val();
var contra2=$("#txt_con2").val();
var dni=$("#dnidoce").val();
var sexo=$("#cbm_sexo").val();
var tipo=$("#cbm_tipo").val();

if (nombre.length == 0 || apellido.length == 0 || dni.length == 0 ) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }
    if (contra1 != contra2) {
        return Swal.fire("Mensaje De Advertencia", "Las contraseñas deben coincidir", "warning");
    }
    $.ajax({
        "url": "../controlador/docente/controlador_docente_registro.php",
        type: 'POST',
        data: {
            nombre  :nombre,
            apellido:apellido,
            contra1 :contra1,
             sexo   :sexo,
             tipo   :tipo,
             dni:dni
        }
    }).done(function(resp) {
        
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_registro_docente").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Usuario Registrado", "success").then((value) => {
                   // Limpiarmodal();
                    table_docente.ajax.reload();
                });
            } else {
                return Swal.fire("Mensaje De Advertencia", "Lo sentimos, el nombre del usuario ya se encuentra en nuestra base de datos", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })

}

function Limpiarmodal(){
$('#txt_nombre').val('');
$('#txt_app').val('');
$('#txt_con1').val('');
$('#cbm_sexo').val('');
$('#cbm_tipo').val('');

}

function listar_combo_niveles() {
    $.ajax({
        "url": "../controlador/administrador/controlador_combo_niveles.php",
        type: 'POST'
    }).done(function(resp) {
          
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }

             $('#cbm_nivel').html(cadena);////lamndo en vista matricula

            var grado = $('#cbm_nivel').val();//capturando el idel de se nivel

            Traer_cursos(grado);//traer cursos de ese grado
           
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_nivel").html(cadena);
        }
    })
}

function Traer_cursos(idnivel) {//TRAER CUSO DEL DEL GRADO ESTADO PENDIENTE
  
    $.ajax({
        "url": "../controlador/grados/controlador_cuso_de_nivel.php",
        type: 'POST',
        data: {
            idnivel: idnivel
        }
    }).done(function(resp) {
       
        var cont=0;
          var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
                cont++;
            }
            $("#cbm_curso").html(cadena);
          
            
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_curso").html(cadena);
           
        }
    })
}



function Agregar_tabla(){
     var idcurso = $('#cbm_curso').val();
      var nombcurso = $('#cbm_curso option:selected').text();
      var idnivel = $('#cbm_nivel').val();
    var nombnivel = $('#cbm_nivel option:selected').text();
    //alert(idmat+'--'+nomate);
    
    if (verificaridcurso(idcurso)) {//cursos no se repiten
        return Swal.fire("Mensaje de Advertencia", "curso ya agregada para ese nivel", "warning");

    }
    var datos_add = "<tr>";
    datos_add += "<td for='id'>" + idcurso + "</td>";
    datos_add += "<td >" + nombcurso + "</td>";
    datos_add += "<td >" + idnivel + "</td>";
      datos_add += "<td >" + nombnivel + "</td>";
    datos_add += "<td><button class='btn btn-danger' onclick = 'remove(this)'> <i class='fa fa-trash'></button></i></td>";
    datos_add += "<tr>";
    $("#tbody_tabla_detall").append(datos_add);
}

function verificaridcurso(idnuevo) {
    let ident = document.querySelectorAll('#tbody_tabla_detall td[for="id"]');
    return [].filter.call(ident, td => td.textContent == idnuevo).length == 1;
}

function remove(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    
}


function DocentAsignado() {  //TAMBIEN CAMBIA  ESTADO PENDIENTE
    var iddocente = $("#txtiddocente").val();
    var profSemestGrad=$("#profSemestGrad").val();
   
    var cont = 0;
    var arregloRegistro = new Array();
    $('#tbody_tabla_detall#tbody_tabla_detall tr').each(function() {
        arregloRegistro.push($(this).find('td').eq(0).text());
        cont++;
    })
    var cant = 0;
    var arregloCsnt = new Array();
    $('#tbody_tabla_detall#tbody_tabla_detall tr').each(function() {
        arregloCsnt.push($(this).find('td').eq(2).text());
        cant++;
    })
   // alert(arregloRegistro+'--'+arregloCsnt);
    var cantidad = arregloCsnt.toString();
    var vect = arregloRegistro.toString(); //
    if (cont == 0) {
        return;
    }
    $.ajax({
        url: '../controlador/docente/controlador_cursogrado_docente.php',
        type: 'POST',
        data: {
            iddocente: iddocente,
            cantidad: cantidad,
            vect: vect,
            profSemestGrad:profSemestGrad
            
        }
    }).done(function(resp) {
       
        if (resp == 0 || resp==1 ) {
            //VACEANDO EL CONTENIDO DE LA TABLA
              $('#modal_agregar_curso .modal-body').find("#tbody_tabla_detall").html("");
              ///
            $("#modal_agregar_curso").modal('hide');

            Swal.fire("Mensaje De Confirmacion", "cursos,agregados", "success").then((value) => {
                //listar_docente();    
                table_docente.ajax.reload();
            });
        } else {
            Swal.fire("Mensaje De Error", "No se completo el registro", "error");
        }
    })
}

//ANTIGO EJEMPLO  CON MODAL
/*
function VerCursos_grados_docente(id) { 
    $.ajax({
        url: '../controlador/docente/controlador_verGradocurso.php',
        type: 'POST',
        data: {
            id:id
        }
    }).done(function(resp) {
        
        var datos = JSON.parse(resp);
        if ((datos.length == 0)) {
            return;
        }else{
        
        var cont=1;  //idcurso, nonbrecurso,idgrado,gradonombre
        
        var template = '';
        datos["data"].forEach(tarea => {
            template += `
                   <tr guardarId="${tarea.idcurso}" >
                   <td>${cont}</td>
                   <td><a>${tarea.nonbrecurso}</a></td>
                   <td><a >${tarea.gradonombre}</a></td>
                   <td>
                     <button class='btn btn-danger' onclick = 'QuitarCursoDocente(this)'> <i class='fa fa-trash'></button></i></td>
                   </td>
                   </tr>
                 `
                 cont++;

        });
        $('#tabla_cursogrado_docent').html(template);
        }   
    }) 

$('#tabla_cursogrado_docent').html('<br> <center> NO TIENE CURSOS NI GRADOS A CARGO !!</center>');
}
 
function QuitarCursoDocente(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var idcapturado = $(tr).attr('guardarId');
     $('.loader').show();
      $.ajax({
        url: '../controlador/docente/controlador_Quitar_cursoDocente.php',
        type: 'POST',
        data: {
            idcapturado:idcapturado
        }
    }).done(function(resp) {
        $('.loader').hide();
        if (resp > 0) {
             var table = tr.parentNode;
            table.removeChild(tr);
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo QUITAR!!", "warning");
        }
    })
    
}*/

//NUEVO ACTUALIZACION//
var docentecargo;
function VerCursos_grados_docente(id) { 
 $('#tablasAsignados').show();
     docentecargo = $("#tablasAsignados").DataTable({
        "ordering": false,
        "bLengthChange": false,
        "searching": {
            "regex": false
        },
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": '../controlador/docente/controlador_verGradocurso.php',
            type: 'POST',
            data:{id:id}  
        },
        "columns": [{
            "data": "idcurso"
        }, {
            "data": "nonbrecurso"
        }, {
            "data": "gradonombre"
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tablasAsignados_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
}

$('#tablasAsignados').on('click', '.eliminar', function() {
    var data = docentecargo.row($(this).parents('tr')).data();
   
    if (docentecargo.row(this).child.isShown()) {
        var data = docentecargo.row(this).data();
        var idcapturado= data.idcurso;
    }

      var idcapturado= data.idcurso;
    $.ajax({
    "url": '../controlador/docente/controlador_Quitar_cursoDocente.php',
        type: 'POST',
        data: {
            idcapturado:idcapturado
        }
}).done(function(resp) {
        if (resp > 0) {
                    docentecargo.ajax.reload();
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo QUITAR!!", "warning")
            }
    })
   
  
})

//HATA AQUI SE CAMBIO EL NUEVO VISTA

function Update_Docente(){
var iddocent  =  $("#id_docent").val();
var nomdocent =   $("#docentenom").val();
var appdocent  =  $("#appdocent").val();
 var estdocent =   $("#statusdocent").val();
var sexdocent  =  $("#docentsex").val();
var tipdocent =  $("#tipodocebt").val();

$.ajax({
        url: '../controlador/docente/controlador_Update_Docente.php',
        type: 'POST',
        data: {
             iddocent : iddocent,
             appdocent : appdocent,
             nomdocent:nomdocent,
             estdocent : estdocent,
             sexdocent :sexdocent,
             tipdocent:  tipdocent

        }
    }).done(function(resp) {
        if (resp > 0) {
            $("#docente_edit").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Update", "success").then((value) => {
                    table_docente.ajax.reload();
                });
           
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo Actualizar", "warning");
        }
    })

}