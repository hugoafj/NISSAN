// FUNCTIONS
function openServicios(){
	Alloy.createController("Servicios/Servicios").getView().open();
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
    Alloy.createController("WebView/WebView").getView().open();
}

