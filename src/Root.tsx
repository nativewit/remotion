import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/Nunito";
import {
  NativewitIntro,
  TOTAL_DURATION,
  SCENE_DURATIONS,
} from "./compositions/NativewitIntro";

loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Authority } from "./scenes/Authority";
import { Proof } from "./scenes/Proof";
import { Differentiator } from "./scenes/Differentiator";
import { CTA } from "./scenes/CTA";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Full intro video (~1:20) ───────────────────────────── */}
      <Composition
        id="NativewitIntro"
        component={NativewitIntro}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ── Individual scenes (for preview / iteration) ────────── */}
      <Composition
        id="Hook"
        component={Hook}
        durationInFrames={SCENE_DURATIONS.hook}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Problem"
        component={Problem}
        durationInFrames={SCENE_DURATIONS.problem}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Authority"
        component={Authority}
        durationInFrames={SCENE_DURATIONS.authority}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Proof"
        component={Proof}
        durationInFrames={SCENE_DURATIONS.proof}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Differentiator"
        component={Differentiator}
        durationInFrames={SCENE_DURATIONS.differentiator}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CTA"
        component={CTA}
        durationInFrames={SCENE_DURATIONS.cta}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
