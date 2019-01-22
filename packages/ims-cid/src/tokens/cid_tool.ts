import { InjectionToken } from 'ims-core';
import { CID, CidCodecType, CidCodecValue } from './cids';
import { MultibaseNames, MultibaseCodes } from './multibase';
import { MultihashesNames, MultihashesValue } from './multihashes';

export interface CidTool {
  base32(cid: CID | Buffer | string): string;
  bases(): { name: MultibaseNames; code: MultibaseCodes }[];
  codecs(): { name: CidCodecType; code: CidCodecValue }[];
  format(cid: CID | Buffer | string, options?: ImsCidToolFormatOptions): string;
  hashes(): { name: MultihashesNames; code: MultihashesValue }[];
}
export const CidTool = new InjectionToken<CidTool>('CidTool');

interface ImsCidToolFormatOptions {
  format?: string;
  base?: MultibaseNames | MultibaseCodes;
  cidVersion?: 0 | 1;
}
