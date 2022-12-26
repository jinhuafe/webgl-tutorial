import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertex shader
let vertexShader = `
attribute vec2 a_position;
uniform vec4 u_translate;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0) + u_translate;
    gl_PointSize = 10.0;
}
`
/**
 * 变换：平移translate、旋转rotate、缩放scale
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

let tx = 0, ty = 0
let speed_x = 0.01, speed_y = 0.02

function tick() {
    tx += speed_x
    ty += speed_y
    if (tx > 0.5 || tx < -0.5) speed_x *= -1
    if (ty > 0.5 || ty < -0.5) speed_y *= -1

    let u_translate = gl.getUniformLocation(gl.program, 'u_translate')
    gl.uniform4f(u_translate, tx, ty, 0.0, 0.0)

    draw(gl)

    requestAnimationFrame(tick)
}
tick()