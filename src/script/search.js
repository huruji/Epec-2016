/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-19 21:05:08
 * @version $Id$
 */
var key = document.getElementById("Keyword");
				      var search = document.getElementById("search");
				      function OnSearchCheckAndSubmit(){
				      var keyword = key.value;
				var postString = '{PE.SiteConfig.ApplicationPath /}search.aspx?searchtype=1&nodeId=2033&ModelId=105&Keyword=' + escape(keyword) +'';
				if (keyword == '' || keyword == null || keyword== 'Keyword') {
				alert("请输入您想搜索的关键词");
				return;      }
				else {
				search.onsubmit = function(){
				this.setAttribute("action",postString);
				}
				}
				}
