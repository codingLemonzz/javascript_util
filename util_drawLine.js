/**
** 给出屏幕坐标系中任意两点坐标，可绘制出从起始点到终止点的圆弧
*
* author: zry
*
* date: 2019/1/11
*
* @param {Object} start_point --起始点坐标，json或object格式，eg: {x:100,y:100}
* @param {Object} end_point  --终止点坐标 ，json或object格式，eg: {x:200,y:200}
* @param Integer radius  --圆弧半径，正整数 ，半径越大，起、终止点的弧度越小
* @param {Object} context -- canvas的内容对象，获取函数为:canvas.getContext("2d");
*/
function drawLine(start_point, end_point, radius, context){
	//起始点与终止点的x、y坐标之和的一半为垂平线的中点
	let half_point = {x:(start_point.x+end_point.x)/2, y:(start_point.y+end_point.y)/2};
	//计算垂平线斜率k
	let k = (start_point.x - end_point.x)/(end_point.y-start_point.y);
	//计算垂平线常量b
	let b = half_point.y - k*half_point.x;
	
	//根据垂平线方程即半径与中点的距离二元一次方程合并得到二元一次方程的a、b、c的值
	let ax_a = 1+k*k;
	let ax_b = 2*k*b - 2*half_point.y*k - 2 *half_point.x;
	let ax_c = Math.pow(b,2)+Math.pow(half_point.y,2)-2*half_point.y*b +Math.pow(half_point.x,2) - Math.pow(radius,2);
	
	//解一元二次方程可得圆心坐标,可得2个x坐标，x坐标的不同决定了弧度的方向,正负号值
	let origin_x = (-(ax_b)-Math.sqrt(ax_b*ax_b - 4*ax_a*ax_c))/(2*ax_a);
	let origin_y = k*origin_x+b;
	                                                                                                      
	let origin = {x:origin_x,y:origin_y};
	
	//起始角度和终止角度即为起始点和终止点与原点连线的二元一次方程的斜率k
	let start_angle = Math.atan((origin.y - start_point.y)/(origin.x - start_point.x)) ;
	let end_angle = Math.atan((origin.y - end_point.y)/(origin.x - end_point.x));
	//控制变量sign
	let sign = 0;
	
	//开始调用执行drawLine方法
	requestAnimationFrame(function(){
		inner_drawLine(origin,radius,start_angle,end_angle,sign,context);
	});
} 

function inner_drawLine(origin,radius,start_angle,end_angle,sign,context){
	//设定绘制方向，如果起始角度大于终止角度，则为逆时针绘制，否则为顺时针绘制 
	let direct = start_angle > end_angle;
	
	//如果起始角度大于终止角度，则每次变换的角度递减至终止角度,若小于，则每次递增,100为速度因子，该值越小，曲线变换速度越快
	let arclength = direct ? start_angle - (sign * (start_angle - end_angle))/100 : start_angle + (sign * (end_angle - start_angle))/100; 
	
	//开始绘制内容
	context.beginPath();
	//设置参数 
	context.arc(origin.x, origin.y, radius, start_angle, arclength,direct);
	//绘制
	context.stroke();
	//如果当前结束角度大于或小于结束角度则继续（根据起始角度和终止角度来判断）
	if( !direct && (arclength < end_angle) || direct && (arclength > end_angle)){
		sign ++;
		requestAnimationFrame(function(){
			inner_drawLine(origin,radius,start_angle,end_angle,sign,context);
		});
	}
}