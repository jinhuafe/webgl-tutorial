let vertexShader = /*glsl*/ `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;
uniform mat4 u_viewMatrix;
uniform mat4 u_projMatrix;

void main() {
   v_color = a_color;

   gl_Position = u_projMatrix *  u_viewMatrix *  vec4(a_position, 1.0);
}
`

export default vertexShader