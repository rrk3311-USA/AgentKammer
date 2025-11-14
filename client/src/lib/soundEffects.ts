// Sophisticated chime sound generator
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function playCrunchyChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create multiple oscillators for a rich, crunchy sound
    const frequencies = [
      800,   // Fundamental
      1600,  // Second harmonic (octave)
      2400,  // Third harmonic
      3200,  // Fourth harmonic
    ];
    
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    
    // Envelope for crisp attack and decay
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.15, now + 0.01); // Quick attack
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25); // Smooth decay
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      // Use sine waves for clean, bell-like tones
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      // Reduce volume for higher harmonics
      const volume = 1 / (index + 1);
      oscGain.gain.setValueAtTime(volume, now);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start(now);
      osc.stop(now + 0.3);
    });
    
    // Add a subtle high-frequency "sparkle" for crunchiness
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(4800, now);
    
    sparkleGain.gain.setValueAtTime(0, now);
    sparkleGain.gain.linearRampToValueAtTime(0.08, now + 0.005);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    sparkle.connect(sparkleGain);
    sparkleGain.connect(masterGain);
    
    sparkle.start(now);
    sparkle.stop(now + 0.1);
    
  } catch (error) {
    console.log("Audio playback not available");
  }
}

export function playButtonClick() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Shorter, punchier sound for regular buttons
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
  } catch (error) {
    console.log("Audio playback not available");
  }
}
