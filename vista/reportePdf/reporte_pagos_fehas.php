	 <script type="text/javascript" src="../js/reportep.js?rev=<?php echo time();?>"></script>
	<div class="col-md-12" >
	  <div class="box box-warning ">
	    <div class="box-header with-border">
	      <h3 class="box-title" style="text-align: center;"><center><strong>Reporte de pagos</strong></center></h3>
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
	            <button onclick="Estraer_Pagos_Range();" class="btn" type="submit" name="search" id="butsearch" class="btn btn-flat">
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
	         <table id="tabla_reportep" class="display responsive nowrap" style="width:100%">
	                <thead>
	                    <tr>
	                        <th>N°</th>
	                        <th>Apellidos</th>
	                        <th>Descricion</th>
	                        <th>Penciones Pagados</th>
	                        <th>Fecha de pago</th>
	                         <th>Monto</th>
	                      
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
	                    </tr>
	                </tfoot>
	            </table>
	       
	    </div>
	     <div class="modal-footer">
	         
	     </div>
	  </div>
	</div>
	</div>