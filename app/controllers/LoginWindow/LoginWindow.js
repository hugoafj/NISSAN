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
			alert("Oops! something went wrong, please try again.");
		}
	});
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
            alert("Oops! something went wrong, please try again.");
        }
    });
}
