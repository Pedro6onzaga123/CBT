
var files;
function Listar_Asitencia_alumno(){

 files = $("#tabla_asistencia").DataTable({
        
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/alumno/Controller_asistencia.php",
            type: 'POST'  
        },
        "columns": [
        {"data": "gradonombre"},
        {"data": "Fechas"},
        { "data": "Est_Asis",
        render: function(data, type, row) {
                if (data == 1) {
                     return "<span class='label label-success'>Asistió</span>";
                } else {
                     return "<span class='label label-danger'>Faltó</span>";
                }
            } },
        { "data": "yearid" }],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_asistencia_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });

    
}
function filterGlobal() {
    $('#tabla_asistencia').DataTable().search($('#global_filter').val(), ).draw();
}