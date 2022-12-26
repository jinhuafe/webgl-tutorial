let vertexShader =/*glsl*/ `
attribute vec3 a_position;

void main() {
     mat4 translateMatirx = mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.6, 0.0, 0.0, 1.0
     );
     mat4 scaleMatirx = mat4(
        0.5, 0.0, 0.0, 0.0,
        0.0, 0.5, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
     );
     float deg = radians(45.0);
     mat4 rotateMatrix = mat4(
        cos(deg), sin(deg), 0.0, 0.0,
        -sin(deg), cos(deg), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
     );
    
    gl_Position = rotateMatrix * vec4(a_position, 1.0);
}
`
export default vertexShader
