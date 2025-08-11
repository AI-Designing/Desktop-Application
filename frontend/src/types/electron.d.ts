// Type definitions for our Electron API

interface ProgressData {
  status: string;
  progress?: number;
  eta?: string;
  timestamp: string;
}

export interface ElectronAPI {
  runCommand: (command: string) => Promise<{
    success: boolean;
    message?: string;
    error?: string;
    timestamp: string;
  }>;
  exportFile: (format: string) => Promise<{
    success: boolean;
    filePath?: string;
    error?: string;
    timestamp: string;
  }>;
  platform: string;
  onProgressUpdate: (callback: (data: ProgressData) => void) => void;
  removeProgressListener: () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
