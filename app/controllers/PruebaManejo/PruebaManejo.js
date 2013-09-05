// FUNCTIONS
function cancelar(){
	$.win.close();
}

function openURL(){
    Alloy.createController("WebView/WebView",{url:"http://www.nissantijuana.com.mx/prueba-de-manejo-es-mx.htm"}).getView().open();
}