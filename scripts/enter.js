var iMobile = {
};

require(['domReady!'],function(doc){
    require.config({
        baseUrl : './scripts/main',
        paths : {
            jquery : '../../scripts/library/jquery.min',
            jqueryUI : '../../scripts/library/jquery-ui.min',
            bootstarp : '../../scripts/library/bootstrap',
            director : '../../scripts/library/director',
            handlebars : '../../scripts/library/handlebars',
            iMobile : '../../scripts/base/iMobile',
            request : '../../scripts/base/request',
            routers : '../../scripts/common/routers',
            iCheck : '../../scripts/library/icheck.min',
            iScroll : '../../scripts/library/iscroll',
            swiper : '../../scripts/library/swiper.min',
            modules : '../../data/modules',
            template : '../../scripts/template/index-template'
        },
        shim: {
            // 'director' : {
            //  exports: 'director'  
            // },
         //    'handlebars': {
         //        exports: 'Handlebars'  
         //    },
         //    'namespace' : {
         //     exports : 'Namespace'
         //    }
        },
        urlArgs: 'v=' + new Date().getTime()
    });
    var href=window.location.pathname.split('/'),src='';
    src = href[href.length-1].split('.')[0];
    require(['jquery','jqueryUI','director','handlebars'],function($,jqueryUI,director,Handlebars){
        require(['bootstarp','routers','request','iCheck','iScroll','swiper','iMobile','modules','template'],
            function(bootstarp,routers,request,iCheck,iScroll,swiper,i,DATA,DOM){
            iMobile = {
                CONSTANT : {
                    wWidth : $(window).width(),
                    wHeight : $(window).height(),
                    dWidth : $(document).width(),
                    dHeight : $(document).height(),
                    pageWidth : 149
                },
                Handlebars : Handlebars,
                request : request,
                storage : i.storage,
                DOM : DOM,
                DATA : DATA,
            }
          
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blur',
                radioClass: 'iradio_square-blur',
                increaseArea: '20%' // optional
              });
        })
    })
})