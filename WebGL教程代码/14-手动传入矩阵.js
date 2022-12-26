import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertex shader
let vertexShader = `
attribute vec2 a_position;
uniform mat4 u_matrix;

void main() {
    gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`
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


// 缩放
let Sx = 1, Sy = 1, Sz = 1
let scale_matrix = [
    Sx, 0, 0, 0,
    0, Sy, 0, 0,
    0, 0, Sz, 0,
    0, 0, 0, 1,
]

// 平移
let Tx = 0, Ty = 0, Tz = 0
let translate_matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    Tx, Ty, Tz, 1
]

// 旋转
let deg = 0
let cos = Math.cos(deg / 180 * Math.PI), sin = Math.sin(deg / 180 * Math.PI)
let rotate_matrix = [
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
]

tick()
function tick() {

    let u_matrix = gl.getUniformLocation(gl.program, 'u_matrix')
    gl.uniformMatrix4fv(u_matrix, false, new Float32Array(translate_matrix))

    draw(gl)

    requestAnimationFrame(tick)
}

/**
 * 变换：平移translate、旋转rotate、缩放scale
 */

// ***** 平移矩阵 ******
// [
//     1, 0, 0, Tx,
//     0, 1, 0, Ty,
//     0, 0, 1, Tz,
//     0, 0, 0, 1,
// ]

// ****** 旋转矩阵 ******
// [
//     cosB, -sinB, 0, 0,
//     sinB, cosB,  0, 0,
//     0,    0,     1, 0,
//     0,    0,     0, 1,
// ]

// ****** 缩放矩阵 ******
// [
//     Sx, 0,  0,  0,
//     0,  Sy, 0,  0,
//     0,  0,  Sz, 0,
//     0,  0,  0,  1,
// ]