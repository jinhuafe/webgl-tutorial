import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertex shader
let vertexShader = `
attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// fragment shader
let fragmentShader = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 清空画布
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

let vertices = [
    -0.5, 0.0,
    0.5, 0.0,
    0.0, 0.8
]
vertices = new Float32Array(vertices)

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
    a_position,
    2,
    gl.FLOAT,
    false,
    0,
    0
)
// 5:确认把带有数据的buffer赋值给attribute
gl.enableVertexAttribArray(a_position)

gl.drawArrays(gl.TRIANGLES, 0, 3)