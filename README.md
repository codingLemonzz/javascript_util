# javascript_util
## util_drawLine.js
how to use:
    let canvas = document.getElementById("canvas");
		//设置canvas宽度
		canvas.width = 1000;
		//设置canvas高度
		canvas.height = 1000;
		
		//获得canvas内容对象
		let context = canvas.getContext("2d");
		
		//设置内容对象颜色
		context.strokeStyle = "#409EFF";
		
		//设置线宽
		context.lineWidth = 1;
			
	   //调用绘制弧线方法,点必须为例如:{x: 100,y:100}的对象格式
	   drawLine({x:100,y:200},{x:300,y:50},200,context); 
