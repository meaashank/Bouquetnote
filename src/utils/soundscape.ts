// Procedural Web Audio Ambient Garden Soundscape Generator
// Creates realistic gentle breezes through leaves and procedural bird chirps

class GardenSoundscape {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private birdTimer: NodeJS.Timeout | null = null;
  private volume: number = 0.4;
  private listeners: Set<(playing: boolean) => void> = new Set();

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isRunning));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  // Create pink/brown noise for gentle wind & foliage rustle
  private startWind() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft foliage and wind
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 420;
    filter.Q.value = 1.2;

    // LFO to modulate wind gusts gently
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15; // slow gust cycle (every 6-7s)
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    whiteNoise.start();
  }

  // Generate procedural sweet birdsong notes
  private triggerBirdChirp() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = 2200 + Math.random() * 1200; // 2.2kHz - 3.4kHz
    const chirpCount = 2 + Math.floor(Math.random() * 4); // 2 to 5 notes in a phrase

    for (let i = 0; i < chirpCount; i++) {
      const startTime = now + (i * 0.09) + (Math.random() * 0.03);
      const noteDuration = 0.06 + Math.random() * 0.04;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch envelope: quick upward or downward frequency sweep
      const sweepDir = Math.random() > 0.4 ? 1 : -1;
      const freqOffset = (Math.random() * 600) * sweepDir;
      osc.frequency.setValueAtTime(baseFreq + (i * 120), startTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(800, baseFreq + freqOffset), startTime + noteDuration);

      // Volume envelope: smooth bell curve
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.06 * this.volume, startTime + noteDuration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + noteDuration + 0.05);
    }

    // Schedule next birdsong phrase in 3 to 7 seconds
    const nextInterval = 2800 + Math.random() * 4500;
    this.birdTimer = setTimeout(() => {
      this.triggerBirdChirp();
    }, nextInterval);
  }

  public async start() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.startWind();
    this.isRunning = true;
    this.notify();

    // Start bird sequence shortly
    this.birdTimer = setTimeout(() => {
      this.triggerBirdChirp();
    }, 800);
  }

  public stop() {
    if (this.birdTimer) {
      clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }

    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
      this.ctx = null;
    }

    this.isRunning = false;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
    return this.isRunning;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getPlaying(): boolean {
    return this.isRunning;
  }
}

export const soundscape = new GardenSoundscape();
