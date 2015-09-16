;define(['scripts/template/index-template.js',
	'./data/modules.js',
	'scripts/common/event.js',
	'scripts/common/storage.js',
	'scripts/library/webuploader.js'],
function(DOM,DATA,EVENT,STORAGE){
	var ready = function(){
		iMobile.DOM = DOM;
		iMobile.DATA = DATA;
		iMobile.EVENT = EVENT;
		iMobile.STORAGE = STORAGE;
		if(iMobile.modulesHtml){
			$('body').empty().append(iMobile.modulesHtml);
		}
		
	}
	return {
		ready : ready
	}
})