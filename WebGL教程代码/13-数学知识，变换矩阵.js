import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertex shader
let vertexShader = `
attribute vec2 a_position;
uniform float cosB;
uniform float sinB;

void main() {
    float x1 = a_position.x;
    float y1 = a_position.y;
    float z1 = 0.0;

    float x2 = x1*cosB - y1*sinB;
    float y2 = x1*sinB + y1*cosB;
    float z2 = z1;

    gl_Position = vec4(x2, y2, z2, 1.0);
    gl_PointSize = 10.0;
}
`
/**
 * 变换：平移translate、旋转rotate、缩放scale
 */
/**
 * [x1, y1, z1] 为旧坐标
 * [x2, y2, z2] 为（旋转）变换后的新坐标
 * 
 * x2 = x1*cosB - y1*sinB
 * y2 = x1*sinB + y1*cosB
 * z2 = z2
 */

// fragment shader
let fragmentShader = `
precision mediump float;

void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)
function initVertexBuffers(gl) {
    let vertices = [
        //  x,   y
        -0.5, -0.5,
        0.5, -0.5,
        0.0, 0.5,
    ]

    vertices = new Float32Array(vertices)
    let FSIZE = vertices.BYTES_PER_ELEMENT

    /**
     * buffer: 分5个步骤
     */
    // 1
    let buffer = gl.createBuffer()
    // 2
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 3
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 4：把带有数据的buffer赋值给attribute
    let a_position = gl.getAttribLocation(gl.program, 'a_position')

    gl.vertexAttribPointer(
        a_position,  //location: vertex Shader里面attribute变量的location
        2,           //size: attribute变量的长度（vec2)
        gl.FLOAT,    //type: buffer里面数据的类型
        false,       //normalized: 正交化，true，false, [1, 2] => [1/根号5， 2/根号5]
        2 * FSIZE,   //stride：每个点的信息所占的BYTES
        0            //offset: 每个点的信息，从第几个BYTES开始数
    )
    // 5:确认把带有数据的buffer赋值给attribute
    gl.enableVertexAttribArray(a_position)
}

function draw(gl) {
    // 清空画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 画图
    let n = 3
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
}


/**
 * 动画
*/
let deg = 0  //旋转角度

tick()
function tick() {
    deg += 0.5

    let sinB = gl.getUniformLocation(gl.program, 'sinB')
    let cosB = gl.getUniformLocation(gl.program, 'cosB')
    gl.uniform1f(sinB, Math.sin(deg / 180 * Math.PI))
    gl.uniform1f(cosB, Math.cos(deg / 180 * Math.PI))

    draw(gl)

    requestAnimationFrame(tick)
}
