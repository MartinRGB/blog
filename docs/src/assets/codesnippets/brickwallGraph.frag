//u_time | u_resolution | u_mouse | noise(float) | noise(vec2(x,y))
//You can try these uniforms
//y = floor(x);
//y = mod(x,1.5);
y = step(fract(x),0.9);