function AbrirModalCambCont() {
	var id_usu=$("#textId").val();
    var rol_usu =$("#Userrol").val();
	  Extraer_contracena(id_usu,rol_usu);
    $("#modal_Camb_contra").modal({
       
        backdrop: 'static',
        keyboard: false
    })
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_Camb_contra").modal('show');
   }


function Extraer_contracena(id_usu,rol_usu){//FUNCION TRAER CONTRAXEÑA Y FOTO
     $('.loader').show();////prende
 
    if (rol_usu =='ADMINISTRAOR') {

       
    $.ajax({
        url:'../controlador/usuario/controlador_extraer_contracena.php',
        type:'POST',
        data:{
            id_usu:id_usu
        }
    }).done(function(resp) {
        $('.loader').hide();
        var data = JSON.parse(resp);
        var contracena = (data[0]['usu_contrasena']);
         var fot = (data[0]['usu_foto']);
          $("#fotoActual").val(fot);
         //alert(fot);
            $("#fotouserhorz").attr("src","../"+data[0]['usu_foto']);//NAV HORIZONTAL
            $("#veticalfotouser").attr("src","../"+data[0]['usu_foto']);//NAV VERTICALL
            $("#mostrarimagen").attr("src","../"+data[0]['usu_foto']);//MODAL EDITAT FOTO
            $("#contra_bd").val(contracena);//MODAL EDITAR PASSWORD

          
    })
    }
    if (rol_usu=='DOCENTE') {
           
    $.ajax({
        url:'../controlador/docente/controlador_extraer_contracena.php',
        type:'POST',
        data:{
            id_usu:id_usu
        }
    }).done(function(resp) {
        $('.loader').hide();
        var data = JSON.parse(resp);
        var contracena = (data[0]['contra']);
         var fot1 = (data[0]['docen_foto']);
          $("#fotoActual").val(fot1);
         //alert(fot);
            $("#fotouserhorz").attr("src","../"+data[0]['docen_foto']);//NAV HORIZONTAL
            $("#veticalfotouser").attr("src","../"+data[0]['docen_foto']);//NAV VERTICALL
            $("#mostrarimagen").attr("src","../"+data[0]['docen_foto']);//MODAL EDITAT FOTO
            $("#contra_bd").val(contracena);//MODAL EDITAR PASSWORD

          
    })
    }
    if (rol_usu=='ALUMNO') {   
    $.ajax({
        url:'../controlador/alumno/controlador_extraer_contracena.php',
        type:'POST',
        data:{
            id_usu:id_usu
        }
    }).done(function(resp) {
        $('.loader').hide();
        var data = JSON.parse(resp);
        var contracena = (data[0]['contrasena']);
         var fot2 = (data[0]['alumno_foto']);

          $("#fotoActual").val(fot2);
         //alert(fot);
            $("#fotouserhorz").attr("src","../"+data[0]['alumno_foto']);//NAV HORIZONTAL
            $("#veticalfotouser").attr("src","../"+data[0]['alumno_foto']);//NAV VERTICALL
            $("#mostrarimagen").attr("src","../"+data[0]['alumno_foto']);//MODAL EDITAT FOTO
            $("#contra_bd").val(contracena);//MODAL EDITAR PASSWORD
    })
    } 

}
/*
function Modificar_Contrasena(){

var idusu=$("#textId").val();
var bdcont=$("#contra_bd").val();
var contrAct=$("#txt_cont_act").val();
var contrnew=$("#txt_cont_nuw").val();
var contrep=$("#repcontra").val();

//alert(idusu+'---'+bdcont+'---'+contrAct+'---'+contrnew+'--'+contrep);
if (contrAct.length == 0 || contrnew.length == 0 || contrep.length == 0) {
      $("#notif").hide();
     $("#llenecamp").show();
     return;
       // return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }

if (contrnew != contrep) {
    $("#llenecamp").hide();
     $("#notif").show();
     return;
    }
     $.ajax({
        url:'../controlador/usuario/controlador_modificar_contra.php',
        type:'POST',
        data:{
            idusu:idusu,
            bdcont:bdcont,
            contrAct:contrAct,
            contrnew:contrnew

        }
    }).done(function(resp) {
         $("#notif").hide();
         $("#notif").hide(); 
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_Camb_contra").modal('hide');
                limpiarModalContra();
                Swal.fire("Mensaje De Confirmacion", "Datos correctamente,", "success").then((value) => {
                   
                });

                        Swal.fire({
                         title: 'DESEAR CERRAR LA SECTION?',
                         text: "Ingrese con la contraceña nueva",
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Si'
                             }).then((result) => {
                               if (result.value) {
                                 window.open('../controlador/usuario/controlador_cerrar_session.php');
                                 //window.location.reload('../controlador/usuario/controlador_cerrar_session.php');
                              }
                               location.reload();
                           })                 
            } else {
                return Swal.fire("Mensaje De Advertencia", "La contracena es muy anbiguo", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }

          
      })


}*/

function Modificar_Contrasena(){
var rol_usu =$("#Userrol").val();

 var f=new Date();
 var idusu=$("#textId").val();
 var bdcont=$("#contra_bd").val();
 var contrAct=$("#txt_cont_act").val();
 var contrnew=$("#txt_cont_nuw").val();
 var contrep=$("#repcontra").val();
 var fotoactual=$("#fotoActual").val();
 //alert(fotoactual);

     var archivo = $("#seleccionararchivo").val();
     var formato = archivo.split('.').pop();//formato png
     var nombreArchivo ="IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+formato;
    
///hola
//alert(idusu+'---'+bdcont+'---'+contrAct+'---'+contrnew+'--'+contrep);
if (contrAct.length == 0 ) {
      $("#notif").hide();
      $("#noexiste").hide();
     $("#llenecamp").show();
     return;
       // return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }

    if (contrnew.length == 0 || contrep.length == 0  ) {
       //$("#notif").hide();
       // $("#llenecamp").show();
       var contrnew=contrAct;
       var contrep=contrAct;
    }

if (contrnew != contrep) {
    $("#llenecamp").hide();
    $("#noexiste").hide();
     $("#notif").show();
     return;
    }
           var formData= new FormData();
          var foto = $("#seleccionararchivo")[0].files[0];
          
            formData.append('f',foto);
            formData.append('idusu',idusu);
            formData.append('bdcont',bdcont);
            formData.append('contrAct',contrAct);
            formData.append('contrnew',contrnew);
            formData.append('r',contrep );
            formData.append('nombreArchivo',nombreArchivo);
            formData.append('fotAct',fotoactual);

            if (rol_usu=='ADMINISTRAOR') {
                $.ajax({
                url:'../controlador/usuario/controlador_modificar_contra.php',
                type:'post',
                data:formData,
                contentType:false,
                processData:false,
                success: function(respuesta){
                     // alert(respuesta);
                       $("#notif").hide();
                          $("#notif").hide(); 
                         if (respuesta > 0) {
                             if (respuesta == 1) {
                                 $("#modal_Camb_contra").modal('hide');
                                 limpiarModalContra();
                                 Swal.fire("Mensaje De Confirmacion", "Datos correctamente,", "success").then((value) => {
                   
                                 });

                        Swal.fire({
                         title: 'DESEAR CERRAR LA SECTION?',
                         text: "Ingrese con la contraceña nueva",
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Si'
                             }).then((result) => {
                               if (result.value) {
                                 window.open('../controlador/usuario/controlador_cerrar_session.php');
                                 //window.location.reload('../controlador/usuario/controlador_cerrar_session.php');
                              }
                               location.reload();
                           })                 
            } else {
                $("#llenecamp").hide();
                $("#notif").hide();
                  $("#noexiste").show();
                return;// Swal.fire("Mensaje De Advertencia", "la contra cenña no pertecenes al usuario", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }

                }
            });
            return false;
            }

            if (rol_usu=='DOCENTE') {
                $.ajax({
                url:'../controlador/docente/controlador_modificar_contra.php',
                type:'post',
                data:formData,
                contentType:false,
                processData:false,
                success: function(respuesta){
                     // alert(respuesta);
                       $("#notif").hide();
                          $("#notif").hide(); 
                         if (respuesta > 0) {
                             if (respuesta == 1) {
                                 $("#modal_Camb_contra").modal('hide');
                                 limpiarModalContra();
                                 Swal.fire("Mensaje De Confirmacion", "Datos correctamente,", "success").then((value) => {
                   
                                 });

                        Swal.fire({
                         title: 'DESEAR CERRAR LA SECTION?',
                         text: "Ingrese con la contraceña nueva",
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Si'
                             }).then((result) => {
                               if (result.value) {
                                 window.open('../controlador/usuario/controlador_cerrar_session.php');
                                 //window.location.reload('../controlador/usuario/controlador_cerrar_session.php');
                              }
                               location.reload();
                           })                 
            } else {
                $("#llenecamp").hide();
                $("#notif").hide();
                  $("#noexiste").show();
                return;// Swal.fire("Mensaje De Advertencia", "la contra cenña no pertecenes al usuario", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }

                }
            });
            return false;
            }

            if (rol_usu=='ALUMNO') {
                $.ajax({
                url:'../controlador/alumno/controlador_modificar_contra.php',
                type:'post',
                data:formData,
                contentType:false,
                processData:false,
                success: function(respuesta){
                     // alert(respuesta);
                       $("#notif").hide();
                          $("#notif").hide(); 
                         if (respuesta > 0) {
                             if (respuesta == 1) {
                                 $("#modal_Camb_contra").modal('hide');
                                 limpiarModalContra();
                                 Swal.fire("Mensaje De Confirmacion", "Datos correctamente,", "success").then((value) => {
                   
                                 });

                        Swal.fire({
                         title: 'DESEAR CERRAR LA SECTION?',
                         text: "Ingrese con la contraceña nueva",
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Si'
                             }).then((result) => {
                               if (result.value) {
                                 window.open('../controlador/usuario/controlador_cerrar_session.php');
                                 //window.location.reload('../controlador/usuario/controlador_cerrar_session.php');
                              }
                               location.reload();
                           })                 
            } else {
                $("#llenecamp").hide();
                $("#notif").hide();
                  $("#noexiste").show();
                return;// Swal.fire("Mensaje De Advertencia", "la contra cenña no pertecenes al usuario", "warning");
            }
        } else {
            Swal.fire("Mensaje De Error", "Lo sentimos, no se pudo completar el registro", "error");
        }

                }
            });
            return false;
            }
}

function limpiarModalContra(){
$("#txt_cont_act").val("");
$("#txt_cont_nuw").val("");
$("#repcontra").val("");
$("#seleccionararchivo").attr("");
}

function addcontranew(){
    $("#cambiarcontratambien").show();
     $("#botonaddcontra").hide();

}


function ModalSeleccSemstre(){
    $("#modal_semestre").modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".modal-header").css("background-color", "#05ccc4");
    $(".modal-header").css("color", "white");
    $("#modal_semestre").modal('show');
    

}

function SemstreActual(){

 $.ajax({
        "url": "../controlador/administrador/controlador_semestre_actual.php",
        type: 'POST'
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
    
            $("#semestAct").html(cadena);//navegador navV cbm_semestre  HsemestreH
            $("#idsemestAct").html(cadena);// Modal cambiar=>semmestre
            $("#gradSemt").html(cadena)//vista de grados modal agregar cursos 
            $("#profSemestGrad").html(cadena)//vista de profesores modal asisgnar grago & cursos 
             $("#cbm_semestre").html(cadena)//vistar crear grado & cursos 
             $("#cbm_semestre").html(cadena)//vistar crear grado & cursos 


        } else {
            cadena += "<option value=''>NO SE ENCONTRARON SEMETRE</option>";
            $("#semestre").html(cadena);//navegador navV
            $("#idsemestAct").html(cadena);// Modal cambiar=>semmestre
            $("#gradSemt").html(cadena);//vista de grados modal agregar cursos
            $("#profSemestGrad").html(cadena) ;
           
        }
    })

}

function Modificar_Semestre(){
    var esadmin=$("#Userrol").val();
    var idsemtnew=$("#idsemNuevo").val();
    var nombsemtnew = $('#idsemNuevo option:selected').text();
    var semAc=$("#idsemestAct").val();
    if (esadmin=='ADMINISTRAOR') {
         $.ajax({
        "url": "../controlador/administrador/controlador_cambiar_semest.php",
        type: 'POST',
        data: {
               idsemtnew:idsemtnew,
               nombsemtnew:nombsemtnew,
               semAc:semAc
           }
    }).done(function(resp) {
       if (resp> 0) {
           $("#modal_semestre").modal('hide');
           window.location.reload();
            Swal.fire("Mensaje De Confirmacion", "SE CAMBIO DE SEMESTRE", "success").then((value) => {
                
            });
        }else{
           
           return Swal.fire("Mensaje De Advertencia", "NO SE PUDO CAMBIAR DE SEMESTRE", "warning");

        }
    })
}else{
    
     $("#permiso").show();
}
   


}
