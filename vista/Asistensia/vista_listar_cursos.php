

 <script type="text/javascript" src="../js/asistensia.js?rev=<?php echo time();?>"></script>


<div id="cursos_grado"></div>


<style type="text/css">
 #divevent:focus {
  background-color: #f39c12;
  outline: none;


}

</style>

<div class="col-md-12" id="DinNuevoAsistencia" style="display: none;">
  <div class="box box-warning ">
    <div class = "box-header with-border titulosclass" id="Titulo_Center"  >
      <h5 class = "box-title" style="text-align: center;"><strong>Registro de asistensia para el curso:</strong> <label id="NombreCursoselecionado"></label></h5>
       <div class="box-tools pull-right">
         <button type="button" class="btn btn-box-tool" data-widget="remove"  title="" data-original-title="Remove" onclick="Black_MenuAsis();">
         <em  class="fa fa-times"></em>
      </div>
    </div>
    <div class="box-body">
      <div class="row">
         <div class="col-xs-12">
        <div class="col-md-3">
        	<input type="text" name="" id="idcurso" hidden >
        	<input type="text" name="" id="idgrado" hidden>
        	
          <label >Nuevo/Editar</label>
            <label class='switch_checbok' style="display: block !important;">
  <input type='checkbox' onclick="All_Editar_Nuevo(this)" class="cheboktem">
  <span class='siderasis round'></span>
</label>
        </div>
        <div class="col-md-2" >

              
        </div>

        <div class="col-md-7">
         <label>Fecha</label>
          <div class="alin_global">
          <input class="form-control form-control-sm" type="Date" id="FechaAsistencia" style="border-radius: 5px">&nbsp;&nbsp;<button onclick="Listar_Alumno_Asistencia_edit();" class="btn-sm"  id="btn_bucar_data" style="display: none"> <em class="fa fa-search" ></em></button>
        </div>
        </div>
       </div>
      </div>
      <br>
      <table class="table table-condensed">
        <thead style="background-color:#696c6c;color: white;">
          <tr>
            <th style=""><strong>N°</strong></th>
            <th ><strong>Aapellidos y nombres</strong></th>
            <th  >
              <label  class='switch_checbok' style="display: block !important;">
               <input type='checkbox'  class="cheboktem" onclick="All_select(this)">
               <span class='siderasis round'></span>
             </label>
           </th>
         </tr>
       </thead>
       <tbody id="tbody_tabla_detall">
       </tbody>
     </table>
     <div class="modal-footer">
       
       <button class="btn btn-primary btn-sm" id="button_resgist" onclick="RegistrarAsistencia()"><em class="fa fa-check"><b>&nbsp;Registrar</b></em></button>
     </div>
   </div>
 </div>
</div>

<script>
$(document).ready(function() {
  Listra_Cursos_Docente();

} );
</script>



