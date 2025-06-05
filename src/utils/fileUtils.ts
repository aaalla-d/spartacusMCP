import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from './logger.js';

export class FileUtils {
  /**
   * Ensure a directory exists, creating it if necessary
   */
  static async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      logger.debug(`Created directory: ${dirPath}`);
    }
  }

  /**
   * Check if a file exists
   */
  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read file content as string
   */
  static async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf-8');
  }

  /**
   * Write content to file
   */
  static async writeFile(filePath: string, content: string): Promise<void> {
    await this.ensureDirectory(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf-8');
    logger.debug(`Written file: ${filePath}`);
  }

  /**
   * Copy file from source to destination
   */
  static async copyFile(sourcePath: string, destPath: string): Promise<void> {
    await this.ensureDirectory(path.dirname(destPath));
    await fs.copyFile(sourcePath, destPath);
    logger.debug(`Copied file: ${sourcePath} -> ${destPath}`);
  }

  /**
   * Get all files in directory recursively
   */
  static async getFilesRecursively(dirPath: string, extensions?: string[]): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...await this.getFilesRecursively(fullPath, extensions));
        } else if (entry.isFile()) {
          if (!extensions || extensions.some(ext => fullPath.endsWith(ext))) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      logger.warn(`Could not read directory ${dirPath}:`, error);
    }
    
    return files;
  }

  /**
   * Delete file or directory
   */
  static async delete(targetPath: string): Promise<void> {
    try {
      const stats = await fs.stat(targetPath);
      if (stats.isDirectory()) {
        await fs.rmdir(targetPath, { recursive: true });
      } else {
        await fs.unlink(targetPath);
      }
      logger.debug(`Deleted: ${targetPath}`);
    } catch (error) {
      logger.warn(`Could not delete ${targetPath}:`, error);
    }
  }

  /**
   * Get file extension
   */
  static getExtension(filePath: string): string {
    return path.extname(filePath).toLowerCase();
  }

  /**
   * Get file name without extension
   */
  static getBaseName(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }

  /**
   * Normalize path separators
   */
  static normalizePath(filePath: string): string {
    return path.normalize(filePath).replace(/\\/g, '/');
  }

  /**
   * Join paths safely
   */
  static joinPath(...paths: string[]): string {
    return this.normalizePath(path.join(...paths));
  }

  /**
   * Get relative path between two paths
   */
  static getRelativePath(from: string, to: string): string {
    return this.normalizePath(path.relative(from, to));
  }
} 