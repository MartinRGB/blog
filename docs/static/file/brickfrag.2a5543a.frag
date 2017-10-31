#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
#define BrickColor vec3(1.,0.3,0.2)
#define MortarColor vec3(0.8)
#define BrickSize vec2(0.15,0.075)
#define BrickPct vec2 (0.9,0.85)

void main() {
    vec3 color;
    vec2 position,useBrick;
    vec2 MCposition = gl_FragCoord.xy/u_resolution.xy;
    // 获取每一行的行号和砖块号
    position = MCposition/BrickSize;
    // 根据错行条件，分别处理奇偶数行
    if(floor(mod(position.y,2.)) > 0.){
        position.x += 0.5 + fract(u_time);
    }
    else{
        position.x -= 0.5 + fract(u_time);
    }
    // 获取 0 - 1 不间断的脉冲信号
    position = fract(position);
    // 参考下面图表
    useBrick = step(position,BrickPct);
    color = mix(MortarColor,BrickColor,useBrick.x * useBrick.y);
    color *= 1.5;
    gl_FragColor =  vec4(color,1.0);
 
}