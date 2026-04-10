import { Audio, Sequence, AbsoluteFill, staticFile } from "remotion";
import { Hook } from "../scenes/Hook";
import { Problem } from "../scenes/Problem";
import { Authority } from "../scenes/Authority";
import { Proof } from "../scenes/Proof";
import { Differentiator } from "../scenes/Differentiator";
import { CTA } from "../scenes/CTA";

/**
 * Scene durations in frames (all at 30 fps).
 *
 *   Scene              Frames   Seconds   VO span
 *   ────────────────   ──────   ───────   ────────
 *   Intro delay          30       1.0   silence / anticipation
 *   Hook                 150       5.0   00:01–00:06
 *   Problem              345      11.5   00:06–00:17.5
 *   Authority            390      13.0   00:17.5–00:30.5
 *   Proof                435      14.5   00:30.5–00:45
 *   Differentiator       645      21.5   00:45–01:06.5
 *   CTA                  375      12.5   01:06.5–01:19
 *                       ────     ─────
 *   Total               2370      79.0   (~1:19)
 */
export const INTRO_DELAY = 30; // 1 s at 30 fps

export const SCENE_DURATIONS = {
  hook: 150,
  problem: 345,
  authority: 390,
  proof: 435,
  differentiator: 645,
  cta: 375,
} as const;

export const TOTAL_DURATION =
  INTRO_DELAY +
  Object.values(SCENE_DURATIONS).reduce((sum, d) => sum + d, 0);

export const NativewitIntro: React.FC = () => {
  let offset = INTRO_DELAY;
  const seq = (duration: number) => {
    const from = offset;
    offset += duration;
    return from;
  };

  const hookFrom = seq(SCENE_DURATIONS.hook);
  const problemFrom = seq(SCENE_DURATIONS.problem);
  const authorityFrom = seq(SCENE_DURATIONS.authority);
  const proofFrom = seq(SCENE_DURATIONS.proof);
  const diffFrom = seq(SCENE_DURATIONS.differentiator);
  const ctaFrom = seq(SCENE_DURATIONS.cta);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Voiceover — delayed to sync with first visual scene */}
      <Sequence from={INTRO_DELAY}>
        <Audio src={staticFile("voiceover.mp3")} />
      </Sequence>

      {/* Background music — starts at timeline second 1 */}
      <Sequence from={30}>
        <Audio src={staticFile("music.mp3")} volume={0.15} />
      </Sequence>

      <Sequence from={hookFrom} durationInFrames={SCENE_DURATIONS.hook}>
        <Hook />
      </Sequence>

      <Sequence from={problemFrom} durationInFrames={SCENE_DURATIONS.problem}>
        <Problem />
      </Sequence>

      <Sequence from={authorityFrom} durationInFrames={SCENE_DURATIONS.authority}>
        <Authority />
      </Sequence>

      <Sequence from={proofFrom} durationInFrames={SCENE_DURATIONS.proof}>
        <Proof />
      </Sequence>

      <Sequence from={diffFrom} durationInFrames={SCENE_DURATIONS.differentiator}>
        <Differentiator />
      </Sequence>

      <Sequence from={ctaFrom} durationInFrames={SCENE_DURATIONS.cta}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

