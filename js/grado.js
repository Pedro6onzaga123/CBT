function AbrirModalGrado() {
    $("#modal_regist_grado").modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    Combo_aulas();
    $("#modal_regist_grado").modal('show');
}


function ModalverGradocurso() {
    $("#verGrado_Curso").modal({
        backdrop: 'static',
        keyboard: false
    })
    $("#verGrado_Curso").modal('show');
    //$('#verGrado_Curso').remove();
}



function Combo_aulas() {
    $.ajax({
        "url": "../controlador/aula/controlador_combo_aula.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "&nbsp;&nbsp; Aforro:" + data[i][2] + "&nbsp;&nbsp; Seccion: " + data[i][3] +  "</option>";
            }
            $("#cbm_aula").html(cadena);
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_aula").html(cadena);
        }
    })
}



var table_grado;
function listar_grados() {
    table_grado = $("#tabla_grados").DataTable({
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
            "url": "../controlador/grados/controlador_listar_niveles.php",
            type: 'POST'  
        },
        "columns": [{
            "data": "idgrado"
        }, {
            "data": "gradonombre"
        }, 

           {
            "data": "nombreaula"
        },

         {
            "data": "seccion"
        },
         {
            "data": "cantidad_alum"
        },
          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='agregar btn btn-warning'><i class=' glyphicon glyphicon-plus' title='agregar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='edit btn btn-primary'><i class=' fa fa-edit' title='edit'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='ver btn btn-info'><i class=' glyphicon glyphicon-eye-open' title='ver'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_grados_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#tabla_grados').DataTable().search($('#global_filter').val(), ).draw();
}


$('#tabla_grados').on('click', '.agregar', function() {
    var data = table_grado.row($(this).parents('tr')).data();
   
    if (table_grado.row(this).child.isShown()) {
        var data = table_grado.row(this).data();
    }
    $("#modal_agregar_curso").modal({
        backdrop: 'static',
        keyboard: false
    })
     $("#text_idgrado").val(data.idgrado).trigger("change");
     Combo_cursos();
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
      $('#tabla_lista_curso').hide();
    $("#modal_agregar_curso").modal('show');
      
})


$('#tabla_grados').on('click', '.ver', function() {
    var data = table_grado.row($(this).parents('tr')).data();
   
    if (table_grado.row(this).child.isShown()) {
        var data = table_grado.row(this).data();
    }
    //var id=data.idgrado;
    listar_Grado_Curso(data.idgrado);
    //ModalverGradocurso();
  
    
});

$('#tabla_grados').on('click', '.eliminar', function() {
    var data = table_grado.row($(this).parents('tr')).data();
    

    if (table_grado.row(this).child.isShown()) {
        var data = table_grado.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro que Quieres Eliminar?',
        text: "Una vez hecho se eliminaran toda esas relaciones",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Eliminar_Grado(data.idgrado);
        }
    }) 

})

$('#tabla_grados').on('click', '.edit', function() {
    var data = table_grado.row($(this).parents('tr')).data();
    
    if (table_grado.row(this).child.isShown()) {
        var data = table_grado.row(this).data();
        var idgrado=data.idgrado;
    }
    var idgrado=data.idgrado;
    $("#modaupdate_grado").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modaupdate_grado").modal('show');
    $("#idGrado").val(idgrado);
    $("#nom_edit").val(data.gradonombre);
    $("#edit_aula").val(data.nombreaula).trigger("change");
    $("#seccion_edit").val(data.seccion).trigger("change");
    $("#edit_vacante").val(data.cantidad_alum);
    $("#estado_edit").val(data.gradostatus).trigger("change");
})

function Update_Grado(){
var idgrado   = $("#idGrado").val();
var nombregrad =   $("#nom_edit").val();
var numvaca  =  $("#edit_vacante").val();
var estadograd  =  $("#estado_edit").val();

 $.ajax({
        "url": "../controlador/grados/controlador_editar_grado.php",
        type: 'POST',
        data: {
           idgrado:idgrado,
           nombregrad:nombregrad,
           numvaca:numvaca,
           estadograd:estadograd 
        }
    }).done(function(resp) {
        if (resp > 0) {
             $("#modaupdate_grado").modal('hide');
               
            Swal.fire("Mensaje De Confirmacion", "El Grado se Actualizo con exito", "success").then((value) => {
                table_grado.ajax.reload();
            });
        }
    })


}


function Registrar_Grado(){
    var nomb=$("#txt_nom").val();
    var vact=$("#vacantes").val();
    var sem =$("#cbm_semestre").val();
    var aula =$("#cbm_aula").val();
    var numeroaula = $('#cbm_aula option:selected ').text();
    var vector =  numeroaula.slice(17, -10);

    if (nomb.length == 0 || vact.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
     }

     //if (vact>vector) {
        //return Swal.fire("Mensaje De Advertencia", "Alua no soporta para esa cantidad de alumnos", "warning");
    // }
     $.ajax({
        "url": "../controlador/grados/controlador_registrar_grado.php",
        type: 'POST',
        data: {
           nomb:nomb,
           vact:vact,
           sem:sem,
           aula:aula 
        }
    }).done(function(resp) {
        if (resp > 0) {
             $("#modal_regist_grado").modal('hide');
               
            Swal.fire("Mensaje De Confirmacion", "El Grado se registro con exito", "success").then((value) => {
                table_grado.ajax.reload();
            });
        }
    })

}

function Eliminar_Grado(idgrado) {
    
    $.ajax({
        "url": "../controlador/grados/controlador_eliminar_grado.php",
        type: 'POST',
        data: {
           idgrado: idgrado 
        }
    }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "El Grado se Elimino con exito", "success").then((value) => {
                table_grado.ajax.reload();
            });
        }
        else{

        return Swal.fire("Mensaje De Advertencia", "Lo sentimos No se pudo eliminar,Elgrado esta Activo,El grado esta siendo usado en Alumnos,Pagos,Horarios,Docente,Cursos,Primero quita de estas opciones", "warning");
            
        }
    })
}


function Combo_cursos() {///CURSOS DE STADO LIBRE
    $.ajax({
        "url": "../controlador/curso/controlador_curso_general.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_curso").html(cadena);
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_curso").html(cadena);
        }
    })
}


function Cursos_Select(){
    $('#avisomanual').hide();
    $('#tabla_lista_curso').show();
     var idcurso = $('#cbm_curso').val();
      var nombcurso = $('#cbm_curso option:selected').text();
   
    //alert(idmat+'--'+nomate);
    
    if (verificaridcurso(idcurso)) {//cursos no se repiten
        return Swal.fire("Mensaje de Advertencia", "curso ya seleccionado! para este grado", "warning");

    }
    var datos_add = "<tr>";
    datos_add += "<td for='id'>" + idcurso + "</td>";
    datos_add += "<td >" + nombcurso + "</td>";
    datos_add += "<td><button class='btn btn-danger' onclick = 'remove(this)'> <i class='fa fa-trash'></button></i></td>";
    datos_add += "<tr>";
    $("#tbody_tabla_lista_curso").append(datos_add);
}

function verificaridcurso(idnuevo) {
    let ident = document.querySelectorAll('#tbody_tabla_lista_curso td[for="id"]');
    return [].filter.call(ident, td => td.textContent == idnuevo).length == 1;
}

function remove(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    
}

function Registrar_Cursogrado(){

    var idgrado  = $("#text_idgrado").val();
    var semestre  = $("#gradSemt").val();
   
    var cont = 0;
    var arregloidcurso = new Array();
    $('#tbody_tabla_lista_curso#tbody_tabla_lista_curso tr').each(function() {
        arregloidcurso.push($(this).find('td').eq(0).text());
        cont++;
    });
   
 // alert(arregloidcurso+'--'+semestre);
    var vect = arregloidcurso.toString(); //
    if (cont == 0) {
        return;
    }
    $.ajax({
        url: '../controlador/grados/controlador_curso_grado.php',
        type: 'POST',
        data: {
            idgrado:idgrado,
            semestre:semestre,
            vect: vect
            
        }
    }).done(function(resp) {
        if (resp == 0 || resp==1 ) {
          //VACEANDO EL CONTENIDO DE LA TABLA
              $('#modal_agregar_curso .modal-body').find("#tbody_tabla_lista_curso").html("");
              ///
            $("#modal_agregar_curso").modal('hide');
            Swal.fire("Mensaje De Confirmacion", "Los cursos se agregaron ,con exito", "success").then((value) => {
                listar_grados();    
                table_grado.ajax.reload();
            });
        } else {
            Swal.fire("Mensaje De Error", "No se completo el registro", "error");
        }
    })
}



var vercur;
function listar_Grado_Curso(id){ 
     $('#tablagardocurso').show();
     vercur = $("#tablagardocurso").DataTable({
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
            "url": '../controlador/grados/controlador_verGrado_curso.php',
            type: 'POST',
            data:{id:id}  
        },
        "columns": [{
            "data": "idcurso"
        }, {
            "data": "cursoCodigo"
        }, {
            "data": "nonbrecurso"
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tablagardocurso_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}



$('#tablagardocurso').on('click', '.eliminar', function() {
    var data = vercur.row($(this).parents('tr')).data();
    

    if (vercur.row(this).child.isShown()) {
        var data = vercur.row(this).data();
        var idcapturado=data.idcurso;
    }
    var idcapturado=data.idcurso;
     $.ajax({
        url: '../controlador/grados/controlador_Quitar_curso.php',
        type: 'POST',
        data: {
            idcapturado:idcapturado
        }
    }).done(function(resp) {
         console.log(resp);
        if (resp > 0) {
            vercur.ajax.reload();
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo QUITAR!! Curso está asignado a un docente,primero quita del docente que está dictando el curso,luego vuelves a intentarlo.", "warning");
        }
    })

})


