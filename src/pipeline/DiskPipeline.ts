import RNFS from 'react-native-fs';

export class DiskPipeline {
  private static folder = `${RNFS.CachesDirectoryPath}/spiral-image`;

  /**
   * Ensure cache folder exists
   */
  private static async ensureFolder() {
    const exists = await RNFS.exists(this.folder);

    if (!exists) {
      await RNFS.mkdir(this.folder);
    }
  }

  /**
   * Generate cache file path
   */
  static getPath(key: string): string {
    const filename = encodeURIComponent(key);

    return `${this.folder}/${filename}`;
  }

  /**
   * Check disk cache exists
   */
  static async has(key: string): Promise<boolean> {
    const path = this.getPath(key);

    return RNFS.exists(path);
  }

  /**
   * Get cached file
   */
  static async get(key: string): Promise<string | undefined> {
    const exists = await this.has(key);

    if (!exists) {
      return undefined;
    }

    return this.getPath(key);
  }

  /**
   * Save cache file
   */
  static async save(key: string, sourcePath: string): Promise<string> {
    await this.ensureFolder();

    const target = this.getPath(key);

    await RNFS.copyFile(sourcePath, target);

    return target;
  }

  /**
   * Delete cache
   */
  static async remove(key: string): Promise<boolean> {
    const path = this.getPath(key);

    const exists = await RNFS.exists(path);

    if (!exists) {
      return false;
    }

    await RNFS.unlink(path);

    return true;
  }

  /**
   * Clear all disk cache
   */
  static async clear(): Promise<void> {
    const exists = await RNFS.exists(this.folder);

    if (exists) {
      await RNFS.unlink(this.folder);
    }
  }
}
