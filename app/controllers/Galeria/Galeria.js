// FUNCTIONS
function cancelar(){
	$.win.close();
}

function openURL(){
    Alloy.createController("WebView/WebView",{url:"http://www.nissan.com.mx/modelos#"}).getView().open();
}