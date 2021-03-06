import Logger from '@p4rm/logger-utils';

export function getLoggerInstance(className: string): Logger {
  return Logger.createLogger({ label: `ODM :: ${className}` });
}

export function isIsoDate(str: string): boolean {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d.toISOString() === str;
}
