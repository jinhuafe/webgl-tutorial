let vertexShader = /*glsl*/ `
attribute vec3 a_position;
uniform mat4 u_rotateMatrix;
uniform mat4 u_translateMatrix;
uniform mat4 u_scaleMatrix;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
   mat4 modelMatrix = u_rotateMatrix  * u_translateMatrix * u_scaleMatrix;
   v_color = a_color;
   gl_Position = modelMatrix *  vec4(a_position, 1.0);
}
`

export default vertexShader