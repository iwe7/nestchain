

export class ImsArgv {
  cwd: string;
  constructor(private argv: string[]) {
    this.cwd = process.cwd();
  }
  parse() {}
}

let argv = new ImsArgv(process.argv.slice(2));

debugger;
