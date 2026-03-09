uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  uv.y += uTime * 0.05;

  vec2 grid = floor(uv * vec2(15.0, 25.0));
  vec2 f = fract(uv * vec2(15.0, 25.0));

  float h = hash(grid);
  float droplet = 0.0;

  if (h > 0.6) {
    float speed = 0.2 + h * 0.4;
    vec2 center = vec2(0.5, fract(h * 17.0 - uTime * speed * 0.2));
    float d = length((f - center) * vec2(1.0, 2.5));
    droplet = smoothstep(0.12, 0.03, d);
  }

  vec3 color = mix(vec3(0.1, 0.12, 0.2), vec3(0.4, 0.6, 0.9), droplet * 0.5);
  float alpha = 0.2 + droplet * 0.4;

  gl_FragColor = vec4(color, alpha);
}
