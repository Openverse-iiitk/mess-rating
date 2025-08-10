'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, Upload } from 'lucide-react';

export default function BadMessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
            Back to Rating
          </Link>
          <h1 className="text-3xl font-bold text-red-600">Bad Mess Images 🤢</h1>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Help Us Document Mess Issues</h2>
          <p className="text-gray-600 mb-4">
            Found something concerning in the mess? Help the community by sharing images of poor food quality, 
            hygiene issues, or other problems. Your contributions help maintain transparency and improve mess standards.
          </p>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <Github className="text-blue-600" size={24} />
            <div>
              <p className="font-medium text-blue-800">Contribute More Images</p>
              <p className="text-blue-600 text-sm">
                Upload images to our GitHub repository to help expand this collection
              </p>
            </div>
            <a 
              href="https://github.com/Openverse-iiitk/mess-rating" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Upload size={16} />
              Contribute
            </a>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Food Bug Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/foodbug.jpeg"
                alt="Food contamination issue"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Food Contamination</h3>
              <p className="text-gray-600 text-sm">
                Hygiene issue found in mess food. This type of contamination is unacceptable.
              </p>
              <div className="mt-2 text-xs text-red-600 font-medium">
                ⚠️ Health Risk
              </div>
            </div>
          </div>

          {/* Placeholder for more images */}
          <div className="bg-gray-100 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-80">
            <Upload className="text-gray-400 mb-4" size={48} />
            <h3 className="font-semibold text-gray-600 mb-2">Add More Images</h3>
            <p className="text-gray-500 text-sm text-center px-4">
              Help expand this collection by contributing images via GitHub
            </p>
            <a 
              href="https://github.com/Openverse-iiitk/mess-rating" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Contribute Now
            </a>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-80">
            <Upload className="text-gray-400 mb-4" size={48} />
            <h3 className="font-semibold text-gray-600 mb-2">Your Images Here</h3>
            <p className="text-gray-500 text-sm text-center px-4">
              Share your documentation of mess issues
            </p>
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">📸 Contribution Guidelines</h3>
          <ul className="text-yellow-700 text-sm space-y-2">
            <li>• Only upload genuine images of food quality or hygiene issues</li>
            <li>• Ensure images are clear and well-lit</li>
            <li>• No personal information should be visible in images</li>
            <li>• Include a brief description of the issue when contributing</li>
            <li>• Images should be relevant to IIIT Kottayam mess</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
