let vertexShader = /*glsl*/ `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;

uniform mat4 u_viewMatrix;
uniform mat4 u_scaleMatrix;

void main() {
   v_color = a_color;

   mat4 modelMatrix = u_scaleMatrix;
   gl_Position = u_viewMatrix * modelMatrix * vec4(a_position, 1.0);
}
`

export default vertexShader