/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-19 11:02:32
 * @version V1.0.0
 */
 //获取id的元素函数
function $(id){
	return document.getElementById(id);
}
//获取元素属性的函数
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele)[attr];
	}
}
var sliderCon=$("slider-container");
var widthDiv=$("ISL_Cont");
var moveWidth=parseInt(getStyle(widthDiv,"width"));
/*function autoMove(ele){
	clearInterval(intervalID)
}*/
/*timer=setInterval(function(){
	var cur=parseInt(getStyle(sliderCon,"left"));
	if((cur%moveWidth==0)&&(cur!=0)){
		clearInterval(timer);
	}else{
		sliderCon.style.left=cur-10+"px";
	}
}, 30);*/
function autoMove(){
	var target=moveWidth;
	/*var i=1;*/
	var i=1;
	for(var i=1;i<6;i++){
	/*startmove(sliderCon,{left:-target},7*//*,function(){
		setTimeout(function(){startmove(sliderCon,{left:-2*target},7)}, 3000)
		
	}*/
	/*if(parseInt(getStyle(sliderCon,"left"))==target){
		alert(parseInt(getStyle(sliderCon,"left"))==target);*/
	/*i++;*/
	setTimeout(function(){startmove(sliderCon,{left:-i*target},7)}, 3000);
}
}
autoMove();
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
        return ele.timer;
}