;define(['director'],function(director){

	var src = '';
	var index = function(){
		src = 'index'
	}
	var view = function(){
		src = 'view'
	}
	var routes = {
		'/index' : index,
		'/view' : view
	};
	Router(routes).configure({
		on:function(){
			require([src],function(dom){
				dom.ready();
			})
		},
		notfound:function(){
			require(['index'],function(dom){
				dom.ready();
			})
		}
	}).init();
	if(!window.location.hash){
		require(['index'],function(dom){
			dom.ready();

		})
	}
	

});