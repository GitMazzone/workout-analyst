'use client';

import { useFileStore } from '@/lib/store/file-store';
import { Card } from '@/components/ui/card';
import { FileIcon, Trash2Icon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function UploadedFiles() {
	const { files, removeFile, latestFile } = useFileStore();

	if (files.length === 0) {
		return null;
	}

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-semibold'>Uploaded Files</h2>
			<p>Latest file: {latestFile?.name ?? 'None'}</p>
			<div className='grid gap-4'>
				{files.map((file) => (
					<Card key={file.id} className='p-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-4'>
								<FileIcon className='h-6 w-6 text-muted-foreground' />
								<div>
									<p className='font-medium'>{file.name}</p>
									<p className='text-sm text-muted-foreground'>
										{formatDistanceToNow(new Date(file.uploadedAt), {
											addSuffix: true,
										})}
									</p>
								</div>
							</div>
							<button
								onClick={() => removeFile(file.id)}
								className='p-2 hover:bg-destructive/10 rounded-full transition-colors'
								aria-label='Remove file'
							>
								<Trash2Icon className='h-4 w-4 text-destructive' />
							</button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
