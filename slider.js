/**
 * 
 * @authors 谢志强(you@example.org)
 * @date    2016-01-26 16:44:08
 * @version $Id$
 */
/*创建DOM树*/
  var slider_box=document.getElementsByClassName("slider_container")[0];
  var slider_ul=document.createElement("ul");
  slider_ul.id="ul1";
  slider_box.appendChild(slider_ul);
  for(i=0;i<2;i++){
    var div_span=document.createElement("span");
    slider_box.appendChild(div_span);
  }
  var slider_img=[
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  ]
  var breakPoint={
    width:[320,480,768,960,1920],
    height:[300,300,500,600,700]
  };
  for(i=0;i<slider_img.length;i++){
    var ul_li=document.createElement("li");
    var li_img=document.createElement("img");
    slider_ul.appendChild(ul_li);
    ul_li.appendChild(li_img);
    ul_li.style.cssText="width:100%;height:100%;overflow:hidden;position:absolute;";
    li_img.src=slider_img[i];//为使代码简洁，同时在此设置好图片路径
  }

  /*为DOM树的元素设置相关属性*/
  var ospan=document.getElementsByTagName("span");
  var oli=document.getElementsByTagName("li");
  ospan[0].id="left";
  ospan[1].id="right";
  oli[0].className="imgon";
  oli[0].id="img1";

  /*为各种不同大小屏幕设置不同高度（简单的响应式）*/
  function imgHeight(){
  var webWidth=document.body.clientWidth;
  for(var i=0;i<breakPoint.width.length;i++){
    if(breakPoint.width[i]<webWidth){
      slider_box.style.height=breakPoint.height[i]+"px";
    }
  }
}
  imgHeight();
  window.addEventListener("resize", imgHeight,false);

  /*为相关标签设置相关样式*/
  slider_box.style.position="relative";
  slider_ul.style.width="100%";
  slider_ul.style.height="100%";
  slider_ul.style.overflow="hidden";
  slider_ul.style.position="relative";
  ospan[0].style.cssText="width:6%;height:100%;position:absolute;background:url(images/left.png) center no-repeat;z-index:10;left:0;top:0;cursor:pointer;";
  ospan[1].style.cssText="width:6%;height:100%;position:absolute;background:url(images/right.png) center no-repeat;z-index:10;right:0;top:0;cursor:pointer;";


/*函数开始*/
		var imgArry=document.getElementById("ul1").getElementsByTagName("li");
    var switchLeft=document.getElementById("left");
    var switchRight=document.getElementById("right");

    for(var j=1;j<imgArry.length;j++){
      imgArry[j].style.opacity=0;
    }
		var i=0;

    /*自动更换图片函数的定时器*/
        var autochange=setInterval(function(){
        	if(i<imgArry.length-1){
        		i++;
        	}
        	else{
        		i=0
        	}
        	change(i);},5000)

    /*自动更换图片函数*/
       function change(num){
       	var imgArry=document.getElementById("ul1").getElementsByTagName("li");
       	var changing=document.getElementsByClassName("imgon")[0];
          fadeOut(changing);
          changing.className="";
          imgArry[num].className="imgon";
          fadein(imgArry[num]);
       }

      /*左箭头的点击事件函数*/
       switchLeft.addEventListener("click",pre,false)
       function pre(){
          var changing=document.getElementsByClassName("imgon")[0];
          var pre=changing.previousSibling;
          if(changing.id=="img1"){
            fadeOut(changing);
            changing.className="";
            imgArry[imgArry.length-1].className="imgon";
            fadein(imgArry[imgArry.length-1]);
            return i=-1
          }else{
          fadeOut(changing);
          changing.className="";
          pre.className="imgon";
          fadein(pre);
          return i--;}
        }
       
    /*淡入函数*/
function fadein(ele){ 
    setOpacity(ele,0); 
    for(var i = 0;i<=20;i++){ 
      (function(){ 
        var level = i * 5;  
        setTimeout(function(){ 
          setOpacity(ele, level)
        },i*100); 
      })();   
    }
  }

  function setOpacity(ele,level){ 
    if(ele.filters){ 
      ele.style.filter = "alpha(opacity="+level+")";
    }else{ 
      ele.style.opacity = level / 100;
    }
  }

/*淡出函数*/
function fadeOut(ele){ 
    for(var i = 0;i<=20;i++){ 
      (function(){ 
        var level = 100 - i * 5; 
        setTimeout(function(){ 
          setOpacity(ele, level)
        },i*25); 
      })(i);     
    }
  }
