import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertexShader, fragmentShader
let vertexShader = `
attribute vec2 a_position;
attribute float a_size;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = a_size;
}
`
let fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0,  1.0, 0.0, 1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0) // rgba()
gl.clear(gl.COLOR_BUFFER_BIT)

let x = 0
let y = 0
let n = 10000
for (let i = 0; i < n; i++) {
    let r = i / 1000
    x = r * Math.cos(i)
    y = r * Math.sin(i)

    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttrib2f(a_position, x, y)

    let a_size = gl.getAttribLocation(gl.program, 'a_size')
    gl.vertexAttrib1f(a_size, r * 5)

    // 画一个点
    gl.drawArrays(gl.POINTS, 0, 1)

}

