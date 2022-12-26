import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertexShader, fragmentShader
let vertexShader = `
attribute vec2 a_position;
uniform float u_size;
varying vec2 v_xx;

void main() {
    v_xx = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = u_size;
}
`
let fragmentShader = `
precision mediump float;
varying vec2 v_xx;

uniform vec3 u_color;
void main() {
    gl_FragColor = vec4(v_xx, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0) // rgba()
gl.clear(gl.COLOR_BUFFER_BIT)

// (1)Attribute (vertexShader): 将js中的数据传给vertexShader
let a_position = gl.getAttribLocation(gl.program, 'a_position')
gl.vertexAttrib2f(a_position, 0.5, 0.5)

// (2)Uniform (vertexShader, fragment):将js中的数据传给vertexShader/fragmentShader
let u_color = gl.getUniformLocation(gl.program, 'u_color')
gl.uniform3f(u_color, 0.0, 1.0, 0.0)

let u_size = gl.getUniformLocation(gl.program, 'u_size')
gl.uniform1f(u_size, 30.0)

// (3) Varying:将vertexShader中的数据传给fragmentShader

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1)
