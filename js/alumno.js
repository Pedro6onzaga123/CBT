


//FUNCION LISTAR CURSOS DEL ALUMNO SEGUN EL GRADO
var cursos_table;
function listar_cursosAlumno(idGrado) {
   //var idGrado  =$("#AlumIDgrado").val();
    //var idGrado  =$("#idGrado").val();
    cursos_table = $("#table_cursos").DataTable({
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
            "url": "../controlador/alumno/controlador_listar_cursosAlum.php",
            type: 'POST',
            data:{idGrado:idGrado}  
        },
        "columns": [{
            "data": "idcurso" 
        }, {
            "data": "nonbrecurso"
        }, 
         {
            "data": "stadodocent",
             render: function(data, type, row) {
                if (data == 'DICTANDO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-info'>" + data + "</span>";
                }
            }
        },
          {
            "defaultContent": "<button style='font-size:13px;' type='button' class='vernotas btn btn-warning'><i class=' glyphicon glyphicon-eye-open' title='ver Notas'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("table_cursos_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}
function filterGlobal() {
    $('#table_cursos').DataTable().search($('#global_filter').val(), ).draw();
}

$('#table_cursos').on('click', '.vernotas', function() {
    var data = cursos_table.row($(this).parents('tr')).data();
    

    if (cursos_table.row(this).child.isShown()) {
        var data = cursos_table.row(this).data();
        var idcurso=data.idcurso;
    }
     $("#Cursonom").html(data.nonbrecurso).trigger("change");//SUBIENDO nomb CURSO A LA VISTA
     $('#divtablanotas').show();//PRECENTANDO EL DIV 
      //$('#divprocentaje').show();//PRECENTANDO EL DIV procentaje
    var idcurso=data.idcurso;
    // alert(idcurso);
     Listar_Notas(idcurso);


})


function toggleIcon() {
  var icono = document.getElementById("icono");
  icono.classList.remove("fa-print"); // Elimina la clase actual si existe
  icono.classList.add("fa-refresh"); // Agrega la nueva clase
}
function toggleIcon1() {
  var icono1 = document.getElementById("icono");
  icono1.classList.remove("fa-refresh"); // Elimina la clase actual si existe
  icono1.classList.add("fa-print"); // Agrega la nueva clase
}

function printNotas(btnRegister){
var notas = notaFilter;
  btnRegister.disabled = true;
    toggleIcon();
     filtrarRegistrosPorFecha(notas,btnRegister);
}

function filtrarRegistrosPorFecha(notas,btnRegister) {
  try {
    if(notas.length==0){
       btnRegister.disabled = false;
       toggleIcon1();
      return;
    } 
   
    fetch('../controlador/print/Controller-print-notas-individual-pdf.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
      },
    body: JSON.stringify(notas), // Convierte el objeto a formato JSON
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
       btnRegister.disabled = false;
       toggleIcon1();

      return response.blob();
    })
    .then(blob => {
      const pdfData = URL.createObjectURL(blob);
     const nuevaVentana = window.open(pdfData, '_blank');

      if (!nuevaVentana) {
         Swal.fire("Mensaje de error",'No se pudo abrir la nueva ventana.', "error");
      }
    })
    .catch(error => console.error('Error al generar o obtener el PDF:', error));
  } catch (error) {
    Swal.fire("Mensaje de error",'Error en la función filtrarRegistrosPorFecha:'+error, "error");
  }

  
}




var notaFilter;

function Listar_Notas(idcurso){
    var idalumo  =$("#textId").val();
    //alert('curso '+idcurso+' alumno'+idalumo);

     $.ajax({
           "url": "../controlador/alumno/Controller_notas_curso_alumno.php",
             type: 'POST',
             data:{
                idcurso:idcurso,
                idalumo:idalumo
             }
            }).done(function(resp) {

              
        var datos = JSON.parse(resp);
         notaFilter  = datos;
        
        if ((datos.length == 0)) {

          $('#tabla_notas').html('<br> <center> REGISTRO DE NOTAS ESTA VACIO !!</center>');
          $('#tfoot').hide();
          return;
        }else{
          $('#tfoot').show();
          
            var pract = 0;
             var tra = 0;
              var par = 0;
              var ex1 =0;
              var ex2 =0,pondfi=0,acum1=0,acum2=0,acum3=0;
        var template = '';
        datos.forEach(tarea => {
            template += `
                   <tr>
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
                   <td hidden>${pract = ( parseFloat(tarea.practica1)+ parseFloat(tarea.practica2)+parseFloat(tarea.practica3)+parseFloat(tarea.practica4))}</td>
                   <td hidden>${tra = (parseFloat(tarea.trabajo1)+parseFloat(tarea.trabajo2)+parseFloat(tarea.trabajo3)+parseFloat(tarea.trabajo4))}</td>
                   <td hidden>${par = (parseFloat(tarea.parcial1)+parseFloat(tarea.parcial2)+parseFloat(tarea.parcial3)+parseFloat(tarea.parcial4))}</td>
                    <td hidden>${ex1 = (parseFloat(tarea.exsamen1)*20/100 )}</td>
                    <td hidden>${ex2 = (parseFloat(tarea.exsamen2)*20/100 )}</td>

                    <td hidden>${acum1 = ((pract/4)*20/100)}</td>
                    <td hidden>${acum2 = ((tra/4)*20/100)}</td>
                    <td hidden>${acum3 = ((par/4)*20/100)}</td>

                    <td hidden>${pondfi = (parseFloat(acum1)+parseFloat(acum2)+parseFloat(acum3)+parseFloat(ex1)+parseFloat(ex2))}</td>
                   </tr>

                 ` 
                  });
 

                  $('#tabla_notas').html(template);

                  $('#totalparcticas').html(acum1);
                  $('#totaltrabajo').html(acum2);
                  $('#totalparciales').html(acum3);

                  $('#examen1').html(ex1);
                  $('#2examen').html(ex2);

                  if (pondfi<=10.5) {
                   $('#pondefinal').html('<a href="#" class="text-danger" >'+pondfi+'</a>');
                  }else{
                   $('#pondefinal').html('<a href="#" class="text-primary">'+pondfi+'</a>');
                  }
                  }
                  //$('#tabla_notas').html('<br> <center> REGISTRO DE NOTAS ESTA VACIO !!</center>');
           
    })

    }

function aluas_de_clases(idgrado){
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
            "url": "../controlador/alumno/controlador_listar_aulas.php",
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


//FUNCION DE PAGOS ALUMNO
var table_agos;
function pagos_penciones(id){
//var id  =$("#UserNom").val();

 var table_agos = $("#tabla_pagos").DataTable({
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
      },{
        "extend":    'csvHtml5',
        "text":      '<i class="fa  fa-file-excel-o"></i> ',
        "titleAttr": 'cvs',
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
            "url": "../controlador/alumno/controlador_meses_pagasosAlum.php",
            type: 'POST',
            data:{id:id}  
        },
        "columns": [{
            "data": "montopago" 
        }, {
            "data": "description"
        },
        {
            "data": "fechasPagados"
        },
        {
            "data": "fechaUpdate"  
        },
        {
            "data": "stado",
            render: function(data, type, row) {
                if (data == 'PAGADO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        },
         
         ],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_pagos_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });


}

function estadi_deudasAlum(){
var idalum = $("#textId").val();

 $.ajax({
        url:'../controlador/alumno/controlador_Estado_pagos.php',
        type:'POST',
        data:{ idalum: idalum}
    }).done(function(resp) {
      
        var data = JSON.parse(resp);
         $("#ApellidoAlumno").html(data[0]['apellidop']);///enviando a la vista Calificaciones id grado
         //$("#nombreGrado").html(data[0][1]).trigger("change");
         $("#nombreAlumno").html(data[0]['alumnonombre']);
         $("#gradoAlumno").html(data[0]['gradonombre']);

         var utip=(data[0]['fechaRegisto']);

         var fecha = new Date(utip);
         var options = { year: 'numeric', month: 'long', day: 'numeric' };
         var ultimopago = fecha.toLocaleDateString("es-ES", options)
         $("#Ultimoaporte").html( ultimopago);

         var mespag=(data[0]['fechaUpdate']);

         var fecha = new Date(mespag);
         var options = { year: 'numeric', month: 'long', day: 'numeric' };
         var mespago = fecha.toLocaleDateString("es-ES", options)

         $("#mesdepago").html(mespago);

         var estado=(data[0]['stadoPago'])

         if (estado =='PAGADO') {
          $("#estadopago").html(estado);
         }else
         {
          $("#estadeuda").html(estado);
         }
      pagos_penciones(data[0]['apellidop']);

    })

}