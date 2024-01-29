export function repeat(n, val = undefined) {
  const arr = new Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = val;
  }

  return arr;
}
