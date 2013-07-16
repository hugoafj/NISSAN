/**
 * Main app singleton
 * @type {Object}
 */
var APP = {
	ImageFactory:null,
	/**
	 * Keeps track of the current screen
	 * @type {Object}
	 */
	currentController: null, // Active view Controller
	
	/**
	 * The main app window or navigation
	 * @type {Object}
	 */
	masterWindow:null, // Main Container Window
	container:null, // Reference to the view container (to add/remove mor views: currentController.getView())
	headerbar:null, // HeaderBar Controller
	menubar:null, // MenuBar Controller
	tempVar:0,
	//structuresCounter:0,
	//hasListener: false,
	//structureContainer : null,
	
	/**
	 * Sets up the app singleton and all it's child dependencies
	 * NOTE: This should only be fired in index controller file and only once.
	 */
	
	init: function() {
		ImageFactory = require('ti.imagefactory');
		// TODO REMOVE BEFORE RELEASE!!!
										var checkUser = Alloy.createCollection('users');
										checkUser.fetch({query:"SELECT * FROM users WHERE email = 'test@test.test'"  });
										if(!checkUser.length > 0)
										{
											var user = Alloy.createModel('users', {email:'test@test.test',pass:"123"}); 
											user.save();
											user = null;
										}
										checkUser = null;
		// 

 		//Ti.Network.addEventListener("change", APP.networkObserverUpdate);
		// Global Events for iOS
		//Ti.App.addEventListener("pause", APP.pause);
		//Ti.App.addEventListener("close", APP.exit);
		//Ti.App.addEventListener("resume", APP.resume);

		
		
		if (!Ti.App.Properties.hasProperty('loggedIn')) { // if not logged in
			currentController = Alloy.createController('LoginWindow/LoginWindow');
			APP.container = currentController.getView();
		}else{
			currentController = Alloy.createController('MyProjectWindow/MyProjectWindow');
			APP.container = currentController.getView();
		}
		
		APP.masterWindow = APP.container;
	},

	/**
	 * Global event handler to change screens
	 * @param  {Object} _event Params for this navigation event
	 * @example
	 * {
	 * 		controller: String The controller name to load
	 * }
	 */

	handleNavigation: function(path,_params) {
		//Ti.API.info( path );
		if(path !== null) {
			// Remove current controller view
			APP.removeCurrentScreen(function() {

				// Instantiate the screen controller
				APP.currentController = Alloy.createController(path,_params);

				// Add the new screen to the window
				APP.container.add( APP.currentController.getView() );
			});
		} else {
			//Ti.API.error("@APP.handleNavigation() - Index is undefined");
		}
	},

	/**
	 * Global function to remove screens
	 * @param {Function} _callback
	 */
	remove : function(_view){
		_.each(_view.children, function(view) {
		        _view.remove(view);
		        APP.remove(view);
		        view = null;
		        Ti.API.info("removing");
		 });
	},
	
	removeCurrentScreen: function(_callback) {
		if(APP.currentController) {
			APP.container.remove(APP.currentController.getView());
			//APP.remove(APP.currentController.getView());
			//APP.currentController.destruye();
			APP.currentController = null;
		}
		
		if(typeof(_callback) !== "undefined") {
			_callback();
		}
	},
	
	/**
	 * Global function to change the tile screens
	 * @param {string} name
	 */
	/*handleTitle:function(name){
		APP.headerbar.children[0].text=name;
	},*/

	/**
	 * Global network event handler
	 */

	networkObserverUpdate: function() {},

	/**
	 * Pause event observer
	 */

	pause:function(){},	

	/**
	 * Exit event observer
	 */

	exit: function(){},

	/**
	 * Resume event observer
	 */

	resume: function(){},
	
	//Database
	getLastInsertByAlloyId : function(rcvCollection,rcvId,rcvIdName){ 
			//collection name, alloy_id (model.id), id column name in the model.
		    var projectInfo = Alloy.Collections.instance(rcvCollection);
   		    projectInfo.fetch();
   		    var lastProject = projectInfo.where({alloy_id:rcvId});
   		    if(lastProject != null && lastProject.length > 0){
   		    	return lastProject[0].get(rcvIdName);
   		    } else{
   		    	return -1;
   		    }
   		   	 
	},
	
	getThumbnailMedium : function getThumbnailMedium(_url,_type){
		//Ti.API.info(_url);
		/*if("small" == _type){
			var staticHeight	= 61;
			var staticWidth		= 90;
		}else if("medium" == _type){
			var staticHeight	= 91;
			var staticWidth		= 131;
		}else{
			var staticHeight	= 193;
			var staticWidth		= 279;
		}
		var image = Titanium.UI.createImageView({
		    height : Ti.UI.SIZE,
		    width : Ti.UI.SIZE,
		    image : _url
		});
		var hgt = image.toImage().height;
		var wdt = image.toImage().width;
		if(image.toImage().height > image.toImage().width){
			if(image.toImage().height >= staticHeight) {
				hgt = staticHeight;
				wdt = (((staticHeight*100)/image.toImage().height)*image.toImage().width)/100;
				
			}
		}else{
			if(image.toImage().width >= staticWidth) {
				wdt = staticWidth;
				hgt = (((staticWidth*100)/image.toImage().width)*image.toImage().height)/100;
			}
		}
		
		var size = {oldW:image.toImage().width, oldH:image.toImage().height, newW:Math.round(wdt), newH:Math.round(hgt)};
		//Ti.API.info(JSON.stringify(size));
		//image 	= null;
		hgt 	= null;
		wdt 	= null;
		return ImageFactory.imageAsResized(image.toBlob(), { width:size.newW, height:size.newH, quality:ImageFactory.QUALITY_LOW });;*/
		return _url.replace(".png","_thum.png");
	}

};

module.exports = APP;