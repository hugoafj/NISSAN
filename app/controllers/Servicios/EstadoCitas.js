var args = arguments[0] || {};
var HTTP = require("/http");



var tempData = {password:args.pass,email:args.mail,idUsuario:args.idCliente};
    //Ti.API.info("123 "+JSON.stringify(tempData));
    HTTP.request({format:"JSON",type:"POST",url:"http://isdnetworks.com/nissan/ws/getCitasConfirmadas.php",data:tempData}, function(_event){
        Ti.API.info("123 "+JSON.stringify(_event));
        if(_event._result == 1){
            if(_event._data.success == 1){             
                
              /* _event._data = {"success":1,"error":null,"citas":[
               {"id":"2","estado":"confirmada","respuesta":"Confirmamos la cita","fecha":"25/04/2013","hora":"00:00:02","tipo":"Mantenimiento","nombreCategoria":"15000 km."},
               {"id":"9","estado":"cancelada","respuesta":"Ese dia no se trabaja","fecha":"16/10/2013","hora":"14:40:11","tipo":"Servicio","nombreCategoria":"Frenos"}
               ]};*/
               for(var i=0;i<_event._data.citas.length;i++){
               		var tempRow = Ti.UI.createTableViewRow({layout:"vertical"});
               		tempRow.add(Ti.UI.createLabel({left:10,text:_event._data.citas[i].tipo+" - "+_event._data.citas[i].nombreCategoria,color:"black"}));
               		tempRow.add(Ti.UI.createLabel({left:10,text:_event._data.citas[i].fecha+" "+_event._data.citas[i].hora+", "+_event._data.citas[i].estado,color:"#c3c3c3",font:{fontSize:11}}));
                    $.table.appendRow(tempRow);
                }
               
            }else{
                //alert(_event._data.error);
            }
        }else{
            alert("Oops! algo salio mal, por favor intente de nuevo.");
        }
    });
    

function finalizar(){
	$.win.close();
}