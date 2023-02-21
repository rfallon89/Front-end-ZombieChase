export default function avgSpeed(speeds) {
  const sum = speeds.reduce((sum, value) => sum + value);
  return sum / (speeds.length - 1);
}
