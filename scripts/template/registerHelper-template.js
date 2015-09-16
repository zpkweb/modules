;define(['scripts/template/index-template.js'],function(){
        iMobile.Handlebars.registerHelper("pagination",function(data,index){
            var page = Math.ceil(data/9);
            if(typeof index != 'number'){
                index = 1;
            }
            var navHtml = "";
            navHtml += '<nav class="pagination-nav">';
            navHtml += '<ul class="pagination">';
            navHtml += '<li class="previous"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            if(page<=10){
                for(var i=1;i<page;i++){
                    navHtml += '<li data-index="'+i+'" class="'+(i==index?'active':'')+'"><a href="javascript:;">'+i+'</a></li>'
                }
            }else{
                navHtml += '<li data-index="1" class="'+(1==index?'active':'')+'"><a href="javascript:;">1</a></li>';
                if(index<5){
                    for(var i=2;i<=5;i++){
                        navHtml += '<li data-index="'+i+'" class="'+(i==index?'active':'')+'"><a href="javascript:;">'+i+'</a></li>'
                    }
                    navHtml += '<li class="ellipsis">...</li>';
                }else if(index>=5&&index<(page-3)){
                    
                    navHtml += '<li class="ellipsis">...</li>';
                    for(var i=(index-1);i<=(index+1);i++){
                        navHtml += '<li data-index="'+i+'" class="'+(i==index?'active':'')+'"><a href="javascript:;">'+i+'</a></li>'
                    }
                    navHtml += '<li class="ellipsis">...</li>';
                }else{
                    navHtml += '<li class="ellipsis">...</li>';
                    for(var i=(page-4);i<page;i++){
                        navHtml += '<li data-index="'+i+'" class="'+(i==index?'active':'')+'"><a href="javascript:;">'+i+'</a></li>'
                    }
                }
            }
            navHtml += '<li data-index="'+page+'" class="'+(page==index?'active':'')+'"><a href="javascript:;">'+page+'</a></li>'
            navHtml += '<li class="next"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            navHtml += '</ul>';
            navHtml += '</nav>';
            return navHtml;
        });
        iMobile.Handlebars.registerHelper("modulesNav",function(data){
            var html ="";
            var navLength = data.nav.length;
            html += '<nav class="modules-nav modules-content modules-nav-'+navLength+'" role="group"  data-modulesId="'+data.modulesId+'">'
            html +=       '<div class="modules" data-modulesId="'+data.modulesId+'"></div>'
            if(navLength==1){
            html +=         '<a href="javascript:redirectToIndexPage();" class="nav-a w100"><span class="glyphicon glyphicon-home"></span></a>'
            }else if(navLength==2){
            html +=     '<a href="javascript:redirectToIndexPage();" class="nav-a w16"><span class="glyphicon glyphicon-home"></span></a>'
            html +=     '<a href="'+data.nav[1]["href"]+'" class="nav-a w84">'+data.nav[1]["name"]+'</a>'
                
            }else if(navLength==3){
            html +=     '<a href="javascript:redirectToIndexPage();" class="nav-a w16"><span class="glyphicon glyphicon-home"></span></a>'
            html +=     '<a href="'+data.nav[1]["href"]+'" class="nav-a w42">'+data.nav[1]["name"]+'</a>'
            html +=     '<a href="'+data.nav[2]["href"]+'" class="nav-a w42">'+data.nav[2]["name"]+'</a>'
            }else if(navLength==4){
            html +=     '<a href="javascript:redirectToIndexPage();" class="nav-a w16"><span class="glyphicon glyphicon-home"></span></a>'
            html +=     '<a href="'+data.nav[1]["href"]+'" class="nav-a w28">'+data.nav[1]["name"]+'</a>'
            html +=     '<a href="'+data.nav[2]["href"]+'" class="nav-a w28">'+data.nav[2]["name"]+'</a>'
            html +=     '<a href="'+data.nav[3]["href"]+'" class="nav-a w28">'+data.nav[3]["name"]+'</a>'
                
            }
            html +=     '<a href="javascript:redirectToCartPage();" class="nav-shopping"></a>'
            html += '</nav>'
            return html;
        });
        iMobile.Handlebars.registerHelper("nav",function(data){
            var html = '';
            for(var i=1;i<data.nav.length;i++){
                html += '<div class="panel panel-info">';
                html +=   '<div class="panel-heading">导航</div>';
                html +=   '<div class="panel-body">';
                html +=     '<div class="form-group">';
                html +=       '<label>导航名称：</label>';
                html +=       '<input type="text" class="form-control form-nav-name" placeholder="'+data.nav[i].name+'">';
                html +=     '</div>';
                html +=     '<div class="form-group">';
                html +=       '<label>链接到：</label>';
                html +=       '<select class="form-control form-link-list form-link-list-nav">';
                html +=       '<option>请选择</option>';
                for(var j=0;j<data.pageList.length;j++){
                    if(j==data.nav[i].active){
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'" selected>'+data.pageList[j].pageName+'</option>';
                    }else{
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'">'+data.pageList[j].pageName+'</option>';
                    }
                    
                }
                html +=       '</select>';
                //html +=       // '<input type="text" class="form-control form-nav-link" placeholder="{{href}}">',
                html +=     '</div>';
                html +=   '</div>';
                html += '</div>';
            }

            return html;
                
        });
        iMobile.Handlebars.registerHelper("textNav",function(data){
            var html = '';
            for(var i=0;i<data.textNav.length;i++){
                html += '<div class="panel panel-info">';
                html +=   '<div class="panel-heading">文本导航</div>';
                html +=   '<div class="panel-body">';
                html +=     '<div class="form-group">';
                html +=       '<label>导航名称：</label>';
                html +=       '<input type="text" class="form-control form-textNav-name" placeholder="'+data.textNav[i].text+'">';
                html +=     '</div>';
                html +=     '<div class="form-group">';
                html +=       '<label>链接到：</label>';
                html +=       '<select class="form-control form-link-list form-link-list-textNav">';
                html +=       '<option>请选择</option>';
                for(var j=0;j<data.pageList.length;j++){
                    if(j==data.textNav[i].active){
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'" selected>'+data.pageList[j].pageName+'</option>';
                    }else{
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'">'+data.pageList[j].pageName+'</option>';
                    }
                    
                }
                html +=       '</select>';
                //html +=       // '<input type="text" class="form-control form-textNav-link" placeholder="{{href}}">',
                html +=     '</div>';
                html +=   '</div>';
                html += '</div>';
            }

            return html;
                
        });
        iMobile.Handlebars.registerHelper("imageNav",function(args,type){
            if(args=="图片导航"||args=="images/fff.png"||args=="http://www.baidu.com"){
                if(typeof type=="string"){
                    return type
                }else{
                    return args;
                }
            }else{
                if(type=="href"){
                    return "active"
                }else{
                    return args
                }
            }
        });
        iMobile.Handlebars.registerHelper("imageNavList",function(data){
            function imageNav(args,type){
                if(args=="图片导航"||args=="images/fff.png"||args=="http://www.baidu.com"){
                    if(typeof type=="string"){
                        return type
                    }else{
                        return args;
                    }
                }else{
                    if(type=="href"){
                        return "active"
                    }else{
                        return args
                    }
                }
            }
            var html = '';
            for(var i=0;i<data.imageNav.length;i++){
                html += '<div class="panel panel-info">';
                html += '<div class="panel-heading">图片导航</div>';
                html += '<div class="panel-body imageNav-content">';
                html +=       '<div class="form-group imageNav-uploader '+imageNav(data.imageNav[i].src,"href")+'">';
                html +=        '<button type="button" class="btn btn-default uploaderButton"><span class="glyphicon glyphicon-plus-sign text-success"></span>添加图片</button>';
                html +=        '<div class="imageNav-showImgContent">';
                html +=          '<img class="imageNav-showImg" src="'+imageNav(data.imageNav[i].src)+'" />';
                html +=          '<a href="javascript:;" class="imageNav-resetImg">重新上传</a>';
                html +=        '</div>';
                html +=      '</div>';
                html +=    '<div class="form-group">';
                html +=      '<label>导航名称：</label>';
                html +=      '<input type="text" class="form-control form-imageNav-name" value="'+imageNav(data.imageNav[i].text,"")+'" placeholder="'+imageNav(data.imageNav[i].text)+'">';
                html +=    '</div>';
                html +=    '<div class="form-group">';
                html +=      '<label>链接到：</label>';
                html +=       '<select class="form-control form-link-list form-link-list-imageNav">';
                html +=       '<option>请选择</option>';
                for(var j=0;j<data.pageList.length;j++){
                    if(j==data.imageNav[i].active){
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'" selected>'+data.pageList[j].pageName+'</option>';
                    }else{
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'">'+data.pageList[j].pageName+'</option>';
                    }
                }
                html +=       '</select>';
                //html +=      '<input type="text" class="form-control form-imageNav-link"  value="{{imageNav href ""}}" placeholder="{{imageNav href}}">',
                html +=    '</div>';
                html +='</div>';
                html +='</div>';
            }
            return html;
        });
        iMobile.Handlebars.registerHelper("imageAdsList",function(data){
            function funImageAds(args,type){
                if(args=="图片导航"||args=="images/fff.png"||args=="http://www.baidu.com"){
                    if(typeof type=="string"){
                        return type
                    }else{
                        return args;
                    }
                }else{
                    if(type=="href"){
                        return "active"
                    }else{
                        return args
                    }
                }
            }
            var html = '';
            var imageAds;
            if(data.imageAds){
                imageAds = data.imageAds
            }else{
                imageAds = data.defaultImageAds
            }
            for(var i=0;i<imageAds.length;i++){
                html += '<div class="panel panel-info panel-ads">';
                html += '<div class="panel-heading">广告</div>';
                html +=     '<div class="panel-body imageAds-content">';
                html +=         '<div class="form-group imageAds-uploader active">';
                html +=           '<button type="button" class="btn btn-default uploaderButton"><span class="glyphicon glyphicon-plus-sign text-success"></span>添加图片</button>';
                html +=           '<div class="imageAds-showImgContent">';
                html +=             '<img class="imageAds-showImg" src="'+imageAds[i].img+'" />';
                html +=             '<a href="javascript:;" class="imageAds-resetImg imageAds-resetImg">重新上传</a>';
                html +=           '</div>';
                html +=         '</div>';
                html +=         '<div class="form-group">';
                html +=           '<label>标题：</label>';
                html +=           '<input type="text" class="form-control form-imageAds-name" value="'+funImageAds(imageAds[i].text,"")+'" placeholder="标题">';
                html +=         '</div>';
                html +=         '<div class="form-group">';
                html +=           '<label>链接到：</label>';
                html +=       '<select class="form-control form-link-list form-link-list-imageAds">';
                html +=       '<option>请选择</option>';
                for(var j=0;j<data.pageList.length;j++){
                    if(j==imageAds[i].active){
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'" selected>'+data.pageList[j].pageName+'</option>';
                    }else{
                        html +=           '<option data-url="'+data.pageList[j].pageUrl+'">'+data.pageList[j].pageName+'</option>';
                    }
                }
                html +=       '</select>';
                //html +=           '<input type="text" class="form-control form-imageAds-link" value="'+imageAds(data.imageAds[i].href,"")+'" placeholder="http://www.baidu.com">',
                html +=         '</div>';
                html +=     '</div>';
                html += '</div>';


                /*html += '<div class="panel panel-info">';
                html += '<div class="panel-heading">图片导航</div>';
                html += '<div class="panel-body imageNav-content">';
                html +=       '<div class="form-group imageNav-uploader '+imageNav(data.imageNav[i].src,"href")+'">';
                html +=        '<button type="button" class="btn btn-default uploaderButton"><span class="glyphicon glyphicon-plus-sign text-success"></span>添加图片</button>';
                html +=        '<div class="imageNav-showImgContent">';
                html +=          '<img class="imageNav-showImg" src="'+imageNav(data.imageNav[i].src)+'" />';
                html +=          '<a href="javascript:;" class="imageNav-resetImg">重新上传</a>';
                html +=        '</div>';
                html +=      '</div>';
                html +=    '<div class="form-group">';
                html +=      '<label>导航名称：</label>';
                html +=      '<input type="text" class="form-control form-imageNav-name" value="'+imageNav(data.imageNav[i].text,"")+'" placeholder="'+imageNav(data.imageNav[i].text)+'">';
                html +=    '</div>';
                html +=    '<div class="form-group">';
                html +=      '<label>链接到：</label>';
                html +=       '<select class="form-control form-link-list">';
                html +=       '<option>请选择</option>';
                for(var j=0;j<data.pageList.length;j++){
                html +=           '<option data-url="'+data.pageList[j].pageUrl+'">'+data.pageList[j].pageName+'</option>';
                }
                html +=       '</select>';
                //html +=      '<input type="text" class="form-control form-imageNav-link"  value="{{imageNav href ""}}" placeholder="{{imageNav href}}">',
                html +=    '</div>';
                html +='</div>';
                html +='</div>';*/
            }
            return html;
        });
	   iMobile.Handlebars.registerHelper("hide",function(data){
            if(data!='true'){
                return 'hide';
            }
        });
        iMobile.Handlebars.registerHelper("active",function(data){
            if(data){
                return 'active';
            }
        });
        iMobile.Handlebars.registerHelper("iChecked",function(data,style){
            console.log(arguments.length)

            if(arguments.length==2){
                console.log(data)
                if(data||data=='true'){
                    return 'checked';
                }
            }else{
                if(data==style){
                    return 'checked'
                }
            }
        });
        iMobile.Handlebars.registerHelper("consoleThis",function(data){
            var editorOptions = data.editorOptions,
                commodityList = '',
                commodityListClass = '',
                html = '';
            if(data.commodityList&&data.commodityList.length){
                commodityList = data.commodityList
            }else{
                commodityList = data.defaultCommodityList;
                commodityListClass = 'modules-commodity-li-default'
            }
                for(var i=0;i<commodityList.length;i++){
                    var that = commodityList[i];
                    html += '<li class="modules-commodity-li '+commodityListClass+'" >';
                    html += '<div class="modules-commodity-div commodity-'+editorOptions.listStyle+'">';
                    html += '<div  class="modules-commodity-img-content">';
                    html += '<img class="modules-commodity-img" src="'+that.img+'" data-itemid="'+that.id+'" />';

                    if(editorOptions.nameStyle=="name-style-1"&&editorOptions.priceStyle=="price-style-1"){
                        //html += '<div class="modules-commodity-shadow-content">';
                        html += '<div class="modules-commodity-shadow '+(editorOptions.commodityName == "true" ? " modules-commodity-name-show" : "")+'">';
                        html += '<span class="commodity-'+editorOptions.nameStyle +' '+ (editorOptions.commodityName == "true" ? "" : " hidden") +'">'+that.name+'</span>'
                        html += '<span class="commodity-'+editorOptions.priceStyle +' '+ (editorOptions.commodityPrice == "true" ? "" : " hidden")+'">￥'+that.price+'</span>'
                        html += '</div>'
                        //html += '</div>'
                    }else if(editorOptions.nameStyle=="name-style-1"&&editorOptions.priceStyle!="price-style-1"){
                        //html += '<div class="modules-commodity-shadow-content">';
                        html += '<div class="modules-commodity-shadow '+(editorOptions.commodityName == "true" ? " modules-commodity-name-show" : "")+'">'
                        html += '<span class="commodity-'+editorOptions.nameStyle +' '+ (editorOptions.commodityName == "true" ? "" : " hidden") +'">'+that.name+'</span>'
                        html += '</div>'
                        //html += '</div>'
                    }else if(editorOptions.nameStyle!="name-style-1"&&editorOptions.priceStyle=="price-style-1"){
                        //html += '<div class="modules-commodity-shadow-content">';
                        html += '<div class="modules-commodity-shadow">'
                        html += '<span class="commodity-'+editorOptions.priceStyle +' '+ (editorOptions.commodityPrice == "true" ? "" : " hidden")+'">￥'+that.price+'</span>'
                        html += '</div>'
                        //html += '</div>'
                    }

                    html += '</div>';
                    if(editorOptions.nameStyle=="name-style-0"){
                        html += '<p class="modules-commodity-name commodity-'+editorOptions.nameStyle +' '+ (editorOptions.commodityName == "true" ? "" : " hidden") +'">'+that.name+'</p>'
                    }

                    html +='<p class="modules-commodity-desc commodity-'+editorOptions.descStyle+' '+(editorOptions.commodityDesc == "true" ? "" : " hidden")+'">'+that.desc+'</p>'
                    
                    if(editorOptions.priceStyle=="price-style-0"){
                        html += '<div class="modules-commodity-price-icon">'
                        html += '<p class="modules-commodity-price commodity-'+editorOptions.priceStyle+'">'
                        html += '<span class="'+(editorOptions.commodityPrice == "true" ? "" : " hidden")+'">￥'+that.price+'</span>'
                        html += '</p>'
                        html += '<p class="modules-commodity-icon">'
                        html += '<a href="javascript:addToCart(\''+that.id+'\');" class="icon-commodity commodity-'+editorOptions.buttonStyle+' '+ (editorOptions.payButton == "true" ? "" : " hidden")+'"></a>'
                        html += '</p>'
                        html += '</div>'
                    }else if(editorOptions.priceStyle!="price-style-0"){
                        html += '<div class="modules-commodity-price-icon">'
                        html += '<p class="modules-commodity-icon">'
                        html += '<a  href="javascript:addToCart(\''+that.id+'\');" class="icon-commodity commodity-'+editorOptions.buttonStyle+' '+ (editorOptions.payButton == "true" ? "" : " hidden")+'"></a>'
                        html += '</p>'
                        html += '</div>'
                    }
                    html += '</div>';
                    html += '</li>';
                }
              
            return html
        })
        
})