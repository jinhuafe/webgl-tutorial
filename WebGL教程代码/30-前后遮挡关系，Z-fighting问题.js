import initShaders from './initShaders.js'
import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'
import { mat4 } from './gl_matrix/esm/index.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

// 视图矩阵 ViewMatrix
let viewMatrix = mat4.create()
// lookAt(out, eye, center, up)
let eye = [0, 0, 1]
mat4.lookAt(viewMatrix, eye, [0, 0, 0], [0, 1, 0])
let u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix')
gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)

// 投影矩阵 ProjectionMatrix - 正交投影Orthography
// ortho(out, left, right, bottom, top, near, far) 
let orthoMatrix = mat4.create()
mat4.ortho(orthoMatrix, -1, 1, -1, 1, 0, 5)
let u_projMatrix = gl.getUniformLocation(gl.program, 'u_projMatrix')
gl.uniformMatrix4fv(u_projMatrix, false, orthoMatrix)

function tick() {
    let time = Date.now() * 0.001
    eye[0] = Math.sin(time)
    eye[2] = Math.cos(time)

    mat4.lookAt(viewMatrix, eye, [0, 0, 0], [0, 1, 0])
    gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix)

    draw(gl)

    requestAnimationFrame(tick)
}
tick()

gl.enable(gl.DEPTH_TEST)
// Z-fighting
gl.enable(gl.POLYGON_OFFSET_FILL)

draw(gl)

function initVertexBuffers(gl) {
    let vertices = new Float32Array([
        // x, y, z, r, g, b 
        -0.8, 0.5, 0.0, 0.0, 0.0, 1.0, // 蓝色的三角形
        0.0, -0.8, 0.0, 0.0, 0.0, 1.0,
        0.8, 0.5, 0.0, 0.0, 0.0, 1.0,

        -0.8, -0.5, -0.0, 1.0, 0.0, 0.0, // 红色的三角形
        0.0, 0.8, -0.0, 1.0, 0.0, 0.0,
        0.8, -0.5, -0.0, 1.0, 0.0, 0.0
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.polygonOffset(0.0, 0.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3) // 蓝色的三角形
    gl.polygonOffset(1.0, 1.0);
    gl.drawArrays(gl.TRIANGLES, 3, 3) // 红色的三角形
}


