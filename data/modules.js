;define([],function(){
var data = {
    "page" : [
        {
        	"pageName" : "首页",
            "pageId" : "234",
            "pageActive" : false,
            "pageModules": [
                {
                    "moduleText": "商品",
                    "name" : "商品",
                    "modulesId": "commodity",
                    "defaultCommodityList" : [{
                        "img" : "images/default-1.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "379.00"
                    },{
                        "img" : "images/default-2.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "5.00"
                    },{
                        "img" : "images/default-3.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "32.00"
                    },{
                        "img" : "images/default-n.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "60.00"
                    }],
                    "editorOptions" : {
                        "layoutStyle" : "big-small-picture",//big-picture,small-picture,big-small-picture,list-picture
                        "listStyle" : "card-style",//card-style,mini-style
                        "buttonStyle" : "icon-style-0",//style-0,style-1,style-2,style-3
                        "nameStyle" : "name-style-0",//style-0,style-1
                        "descStyle" : "desc-style-0",//style-0,style-1
                        "priceStyle" : "price-style-0",//style-0,style-1
                        "payButton" : "true",
                        "commodityName" : "true",
                        "commodityPrice" : "true",
                        "commodityDesc" : "true"
                    }
                }
            ]
        },
        {
            "pageName" : "活动页面",
            "pageId" : "123",
            "pageActive" : true,
            "pageModules": [
                {
                    "moduleText": "商品",
                    "name" : "商品",
                    "modulesId": "commodity",
                    "defaultCommodityList" : [{
                        "img" : "images/default-1.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "379.00"
                    },{
                        "img" : "images/default-2.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "5.00"
                    },{
                        "img" : "images/default-3.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "32.00"
                    },{
                        "img" : "images/default-n.jpg",
                        "name" : "此处显示商品名称",
                        "desc" : "此处显示商品描述",
                        "price" : "60.00"
                    }],
                    "editorOptions" : {
                        "layoutStyle" : "big-small-picture",//big-picture,small-picture,big-small-picture,list-picture
                        "listStyle" : "card-style",//card-style,mini-style
                        "buttonStyle" : "icon-style-0",//style-0,style-1,style-2,style-3
                        "nameStyle" : "name-style-0",//style-0,style-1
                        "descStyle" : "desc-style-0",//style-0,style-1
                        "priceStyle" : "price-style-0",//style-0,style-1
                        "payButton" : "true",
                        "commodityName" : "true",
                        "commodityPrice" : "true",
                        "commodityDesc" : "true"
                    }
                }
            ]
        }
    ]
}
var data ={"site":null,"page":[{"pageModules":[{"moduleText":"文本导航","name":"文本导航","modulesId":"textNav","textNav":[{"text":"文本导航","href":"javascript:;"}],"notice":""},{"moduleText":"图片广告","name":"图片广告","modulesId":"imageAds","defaultImageAds":[{"text":"图片导航","img":"images/imageAbs.jpg","href":"javascript:;"}],"editorOptions":{"displayMode":"swiper","displaySize":"big"}},{"moduleText":"文本导航","name":"文本导航","modulesId":"textNav","textNav":[{"text":"文本导航","href":"javascript:;"}]}],"pageActive":true,"pageName":"首页","pageId":"234","pageIndex":false},{"pageModules":[{"moduleText":"商品","name":"商品","modulesId":"commodity","defaultCommodityList":[{"img":"images/default-1.jpg","name":"此处显示商品名称","desc":"此处显示商品描述","price":"379.00"},{"img":"images/default-2.jpg","name":"此处显示商品名称","desc":"此处显示商品描述","price":"5.00"},{"img":"images/default-3.jpg","name":"此处显示商品名称","desc":"此处显示商品描述","price":"32.00"},{"img":"images/default-n.jpg","name":"此处显示商品名称","desc":"此处显示商品描述","price":"60.00"}],"editorOptions":{"layoutStyle":"big-small-picture","listStyle":"card-style","buttonStyle":"icon-style-0","nameStyle":"name-style-0","descStyle":"desc-style-0","priceStyle":"price-style-0","payButton":"true","commodityName":"true","commodityPrice":"true","commodityDesc":"true"}}],"pageActive":false,"pageName":"活动页面","pageId":"123","pageIndex":false}]}
var pageList = {"result":"0","list":[{"pageName":"首页","pageUrl":"http://192.168.2.81wxshop/wx_shop_view!page.action?pageId=234","pageId":"234"},{"pageName":"活动页面","pageUrl":"http://192.168.2.81wxshop/wx_shop_view!page.action?pageId=123","pageId":"123"},{"pageName":"购物车","pageUrl":"http://192.168.2.81/wxshop/wx_shop_cart!getWxShopCart.action","pageId":"12348888"}]}
var website = {
    "page" : [{
        "pageName" : "empty",
        "pageTitle" : "空白模版",
        "pageCommont" : {
            "pageName" : "新页面",
            "pageId" : 0,
            "pageModules": [],
            "pageModulerType": "",
            "pageActive": true,
            "pageIndex" : false
            }
        },
        {
        "pageName" : "newArrivals",
        "pageTitle" : "新品推荐",
        "pageCommont" : {
            "pageName" : "新页面",
            "pageId" : 0,
            "pageModules": [{
                "moduleText": "文本导航",
                "name": "文本导航",
                "modulesId": "textNav",
                "textNav": [
                {
                "text": "文本导航",
                "href": "javascript:;"
                }
                ],
                "notice": ""
                },
                {
                "moduleText": "图片广告",
                "name": "图片广告",
                "modulesId": "imageAds",
                "defaultImageAds": [
                {
                "text": "图片导航",
                "img": "images/imageAbs.jpg",
                "href": "javascript:;"
                }
                ],
                "editorOptions": {
                "displayMode": "swiper",
                "displaySize": "big"
                }
                },
                {
                "moduleText": "文本导航",
                "name": "文本导航",
                "modulesId": "textNav",
                "textNav": [
                {
                "text": "文本导航",
                "href": "javascript:;"
                }
                ]
                },{
                "moduleText": "商品",
                "name": "商品",
                "modulesId": "commodity",
                "defaultCommodityList": [{
                    "img": "images/default-1.jpg",
                    "name": "此处显示商品名称",
                    "desc": "此处显示商品描述",
                    "price": "379.00"
                    },{
                    "img": "images/default-2.jpg",
                    "name": "此处显示商品名称",
                    "desc": "此处显示商品描述",
                    "price": "5.00"
                    },{
                    "img": "images/default-3.jpg",
                    "name": "此处显示商品名称",
                    "desc": "此处显示商品描述",
                    "price": "32.00"
                    },{
                    "img": "images/default-n.jpg",
                    "name": "此处显示商品名称",
                    "desc": "此处显示商品描述",
                    "price": "60.00"
                    }
                ],
                "editorOptions": {
                    "layoutStyle": "big-small-picture",
                    "listStyle": "card-style",
                    "buttonStyle": "icon-style-0",
                    "nameStyle": "name-style-0",
                    "descStyle": "desc-style-0",
                    "priceStyle": "price-style-0",
                    "payButton": "true",
                    "commodityName": "true",
                    "commodityPrice": "true",
                    "commodityDesc": "true"
                }
            }],
            "pageModulerType": "",
            "pageActive": false,
            "pageIndex" : false
            }
        }
    ],
    "modules" : {
        "onePage" : [{
            "moduleText": "商品分组",
            "name" : "商品分组",
            
            "modulesId": "commodityArray",
            "defaultCommodityArray" : [{
                "arrayName" : "默认分组",
                "arrayId" : "array1",
                "arrayActive" : true,
                "arrayContent" : [{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-1.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-2.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-3.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-n.jpg"
                }]
            },{
                "arrayName" : "默认分组",
                "arrayId" : "array2",
                "arrayActive" : false,
                "arrayContent" : [{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-1.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-2.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-3.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-n.jpg"
                }]
            },{
                "arrayName" : "默认分组",
                "arrayId" : "array3",
                "arrayActive" : false,
                "arrayContent" : [{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-1.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-2.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-3.jpg"
                },{
                    "name" : "此处显示商品名称",
                    "price" : "123.00",
                    "img" : "images/default-n.jpg"
                }]
            }],
            "editorOptions" : {
                "arrayTitle" : "中科商软",
                "commodityArrayImg" : true,

                
            }
        }],
        "pageOne" : [{
            "moduleText": "导航",
            "name" : "导航",
            "modulesId": "nav",
            "nav" : [{
                "name" : "主页",
                "href" : "javascript:;"
            }
            // ,{
            //     "name" : "收藏"
            // },{
            //     "name" : "我的"
            // },{
            //     "name" : "搜索"
            // }
            ]
        }],
        "basic" : [
        // {
        //     "moduleText": "店铺列表",
        //     "name" : "店铺列表",
        //     "modulesId": "shopList",
        //     "shopList" : {
        //         "shopLogo" : "images/logo_s.png",
        //         "shopName" : "中科商软",
        //         "shopSale" : "true",
        //         "shopHref" : "javascript:;",
        //         "dis_range" : "1000",
        //         "dis_price" : "10",
        //         "commondityList" : [{
        //             "commodityImg" : "images/default-1.jpg",
        //             "commodityprice" : "12.34"
        //         },{
        //             "commodityImg" : "images/default-2.jpg",
        //             "commodityprice" : "12.34"
        //         },{
        //             "commodityImg" : "images/default-3.jpg",
        //             "commodityprice" : "12.34"
        //         },{
        //             "commodityImg" : "images/default-n.jpg",
        //             "commodityprice" : "12.34"
        //         }]
        //     }
        // },
        {
            "moduleText": "富文本",
            "name" : "富文本",
            "modulesId": "ueditor",
            "ueditorDefaultContent":'<p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>',
            "ueditorContent" : ""

        },
        {
            "moduleText": "商品",
            "name" : "商品",
            "modulesId": "commodity",
            "defaultCommodityList" : [{
                "img" : "images/default-1.jpg",
                "name" : "此处显示商品名称",
                "desc" : "此处显示商品描述",
                "price" : "379.00"
            },{
                "img" : "images/default-2.jpg",
                "name" : "此处显示商品名称",
                "desc" : "此处显示商品描述",
                "price" : "5.00"
            },{
                "img" : "images/default-3.jpg",
                "name" : "此处显示商品名称",
                "desc" : "此处显示商品描述",
                "price" : "32.00"
            },{
                "img" : "images/default-n.jpg",
                "name" : "此处显示商品名称",
                "desc" : "此处显示商品描述",
                "price" : "60.00"
            }],
            "editorOptions" : {
                "layoutStyle" : "big-small-picture",//big-picture,small-picture,big-small-picture,list-picture
                "listStyle" : "card-style",//card-style,mini-style
                "buttonStyle" : "icon-style-0",//style-0,style-1,style-2,style-3
                "nameStyle" : "name-style-0",//style-0,style-1
                "descStyle" : "desc-style-0",//style-0,style-1
                "priceStyle" : "price-style-0",//style-0,style-1
                "payButton" : "true",
                "commodityName" : "true",
                "commodityPrice" : "true",
                "commodityDesc" : "true"
            }
        
        },{
            "moduleText": "文本导航",
            "name" : "文本导航",
            "modulesId": "textNav",
            "textNav" : [{
                "text" : "文本导航",
                "href" : "javascript:;"
            }]
        },{
            "moduleText": "图片导航",
            "name" : "图片导航",
            "modulesId": "imageNav",
            "imageNav" : [{
                "text" : "图片导航",
                "src" : "images/fff.png",
                "href" : "javascript:;"
            },{
                "text" : "图片导航",
                "src" : "images/fff.png",
                "href" : "javascript:;"
            },{
                "text" : "图片导航",
                "src" : "images/fff.png",
                "href" : "javascript:;"
            },{
                "text" : "图片导航",
                "src" : "images/fff.png",
                "href" : "javascript:;"
            }]
        },{
            "moduleText": "图片广告",
            "name" : "图片广告",
            "modulesId": "imageAds",
            "defaultImageAds" : [{
                "text" : "图片导航",
                "img" : "images/imageAbs.jpg",
                "href" : "javascript:;"
            }],
            "editorOptions" : {
                "displayMode" : "swiper",//none
                "displaySize" : "big",//small

            }
        },{
            "moduleText": "辅助线",
            "name" : "辅助线",
            "modulesId": "auxiliaryLine"
        },{
            "moduleText": "辅助空白",
            "name" : "辅助空白",
            "modulesId": "auxiliaryBlank"
        },{
            "moduleText": "公告",
            "name" : "公告",
            "modulesId": "notice",
            "marquee" : false,
            "notice" : "",
            "defaultNotice" : "公告：请填写内容，如果过长，将会在手机上滚动显示"
        },{
            "moduleText": "商品搜索",
            "name" : "商品搜索",
            "modulesId": "search"
        }
    ]
    }
}
var commodity = {"message":"查找成功.","data":{"itemlist":[{"itemName":"测试商品","itemNo":"100032","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/100032/","itemPrice":0.01},{"itemName":"康师傅小鸡炖蘑菇面","itemNo":"0000000006","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000006/2-1.png","itemPrice":4.50},{"itemName":"康师傅红烧牛肉面","itemNo":"0000000005","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000005/1-1.png","itemPrice":4.50},{"itemName":"双汇润口玉米风味肠","itemNo":"0000000010","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000010/1-1.png","itemPrice":1.00},{"itemName":"双汇热狗肠","itemNo":"00000000009","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/00000000009/1-1.png","itemPrice":1.50},{"itemName":"双汇王中王","itemNo":"00000000007","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/00000000007/1-1.png","itemPrice":1.50},{"itemName":"可口可乐","itemNo":"0000000004","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000004/1-1.png","itemPrice":3.00},{"itemName":"北冰洋橙汁汽水","itemNo":"0000000001","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000001/1-1.png","itemPrice":5.00},{"itemName":"伊利味可滋香蕉牛奶","itemNo":"0000000013","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000013/1-1.png","itemPrice":6.00},{"itemName":"信远斋桂花酸梅汤","itemNo":"0000000003","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000003/1-1.png","itemPrice":4.50},{"itemName":"统一海之言柠檬味饮料","itemNo":"0000000002","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000002/1-1.png","itemPrice":5.00},{"itemName":"梦龙卡布奇诺","itemNo":"6909493200239","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/6909493200239/1-1.jpg","itemPrice":7.00},{"itemName":"蒂兰圣雪香草巧克力冰淇淋","itemNo":"6923644274719","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/6923644274719/1-1.png","itemPrice":4.50},{"itemName":"蒂兰圣雪芒果味冰淇淋","itemNo":"6923644275181","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/6923644275181/1-1.png","itemPrice":4.50},{"itemName":"八喜芒果口味冰淇淋","itemNo":"6907868587686","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/6907868587686/5-1.png","itemPrice":6.00},{"itemName":"八喜绿茶口味冰淇淋","itemNo":"6907868581488","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/6907868581488/3-1.png","itemPrice":6.00},{"itemName":"恒寿堂蜜炼柚子茶","itemNo":"0000000011","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/0000000011/1-1.png","itemPrice":15.00},{"itemName":"雀巢咖啡","itemNo":"000000000012","picUrl":"http://demo.zksr.cn/upload/images/bdItemInfo/000000000012/1-1.png","itemPrice":1.00}]},"code":"0"}

var commodityImg = {"message":"查找成功.","data":{"totalCount":137,"imglist":[{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433927650011.png","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433927621620.png","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839773651.png","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839761120.jpg","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839595589.jpg","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839581526.jpg","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839536886.jpg","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839497589.jpg","width":100.00},{"height":100.00,"filePath":"http://192.168.2.81:8888/upload/images/wxShopDesign/1433839449136.png","width":100.00}]},"code":"0"}


var commodityArray = {"message":"查找成功.","data":{"wxList":[{"itemList":[{"wxSalePrice":4.50,"itemNo":"0000000006","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000006/2-1.png","wxItemName":"康师傅小鸡炖蘑菇面"},{"wxSalePrice":4.50,"itemNo":"0000000005","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000005/1-1.png","wxItemName":"康师傅红烧牛肉面"},{"wxSalePrice":1.00,"itemNo":"0000000010","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000010/1-1.png","wxItemName":"双汇润口玉米风味肠"},{"wxSalePrice":1.50,"itemNo":"00000000009","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/00000000009/1-1.png","wxItemName":"双汇热狗肠"},{"wxSalePrice":1.50,"itemNo":"00000000007","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/00000000007/1-1.png","wxItemName":"双汇王中王"}],"wxClsName":"食品","wxClsNo":"2"},{"itemList":[{"wxSalePrice":3.00,"itemNo":"0000000004","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000004/1-1.png","wxItemName":"可口可乐"},{"wxSalePrice":5.00,"itemNo":"0000000001","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000001/1-1.png","wxItemName":"北冰洋橙汁汽水"},{"wxSalePrice":6.00,"itemNo":"0000000013","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000013/1-1.png","wxItemName":"伊利味可滋香蕉牛奶"},{"wxSalePrice":4.50,"itemNo":"0000000003","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000003/1-1.png","wxItemName":"信远斋桂花酸梅汤"},{"wxSalePrice":5.00,"itemNo":"0000000002","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000002/1-1.png","wxItemName":"统一海之言柠檬味饮料"},{"wxSalePrice":15.00,"itemNo":"0000000011","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000011/1-1.png","wxItemName":"恒寿堂蜜炼柚子茶"},{"wxSalePrice":1.00,"itemNo":"000000000012","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/000000000012/1-1.png","wxItemName":"雀巢咖啡"}],"wxClsName":"饮料","wxClsNo":"1"},{"itemList":[{"wxSalePrice":7.00,"itemNo":"6909493200239","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6909493200239/1-1.jpg","wxItemName":"梦龙卡布奇诺"},{"wxSalePrice":4.50,"itemNo":"6923644274719","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6923644274719/1-1.png","wxItemName":"蒂兰圣雪香草巧克力冰淇淋"},{"wxSalePrice":4.50,"itemNo":"6923644275181","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6923644275181/1-1.png","wxItemName":"蒂兰圣雪芒果味冰淇淋"},{"wxSalePrice":6.00,"itemNo":"6907868587686","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6907868587686/5-1.png","wxItemName":"八喜芒果口味冰淇淋"},{"wxSalePrice":6.00,"itemNo":"6907868581488","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6907868581488/3-1.png","wxItemName":"八喜绿茶口味冰淇淋"}],"wxClsName":"冰激凌","wxClsNo":"4"},{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},{"itemList":[{"wxSalePrice":0.01,"itemNo":"100032","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/100032/","wxItemName":"测试商品"}],"wxClsName":"办公用品","wxClsNo":"5"}]},"code":"0"}
var commodityArray = {"message":"查找成功.","data":{"wxList":[
{"itemList":[{"wxSalePrice":4.50,"itemNo":"0000000006","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000006/2-1.png","wxItemName":"康师傅小鸡炖蘑菇面"},{"wxSalePrice":4.50,"itemNo":"0000000005","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000005/1-1.png","wxItemName":"康师傅红烧牛肉面"},{"wxSalePrice":1.00,"itemNo":"0000000010","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000010/1-1.png","wxItemName":"双汇润口玉米风味肠"},{"wxSalePrice":1.50,"itemNo":"00000000009","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/00000000009/1-1.png","wxItemName":"双汇热狗肠"},{"wxSalePrice":1.50,"itemNo":"00000000007","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/00000000007/1-1.png","wxItemName":"双汇王中王"}],"wxClsName":"食品","wxClsNo":"2"},{"itemList":[{"wxSalePrice":3.00,"itemNo":"0000000004","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000004/1-1.png","wxItemName":"可口可乐"},{"wxSalePrice":5.00,"itemNo":"0000000001","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000001/1-1.png","wxItemName":"北冰洋橙汁汽水"},{"wxSalePrice":6.00,"itemNo":"0000000013","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000013/1-1.png","wxItemName":"伊利味可滋香蕉牛奶"},{"wxSalePrice":4.50,"itemNo":"0000000003","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000003/1-1.png","wxItemName":"信远斋桂花酸梅汤"},{"wxSalePrice":5.00,"itemNo":"0000000002","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000002/1-1.png","wxItemName":"统一海之言柠檬味饮料"},{"wxSalePrice":15.00,"itemNo":"0000000011","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/0000000011/1-1.png","wxItemName":"恒寿堂蜜炼柚子茶"},{"wxSalePrice":1.00,"itemNo":"000000000012","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/000000000012/1-1.png","wxItemName":"雀巢咖啡"}],"wxClsName":"饮料","wxClsNo":"1"},{"itemList":[{"wxSalePrice":7.00,"itemNo":"6909493200239","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6909493200239/1-1.jpg","wxItemName":"梦龙卡布奇诺"},{"wxSalePrice":4.50,"itemNo":"6923644274719","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6923644274719/1-1.png","wxItemName":"蒂兰圣雪香草巧克力冰淇淋"},{"wxSalePrice":4.50,"itemNo":"6923644275181","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6923644275181/1-1.png","wxItemName":"蒂兰圣雪芒果味冰淇淋"},{"wxSalePrice":6.00,"itemNo":"6907868587686","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6907868587686/5-1.png","wxItemName":"八喜芒果口味冰淇淋"},{"wxSalePrice":6.00,"itemNo":"6907868581488","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/6907868581488/3-1.png","wxItemName":"八喜绿茶口味冰淇淋"}],"wxClsName":"冰激凌","wxClsNo":"4"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[],"wxClsName":"餐","wxClsNo":"3"},
{"itemList":[{"wxSalePrice":0.01,"itemNo":"100032","picUrls":"http://192.168.2.81:8888/upload/images/bdItemInfo/100032/","wxItemName":"测试商品"}],"wxClsName":"办公用品","wxClsNo":"5"}
]},"code":"0"}

return {
    "pageData" : data,
    "pageList" : pageList,
    "website" : website,
    "commodity" : commodity,
    "commodityImg" : commodityImg,
    "commodityArray" : commodityArray
}
});
