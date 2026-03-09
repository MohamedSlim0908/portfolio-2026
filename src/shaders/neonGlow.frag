uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;
varying vec2 vUv;

void main() {
  float edge = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
  edge *= smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  float glow = (1.0 - edge) * uIntensity;
  glow *= 0.8 + 0.2 * sin(uTime * 2.0);

  gl_FragColor = vec4(uColor * glow, glow);
}
