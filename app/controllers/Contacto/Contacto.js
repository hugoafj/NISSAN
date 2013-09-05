// FUNCTIONS
function cancelar(){
	$.win.close();
}

function openURL(){
    Alloy.createController("WebView/WebView",{url:"http://www.nissantijuana.com.mx/"}).getView().open();
}

function makeCall1(){
    Ti.Platform.openURL('tel:6461767118');
}

function makeCall2(){
    Ti.Platform.openURL('tel:6655213234');
}

function makeCall3(){
    Ti.Platform.openURL('tel:6646213353');
}

function makeCall4(){
    Ti.Platform.openURL('tel:6646834311');
}
