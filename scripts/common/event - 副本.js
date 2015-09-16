;define(function(){
	var events = {
		init : function(){
			
			events.myScroll();
			events.scroll();
			events.draggable(".wrapper-modular li");
			events.droppable(".main-middle");
			events.delegatePage();
			events.delegateModules();
			$('.scroller-page li').eq(0).trigger('click');
		},
		pageLength : function(){
			
		},
		myScroll : function(){
			var pageLength = iMobile.STORAGE.pageStorage.get()["page"].length;
			iMobile.scrollPageWidth = pageLength*iMobile.pageWidth+1;
			$('.scroller-page').width(iMobile.scrollPageWidth);
			iMobile.myScroll = new IScroll('.wrapper-modular', {
			    mouseWheel: true,
			    bindToWrapper:true
			});

		},
		scroll : function(){
			iMobile.myScrollEditor = new IScroll('.wrapper-editor', { 
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});
			iMobile.myScrollMiddle = new IScroll('.wrapper-middle', { 
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});
			iMobile.myScrollIphone = new IScroll('.wrapper-iphone', { 
			    mouseWheel: true,
			    fadeScrollbars : false,
			    bindToWrapper:true 
			});
			iMobile.myScrollPage = new IScroll('.wrapper-page', { 
			    eventPassthrough: true,
			    mouseWheel: true,
			    scrollX: true, 
			    scrollY: false, 
			    preventDefault: false 
			});
		},
		draggable : function(el){
			$(el).draggable({
			    appendTo: "body",
			    zIndex : 100,
			    opacity: 0.7,
			    cursor: "move",
			    cursorAt: { top: -10, left: -10 },
			    helper: function( event ) {
			    	iMobile.modulesId = $(this).attr('data-modulesId')
			    	var modules = 'modules-' + iMobile.modulesId;
			    	iMobile.modulesTemplate = iMobile.Handlebars.compile(iMobile.DOM[modules]);
			    	return $( "<div class='ui-widget-header'>"+iMobile.modulesTemplate()+"</div>" );
			    }
			});
		},
		droppable : function(el){
			$(el).droppable({
			  drop: function(event, ui) {

			    $(this).find(".wrapper-iphone ul").append(iMobile.modulesTemplate(iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId)));
			    iMobile.STORAGE.pageStorage.addModules(iMobile.pageId,iMobile.modulesId);
			    iMobile.myScrollIphone.refresh();
			    iMobile.myScrollIphone.scrollToElement(document.querySelector('.scroller-iphone div:last-of-type'),0);
			  }
			});
		},
		modules : function(DATA){
			$('.wrapper-iphone ul').empty();
			for(var i in DATA.pageModules){
				var modules = 'modules-' + DATA.pageModules[i]["modulesId"];
				var temp = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				$('.wrapper-iphone ul').append(temp(DATA.pageModules[i]));
			}
		},
		delegatePage : function(){
			$('#save').delegate(this,'click',function(){
				if(iMobile.modulesActive){
					if(iMobile.editorOptions){
						iMobile.STORAGE.pageStorage.changeModules(iMobile.pageId,iMobile.modulesActiveIndex,{
							editorOptions : iMobile.editorOptions
						})
					}
					
				}else{
					var formTitle = $('.form-title').val();
					if(formTitle){

						$('.weixin-header').text(formTitle);
						iMobile.pageTar.text(formTitle);
						var pageIndex = iMobile.STORAGE.pageStorage.getPage(iMobile.pageId).pageIndex;
						var pageContent = iMobile.STORAGE.pageStorage.getPage(iMobile.pageId).pageContent;
						pageContent.pageName = formTitle;

						var page = iMobile.STORAGE.pageStorage.get();
						page["page"][pageIndex]=pageContent;
						iMobile.STORAGE.pageStorage.set(page);
					}
				}
			});
			$('#cancel').delegate(this,'click',function(){
				if(!iMobile.modulesActive){
					return;
				}
				iMobile.modulesActive.removeClass('active');
				$('.scroller-editor').empty();
			});
			$('#up').delegate(this,'click',function(){
				if(!iMobile.modulesActive){
					return;
				}
				var prev = iMobile.modulesActive.prev();
				if(prev.length>0){
					iMobile.modulesActiveIndex = prev.index();
					prev.before(iMobile.modulesActive);
					iMobile.STORAGE.pageStorage.upModules(iMobile.pageId,iMobile.modulesActiveIndex);
				}
			});
			$('#down').delegate(this,'click',function(){
				if(!iMobile.modulesActive){
					return;
				}
				var next = iMobile.modulesActive.next();
				if(next.length>0){
					iMobile.modulesActiveIndex = next.index();
					next.after(iMobile.modulesActive);
					iMobile.STORAGE.pageStorage.downModules(iMobile.pageId,iMobile.modulesActiveIndex);
				}
			});
			$('#remove').delegate(this,'click',function(){
				if(!iMobile.modulesActive){
					return;
				}
				iMobile.modulesActive.remove();
				$('.scroller-editor').empty();
				if(iMobile.modulesActiveNext.length){
					iMobile.modulesActiveNext.trigger('click');
				}else{
					iMobile.modulesActivePrev.trigger('click');
				}
				iMobile.STORAGE.pageStorage.removeModules(iMobile.pageId,iMobile.modulesActiveIndex);
			});
			$('#plus').delegate(this,'click',function(){
				var newPage = {
		        	"pageName" : "新页面",
		            "pageId" : events.getRandomNum(0,1000),
		            "pageModules": []
		        }
		        iMobile.STORAGE.pageStorage.addPage(newPage);

				$('.scroller-page ul').append(iMobile.wrapperNewPageDomTemplate(newPage));
				iMobile.scrollPageWidth = iMobile.scrollPageWidth+iMobile.pageWidth
				$('.scroller-page').width(iMobile.scrollPageWidth);

				iMobile.myScrollPage.refresh();
			    iMobile.myScrollPage.scrollToElement(document.querySelector('.scroller-page li:last-of-type'),0);
				
		        $('.scroller-page li:last-of-type').trigger('click');
			});
		},
		getRandomNum : function (Min,Max){
			var Range = Max - Min;
			var Rand = Math.random();
			var randomNum = Min + Math.round(Rand * Range);
			var pageIdArray = iMobile.STORAGE.pageStorage.getPageId();
			for(var i=0;i<pageIdArray.length;i++){
				if(pageIdArray[i]==randomNum){
					arguments.callee(0,1000)
				}
			}
			return randomNum.toString();
		},
		iCheck : function(callback){
			$('input').iCheck({
			    checkboxClass: 'icheckbox_square-blue',
			    radioClass: 'iradio_square-blue',
			    increaseArea: ' 10%' // optional
			  });
			$('input[name="payButton"').on('ifChecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-icon').removeClass('hidden');
				iMobile.editorOptions.payButton = 'true';
			});
			$('input[name="payButton"').on('ifUnchecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-icon').addClass('hidden');
				iMobile.editorOptions.payButton = 'false';
			});
			$('input[name="commodityName"').on('ifChecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-name').removeClass('hidden');
				iMobile.editorOptions.commodityName = 'true';
			});
			$('input[name="commodityName"').on('ifUnchecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-name').addClass('hidden');
				iMobile.editorOptions.commodityName = 'false';
			});
			$('input[name="commodityDesc"').on('ifChecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-desc').removeClass('hidden');
				iMobile.editorOptions.commodityDesc = 'true';
			});
			$('input[name="commodityDesc"').on('ifUnchecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-desc').addClass('hidden');
				iMobile.editorOptions.commodityDesc = 'false';
			});
			$('input[name="commodityPrice"').on('ifChecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-price').removeClass('hidden');
				iMobile.editorOptions.commodityPrice = 'true';
			});
			$('input[name="commodityPrice"').on('ifUnchecked', function(event){
				iMobile.modulesActive.find('.modules-commodity-price').addClass('hidden');
				iMobile.editorOptions.commodityPrice = 'false';
			});
			$('input[name="layoutStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	layoutStyle=that.data()['layoutstyle'];
				iMobile.modulesActive.removeClass('commodity-'+iMobile.editorOptions.layoutStyle).addClass('commodity-'+layoutStyle);
				iMobile.editorOptions.layoutStyle = layoutStyle;
				
			});
			$('input[name="listStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	listStyle = that.data()['liststyle'];
				var modulesCommodityDiv=iMobile.modulesActive.find('.modules-commodity-div');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.editorOptions.listStyle).addClass('commodity-'+listStyle);
				iMobile.editorOptions.listStyle = listStyle;
			});
			$('input[name="buttonStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	buttonStyle = that.data()['buttonstyle'];
				var modulesCommodityDiv=iMobile.modulesActive.find('.icon-commodity');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.editorOptions.buttonStyle).addClass('commodity-'+buttonStyle);
				iMobile.editorOptions.buttonStyle = buttonStyle;
			});
			$('input[name="nameStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	nameStyle = that.data()['namestyle'];
				var modulesCommodityDiv=iMobile.modulesActive.find('.modules-commodity-name');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.editorOptions.nameStyle).addClass('commodity-'+nameStyle);
				iMobile.editorOptions.nameStyle = nameStyle;
			});
			$('input[name="descStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	descStyle = that.data()['descstyle'];
				var modulesCommodityDiv=iMobile.modulesActive.find('.modules-commodity-desc');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.editorOptions.descStyle).addClass('commodity-'+descStyle);
				iMobile.editorOptions.descStyle = descStyle;
			});
			$('input[name="priceStyle"]').on('ifChecked', function(event){
				var that = $(this);
				var	priceStyle = that.data()['pricestyle'];
				var modulesCommodityDiv=iMobile.modulesActive.find('.modules-commodity-price');
				modulesCommodityDiv.removeClass('commodity-'+iMobile.editorOptions.priceStyle).addClass('commodity-'+priceStyle);
				iMobile.editorOptions.priceStyle = priceStyle;
			});
			if(callback){
				setTimeout(function(){
					callback();
				},0)
			}
		},
		delegateModules : function(){
			$('.header').delegate('li','click',function(){
				iMobile.pageTar = $(this);
				var index = iMobile.pageTar.index();
				iMobile.pageId = iMobile.pageTar.data()["pageid"];
				iMobile.pageTar.siblings().removeClass('active').end().addClass('active');
				var pageContent = iMobile.STORAGE.pageStorage.getPage(iMobile.pageId).pageContent;
				var pageName = pageContent.pageName;
				events.modules(pageContent);
				iMobile.myScrollIphone.refresh();
				$('.weixin-header').text(pageName);
				$('.scroller-editor').empty().html(iMobile.editorModulesDomTemplate(pageContent));
			});
			$( ".main-middle" ).delegate('.modules','click',function(){
				iMobile.modulesActiveShadow= $(this);
				iMobile.modulesActive = iMobile.modulesActiveShadow.parent();
				iMobile.modulesActiveIndex = iMobile.modulesActive.index();
				iMobile.modulesActive.siblings().removeClass('active').end().addClass('active');
				iMobile.modulesActiveId = iMobile.modulesActive.attr('data-modulesid');
				
				iMobile.modulesActiveNext = iMobile.modulesActive.next();
				iMobile.modulesActivePrev = iMobile.modulesActive.prev();

				var modules = 'editor-modules-' + iMobile.modulesActiveId;
				var modify = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				//iMobile.editorOptions = iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesActiveId).editorOptions
				console.log(iMobile.STORAGE.pageStorage.getPage().pageContent.pageModules[0].editorOptions)
				iMobile.editorOptions = iMobile.STORAGE.pageStorage.getPage().pageContent.pageModules[0].editorOptions
				iMobile.editorDom = modify(iMobile.editorOptions)


				$('.scroller-editor').empty().html(iMobile.editorDom);
				iMobile.myScrollEditor.refresh();
				if(iMobile.modulesActiveId=="commodity"){
					events.commodityEvents();
				}
				
			});
			$('.main-left').delegate('li','click',function(){
				iMobile.modulesId = $(this).attr('data-modulesId');
				var modules = 'modules-' + iMobile.modulesId;
				iMobile.modulesTemplate = iMobile.Handlebars.compile(iMobile.DOM[modules]);
				console.log(iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId));
				
				$('.main-middle').find(".wrapper-iphone ul").append(iMobile.modulesTemplate(iMobile.STORAGE.modulesStorage.getModules(iMobile.modulesId)));
				iMobile.STORAGE.pageStorage.addModules(iMobile.pageId,iMobile.modulesId);
				iMobile.myScrollIphone.refresh();
				iMobile.myScrollIphone.scrollToElement(document.querySelector('.scroller-iphone div:last-of-type'),0);
			});
			
		},
		commodityEvents : function(){
			events.iCheck(function(){
				var mainRightContent = $('.main-right-content'),
					commoditySelect = mainRightContent.find('.commoditySelect'),
					layoutStyleSelect = mainRightContent.find('.layoutStyleSelect'),
					listStyle = mainRightContent.find('.listStyle'),
					buttonStyle = mainRightContent.find('.buttonStyle');
				commoditySelect.delegate(this,'click',function(){
					var that = $(this);
					iMobile.commoditySelectModal = iMobile.Handlebars.compile(iMobile.DOM['commoditySelectModal']);
					console.log(iMobile.STORAGE.pageStorage.getPage().pageContent.pageModules[0])
					$('body').append(iMobile.commoditySelectModal(iMobile.STORAGE.pageStorage.getPage().pageContent.pageModules[0]));
					var commondityModal = $('#commondityModal');
					commondityModal.modal('toggle');
					commondityModal.on('show.bs.modal', function (e) {
						console.log(commondityModal);
						
					});
					commondityModal.on('shown.bs.modal', function (e) {
						iMobile.myScrollEditor = new IScroll('.wrapper-commodity-modal', {
						    mouseWheel: true,
						    fadeScrollbars : false,
						    bindToWrapper:true 
						});
						commondityModal.find('li').delegate(this,'click',function(){
							var that = $(this);
							that.toggleClass('active')
						})
					});
					commondityModal.on('hidden.bs.modal', function (e) {
						console.log(commondityModal);
						commondityModal.remove();
					});
					
				});

				
			});


		}

	}
	return events
})