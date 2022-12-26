import initShaders from './initShaders.js'
import { mat4, glMatrix } from './gl_matrix/esm/index.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

let vertexShader = `
attribute vec3 a_position;
uniform mat4 u_sMatrix;
uniform mat4 u_tMatrix;
uniform mat4 u_rMatrix;

void main() {
    // mat4 modelMatrix = u_tMatrix;
    // mat4 modelMatrix = u_rMatrix;
    // mat4 modelMatrix = u_rMatrix * u_tMatrix;
    mat4 modelMatrix =  u_tMatrix *  u_rMatrix;
    gl_Position = modelMatrix * vec4(a_position, 1.0);
}
`

let fragmentShader = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

let tMatrix = mat4.create()
let sMatrix = mat4.create()
let rMatrix = mat4.create()

mat4.fromTranslation(tMatrix, [0.5, 0.0, 0.0])
mat4.fromScaling(sMatrix, [2, 1, 1])
mat4.fromRotation(rMatrix, glMatrix.toRadian(90), [0, 0, 1])

let u_rMatrix = gl.getUniformLocation(gl.program, 'u_rMatrix')
let u_sMatrix = gl.getUniformLocation(gl.program, 'u_sMatrix')
let u_tMatrix = gl.getUniformLocation(gl.program, 'u_tMatrix')
gl.uniformMatrix4fv(u_rMatrix, false, rMatrix)
gl.uniformMatrix4fv(u_sMatrix, false, sMatrix)
gl.uniformMatrix4fv(u_tMatrix, false, tMatrix)

draw(gl)

function initVertexBuffers(gl) {
    let vertices = new Float32Array([
        -0.2, -0.2, 0.0,
        0.2, -0.2, 0.0,
        0.0, 0.2, 0.0,
    ])
    let FSIZE = vertices.BYTES_PER_ELEMENT

    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 3 * FSIZE, 0)
    gl.enableVertexAttribArray(a_position)
}

function draw(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
}


