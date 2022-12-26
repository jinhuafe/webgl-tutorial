let fragmentShader = /*glsl*/ `
precision mediump float;

// 计算两个点的距离
float getDiatance(vec2 p1, vec2 p2) {
    return pow( pow(p1.x - p2.x, 2.0) + pow(p1.y - p2.y, 2.0) ,0.5);
}

void main() {
    float x = (gl_FragCoord.x / 400.0 - 0.5) * 2.0;
    float y = (gl_FragCoord.y / 400.0 - 0.5) * 2.0;

    vec3 color1 = vec3(1.0, 1.0, 1.0);
    vec3 color2 = vec3(0.0, 0.0, 1.0);

    float dis = distance(vec2(x, y), vec2(0.0, 0.0));

    if(dis > 0.4) {
        gl_FragColor = vec4(color1 - color2, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }

}
`

export default fragmentShader

/**
 * glsl es
 * 区分大小写， 以分号结尾，注释，
 * 
 * 数据类型（简单）
 * 数字 int, float，布尔bool true, false
 * 1 = 1.0
 * 类型转换： int, float, bool
 * float(int), float(bool)
 * int(float), init(bool)
 * bool(int), bool(float)
 * 
 * 变量
 * 变量名，变量的声明: 数据类型 变量名 值；
 * 
 * 计算
 * + - * / 前后的类型一致
 * ++ -- += -= *= /=
 * 
 * 数据类型(复杂)
 * (1)向量Vector, vec2, vec3, vec4
 * vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
 * color.x, color.y, color.z， color.w
 * color.r, color.g, color.b， color.a
 * color.s, color.t, color.p, color.q
 * 
 * (2)矩阵Matrix，mat2, mat3, mat4
 * mat4 translateMatirx = mat4(
 * 1.0, 0.0, 0.0, 0.0,
 * 0.0, 1.0, 0.0, 0.0,
 * 0.0, 0.0, 1.0, 0.0,
 * 0.5, 0.0, 0.0, 1.0,
 * )
 * 
 * 循环，条件
 * 
 * 函数
 * 自定义函数，内置的函数
 */







