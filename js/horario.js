
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

             //$('#cbm_grado').html(cadena);////lamndo en vista matricula
            $('#txt_gradoH').html(cadena);////lamndo en crer horari

           var grado = $('#txt_gradoH').val();//capturando el idel de se nivel
            traerCursos_Grado(grado);  
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#txt_gradoH").html(cadena);
           
        }
    })
}
function traerCursos_Grado(grado){
 //alert(grado);

}

////////SEMESTRE/////

function SemstreActualH(){

 $.ajax({
        "url": "../controlador/administrador/controlador_semestre_actual.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
    
            $('#HsemestreHsem').html(cadena);//navegador navV 
            $('#inpHsemestreH').html(cadena);

        } else {
            cadena += "<option value=''>NO SE ENCONTRARON SEMETRE</option>";
            $("#HsemestreHsem").html(cadena);//navegador navV

           
        }
    })

}
/////////GESTION DE HORARIOS///////////

function crearHorarios() {

               
               // var idsemet=$("inpHsemestreH").val();
               
                var dragged;
                var copia;
                var idcurso;
                //alert(id);
                /* events fired on the draggable target */
                document.addEventListener("drag", function (event) {
                    

                }, false);

                document.addEventListener("dragstart", function (event) {
                    
                    // store a ref. on the dragged elem
                    dragged = event.target;
                    // make it half transparent
                    event.target.style.opacity = .10;

                    idcurso = event.target.getAttribute("idcurso");

                    copia = "<div> "+dragged.innerHTML+"<br ><a style='margin-left:4px;' href='javascript:void(0)'><span class='label label-danger'><i class=' fa fa-trash-o'></i></span>&nbsp;Eliminar</a></div>";

                    event.dataTransfer.setData('Text', copia);

                }, false);

                document.addEventListener("dragend", function (event) {
                   
                    // reset the transparency
                    event.target.style.opacity = "";
                }, false);

                /* events fired on the drop targets */
                document.addEventListener("dragover", function (event) {
                   
                    // prevent default to allow drop
                    event.preventDefault();
                }, false);

                document.addEventListener("dragenter", function (event) {
                  
                    // highlight potential drop target when the draggable element enters it
                    if (event.target.className == "dropzone") {
                        event.target.style.background = "#EAF0E7";
                    }

                }, false);

                document.addEventListener("dragleave", function (event) {
                 
                    // reset background of potential drop target when the draggable element leaves it
                    if (event.target.className == "dropzone") {
                        event.target.style.background = "";
                    }

                }, false);

                document.addEventListener("drop", function (event) {
                    
                    // prevent default action (open as link for some elements)
                    event.preventDefault();
                    // move dragged elem to the selected drop target
                    if (event.target.className == "dropzone") {
                        event.target.style.background = "";

                        event.target.innerHTML = event.dataTransfer.getData("Text");
                        var hora = event.target.getAttribute("idhora");
                        var dia = event.target.getAttribute("iddia");
                        var idtd = event.target.getAttribute("id");
                        
                        var idhorario = event.target.getAttribute("idhorario");
                        var curso = idcurso;

                        $("#" + idtd + " > div > a").click(function () {

                             

                            eliminarhorario(idtd);
                        });
                        var idgradoH=$("#txt_gradoH").val();
                         
                        
                        guardarhorario(hora, dia, curso, idtd,idgradoH);


                        event.target.style.height = "auto";

                    }


                }, true);
            }

            var selecionado = [];
           var controladorEvent = 0;
           var tds = [];

            function guardarhorario(hora, dia, idcurso, idtd,idgradoH) { 

                // if (controladorEvent == 0) {
                      // Verificar si el idtd ya existe en el vector selecionado
const existeIdtd = selecionado.some(item => item.idtd === idtd);

// Si el idtd no existe, agregar el nuevo elemento
if (!existeIdtd) {
  selecionado.push({
    idtd: idtd,
    hora: hora,
    dia: dia,
    idcurso: idcurso,
    idgrado: idgradoH
  });
}


                       //  controladorEvent++
                       //  return;
                    // } else {
       
                        // controladorEvent = 0;
                     //}
           
               /* var data = {idaleat:idaleat,idtd:idtd,
                    hora: hora,
                     dia: dia,
                      curso: curso,
                      idgradoH:idgradoH
                      
                  };
                
                var url = "../controlador/horario/controlador_registra_horario.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    success: function (r) {
                         
                        var d = JSON.parse(r);
                        $('#' + idtd).attr('idhorario', d['id']);
                        swal({
                              text: "Listo!",
                                });
                    }
                });*/
            }

            function eliminarhorario(idtd) {
                 selecionado = selecionado?.filter(item => item.idtd !== idtd);
                $("#" + idtd).empty();
                 $("#" + idtd).css("height", "50px");

                var data1 = {horario: $('#' + idtd).attr('idhorario')};

                var url = "../controlador/horario/controlador_eliminar_horario.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data:{idtd: idtd},
                    success: function (r) {
                        var d = JSON.parse(r);
                        $("#" + idtd).empty();
                        $("#" + idtd).css("height", "50px");
                        //alert("ok");

                    }
                });

            }

function Registrar_Horario(){

    console.log(selecionado);
     //console.log(tds);

   // return;
      var horarios= JSON.stringify(selecionado);
      $.ajax({
        url: "../controlador/horario/controlador_prueva_.php",
        type: 'POST',
        data: {
            horarios: horarios
            
        }
        }).done(function(resp) {

            if (resp==1) {
                selecionado=[];
                  Swal.fire("Mensaje De Confirmacion", "El Horario Se Registro", "success").then((value) => {
                  $("#contenido_principal").load("horario/vista_listar_horario.php");  
                 });
            }

            if(resp==100){
              return Swal.fire("Mensaje De Advertencia", "Horario Para el grado ya existe.Cambie de grado pero antes quita todo los cursos de los casilleros.", "warning");
            }

            if(resp==500){
              return Swal.fire("Mensaje De Advertencia", "Debes seleccionar al menor un curso.", "warning");
            }
            
        
         });

}


            function crearidaleatorio(){
               var numero ="9182736534"
               var id      = "";
               for (var i = 0; i <4; i++) {
                id+=numero.charAt(Math.floor(Math.random()*numero.length));  
               }
               $("#id_horario").val(id);

            }



       
      var table_horario;
     function listar_Horarios() {
        
    table_horario = $("#tabla_horarios").DataTable({
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
            "url": "../controlador/horario/controlador_listar_horario.php",
            type: 'POST'  
        },
        "columns": [{
            "data": "gradoid"
        }, {
            "data": "gradonombre"
        },

         {
            "data": "statushorario",
            render: function(data, type, row) {
                if (data == 'ACTIVO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='verhorario btn btn-info'><i class='glyphicon glyphicon-eye-open' title='ver horario'></i></button>&nbsp; <button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true,
    });
    document.getElementById("tabla_horarios_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
  

}
function filterGlobal() {
    $('#tabla_horarios').DataTable().search($('#global_filter').val(), ).draw();

}     


$('#tabla_horarios').on('click', '.verhorario', function() {
    var data = table_horario.row($(this).parents('tr')).data();
   
    if (table_horario.row(this).child.isShown()) {
        var data = table_horario.row(this).data();
    }
  var id=data.gradoid;
   $('.loader').show();
      $("#codigoHorario").val(data.gradoid);
       $("#variableJS").val(data.gradoid);

 $("#contenido_principal").load("horario/mostrar_horario.php?id="+id); 

     /* $.ajax({
        url: '../vista/horario/prueva.php',
        type: 'POST',
       data: {id : id}

        }).done(function(resp) {
            alert(resp);
             $('.loader').hide();
                ModalHorarioAbrir();

         });*/
});

$('#tabla_horarios').on('click', '.eliminar', function() {
    var data = table_horario.row($(this).parents('tr')).data();
   
    if (table_horario.row(this).child.isShown()) {
        var data = table_horario.row(this).data();
    }
  var id=data.gradoid;
   $('.loader').show();

  $.ajax({
        url:'../controlador/horario/controlador_delete_registro.php',
        type:'POST',
        data:{
            id:id

        }
    }).done(function(resp){
        $('.loader').hide();
      if (resp>0) {
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente,Eliminado", "success").then((value) => {
                    table_horario.ajax.reload();
                });    
            } else {
                Swal.fire("Mensaje De Error", "No se pudo Eliminar", "error");
            }
    });


});


function ModalHorarioAbrir() {
    $("#modalHhorario").modal({
        backdrop: 'static',
        keyboard: false
    })
    $("#modalHhorario").modal('show');
}


//https://www.stechies.com/uncaught-syntaxerror-unexpected-end-json-input/


function Regresar(){
 $("#contenido_principal").load("horario/vista_listar_horario.php");    
}