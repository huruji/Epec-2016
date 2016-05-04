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
var facus=$("facus");
var buttons=facus.getElementsByTagName("span");
var sliderCon=$("slider-container");
var widthDiv=$("ISL_Cont");
var moveWidth=parseInt(getStyle(widthDiv,"width"));
var index=0;
var timer;
var donghua=true;
sliderCon.style.height=0.42553191*moveWidth+"px";
widthDiv.style.height=0.42553191*moveWidth+"px";
sliderCon.style.left=0;

sliderCon.innerHTML+=sliderCon.innerHTML;
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



function play(){
	window.onresize=function(){
	moveWidth=parseInt(getStyle(widthDiv,"width"));
	sliderCon.style.height=0.42553191*moveWidth+"px";
	widthDiv.style.height=0.42553191*moveWidth+"px";
	sliderCon.style.left=i*moveWidth+"px";
}
	timer=setTimeout(function(){
		var currentLeft=parseInt(getStyle(sliderCon,"left"));
		if(donghua){
			if(currentLeft<(-5*moveWidth)){
				sliderCon.style.left=0;
/*			index=0;*/
			}else{
		  		index+=1;
		  		startmove(-index*moveWidth);
			}
        	showBut();
        }
        	play();
	}, 10000)
}
play();

function showBut(){
        if(index>5){
            index=0;
        }
        for(var i=0;i<buttons.length;i++){
        	buttons[i].style.background="#ccc";
        }
        buttons[index].style.background="blue";
}

for(var i=0;i<buttons.length;i++){
    buttons[i].index=i;
    buttons[i].onclick=function(){
        index=this.index;
        startmove(-(this.index)*moveWidth)
        showBut();
        }
}
