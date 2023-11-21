


 /////LISTAR COMBO  GRADOS

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

             $('#cbm_grado').html(cadena);////lamndo en vista matricula
            $('#txt_gradoH').html(cadena);////lamndo en crer horari
          //  var grado = $('#txt_gradoH').val();//capturando el idel de se nivel
           // traerCursos_Grado(grado);

            //Traer_cursos(grado);//traer cursos de ese nivel
           
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#txt_gradoH").html(cadena);
            $("#cbm_grado").html(cadena);
        }
    })
}


    //GESTION DE MATRICULAS //

function AbrirModalMatricula() {
    $("#modal_Matricula").modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
     listar_combo_niveles();
    $("#modal_Matricula").modal('show');
}





var table_matricula;

function listar_alumnos() {

    table_matricula = $("#tabla_matricula").DataTable({
        "ordering": true,
        "bLengthChange": false,
        "searching": {
            "regex": false
        },

        "responsive": true,
        dom: 'Bfrtilp',
        buttons:[ 
      
      {
        extend:    'pdfHtml5',
        text:      '<i class="fa fa-download"></i> ',
        titleAttr: 'Exportar a PDF',
        className: 'btn btn-danger',
        style:'background-color:red'
      },
      {
        "extend":    'print',
        "text":      '<i class="fa fa-print"></i> ',
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },
    ],
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ] ,
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            url: "../controlador/administrador/controlador_alumnos_listar.php",
            type: 'POST'
        },

        "columns": [{
            "data": "idalumno"
        }, 
        {
            "data": "apellidop"
        },
          {
            "data": "alumnonombre"
        },
        {
            "data": "gradonombre"
        },
         {
            "data": "sexo",
            render: function(data, type, row) {
                if (data == 'M') {
                    return "MASCULINO";
                } else {
                    return "FEMINO";
                }
            }
        },
        {
            "data": "codigo"
        }, 


        {
            "data": "stadoalumno",
            render: function(data, type, row) {
                if (data == 'ACTIVO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='desactivar btn btn-warning'><i class='fa fa-eye-slash' title='desactivar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' title='activar'><i class='fa fa-eye'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='imprimir btn btn-outline-dark'  title='imprimir' ><i class='fa fa-print'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_matricula_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {

        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

     $('#btn-place').html(table_matricula.buttons().container()); 

}

function filterGlobal() {
    $('#tabla_matricula').DataTable().search($('#global_filter').val(), ).draw();
}


$('#tabla_matricula').on('click', '.imprimir', function() {
    var data = table_matricula.row($(this).parents('tr')).data();
    if (table_matricula.row(this).child.isShown()) {
        var data = table_matricula.row(this).data();
    }
        
     window.open("../vista/reportePdf/reporte_matricula.php?id="+parseInt(data.idalumno)+
        "#zoom=80%","report","scrollbars=NO");
    // window.open("https://www.w3schools.com")


});

/*
$('#tabla_matricula').on('click', '.editar', function() {
    var data = table_matricula.row($(this).parents('tr')).data();
    if (table_matricula.row(this).child.isShown()) {
        var data = table_matricula.row(this).data();
    }
        
     $("#edit_modalalum").modal({
               backdrop: 'static',
               keyboard: false
           })
           $("#edit_modalalum").modal('show');
           $("#textidususrio").val(data.idalumno);
           $("#apelliedit").val(data.apellidop);
           $("#nombreedir").val(data.alumnonombre);
           $("#gradoedit").val(data.gradonombre);
           $("#secxoedit").val(data.sexo);
});*/

$('#tabla_matricula').on('click', '.eliminar', function() {
    var data = table_matricula.row($(this).parents('tr')).data();
    if (table_matricula.row(this).child.isShown()) {
        var data = table_matricula.row(this).data();
        var id=data.idalumno;
    }
    var id=data.idalumno;

$.ajax({
    "url": "../controlador/administrador/controlador_eliminar_aulumno.php",
        type: 'POST',
        data: {
            id:id
        }
}).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Curso Registrado", "success").then((value) => {
                   table_matricula.ajax.reload();
                });  
        } else {
            Swal.fire("Mensaje De Error", "no se pudo completr,ya esta ocupado poe un grado", "error");
        }
    })
    
})


$('#tabla_matricula').on('click', '.activar', function() {
    var data = table_matricula.row($(this).parents('tr')).data();
    

    if (table_matricula.row(this).child.isShown()) {
        var data = table_matricula.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de activar al Alumno?',
        text: "Una vez hecho esto el alumno  tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.idalumno, 'ACTIVO');
        }
    }) 

})


$('#tabla_matricula').on('click', '.desactivar', function() {
    var data = table_matricula.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (table_matricula.row(this).child.isShown()) {
        var data = table_matricula.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de desactivar al Alumno?',
        text: "Una vez hecho esto el Alumno no tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {table_matricula
        if (result.value) {
            Modificar_Estatus(data.idalumno, 'INACTIVO');
        }
    })
})

function Modificar_Estatus(idusuario, estatus) {
    var mensaje = "";
    if (estatus == 'INACTIVO') {
        mensaje = "desactivo";
    } else {
        mensaje = "activo";
    }
    $.ajax({
        "url": "../controlador/administrador/controlador_modificar_estatus_alumno.php",
        type: 'POST',
        data: {
            idusuario: idusuario,
            estatus: estatus
        }
    }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "El Alumno se " + mensaje + " con exito", "success").then((value) => {
                table_matricula.ajax.reload();
            });
        }
    })
}

function matriculaAlunos(){                

         var apellp = $("#txt_apellidos").val();
         var nomb = $("#txt_alunombre").val();
          var fechaN = $("#txt_fech").val();
         var dni = $("#txt_dni").val();
          var telf = $("#txt_tel").val();
          var pago =$('#txt_pago').val();
         var codi = $("#txt_codig").val();
          var grad = $("#cbm_grado").val();
          var sex = $("#cbm_sexo").val();
           var fechaR = $("#txtfecharegistro").val();
           var contra=$("#contra").val();
           var direccion=$("#direccion").val();

        if (apellp === 0 || nomb == 0 || fechaN == 0 || telf ==0 || pago ==0 || codi ==0 || contra ==0 || direccion ==0){
  
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");

        }

        $.ajax({
             "url": "../controlador/administrador/controlador_registrar_matricula.php",
             type: 'POST',
             data: {
                 apellp: apellp,
                 nomb: nomb,
                 fechaN: fechaN,
                 dni:dni,
                 telf:telf,
                 pago:pago,
                 codi:codi,
                 grad:grad,
                 sex:sex,
                 fechaR:fechaR,
                 contra:contra,
                 direccion:direccion
                    }
                }).done(function(resp) {
       
               if (resp > 0) {
                   if (resp == 1) {
                     $("#modal_Matricula").modal('hide');
                     Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Alumno Registrado", "success").then((value) => {
                      LimpiarModalMatricula();
                    table_matricula.ajax.reload();
                });
            } else {
               return Swal.fire("Mensaje De Advertencia", "Lo sentimos, el DNI del usuario ya se encuentra en nuestra base de datos", "warning");
           }
        } else {
           Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    });

}


function LimpiarModalMatricula(){
 $("#txt_apellidos").val("");
 $("#txt_alunombre").val("");
$("#txt_fech").val("");
$("#txt_dni").val("");
$("#txt_tel").val("");
$('#txt_pago').val("");
$("#txt_codig").val("");
$("#cbm_grado").val("");
$("#cbm_sexo").val("");
$("#contra").val("");
$("#direccion").val("");

}

