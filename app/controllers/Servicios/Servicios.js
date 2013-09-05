var args = arguments[0] || {};
var HTTP = require("/http");
var count = 0;
var tipo = 0;
// FUNCTIONS
function cancelar(){
	$.win.close();
}

function selectMan(_event){
    
     if(_event.value == 1){
        count = count+1;
        tipo = 1;
     }else{
        count = count-1;
     }
}

function selectRep(_event){
    if(_event.value == 1){
        count = count+1;
        tipo = 2;
     }else{
        count = count-1;
     }
}

function finalizar(){
    if(count == 1){
        if($.fecha.value.length > 7){
            if($.hora.value.length > 7){
                var tempData = {tipo:tipo,servicio:"N/A",fecha:$.fecha.value,hora:$.hora.value,asesor:"hugo armando flores",email:args.mail};
                HTTP.request({format:"JSON",type:"POST",url:"http://isdnetworks.com/nissan/ws/guardarCita.php",data:tempData}, function(_event){
                    //Ti.API.info("123 "+JSON.stringify(_event));
                    if(_event._result == 1){
                        if(_event._data.success == 1){
                            alert("Su cita sera confirmada via correo electronico.");
                            $.win.close();
                        }else{
                            alert(_event._data.error);
                        }
                    }else{
                        alert("Oops! something went wrong, please try again.");
                    }
                });
             }else{
                 alert("Ingrese una hora valida");
             }
        }else{
            alert("Ingrese una fecha valida");
        }
     }else{
         alert("Asegurese de seleccionar solo una opcion");
     }
	
}