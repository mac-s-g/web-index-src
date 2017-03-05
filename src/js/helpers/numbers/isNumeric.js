// function isNumeric
// returns true for floats, ints, exponential notation
// returns true for string representation of formats listed above
export default function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && (typeof n != 'object');
}