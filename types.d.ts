// --- Definisi Tipe Global untuk Proyek ClickMiaw ---

// 1. Memperluas Interface Window
// Agar TypeScript/VS Code tahu bahwa fungsi-fungsi ini ada di object window
interface Window {
  updateGameScore?: (newScore: string | bigint | number) => void;
  addGameAchievement?: (amount: number | string) => void;
  removeGameAchievement?: (amount: number | string) => void;
  setGameAchievement?: (amount: number | string) => void;
  unlockAllEasterEggs?: () => void;
  onYouTubeIframeAPIReady?: () => void;
}

// 2. Definisi Tipe untuk YouTube IFrame API
// Agar tidak muncul warning saat menggunakan 'YT' atau 'new YT.Player'
declare namespace YT {
  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);
    loadVideoById(videoId: string): void;
    stopVideo(): void;
    playVideo(): void;
    destroy(): void;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: PlayerEvent) => void;
      onError?: (event: PlayerEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
    data: any;
  }

  // Enum State Player (0 = Ended, 1 = Playing, dll)
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }
}
