import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

let vertexShader = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = vec4(a_position, 1.0);
    gl_PointSize = 10.0;
}
`

let fragmentShader = `
precision mediump float;
uniform float u_w;
uniform float u_h;

varying vec3 v_color;
// gl_FragCoord: canvas画布的坐标（100， 100）
void main() {
    gl_FragColor = vec4(gl_FragCoord.x / u_w, gl_FragCoord.y / u_h, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

let canvas_w = 400, canvas_h = 400
let u_w = gl.getUniformLocation(gl.program, 'u_w')
let u_h = gl.getUniformLocation(gl.program, 'u_h')
gl.uniform1f(u_w, canvas_w)
gl.uniform1f(u_h, canvas_h)

initVertexBuffers(gl)
function initVertexBuffers(gl) {
    // 4个点的坐标信息和颜色信息
    // vertex = position + color
    let vertices = new Float32Array([
        -0.5, 0.5, 0.0, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0, 1.0, 1.0,
    ])
    
    // 4个点的坐标信息
//        let positions = new Float32Array([
 //       -0.5, 0.5, 0.0, 
   //     -0.5, -0.5, 0.0, 
     //   0.5, -0.5, 0.0, 
      //  0.5, 0.5, 0.0, 
//    ])


    // 4个点的颜色信息
    // let colors = new Float32Array([
    //     1.0, 0.0, 0.0,
    //     0.0, 1.0, 0.0,
    //     0.0, 0.0, 1.0,
    //     1.0, 1.0, 1.0,
    // ])
    let FSIZE = vertices.BYTES_PER_ELEMENT // Float32 Size = 4

    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 6, 0)
    gl.enableVertexAttribArray(a_position)

    // let colorsBuffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
    // gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
    let a_color = gl.getAttribLocation(gl.program, 'a_color')
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
    gl.enableVertexAttribArray(a_color)
}

draw(gl)

function draw(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    gl.drawArrays(gl.POINTS, 0, 4)
}


