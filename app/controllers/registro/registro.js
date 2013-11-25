var HTTP = require("/http");
// FUNCTIONS
function cancelar(){
	$.win.close();
}

function finalizar(){
	var tempData = {nombre:$.nombre.value,email:$.email.value,auto:$.auto.value,modelo:"",cumple:$.cumple.value,password:$.pass.value,evento1:1,evento2:0,apellido_paterno:$.App.value,apellido_materno:$.Apm.value,telefono:$.telefono.value};
	HTTP.request({format:"JSON",type:"POST",url:"http://www.isdnetworks.com/nissan/ws/regUsuarios.php",data:tempData}, function(_event){
		//Ti.API.info("123 "+JSON.stringify(_event));
		if(_event._result == 1){
			if(_event._data.success == 1){
				alert("Registro exitoso.");
				$.win.close();
			}else{
				alert(_event._data.error);
			}
		}else{
			alert("Oops! algo salio mal, por favor intente de nuevo.");
		}
	});
}