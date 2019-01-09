export abstract class Multicodec {
  abstract addPrefix(): any;
  abstract rmPrefix(): any;
  abstract getCodec(): any;
  abstract getCodeVarint(): any;
}
