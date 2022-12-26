import initShaders from './initShaders.js'
import { mat4, glMatrix } from './gl_matrix/esm/index.js'

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
// let Sx = 2, Sy = 1, Sz = 1
// let scale_matrix = [
//     Sx, 0, 0, 0,
//     0, Sy, 0, 0,
//     0, 0, Sz, 0,
//     0, 0, 0, 1,
// ]
let scale_matrix = mat4.create()
// mat4.fromScaling(scale_matrix, [0.5, 0.5, 1])

// 平移
// let Tx = 0, Ty = 0, Tz = 0
// let translate_matrix = [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     Tx, Ty, Tz, 1
// ]
let translate_matrix = mat4.create()
mat4.fromTranslation(translate_matrix, [-0.5, 0.5, 0])


// 旋转
// let deg = 0
// let cos = Math.cos(deg / 180 * Math.PI), sin = Math.sin(deg / 180 * Math.PI)
// let rotate_matrix = [
//     cos, sin, 0, 0,
//     -sin, cos, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1,
// ]
let rotate_matrix = mat4.create()

// mat4.fromRotation(rotate_matrix, 10 / 180 * Math.PI, [0, 0, 1])
// mat4.fromXRotation(rotate_matrix, 40 / 180 * Math.PI)
// mat4.fromRRotation(rotate_matrix, 40 / 180 * Math.PI)
// mat4.fromZRotation(rotate_matrix, 40 / 180 * Math.PI)

// 表示10°，转成10弧度
// 10 / 180 * Math.PI
// glMatrix.toRadian(10)

tick()
function tick() {
    mat4.rotate(rotate_matrix, rotate_matrix, glMatrix.toRadian(10), [0, 0, 1])

    let u_matrix = gl.getUniformLocation(gl.program, 'u_matrix')
    gl.uniformMatrix4fv(u_matrix, false, rotate_matrix)

    draw(gl)

    requestAnimationFrame(tick)
}


// 创建一个新的单位矩阵
// let matrix = mat4.create()

// 第一种方式：对原有的（单位）矩阵就行修改
// mat4.fromScaling(matrix, [Sx, Sy, Sz])
// mat4.fromTranslation(matrix, [Tx, Ty, Tz])
// mat4.fromRotation(matrix, deg, [X, Y, Z])

// 第二种方式：修改某个矩阵，生成另外一个新的矩阵
// let matrix1 = mat4.create()
// let matrix2 = mat4.create()

// mat4.scale(matrix2, matrix1, [Sx, Sy, Sz])
// mat4.rotate(matrix2, matrix1, matrix, deg, [X, Y, Z])
// mat4.translate(matrix2, matrix1, [Tx, Ty, Tz])


