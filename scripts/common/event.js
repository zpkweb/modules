;define([
	'scripts/common/uploader.js',
	'scripts/library/ZeroClipboard.min.js',
	'scripts/library/ueditor.all.js',
	'scripts/library/ueditor.config.js',
	'scripts/library/ueditor.parse.min.js',
	'scripts/template/registerHelper-template.js'
	],function(webuploader,ZeroClipboard){
		window['ZeroClipboard']=ZeroClipboard;
	var events = {
		indexInit : function(){
			events.myScroll();
			events.scroll();
			events.showModulerType();
			events.iPhoneHeader();
			//events.draggable(".wrapper-modular li");
			//events.droppable(".main-middle");
			events.delegatePage();
			events.delegateModules();
			events.titleEvents();
			
			$('[data-toggle="tooltip"]').tooltip();
		},
		myScroll : function(){
			var pageLength = iMobile.STORAGE.pageStorage.get()["page"].length;
			iMobile.CONSTANT.scrollPageWidth = pageLength*iMobile.CONSTANT.pageWidth+1;
			$('.scroller-page').width(iMobile.CONSTANT.scrollPageWidth);

			iMobile.SCROLL.myScrollPage = new IScroll('.wrapper-page', {
			    eventPassthrough: true,
			    mouseWheel: true,
			    scrollX: true, 
			    scrollY: false, 
			    preventDefault: false 
			});
		},
		scroll : function(){

			iMobile.SCROLL.myScrollEditor = new IScroll('.wrapper-editor', {
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});
			iMobile.SCROLL.myScrollMiddle = new IScroll('.wrapper-middle', {
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});   
			iMobile.SCROLL.myScrollIphone = new IScroll('.wrapper-iphone', {
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});
			
		},
		iPhoneHeader : function(){
			events.iPhoneDate();
		},
		iPhoneDate : function(){
			var date = new Date();
			var hours = date.getHours();
			var minutes = parseInt(date.getMinutes())<10? '0' + date.getMinutes() : date.getMinutes();
			$('.iphone-header-top-content').text(hours+':'+minutes);
			setInterval(function(){
				var date = new Date();
				var hours = date.getHours();
				var minutes = parseInt(date.getMinutes())<10? '0' + date.getMinutes() : date.getMinutes();
				$('.iphone-header-top-content').text(hours+':'+minutes);
			},1000)
		},
		// draggable : function(el){
		// 	$(el).draggable({
		// 	    appendTo: "body",
		// 	    zIndex : 100,
		// 	    opacity: 0.7,
		// 	    cursor: "move",
		// 	    cursorAt: { top: -10, left: -10 },
		// 	    helper: function( event ) {
		// 	    	iMobile.modulesId = $(this).attr('data-modulesId');
		// 	    	var modules = 'modules-' + iMobile.modulesId;
		// 	    	iMobile.modulesTemplate = iMobile.Handlebars.compile(iMobile.DOM[modules]);
		// 	    	iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId)

		// 	    	return $( "<div class='ui-widget-header'>"+iMobile.modulesTemplate(iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId))+"</div>" );
		// 	    }
		// 	});
		// },
		// droppable : function(el){
		// 	$(el).droppable({
		// 	  drop: function(event, ui) {

		// 	    $(this).find("#getHtml").append(iMobile.modulesTemplate(iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId)));
		// 	    iMobile.STORAGE.pageStorage.addModules(iMobile.PAGE.pageId,iMobile.modulesId);
		// 	    iMobile.SCROLL.myScrollIphone.refresh();
		// 	    iMobile.SCROLL.myScrollIphone.scrollToElement(document.querySelector('.scroller-iphone div:last-of-type'),0);
		// 	  }
		// 	});
		// },
		modules : function(DATA){
			$('#getHtml').empty();
			for(var i in DATA.pageModules){
				if(!DATA.pageModules[i]){
					return false;
				}
				var modules = 'modules-' + DATA.pageModules[i]["modulesId"];

				var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				var data = DATA.pageModules[i];
				if(data["modulesId"]=="nav"){
					data = {"data":data}
					if(!iMobile.nav){
						iMobile.nav = 'true';
						$('.main-middle').find("#getHtml").css('padding-bottom','45px');
						$('.main-middle').find(".weixin-content").append(temp(data));
					}else{
					}

				}
				$('#getHtml').append(temp(data));
				if(data["modulesId"]=="imageAds"){
					if($('.ads-swiper').length){
						events.swiper();
					}
					
				}
			}
			setTimeout(function(){
				iMobile.SCROLL.myScrollIphone.refresh();
			},1000)
		},
		delegatePage : function(){
			$('#home').delegate(this,'click',function(){
				iMobile.STORAGE.pageStorage.setPageIndex(iMobile.PAGE.pageId);
				iMobile.PAGE = iMobile.STORAGE.pageStorage.getPageIndex();
				// var modulesHtmlData = {
				// 	"modulesTitle" : iMobile.PAGE.pageName,
				// 	"modulesHtml" : $('#getHtml').html()
				// }
				// var modulesHtmlTemp = iMobile.Handlebars.compile(iMobile.DOM["html"]);
				// var data = {
				// 	"pageIndex" : "true",
				// 	"pageHtml" : modulesHtmlTemp(modulesHtmlData)
				// }


				//$('body').html($('#getHtml').html())
				//window.open('view.html#/view')
			});

			$('#view').delegate(this,'click',function(){
				var modulesHtmlData = {
					"modulesTitle" : iMobile.PAGE.pageName,
					"modulesHtml" : $('#getHtml').html()
				}
				var modulesHtmlTemp = iMobile.Handlebars.compile(iMobile.DOM["html"]);
				var data = {
					"pageIndex" : "true",
					"pageHtml" : modulesHtmlTemp(modulesHtmlData)
				}
				//$('body').html($('#getHtml').html())
				//window.open('view.html#/view')
			});
			$('#start').delegate(this,'click',function(){
				var commodityArrayId = [],
					addCommodityArrayModal = iMobile.mainRightContent.find('.add-commodityArray');
				    

				iMobile.imageAdsSelectModal = iMobile.Handlebars.compile(iMobile.DOM['startModal']);
				$('body').append(iMobile.imageAdsSelectModal());
				
				
				var startModal = $('#startModal');
				startModal.delegate('.btn-primary','click',function(){
					var html =$('#getHtml').html();
					var pageHtml = '';
					if($('#getHtml').find('.modules-ueditor').length){
						pageHtml+='<style id="table">#ueditorShowContent table.noBorderTable td,#ueditorShowContent table.noBorderTable th,#ueditorShowContent table.noBorderTable caption{border:1px dashed #ddd !important}#ueditorShowContent table.sortEnabled tr.firstRow th,#ueditorShowContent table.sortEnabled tr.firstRow td{padding-right:20px; background-repeat: no-repeat;background-position: center right; background-image:url(../themes/default/images/sortable.png);}#ueditorShowContent table.sortEnabled tr.firstRow th:hover,#ueditorShowContent table.sortEnabled tr.firstRow td:hover{background-color: #EEE;}#ueditorShowContent table{margin-bottom:10px;border-collapse:collapse;display:table;}#ueditorShowContent td,#ueditorShowContent th{ background:white; padding: 5px 10px;border: 1px solid #DDD;}#ueditorShowContent caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}#ueditorShowContent th{border-top:1px solid #BBB;background:#F7F7F7;}#ueditorShowContent table tr.firstRow th{border-top:2px solid #BBB;background:#F7F7F7;}#ueditorShowContent tr.ue-table-interlace-color-single td{ background: #fcfcfc; }#ueditorShowContent tr.ue-table-interlace-color-double td{ background: #f7faff; }#ueditorShowContent td p{margin:0;padding:0;}</style><style id="chartsContainerHeight">.edui-chart-container { height:300px}</style>'
					}
					pageHtml += html.toString();
					var modulesHtmlData = {
						"modulesTitle" : iMobile.PAGE.pageName,
						"modulesHtml" : $('#getHtml').html()
					}
					if($('#getHtml').find('.modules-commodityArray').length){
						pageHtml += '<style type="text/css">.container .header{display: none;}</style>'
						pageHtml+='<script type="text/javascript">'
						pageHtml+='$(".modules-commodityArray").height($(window).height());'
						pageHtml+='var iMobile = {SCROLL : {}};'
						//pageHtml+='iMobile.SCROLL.myScrollSider = new IScroll(".wrapper-sider", {mouseWheel: true,fadeScrollbars : false,bindToWrapper:true });'
						pageHtml+='$(".nav-li-a").on("touchstart",function(e){location.href=location.origin+location.pathname+$(this).attr("href")});'
						pageHtml+='$(".sider-img").delegate(this,"click",function(){'
						pageHtml+='var that = $(this),'
						pageHtml+='	thatId = that.data()["itemid"];'
						pageHtml+='window.location.href= "/wxshop/wx_shop!showDetail.action?itemNo="+thatId;'
						pageHtml+=' })</script>'
					}else{
						pageHtml += '<div class="copyright"><div class="ft-copyright"><a href="javascript:;" target="_blank">中科商软微商城提供技术支持</a> </div></div>'
					}
					var modulesHtmlTemp = iMobile.Handlebars.compile(iMobile.DOM["html"]);
					var data = {
						"wxIndex" : "true",
						"wxId" : iMobile.PAGE.pageId,
						"wxHtml" : pageHtml
					}
					var modules = iMobile.STORAGE.pageStorage.get();
					var dataModule = {
						"data" : JSON.stringify(modules)
					}
					if('file://'===window.location.origin){
						return false;
					}else{
					//保存模板
					iMobile.request.ajax({
					    server : 'savePageModule',
					    data : dataModule,
					    dataType : 'POST',
					    done : function(){
					    	//保存页面dom
					    	iMobile.request.ajax({
					    	    server : 'saveWxPageContent',
					    	    data : data,
					    	    dataType : 'POST',
					    	    done : function(){
					    	    	startModal.modal('hide')
					    	    }
					    	})
					    }
					})
					}
		    	});
		    	startModal.delegate('li','click',function(){
		    	});
		    	startModal.on('shown.bs.modal', function (e) {
		    		// iMobile.SCROLL.myScrollSider = new IScroll('.wrapper-commodity-modal', {
			     //        mouseWheel: true,
			     //        fadeScrollbars : false,
			     //        bindToWrapper:true 
			     //    });

		    	});
		    	startModal.on('hidden.bs.modal', function (e) {
		   			startModal.remove();
		   			//setTimeout(function(){
					// 	iMobile.SCROLL.myScrollSider.refresh();
					// 	iMobile.SCROLL.myScrollEditor.refresh();
					// },0)
		    	});
		    	startModal.modal('toggle')

		    	// }else{
		    	// 	$('#commodityArrayModal').modal('show')
		    	// }

			});
			$('#save').delegate(this,'click',function(){
				if(iMobile.MODULES&&iMobile.MODULES.modulesActive){
					if(iMobile.MODULES.commodityArray){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							editorOptions : iMobile.MODULES.commodityArray.editorOptions
							//commodityArray : iMobile.MODULES.commodityArray.commodityArray
						})
					}
					if(iMobile.MODULES.editorOptions){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							editorOptions : iMobile.MODULES.editorOptions,
						})
					}
					if(iMobile.MODULES.commodityList){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							commodityList : iMobile.MODULES.commodityList
						})
					}
					iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
						notice : iMobile.MODULES.notice || "",
						marquee : iMobile.marquee,
					})
					if(iMobile.MODULES.nav){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							nav : iMobile.MODULES.nav.nav
						})
					}
					if(iMobile.MODULES.textNav){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							textNav : iMobile.MODULES.textNav
						})
					}
					if(iMobile.MODULES.imageNav){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							imageNav : iMobile.MODULES.imageNav.imageNav
						})
					}
					if(iMobile.MODULES.imageAds){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							imageAds : iMobile.MODULES.imageAds.imageAds
						})
					}
					if(iMobile.MODULES.ueditorContent){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
							ueditorContent : iMobile.MODULES.ueditorContent
						})
					}
				}else{
					var formTitle = $('.form-title').val();
					if(formTitle){

						//$('.weixin-header').text(formTitle);
						//iMobile.pageTar.text(formTitle);
						var pageIndex = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageIndex;
						var pageContent = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent;
						pageContent.pageName = iMobile.PAGE.pageName;

						var page = iMobile.STORAGE.pageStorage.get();
						page["page"][pageIndex]=pageContent;
						iMobile.STORAGE.pageStorage.set(page);
					}
				}
			});
			$('#cancel').delegate(this,'click',function(){
				if(!iMobile.MODULES.modulesActive){
					return;
				}
				events.titleEvents();
				//iMobile.MODULES.modulesActive.removeClass('active');
				//$('.scroller-editor').empty();
			});
			$('#up').delegate(this,'click',function(){
				if(!iMobile.MODULES.modulesActive){
					return;
				}
				var prev = iMobile.MODULES.modulesActive.prev();
				if(prev.length>0){
					iMobile.MODULES.modulesActiveIndex = prev.index();
					prev.before(iMobile.MODULES.modulesActive);
					iMobile.STORAGE.pageStorage.upModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex);
				}
			});
			$('#down').delegate(this,'click',function(){
				if(!iMobile.MODULES.modulesActive){
					return;
				}
				var next = iMobile.MODULES.modulesActive.next();
				if(next.length>0){
					iMobile.MODULES.modulesActiveIndex = next.index();
					next.after(iMobile.MODULES.modulesActive);
					iMobile.STORAGE.pageStorage.downModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex);
				}
			});
			$('#remove').delegate(this,'click',function(){
				if(!iMobile.MODULES.modulesActive){
					return;
				}
				

				if(iMobile.MODULES.modulesActiveId=="nav"){
					iMobile.nav="";
					$('.modules-nav').remove();
					$('#getHtml').css('padding-bottom','0px');
					iMobile.STORAGE.pageStorage.setPageModulerType(iMobile.PAGE.pageId,"basic");
					iMobile.STORAGE.pageStorage.removeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex);
				}else if(iMobile.MODULES.modulesActiveId=="commodityArray"){
					iMobile.STORAGE.pageStorage.setPageModulerType(iMobile.PAGE.pageId,"basic");
					iMobile.MODULES.modulesActive.remove();
					iMobile.STORAGE.pageStorage.removeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex);
				}else{
					iMobile.MODULES.modulesActive.remove();
					iMobile.STORAGE.pageStorage.removeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex);
				}
				///iMobile.MODULES.modulesActiveId = "";
				$('.scroller-editor').empty();
				if(iMobile.MODULES.modulesActiveNext.length){
					iMobile.MODULES.modulesActiveNext.find('.modules').trigger('click');
				}else if(iMobile.MODULES.modulesActivePrev.length){
					iMobile.MODULES.modulesActivePrev.find('.modules').trigger('click');
				}else{
					iMobile.STORAGE.pageStorage.setPageModulerType(iMobile.PAGE.pageId,"");
					events.titleEvents();
				}
				
				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
				},0)
			});
			$('#plus').delegate(this,'click',function(){


				if($('#modulersModal').length){
					$('#modulersModal').modal('show');
					return false;
				}
    			$('body').append(iMobile.Handlebars.compile(iMobile.DOM['wrapperPageModalDom'])(iMobile.DATA["website"]));
    			var modulersModal = $('#modulersModal');
    			modulersModal.modal('show');
    			modulersModal.delegate('li','click',function(){
    				var that = $(this);
    				if(that.hasClass('active')){
    					that.removeClass('active');
    				}else{
    					that.siblings().removeClass('active');
    					that.addClass('active');
    				}
    				
    			})
    			modulersModal.delegate('.btn-primary','click',function(){
    				modulersModal.find('li').each(function(){
    					var that = $(this);
    					if(that.hasClass('active')){
    						var newPageModuler = iMobile.DATA["website"]["page"][that.index()]["pageCommont"];
    						newPageModuler.pageId = events.getRandomNum(iMobile.DATA.website.modules.basic.length);
					        iMobile.STORAGE.pageStorage.addPage(newPageModuler);
							$('.scroller-page-ul').append(iMobile.TEMPLATE.wrapperNewPageDomTemplate(newPageModuler));

    						iMobile.CONSTANT.scrollPageWidth = iMobile.CONSTANT.scrollPageWidth+iMobile.CONSTANT.pageWidth
    						$('.scroller-page').width(iMobile.CONSTANT.scrollPageWidth);
    						setTimeout(function(){
    							iMobile.SCROLL.myScrollPage.refresh();
    							iMobile.SCROLL.myScrollPage.scrollToElement(document.querySelector('.scroller-page-li:last-of-type'),0);
    							$('.scroller-page-li:last-of-type').trigger('click');
    						},0)
    						modulersModal.modal('hide');
    						return false;
    					}
    				})
    				
    			})
		  //       iMobile.STORAGE.pageStorage.addPage(newPage);
				// $('.scroller-page-ul').append(iMobile.TEMPLATE.wrapperNewPageDomTemplate(newPage));
				// iMobile.CONSTANT.scrollPageWidth = iMobile.CONSTANT.scrollPageWidth+iMobile.CONSTANT.pageWidth
				// $('.scroller-page').width(iMobile.CONSTANT.scrollPageWidth);
				// setTimeout(function(){
				// 	iMobile.SCROLL.myScrollPage.refresh();
				// 	iMobile.SCROLL.myScrollPage.scrollToElement(document.querySelector('.scroller-page-li:last-of-type'),0);
				// 	$('.scroller-page-li:last-of-type').trigger('click');
				// },0)
			});
			$('#minus').delegate(this,'click',function(){
				var li = $('.scroller-page-li');
				if(li.length>1){
				var active = $('.scroller-page-li.active'),
					next = active.next();
					iMobile.STORAGE.pageStorage.removePage(iMobile.PAGE.pageId);
					if(next.length){
						next.click();
					}else{
						active.prev().click();
					}
					active.remove();
					iMobile.CONSTANT.scrollPageWidth = iMobile.CONSTANT.scrollPageWidth-iMobile.CONSTANT.pageWidth
					$('.scroller-page').width(iMobile.CONSTANT.scrollPageWidth);
					setTimeout(function(){
						iMobile.SCROLL.myScrollPage.refresh();
						iMobile.SCROLL.myScrollPage.scrollToElement(document.querySelector('.scroller-page-li.active'),0);
					},0)
				}
			});
			$('#modulerLeft').delegate(this,'click',function(){
				var modulerType = $('.btn-group-'+iMobile.PAGE.pageModulerType);
				var modulerTypeActive = modulerType.prev();
				if(!modulerTypeActive.length){
					modulerTypeActive = $('.btn-group-onePage');
				}
				iMobile.PAGE.pageModulerType = modulerTypeActive.data('modulertype')
				modulerType.css({
					"position" : "absolute",
					"top" : "0px",
					"left" : "0px"
				})
				modulerTypeActive.css({
					"position" : "absolute",
					"top" : "0px",
					"left" : "-149px"
				})
				modulerTypeActive.show();

				modulerType.stop(true,false).animate({
					"left" : "149px"
				},1000);
				modulerTypeActive.stop(true,false).animate({
					"left" : "0px"
				},1000,function(){
					events.showModulerType();
				})
				
			});
			$('#modulerRight').delegate(this,'click',function(){
				var modulerType = $('.btn-group-'+iMobile.PAGE.pageModulerType);
				var modulerTypeActive = modulerType.next();
				if(!modulerTypeActive.length){
					modulerTypeActive = $('.btn-group-basic');
				}
				iMobile.PAGE.pageModulerType = modulerTypeActive.data('modulertype')
				modulerType.css({
					"position" : "absolute",
					"top" : "0px",
					"left" : "0px"
				})
				modulerTypeActive.css({
					"position" : "absolute",
					"top" : "0px",
					"left" : "149px"
				})
				modulerTypeActive.show();

				modulerType.stop(true,false).animate({
					"left" : "-149px"
				},1000);
				modulerTypeActive.stop(true,false).animate({
					"left" : "0px"
				},1000,function(){
					events.showModulerType();
				})
			});
			$('#modulerInfo').delegate(this,'click',function(){

			});
		},
		showModulerType : function(){
			var dataModulerType = {
				"basic" : "基础模块随性添加",
				"pageOne" : "一个页面一个模块",
				"onePage" : "一个模块一个页面",
			}
			if(!iMobile.PAGE.pageModulerType){
				iMobile.PAGE.pageModulerType = "basic";
			}
			$('.scroller-modular-ul').removeAttr('style').hide();
			$('.btn-group-'+iMobile.PAGE.pageModulerType).show();

			$('#modulerInfo').attr('data-original-title',dataModulerType[iMobile.PAGE.pageModulerType])
			iMobile.SCROLL.myScroll = new IScroll('.wrapper-modular', {
			    mouseWheel: true,
			    bindToWrapper:true
			});
		},
		getRandomNum : function (Max){
			var Range = Max;
			var Rand = Math.random();
			var randomNum =Math.round(Rand * Range);
			var pageIdArray = iMobile.STORAGE.pageStorage.getPageId();
			for(var i=0;i<pageIdArray.length;i++){
				if(pageIdArray[i]==randomNum){
					arguments.callee(Max)
				}
			}
			return randomNum.toString();
		},
		iCheckAds : function(callback){
			$('input').iCheck({
			    checkboxClass: 'icheckbox_square-blue',
			    radioClass: 'iradio_square-blue',
			    increaseArea: ' 10%' // optional
			  });
			var displayMode;
			$('input[name="displayMode"').on('ifChecked', function(event){

				var that = $(this);
				displayMode=that.data("displaymode");
				if(displayMode=="swiper"){
					$('input[name="displaySize"').eq(0).iCheck('check');
					$('.displaySize').eq(1).addClass('hide')
				}else if(displayMode=="none"){
					$('.displaySize').eq(1).removeClass('hide')
				}
				iMobile.MODULES.modulesActive.removeClass('ads-'+iMobile.MODULES.editorOptions.displayMode).addClass('ads-'+displayMode);
				iMobile.MODULES.editorOptions.displayMode = displayMode;
			});
			$('input[name="displaySize"').on('ifChecked', function(event){
				var that = $(this);
				var	displaySize=that.data("displaysize");
				iMobile.MODULES.modulesActive.removeClass('ads-'+iMobile.MODULES.editorOptions.displaySize).addClass('ads-'+displaySize);
				iMobile.MODULES.editorOptions.displaySize = displaySize;
			});
			$('input').on('ifChecked ifUnchecked',function(event){
				var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
				
				data.editorOptions = iMobile.MODULES.editorOptions;
				data.commodityList = iMobile.MODULES.commodityList;
				var modules = 'modules-' + data["modulesId"];
				var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				iMobile.MODULES.modulesActive.html($(temp(data)).html())
				if(displayMode=="swiper"){
					events.swiper();
				}
				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
				},0)
			})
			if(callback){
				setTimeout(function(){
					callback();
				},0)
			}
		},
		iCheckCommodity : function(callback){
			$('input').iCheck({
			    checkboxClass: 'icheckbox_square-blue',
			    radioClass: 'iradio_square-blue',
			    increaseArea: ' 10%' // optional
			  });
			
			$('input[name="payButton"').on('ifChecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-icon').removeClass('hidden');
				iMobile.MODULES.editorOptions.payButton = 'true';
			});
			$('input[name="payButton"').on('ifUnchecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-icon').addClass('hidden');
				iMobile.MODULES.editorOptions.payButton = 'false';
			});
			$('input[name="commodityName"').on('ifChecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-name').removeClass('hidden');
				iMobile.MODULES.editorOptions.commodityName = 'true';
			});
			$('input[name="commodityName"').on('ifUnchecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-name').addClass('hidden');
				iMobile.MODULES.editorOptions.commodityName = 'false';
			});
			$('input[name="commodityDesc"').on('ifChecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-desc').removeClass('hidden');
				iMobile.MODULES.editorOptions.commodityDesc = 'true';
			});
			$('input[name="commodityDesc"').on('ifUnchecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-desc').addClass('hidden');
				iMobile.MODULES.editorOptions.commodityDesc = 'false';
			});
			$('input[name="commodityPrice"').on('ifChecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-price').removeClass('hidden');
				iMobile.MODULES.editorOptions.commodityPrice = 'true';
			});
			$('input[name="commodityPrice"').on('ifUnchecked', function(event){
				iMobile.MODULES.modulesActive.find('.modules-commodity-price').addClass('hidden');
				iMobile.MODULES.editorOptions.commodityPrice = 'false';
			});
			$('input[name="layoutStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	layoutStyle=that.data()['layoutstyle'];
				iMobile.MODULES.modulesActive.removeClass('commodity-'+iMobile.MODULES.editorOptions.layoutStyle).addClass('commodity-'+layoutStyle);
				iMobile.MODULES.editorOptions.layoutStyle = layoutStyle;
				
			});
			$('input[name="listStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	listStyle = that.data()['liststyle'];
				var modulesCommodityDiv=iMobile.MODULES.modulesActive.find('.modules-commodity-div');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.MODULES.editorOptions.listStyle).addClass('commodity-'+listStyle);
				iMobile.MODULES.editorOptions.listStyle = listStyle;
			});
			$('input[name="buttonStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	buttonStyle = that.data()['buttonstyle'];
				var modulesCommodityDiv=iMobile.MODULES.modulesActive.find('.icon-commodity');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.MODULES.editorOptions.buttonStyle).addClass('commodity-'+buttonStyle);
				iMobile.MODULES.editorOptions.buttonStyle = buttonStyle;
			});
			$('input[name="nameStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	nameStyle = that.data()['namestyle'];
				var modulesCommodityDiv=iMobile.MODULES.modulesActive.find('.modules-commodity-name');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.MODULES.editorOptions.nameStyle).addClass('commodity-'+nameStyle);
				iMobile.MODULES.editorOptions.nameStyle = nameStyle;
			});
			$('input[name="descStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	descStyle = that.data()['descstyle'];
				var modulesCommodityDiv=iMobile.MODULES.modulesActive.find('.modules-commodity-desc');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.MODULES.editorOptions.descStyle).addClass('commodity-'+descStyle);
				iMobile.MODULES.editorOptions.descStyle = descStyle;
			});
			$('input[name="priceStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	priceStyle = that.data()['pricestyle'];
				var modulesCommodityDiv=iMobile.MODULES.modulesActive.find('.modules-commodity-price');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.MODULES.editorOptions.priceStyle).addClass('commodity-'+priceStyle);
				iMobile.MODULES.editorOptions.priceStyle = priceStyle;
			});
			$('input').on('ifChecked ifUnchecked',function(event){
				var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
				
				data.editorOptions = iMobile.MODULES.editorOptions;
				data.commodityList = iMobile.MODULES.commodityList;
				var modules = 'modules-' + data["modulesId"];
				var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				iMobile.MODULES.modulesActive.html($(temp(data)).html())
				
				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
				},0)
			})
			if(callback){
				setTimeout(function(){
					callback();
				},0)
			}
		},
		iCheckCommodityArray : function(callback){
			$('input').iCheck({
			    checkboxClass: 'icheckbox_square-blue',
			    radioClass: 'iradio_square-blue',
			    increaseArea: ' 10%' // optional
			  });
			
			$('input[name="commodityArrayImg"').on('ifChecked', function(event){
				iMobile.MODULES.modulesActive.find('.nav-sider-main').removeClass('no-images');
				iMobile.MODULES.commodityArray.editorOptions.commodityArrayImg = true;
			});
			$('input[name="commodityArrayImg"').on('ifUnchecked', function(event){
				iMobile.MODULES.modulesActive.find('.nav-sider-main').addClass('no-images');
				iMobile.MODULES.commodityArray.editorOptions.commodityArrayImg = false;
			});
			
			if(callback){
				setTimeout(function(){
					callback();
				},0)
			}
		},
		delegateModules : function(){
			$('.header').delegate('li','click',function(){
				var that = $(this);
				iMobile.STORAGE.pageStorage.setPageActive(that.data()["pageid"]);
				iMobile.PAGE = iMobile.STORAGE.pageStorage.getPageActive();
				that.siblings().removeClass('active').end().addClass('active');
				var pageName = iMobile.PAGE.pageName;
				events.modules(iMobile.PAGE);
				$('.weixin-header').text(pageName);
				$('.scroller-editor').empty().html(iMobile.TEMPLATE.editorModulesDomTemplate(iMobile.PAGE));
				events.titleEvents();
				events.showModulerType();
				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
				},0);
			});
			$( ".main-middle" ).delegate('.modules','click',function(){
				var that = $(this);
				var modules = that.parent();
				if(!that.parents('#getHtml').length){

					modules.addClass('active');
					$('#getHtml').find('.modules-content').removeClass('active');
					that = $('#getHtml .modules-nav').find('.modules');
				}else{
					modules.siblings().removeClass('active');
					modules.addClass('active');
					//$('#getHtml .modules-nav').removeClass('active');
					$('.weixin-content').children('.modules-content').removeClass('active');
				}
				
				var modulesid = modules.attr('data-modulesid');
				var modulesActiveIndex = (modulesid=="nav"? $('#getHtml').find('.modules-nav').index() : modules.index())
				if(iMobile.MODULES && iMobile.MODULES.modulesActiveId&&modulesid==iMobile.MODULES.modulesActiveId&&iMobile.MODULES.pageId == iMobile.PAGE.pageId&&modulesActiveIndex==iMobile.MODULES.modulesActiveIndex){
					return false;
				}
				iMobile.mainRightContent.undelegate();
				iMobile.MODULES = {
					pageId : iMobile.PAGE.pageId,
					editorOptions : "",
					commodityList : "",
					notice : "",
					modules : that,
					modulesActive : modules,
					modulesActiveId : modulesid,
					modulesActiveNext : modules.next(),
					modulesActivePrev : modules.prev(),
					modulesActiveIndex : modulesActiveIndex
				}
				
				var modulesId = 'editor-modules-' + iMobile.MODULES.modulesActiveId;
				var modify = iMobile.Handlebars.compile(iMobile.DOM[modulesId]);
				var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
				
				if(iMobile.MODULES.modulesActiveId=="nav"||iMobile.MODULES.modulesActiveId=="textNav"||iMobile.MODULES.modulesActiveId=="imageNav"||iMobile.MODULES.modulesActiveId=="imageAds"){
					data.pageList = iMobile.STORAGE.pageList.get().list;
					//iMobile.MODULES.pageList = data.pageList;
					//iMobile.imageAds.pageList = data.pageList;
					data = {
						"data" : data
					}
				}
				console.log(data)
				$('.scroller-editor').empty().html(modify(data));
				switch (iMobile.MODULES.modulesActiveId){
					case "commodity":
						iMobile.MODULES.editorOptions = data.editorOptions;
						iMobile.MODULES.commodityList = data.commodityList;
						events.commodityEvents();
						break;
					case "notice":
						iMobile.MODULES.noticeModules = {
							"notice" : data.notice
						}
						events.noticeEvents();
						break;
					case "imageNav":
						iMobile.MODULES.imageNav = data.data;
						events.imageNav();
						break;
					case "textNav":
						iMobile.MODULES.textNav = data.data.textNav;
						events.textNav();
						break;
					case "nav":
						iMobile.MODULES.nav = data.data;
						events.nav();
						break;
					case "auxiliaryLine":
						break;
					case "auxiliaryBlank":
						break;
					// case "notice":
					// 	break;
					case "search":
						break;
					case "imageAds":
						iMobile.MODULES.editorOptions = data.data.editorOptions;
						iMobile.MODULES.imageAds = data.data
						//events.swiper();
						events.imageAds();
						break;
					case "ueditor":
						events.ueditor(data);
						break;
					case "commodityArray":
						iMobile.MODULES.commodityArray = data;
						events.commodityArray();
						break;
					case "shopList":
						iMobile.MODULES.shopList = data.shopList;
						events.shopList();
						break;
					default:
						console.log("请选择模块啦！")
				}
				setTimeout(function(){
					iMobile.SCROLL.myScrollEditor.refresh();
				},0)
			});
			$('.main-left').delegate('li','click',function(){
				//iMobile.STORAGE.pageStorage.setPageIndex(iMobile.PAGE.pageId);
				//iMobile.PAGE = iMobile.STORAGE.pageStorage.getPageIndex();
				var storageModulerType = iMobile.STORAGE.pageStorage.getPageModulerType();
				switch(iMobile.PAGE.pageModulerType){
					case "onePage":
						if(storageModulerType != ''){
							return false;
						}
						break;
					case "pageOne":
						if(storageModulerType == "onePage" || storageModulerType == "pageOne" ){
							return false;
						}
						break;
					case "basic":
						if(storageModulerType == "onePage" ){
							return false;
						}
						break;
					default:
						console.log("xxx");
						break;
				}

				iMobile.modulesId = $(this).attr('data-modulesId');
				var modules = 'modules-' + iMobile.modulesId;
				iMobile.modulesTemplate = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				var modulesData = iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId)
				if(iMobile.modulesId=="nav"){
					modulesData = {"data":modulesData}
					if(!iMobile.nav){
						iMobile.nav = 'true';
						$('.main-middle').find("#getHtml").css('padding-bottom','45px');
						$('.main-middle').find(".weixin-content").append(iMobile.modulesTemplate(modulesData));
					}else{
						return false;
					}
				}
				$('.main-middle').find("#getHtml").append(iMobile.modulesTemplate(modulesData));


				if(iMobile.modulesId=="imageAds"){
					if($('.ads-swiper').length){
						events.swiper();
					}
				}
				iMobile.STORAGE.pageStorage.setPageModulerType(iMobile.PAGE.pageId,iMobile.PAGE.pageModulerType);
				iMobile.STORAGE.pageStorage.addModules(iMobile.PAGE.pageId,iMobile.modulesId);

				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
					setTimeout(function(){
						iMobile.SCROLL.myScrollIphone.scrollToElement(document.querySelector('#getHtml .modules-content:last-of-type'),0);
						$('#getHtml .modules-content:last-of-type').find('.modules').click();
						if(iMobile.modulesId=="nav"){
							$('.modules-nav').eq(1).addClass('active')
							$('.modules-nav').eq(1).click();
						}
					},0);
				},0)
			});
		},
		
		titleEvents : function(){
			var title = $('.iphone-header-title');
			title.delegate(this,'click',function(){
				var that = $(this);
				that.find('.weixin-header').text(iMobile.PAGE.pageName);
				if(iMobile.MODULES&&iMobile.MODULES.modulesActive){
					iMobile.MODULES.modulesActive.removeClass('active')
				}
				iMobile.MODULES = {
					modulesActiveId : "title"
				}
				var titleTemp = iMobile.Handlebars.compile(iMobile.DOM['editor-modules']);
				$('.scroller-editor').empty().html(titleTemp(iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent));
				$('.form-title').delegate(this,'keyup',function(){
					var val = $(this).val();
					that.find('.weixin-header').text(val);
					//iMobile.MODULES.modulesActiveId=val;
					iMobile.PAGE.pageName = val;
				})

				setTimeout(function(){
					iMobile.SCROLL.myScrollEditor.refresh();
				},0)
			}).trigger('click');

		},
		commodityEvents : function(){
			events.iCheckCommodity(function(){
				var	commoditySelect = iMobile.mainRightContent.find('.commoditySelect'),
					layoutStyleSelect = iMobile.mainRightContent.find('.layoutStyleSelect'),
					listStyle = iMobile.mainRightContent.find('.listStyle'),
					buttonStyle = iMobile.mainRightContent.find('.buttonStyle');
				
				commoditySelect.delegate(this,'click',function(){
					
					var that = $(this),
						commodityData = "",
						commodityData = iMobile.STORAGE.commodity.get()["data"],
						pageModules = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
					

					if('file://'===window.location.origin){
						

					    	commodityData = iMobile.DATA.commodity.data;
					    	iMobile.commoditySelectModal = iMobile.Handlebars.compile(iMobile.DOM['commoditySelectModal']);
					    	$('body').append(iMobile.commoditySelectModal(commodityData));
					    	var commondityModal = $('#commondityModal'),
					    		commodityArray = [];
					    	commondityModal.modal('toggle');
					    	commoditySelectLi = iMobile.Handlebars.compile(iMobile.DOM['commoditySelectLi']);
					    	var search = commondityModal.find('.commodity-search-input');
					    	search.delegate(this,'keyup keypress',function(e){
					    		var val = $(this).val().trim();
					    		if(e.type=='keyup'){
		    		                if (!val) {
		    		                	$('.commodity-select-ul').html(commoditySelectLi(commodityData))
		    		                }
					    		}else if(e.type=='keypress'){
					    			if(e.which===13){
					    				searchHtml(val,commodityData)
					    			}
					    		}
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollEditorCommodity.refresh();
					    		},0)
					    	});
					    	commondityModal.find('.commodity-search-button').delegate(this,'click',function(){
					    		var searchVal = search.val().trim();
					    		if(searchVal!=''){
					    			searchHtml(searchVal,commodityData)
					    		}
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollEditorCommodity.refresh();
					    		},0)
					    	});
	    	    			function searchHtml(val,datas){
	    	    				var searched = [];
	    	    				for (var i = 0, item; item = datas['itemlist'][i]; i++) {
	    	    				    if (item.itemName.indexOf(val) < 0) {
	    	    				        continue
	    	    				    }
	    	    				    searched.push(datas['itemlist'][i])
	    	    				}
	    	    				console.log(searched)
	    	    				if(searched.length){
		    	    				$('.commodity-select-ul').html(commoditySelectLi({
		    	    					'itemlist' : searched
		    	    				}))
	    	    				}else{
	    	    					$('.commodity-select-ul').html('<p style="font-size: 22px;color: #a94442;text-align: center;line-height: 250px;">没有搜索到此商品，请重新搜索！</p>')
	    	    				}
	    	    			}
	                

	            


					    	commondityModal.find('.btn-primary').delegate(this,'click',function(){
					    		var commodityHtml = iMobile.Handlebars.compile(iMobile.DOM["commodityShow"])
					    		$('#commoditySelect').parent().before(commodityHtml(commodityArray));
					    		if(iMobile.MODULES.commodityList){
					    			$.merge(iMobile.MODULES.commodityList,commodityArray)
					    		}else{
					    			iMobile.MODULES.commodityList = commodityArray
					    		}
					    		pageModules.commodityList=iMobile.MODULES.commodityList
					    		var modules = 'modules-' + pageModules["modulesId"];
					    		var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
					    		iMobile.MODULES.modulesActive.html($(temp(pageModules)).html())
					    		
					    		commondityModal.modal('hide');
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollIphone.refresh();
					    		},0)
					    	})

					    	commondityModal.on('shown.bs.modal', function (e) {
					    		iMobile.SCROLL.myScrollEditorCommodity = new IScroll('.wrapper-commodity-modal', {
					    		    mouseWheel: true,
					    		    fadeScrollbars : false,
					    		    bindToWrapper:true 
					    		});
					    		commondityModal.find('li').delegate(this,'click',function(){
					    			var that = $(this),
					    				thatIndex = that.index(),
					    				thatId = that.data()["id"],
					    				thatData = {};
					    			if(that.hasClass('active')){
					    				that.removeClass('active');
					    				for(var i=0;i<commodityArray.length;i++){
					    					if(commodityArray[i]["id"]==thatId){
					    						commodityArray.splice(i,1)
					    					}
					    				}
					    			}else{
					    				that.addClass('active');
					    				var commodityDataIndex = commodityData["itemlist"][thatIndex]
					    				thatData.img = commodityDataIndex.picUrl;
					    				thatData.name = commodityDataIndex.itemName;
					    				thatData.desc = commodityDataIndex.desc||"此处显示商品描述";
					    				thatData.price = commodityDataIndex.itemPrice||"123.45";
					    				thatData.id = commodityDataIndex.itemNo;
					    				commodityArray.push(thatData);
					    			}
					    		})
					    	});
					    	commondityModal.on('hidden.bs.modal', function (e) {
					    		if(iMobile.MODULES.commodityList){
					    			iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
					    				commodityList : iMobile.MODULES.commodityList
					    			});
					    		}
					    		commondityModal.remove();
					    	});
				}else{
					iMobile.request.ajax({
					    server : 'getWxItemList',
					    dataType : 'POST',
					    done : function(data){

					    	commodityData = data.data;
					    	iMobile.commoditySelectModal = iMobile.Handlebars.compile(iMobile.DOM['commoditySelectModal']);
					    	$('body').append(iMobile.commoditySelectModal(commodityData));
					    	var commondityModal = $('#commondityModal'),
					    		commodityArray = [];
					    	commondityModal.modal('toggle');
					    	commoditySelectLi = iMobile.Handlebars.compile(iMobile.DOM['commoditySelectLi']);
					    	var search = commondityModal.find('.commodity-search-input');
					    	search.delegate(this,'keyup keypress',function(e){
					    		var val = $(this).val().trim();
					    		if(e.type=='keyup'){
		    		                if (!val) {
		    		                	$('.commodity-select-ul').html(commoditySelectLi(commodityData))
		    		                }
					    		}else if(e.type=='keypress'){
					    			if(e.which===13){
					    				searchHtml(val,commodityData)
					    			}
					    		}
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollEditorCommodity.refresh();
					    		},0)
					    	});
					    	commondityModal.find('.commodity-search-button').delegate(this,'click',function(){
					    		var searchVal = search.val().trim();
					    		if(searchVal!=''){
					    			searchHtml(searchVal,commodityData)
					    		}
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollEditorCommodity.refresh();
					    		},0)
					    	});
	    	    			function searchHtml(val,datas){
	    	    				var searched = [];
	    	    				for (var i = 0, item; item = datas['itemlist'][i]; i++) {
	    	    				    if (item.itemName.indexOf(val) < 0) {
	    	    				        continue
	    	    				    }
	    	    				    searched.push(datas['itemlist'][i])
	    	    				}
	    	    				console.log(searched)
	    	    				if(searched.length){
		    	    				$('.commodity-select-ul').html(commoditySelectLi({
		    	    					'itemlist' : searched
		    	    				}))
	    	    				}else{
	    	    					$('.commodity-select-ul').html('<p style="font-size: 22px;color: #a94442;text-align: center;line-height: 250px;">没有搜索到此商品，请重新搜索！</p>')
	    	    				}
	    	    			}
					    	commondityModal.find('.btn-primary').delegate(this,'click',function(){
					    		var commodityHtml = iMobile.Handlebars.compile(iMobile.DOM["commodityShow"])
					    		$('#commoditySelect').parent().before(commodityHtml(commodityArray));
					    		if(iMobile.MODULES.commodityList){
					    			$.merge(iMobile.MODULES.commodityList,commodityArray)
					    		}else{
					    			iMobile.MODULES.commodityList = commodityArray
					    		}
					    		pageModules.commodityList=iMobile.MODULES.commodityList
					    		var modules = 'modules-' + pageModules["modulesId"];
					    		var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
					    		iMobile.MODULES.modulesActive.html($(temp(pageModules)).html())
					    		
					    		commondityModal.modal('hide');
					    		setTimeout(function(){
					    			iMobile.SCROLL.myScrollIphone.refresh();
					    		},0)
					    	})
					    	commondityModal.on('shown.bs.modal', function (e) {
					    		iMobile.SCROLL.myScrollEditorCommodity = new IScroll('.wrapper-commodity-modal', {
					    		    mouseWheel: true,
					    		    fadeScrollbars : false,
					    		    bindToWrapper:true 
					    		});
					    		commondityModal.find('li').delegate(this,'click',function(){
					    			var that = $(this),
					    				thatIndex = that.index(),
					    				thatId = that.data()["id"],
					    				thatData = {};
					    			if(that.hasClass('active')){
					    				that.removeClass('active');
					    				for(var i=0;i<commodityArray.length;i++){
					    					if(commodityArray[i]["id"]==thatId){
					    						commodityArray.splice(i,1)
					    					}
					    				}
					    			}else{
					    				that.addClass('active');
					    				var commodityDataIndex = commodityData["itemlist"][thatIndex]
					    				thatData.img = commodityDataIndex.picUrl;
					    				thatData.name = commodityDataIndex.itemName;
					    				thatData.desc = commodityDataIndex.desc||"此处显示商品描述";
					    				thatData.price = commodityDataIndex.itemPrice||"123.45";
					    				thatData.id = commodityDataIndex.itemNo;
					    				commodityArray.push(thatData);
					    			}
					    		})
					    	});
					    	commondityModal.on('hidden.bs.modal', function (e) {
					    		if(iMobile.MODULES.commodityList){
					    			iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
					    				commodityList : iMobile.MODULES.commodityList
					    			});
					    		}
					    		commondityModal.remove();
					    	});
					    }
					})
					}
					
				});
				iMobile.mainRightContent.delegate('.commodity-show-li:not(:last)','click',function(){
					var that = $(this),
						thatIndex = that.index(),
						modulesCommodityLi = $('.modules-commodity-li');
					that.remove();
					iMobile.MODULES.commodityList.splice(thatIndex,1);
					if(modulesCommodityLi.length==1){
						var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
						
						data.editorOptions = iMobile.MODULES.editorOptions;
						data.commodityList = iMobile.MODULES.commodityList
						
						var modules = 'modules-' + data["modulesId"];
						var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
						iMobile.MODULES.modulesActive.html($(temp(data)).html())
					}
					modulesCommodityLi.eq(thatIndex).remove();
					
					setTimeout(function(){
						iMobile.SCROLL.myScrollIphone.refresh();
					},0)
				})
			});
		},
		noticeEvents : function(){
			var notice = iMobile.mainRightContent.find('.notice-textarea');
			if(iMobile.MODULES.noticeModules&&iMobile.MODULES.noticeModules.notice){
				notice.val(iMobile.MODULES.noticeModules.notice);
			}
			notice.delegate(this,'keyup blue',function(event){
				var that=$(this),
					thatVal = that.val(),
					thatValLength = thatVal.length;
				var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
				if(thatValLength<=0){

				}else if(thatValLength>0&&thatValLength<=18){
					data.marquee = iMobile.marquee = false;
					data.notice = iMobile.MODULES.notice = thatVal;
				}else if(thatValLength>18){
					data.marquee = iMobile.marquee = true;
					data.notice = iMobile.MODULES.notice = thatVal;
				}

				var modules = 'modules-' + data["modulesId"];
				var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				iMobile.MODULES.modulesActive.html($(temp(data)).html())
				
				setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
				},0)
			})
		},
		nav : function(){
			iMobile.mainRightContent.delegate('.form-nav-name','keyup blue',function(){
				var that = $(this),
					thatVal = that.val(),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index()+1;
				iMobile.MODULES.modulesActive.find('.nav-a').eq(thatIndex).text(thatVal);
				iMobile.MODULES.nav.nav[thatIndex]['name'] = thatVal;
			});
			iMobile.mainRightContent.delegate('.form-link-list','change',function(){
				var that = $(this),
				index = that[0].selectedIndex,
				thatVal = that.find('option').eq(index).attr('data-url'),
				thatParent = that.parents('.panel'),
				thatIndex = thatParent.index()+1;
				if(thatVal){
					$('.modules-nav').each(function(){
						$(this).find('.nav-a').eq(thatIndex).attr('href',thatVal);
					})
					iMobile.MODULES.nav.nav[thatIndex]['href'] = thatVal;
					iMobile.MODULES.nav.nav[thatIndex]['active'] = parseInt(index)-1;
				}else{
					$('.modules-nav').each(function(){
						$(this).find('.nav-a').eq(thatIndex).attr('href','javascript:;');
					})
					iMobile.MODULES.nav.nav[thatIndex]['href'] = 'javascript:;';
				}
			});
			// iMobile.mainRightContent.delegate('.form-link-list-nav','keyup blue',function(){
			// 	var that = $(this),
			// 		thatVal = that.val(),
			// 		thatParent = that.parents('.panel'),
			// 		thatIndex = thatParent.index();
			// 	iMobile.MODULES.modulesActive.find('.nav-a').eq(thatIndex).attr('href',thatVal);
			// 	iMobile.MODULES.nav[thatIndex]['href'] = thatVal;
			// });
			iMobile.mainRightContent.delegate('.add-nav','click',function(){
				
				
				var list = iMobile.Handlebars.compile(iMobile.DOM["editor-modules-nav-option"]);
			    //var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
			    //data.pageList = iMobile.STORAGE.pageList.get().list;
			    var data = {
			    	"data" : {
				    	"nav" : [{
				    		"text" : "导航",
		                	"href" : "javascript:;"
				    	}],
				    	"pageList" : iMobile.STORAGE.pageList.get().list
			    	}
			    }

    			iMobile.MODULES.nav.nav.push({
                    "name" : "导航",
                    "href" : "javascript:;"
                })
                $(this).prevAll().remove();
			    $(this).before(list({"data":iMobile.MODULES.nav}))
				//iMobile.MODULES.modulesActive.append('<a href="javascript:;" class="nav-a"><span class="nav-name">文本导航</span><span class="glyphicon glyphicon-chevron-right"></span></a>')
				var modulesNav = iMobile.Handlebars.compile(iMobile.DOM["modules-nav"]);
				modulesNavHtml = modulesNav({"data":iMobile.MODULES.nav});

				$('.modules-nav').html($(modulesNavHtml).html())
				//iMobile.MODULES.modulesActive.remove();
				//$("#getHtml").append(contentHtml);
				
	            setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
					//iMobile.SCROLL.myScrollEditor.scrollToElement(document.querySelector('#getHtml .nav-a:last-of-type'),0);
					iMobile.SCROLL.myScrollEditor.refresh();
					iMobile.SCROLL.myScrollEditor.scrollToElement(document.querySelector('.scroller-editor-ul .add-nav:last-of-type'),0);
					if (iMobile.MODULES.nav.nav.length>=4) {
						iMobile.mainRightContent.find('.add-nav').remove();
					};
				},0)
			});
		},
		textNav : function(){
			
			iMobile.mainRightContent.delegate('.form-textNav-name','keyup blue',function(){
				var that = $(this),
					thatVal = that.val(),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index();
				iMobile.MODULES.modulesActive.find('.textNav-name').eq(thatIndex).text(thatVal);
				iMobile.MODULES.textNav[thatIndex]['text'] = thatVal;
			});
			iMobile.mainRightContent.delegate('.form-link-list','change',function(){
				var that = $(this),
				index = that[0].selectedIndex,
				thatVal = that.find('option').eq(index).attr('data-url'),
				thatParent = that.parents('.panel'),
				thatIndex = thatParent.index();
				if(thatVal){
					iMobile.MODULES.modulesActive.find('.textNav-a').eq(thatIndex).attr('href',thatVal);
					iMobile.MODULES.textNav[thatIndex]['href'] = thatVal;
					iMobile.MODULES.textNav[thatIndex]['active'] = parseInt(index)-1;
				}else{
					iMobile.MODULES.modulesActive.find('.textNav-a').eq(thatIndex).attr('href','javascript:;');
					iMobile.MODULES.textNav[thatIndex]['href'] = 'javascript:;';
				}
			});
			iMobile.mainRightContent.delegate('.form-link-list-textNav','keyup blue',function(){
				var that = $(this),
					thatVal = that.val(),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index();
				iMobile.MODULES.modulesActive.find('.textNav-a').eq(thatIndex).attr('href',thatVal);
				iMobile.MODULES.textNav[thatIndex]['href'] = thatVal;
			});
			iMobile.mainRightContent.delegate('.add-textNav','click',function(){

				var list = iMobile.Handlebars.compile(iMobile.DOM["editor-modules-textNav-option"]);
			    //var data = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
			    //data.pageList = iMobile.STORAGE.pageList.get().list;
			    var data = {
			    	"data" : {
				    	"textNav" : [{
				    		"text" : "文本导航",
		                	"href" : "javascript:;"
				    	}],
				    	"pageList" : iMobile.STORAGE.pageList.get().list
			    	}
			    }
			    $(this).before(list(data))

				iMobile.MODULES.modulesActive.append('<a href="javascript:;" class="textNav-a"><span class="textNav-name">文本导航</span><span class="glyphicon glyphicon-chevron-right"></span></a>')
				iMobile.MODULES.textNav.push({
	                "text" : "文本导航",
	                "href" : "javascript:;"
	            })
	            setTimeout(function(){
					iMobile.SCROLL.myScrollIphone.refresh();
					//iMobile.SCROLL.myScrollEditor.scrollToElement(document.querySelector('#getHtml .textNav-a:last-of-type'),0);
					iMobile.SCROLL.myScrollEditor.refresh();
					iMobile.SCROLL.myScrollEditor.scrollToElement(document.querySelector('.scroller-editor-ul .add-textNav:last-of-type'),0);

				},0)
			});
		},
		ajaxGetWxImgList : function(callback,pageNo){
			if('file://'===window.location.origin){
				callback(iMobile.DATA.commodityImg.data);
			}else{
			iMobile.request.ajax({
			    server : 'getWxImgList',
			    dataType : 'POST',
			    data : {
			    	"pageCount" : 9,
			    	"pageNo" : pageNo,
			    },
			    done : function(data){
			    	callback(data.data);
			    }
			});
			}
			
		},
		imageNavModal : function(imageNavIndex,data){
			var	commodityData = "",
			commodityData = data,
			totalCount = commodityData['totalCount'],
			pageCount = Math.ceil(totalCount/9),
			activeCount = 1;
			//if($('#imageNavModal').length){
			//	$('#imageNavModal').modal('show')
			//}else{
				var uploaderSelectModal = iMobile.Handlebars.compile(iMobile.DOM['imageNavModal']);
				$('body').append(uploaderSelectModal(commodityData));
				var imageNavModal = $('#imageNavModal');
				imageNavModal.delegate('.btn-primary','click',function(){

					var addImageNavTemp = iMobile.Handlebars.compile(iMobile.DOM['editor-modules-'+iMobile.MODULES.imageNav.modulesId]);
					$('.scroller-editor').empty().html(addImageNavTemp({"data":iMobile.MODULES.imageNav}));
		    		//iMobile.mainRightContent.find('.panel-ads-content').remove();
					//addImageAds.before(addImageAdsTemp(iMobile.imageAds))
		    		var modules = 'modules-' + iMobile.MODULES.imageNav["modulesId"];
		    		var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);

		    		iMobile.MODULES.modulesActive.html($(temp(iMobile.MODULES.imageNav)).html());
		    		events.swiper();
		    		iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
	    				imageNav : iMobile.MODULES.imageNav.imageNav
	    			});
		    		imageNavModal.modal('hide')
		    	});
				imageNavModal.delegate('.photo-select-li','click',function(){

					var that = $(this),
						thatIndex = that.index(),
						thatId = that.data()["id"],
						thatData = {};
					if(that.hasClass('active')){
	    			}else{
	    				that.addClass('active');
	    				that.siblings().removeClass('active');
	    				iMobile.MODULES.imageNav.imageNav[imageNavIndex]["src"] = commodityData["imglist"][thatIndex].filePath
	    				
	    			}
				});
				imageNavModal.delegate('.pagination li','click',function(){
					var that = $(this),
						index = that.index(),
						thatIndex = that.data('index');
					if(thatIndex){
						activeCount = thatIndex;
					}else{
						if(that.hasClass('previous')&&activeCount>1){
							activeCount--
						}else if(that.hasClass('next')&&activeCount<pageCount){
							activeCount++
						}
					}
					events.ajaxGetWxImgList(function(data){
				    	var networkPicture = iMobile.Handlebars.compile(iMobile.DOM['networkPicture']);
				    	data.index = activeCount;
						$('#networkPicture').empty().append(networkPicture(data));
					},activeCount)
					// iMobile.request.ajax({
					//     server : 'getWxImgList',
					//     dataType : 'POST',
					//     data : {
					//     	"pageCount" : 9,
					//     	"pageNo" : activeCount,
					//     },
					//     done : function(data){
					//     	var networkPicture = iMobile.Handlebars.compile(iMobile.DOM['networkPicture']);
					//     	data.data.index = activeCount;
					// 		$('#networkPicture').empty().append(networkPicture(data.data));
					//     }
					// });
				});
		    	imageNavModal.on('shown.bs.modal', function (e) {
		    		$('.nav-tabs a').click(function (e) {
		    		  e.preventDefault()
		    		  $(this).tab('show');
		    		})
		    		var uploadButton = $('#uploadButton');
					uploadButton.delegate(this,'click',function(){
		    			var ajaxFileUploadUrl = iMobile.request.ajax({server : 'uploadImg',type:'ajaxFileUpload'});
						$.ajaxFileUpload({
			                url : ajaxFileUploadUrl,
			                secureuri:false,
			                fileElementId:'img',    
			                dataType:'json',
			                data:{'width':'100','height':'100','imgFileName':'file.png'},
			                success:function(res){
				                imageNavModal.find('.upload-show-img img').attr('src',res["filePath"]);
				                iMobile.MODULES.imageNav.imageNav[imageNavIndex]["src"] = res["filePath"]
			                },
			                error : function(data,res,s){
			                }
			            })
		    		})
		    	});
				imageNavModal.on('hidden.bs.modal', function (e) {
		    		$('#imageNavModal').remove();
		    		

		    		// if(iMobile.uploaderList){
		    		// 	iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
		    		// 		uploaderList : iMobile.uploaderList
		    		// 	});
		    		// }
		    	});
		    	imageNavModal.modal('toggle');
		    //}
		},
		imageNav : function(){

			iMobile.mainRightContent.delegate('.form-imageNav-name','keyup blue',function(){
				var that = $(this),
					thatVal = that.val(),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index(),
					imageNavName = iMobile.MODULES.modulesActive.find('.imageNav-name').eq(thatIndex)
				if(thatVal&&thatVal.length<=5){
					if(imageNavName.hasClass('hide')){
						imageNavName.removeClass('hide');
					}
					imageNavName.text(thatVal);
					iMobile.MODULES.imageNav.imageNav[thatIndex]['text'] = thatVal;
				}else if(thatVal.length==0){
					that.val('');
					imageNavName.addClass('hide');
					iMobile.MODULES.imageNav.imageNav[thatIndex]['text'] = '';
				}else{
					that.val(thatVal.slice(0,5));
					iMobile.MODULES.imageNav.imageNav[thatIndex]['text'] = thatVal.slice(0,5);
				}
			});
			iMobile.mainRightContent.delegate('.form-link-list-imageNav','change',function(){
				var that = $(this),
				index = that[0].selectedIndex,
				thatVal = that.find('option').eq(index).attr('data-url'),
				thatParent = that.parents('.panel'),
				thatIndex = thatParent.index();
				if(thatVal){
					iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href',thatVal);
					iMobile.MODULES.imageNav.imageNav[thatIndex]['href'] = thatVal;
					iMobile.MODULES.imageNav.imageNav[thatIndex]['active'] = parseInt(index)-1;
				}else{
					iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href','javascript:;');
					iMobile.MODULES.imageNav.imageNav[thatIndex]['href'] = 'javascript:;';
				}
			});
			iMobile.mainRightContent.delegate('.form-imageNav-link','keyup blue',function(){
				var that = $(this),
					thatVal = that.val(),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index();
				iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href',thatVal);
				iMobile.MODULES.imageNav.imageNav[thatIndex]['href'] = thatVal;
			});
			iMobile.mainRightContent.delegate('.imageNav-resetImg,.uploaderButton','click',function(){
				var that = $(this);
				 events.ajaxGetWxImgList(function(data){
			     	events.imageNavModal(that.parents('.panel').index(),data);
		  			//events.imageNavModal(that.parents('.panel').index(),iMobile.DATA["commodity"].data);
				},1)




		  	    // iMobile.request.ajax({
		       //      server : 'getWxImgList',
		       //      dataType : 'POST',
		       //      data : {
		       //      	"pageCount" : 9,
		       //      	"pageNo" : 1,
		       //      },
		       //      done : function(data){
		       //      	events.imageNavModal(that.parents('.panel').index(),data.data);
		  		//		events.imageNavModal(that.parents('.panel').index(),iMobile.DATA["commodity"]);
		        //     }
		        // });
			});

		},
		swiper : function(){
			var orientation = 0;
		    $(window).delegate(window, "orientationchange", function() {
		        if (window.orientation == 0) {
		            orientation = 0
		        } else {
		            orientation = 1
		        }
		        location.reload()
		    });
			var swiperContainer = $(".swiper-container"),
				swiperSlideImg = $(".swiper-slide-img");
		        var imgHeight;
		        
		        for(var i=0;i<swiperSlideImg.length;i++){
		        	var img = new Image();
		        	img.src = swiperSlideImg.eq(i).attr('src');
		        	if (img.complete) {
		        	    var width = img.width/2;
		        	    var height = img.height /2;
		        	    var wWidth = (orientation == 0) ? 253 : 401;
		        	    imgHeight = Math.round(wWidth / (width / height));
		        	    if (imgHeight > height) {
		        	        imgHeight = height
		        	    }
		        	    swiperContainer.height(imgHeight)
		        	}
		        	img.onload = function() {
		        	    var width = img.width/2;
		        	    var height = img.height/2;
		        	    var wWidth = (orientation == 0) ? 253 : 401;
		        	    imgHeight = Math.round(wWidth / (width / height));
		        	    if (imgHeight > height) {
		        	        imgHeight = height
		        	    }
		        	    swiperContainer.height(imgHeight)
		        	};
		        }
		        
		        var mySwiper = new Swiper(".swiper-container", {pagination: ".pagination",loop: true,grabCursor: true,paginationClickable: true})
		},
		imagesAdsModal : function(data,uploaderIndex,imageAdsReset){
			var adsData = "",
				adsArray=[],
				addImageAds = iMobile.mainRightContent.find('.add-imageAds'),
				//adsData = iMobile.STORAGE.commodity.get()["data"];
				adsData = data,
				totalCount = adsData['totalCount'],
				pageCount = Math.ceil(totalCount/9),
				activeCount = 1;
			var imageAdsModal = $('#imageAdsModal');
			// if($('#imageAdsModal').length){
			// 	$('#imageAdsModal').modal('show')
			// }else{
				iMobile.imageAdsSelectModal = iMobile.Handlebars.compile(iMobile.DOM['imageAdsModal']);
				$('body').append(iMobile.imageAdsSelectModal(adsData));

			
				var imageAdsModal = $('#imageAdsModal');
				
				imageAdsModal.delegate('.btn-primary','click',function(){

		    		var addImageAdsTemp = iMobile.Handlebars.compile(iMobile.DOM['editor-modules-add-imageAds']);
		    		iMobile.mainRightContent.find('.panel-ads-content').remove();
					addImageAds.before(addImageAdsTemp({"data":iMobile.MODULES.imageAds}));
		    		//iMobile.imageAds.editorOptions = iMobile.MODULES.imageAds.editorOptions;

		    		var modules = 'modules-' + iMobile.MODULES.imageAds["modulesId"];
		    		var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);

		    		iMobile.MODULES.modulesActive.html($(temp(iMobile.MODULES.imageAds)).html());
		    		events.swiper();
		    		iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
	    				imageAds : iMobile.MODULES.imageAds.imageAds,
	    				editorOptions : iMobile.MODULES.imageAds.editorOptions
	    			});

		    		imageAdsModal.modal('hide');
		    	});
		    	imageAdsModal.delegate('.photo-select-li','click',function(){
	    			var that = $(this),
	    				thatIndex = that.index(),
	    				thatId = that.data()["id"],
	    				thatData = {
	    					"text" : "",
	    					"img" : "",
	    					"href" : ""
	    				};
	    			if(that.hasClass('active')){
	    				if(imageAdsReset){
	    					
	    				}else{
	    					that.removeClass('active');
	    					for(var i=0;i<adsArray.length;i++){
	    						if(adsArray[i]["id"]==thatId){
	    							iMobile.MODULES.imageAds.imageAds.splice(i,1)
	    						}
	    					}
	    				}
	    				
	    			}else{
	    				that.addClass('active');
	    				var adsDataIndex = adsData["imglist"][thatIndex];
	    				if(imageAdsReset){
	    					that.siblings().removeClass('active');
	    					iMobile.MODULES.imageAds.imageAds[uploaderIndex]["img"] = adsDataIndex.filePath
	    				}else{
	    					thatData.img = adsDataIndex.filePath;
			    			iMobile.MODULES.imageAds.imageAds.push(thatData);
	    				}
	    				
	    			}
	    		})
	    		imageAdsModal.delegate('.pagination li','click',function(){
					var that = $(this),
						index = that.index(),
						thatIndex = that.data('index');
					if(thatIndex){
						activeCount = thatIndex;
					}else{
						if(that.hasClass('previous')&&activeCount>1){
							activeCount--
						}else if(that.hasClass('next')&&activeCount<pageCount){
							activeCount++
						}
					}

					events.ajaxGetWxImgList(function(data){
				    	var networkPicture = iMobile.Handlebars.compile(iMobile.DOM['networkPicture']);
				    	data.index = activeCount;
						$('#networkPicture').empty().append(networkPicture(data));
					},activeCount)
					/*iMobile.request.ajax({
					    server : 'getWxImgList',
					    dataType : 'POST',
					    data : {
					    	"pageCount" : 9,
					    	"pageNo" : activeCount,
					    },
					    done : function(data){
					    	var networkPicture = iMobile.Handlebars.compile(iMobile.DOM['networkPicture']);
					    	data.data.index = activeCount;
							$('#networkPicture').empty().append(networkPicture(data.data));
					    }
					});*/
				});
		    	imageAdsModal.on('shown.bs.modal', function (e) {
		    		$('.nav-tabs a').click(function (e) {
		    		  e.preventDefault()
		    		  $(this).tab('show')
		    		})
		    		// iMobile.SCROLL.myScrollEditorads = new IScroll('.wrapper-commodity-modal', {
		    		//     mouseWheel: true,
		    		//     fadeScrollbars : false,
		    		//     bindToWrapper:true 
		    		// });
		    		var uploadButton = $('#uploadButton');
					uploadButton.delegate(this,'click',function(){
		    			var ajaxFileUploadUrl = iMobile.request.ajax({server : 'uploadImg',type:'ajaxFileUpload'});
						$.ajaxFileUpload({
			                url : ajaxFileUploadUrl,
			                secureuri:false,
			                fileElementId:'img',
			                dataType:'json',
			                data:{'width':'100','height':'100','imgFileName':'file.png'},
			                success:function(res){
				                imageAdsModal.find('.upload-show-img img').attr('src',res["filePath"]);
				                iMobile.MODULES.imageNav.imageNav[imageNavIndex]["src"] = res["filePath"]
			                },
			                error : function(data,res,s){
			                	
			                }
			            })
		    		})
		    	});
		    	imageAdsModal.on('hidden.bs.modal', function (e) {
		    		$('#imageAdsModal').remove();
		            setTimeout(function(){
						iMobile.SCROLL.myScrollIphone.refresh();
						iMobile.SCROLL.myScrollEditor.refresh();
					},0)
		    	});
		    	imageAdsModal.modal('toggle')
	    	//}
		},
		imageAds : function(){
			events.iCheckAds(function(){
				var	uploaderActive,
					uploaderIndex,
					imageAdsReset = false;
				//iMobile.MODULES.imageAds = iMobile.STORAGE.pageStorage.getPage(iMobile.PAGE.pageId).pageContent.pageModules[iMobile.MODULES.modulesActiveIndex];
				if(!iMobile.MODULES.imageAds.imageAds){
					iMobile.MODULES.imageAds.imageAds=iMobile.MODULES.imageAds.defaultImageAds
				}				
				iMobile.mainRightContent.delegate('.form-imageAds-name','keyup blue',function(){
					var that = $(this),
						thatVal = that.val(),
						thatParent = that.parents('.panel'),
						thatIndex = thatParent.index();

					var slide = iMobile.MODULES.modulesActive.find('.swiper-slide').not(".swiper-slide-duplicate");
					var duplicate = iMobile.MODULES.modulesActive.find('.swiper-slide-duplicate');
					var adsTitle = slide.find('.imageAds-text-span').eq(thatIndex);
					var length = iMobile.MODULES.imageAds.imageAds.length;
					
					if(thatVal&&thatVal.length<=5){
						
						if(thatIndex==0){
							duplicate.eq(1).find('.imageAds-text-span').text(thatVal)
						}else if(thatIndex==(length-1)){
							duplicate.eq(0).find('.imageAds-text-span').text(thatVal)
						}
						adsTitle.text(thatVal)
						iMobile.MODULES.imageAds.imageAds[thatIndex]['text'] = thatVal;
					}else if(thatVal.length==0){
						that.val('');
						iMobile.MODULES.imageAds.imageAds[thatIndex]['text'] = '';
					}else{
						that.val(thatVal.slice(0,5));
						iMobile.MODULES.imageAds.imageAds[thatIndex]['text'] = thatVal.slice(0,5);
					}

					
					// var modules = 'modules-' + iMobile.imageAds["modulesId"];
					// var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
					// iMobile.MODULES.modulesActive.html($(temp(iMobile.imageAds)).html())
					
					// setTimeout(function(){
					// 	iMobile.SCROLL.myScrollIphone.refresh();
					// },0)
				});
				iMobile.mainRightContent.delegate('.form-link-list-imageAds','change',function(){
					var that = $(this),
					index = that[0].selectedIndex,
					thatVal = that.find('option').eq(index).attr('data-url'),
					thatParent = that.parents('.panel'),
					thatIndex = thatParent.index();
					if(thatVal){
						iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href',thatVal);
						iMobile.MODULES.imageAds.imageAds[thatIndex]['href'] = thatVal;
						iMobile.MODULES.imageAds.imageAds[thatIndex]['active'] = parseInt(index)-1;
					}else{
						iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href','javascript:;');
						iMobile.MODULES.imageAds.imageAds[thatIndex]['href'] = 'javascript:;';
					}
				});
				iMobile.mainRightContent.delegate('.form-imageAds-link','keyup blue',function(){
					var that = $(this),
						thatVal = that.val(),
						thatParent = that.parents('.panel'),
						thatIndex = thatParent.index();
					iMobile.MODULES.modulesActive.find('.imageNav-a').eq(thatIndex).attr('href',thatVal);
					iMobile.MODULES.imageAds.imageAds[thatIndex]['href'] = thatVal;
				});
				iMobile.mainRightContent.delegate('.add-imageAds .no-border-color,.imageAds-resetImg','click',function(event){
					var tar = $(event.target);
					imageAdsReset =true;
					uploaderActive = $(this);
					uploaderIndex = uploaderActive.parents('.panel-ads').index();

					events.ajaxGetWxImgList(function(data){
				    	if(tar.hasClass('imageAds-resetImg')){
				    			events.imagesAdsModal(data,uploaderIndex,imageAdsReset);
						     	//events.imagesAdsModal(iMobile.DATA["commodity"],uploaderIndex,imageAdsReset);
							}else if(tar.hasClass('no-border-color')){
								events.imagesAdsModal(data);
								//events.imagesAdsModal(iMobile.DATA["commodity"]);
							}
					},1)

					//events.imagesAdsModal(uploaderIndex,imageAdsReset);
						    // iMobile.request.ajax({
					     //      server : 'getWxImgList',
					     //      dataType : 'POST',
					     //      data : {
					     //      	"pageCount" : 9,
					     //      	"pageNo" : 1,
					     //      },
					     //      done : function(data){
					     //      	events.imageNavModal(that.parents('.panel').index(),data.data);
								 //    if(tar.hasClass('imageAds-resetImg')){
								 //     	events.imagesAdsModal(iMobile.DATA["commodity"],uploaderIndex,imageAdsReset);
									// }else if(tar.hasClass('no-border-color')){
									// 	events.imagesAdsModal(iMobile.DATA["commodity"]);
									// }
									
					      //     }
					      // });
				});
					
				//     }
				// })
					/*$(this).before('<div class="panel panel-info"><div class="panel-heading">广告</div><div class="panel-body imageNav-content"><div class="form-group imageNav-uploader href"><button type="button" class="btn btn-default uploaderButton"><span class="glyphicon glyphicon-plus-sign text-success"></span>添加图片</button><div class="imageNav-showImgContent"><img class="imageNav-showImg" src="images/fff.png"><a href="javascript:;" class="imageNav-resetImg">重新上传</a></div></div><div class="form-group"><label>标题：</label><input type="text" class="form-control form-imageNav-name" placeholder="标题"></div><div class="form-group"><label>链接到：</label><input type="text" class="form-control form-imageNav-link" placeholder="http://www.baidu.com"></div></div></div>')
					//iMobile.MODULES.modulesActive.append('<div class="swiper-slide swiper-slide-duplicate"><img class="swiper-slide-img" src="http://demo.zksr.cn/upload/images/bdItemInfo/0000000005/4-1.png"> </div>')
					
					if(iMobile.imageAds){
						iMobile.imageAds.push({
			                "text" : "文本导航",
			                "href" : "http://www.baidu.com"
			            })
					}else{
						iMobile.imageAds=[{
			                "text" : "文本导航",
			                "href" : "http://www.baidu.com"
			            }]
					}
					
		            setTimeout(function(){
						iMobile.SCROLL.myScrollIphone.refresh();
						iMobile.SCROLL.myScrollEditor.refresh();
					},0)*/
				});
		},
		ueditor : function(data){
			if(iMobile.ueditor){
				UE.getEditor('ueditorContainer').destroy();
			}else{
				iMobile.ueditor = true;
			}
			iMobile.MODULES.ueditorContent = data.ueditorContent;
			var ueditor = UE.getEditor('ueditorContainer');
			ueditor.ready(function() {
				ueditor.setContent(iMobile.MODULES.ueditorContent);
			    ueditor.addListener('contentChange',function(){
			        document.getElementById('ueditorShowContent').innerHTML = ueditor.getContent();
			        iMobile.MODULES.ueditorContent = ueditor.getContent();
			        uParse('#ueditorShowContent', {
			            rootPath: '../'
			        })
			    })
			});
		},
		commodityArrayModal : function(commodityArrayData){

			var //commodityArrayData = "",
				//commodityArrayId=iMobile.MODULES.commodityArray.commodityArray?iMobile.MODULES.commodityArray.commodityArray:[],
				commodityArrayId = [],
				addCommodityArrayModal = iMobile.mainRightContent.find('.add-commodityArray');
				//commodityArrayData = iMobile.DATA.commodityArray.data;
			    

			//if(!$('#commodityArrayModal').length){
				iMobile.imageAdsSelectModal = iMobile.Handlebars.compile(iMobile.DOM['commodityArrayModal']);
				$('body').append(iMobile.imageAdsSelectModal(commodityArrayData));
			
			
			var commodityArrayModal = $('#commodityArrayModal');
			commodityArrayModal.delegate('.btn-primary','click',function(){
				if(commodityArrayId&&commodityArrayId[0]){
					commodityArrayId[0]["arrayActive"]= true;

				}

				iMobile.MODULES.commodityArray.commodityArray = commodityArrayId
	    		var addCommodityArrayModalTemp = iMobile.Handlebars.compile(iMobile.DOM['editor-modules-add-commodityArray']);
	    		iMobile.mainRightContent.find('.add-commodityArray-content').remove();
				addCommodityArrayModal.before(addCommodityArrayModalTemp({"commodityArray":commodityArrayId}));
	    		var temp = iMobile.Handlebars.compile(iMobile.DOM["modules-commodityArray"]);
	    		iMobile.MODULES.modulesActive.html($(temp(iMobile.MODULES.commodityArray)).html());
	    		iMobile.STORAGE.pageStorage.changeModules(iMobile.PAGE.pageId,iMobile.MODULES.modulesActiveIndex,{
    				commodityArray : commodityArrayId
    			});
	    		commodityArrayModal.modal('hide');
	    	});
	    	commodityArrayModal.delegate('li','click',function(){
    			var that = $(this),
    				thatIndex = that.index(),
    				thatId = that.data()["id"],
    				thatButton = that.find('button');
    			if(thatButton.hasClass('btn-success')){
    				thatButton.removeClass('btn-success');
					for(var i=0;i<commodityArrayId.length;i++){
						if(commodityArrayId[i]["wxClsNo"]==thatId){
							commodityArrayId.splice(i,1)
						}
					}
    			}else{
    				thatButton.addClass('btn-success');
    				commodityArrayId.push(commodityArrayData["wxList"][thatIndex]);
    			}
	    	});
	    	commodityArrayModal.on('shown.bs.modal', function (e) {
	    		iMobile.SCROLL.myScrollSider = new IScroll('.wrapper-commodity-modal', {
		            mouseWheel: true,
		            fadeScrollbars : false,
		            bindToWrapper:true 
		        });

	    	});
	    	commodityArrayModal.on('hidden.bs.modal', function (e) {
	   			commodityArrayModal.remove();
	   			//setTimeout(function(){
				// 	iMobile.SCROLL.myScrollSider.refresh();
				// 	iMobile.SCROLL.myScrollEditor.refresh();
				// },0)
	    	});
	    	commodityArrayModal.modal('toggle')

	    	// }else{
	    	// 	$('#commodityArrayModal').modal('show')
	    	// }

		},

		commodityArray : function(){
			events.iCheckCommodityArray(function(){
		        //$('.scroller-iphone').height($('.weixin-content').height())
		        //$('#getHtml').height($('.weixin-content').height())
		        //$('.nav-sider-contarner').height($('.weixin-content').height())
				iMobile.SCROLL.myScrollSider = new IScroll('.wrapper-sider', {
		            mouseWheel: true,
		            fadeScrollbars : false,
		            bindToWrapper:true 
		        });
		        
		        $('.form-commodityArray-title').delegate(this,'keyup',function(){
		        	var val = $(this).val();
		        	iMobile.MODULES.modulesActive.find('.nav-title-text').text(val);
		        	//iMobile.MODULES.modulesActiveId=val;
		        	iMobile.MODULES.commodityArray.editorOptions.arrayTitle = val;
		        })
				iMobile.mainRightContent.delegate('.add-commodityArray','click',function(){
					//uploaderActive = $(this);
					if('file://'===window.location.origin){
						events.commodityArrayModal(iMobile.DATA.commodityArray.data);
					}else{
						iMobile.request.ajax({
						    server : 'getWxItemClsGroup',
						    dataType : 'POST',
						    done : function(data){
								events.commodityArrayModal(data.data);
							}
						});
					}
				});
			})
	        
		},
		iCheckShopList : function(callback){
			$('input').iCheck({
			    checkboxClass: 'icheckbox_square-blue',
			    radioClass: 'iradio_square-blue',
			    increaseArea: ' 10%' // optional
			  });
			
			$('input[name="sale"').on('ifChecked', function(event){
				var that = $(this);
				var thatStatus = that.data('status');
				var thatSale = that.data('sale');
				iMobile.MODULES.modulesActive.find('.select-shop-status').text(thatStatus)
				iMobile.MODULES.shopList.shopSale = thatSale;
			});
			
			if(callback){
				setTimeout(function(){
					callback();
				},0)
			}
		},
		shopList : function(){
			events.iCheckShopList(function(){

			})
			console.log('shopList')
		}
	}
	return events
})

