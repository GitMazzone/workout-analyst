'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UploadedFile {
	id: string;
	name: string;
	size: number;
	type: string;
	uploadedAt: string;
	url?: string;
}

interface FileStore {
	files: UploadedFile[];
	latestFile: UploadedFile | null;
	addFile: (file: UploadedFile) => void;
	removeFile: (id: string) => void;
	clearFiles: () => void;
}

export const useFileStore = create<FileStore>()(
	persist(
		(set) => ({
			files: [],
			latestFile: null,
			addFile: (file) =>
				set((state) => ({
					files: [file, ...state.files],
					latestFile: file,
				})),
			removeFile: (id) =>
				set((state) => ({
					files: state.files.filter((file) => file.id !== id),
					latestFile: state.latestFile?.id === id ? null : state.latestFile,
				})),
			clearFiles: () => set({ files: [], latestFile: null }),
		}),
		{
			name: 'file-storage',
		}
	)
);
