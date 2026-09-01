export const illustrations = {
  heroBand: "/illustrations/hero-band.png",
  heroCharacter: "/illustrations/hero-character.png",
  nowPlaying: "/illustrations/character-now-playing.png",
  intent: "/illustrations/character-intent.jpg",
  shelf: "/illustrations/character-shelf.png",
  stickerProps: "/illustrations/sticker-props.png",
} as const;

export const textures = {
  creamPaper: "/textures/cream-paper.jpg",
} as const;

export type TabIllustrationConfig = {
  src: string;
  width: number;
  height: number;
  objectPosition?: string;
  blendMultiply?: boolean;
};

export const tabIllustrations: Record<string, TabIllustrationConfig> = {
  "now-playing": {
    src: illustrations.nowPlaying,
    width: 900,
    height: 1100,
    blendMultiply: true,
  },
  intent: {
    src: illustrations.intent,
    width: 837,
    height: 1024,
    blendMultiply: false,
  },
  shelf: {
    src: illustrations.shelf,
    width: 900,
    height: 1100,
    blendMultiply: true,
  },
};
