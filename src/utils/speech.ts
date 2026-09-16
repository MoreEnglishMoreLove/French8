/**
 * Speech synthesis utility for French pronunciation in MORE ENGLISH MORE LOVE
 */

export function speakFrench(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[*_#`[\]()]/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9; // Slightly clearer pace for learners

  // Try to find a French voice
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.includes('FR'));
  if (frVoice) {
    utterance.voice = frVoice;
  }

  window.speechSynthesis.speak(utterance);
}
