const _getMetadata = (type: string) => (v: any, key?: string | symbol) => {
  return Reflect.getMetadata(type, v, key);
};
export const getDesignParamTypes = _getMetadata('design:paramtypes');
export const getDesignReturnType = _getMetadata('design:returntype');
export const getDesignType = _getMetadata('design:type');
