;define(function(){
	var storage = {

	  set : function (args) {
	        for(var i in args) {
                localStorage.setItem(i, JSON.stringify(args[i]));
            }
	    },
	    get : function (key) {
	        if(localStorage.getItem(key)) {
                try {
                    return JSON.parse(localStorage.getItem(key));
                }catch(e) {
                    return localStorage.getItem(key);
                }
            }else
                return null;
	    },
	    remove : function(key) {
	        localStorage.removeItem(key);
	        sessionStorage.removeItem(key);
	    }

	};
    return {
    	"storage" : storage
    }
});
