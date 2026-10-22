export type Block = {
  id: string;
  title: string;
  width: number;
  height: number;
  columns?: 1 | 2;
};

export const blocks: readonly Block[] = [];

export type BlockId = Block["id"];
