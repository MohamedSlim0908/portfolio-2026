uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float scanline = abs(sin(vUv.y * 100.0 + uTime * 2.0));
  scanline = smoothstep(0.8, 1.0, scanline) * 0.3;

  float shimmer = sin(vUv.x * 20.0 + vUv.y * 20.0 + uTime * 3.0) * 0.5 + 0.5;

  vec3 color = uColor * (0.5 + shimmer * 0.5);
  float alpha = 0.3 + scanline + shimmer * 0.1;

  gl_FragColor = vec4(color, alpha);
}
