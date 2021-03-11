import RainRandomGenerator from "./rain-random-generator";
import {createRainGenerator as createRandomGeneratorWithGeneratedSeed} from './create-rain-generater';


export default function createRandom(generator){
    // Create a non-cryptographically secure PRNG with a given seed (using
    // the Rain algorithm)
    generator.createWithSeeds = (...seeds) => {
        if(seeds.length === 0){
            throw new Error('No seeds were provided');
        }
        return new RainRandomGenerator({ seeds });
    }

    // Used like `Random`, but much faster and not cryptographically
    // secure
    generator.insecure = createRandomGeneratorWithGeneratedSeed();

    return generator;
}