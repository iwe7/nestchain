export function getPlatform(): PlatformRef | null {
  return _platform && !_platform.destroyed ? _platform : null;
}
