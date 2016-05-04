/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-12 18:27:05
 * @version $Id$
 */
 var gj_AccountProtect={
	gjExplorer:typeof chrome ==="undefined" ? sogouExplorer : chrome,
	baseInfo:{referer:"",url:"",qq:"",isIframe:false, frameurl:"", gjguid:"",qqguid:"",
		text:{x:0,y:0,w:0,h:0},
		pwd:{x:0,y:0,w:0,h:0},
		sid:"",
		TipsType:""
	},
	init:function(){
		this.baseInfo.referer= document.referrer;
		this.baseInfo.url= location.href;
		this.baseInfo.isIframe= window.top.location!= window.document.location;
		window.addEventListener('DOMContentLoaded',function(){
			document.body.addEventListener('click',gj_AccountProtect.bindTEXT);
		});
	},
	_bingTEXT:function(){
		gj_AccountProtect.baseInfo.qq=this.value;
		var rect=this.getBoundingClientRect();
		x=rect.left;
		y=rect.top;
		gj_AccountProtect.baseInfo.text.h=rect.bottom-y;
		gj_AccountProtect.baseInfo.text.w=rect.right-x;
		gj_AccountProtect.baseInfo.text.y=y + ( document.documentElement.scrollTop || document.body.scrollTop || 0 );;
		gj_AccountProtect.baseInfo.text.x=x + ( document.documentElement.scrollLeft || document.body.scrollLeft || 0 ) ;;
		gj_AccountProtect.bindPWD();
	},
	bindTEXT:function(){
		var inputs=document.querySelectorAll("input");
		for(var i=0;i<inputs.length;i++){
			if(inputs[i].getAttribute("type")!="password")
			{
				inputs[i].addEventListener('blur',gj_AccountProtect._bingTEXT);
			}
		}
	},
	_bindPWD:function(){
		var rect=this.getBoundingClientRect();
		x=rect.left;
		y=rect.top;
		gj_AccountProtect.baseInfo.pwd.h=rect.bottom-y;
		gj_AccountProtect.baseInfo.pwd.w=rect.right-x;
		gj_AccountProtect.baseInfo.pwd.y= y + (document.documentElement.scrollTop || document.body.scrollTop || 0 );
		gj_AccountProtect.baseInfo.pwd.x= x + (document.documentElement.scrollLeft || document.body.scrollLeft || 0 );;
		gj_AccountProtect.getTIPS();
	},
	bindPWD:function(){
		var pwds=document.querySelectorAll("input[type=password]");
		for(var i=0;i<pwds.length;i++){
			pwds[i].addEventListener('focus',gj_AccountProtect._bindPWD);
			pwds[i].addEventListener('change',gj_AccountProtect._bindPWD);
			pwds[i].addEventListener('keyup',gj_AccountProtect._bindPWD);
		}
	},
	getTIPS:function(){
		gj_AccountProtect.baseInfo.referer= document.referrer;
		gj_AccountProtect.baseInfo.url= location.href;
		gj_AccountProtect.baseInfo.isIframe= window.top.location!= window.document.location;
		gj_AccountProtect.baseInfo.frameurl = "";
		gj_AccountProtect.gjExplorer.extension.sendRequest({
						cmd: "query_isTips",
						baseInfo: gj_AccountProtect.baseInfo
					}, function(response){
						gj_AccountProtect.baseInfo.gjguid = response.gjguid;
						gj_AccountProtect.baseInfo.qqguid = response.qqguid;
						if(response.TipsType != 101)
						{
							gj_AccountProtect.show(response.JsVer, response.TipsType, response.PluginVer);
						}
	  });
	},
	show:function(JsVer, TipsType, PluginVer){
				if (document.getElementById("AccountProtect")) {
					return;
				}
				var s= document.createElement("script");
				s.id="AccountProtect" ;
				s.src="http://pc2.gtimg.com/ap/mie.js?sver="+JsVer;
				s.setAttribute("x",gj_AccountProtect.baseInfo.pwd.x);
				s.setAttribute("y",gj_AccountProtect.baseInfo.pwd.y);
				s.setAttribute("h",gj_AccountProtect.baseInfo.pwd.h);
				s.setAttribute("w",gj_AccountProtect.baseInfo.pwd.w);
				s.setAttribute("l",TipsType);
				s.setAttribute("v",PluginVer);
				s.setAttribute("z",0);
				s.setAttribute("qqguid", gj_AccountProtect.baseInfo.qqguid);
				s.setAttribute("gjguid", gj_AccountProtect.baseInfo.gjguid);
				p=document.body.head || document.body;
				p.appendChild(s);
	}
};
gj_AccountProtect.init();


