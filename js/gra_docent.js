

var tablegrado;
function listar_gradosdocente() {
    var iddocente=$("#textId").val();

    tablegrado = $("#grados_table").DataTable({
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
            "url": "../controlador/docente/controlador_listar_gradosasig.php",
            type: 'POST',
            data:{iddocente:iddocente}  
        },
        "columns": [{
            "data": "idgrado" 
        }, {
            "data": "gradonombre"
        }, 

         {
            "data": "cantidad_alum"
        },
          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='vercursos btn btn-info'><i class=' glyphicon glyphicon-eye-open' title='ver'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("grados_table_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#grados_table').DataTable().search($('#global_filter').val(), ).draw();
}

$('#grados_table').on('click', '.vercursos', function() {
    var data = tablegrado.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (tablegrado.row(this).child.isShown()) {
        var data = tablegrado.row(this).data();
        var idgrado=data.idgrado;
    }
    var idgrado=data.idgrado;
     $('#divcursosdelgraro').show()//div cursos del grado
     $('#DivReportes').hide();
    $('#divAlumnos').hide();
    $("#idgrado").val(idgrado);//SUBIENDO ID GRADO A LA VISTA
    $("#nombregrado").html(data.gradonombre);//SUBIENDO NOMBRE DE GRADO A LA VISTA

     

    listar_gradoscurso(idgrado);
})

var gradocurso
function listar_gradoscurso(idgrado) {
  var iddoce=$("#textId").val();
    $('#cursos_table').show();
    gradocurso = $("#cursos_table").DataTable({
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
            "url": "../controlador/docente/controlador_gardossuscursos.php",
            type: 'POST',
            data:{idgrado:idgrado,iddoce:iddoce}  
        },
        "columns": [{
            "data": "idcurso" 
        }, {
            "data": "nonbrecurso"
        }, 

          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='veralumnos btn btn-warning'><i class=' fa  fa-user' title='ver'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("cursos_table_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}

$('#cursos_table').on('click', '.veralumnos', function() {
    var data = gradocurso.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (gradocurso.row(this).child.isShown()) {
        var data = gradocurso.row(this).data();
        var idcursogrado=data.idcurso;
    }
     var idgradoencurso =$("#idgrado").val();
     var idcursogrado=data.idcurso;
     $('#divAlumnos').show();//PRECENTANDO EL DIV
     $("#idcurso").val(idcursogrado);//SUBIENDO ID CURSO A LA VISTA
     $("#nombreCurso").html(data.nonbrecurso);


   listaralumnos_del_grado(idgradoencurso);
   //alert('grado:'+idgradoencurso+ 'curso: '+idcursogrado);
    
})

var tableAlumnos;
function listaralumnos_del_grado(idgradoencurso){
     var idcurso =$("#idcurso").val();
    $('#alumnos_del_curso').show();

    tableAlumnos = $("#alumnos_del_curso").DataTable({
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
            url: "../controlador/docente/controlador_alumnos_listar_Notas.php",
            type: 'POST',
            data:{idgradoencurso:idgradoencurso,idcurso:idcurso}
        },

        "columns": [
        { "data": "idalumno"}, 
        { "data": "apellidop"},
        {"data": "alumnonombre"},
        {"data": "nota",
         render: function(data, type, row) {
                if (data == 0) {
                    return "<button style='font-size:13px;' type='button' class='notas btn btn-warning'><i class='fa fa-plus-square' title='Notas'></i></button>";
                } else {
                    return " <button style='font-size:13px;' type='button' class='editar btn btn-info'><i class='fa fa-edit' title='editar'></i></button>&nbsp;"+
                     "<button style='font-size:13px;' type='button' class='vernotas btn btn-prymari'><i class=' glyphicon glyphicon-eye-open' title='ver notas'></i></button>";
                }
            }



        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("alumnos_del_curso_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {

        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}


function Reporte_regres(){
  $("#DivReportes").hide();
   $("#divAlumnos").show();
}

var tbls_Reporte;

function Reporte_Notas(){
  $("#divAlumnos").hide();
  $("#DivReportes").show();

 var gradoID = $("#idgrado").val();//SUBIENDO ID GRADO A LA VISTA
  var cursoID =  $("#idcurso").val();//SUBIENDO ID CURSO A LA VISTA

 var tbls_Reporte = $("#reportExel").DataTable({
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
        "text":      '<i class="fa fa-download"></i> ',
        "titleAttr": 'Exportar a PDF',
        "className": 'btn btn-danger'
        
      },
      {
        "extend":    'print',
        "text":      '<i class="fa fa-print"></i> ',
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },
       {
        "extend":    'excel',
        "text":      '<i class="fa fa-file-text-o"></i> ',
        "titleAttr": 'Excel',
        "className": 'btn btn-info'
      }/*,{
                extend: 'collection',
                text: 'Export',
                buttons: [
                    'copy',
                    'excel',
                    'csv',
                    'pdf',
                    'print'
                ]
            }*/
      ],
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/docente/Listar_alumnos_reportesN.php",
            type: 'POST',
            data:{gradoID:gradoID,cursoID:cursoID}  
        },
        "columns": [{
            "data": "apellidop" 
        }, 
        {
            "data": "alumnonombre"
        },
        {
            "data": "gradonombre"
        },{
            "data": "nonbrecurso"
        },
        {
            "data": "practica1"
        },
        {
            "data": "practica2"  
        },
        {
            "data": "practica3"  
        },
        {
            "data": "practica4"  
        },
        {
            "data": "trabajo1"  
        },{
            "data": "trabajo2"  
        },{
            "data": "trabajo3"  
        },
        {
            "data": "trabajo4"  
        },
        {
            "data": "parcial1"  
        },{
            "data": "parcial2"  
        },{
            "data": "parcial3"  
        },{
            "data": "parcial4"  
        },{
            "data": "exsamen1"  
        },{
            "data": "exsamen2"  
        },
         
         ],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("reportExel_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        //filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });










}



function filterGlobal() {
    $('#alumnos_del_curso').DataTable().search($('#global_filter').val(), ).draw();
}


$('#alumnos_del_curso').on('click', '.editar', function() {
    var data = tableAlumnos.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (tableAlumnos.row(this).child.isShown()) {
        var data = tableAlumnos.row(this).data();
        var idalumno =data.idalumno;

    }
    var idalumno =data.idalumno;
    var cursoid  = $("#idcurso").val();
   // alert('alumno: '+idalumno+' curso:'+cursoid);

    $("#edit_idalumno").val(idalumno);
    $("#edit_nombreAlumno").html(data.apellidop+','+data.alumnonombre);
   
   $.ajax({
           "url": "../controlador/docente/controlador_editar_nota.php",
             type: 'POST',
             data:{
                idalumno:idalumno,
                cursoid:cursoid
             }
            }).done(function(resp) {
               // alert(resp);
        var data= JSON.parse(resp);

            if ((data.length == 0)) {
            //recetearmodal();
             return Swal.fire("Mensaje De Advertencia", "NO HAY NOTAS PARA MOSTRAR Y EDITAR!!", "warning");

        }

      $("#modal_editar_notas").modal({
        backdrop: 'static',
        keyboard: false
        })
        $(".modal-header").css("background-color", "#05ccc4");
        $(".modal-header").css("color", "white");
       $("#modal_editar_notas").modal('show');
        
         $("#id_tablenota").val(data[0][0]);
        $("#edit_practica1").val(data[0][1]);
        $("#edit_practica2").val(data[0][2]);
        $("#edit_practica3").val(data[0][3]);
        $("#edit_practica4").val(data[0][4]);

        $("#edit_trabajo1").val(data[0][5]);
        $("#edit_trabajo2").val(data[0][6]);
        $("#edit_trabajo3").val(data[0][7]);
        $("#edit_trabajo4").val(data[0][8]);

        $("#edit_parcial1").val(data[0][9]);
        $("#edit_parcial2").val(data[0][10]);
        $("#edit_parcial3").val(data[0][11]);
        $("#edit_parcial4").val(data[0][12]);

        $("#edit_exsamen1").val(data[0][13]);
        $("#edit_exsamen2").val(data[0][14]);
           
    }) 
})

//RECETERAR MODAL DE NOTAS
function recetearmodal(){
       $("#edit_practica1").val('');
        $("#edit_practica2").val('');
        $("#edit_practica3").val('');
        $("#edit_practica4").val('');

        $("#edit_trabajo1").val('');
        $("#edit_trabajo2").val('');
        $("#edit_trabajo3").val('');
        $("#edit_trabajo4").val('');

        $("#edit_parcial1").val('');
        $("#edit_parcial2").val('');
        $("#edit_parcial3").val('');
        $("#edit_parcial4").val('');

        $("#edit_exsamen1").val('');
        $("#edit_exsamen2").val('');  
}

///REGISTRO DE NOTAS /////////////

$('#alumnos_del_curso').on('click', '.notas', function() {
    var data = tableAlumnos.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (tableAlumnos.row(this).child.isShown()) {
        var data = tableAlumnos.row(this).data();
        var idalumno =data.idalumno;

    }
    var idalumno =data.idalumno;
   $("#idalumno").val(idalumno);
   $("#nombreAlumno").html(data.apellidop);
  
     $("#modal_registro_notas").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_registro_notas").modal('show');
    
})

////VER NOTAS///
$('#alumnos_del_curso').on('click', '.vernotas', function() {
    var data = tableAlumnos.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (tableAlumnos.row(this).child.isShown()) {
        var data = tableAlumnos.row(this).data();
        var idalumno =data.idalumno;

    }
    var idalumno =data.idalumno;
    var cursoid  = $("#idcurso").val();

      $.ajax({
           "url": "../controlador/docente/controlador_ver_nota.php",
             type: 'POST',
             data:{
                idalumno:idalumno,
                cursoid:cursoid
             }
            }).done(function(resp) {
               // alert(resp);
        var datos = JSON.parse(resp);
      $("#ver_notas_modal").modal({
        backdrop: 'static',
        keyboard: false
        })
        $(".modal-header").css("background-color", "#05ccc4");
        $(".modal-header").css("color", "white");
       $("#ver_notas_modal").modal('show');

       /////
        if ((datos.length == 0)) {
            return;
        }else{
        var template = '';
        datos["data"].forEach(tarea => {
            template += `
                   <tr guardarId="${tarea.idnotas}">
                   <td>${tarea.practica1}</td>
                   <td>${tarea.practica2}</td>
                   <td>${tarea.practica3}</td>
                   <td>${tarea.practica4}</td>
                   <td>${tarea.trabajo1}</td>
                   <td>${tarea.trabajo2}</td>
                   <td>${tarea.trabajo3}</td>
                   <td>${tarea.trabajo4}</td>
                   <td>${tarea.parcial1}</td>
                   <td>${tarea.parcial2}</td>
                   <td>${tarea.parcial3}</td>
                   <td>${tarea.parcial4}</td>
                   <td>${tarea.exsamen1}</td>
                   <td>${tarea.exsamen2}</td>
                   <td><button class='btn btn-danger' onclick = 'QuitarNotas(this)'> <i class='fa fa-trash'></button></i></td>
                   </td>
                   </tr>
                 ` 

        });
        $('#tabla_notas').html(template);
        }
        /////   
           
    })
 $('#tabla_notas').html('<br> <center> NO HAY NOTAS REGISTRADOS !!</center>');  
    
})


function QuitarNotas(t) {
    var td = t.parentNode;
    var tr = td.parentNode;
    var idcapturado = $(tr).attr('guardarId');
    

   $.ajax({
        url: '../controlador/docente/controlador_Quitar_Notas.php',
        type: 'POST',
        data: {
            idcapturado:idcapturado
        }
    }).done(function(resp) {
        if (resp > 0) {
             var table = tr.parentNode;
            table.removeChild(tr);
        } else {
            Swal.fire("Mensaje De Advertencia", "No se pudo QUITAR!! ", "warning");
        }
    })
   
}

var cont1= 0;
function Addnotas(){
if (cont1 == 0) {
    cont1++;
       var scntDiv1 = $('#dynamicDiv');

              $('<div id="divinput"><div class="col-lg-5"><label for="">Práctica 3:</label><input type="number" class="form-control" id="practica3" placeholder="parcial 3" ></div><br><div class="col-lg-5"><label for="">Práctica 4:</label><input type="number" class="form-control"  id="practica4" placeholder="parcial 4" > </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="remInput">'+
                '<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(scntDiv1);
              return false; 
      }
      if (cont1>0) {
        $("#incorecto").show();
      }
}

$(document).on('click', '#remInput', function () {
    cont1--;
    $("#incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });



var cont2 = 0;
function Addtrabajo(){
if (cont2 == 0) {
    cont2++;
       var divtrabj = $('#divtrabajo');
              $('<div id="divinput"><div class="col-lg-5"><label for="">Trabajo 3:</label><input type="number" class="form-control" id="trabajo3" placeholder="ingrese Nota"  ></div><br><div class="col-lg-5"><label for="">trabajo 4:</label><input type="number" class="form-control"  id="trabajo4" placeholder="ingrese Nota" > </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="remtrabaj">'+'<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(divtrabj);
              return false;

      }

   
      if (cont2>0) {
        $("#incorecto").show();
      }


}

$(document).on('click', '#remtrabaj', function () {
    cont2--;
    $("#incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });

var cont3=0;
function AddParcial(){
if (cont3 == 0) {
    cont3++;
       var divparcial = $('#divparcial');
              $('<div id="divinput"><div class="col-lg-5"><label for="">Parcial 3:</label><input type="number" class="form-control" id="parcial3" ></div><br><div class="col-lg-5"><label for="">Patcial 4:</label><input type="number" class="form-control"  id="parcial4"  > </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="remparcial">'+'<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(divparcial);
              return false;

      }

  
      if (cont3>0) {
        $("#incorecto").show();
      }
}

$(document).on('click', '#remparcial', function () {
    cont3--;
    $("#incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });


function Registro_notas(){
 var gradoID = $("#idgrado").val();//SUBIENDO ID GRADO A LA VISTA
var curso    =$("#idcurso").val();
var alumnoid    =$("#idalumno").val();
    
var practica1 =$("#practica1").val();
var practica2 =$("#practica2").val();
var practica3 =$("#practica3").val();
var practica4 =$("#practica4").val();    

var trabajo1 =$("#trabajo1").val();
var trabajo2 =$("#trabajo2").val();
var trabajo3 =$("#trabajo3").val();
var trabajo4 =$("#trabajo4").val();    


var parcial1 =$("#parcial1").val();
var parcial2 =$("#parcial2").val();
var parcial3 =$("#parcial3").val();
var parcial4 =$("#parcial4").val();    


var exsamen1 =$("#exsamen1").val();
var exsamen2 =$("#exsamen2").val();


 $.ajax({
        "url": "../controlador/docente/controlador_registrar_notas.php",
        type: 'POST',
        data: {
          gradoID:gradoID,
            curso:curso,
            alumnoid:alumnoid,

            practica1:practica1,
            practica2:practica2,
            practica3:practica3,
            practica4:practica4,
       
            trabajo1:trabajo1,
            trabajo2:trabajo2,
            trabajo3:trabajo3,
            trabajo4:trabajo4,

            parcial1:parcial1,
            parcial2:parcial2,
            parcial3:parcial3,
            parcial4:parcial4,

            exsamen1:exsamen1,
            exsamen2:exsamen2

        }
    }).done(function(resp) {
       
       if (resp > 0) {
            if (resp == 1) {

                $("#modal_registro_notas").modal('hide');

                Swal.fire("Mensaje De Confirmacion", "Registro de notas,se realizo con exito", "success").then((value) => {
               limpiarmodal_notas();
              

                   tableAlumnos.ajax.reload();
                });
            } else {
                 Swal.fire("Mensaje De Advertencia", "Lo sentimos Alumno ya tiene registrado sus notas para ese curso ,solo se puede Actualizar", "warning");
            }
        } else {
            Swal.fire("Mensaje De error", "No se pudo registrar las notas ", "error");
        }



        /*
        if (resp >0) {
                $("#modal_registro_notas").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Registro de notas,se realizo con exito", "success").then((value) => {
                limpiarmodal_notas();
                    //table.ajax.reload();
                });
            } else {
                return Swal.fire("Mensaje De Advertencia", "Lo sentimos Alumno ya tiene registrado sus notas solo pudes editar", "warning");
            }
        */
    })
} 

function limpiarmodal_notas(){
$("#practica1").val("");
$("#practica2").val("");
$("#practica3").val("");
$("#practica4").val("");    

$("#trabajo1").val("");
$("#trabajo2").val("");
$("#trabajo3").val("");
$("#trabajo4").val("");    


$("#parcial1").val("");
$("#parcial2").val("");
$("#parcial3").val("");
$("#parcial4").val("");    


$("#exsamen1").val("");
$("#exsamen2").val("");


}

////EDITAR NOTAS///

var edit_cont1= 0;
function Edit_Addnotas(){
if (edit_cont1 == 0) {
    edit_cont1++;
       var scntDiv1 = $('#Edit_dynamicDiv');

              $('<div id="divinput"><div class="col-lg-5"><label for="">Pra 3:</label><input type="number" class="form-control" id="edit_practica3" placeholder="parcial 3" value="0.0"></div><br><div class="col-lg-5"><label for="">Pra 4:</label><input type="number" class="form-control"  id="edit_practica4" placeholder="parcial 4" value="0.0"> </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="edit_remInput">'+
                '<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(scntDiv1);
              return false; 
      }
      if (edit_cont1>0) {
        $("#edit_incorecto").show();
      }
}

$(document).on('click', '#edit_remInput', function () {
    edit_cont1--;
    $("#edit_incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });



var editcont_2 = 0;
function Edit_Addtrabajo(){
if (editcont_2 == 0) {
    editcont_2++;
       var divtrabj = $('#Edit_divtrabajo');
              $('<div id="divinput"><div class="col-lg-5"><label for="">Trab 3:</label><input type="number" class="form-control" id="edit_trabajo3" placeholder="ingrese Nota" value="0.0" ></div><br><div class="col-lg-5"><label for="">trabajo 4:</label><input type="number" class="form-control"  id="edit_trabajo4" placeholder="ingrese Nota" value="0.0"> </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="editremtr">'+'<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(divtrabj);
              return false;

      }

   
      if (editcont_2>0) {
        $("#edit_incorecto").show();
      }


}

$(document).on('click', '#editremtr', function () {
    editcont_2--;
    $("#edit_incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });

var cont_edit3=0;
function Edit_AddParcial(){
if (cont_edit3 == 0) {
    cont_edit3++;
       var divparcial = $('#Edit_divparcial');
              $('<div id="divinput"><div class="col-lg-5"><label for="">Parcial 3:</label><input type="number" class="form-control" id="edit_parcial3" placeholder="ingrese Nota" value="0.0"></div><br><div class="col-lg-5"><label for="">Patcial 4:</label><input type="number" class="form-control"  id="edit_parcial4" placeholder="ingrese Nota" value="0.0"> </div><div class="col-lg-2"><br><a class="btn btn-danger btn-sm" class="col-lg-2" href="javascript:void(0)" id="remparcl_edit">'+'<span class="fa fa-trash" aria-hidden="true"></span> </a></div></div>'+
                ''+
                ''+
              ''+
          '').appendTo(divparcial);
              return false;

      }

  
      if (cont_edit3>0) {
        $("#edit_incorecto").show();
      }
}

$(document).on('click', '#remparcl_edit', function () {
    cont_edit3--;
    $("#edit_incorecto").hide();
  $(this).parents('#divinput').remove();
   return false;
    });



function Actualizar_notas(){

var curso  =$("#idcurso").val();
var alumnoid  =$("#edit_idalumno").val();
var idnotas  =$("#id_tablenota").val();
    
var practica1 =$("#edit_practica1").val();
var practica2 =$("#edit_practica2").val();
var practica3 =$("#edit_practica3").val();
var practica4 =$("#edit_practica4").val();    

var trabajo1 =$("#edit_trabajo1").val();
var trabajo2 =$("#edit_trabajo2").val();
var trabajo3 =$("#edit_trabajo3").val();
var trabajo4 =$("#edit_trabajo4").val();    


var parcial1 =$("#edit_parcial1").val();
var parcial2 =$("#edit_parcial2").val();
var parcial3 =$("#edit_parcial3").val();
var parcial4 =$("#edit_parcial4").val();    

var exsamen1 =$("#edit_exsamen1").val();
var exsamen2 =$("#edit_exsamen2").val();




    //alert(curso+'---'+alumnoid+'--'+practica3+'--'+practica4+'---'+trabajo3+'---'+trabajo4+'--'+parcial3+'-'+parcial4+'--'+exsamen2);
$.ajax({
        "url": "../controlador/docente/controlador_Actualizar_notas.php",
        type: 'POST',
        data: {
            curso :curso ,
            alumnoid:alumnoid,
            idnotas:idnotas,

            practica1:practica1,
            practica2:practica2,
            practica3:practica3,
            practica4:practica4,
       
            trabajo1:trabajo1,
            trabajo2:trabajo2,
            trabajo3:trabajo3,
            trabajo4:trabajo4,

            parcial1:parcial1,
            parcial2:parcial2,
            parcial3:parcial3,
            parcial4:parcial4,

            exsamen1:exsamen1,
            exsamen2:exsamen2

        }
    }).done(function(resp) {
               if (resp > 0) {
            if (resp == 1) {
                $("#modal_editar_notas").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Registro de notas,se realizo con exito", "success").then((value) => {
                limpiarmodal_notas();
                   // tableAlumnos.ajax.reload();
                });
            } else {
                return Swal.fire("Mensaje De Advertencia", "Lo sentimos Alumno ya tiene registrado sus notas", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }

    })

}


//FUNCIONPARA MOSTRAR GRADOS PARA ACCEDER A LAS AULAS

var tabal_grad_aula;
function listar_grados_aulas() {
    var iddocente=$("#textId").val();

    tabal_grad_aula = $("#tabal_grad_aula").DataTable({
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
            "url": "../controlador/docente/controlador_listar_gradosasig.php",
            type: 'POST',
            data:{iddocente:iddocente}  
        },
        "columns": [{
            "data": "idgrado" 
        }, {
            "data": "gradonombre"
        }, 

          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='veraulas btn btn-warning'><i class=' glyphicon glyphicon-eye-open' title='ver'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabal_grad_aula_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#tabal_grad_aula').DataTable().search($('#global_filter').val(), ).draw();
}

$('#tabal_grad_aula').on('click', '.veraulas', function() {
    var data = tabal_grad_aula.row($(this).parents('tr')).data();
    if (tabal_grad_aula.row(this).child.isShown()) {
        var data = tabal_grad_aula.row(this).data();
        var idgrado=data.idgrado;
    }
     var idgrado=data.idgrado;
     $("#gradoNomb").html(data.gradonombre);
     $('#divaulas').show()//div de aulas
   listaraulas(idgrado);
   //alert('grado:'+idgradoencurso+ 'curso: '+idcursogrado); 
})

var tala_aulas;
function listaraulas(idgrado){
 // alert(idgrado);
 var tala_aulas = $("#table_aulas").DataTable({
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
            "url": "../controlador/docente/controlador_listar_aulas.php",
            type: 'POST',
            data:{idgrado:idgrado}  
        },
        "columns": [{
            "data": "idaula" 
        }, {
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
         ],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("table_aulas_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  
}

//FUNCION PARA LOS HORARIOS DOCENTE

var table_horario;
function listar_horario_grados() {
    var iddocente=$("#textId").val();

    table_horario = $("#table_horario").DataTable({
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
            "url": "../controlador/docente/controlador_listar_gradosasig.php",
            type: 'POST',
            data:{iddocente:iddocente}  
        },
        "columns": [{
            "data": "idgrado" 
        }, {
            "data": "gradonombre"
        }, 

          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='verhorario btn btn-primary'><i class=' glyphicon glyphicon-eye-open' title='ver'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("table_horario_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#table_horario').DataTable().search($('#global_filter').val(), ).draw();
}

$('#table_horario').on('click', '.verhorario', function() {
    var data = table_horario.row($(this).parents('tr')).data();
    if (table_horario.row(this).child.isShown()) {
        var data = table_horario.row(this).data();
        var idgrado=data.idgrado;
    }
     var idgrado=data.idgrado; 
     $("#contenido_principal").load("docente/vista_horario_docente.php?idgrado="+idgrado);
     
       

     //div de Horarios
     //$("#gradoNomb").html(data.gradonombre);
    
   //listaraulas(idgrado);
   //alert('grado:'+idgradoencurso+ 'curso: '+idcursogrado); 
})

