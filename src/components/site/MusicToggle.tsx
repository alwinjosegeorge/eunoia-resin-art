import { Music2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Royalty-free soft piano (CC0) — Pixabay
const SRC = "https://cdn.pixabay.com/audio/2022/10/18/audio_31750a1bf2.mp3";

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.18;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
    setOn(!on);
  };
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 grid place-items-center h-12 w-12 rounded-full glass-card hover:scale-105 transition"
      aria-label={on ? "Mute ambient music" : "Play ambient music"}
      title={on ? "Pause ambience" : "Play soft piano ambience"}
    >
      {on ? <Music2 className="h-4 w-4 text-gold" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}
