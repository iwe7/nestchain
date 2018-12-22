export class PeerUpdateError extends Error {
  constructor(public code: number, msg: string, public description: string) {
    super(msg);
  }
  toString() {
    return JSON.stringify({
      code: this.code,
      message: this.message,
      description: this.description,
    });
  }
}
