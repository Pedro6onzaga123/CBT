var cont =0;
function VerificarUsuario(){
    cont++;
    $("#conteoincorecto").hide();
     $("#incorecto").hide();
    var usu = $("#txt_usu").val();
    var con = $("#txt_con").val();
    var rol_login =$('#cbm_rol').val();
    if (usu.length == 0 || con.length == 0 || rol_login.length == 0) {
         $("#notif").hide();
         $("#incorecto").hide();
         $("#llenecamp").show();
       return;
    }
 
    ///////////////ADmi///////////

    if (rol_login=='ADMINISTRADOR'){
         $('.loader').show();////prende
    $.ajax({
        url:'../controlador/usuario/controlador_verificar_usuario.php',
        type:'POST',
        data:{
            user:usu,
            pass:con

        }
    }).done(function(resp){
        
        if(resp==0){
            $("#llenecamp").hide();
            $("#notif").hide();
             $('.loader').hide();
            $("#incorecto").show();
           if(cont>=5){
            $("#incorecto").hide();
            $("#conteoincorecto").show();
           }
           
        
        }else{
            var data= JSON.parse(resp);
            if(data[0][4]==='INACTIVO'){
             $('.loader').hide();
            $("#llenecamp").hide();
            $("#notif").show();
            $("#incorecto").hide();

                return;
            }
            
            $.ajax({
                url:'../controlador/usuario/controlador_crear_session.php',
                type:'POST',
                data:{
                    idusuario:data[0][0],
                    user:data[0][1],
                    //rol:data[0]['ADMINISTROR']
                    rol:data[0][3]
                }
            }).done(function(resp){
            
                 $("#notif").hide();
                
                    location.reload();

                
            })
           
        }
    })


     }

    ////DOCENTE////////////     
    if (rol_login=='DOCENTE') {
      $('.loader').show();////prende
    $.ajax({
        url:'../controlador/docente/controlador_verificar_usuario.php',
        type:'POST',
        data:{
            user:usu,
            pass:con

        }
    }).done(function(resp){ 
        if(resp==0){
            $("#llenecamp").hide();
            $("#notif").hide();
             $('.loader').hide();
            $("#incorecto").show();
            if(cont>=5){
            $("#incorecto").hide();
            $("#conteoincorecto").show();
           }
        
        }else{
            var data= JSON.parse(resp);
            if(data[0][4]==='INACTIVO'){

             $('.loader').hide();
            $("#llenecamp").hide();
            $("#notif").show();
            $("#incorecto").hide();

                return;
            }
            
            $.ajax({  //iddocente,nombre,contra,rol,status
                url:'../controlador/usuario/controlador_crear_session.php',
                type:'POST',
                data:{
                    idusuario:data[0][0],
                    user:data[0][1],
                    //rol:data[0]['ADMINISTROR']
                    rol:data[0][3]
                }
            }).done(function(resp){
            
                 $("#notif").hide();
                
                    location.reload();

                ////
            })
           
        }
    })////


     }

    /////ALUMNO////////////////
    if (rol_login=='ALUMNO'){
         $('.loader').show();////prende
    $.ajax({
        url:'../controlador/alumno/controlador_verificar_usuario.php',
        type:'POST',
        data:{
            user:usu,
            pass:con

        }
    }).done(function(resp){
        
        if(resp==0){
            $("#llenecamp").hide();
            $("#notif").hide();
             $('.loader').hide();
            $("#incorecto").show();
            if(cont>=5){
            $("#incorecto").hide();
            $("#conteoincorecto").show();
           }

           // Swal.fire("Mensaje De Error",'Usuario y/o contrase\u00f1a incorrecta',"error");
        
        }else{
            var data= JSON.parse(resp);
            //if(data[0][4]==='INACTIVO'){//estado
              if(data[0][5]==='INACTIVO'){//estado
             $('.loader').hide();
            $("#llenecamp").hide();
            $("#notif").show();
            $("#incorecto").hide();

                return;// Swal.fire("Mensaje De Advertencia","Lo sentimos el usuario "+usu+" se encuentra suspendido, comuniquese con el administrador","warning");
            }
            
            $.ajax({
                url:'../controlador/usuario/controlador_crear_session.php',
                type:'POST',
                data:{ //idalumno,alumnonombre,grado,contrasena,rolalumno,stadoalumno
                    /*idusuario:data[0][0],///id
                    user:data[0][1],//nombre
                    rol:data[0][3]//rol*/
                    idusuario:data[0][0],///id
                    user:data[0][1],//nombre
                     grado:data[0][2],//rol
                    rol:data[0][4]//rol
                }
            }).done(function(resp){
                 $("#notif").hide();
                
                    location.reload();

                ////
            })
           
        }
    })////

     }

   
}



var table;
function listar_usuario() {
    table = $("#tabla_usuario").DataTable({
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
            "url": "../controlador/usuario/controlador_usuario_listar.php",
            type: 'POST'
        },
        "columns": [{
            "data": "usu_id"
        }, {
            "data": "usu_nombre"
        },
         {
            "data": "usu_apellido"
        },

         {
            "data": "rol_nombre"
        }, {
            "data": "usu_sexo",
            render: function(data, type, row) {
                if (data == 'M') {
                    return "MASCULINO";
                } else {
                    return "FEMINO";
                }
            }
        }, {
            "data": "usu_estatus",
            render: function(data, type, row) {
                if (data == 'ACTIVO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
                }
            }
        }, {
            "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-info'><i class='fa fa-edit' title='editar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='desactivar btn btn-warning'><i class='fa fa-eye-slash' title='desactivar'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' title='activar'><i class='fa fa-eye'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='eliminar btn btn-danger' title='eliminar'><i class='fa fa-trash'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_usuario_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
}
$('#tabla_usuario').on('click', '.activar', function() {
    var data = table.row($(this).parents('tr')).data();
    

    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de activar al usuario?',
        text: "Una vez hecho esto el usuario  tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.usu_id, 'ACTIVO');
        }
    }) 

})


$('#tabla_usuario').on('click', '.desactivar', function() {
    var data = table.row($(this).parents('tr')).data();
    // alert(data.usu_id);
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de desactivar al usuario?',
        text: "Una vez hecho esto el usuario no tendra acceso al sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.usu_id, 'INACTIVO');
        }
    })
})
$('#tabla_usuario').on('click', '.editar', function() {
    var data = table.row($(this).parents('tr')).data();
   
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    $("#modal_editar").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_editar").modal('show');
    $("#textidususrio").val(data.usu_id); 
    $("#txtusu_editar").val(data.usu_nombre);
     $("#apellido_editar").val(data.usu_apellido);
    $("#cbm_sexo_editar").val(data.usu_sexo).trigger("change");
    $("#cbm_rol_editar").val(data.rol_nombre).trigger("change");
})
/////////////////////
$('#tabla_usuario').on('click', '.eliminar', function() {
    var data = table.row($(this).parents('tr')).data();
    //alert(data.usu_id);
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }
    $.ajax({
        "url": "../controlador/usuario/controlador_usuario_eliminar.php",
        type: 'POST',
        data: {
            idusuario: data.usu_id
        }
    }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "El usuario se Elimino con exito", "success").then((value) => {
                table.ajax.reload();
            });
        }
    })
})

function Modificar_Estatus(idusuario, estatus) {
    var mensaje = "";
    if (estatus == 'INACTIVO') {
        mensaje = "desactivo";
    } else {
        mensaje = "activo";
    }
    $.ajax({
        "url": "../controlador/usuario/controlador_modificar_estatus_usuario.php",
        type: 'POST',
        data: {
            idusuario: idusuario,
            estatus: estatus
        }
    }).done(function(resp) {
        if (resp > 0) {
            Swal.fire("Mensaje De Confirmacion", "El usuario se " + mensaje + " con exito", "success").then((value) => {
                table.ajax.reload();
            });
        }
    })
}

function filterGlobal() {
    $('#tabla_usuario').DataTable().search($('#global_filter').val(), ).draw();
}

function AbrirModalRegistro() {
    $("#modal_registro").modal({
        backdrop: 'static',
        keyboard: false
    })
     $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_registro").modal('show');
}

function listar_combo_rol() {
    $.ajax({
        "url": "../controlador/usuario/controlador_combo_rol_listar.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);
        }
    })
}

function Registrar_Usuario() {
    var usuario = $("#txt_usu").val();
    var usuap=$("#txt_apell").val();
    var contrasena = $("#txt_con1").val();
    var contra2 = $("#txt_con2").val();
    var sexo = $("#cbm_sexo").val();
    var rol = $("#cbm_rol").val();
    
    if (usuario.length == 0 || contrasena.length == 0 || contra2.length == 0 || contra2.length == 0 || sexo.length == 0 || rol.length == 0 || usuap.length ==0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }
    if (contrasena != contra2) {
        return Swal.fire("Mensaje De Advertencia", "Las contraseñas deben coincidir", "warning");
    }
    $.ajax({
        "url": "../controlador/usuario/controlador_usuario_registro.php",
        type: 'POST',
        data: {
            usuario: usuario,
            usuap:usuap,
            contrasena: contrasena,
            sexo: sexo,
            rol: rol
        }
    }).done(function(resp) {
        
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente, Nuevo Usuario Registrado", "success").then((value) => {
                    LimpiarRegistro();
                    table.ajax.reload();
                });
            } else {
                return Swal.fire("Mensaje De Advertencia", "Lo sentimos, el nombre del usuario ya se encuentra en nuestra base de datos", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }
    })
}


function Modificar_Usuario() { 
    var idusuario = $("#textidususrio").val();
    var nombre = $("#txtusu_editar").val();
    var apellido = $("#apellido_editar").val();
    var sexo = $("#cbm_sexo_editar").val();
    var rol = $("#cbm_rol_editar").val();


    if (idusuario.length == 0 || sexo.length == 0 || rol.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }
    $.ajax({
        "url": "../controlador/usuario/controlador_editar_usuario.php",
        type: 'POST',
        data: {
            idusuario: idusuario,
            nombre:nombre,
            apellido:apellido,
            sexo: sexo,
            rol: rol
        }
    }).done(function(resp) {
     
        if (resp > 0) {
            $("#modal_editar").modal('hide');
            Swal.fire("Mensaje De Confirmacion", "Datos correctamente,Actualizado", "success").then((value) => {
                table.ajax.reload();
            });
        } else {
            Swal.fire("Mensaje De Error", "No se pudo actualizar", "error");
        }
    })
}

function LimpiarRegistro() {
    $("#txt_usu").val("");
    $("#txt_con1").val("");
    $("#txt_con2").val("");
     $("#txt_apell").val("");
}

