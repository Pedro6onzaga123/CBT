

function Listra_Cursos_Docente(){
    $.ajax({
     url:'../controlador/Asistensia/ControllerGetCursesDocente.php',
     type:'POST'

    }).done(function(resultado){
      var data = JSON.parse(resultado);
      if (data.length>0) {
      Componente_cursos_Docente(data)
      }else {
        $("#cursos_grado").html('<h3> No tienes cursos Asignados</h3>');
      }

    })

}

function Componente_cursos_Docente(data){
  var html='';
        $.each(data, function(i,elemt) {
        html += "<div class='col-md-3'  >";
        html += "<div class='info-box' id='divevent' tabindex='0' style='border-radius: 6px;cursor: pointer;background:#8a9b9a;color:white' onclick='Asignar_Asistensia("+elemt.curso_id+","+elemt.grado_id+")''>";
          html += "<span class='info-box-icon' style='width: 70px;border-radius: 6px'>";
            html += "<em class='fa fa-book '></em>";
          html += "</span>";
          html += "<div class='info-box-content'>";
            html += "<div class=''style='margin-top: 10px'>";
              html += "<h5 class=''><strong>"+elemt.nonbrecurso+"</strong></h5>";
              html += "<input type='text' id='namecurso"+elemt.curso_id+"' value='"+elemt.nonbrecurso+"' hidden>";
            html += "</div>";
            html += "<div>";
            html += "</div>";
          html += "</div>";
        html += "</div>";
      html += "</div>";
           });
    $('#cursos_grado').append(html);
}

function Asignar_Asistensia(idcurso,idgrado){
	$("#DinNuevoAsistencia").show();
  $("#idcurso").val(idcurso);
  $("#idgrado").val(idgrado);
  var nombrecurso =$("#namecurso"+idcurso).val();
  $("#NombreCursoselecionado").html(nombrecurso);

   $('#tbody_tabla_detall').html('');
   $("#FechaAsistencia ").val('');
   resetCheckbox() ;
    $("#btn_bucar_data").hide();

   $.ajax({
     url:'../controlador/Asistensia/ControllerGetAlumnos.php',
     type:'POST',
     data:{idcurso:idcurso,idgrado:idgrado}

    }).done(function(resultado){
      var data = JSON.parse(resultado);
      if (data.length>0) {
        Recorerresultado_Alumnos(data);

      }else {
         $("#tbody_tabla_detall").html('<p> No hay alumnos matrículados en este curso.</p>');
      }
    })
}

function Listar_Alumno_Asistencia_edit() {

  var idcurso=$("#idcurso ").val();
  var idgrado=$("#idgrado ").val();
  var fecha=$("#FechaAsistencia ").val();


     if (idcurso == null || idgrado==0 ) {console.log('NotData_Request');return;}
    if ( fecha?.length==0 ) {
     return Swal.fire("Mensaje de advertencia", "Ingrese la fecha que desea modificar la asistencia", "warning");
       }
       $("#btn_bucar_data").html("<em class='fa fa-spin fa-refresh'></em>");
        //$('#btn_bucar_data').prop('disabled',true);

       $.ajax({
        url:'../controlador/Asistensia/ControllerListarAsistenciaDate.php',
        type:'POST',
        data:{idcurso:idcurso,idgrado:idgrado,fecha:fecha}

       }).done(function(resultado){
         var data = JSON.parse(resultado);
      if (data.length!=0 ) {
        $("#btn_bucar_data").html("<em class='fa fa-search'></em>");
        $('#btn_bucar_data').prop('disabled',false);
        Asistencias_Editar(data);

      }
      else{
            $("#btn_bucar_data").html("<em class='fa fa-search'></em>");
        $('#btn_bucar_data').prop('disabled',false);
        var html ="";
        html +=  "<p>No se encontó Ningun Asistencia registrado para la fecha "+fecha+" </p>";  
        $("#tbody_tabla_detall").html(html);
      }

    });
} 

function Recorerresultado_Alumnos(data){ 
 var datos_add ="";let n=0;
    data.forEach(valor => {
     datos_add +=  "<tr>";  
     datos_add += "<td >"+valor.idalumno+"</td>";
     datos_add += "<td >"+valor.apellidop+','+valor.alumnonombre+"</td>";
     datos_add+="<td style='text-align: center'>";
     datos_add+="<label class='switch_checbok' style='display: block !important;'>";
     datos_add+="<input type='checkbox' id='new_comboAsistencia' class='clas_chebo"+n+"'>";
     datos_add+="<span class='siderasis round'></span>";
     datos_add+="</label>";
     datos_add+="</td>";
     datos_add += "</tr>";
     n++;
   })
    $('#tbody_tabla_detall').html(datos_add);

}
  ////REGISTRAR ASISTENCIA//////////
function RegistrarAsistencia(){
       var idcurso=$("#idcurso").val();
       var idgrado=$("#idgrado").val();
       var nombrecurso =$("#namecurso"+idcurso).val();
       var fechaAsisten =$("#FechaAsistencia").val();

        if(fechaAsisten.length == 0){
          return Swal.fire("Mensaje De Advertencia", "Ingrese fecha de las asistencias", "warning");
        }

         var vectorId=new Array();
         var vectorSelect=new Array();

         $('#tbody_tabla_detall tr').each(function() {
          vectorId.push($(this).find('td').eq(0).text());
        });

         $(".switch_checbok input[id='new_comboAsistencia']").each(function(index){
          if (this.checked) {
           vectorSelect.push(1);
         }else{
           vectorSelect.push(0);
         }

       });

        var vectorIdpersonas = vectorId.toString();
        var vectorEstado = vectorSelect.toString();
       if(vectorIdpersonas.length == 0){
         return Swal.fire("Mensaje De Advertencia", "No hay Alumnos para registrar", "warning");
       }
       $('#button_resgist').prop('disabled',true);

       $.ajax({
       
          url: editando === false ? "../controlador/Asistensia/ControllerRegistrarAsistencia.php" : "../controlador/Asistensia/ControllerActualizarAsistencia.php",
        type:'POST',
        data:{vectorIdpersonas:vectorIdpersonas,vectorEstado:vectorEstado,fechaAsisten:fechaAsisten,
        idgrado:idgrado,idcurso:idcurso}

        }).done(function(resultado){
          var data = JSON.parse(resultado);
          console.log(data);
          if(data==2){
            $('#button_resgist').prop('disabled',false);
             return Swal.fire("Mensaje De Advertencia", "Asistensia Para el curso "+nombrecurso+" en la fecha "+fechaAsisten+ " ya esta registrado.", "warning");
          }
          if (data==1) {
            Swal.fire({icon: 'success', title: 'Mensaje de Éxito !!', text:'La asistensia se guardo corectamente.', showConfirmButton: false,timer: 1500 });
            $('#button_resgist').prop('disabled',false);
            $("#btn_bucar_data").hide();
            $("#FechaAsistencia").val('');
             $("#DinNuevoAsistencia").hide();

            return;
             }else{
              $('#button_resgist').prop('disabled',false);
            return Swal.fire("Mensaje De error", "No se pudo registrar las asistencias para la fecha"+fechaAsisten, "error"); 
          }
         

        });
}

var editando=false;
function Black_MenuAsis(){
  $("#DinNuevoAsistencia").hide();
 $("#tbody_tabla_detall").html("");
 editando=false;
 resetCheckbox() ;

$("#FechaAsistencia").val('');
  $("#btn_bucar_data").hide();

}

function  All_Editar_Nuevo(e){

  if (e.checked) {
     $("#tbody_tabla_detall").html("");
    $("#btn_bucar_data").show();
    $("#FechaAsistencia").val('');
    editando=true;
} else {
    $("#btn_bucar_data").hide();
    editando=false;
}
}





function resetCheckbox() {
  var checkbox = document.querySelector(".cheboktem");
  checkbox.checked = false;
}
///LISTAR ASISTENCIA///////////


 function All_select(e){
    if(e.checked){
           $("#tbody_tabla_detall .switch_checbok ").each(function(i){
            $("input[class='clas_chebo"+i+"']").prop("checked", true);
           });
    }
    else{
       $("#tbody_tabla_detall .switch_checbok ").each(function(i){
            $("input[class='clas_chebo"+i+"']").prop("checked", false);  
           });
    }   
  }



function Asistencias_Editar(data){
 var html =""; let n=0;
 data.forEach(valor => {
   html +=  "<tr>";  
   html += "<td >"+valor.idalumno+"</td>";
    html += "<td >"+valor.apellidop+','+valor.alumnonombre+"</td>";
   html+="<td><label class='switch_checbok' style='display: block !important;'>";
   valor.Est_Asis==1 ? html+="<input type='checkbox' id='new_comboAsistencia' class='clas_chebo"+n+"' checked >":
   html+="<input type='checkbox' id='new_comboAsistencia' class='clas_chebo"+n+"'>";

   html+="<span class='siderasis round'></span>";
   html+="</label>";
   html+="</td>";
   html += "</tr>";
 })
 $('#tbody_tabla_detall').html(html);
}




