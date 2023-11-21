
function registarAula(){
var idAula=$("#idAula").val();
var nombre=$('#aulaAula').val();
var piso=$('#piso').val();
var numero=$('#numero').val();
var aforro=$('#aforro').val();
var seccion=$('#seccion').val();
var estado=$('#estado').val();

if (nombre ==0 || piso==0 ||  aforro==0 || seccion==0 || estado==0) {
    return Swal.fire("Mensaje de Advertencia", "Llene espacio vacios", "warning");
}

$.ajax({
    "url": "../controlador/aula/controlador_registrar_aula.php",
        type: 'POST',
        data: {
        	idAula:idAula,
            nombre:nombre,
            piso:piso,
            numero:numero,
            aforro:aforro,
            seccion:seccion,
            estado:estado
        }
}).done(function(resp) {
        if (resp > 0) {
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Aula Registrado", "success").then((value) => {
                    linpiarregistroAula();
                    tableAula.ajax.reload();
               })
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}

function linpiarregistroAula(){
	$('#idAula').val("");
	$('#aulaAula').val("");
	$('#piso').val("");
	$('#numero').val("");
    $('#aforro').val("");
   $('#seccion').val("").trigger("change");
    $('#estado').val("").trigger("change");

}

var tableAula;

function listar_Aulas() {
    tableAula = $("#tabla_aulas").DataTable({
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
            "url": "../controlador/aula/controlador_listar_aula.php",
            type: 'POST'  
        },
        "columns": [{
            "data": "idaula"
        },
           {
            "data": "nombreaula"
        },
         {
            "data": "piso"
        },

         {
            "data": "numero"
        },

        {
            "data": "aforro"
        },
        {
            "data": "seccion"
        },

         {
            "data": "status",
            render: function(data, type, row) {
                if (data == 'LIBRE') {
                    return "<span class='label label-success'><i class ='fa fa-info-circle'></i>&nbsp;" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-info'><i class=' fa fa-edit' title='ediat'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_aulas_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#tabla_aulas').DataTable().search($('#global_filter').val(), ).draw();
}

$('#tabla_aulas').on('click', '.editar', function() {
    var data = tableAula.row($(this).parents('tr')).data();
   
    if (tableAula.row(this).child.isShown()) {
        var data = tableAula.row(this).data();
    }
     $('#idAula').val(data.idaula);
     $('#aulaAula').val(data.nombreaula);
	$('#piso').val(data.piso);
	$('#numero').val(data.numero);
    $('#aforro').val(data.aforro);
    $('#seccion').val(data.seccion).trigger("change");
    $('#estado').val(data.status).trigger("change");

  
})

$('#tabla_aulas').on('click', '.eliminar', function() {
    var data = tableAula.row($(this).parents('tr')).data();
   
    if (tableAula.row(this).child.isShown()) {
        var data = tableAula.row(this).data();
    }

      var idAula= data.idaula;
    $.ajax({
    "url": "../controlador/aula/controlador_eliminar_aula.php",
        type: 'POST',
        data: {
            idAula:idAula
        }
}).done(function(resp) {
        if (resp > 0) {
                
                    tableAula.ajax.reload();
               
        } else {
            Swal.fire("Mensaje De Error", "no se pudo completr,ya esta ocupado poe un grado", "error");
        }
    })
   
  
})
