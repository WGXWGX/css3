var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 700;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var radius = 8;
const endTime = new Date(2016,10,5,12,0,0);
var curShowTimeSeconds = 0;
var balls = [];
const colors =  ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function(){
	var canvas = document.getElementById('canvas');	
	var context = canvas.getContext('2d');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function(){
            draw( context );
            update();
        },50);
}

function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 )
    return ret >= 0 ? ret : 0;
}
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;
    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
    var curSeconds = curShowTimeSeconds % 60;
    if( nextSeconds != curSeconds ){
    	if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(radius+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(radius+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(radius+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(radius+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(radius+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls(){
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if( balls[i].y >= WINDOW_HEIGHT-radius ){
            balls[i].y = WINDOW_HEIGHT-radius;
            balls[i].vy = - balls[i].vy*0.85;
        }
	}
}
function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(radius+1)+(radius+1),
                    y:y+i*2*(radius+1)+(radius+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall );
            }
}
function draw(context){
	context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;
	drawdigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),context);
	drawdigit(MARGIN_LEFT+15*(radius+1),MARGIN_TOP,parseInt(hours%10),context);
	drawdigit(MARGIN_LEFT+30*(radius+1),MARGIN_TOP,10,context);
	drawdigit(MARGIN_LEFT+39*(radius+1),MARGIN_TOP,parseInt(minutes/10),context);
	drawdigit(MARGIN_LEFT+54*(radius+1),MARGIN_TOP,parseInt(minutes%10),context);
	drawdigit(MARGIN_LEFT+69*(radius+1),MARGIN_TOP,10,context);
	drawdigit(MARGIN_LEFT+78*(radius+1),MARGIN_TOP,parseInt(seconds/10),context);
	drawdigit(MARGIN_LEFT+93*(radius+1),MARGIN_TOP,parseInt(seconds%10),context);
	for( var i = 0 ; i < balls.length ; i ++ ){
        context.fillStyle=balls[i].color;
        context.beginPath();
        context.arc( balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
        context.closePath();
        context.fill();
    }
}
function drawdigit(x,y,num,context){
	context.fillStyle = 'blue';
	for(var i=0; i<digit[num].length; i++)
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				context.beginPath();
				context.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				context.closePath();
				context.fill();
			}
		}
}
