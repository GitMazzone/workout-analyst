'use client';

import FileUpload from '@/components/file-upload';
import { useFileStore } from '@/lib/store/file-store';

export default function Home() {
	// Access the latest uploaded file from the store
	const latestFile = useFileStore((state) => state.latestFile);

	return (
		<main className='flex flex-col items-center justify-center h-screen'>
			<div className='flex flex-col items-center justify-center pb-10 gap-3'>
				<h1 className='text-5xl font-bold text-blue-500'>Workout Analyst</h1>
				<h2 className='text-sm text-muted-foreground'>
					Learn from your mesocycle data
				</h2>
			</div>
			<div className='w-full max-w-xl space-y-8'>
				{/* Conditionally render based on whether a file is uploaded */}
				{latestFile ? (
					<DashboardPlaceholder latestFile={latestFile} />
				) : (
					<FileUpload />
				)}
			</div>
		</main>
	);
}

// Placeholder for the dashboard view
function DashboardPlaceholder({
	latestFile,
}: {
	latestFile: { name: string };
}) {
	return (
		<div className='flex flex-col items-center justify-center p-6 bg-gray-50 border rounded-lg shadow-sm'>
			<h3 className='text-lg font-semibold text-gray-800'>Dashboard</h3>
			<p className='text-sm text-gray-600'>
				Analyzing file: <strong>{latestFile.name}</strong>
			</p>
			{/* Add your charts and data visualizations here */}
			<div className='mt-4 p-4 bg-gray-200 rounded-md'>
				<p className='text-center'>Your charts will appear here.</p>
			</div>
		</div>
	);
}
