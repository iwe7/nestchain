/**
 * 应用设置
 */
export abstract class ApplicationSetting {
  abstract hasKey(key: string): boolean;
  abstract getBoolean(key: string, defaultValue?: boolean): boolean;
  abstract getString(key: string, defaultValue?: string): string;
  abstract getNumber(key: string, defaultValue?: number): number;
  abstract setBoolean(key: string, value: boolean): void;
  abstract setString(key: string, value: string): void;
  abstract setNumber(key: string, value: number): void;
  abstract remove(key: string): void;
  abstract clear(): void;
  abstract flush(): boolean;
  abstract getAllKeys(): Array<string>;
}
