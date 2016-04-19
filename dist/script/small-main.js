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