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
 *   Hook                 150       5.0   00:00–00:05
 *   Problem              300      10.0   00:05–00:15
 *   Authority            540      18.0   00:15–00:33
 *   Proof                450      15.0   00:33–00:48
 *   Differentiator       570      19.0   00:48–01:07
 *   CTA                  390      13.0   01:07–01:20
 *                       ────     ─────
 *   Total               2400      80.0   (~1:20)
 */
export const SCENE_DURATIONS = {
  hook: 150,
  problem: 300,
  authority: 540,
  proof: 450,
  differentiator: 570,
  cta: 390,
} as const;

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (sum, d) => sum + d,
  0,
);

export const NativewitIntro: React.FC = () => {
  let offset = 0;
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
      {/* Voiceover */}
      <Audio src={staticFile("voiceover.mp3")} />

      {/* Background music — low volume under VO */}
      <Audio src={staticFile("music.mp3")} volume={0.15} />

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

