;define([
    'scripts/common/event.js',
    'scripts/common/storage.js',
    ],
function(EVENT,STORAGE){
    var ready = function(){
        iMobile.EVENT = EVENT;
        iMobile.STORAGE = STORAGE;
        iMobile.TEMPLATE={
            editorModulesDomTemplate : iMobile.Handlebars.compile(iMobile.DOM["editor-modules"]),
            wrapperPageDomTemplate : iMobile.Handlebars.compile(iMobile.DOM.wrapperPageDom),
            wrapperNewPageDomTemplate : iMobile.Handlebars.compile(iMobile.DOM.wrapperNewPageDom),
            wrapperModularDomTemplate : iMobile.Handlebars.compile(iMobile.DOM.wrapperModularDom),
            iphoneDomTemplate : iMobile.Handlebars.compile(iMobile.DOM.iphoneDom),
            wrapperIphoneDomTemplate : iMobile.Handlebars.compile(iMobile.DOM.wrapperIphoneDom)
        };
        iMobile.SCROLL = {};
        iMobile.mainRightContent=$('.main-right-content');
        
        iMobile.STORAGE.modulesStorage.set(iMobile.DATA["website"]["modules"]);

        if(iMobile.STORAGE.pageStorage.get()){
            if(iMobile.DATA["pageData"]["site"] != iMobile.STORAGE.pageStorage.getName("site")){
                iMobile.STORAGE.pageStorage.remove();
                //iMobile.STORAGE.pageStorage.set(iMobile.DATA["pageData"]);
            }
        }else{
            iMobile.STORAGE.pageStorage.set(iMobile.DATA["pageData"]);
        }
        
        iMobile.STORAGE.pageList.set(iMobile.DATA["pageList"]);
        iMobile.STORAGE.commodity.set(iMobile.DATA["commodity"]);
        // $('.header').append(iMobile.TEMPLATE.wrapperPageDomTemplate(iMobile.STORAGE.pageStorage.get()));
        // $('.main-left').append(iMobile.TEMPLATE.wrapperModularDomTemplate(iMobile.DATA));
        // $('.main-middle').prepend(iMobile.TEMPLATE.iphoneDomTemplate());
        // var getPageActive = iMobile.STORAGE.pageStorage.getPageActive();
        // iMobile.PAGE = getPageActive;
        // iMobile.EVENT.modules(getPageActive);
        // iMobile.EVENT.indexInit();



        //iMobile.STORAGE.pageStorage.set(iMobile.DATA["pageData"]);

        // $('.header').append(iMobile.wrapperPageDomTemplate(iMobile.STORAGE.pageStorage.get()));
        // $('.main-left').append(iMobile.wrapperModularDomTemplate(iMobile.DATA));
        // $('.main-middle').prepend(iMobile.iphoneDomTemplate());
        // iMobile.EVENT.modules(iMobile.STORAGE.pageStorage.getPage().pageContent);
        // iMobile.EVENT.indexInit();
        //iMobile.pageId = iMobile.STORAGE.pageStorage.getPageId(0);
        if('file://'===window.location.origin){
            $('.header').append(iMobile.TEMPLATE.wrapperPageDomTemplate(iMobile.STORAGE.pageStorage.get()));
            $('.main-left').append(iMobile.TEMPLATE.wrapperModularDomTemplate(iMobile.DATA["website"]["modules"]));
            $('.main-middle').prepend(iMobile.TEMPLATE.iphoneDomTemplate());
            var getPageActive = iMobile.STORAGE.pageStorage.getPageActive();
            iMobile.PAGE = getPageActive;
            iMobile.EVENT.modules(getPageActive);
            iMobile.EVENT.indexInit();
        }else{
            iMobile.request.ajax({
                server : 'getPageModules',
                dataType : 'POST',
                done : function(data){
                    iMobile.STORAGE.pageStorage.set(data);
                    
                    iMobile.request.ajax({
                        server : 'getPageList',
                        dataType : 'POST',
                        done : function(pageList){
                            iMobile.STORAGE.pageList.set(pageList);
                    iMobile.request.ajax({
                        server : 'getWxItemList',
                        dataType : 'POST',
                        done : function(commodity){
                            iMobile.STORAGE.commodity.set(commodity);
                            $('.header').append(iMobile.TEMPLATE.wrapperPageDomTemplate(iMobile.STORAGE.pageStorage.get()));
                            $('.main-left').append(iMobile.TEMPLATE.wrapperModularDomTemplate(iMobile.DATA["website"]["modules"]));
                            $('.main-middle').prepend(iMobile.TEMPLATE.iphoneDomTemplate());
                            var getPageActive = iMobile.STORAGE.pageStorage.getPageActive();
                            iMobile.PAGE = getPageActive;
                            iMobile.EVENT.modules(getPageActive);
                            iMobile.EVENT.indexInit();
                        }
                    });
                        }
                    });
               }
            })
        }
        
        
    };
    return {
        ready : ready
    }
})