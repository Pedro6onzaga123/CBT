

var table_docente;
function listar_Docentes() {

    table_docente = $("#tabla_Docente").DataTable({
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
        text: '<i class="fa fa-file-pdf-o"></i> PDF',
           title: 'REPORTE DE DOCENTES',
        className: 'btn btn-danger',
        style:'background-color:red'

        
      },{
        "extend":    'print',
        "text":      '<i class="fa fa-print"></i> Print',
           title: 'REPORTE DE DOCENTES',
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },

       {
        "extend":    'excel',
        "text":      '<i class="fa fa-file-text-o"></i> Exel ',
           title: 'RREPORTE DE DOCENTES',
        "titleAttr": 'Excel',
        "className": 'btn btn-info'
      },{
        "extend":    'csvHtml5',
        "text":      '<i class="fa  fa-file-excel-o"></i> Csv',
           title: 'REPORTE DE DOCENTES',
        "titleAttr": 'cvs',
        "className": 'btn btn-info'
      }
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
            url: "../controlador/docente/controlador_reporte_Docentes.php",
            type: 'POST'
        },

        "columns": [{ 
            "data": "iddocente"
        }, {
            "data": "nombre"
        }, {
            "data": "apellido"
        }, {
            "data": "sexo",
            render: function(data, type, row) {
                if (data == 'M') {
                    return "MASCULINO";
                } else {
                    return "FEMINO";
                }
            }
        }, {
            "data": "tipo"
        },{
            "data": "dni"
        },{
            "data": "status",
            render: function(data, type, row) {
                if (data == 'ACTIVO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }],
        "language": idioma_espanol,
        select: true
    });
}





var tab_alumno;
function listar_Alumnos() {

    tab_alumno = $("#table_alumno").DataTable({
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
        text: '<i class="fa fa-file-pdf-o"></i> PDF',
           title: 'REPORTE DE ALUMNOS',
        className: 'btn btn-danger',
        style:'background-color:red'

        
      },{
        "extend":    'print',
        "text":      '<i class="fa fa-print"></i> Print',
           title: 'REPORTE DE ALUMNOS',
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },

       {
        "extend":    'excel',
        "text":      '<i class="fa fa-file-text-o"></i> Exel ',
           title: 'RREPORTE DE ALUMNOS',
        "titleAttr": 'Excel',
        "className": 'btn btn-info'
      },{
        "extend":    'csvHtml5',
        "text":      '<i class="fa  fa-file-excel-o"></i> Csv',
           title: 'REPORTE DE ALUMNOS',
        "titleAttr": 'cvs',
        "className": 'btn btn-info'
      } 
     
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
            url: "../controlador/alumno/controlador_reporte_Alumno.php",
            type: 'POST'
        },

        "columns": [{
            "data": "idalumno"
        }, {
            "data": "apellidop"
        }, {
            "data": "alumnonombre"
        }, {
            "data": "dni"
        }, {
            "data": "telefono"
        }, {
            "data": "gradonombre"
        }, {
            "data": "sexo",
            render: function(data, type, row) {
                if (data == 'M') {
                    return "MASCULINO";
                } else {
                    return "FEMINO";
                }
            }
        }, {
            "data": "codigo"
        },
         {
            "data": "fechaRegisto"
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
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("table_alumno_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {

        filterUnoGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}
function filterUnoGlobal() {
    $('#table_alumno').DataTable().search($('#global_filter').val(), ).draw();
}




var talb_filAlum;
function Estraer_Lista_Range_Alum(){

	var finicio= $("#reportFechainicio").val();
	var fFinal= $("#reportFechafin").val();
  if(finicio.length == 0 || fFinal.length==0){
    return;
  }

     talb_filAlum = $("#table_alumno").DataTable({
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
        text: '<i class="fa fa-file-pdf-o"></i> PDF',
           title: 'REPORTE DE ALUMNOS',
        className: 'btn btn-danger',
        style:'background-color:red'

        
      },{
        "extend":    'print',
        "text":      '<i class="fa fa-print"></i> Print',
           title: 'REPORTE DE ALUMNOS',
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },

       {
        "extend":    'excel',
        "text":      '<i class="fa fa-file-text-o"></i> Exel ',
           title: 'RREPORTE DE ALUMNOS',
        "titleAttr": 'Excel',
        "className": 'btn btn-info'
      },{
        "extend":    'csvHtml5',
        "text":      '<i class="fa  fa-file-excel-o"></i> Csv',
           title: 'REPORTE DE ALUMNOS',
        "titleAttr": 'cvs',
        "className": 'btn btn-info'
      } 
     
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
            "url": "../controlador/alumno/reporte_lista_rango_fechas.php",
            type: 'POST',
            data:{finicio:finicio,fFinal:fFinal}  
        },
        "columns": [{
            "data": "idalumno"
        }, {
            "data": "apellidop"
        }, {
            "data": "alumnonombre"
        }, {
            "data": "dni"
        }, {
            "data": "telefono"
        }, {
            "data": "gradonombre"
        }, {
            "data": "sexo",
            render: function(data, type, row) {
                if (data == 'M') {
                    return "MASCULINO";
                } else {
                    return "FEMINO";
                }
            }
        }, {
            "data": "codigo"
        },
         {
            "data": "fechaRegisto"
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
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("table_alumno_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
}

