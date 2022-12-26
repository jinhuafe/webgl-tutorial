import initShaders from './initShaders.js'
import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'
import { mat4 } from './gl_matrix/esm/index.js'
import { positions, colors } from './cube_data.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

// 视图矩阵 ViewMatrix
let viewMatrix = mat4.create()
// lookAt(out, eye, center, up)
let eye = [3, 4, 5]
mat4.lookAt(viewMatrix, eye, [0, 0, 0], [0, 1, 0])
let u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix')
gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)

// 投影矩阵 ProjectionMatrix - 正交投影Orthography
// ortho(out, left, right, bottom, top, near, far) 
// let orthoMatrix = mat4.create()
// mat4.ortho(orthoMatrix, -1, 1, -1, 1, 0, 100)
// let u_projMatrix = gl.getUniformLocation(gl.program, 'u_projMatrix')
// gl.uniformMatrix4fv(u_projMatrix, false, orthoMatrix)

// 透视投影- perspective
// perspective(out, fovy, aspect, near, far)
let perspectiveMatrix = mat4.create()
mat4.perspective(perspectiveMatrix, 50 / 180 * Math.PI, canvas.width / canvas.height, 0.1, 100)
let u_projMatrix = gl.getUniformLocation(gl.program, 'u_projMatrix')
gl.uniformMatrix4fv(u_projMatrix, false, perspectiveMatrix)

function tick() {
    let time = Date.now() * 0.005
    // eye[0] = Math.sin(time)
    eye[1] = Math.sin(time)
    eye[2] = Math.cos(time)

    mat4.lookAt(viewMatrix, eye, [0, 0, 0], [0, 1, 0])
    gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)

    draw(gl)

    requestAnimationFrame(tick)
}
tick()

draw(gl)

function initVertexBuffers(gl) {

    let FSIZE = positions.BYTES_PER_ELEMENT // Float32 Size = 4

    let positionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 0)
    gl.enableVertexAttribArray(a_position)

    let colorsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    let a_color = gl.getAttribLocation(gl.program, 'a_color')
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 0)
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


