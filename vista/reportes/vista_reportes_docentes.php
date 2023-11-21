
 <script type="text/javascript" src="../js/reportep.js?rev=<?php echo time();?>"></script>
	<div class="col-md-12" >
	  <div class="box box-warning ">
	    <div class="box-header with-border">
	      <h3 class="box-title" style="text-align: center;"><center style="text-align: center;"><strong>Reportes de Docentes</strong></center></h3>
	    </div>
       

	   
	    <!-- /.box-header -->
	    <div class="box-body">
	      <div class="box-body">
	        <div class="row">
	          <div class="col-xs-3">
	          </div>
	          <div class="col-xs-3">
	          </div>
	        <div class="col-xs-3" >
	        </div>
	         <div class="col-xs-3" >
	            <div class="input-group" id="inputfilter">
	            	 <label for="">Filtrar búsqueda</label>
	                   <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar" style="border-radius: 5px;">
	               </div>

	        </div>
	        </div>
	         <table id="tabla_Docente" class="display responsive nowrap" style="width:100%">
	                <thead>
	                    <tr>
	                        <th>N°</th>
	                        <th>Nombres</th>
	                        <th>Apellidos</th>
	                        <th>Sexo</th>
	                        <th>Tipo</th>
	                        <th>Dni</th>
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
    listar_Docentes() ;//esta en index.js==> cargar semestre actual

function filterGlobal() {
    $('#tabla_Docente').DataTable().search($('#global_filter').val(), ).draw();
}

 document.getElementById("tabla_Docente_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {

        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

} );
</script>