const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const rows = [];

rl.on('line', line => {
  rows.push(line);
})

rl.once('close', () => {
  const amount = parseInt(rows[0]); //amount of elephants
  const weights = rows[1].split(' ').map((weight) => parseInt(weight)); // weights od elephants
  const minw = Math.min(...weights); //min weight of elephants

  const orig = rows[2].split(' ').map((pos) => parseInt(pos) - 1);// original positions
  const perm = []; //target positions

  rows[3].split(' ').forEach((target, index) => {
    const permIndex = parseInt(target) - 1;
    perm[permIndex] = orig[index];
  })

  let result = 0;
  const vis = [];

  for (let start = 0; start < amount; ++start) {
    if (!vis[start]) {
      let minc = 1000000000; //min weight of the cycle
      let sum = 0; //sum of weights in the cycle
      let cur = start;
      let length = 0; // lenght of cycle

      for (; ;) {
        minc = Math.min(minc, weights[cur]);
        sum += weights[cur];
        cur = perm[cur];
        console.log(perm[cur]);
        vis[cur] = true;
        ++length;
        console.log(perm[cur]);

        if (cur === start) {
          break;
        }
      }
      result += Math.min(sum + (length - 2) * minc, sum + minc + (length + 1) * minw)
    }
  }

  console.log(result);
})