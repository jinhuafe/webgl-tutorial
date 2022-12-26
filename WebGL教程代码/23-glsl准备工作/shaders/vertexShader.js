let vertexShader =/*glsl*/ `
attribute vec3 a_position;

void main() {
    gl_Position = vec4(a_position, 1.0);
}
`
export default vertexShader