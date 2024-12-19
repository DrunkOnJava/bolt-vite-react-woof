export interface StorageOptions {
  path: string;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface StorageProvider {
  upload(file: File, options: StorageOptions): Promise<string>;
  download(path: string): Promise<Blob>;
  delete(path: string): Promise<void>;
  getUrl(path: string): Promise<string>;
}