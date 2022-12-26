import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertex shader
let vertexShader = `
attribute vec2 a_position;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`

// fragment shader
let fragmentShader = `
precision mediump float;
varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 清空画布
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

let vertices = [
    // x    y      r    g   b
    -0.5, 0.0, 1.0, 0.0, 0.0,  // 第一个点的信息
    0.5, 0.0, 0.0, 1.0, 0.0,   // 第二个点的信息
    0.0, 0.8, 0.0, 0.0, 1.0,   // 第三个点的信息
]
vertices = new Float32Array(vertices)
let FSIZE = vertices.BYTES_PER_ELEMENT
// console.log(FSIZE)

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
let a_color = gl.getAttribLocation(gl.program, 'a_color')
gl.vertexAttribPointer(
    a_position,  //location: vertex Shader里面attribute变量的location
    2,           //size: attribute变量的长度（vec2)
    gl.FLOAT,    //type: buffer里面数据的类型
    false,       //normalized: 正交化，true，false, [1, 2] => [1/根号5， 2/根号5]
    5 * FSIZE,   //stride：每个点的信息所占的BYTES
    0            //offset: 每个点的信息，从第几个BYTES开始数
)
gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * FSIZE,
    2 * FSIZE
)
// 5:确认把带有数据的buffer赋值给attribute
gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)

// 画图
// gl.drawArrays(画什么图形， 从哪个点还是， 一共画几个点)
let n = 3

/**
 * WebGL中的基本形状： 点、线、三角形
 *  */
gl.drawArrays(gl.POINTS, 0, n)

gl.drawArrays(gl.LINES, 1, n)

gl.drawArrays(gl.TRIANGLES, 0, 3)
