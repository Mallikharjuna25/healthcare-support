import React, { useState, useEffect } from 'react'

export default function VoiceInput({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!supported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // English (India) / General English

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && onResult) {
        onResult(transcript);
      }
    };

    recognition.start();
  };

  if (!supported) {
    return (
      <button
        type="button"
        className="voice-btn voice-disabled"
        title="Speech recognition not supported in this browser"
        aria-label="Voice Input Not Supported"
      >
        🎤
        <span className="voice-tooltip">Voice input not supported in this browser</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`voice-btn ${isListening ? 'voice-active' : ''}`}
      onClick={startListening}
      title="Fill field using Voice (Speech-to-Text)"
      aria-label="Start Voice Input"
    >
      {isListening ? '🎙️' : '🎤'}
    </button>
  );
}
