'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useFileStore, type UploadedFile } from '@/lib/store/file-store';

export default function FileUpload() {
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [uploadStatus, setUploadStatus] = useState<
		'idle' | 'uploading' | 'success' | 'error'
	>('idle');
	const { toast } = useToast();
	const addFile = useFileStore((state) => state.addFile);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (!file) return;

			setUploadStatus('uploading');

			// Simulate upload progress
			let progress = 0;
			const interval = setInterval(() => {
				progress += 5;
				setUploadProgress(progress);

				if (progress >= 100) {
					clearInterval(interval);
					setUploadStatus('success');

					// Add file to store
					const uploadedFile: UploadedFile = {
						id: crypto.randomUUID(),
						name: file.name,
						size: file.size,
						type: file.type,
						uploadedAt: new Date().toISOString(),
						url: URL.createObjectURL(file), // Create a local URL for the file
					};
					addFile(uploadedFile);

					toast({
						title: 'Upload Complete',
						description: 'Your file has been successfully uploaded and saved.',
						duration: 2500,
					});
				}
			}, 100);

			// Here you would typically handle the actual file upload
			console.log('File to upload:', file);
		},
		[toast, addFile]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
	});

	return (
		<Card className='p-8'>
			<div
				{...getRootProps()}
				className={`
          relative border-2 border-dashed rounded-lg p-12
          transition-colors duration-200 ease-in-out
          ${
						isDragActive
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25'
					}
          ${uploadStatus === 'success' ? 'border-green-500 bg-green-50/50' : ''}
          ${uploadStatus === 'error' ? 'border-red-500 bg-red-50/50' : ''}
        `}
			>
				<input {...getInputProps()} />

				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					{uploadStatus === 'idle' && (
						<>
							<Upload className='h-12 w-12 text-muted-foreground/50' />
							<div>
								<p className='text-lg font-medium'>
									{isDragActive
										? 'Drop your file here'
										: 'Drag & drop your file here'}
								</p>
								<p className='text-sm text-muted-foreground'>
									or click to select a file
								</p>
							</div>
						</>
					)}

					{uploadStatus === 'uploading' && (
						<div className='w-full space-y-4'>
							<File className='h-12 w-12 text-primary mx-auto animate-pulse' />
							<Progress value={uploadProgress} className='w-full' />
							<p className='text-sm text-muted-foreground text-center'>
								Uploading... {uploadProgress}%
							</p>
						</div>
					)}

					{uploadStatus === 'success' && (
						<>
							<CheckCircle2 className='h-12 w-12 text-green-500' />
							<p className='text-lg font-medium text-green-600'>
								File uploaded successfully!
							</p>
						</>
					)}

					{uploadStatus === 'error' && (
						<>
							<AlertCircle className='h-12 w-12 text-red-500' />
							<p className='text-lg font-medium text-red-600'>
								Upload failed. Please try again.
							</p>
						</>
					)}
				</div>
			</div>
		</Card>
	);
}
