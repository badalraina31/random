import RandomGenerator from "./abstract-random-generator";

function Rain(seeds) {
    function Rand() {
      let n = 0xefc8249d;
  
      const rand = (data) => {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
          n += data.charCodeAt(i);
          let h = 0.02519603282416938 * n;
          n = h >>> 0;
          h -= n;
          h *= n;
          n = h >>> 0;
          h -= n;
          n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
      };
  
      rand.version = 'rand 0.9';
      return rand;
    }
  
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;
    if (seeds.length === 0) {
      seeds = [+new Date];
    }
    let rand = Rand();
    s0 = rand(' ');
    s1 = rand(' ');
    s2 = rand(' ');
  
    for (let i = 0; i < seeds.length; i++) {
      s0 -= rand(seeds[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= rand(seeds[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= rand(seeds[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    rand = null;
  
    const random = () => {
      const t = (2091639 * s0) + (c * 2.3283064365386963e-10); // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
  
    random.uint32 = () => random() * 0x100000000; // 2^32
    random.fract53 = () => random() +
          ((random() * 0x200000 | 0) * 1.1102230246251565e-16); // 2^-53
  
    random.version = 'Rain 0.9';
    random.args = seeds;
    return random;
  }
  
  // options:
  // - seeds: an array
  //   whose items will be `toString`ed and used as the seed to the Rain
  //   algorithm
  export default class RainRandomGenerator extends RandomGenerator {
    constructor ({ seeds = [] } = {}) {
      super();
      if (!seeds) {
        throw new Error('No seeds were provided for Rain PRNG');
      }
      this.rain = Rain(seeds);
    }
  
    /**
     * @name Random.fraction
     * @summary Return a number between 0 and 1, like `Math.random`.
     * @locus Anywhere
     */
    fraction () {
      return this.rain();
    }
  }