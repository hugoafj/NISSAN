var args = arguments[0] || {};
var HTTP = require("/http");
var count = 0;
var tipo = 0;
var value = 0;
var sucursal = 1;
var asesores = [];
var asesoresOptions = [];
var asesor = 0;
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
     //Ti.API.info(JSON.stringify(_event));
     value = _event.source.valor;
}

function selectRep(_event){
    if(_event.value == 1){
        count = count+1;
        tipo = 2;
     }else{
        count = count-1;
     }
      value = _event.source.valor;
}

function openSucoptions(){
    var opts = {
      //cancel: 2,
      options: ['Rio Tijuana', 'Tecate', 'Insurgentes'],
      //selectedIndex: 2,
     // destructive: 0,
      title: 'Selecciona una Sucursal'
    };
    var dialog = Ti.UI.createOptionDialog(opts);
    dialog.show();
    dialog.addEventListener("click",function(_event){
        //Ti.API.info(JSON.stringify(_event));
        sucursal = _event.index+1;
        $.txt_suc.value = _event.source.options[_event.index];
        getAsesores();
    });
}

function openAseOptions(){
    var opts = {
      //cancel: 2,
      options: asesoresOptions,
      //selectedIndex: 2,
     // destructive: 0,
      title: 'Selecciona un Asesor'
    };
    var dialog = Ti.UI.createOptionDialog(opts);
    dialog.show();
    dialog.addEventListener("click",function(_event){
        Ti.API.info(JSON.stringify(asesores[_event.index].nombre));
        asesor = asesores[_event.index].id;
        $.txt_ase.value = asesores[_event.index].nombre;
    });
}

function finalizar(){
    if(count == 1){
        if($.fecha.value.length > 7){
            if($.hora.value.length > 4){
                var tempData = {tipo:tipo,servicio:value,fecha:$.fecha.value,hora:$.hora.value,sucursal:sucursal,asesor:asesor,email:args.mail,password:args.pass,idUsuario:args.idCliente};
                //Ti.API.info("123 "+JSON.stringify(tempData));
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

function getAsesores(){
    var tempData = {password:args.pass,email:args.mail,agencia:sucursal,idUsuario:args.idCliente};
    //Ti.API.info("123 "+JSON.stringify(tempData));
    HTTP.request({format:"JSON",type:"POST",url:"http://isdnetworks.com/nissan/ws/getAsesores.php",data:tempData}, function(_event){
        //Ti.API.info("123 "+JSON.stringify(_event));
        if(_event._result == 1){
            if(_event._data.success == 1){
                //alert("Su cita sera confirmada via correo electronico.");
                //$.win.close();
                asesores = _event._data.asesores;
                $.txt_ase.value = asesores[0].nombre;
                asesor = asesores[0].id;
                asesoresOptions = [];
                for(var i=0;i<asesores.length;i++){
                    asesoresOptions.push(asesores[i].nombre);
                }
            }else{
                //alert(_event._data.error);
            }
        }else{
            //alert("Oops! something went wrong, please try again.");
        }
    });
}

function openDatePicker(){
    $.fecha.blur();
    var picker = Ti.UI.createPicker({
      type:Ti.UI.PICKER_TYPE_DATE,
      minDate:new Date(),
      maxDate:new Date(2015,11,31),
      value:new Date(),
      top:50
    });
    
    var dateView = Ti.UI.createView({top:0,backgroundImage:"/images/bgBlackOpacity39.png"});
    
    var dateButton = Ti.UI.createButton({top:2,right:10,title:"Cerrar"});
    
    $.win.add(dateView);
    $.win.add(picker);
    dateView.add(dateButton);
    
    dateButton.addEventListener("click",function(){
        $.win.remove(picker);
        $.win.remove(dateView);
    });
    
    picker.addEventListener('change',function(e){
      Ti.API.info("User selected date: " + e.value.toUTCString());
      var tempDate = new Date(e.value.toUTCString());
      $.fecha.value = tempDate.getDate()+"/"+(tempDate.getMonth()+1)+"/"+tempDate.getFullYear();
      $.hora.value = ((tempDate.getHours() < 10)?"0"+tempDate.getHours():tempDate.getHours())+":"+((tempDate.getMinutes() < 10)?"0"+tempDate.getMinutes():tempDate.getMinutes());//+" "+e.value.toUTCString().substring(e.value.toUTCString().length-6, e.value.toUTCString().length-4);
    });
    $.fecha.blur();
}

function openTimePicker(){
    $.hora.blur();
    var picker = Ti.UI.createPicker({
      type:Ti.UI.PICKER_TYPE_TIME,
      value:new Date(),
      top:50
    });
    var dateView = Ti.UI.createView({top:0,backgroundImage:"/images/bgBlackOpacity39.png"});
    var dateButton = Ti.UI.createButton({top:2,right:10,title:"Cerrar"});
    
    $.win.add(dateView);
    $.win.add(picker);
    dateView.add(dateButton);
    dateButton.addEventListener("click",function(){
        $.win.remove(picker);
        $.win.remove(dateView);
    });
    
    picker.addEventListener('change',function(e){
      Ti.API.info("User selected hour: " + e.value.toUTCString());
      var tempDate = new Date(e.value.toUTCString());
      $.hora.value = ((tempDate.getHours() < 10)?"0"+tempDate.getHours():tempDate.getHours())+":"+((tempDate.getMinutes() < 10)?"0"+tempDate.getMinutes():tempDate.getMinutes());
    });
    $.hora.blur();
}

getAsesores();
