import { createServer, connect } from 'net';
let server = createServer(socket => {
  socket.write('hello');
  let i = 0;
  setInterval(() => socket.write(`${++i}`), 1000);
});
server.listen(80, '0.0.0.0');

let socket = connect(
  80,
  '0.0.0.0',
);
socket.on('data', (data: Buffer) => {
  console.log(data.toString());
});
