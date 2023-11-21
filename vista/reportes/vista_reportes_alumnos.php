

 <script type="text/javascript" src="../js/reportep.js?rev=<?php echo time();?>"></script>
	<div class="col-md-12" >
	  <div class="box box-warning ">
	    <div class="box-header with-border">
	      <h3 class="box-title" style="text-align: center;"><center><strong>Reportes de Alumnos</strong></center></h3>
	    </div>

	    <style>
	          .selecturno {
	            display: flex;
	            justify-content: end;
	          }

	          #butsearch{

	      border-radius: 5px;
	    margin-top: -2px;
	    font-size: 10px;
	    background-color: #05ccc4;
	            

	          }
	        </style>
	    <!-- /.box-header -->
	    <div class="box-body">
	      <div class="box-body">
	        <div class="row">
	          <div class="col-xs-4">
	            <label for="">Fecha Inicio</label>
	            <input type="date" class="form-control" id="reportFechainicio" placeholder="" style="border-radius: 5px;"><br>
	          </div>
	          <div class="col-xs-4">
	            <label for="">Fecha Final</label>
	            <div class="selecturno">
	            <input type="date" class="form-control" id="reportFechafin" placeholder="" style="border-radius: 5px;" >&nbsp;
	            <button onclick="Estraer_Lista_Range_Alum();" class="btn" type="submit" name="search" id="butsearch" class="btn btn-flat">
	                <i class="fa fa-search" style="color: white;font-size: 15px;"></i>
	                </button>
	                </div>
	            <br>
	          </div>
	        <div class="col-xs-4">
	            <div class="input-group">
	            	 <label for="">Filtrar búsqueda</label>
	                   <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar" style="border-radius: 5px;">
	               </div>

	        </div>
	        </div>
	         <table id="table_alumno" class="display responsive nowrap" style="width:100%">
	                <thead>
	                    <tr>
	                        <th>N°</th>
	                        <th>Apellidos</th>
	                        <th>Nombres</th>
	                        <th>Dni</th>
	                        <th>Tel&eacute;fono</th>
	                         <th>Grado</th>
	                         <th>Sexo</th>
	                        <th>C&oacute;digo</th>
	                        <th>Fec Regist</th>
	                         <th>Estado</th>
	                      
	                    </tr>
	                </thead>
	                <tfoot>
	                    <tr>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>

	                    </tr>
	                </tfoot>
	            </table>
	       
	    </div>
	     <div class="modal-footer">
	         
	     </div>
	  </div>
	</div>
	</div>


	<script>
$(document).ready(function() {
    listar_Alumnos() ;//esta en index.js==> cargar semestre actual
} );
</script>