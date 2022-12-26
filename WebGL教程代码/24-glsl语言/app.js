import initShaders from './initShaders.js'
import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffers(gl)

draw(gl)

function initVertexBuffers(gl) {
    // 4个点的坐标信息-形状的4个顶点
    let positions = new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
    ])

    let FSIZE = positions.BYTES_PER_ELEMENT // Float32 Size = 4

    let positionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 3, 0)
    gl.enableVertexAttribArray(a_position)
}

function draw(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    gl.drawArrays(gl.POINTS, 0, 4)
}


