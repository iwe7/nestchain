import { create } from 'domain';
const d = create();

const emit = (type: any, data: any) => process.emit(type, data);

d.on('error', err => {
  emit('cleanup', err);
});

d.run(() => {
  // todo
});

process.on('uncaughtException', err => {
  emit('cleanup', err);
});

process.on('unhandledRejection', err => {
  emit('cleanup', err);
});

process.on('unhandledRejection', err => {
  emit('cleanup', err);
});
