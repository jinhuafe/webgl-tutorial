import initShaders from './initShaders.js'
import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'
import { mat4 } from './gl_matrix/esm/index.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

let scaleMatrix = mat4.create()
mat4.fromScaling(scaleMatrix, [0.5, 0.5, 0.5])
let u_scaleMatrix = gl.getUniformLocation(gl.program, 'u_scaleMatrix')
gl.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix)

let viewMatrix = mat4.create()
let eye = [0, 0, 1]
let center = [0, 0, 0]
let up = [0, 1, 0]
mat4.lookAt(viewMatrix, eye, center, up)

let u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix')
gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)

draw(gl)

window.onkeydown = function (e) {
    let step = 0.01
    if (e.keyCode === 37) { //左
        eye[0] -= step
    } else if (e.keyCode === 39) { // 右
        eye[0] += step
    } else if (e.keyCode === 38) { // 上
        eye[1] += step
    } else if (e.keyCode === 40) { // 下
        eye[1] -= step
    }
    mat4.lookAt(viewMatrix, eye, center, up)
    gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)
    draw(gl)
}


function initVertexBuffers(gl) {
    let vertices = new Float32Array([
        // x, y, z, r, g, b
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
    ])
    let FSIZE = vertices.BYTES_PER_ELEMENT // Float32 Size = 4

    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 0)
    gl.enableVertexAttribArray(a_position)

    let a_color = gl.getAttribLocation(gl.program, 'a_color')
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
    gl.enableVertexAttribArray(a_color)
}

function draw(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, 3)

}


