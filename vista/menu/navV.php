
<header class="main-header">
  <style type="text/css">
   /* @media (max-width: 768px) {
    a img{ margin-left: -250px !important;}}*/
    #logonew{
    margin-top: 1px;
    height: 50px;

    }
    #logonew:hover {
  background-color: #b5cbc4;
}
.skin-blue .main-header .logo:hover {
    background-color: #b5cbc4;
}

  </style>
    <!-- Logo -->
    <a href="../index.php" class="logo" >
      <img src="../imagenes/IMG14112023134051.jpeg" id="logonew" style="margin-left: -42px;  max-width: 282px ;max-height: 125px;padding: 0px 25px; position: relative;
" > </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
        
        <li class="dropdown user user-menu">
            <a href="../index.php" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-home"></i>Inicio
            </a>
           
          </li>

        <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" id ="semestAct"><i class="fa fa-flag-o"></i>
              
              <span class="label label-danger"></span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">Avance semestral</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        <b>indicador</b>
                        <small class="pull-right"><b>500% </b></small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer">
                <button id="btnSelectSemester" style="width: 100%;background: #05ccc4;border: none;" onclick="ModalSeleccSemstre()">
            <i class="fa fa-refresh fa-fw" ></i>Cambiar Semestre
        </button>
              </li>
            </ul>
          </li>
        


       

          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-"></span>
              
            </a>
            <ul class="dropdown-menu" style="border-radius: 5px">
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li>
                    <a href="#">
                       <center><li class="header">No tienes Notificaciones</li></center>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">...</a>
              </li>
            </ul>
          </li>
          
           
           <li class="dropdown user user-menu"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i class="fa fa-user fa-lg"></i>
           </a>
          <ul class="dropdown-menu settings-menu dropdown-menu-right"  style="width: 150px;height:250px; border-radius: 5px;"><br>
            <center>
            <img  class="img-circle" alt="User Image"style="width: 50px;height:50px;" id="veticalfotouser"><br>
                 <p>
                  <?php echo $_SESSION['S_ROL']; ?>  
                </p>
            </center>
            <div class="container">
                 <li class="dropdown-item" style="width:100%;cursor: pointer;" onclick="AbrirModalCambCont()"><i class="fa fa-cog fa-lg">&nbsp;&nbsp;Configuracion</i>
            </li>
            </div><br>
            <div class="container">
                 <li class="dropdown-item" onclick="" style="cursor: pointer;"><i class="fa fa-user fa-lg" >&nbsp;&nbsp; Perfil</i> 
            </li>
            </div><br>
            <div class="container">
              <div class="col-lg-12">
                 <li class="dropdown-item">
                  <a class="text-danger btn btn-block btn-sm" style="border-radius: 5px;background:#05ccc4;width: 100px;cursor: pointer" href="../controlador/usuario/controlador_cerrar_session.php"><i class="fa fa-sign-out"></i>&nbsp;&nbsplogout</a>
                

            </li>
            </div>
            </div><br>

          </ul>
        </li>

          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>


  