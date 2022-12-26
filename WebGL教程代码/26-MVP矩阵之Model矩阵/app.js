import initShaders from './initShaders.js'
import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'
import { mat4 } from './gl_matrix/esm/index.js'
import { positions, colors } from './cube_data.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

let deg = 45
let rotateMatrix = mat4.create()
mat4.fromRotation(rotateMatrix, deg / 180 * Math.PI, [1, 0.5, 0])

let translateMatrix = mat4.create()
mat4.fromTranslation(translateMatrix, [0.5, 0.0, 0.0])

let scaleMatrix = mat4.create()
mat4.fromScaling(scaleMatrix, [0.5, 0.5, 0.5])

let u_rotateMatrix = gl.getUniformLocation(gl.program, 'u_rotateMatrix')
let u_translateMatrix = gl.getUniformLocation(gl.program, 'u_translateMatrix')
let u_scaleMatrix = gl.getUniformLocation(gl.program, 'u_scaleMatrix')

gl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix)
gl.uniformMatrix4fv(u_translateMatrix, false, translateMatrix)
gl.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix)

draw(gl)




function initVertexBuffers(gl) {
    let FSIZE = positions.BYTES_PER_ELEMENT // Float32 Size = 4

    let positionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 3, 0)
    gl.enableVertexAttribArray(a_position)

    let colorsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    let a_color = gl.getAttribLocation(gl.program, 'a_color')
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 3, 0)
    gl.enableVertexAttribArray(a_color)
}

function draw(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)

    for (let i = 0; i < 24; i += 4) {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4)
    }

}


