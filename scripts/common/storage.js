;define(function(){
	var pageStorage = {
		
		set : function(DATA){
			iMobile.storage.set({
				"pageSite" : DATA
			})
		},
		get : function(){
			return iMobile.storage.get("pageSite");
		},
		getName : function(name){
			if(name){
				return pageStorage.get()[name]
			}else{
				return pageStorage.get()
			}
		},
		getPageId : function(index){
			var page = pageStorage.get()["page"]
			if(typeof index == 'number'){
				return page[index]["pageId"];
			}else{
				var pageIdArray = [];
				for(var i in page){
					pageIdArray.push(page[i]["pageId"])
				};
				return pageIdArray;
			}
			
		},
		getPage : function(pageId){
			var page = pageStorage.getName("page");
			if(pageId){
				for(var i in page){
					if(parseInt(pageId) == parseInt(page[i]["pageId"])){
						return {
							"pageIndex" : i,
							"pageContent" : page[i]
						}
					}
				}
			}else{
				return {
					"pageIndex" : 0,
					"pageContent" : page[0]
				}
			}
		},
		addPage : function(newData){
			var page = pageStorage.get();
			page["page"].push(newData);
			pageStorage.set(page);
		},
		removePage : function(pageId){
			var page = pageStorage.get(),newPage=[];
			for(var i in page['page']){
				if(parseInt(page['page'][i]['pageId'])==parseInt(pageId)){
					
				}else{
					newPage.push(page['page'][i])
				}
			}
			page['page'] = newPage;
			pageStorage.set(page);
			console.log(page)
		},
		getPageActive : function(){
			var page = pageStorage.get()['page'],
				pageActive;
			for(var i in page){
				if(page[i]['pageActive']){
					pageActive =  page[i]
				}
			}
			if(!pageActive){
				pageActive =  page[0]
			}
			return pageActive

		},
		setPageActive : function(pageId){
			var page = pageStorage.get();
			for(var i in page['page']){
				if(parseInt(page['page'][i]['pageId'])==parseInt(pageId)){
					page['page'][i]['pageActive'] = true;
				}else{
					page['page'][i]['pageActive'] = false;
				}
			}
			pageStorage.set(page)
		},
		getPageIndex : function(){
			var page = pageStorage.get()['page'],
				pageActive;
			for(var i in page){
				if(page[i]['pageIndex']){
					pageActive =  page[i]
				}
			}
			if(!pageActive){
				pageActive =  page[0]
			}
			return pageActive

		},
		setPageIndex : function(pageId){
			var page = pageStorage.get();
			for(var i in page['page']){
				if(parseInt(page['page'][i]['pageId'])==parseInt(pageId)){
					page['page'][i]['pageIndex'] = true;
				}else{
					page['page'][i]['pageIndex'] = false;
				}
			}
			pageStorage.set(page)
		},
		getPageModulerType : function(){
			var page = pageStorage.get()['page'],
				pageActive;
			for(var i in page){
				if(page[i]['pageActive']){
					pageActive =  page[i]['pageModulerType']
				}
			}
			// if(!pageActive){
			// 	pageActive =  page[0]
			// }
			return pageActive

		},
		setPageModulerType : function(pageId,type){
			var page = pageStorage.get();
			for(var i in page['page']){
				if(parseInt(page['page'][i]['pageId'])==parseInt(pageId)){
					page['page'][i]['pageModulerType'] = type;
				}
			}
			pageStorage.set(page)
		},
		addModules : function(pageId,modulesId){
			var pageIndex = pageStorage.getPage(pageId).pageIndex;
			var pageContent = pageStorage.getPage(pageId).pageContent;
			var modules = modulesStorage.getModules(modulesId);
			pageContent["pageModules"].push(modules);

			var page = pageStorage.get();
			page["page"][pageIndex]=pageContent;
			pageStorage.set(page);

		},
		upModules : function(pageId,modulesActiveIndex){
			var pageIndex = pageStorage.getPage(pageId).pageIndex;
			var pageContent = pageStorage.getPage(pageId).pageContent;
			var prevModule,modulesArray= [];
			for(var i in pageContent["pageModules"]){
				if(i==modulesActiveIndex){
					prevModule = pageContent["pageModules"][i]
				}else if(i==(modulesActiveIndex+1)){
					modulesArray.push(pageContent["pageModules"][i])
					modulesArray.push(prevModule);
				}else{
					modulesArray.push(pageContent["pageModules"][i])
				}
			}
			pageContent.pageModules = modulesArray
			var page = pageStorage.get();
			page["page"][pageIndex]=pageContent;
			pageStorage.set(page);
		},
		downModules : function(pageId,modulesActiveIndex){
			var pageIndex = pageStorage.getPage(pageId).pageIndex;
			var pageContent = pageStorage.getPage(pageId).pageContent;
			var nextModule,modulesArray= [];
			for(var i in pageContent["pageModules"]){
				if(i==modulesActiveIndex-1){
					nextModule = pageContent["pageModules"][i];
				}else if(i==(modulesActiveIndex)){
					modulesArray.push(pageContent["pageModules"][i]);
					modulesArray.push(nextModule);
				}else{
					modulesArray.push(pageContent["pageModules"][i]);
				}
			}
			pageContent.pageModules = modulesArray;
			var page = pageStorage.get();
			page["page"][pageIndex]=pageContent;
			pageStorage.set(page);
		},
		changeModules : function(pageId,modulesActiveIndex,args){
			if(typeof pageId == 'object'){
				pageId = pageId[0]
			}
			var pageIndex = pageStorage.getPage(pageId).pageIndex;
			var pageContent = pageStorage.getPage(pageId).pageContent;
			for(var i in args){
				pageContent["pageModules"][modulesActiveIndex][i] = args[i];
			}
			var page = pageStorage.get();
			page["page"][pageIndex]=pageContent;
			pageStorage.set(page);
		},
		remove : function(){
			iMobile.storage.remove("pageSite");
		},
		removeModules : function(pageId,modulesActiveIndex){
			var pageIndex = pageStorage.getPage(pageId).pageIndex;
			var pageContent = pageStorage.getPage(pageId).pageContent;
			var newPageMoudles = [];
			for(var i in pageContent.pageModules){
				if(i!=parseInt(modulesActiveIndex)){
					newPageMoudles.push(pageContent.pageModules[i]);
				}
			}
			pageContent.pageModules = newPageMoudles;
			var page = pageStorage.get();
			page["page"][pageIndex]=pageContent;
			pageStorage.set(page);
		}
	};
	var modulesStorage = {
		modules : function(){
			return iMobile.storage.get("pageSite");
		},
		set : function(DATA){
			iMobile.storage.set({
				"modules" : DATA
			})
		},
		get : function(){
			return iMobile.storage.get("modules");
		},
		getModules : function(modulesId){
			var modules = modulesStorage.get();
			for(var i in modules){
				for(var j in modules[i]){
					if(modulesId == modules[i][j]["modulesId"]){
						return modules[i][j];
					}
				}
			}
		},
		remove : function(DATA){

		}
	};
	var pageList = {
		set : function(DATA){
			iMobile.storage.set({
				"pageList" : DATA
			})
		},
		get : function(){
			return iMobile.storage.get("pageList");
		},
	};
	var commodity = {
		set : function(DATA){
			iMobile.storage.set({
				"commodity" : DATA
			})
		},
		get : function(){
			return iMobile.storage.get("commodity");
		},
	};
	return {
		'pageStorage' : pageStorage,
		'modulesStorage' : modulesStorage,
		'pageList' : pageList,
		'commodity' : commodity
	}
});