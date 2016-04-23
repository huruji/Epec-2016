/**
 * 
 * @authors 谢志强(忽如寄)(594613537@qq.com)
 * @date    2016-04-19 13:22:48
 * @version $Id$
 */

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
var i=1;
sliderCon.style.height=0.42553191*moveWidth+"px";
widthDiv.style.height=0.42553191*moveWidth+"px";
sliderCon.style.left=0;
function startmove(target){
	clearInterval(sliderCon.timer);
	sliderCon.timer=setInterval(function(){
		var currentLeft=parseInt(getStyle(sliderCon,"left"));
		var speed=(target-currentLeft)/7;
		if(speed>0){
			speed=Math.ceil(speed);
		}else{
			speed=Math.floor(speed);
		}
		if(speed==0){
			clearInterval(sliderCon.timer);
		}else{
			sliderCon.style.left=currentLeft+speed+"px";
		}
	}, 50);
}
function move(){
	 var timer=setInterval(function(){
		var currentLeft=parseInt(getStyle(sliderCon,"left"));
		sliderCon.style.left=currentLeft-10+"px";
	}, 1000);
}
setInterval(function(){
	var currentLeft=parseInt(getStyle(sliderCon,"left"));
	window.onresize=function(){
			moveWidth=parseInt(getStyle(widthDiv,"width"));
			/*alert(moveWidth);*/
			sliderCon.style.height=0.42553191*moveWidth+"px";
			widthDiv.style.height=0.42553191*moveWidth+"px";
			sliderCon.style.left=i*moveWidth+"px";
			if(i<6){
				setTimeout(startmove(-i*moveWidth),5000);
				i++;
			}if(i>=6){
				i=0;
			}
		}
	if(currentLeft%moveWidth==0){
			if(i<6){
				setTimeout(startmove(-i*moveWidth),5000);
				i++;
			}if(i>=6){
				i=0;
			}
	}
	return i;
}, 3000)