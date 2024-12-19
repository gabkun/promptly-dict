import React, { useState, useRef } from "react";

type AudioRecorderProps = {
  onAudioData: (audio: File) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];

        const audioFile = new File([audioBlob], "audio.webm", { type: "audio/webm" });
        onAudioData(audioFile); 
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing audio devices: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Voice Memo Recorder</h1>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full px-6 py-3 text-white font-semibold text-lg rounded-lg transition-colors duration-300 shadow-md ${
          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioURL && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700">Playback:</h2>
          <audio src={audioURL} controls className="mt-4 w-full rounded border border-gray-300" />
          <p className="text-sm text-gray-500 mt-3 text-center">
            Save the audio file to use it later.
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;