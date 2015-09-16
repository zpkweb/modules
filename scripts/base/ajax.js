;define(function(){
    function ajax(args){
        //var url = window.location.origin+'/appsupply/app!'+args.server+'.action'
        var url = '',type='';
        if(args.url){
            url = args.url;
        }else{
            //url = 'http://localhost:8080/gold/wxshop/wx_shop_design!'+args.server+'.action';
            //url = 'http://192.168.2.61:8080/gold/wxshop/wx_shop_design!'+args.server+'.action';
            //url = 'http://demo.zksr.cn/wxshop/wx_shop_design!'+args.server+'.action';
            url = 'http://192.168.2.81:8888/wxshop/wx_shop_design!'+args.server+'.action';
        }
        // if(window.location.origin=='http://demo.zksr.cn'){
        //     args.type = 'json';
        // }else{
        //     args.type = 'jsonp';
        // }
        if(args.type=="jsonp"){
            type = "jsonp"
        }else if(args.type=="ajaxFileUpload"){
            return url;
        }else{
            type = "json"
        }

        if(type=="jsonp"){
            $.ajax({
                 type: "get",
                 async: false,
                 url : url,
                 data : args.data || '',
                 dataType: "jsonp",
                 jsonp: args.jsonp || "callback"
            }).done(function(data) {
                args.done(data);
            }).fail(function(data){
                args.fail
            });
        }else if(type=="json"){
            $.ajax({
                url : url,
                type : args.dataType || 'get',
                data : args.data || '',
            }).done(function(data){
                if(args.done){
                    args.done(data);
                }
            }).fail(args.fail);
        }else if(type == "ajaxFileUpload"){
            $.ajaxFileUpload({
                    url:url,
                    secureuri:false,
                    fileElementId:'img',    
                    dataType:'json',
                    data:{'width':'100','height':'100','imgFileName':'file.png'},
                    success:function(res){
                        if(args.done){
                            args.done(data);
                        }
                    },
                    error:function(res,status,e){
                    }
                })
        }
    
        
        
        
        


    }
    function args() {
        var args = {};
        var match = null;
        var search = decodeURIComponent(location.search.substring(1));
        var reg = /(?:([^&]+)=([^&]+))/g;
        while((match = reg.exec(search))!==null){
            args[match[1]] = match[2];
        }
        return args;

    }
    
    function request(args) {
        if(args.id) {
            var p = port[args.id];
            if('ajax' == args.type) {
                var pdata = {
                    'service' : p.service,
                    'data' : {}
                };
                for(var i in p.param) {
                    var j = p.param[i];
                    pdata.data[j] = args.data[j];
                }
                $.ajax({
                    url : p.url,
                    type : 'POST',
                    data : {
                        pdata : JSON.stringify(pdata),
                        version : p.version || '1.0',
                        qs : decodeURIComponent(location.search.substring(1)),
                        mpid : (WC ? $('#mpid').val() : ''),
                        o : storage.getStorage('wechat', 'local') ? storage.getStorage('wechat', 'local').openid : ''
                    }
                }).done(function(data) {
                    
                        args.suc(data);

                    }).fail(args.fail);
            
            }else {
                $.ajax({
                url : p.url,
                type : p.type || 'POST',
                data : args.data || null
                }).done(function(data) {
                    args.suc(data);
                    }).fail(args.fail);
            }
        }
        
    }
    return {
        ajax : ajax,
        args : args
    }
})