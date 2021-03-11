// We use cryptographically strong PRNGs (crypto.getRandomBytes())
// When using crypto.getRandomValues(), our primitive is hexString(),
// from which we construct fraction().

import createRandom from "./create-random";
import NodeRandomGenerator from "./node-random-generator";

export const Random = createRandom(new NodeRandomGenerator());