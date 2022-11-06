
var direction_x = 1;
var speed = 1000;
function changeDir_1(){
    
	direction_x *= -1;
}
window.onload = function init () {
    var canvas = document.getElementById( "gl-canvas" );

    var gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // 设置窗口大小
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // 初始化着色器
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // 获取vPosition变量的存储位置
    var vPosition = gl.getAttribLocation(program, "vPosition");
    // 获取u_transMat变量的存储位置
    var u_transMat = gl.getUniformLocation(program, "u_transMat");
    // 获取u_FragColor变量的存储位置
    var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    //存储绘制中需要用到的四种颜色
    var colors = [
        [1.0, 1.0, 0.0, 1.0], //橙色
    ];

       
        // 创建缓存
        var buffer = gl.createBuffer(); // 为顶点创建的缓存
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 绑定缓冲区s
        gl.enableVertexAttribArray(vPosition);
        
    var ms = 90; // 组成圆的划分三角形个数
    // 画鸡身体（半圆）
    vertices = getCircleVertex(0.2, ms, 360);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.uniform4f(u_FragColor, colors[0][0], colors[0][1], colors[0][2], colors[0][3]);
    
    var x=0;
    var y=0;
    var z=0;
    document.getElementById( "speedcon" ).onchange = function( event ){
        speed = 100 - event.target.value;
    }
    renderSquare_x();
    function renderSquare_x(){
        gl.clear( gl.COLOR_BUFFER_BIT );
        
        // set uniform values
        if(direction_x == 1){
            x-=0.006;
            console.log(x);
        }
        if(direction_x == -1){
            x+=0.006;
            console.log(x);
        }
        
        gl.uniform4f(u_transMat, x, y, z, 0 );
    
        gl.drawArrays(gl.TRIANGLES, 0, ms*3);
        
        // update and render
        setTimeout( function(){ requestAnimFrame( renderSquare_x ); }, speed );
    }
};
// 画圆
// 半径r 面数m 度数c
function getCircleVertex(r, m, c) {
    var arr = [];
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) {
        arr.push(Math.sin(Math.PI / 180 * angle) * r, Math.cos(Math.PI / 180 * angle) * r, 0, 1.0);
        arr.push(0.0, 0.0, 0.0, 1.0);
        angle = angle + addAng;
        arr.push(Math.sin(Math.PI / 180 * angle) * r, Math.cos(Math.PI / 180 * angle) * r, 0, 1.0);
    }
    return arr;
}