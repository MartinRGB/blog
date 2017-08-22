...

uniform vec3 BrickColor,MortarColor;
uniform vec2 BrickSize,BrickPct;
uniform sampler2D textureMap;
varying float LightIntensity;
varying vec2 MCposition;

void main() {
    vec3 color;
    vec2 position,useBrick;
    // 获取每一行的行号和砖块号
    position = MCposition/BrickSize;
    // 根据错行条件，分别处理奇偶数行
    if(floor(mod(position.y,2.)) > 0.){
        position.x += 0.5 + fract(time);
    }
    else{
        position.x -= 0.5 + fract(time);
    }
    // 获取 0 - 1 不间断的脉冲信号
    position = fract(position);
    vec4 noiseTex= texture2D(textureMap,position);
    // 参考下面图表
    useBrick = step(position,BrickPct);
    color = mix(MortarColor,BrickColor,useBrick.x * useBrick.y);
    color *= LightIntensity;
    gl_FragColor =  noiseTex*0.6 + vec4(color,1.0);

}