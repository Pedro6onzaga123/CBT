

function AbrirModalCurso(){
     $("#modal_regist_curso").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_regist_curso").modal('show');
}



function Registrar_curso(){
var codigocur=$('#codigocur').val();
var nombre =$('#txt_nom_cur').val();
var cre =$('#txt_cred').val();
var tipo =$('#cbm_sem').val();
if (codigocur ==0 || nombre==0 || cre==0 || tipo==0) {
    return Swal.fire("Mensaje de Advertencia", "Llene espacio vacios", "warning");
}

$.ajax({
    "url": "../controlador/curso/controlador_registrar_curso.php",
        type: 'POST',
        data: {
            codigocur:codigocur,
            nombre:nombre,
            cre:cre,
            tipo:tipo
        }
}).done(function(resp) {
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_regist_curso").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Curso Registrado", "success").then((value) => {
                    LimpiarRegistroCurso();
                    table_curso.ajax.reload();
                });
            } else {
                return Swal.fire("Mensaje De Advertencia", "Lo sentimos, el nombre del curso ya se encuentra en nuestra base de datos", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })

}


function LimpiarRegistroCurso(){
$('#codigocur').val("");   
$('#txt_nom_cur').val("");
$('#txt_cred').val("");
$('#cbm_sem').val("").trigger("change");

}



var table_curso;

function listar_curso() {
    table_curso = $("#tabla_curso").DataTable({
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
            "url": "../controlador/curso/controlador_listar_curso.php",
            type: 'POST'  
        },
        "columns": [{
            "data": "idcurso"
        }, {
            "data": "cursoCodigo"
        },
        {
            "data": "nonbrecurso"
        },
        {
            "data": "credito"
        },

        {
            "data": "statuscurso",
            render: function(data, type, row) {
                if (data == 'LIBRE') {
                    return "<span class='label label-info'><i class ='fa fa-info-circle'></i>&nbsp;" + data + "</span>";
                } else {
                    return "<span class='label label-warning'><i class ='fa fa-warning'></i>&nbsp;" + data + "</span>";
                }
            }
        },

          {
            "data": "stadodocent",
            render: function(data, type, row) {
                if (data == 'PENDIENTE') {
                    return "<span class='label label-primary'>" + data + "</span>";
                } else {
                    return "<span class='label label-warning'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-info'><i class='fa fa-edit' title='editar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"

        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_curso_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
 
}
function filterGlobal() {
    $('#tabla_curso').DataTable().search($('#global_filter').val(), ).draw();
}

$('#tabla_curso').on('click', '.editar', function() {
    var data = table_curso.row($(this).parents('tr')).data();
   
    if (table_curso.row(this).child.isShown()) {
        var data = table_curso.row(this).data();
        var idcursoedit=data.idcurso;
    }
    var idcursoedit=data.idcurso;
    $("#modal_editar_curso").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_editar_curso").modal('show');

    $("#txt_id_curso").val(idcursoedit);
    $("#Codigocurso").val(data.cursoCodigo);
    $("#Nombreedit").val(data.nonbrecurso);
    $("#Creditoedit").val(data.credito);
   
})

function Actualizar_curso(){
var idcurso =  $("#txt_id_curso").val();
var codigcurso =   $("#Codigocurso").val();
var nombcurso =   $("#Nombreedit").val();
var creditcurso =   $("#Creditoedit").val();
var tipoedit = $("#tipoedit").val();

$.ajax({
        "url": "../controlador/curso/controlador_curso_Actualizar.php",
        type: 'POST',
        data: {
            idcurso : idcurso,
            codigcurso:codigcurso,
            nombcurso:nombcurso,
            creditcurso:creditcurso,
            tipoedit:tipoedit
        }
    }).done(function(resp) {
        if (resp > 0) {
            $("#modal_editar_curso").modal('hide');
            Swal.fire("Mensaje De Confirmacion", "El curso se Actualizo con exito", "success").then((value) => {
                table_curso.ajax.reload();
            });
        }else{
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        } 
    })
}




$('#tabla_curso').on('click', '.eliminar', function() {
    var data = table_curso.row($(this).parents('tr')).data();

    if (table_curso.row(this).child.isShown()) {
        var data = table_curso.row(this).data();
        var idecurso=data.idcurso;
    }
     var idecurso=data.idcurso;
    $.ajax({
        "url": "../controlador/curso/controlador_curso_eliminar.php",
        type: 'POST',
        data: {
            idecurso : idecurso
        }
    }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "El curso se Elimino con exito", "success").then((value) => {
                table_curso.ajax.reload();
            });
        }else{
            return Swal.fire("Mensaje De Advertencia", "ups !,no se pudo eliminar, curso esta asignado a , grado , horario o docente", "warning");

        }
    })
})

