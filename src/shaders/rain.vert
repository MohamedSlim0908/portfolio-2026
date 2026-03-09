uniform float uTime;
uniform float uSpeed;
attribute float aOffset;
attribute float aScale;
varying float vAlpha;

void main() {
  vec3 pos = position;
  pos.y = mod(pos.y - uTime * uSpeed + aOffset * 10.0, 8.0) - 4.0;
  vAlpha = smoothstep(-4.0, -2.0, pos.y) * smoothstep(4.0, 2.0, pos.y);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * 120.0 / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
