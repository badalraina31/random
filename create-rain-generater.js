// instantiate RNG.  Heuristically collect entropy from various sources when a
// cryptographic PRNG isn't available.

import RainRandomGenerator from "./rain-random-generator";

// client sources
const height = (typeof window !== 'undefined' && window.innerHeight) ||
      (typeof document !== 'undefined'
       && document.documentElement
       && document.documentElement.clientHeight) ||
      (typeof document !== 'undefined'
       && document.body
       && document.body.clientHeight) ||
      1;

const width = (typeof window !== 'undefined' && window.innerWidth) ||
      (typeof document !== 'undefined'
       && document.documentElement
       && document.documentElement.clientWidth) ||
      (typeof document !== 'undefined'
       && document.body
       && document.body.clientWidth) ||
      1;

const agent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';

export default function createRainGenerator() {
    return new RainRandomGenerator({
        seeds: [
            new Date,
            height,
            width,
            agent,
            Math.random(),
        ],
    });
}