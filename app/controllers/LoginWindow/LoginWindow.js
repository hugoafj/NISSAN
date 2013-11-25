var HTTP = require("/http");
// FUNCTIONS
function openRegistro(){
	Alloy.createController("registro/registro").getView().open();
}

function entrar(){
	var tempData = {email:$.email.value,password:$.pass.value};
	HTTP.request({format:"JSON",type:"POST",url:"http://www.isdnetworks.com/nissan/ws/loginUsuarios.php",data:tempData}, function(_event){
		//Ti.API.info("123 "+JSON.stringify(_event));
		if(_event._result == 1){
			if(_event._data.success == 1){
			    Ti.App.Properties.setString("usuario",$.email.value);
			    Ti.App.Properties.setString("pass",$.pass.value);
				Alloy.createController("Inicio/Inicio",{mail:$.email.value,pass:$.pass.value,idCliente:_event._data.idCliente}).getView().open();
			}else{
				alert(_event._data.error);
			}
		}else{
			alert("Oops! algo salio mal, por favor intente de nuevo.");
		}
	});
}

function sendMail(){
	if($.email.value.length > 3){
		  var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['OK', 'Cancelar'],
		    message: 'Recibira un correo electronico con la informacion de su cuenta.',
		    title: 'Olvide mi contraseña'
		  });
		  dialog.addEventListener('click', function(e){
		    if (e.index == 0){
		      		var tempData = {email:$.email.value};
					HTTP.request({format:"JSON",type:"POST",url:"http://isdnetworks.com/nissan/ws/recordatorioPassword.php",data:tempData}, function(_event){
						//Ti.API.info("123 "+JSON.stringify(_event));
						if(_event._result == 1){
							if(_event._data.success == 1){
							   alert("En breve recibira su informacion por correo electronico.");
							}else{
								alert(_event._data.error);
							}
						}else{
							alert("Oops! algo salio mal, por favor intente de nuevo.");
						}
					});
		      }
		  });
		  dialog.show();
	}else{
		alert("Por favor proporcione su correo electronico.");
	}

}

if(Ti.App.Properties.hasProperty("usuario")){
    var tempData = {email:Ti.App.Properties.getString("usuario"),password:Ti.App.Properties.getString("pass")};
   //Ti.API.info("123 "+JSON.stringify(tempData));
    HTTP.request({format:"JSON",type:"POST",url:"http://www.isdnetworks.com/nissan/ws/loginUsuarios.php",data:tempData}, function(_event){
        //Ti.API.info("123 "+JSON.stringify(_event));
        if(_event._result == 1){
            if(_event._data.success == 1){
                Alloy.createController("Inicio/Inicio",{mail:Ti.App.Properties.getString("usuario"),pass:Ti.App.Properties.getString("pass"),idCliente:_event._data.idCliente}).getView().open();
            }else{
                alert(_event._data.error);
            }
        }else{
            alert("Oops! algo salio mal, por favor intente de nuevo.");
        }
    });
}
