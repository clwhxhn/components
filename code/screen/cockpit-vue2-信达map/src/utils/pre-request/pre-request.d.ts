export interface CacheItem {
  status: 'pending' | 'fulfilled' | 'rejected';
  callbacks: { resolve: Function; reject: Function; }[];
  result: any;
}

export interface CacheMap {
  [key: string]: CacheItem;
}

