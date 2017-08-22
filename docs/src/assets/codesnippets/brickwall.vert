...
 
uniform vec3 lightPosition;
varying float LightIntensity;
varying vec2 MCposition;

void main() {
 
    // 从 Attribute 中获取 varying 
    vNormal = normal;
    vUv = uv;
    vUv2 = uv2;
    vPosition = position;
 
    // ecPosition - 存储传入顶点的眼睛坐标位置
    vec3 ecPosition = vec3(modelViewMatrix * vec4(position,1.0)).xyz;
    // tnorm - 归一化处理表面的法向量
    vec3 tnorm = normalize(normalMatrix * normal);
    // lightVec - 眼睛坐标中 物体上的的点 到光源的位置
    vec3 lightVec = normalize(lightPosition - ecPosition);
    // reflectVec - 反射矢量
    vec3 reflectVec = reflect(-lightVec,tnorm);
    // viewVec - 查看方向的单位矢量
    vec3 viewVec = normalize(-ecPosition);
    float spec = 0.0;
    // 因为 lightVec 和 tnorm 之前被normalize归一化处理
    // 所以 dot(lightVec,tnorm) 等价于 cos(lightVec,tnorm)，得出漫反射系数
    float diffuse = max(0.0,dot(lightVec,tnorm));
    // 小于90度
    if(diffuse > 0.0)
    {
        // 反射系数 - 计算反射矢量和视野方向角度
        spec = max(0.0,dot(reflectVec,viewVec));
        spec = pow(spec,16.0);
    }
    LightIntensity = 1.0 * diffuse + 0.7 * spec;
    MCposition = uv.xy;
 
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
 
}