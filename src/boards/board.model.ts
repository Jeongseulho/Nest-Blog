import { ValueOf } from 'src/utils/model';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: ValueOf<typeof BoardStatus>;
}

export const BoardStatus = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;
