function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.LoginWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        backgroundImage: "/images/bg.jpg",
        layout: "vertical",
        id: "LoginWindow"
    }), "Window", null);
    $.addTopLevelView($.__views.LoginWindow);
    $.__views.__alloyId1 = A$(Ti.UI.createView({
        backgroundColor: "#d62a38",
        top: 80,
        left: 0,
        right: 0,
        height: 40,
        id: "__alloyId1"
    }), "View", $.__views.LoginWindow);
    $.__views.LoginWindow.add($.__views.__alloyId1);
    $.__views.__alloyId2 = A$(Ti.UI.createLabel({
        color: "white",
        left: 25,
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        text: "Iniciar Sesion",
        id: "__alloyId2"
    }), "Label", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = A$(Ti.UI.createView({
        left: 20,
        right: 20,
        top: 10,
        id: "__alloyId3"
    }), "View", $.__views.LoginWindow);
    $.__views.LoginWindow.add($.__views.__alloyId3);
    $.__views.__alloyId4 = A$(Ti.UI.createLabel({
        top: 60,
        left: 10,
        color: "#4b4b4b",
        text: "Correo",
        id: "__alloyId4"
    }), "Label", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = A$(Ti.UI.createTextfield({
        left: 0,
        top: 20,
        width: 160,
        id: "__alloyId5"
    }), "Textfield", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = A$(Ti.UI.createLabel({
        text: "Contraseña",
        id: "__alloyId6"
    }), "Label", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.__alloyId7 = A$(Ti.UI.createTextfield({
        left: 0,
        top: 80,
        width: 160,
        id: "__alloyId7"
    }), "Textfield", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId7);
    $.__views.__alloyId8 = A$(Ti.UI.createButton({
        left: 15,
        top: 140,
        title: "Registro",
        id: "__alloyId8"
    }), "Button", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId8);
    $.__views.__alloyId9 = A$(Ti.UI.createButton({
        title: "Entrar",
        id: "__alloyId9"
    }), "Button", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId9);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;