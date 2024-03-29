import { ValueOf } from 'src/utils/model';

export const BoardStatus = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;

export type BoardStatusValue = ValueOf<typeof BoardStatus>;
