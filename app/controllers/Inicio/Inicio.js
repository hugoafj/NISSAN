var args = arguments[0] || {};
// FUNCTIONS
function openServicios(){
	Alloy.createController("Servicios/Servicios",{mail:args.mail}).getView().open();
}

function openNotificaciones(){
	Alloy.createController("Notificaciones/Notificaciones").getView().open();
}

function openPruebaManejo(){
	Alloy.createController("PruebaManejo/PruebaManejo").getView().open();
}

function openGaleria(){
	Alloy.createController("Galeria/Galeria").getView().open();
}

function openContacto(){
	Alloy.createController("Contacto/Contacto").getView().open();
}

function openLogin(){
	Alloy.createController("LoginWindow/LoginWindow").getView().open();
}

function openFace(){
    Alloy.createController("WebView/WebView",{url:"http://www.facebook.com/nissan.ensenadatecate"}).getView().open();
}

function openMas(){
    Alloy.createController("WebView/WebView",{url:"/images/const.png"}).getView().open();
}

function loNuevo(){
    Alloy.createController("LoNuevo/LoNuevo").getView().open();
}