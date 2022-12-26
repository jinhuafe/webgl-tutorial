let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

let vertexSource = `
void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`

let fragmentSource = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

// Create Shaders
let vertexShader = gl.createShader(gl.VERTEX_SHADER)
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertexShader, vertexSource)
gl.shaderSource(fragmentShader, fragmentSource)

gl.compileShader(vertexShader)
gl.compileShader(fragmentShader)

// Create Program
let program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)
gl.useProgram(program)

// Clear Color
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// Draw
gl.drawArrays(gl.POINTS, 0, 1)






