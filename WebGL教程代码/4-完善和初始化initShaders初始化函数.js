import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// vertexShader, fragmentShader
let vertexShader = `
void main() {
    gl_Position = vec4(0.0, 0.5, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`
let fragmentShader = `
    void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
`
initShaders(gl, vertexShader, fragmentShader)

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0) // rgba()
gl.clear(gl.COLOR_BUFFER_BIT)

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1)