# `ims-decorator`

> 装饰器生成器

```ts
import { makeDecorator } from 'ims-decorator';
export interface Optional {}
export interface OptionalDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  (): Optional;
  new (): Optional;
}
export const OptionalMetadataKey = 'OptionalMetadataKey';
export const Optional: OptionalDecorator = makeDecorator(
  OptionalMetadataKey,
  'visitOptional',
  dir => dir,
);
```

```ts
/*
 * 定义常数
 */
export const NG_COMPONENT_DEF = getClosureSafeProperty({
  ngComponentDef: getClosureSafeProperty,
});
```

```ts
/*
 * 设置函数
 */
export function defineComponent() {}
```

```ts
/*
 * 获取常数
 */
export function getComponentDef() {}
```

```ts
/*
 * 接口
 */
export interface ComponentDef {}
```

```ts
/*
 * 工厂解析
 */
export class ComponentFactoryResolver {
  resolveComponentFactory(): ComponentFactory {}
}
```

```ts
/*
 * 创建工厂
 */
export function createComponentFactory() {}
```

```ts
/*
 * 工厂
 */
export class ComponentFactory {
  public def: ComponentDef;
  static create() {}
}
```

```ts
/*
 * 工厂加工的东西
 */
export class ComponentRef {}
```
s
