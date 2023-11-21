<aside class="main-sidebar" >
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" ><br>
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img  class="img-circle" alt="User Image" id="fotouserhorz"style="width: 50px;height:50px;" >
        </div>
        <div class="pull-left info">
          <p><?php echo $_SESSION['S_USER']; ?></p>
          <a href="#"><i class="fa fa-circle text-success"></i> En linea</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form" >
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
       <!-- <li class="header">MAIN NAVIGATION</li>-->
       <?php 

        if ($_SESSION['S_ROL'] =='ADMINISTRAOR') {
          ?>

          <li class=" treeview">
          <a onclick="cargar_contenido('contenido_principal','usuario/vista_usuario_listar.php')">
            <i class="glyphicon glyphicon-user"></i> <span style="cursor: pointer;">Usuario</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
        </li> 
        
        <li class="treeview">
          <a  onclick="cargar_contenido('contenido_principal','administrador/vista_matricula.php')">
            <i class="glyphicon glyphicon-tasks"></i>
            <span style="cursor: pointer;">Matr&iacute;cula</span>
            <span class="pull-right-container">
              <i class="fa fa-labtop"></i>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
        </li>


        <li class=" treeview">
          <a onclick="cargar_contenido('contenido_principal','horario/vista_listar_horario.php')">
            <i class=" glyphicon glyphicon-time"></i> <span style="cursor: pointer;">Horarios</span>
            <span class="pull-right-container">
              <i class="fa fa-labtop"></i>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
        </li>


        <li class="treeview">
          <a >
            <span class="pull-right text-muted">
                  <b class="badge bg-info pull-right"></b>
                  </span>
             <i class="glyphicon glyphicon-calendar "></i> <span style="cursor: pointer;">Pagos</span><span class="pull-right-container">
              <i class="fa fa-labtop"></i>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
           
          </a>

          <ul class="treeview-menu">

              <li class="treeview">
               <a  onclick="cargar_contenido('contenido_principal','administrador/vista_listar_pagos.php')">
                <i class="fa  fa-google-wallet"></i>
                <span style="cursor: pointer;" > Caja</span>
                <span class="pull-right-container"> <i class="fa fa-circle text-info"></i> </span>
               </a>
             </li>
     

              
       
      </ul>
      </li>
      <li class="treeview">
          <a  onclick="cargar_contenido('contenido_principal','docente/vista_listar_docente.php')">
            <i class="glyphicon glyphicon-education"></i>
            <span style="cursor: pointer;">Docente</span>
            <span class="pull-right-container">
              <i class="fa fa-labtop"></i>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
        </li>
        <li class=" treeview">
          <a onclick="cargar_contenido('contenido_principal','curso/vista_listar_curso.php')">
            <i class="glyphicon glyphicon-th-large"></i> <span style="cursor: pointer;">Cursos</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
        </li>
        <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','grado/vista_listar_grado.php')">
            <i class="fa fa-eraser"></i> 
            <span style="cursor: pointer;">Grados</span>
              <i class="fa fa-angle-left pull-right"></i>
            
          </a>
      </li>

         <li class="treeview">
          <a >
            <span class="pull-right text-muted">
                  <b class="badge bg-info pull-right"></b>
                  </span>
             <i class="fa fa-file-pdf-o "></i> <span style="cursor: pointer;">Reportes</span><span class="pull-right-container">
              
              <i class="fa fa-angle-left pull-right"></i>
            </span>
           
          </a>

          <ul class="treeview-menu">

              <li class="treeview">
               <a  onclick="cargar_contenido('contenido_principal','reportes/vista_reportes_alumnos.php')">
                <i class="fa fa-circle-o text-aqua"></i>
                <span style="cursor: pointer;" >Alumnos</span>
                <span class="pull-right-container"><small class="label pull-right bg-yellow">Nuevo</small></span>
               </a>
             </li>
     

              <li class="treeview">
               <a  onclick="cargar_contenido('contenido_principal','reportes/vista_reportes_docentes.php')">
                <i class="fa fa-circle-o text-aqua"></i>
                <span style="cursor: pointer;" >Docentes</span>
                <span class="pull-right-container"><small class="label pull-right bg-yellow">Nuevo</small></span>
               </a>
             </li>

       
      </ul>
      </li>



       <!--
        <li>
          <a onclick="cargar_contenido('contenido_principal','grafico/vista_estadistica.php')">
            <i class=" fa fa-area-chart"></i> <span style="cursor: pointer;">Estadistica</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>-->


        <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','aula/vista_listar_aula.php')">
            <i class=" fa  fa-edit"></i> <span style="cursor: pointer;">Aulas</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>
     
      <?php
          }
         ?>

           <?php 

        if ($_SESSION['S_ROL'] =='DOCENTE') {
          ?>
           <li>
          <a onclick="cargar_contenido('contenido_principal','docente/vista_cursosgrado_listar.php')">
            <i class=" fa  fa-edit"></i> <span style="cursor: pointer;">Grados</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li>
          <a onclick="cargar_contenido('contenido_principal','docente/vista_aulas_docente.php')">
            <i class=" fa fa-font"></i> <span style="cursor: pointer;">aula</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li>
          <a onclick="cargar_contenido('contenido_principal','docente/vista_horario_docente.php')">
            <i class="glyphicon glyphicon-time"></i> <span style="cursor: pointer;">Horario de Clase</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>
         <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','Asistensia/vista_listar_cursos.php')">
            <i class=" fa  fa-users"></i> <span style="cursor: pointer;">Asistencia</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
          </li>

             <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','Archivo/listar_archivos.php')">
            <i class=" fa  fa-file"></i> <span style="cursor: pointer;">Archivos</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','folder/listar_Folder.php')">
            <i class="fa fa-folder" aria-hidden="true"></i> <span style="cursor: pointer;">Folder</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

       <?php
          }
         ?>


          <?php 

        if ($_SESSION['S_ROL'] =='ALUMNO') {
          ?>

          <li>
          <a onclick="cargar_contenido('contenido_principal','alumno/vista_calificaciones.php')">
            <i class=" fa  fa-edit"></i> <span style="cursor: pointer;">Calificaciones</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li>
          <a onclick="cargar_contenido('contenido_principal','alumno/vista_horario.php')">
            <i class=" fa  fa-calendar-check-o"></i> <span style="cursor: pointer;">Horario de clases</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li>
          <a onclick="cargar_contenido('contenido_principal','alumno/vista_aula_clases.php')">
            <i class=" fa fa-font"></i> <span style="cursor: pointer;">Aula Clases</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

          <li>
          <a onclick="cargar_contenido('contenido_principal','alumno/vista_pagos_real.php')">
            <i class="fa fa-cc-visa"></i> <span style="cursor: pointer;">Pagos Realizados</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

          <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','alumno/listar_archivos.php')">
            <i class=" fa  fa-file"></i> <span style="cursor: pointer;">Archivos</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>

         <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','alumno/listar_foders.php')">
            <i class="fa fa-folder" aria-hidden="true"></i> <span style="cursor: pointer;">Folder</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
        </li>
         <li class="treeview">
          <a onclick="cargar_contenido('contenido_principal','alumno/vista_listar_asistencia.php')">
            <i class=" fa  fa-users"></i> <span style="cursor: pointer;">Asistencia</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>

            </span>
          </a>
          </li>

        <?php
          }
         ?>

    </ul>
     
    </section>
    <!-- /.sidebar -->
  </aside>