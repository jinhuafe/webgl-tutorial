let vertexShader = /*glsl*/ `
attribute vec3 a_position;
uniform mat4 u_rotateMatrix;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
   v_color = a_color;
   gl_Position = u_rotateMatrix *  vec4(a_position, 1.0);
}
`

export default vertexShader