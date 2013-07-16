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
				Alloy.createController("Inicio/Inicio").getView().open();
			}else{
				alert(_event._data.error);
			}
		}else{
			alert("Oops! something went wrong, please try again.");
		}
	});
	Alloy.createController("Inicio/Inicio").getView().open();
}

