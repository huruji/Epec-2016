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



/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-17 15:51:41
 * @version $Id$
 */
function $(eleid){
	return document.getElementById(eleid);
}
function getstyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele)[attr];
	}
}
function startmove(ele,json,speed,fn){
        clearInterval(ele.timer);
        ele.timer=setInterval(function(){
        	var btnstop=true;//用以解决多个属性变化不能到达目标值的问题
        	for(attr in json){
        		if(attr=="opacity"){
        		var cur=parseInt(parseFloat(getstyle(ele,attr))*100);
        	}
        	else{
                var cur=parseInt(getstyle(ele,attr));//parseInt将getstyle的东西转换为整数，并将单位忽略
        	}
        	var ispeed=(json[attr]-cur)/speed;
        	if(ispeed>0){
        		ispeed=Math.ceil(ispeed);
        	}else{
        		ispeed=Math.floor(ispeed);//解决当cur大于itarget时的问题
        	}
        		if(attr=="opacity"){
        			ele.style[attr]=(cur+ispeed)/100;
        			ele.style.filter="alpha(opacity:"+cur+ispeed+")";
        		}else{
        			ele.style[attr]=cur+ispeed+"px";
        		}
        		if(cur!=json[attr]){
        		btnstop=false
        	}
        	}

        	if(btnstop){
               clearInterval(ele.timer);
               if(fn){
               	fn();
               }
        	}
        }, 30)
}
/*function addEvent(eve,fn,7){
	if(ele.attachEvent){
		return attachEvent("on"+eve,fn);
	}else{
		return addEventListener(eve, fn,false);
	}
}*/
var searchBtn=$("sm-search-icon");
var searchInput=$("sm-search-input");
var menuBtn=$("sm-menu-icon");
var menuContainer=$("small-menu-container");
var head=$("head-container");
var menuBool=true;
var searchBool=true;
searchBtn.onclick=function(){
	if(searchBool){
		searchInput.style.display="inline-block";
		startmove(searchInput,{width:200,opacity:100},7);
	}else{
		startmove(searchInput,{width:0,opacity:0},7);
	}
	searchBool=!searchBool;
}
menuBtn.onclick=function(){
	var iwid=/\d+/g.exec(getstyle(head,"width"))[0];
	if(searchBool){
		startmove(menuContainer,{width:iwid,height:80},3);
	}
	else{
		startmove(menuContainer,{width:0,height:0},4);
	}
	searchBool=!searchBool;
}
window.onresize=function(){
	var testWid=/\d+/g.exec(getstyle(menuContainer,"width"))[0];
	if(testWid){
		var winWid=getstyle(head,"width");
		menuContainer.style.width=winWid;
	}
}