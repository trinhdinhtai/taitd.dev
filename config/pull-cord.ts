/** Physics feel knobs for the PullCord rope. Pass a Partial<PullCordConfig>
 *  via the `config` prop to override per instance. */
export interface PullCordConfig {
  /** Hang tension / fall speed. Up = taut + fast; down = floaty. */
  gravity: number
  /** Fraction of speed kept each frame. Up = snappier retract + more swing. */
  damping: number
  /** Constraint solver passes per frame. Up = stiff rope; down = loose and whippy. */
  iterations: number
  /** How far the knob can be pulled past rest. Deeper pull = bigger fly-up on release. */
  stretchMax: number
  /** Pull depth at which onPull fires; always kept below stretchMax. */
  stretchToggle: number
  /** Caps release speed so a hard fling cannot launch the knob. */
  maxVelocity: number
  /** Speed below which the rope stops simulating and rests. */
  sleepVelocity: number
}

export const DEFAULT_CONFIG: PullCordConfig = {
  gravity: 1250,
  damping: 0.94,
  iterations: 20,
  stretchMax: 26,
  stretchToggle: 20,
  maxVelocity: 22,
  sleepVelocity: 0.15,
}
