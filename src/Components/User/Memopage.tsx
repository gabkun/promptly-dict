import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosConfig';

interface MemoDetails {
  _id: string;
  title: string;
  createdDate: string;
  description: string;
  additionalNotes?: string;
  images: string[];
  status: string;
  memoType: number;
}

const MemoPage = () => {
  const { memoId } = useParams<{ memoId: string }>();  
  const [memoDetails, setMemoDetails] = useState<MemoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);  

  useEffect(() => {
    const fetchMemoDetails = async () => {
      try {
        if (!memoId) {
          setError('Memo ID is missing.');
          return;
        }

        const response = await axiosInstance.get(`/api/memo/view/${memoId}`);
        
        console.log('Fetched Memo Details:', response.data.memo);
        setMemoDetails(response.data.memo);
      } catch (err) {
        console.error('Failed to fetch memo details:', err);
        setError('Unable to retrieve memo details. Please try again later.');
      }
    };

    fetchMemoDetails();
  }, [memoId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!memoDetails) {
    return <div>Loading...</div>;
  }

  const createdAt = memoDetails?.createdDate ? new Date(memoDetails.createdDate).toLocaleString() : 'Date unavailable';

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="memo-details-container">
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="m-10 flex-1 flex flex-col p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Memo Details</h2>
          <h3 className="text-2xl font-medium text-gray-700 mb-4">{memoDetails.title}</h3>
          <p className="text-xl text-gray-600 mb-2"><strong>Created At:</strong> {createdAt}</p>
          <p className="text-xl text-gray-600 mb-2"><strong>Description:</strong> {memoDetails.description}</p>
          {memoDetails.additionalNotes && (
            <p className="text-xl text-gray-600 mb-2"><strong>Additional Notes:</strong> {memoDetails.additionalNotes}</p>
          )}
          {memoDetails.images.length > 0 && (
            <div className="memo-images">
              <h4 className="text-xl font-medium text-gray-800 mb-2">Images:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memoDetails.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4500/${image.replace(/\\/g, "/")}`}
                    alt={`Memo image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleImageClick(image)} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative max-w-3xl w-full p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={`http://localhost:4500/${selectedImage.replace(/\\/g, "/")}`}
              alt="Selected Memo"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoPage;