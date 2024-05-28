import randomString from './random-string'

interface CreateChallengeResult {
  encoded: Uint8Array;
  plaintext: string;
}

export default function createChallenge(): CreateChallengeResult {
  const plaintext = `${Date.now()}${randomString(32)}`
  return {
    encoded: new TextEncoder().encode(plaintext),
    plaintext,
  }
}
