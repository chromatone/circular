/**
 * @module Colors
 */

import { reactive, computed } from "vue"
import { useStorage } from "@vueuse/core"

import { colord, extend } from "colord"
import lchPlugin from "colord/plugins/lch"
import mixPlugin from "colord/plugins/mix"
import namesPlugin from "colord/plugins/names"
import labPlugin from "colord/plugins/lab"
import cmykPlugin from "colord/plugins/cmyk"
import hwbPlugin from "colord/plugins/hwb"

import { pitchColor, isInChroma } from "./calculations"

extend([mixPlugin, lchPlugin, namesPlugin, labPlugin, cmykPlugin, hwbPlugin])

export const defaultScheme = Array(12)
  .fill(true)
  .map((v, i) => colord(pitchColor(i)).toHex())

export const scheme = reactive({
  default: [...defaultScheme],
  custom: useStorage("custom-colors", [...defaultScheme]),
  isDefault: computed(() =>
    scheme.custom.every((v, i) => v == defaultScheme[i])
  ),
  customize: false,
  reset() {
    scheme.custom = [...defaultScheme]
  }
})

export function noteColor(pitch = 0, octave = 2, velocity = 1, alpha = 1) {
  octave += Math.floor(pitch / 12)
  const diff = octave - 2
  if (scheme.custom[pitch % 12] != scheme.default[pitch % 12]) {
    return colord(scheme.custom[pitch % 12]).lighten(diff * 0.1).alpha(alpha).toHex()
  } else {
    return pitchColor(pitch, octave, velocity, alpha)
  }
}


export function lchToHsl(n = 0, total = 12, a = 1, s = 20, lightness = 60) {
  let lch = `lch(${lightness}% ${s} ${n * (360 / total)} / ${a})`
  let hsl = colord(lch).toHslString()
  return hsl
}

// export const currentColor = useStorage("main-color", "#333333");

export function getColorInfo(color) {
  const cld = colord(color)
  return {
    dark: cld.isDark(),
    hex: cld.toHex(),
    rgb: cld.toRgbString(),
    name: cld.toName({ closest: true }),
    cmyk: cld.toCmykString(),
    hsl: cld.toHslString(),
    lab: cld.toLab()
  }
}

export function levelColor(
  i = 0,
  n = 3,
  a = 0.5,
  s = 0.8,
  l = 0.5,
  reverse = false
) {
  if (reverse) {
    i = n - i - 1
  }
  return `hsla(${i * (360 / n)}, ${s * 100}%, ${l * 100}%, ${a})`
}

export function chromaColorMix(chroma, tonic, part = 0.2, octave = 4) {
  let hsl = colord(pitchColor(tonic))
  let lch = colord(lchToHsl(tonic, 12, 1, 40, 6 * octave))

  chroma.split("").forEach((bit, i) => {
    if (isInChroma(chroma, tonic, i)) {
      hsl = hsl.mix(pitchColor(i, octave), part)
      lch = lch.mix(lchToHsl(i, 12, 1, 40, 6 * octave), part)
    }
  })
  return {
    hsl: hsl.toHslString(),
    lch: lch.toHslString()
  }
}
