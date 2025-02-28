import React, { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { Upload, Download, File, X } from 'lucide-react';

const DocumentManager: React.FC = () => {
  const { userData, updateDocuments } = useUser();
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('download');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (fileName) {
      const newDocument = {
        id: Date.now().toString(),
        name: fileName,
        type: 'upload' as const,
        url: '#',
        date: new Date().toISOString().split('T')[0]
      };
      
      updateDocuments([...userData.documents, newDocument]);
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveDocument = (id: string) => {
    updateDocuments(userData.documents.filter(doc => doc.id !== id));
  };

  const uploadDocuments = userData.documents.filter(doc => doc.type === 'upload');
  const downloadDocuments = userData.documents.filter(doc => doc.type === 'download');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Document Management</h2>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'download'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('download')}
        >
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            <span>Downloads</span>
          </div>
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'upload'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <div className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            <span>Uploads</span>
          </div>
        </button>
      </div>

      {activeTab === 'download' ? (
        <div className="space-y-3">
          {downloadDocuments.length > 0 ? (
            downloadDocuments.map(doc => (
              <div
                key={doc.id}
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <File className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-3" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</p>
                </div>
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No documents available for download</p>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Document</label>
                <div className="flex mt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    {fileName || 'Choose file...'}
                  </div>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!fileName}
                    className={`px-4 py-2 rounded-r-md text-sm font-medium text-white transition-colors duration-150 ${
                      fileName ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700' : 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed'
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {uploadDocuments.length > 0 ? (
              uploadDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <File className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-3" />
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    onClick={() => handleRemoveDocument(doc.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No documents uploaded yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;