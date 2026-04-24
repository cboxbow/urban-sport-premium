import { promises as fs } from 'fs';
import path from 'path';
import { ZodSchema } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function readContentFile<T>(fileName: string, schema: ZodSchema<T>, fallback: T): Promise<T> {
  try {
    const fullPath = path.join(CONTENT_DIR, fileName);
    const raw = await fs.readFile(fullPath, 'utf8');
    return schema.parse(JSON.parse(raw));
  } catch {
    return fallback;
  }
}

export async function writeContentFile<T>(fileName: string, schema: ZodSchema<T>, value: T): Promise<T> {
  const parsed = schema.parse(value);
  const fullPath = path.join(CONTENT_DIR, fileName);
  const tempPath = `${fullPath}.tmp`;

  await fs.writeFile(tempPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
  await fs.rename(tempPath, fullPath);

  return parsed;
}

export function contentPath(fileName: string) {
  return path.join(CONTENT_DIR, fileName);
}
