<script setup>
import CircleCenter from './CircleCenter.vue'
import CircleOverlay from './CircleOverlay.vue'
import CircleLoop from './CircleLoop.vue'
import { useMidi, tempo, renderMidi, tracks } from 'use-chromatone'
import { ref, watch } from 'vue'

const { toggle } = useFullscreen()

const { midi } = useMidi()

import { controls } from './controls'
import { useFullscreen } from '@vueuse/core'

const overlay = ref(false);

function resetTracks() {
  tracks.forEach(t => t.reset())
}

const prevCC = ref(0)

watch(() => midi.cc, cc => {
  if (cc.channel != controls.channel) return
  if (cc.number != controls.tempoCC) return
  const diff = cc.raw - prevCC.value
  prevCC.value = cc.raw
  tempo.bpm = Math.floor(tempo.bpm + diff)
})

</script>

<template lang="pug">
#screen.flex.flex-col.items-center.w-full.relative.fullscreen-container
  svg#metronome.min-h-80svh.max-h-98svh.w-full.select-none(
    version="1.1",
    baseProfile="full",
    viewBox="0 0 1000 1000",
    xmlns="http://www.w3.org/2000/svg",
    style="user-select:none;touch-action:none"
    )
    defs
      filter#shadowButton(
        x="-50%" 
        height="200%" 
        width="300%")
        feDropShadow(
          dx="0" 
          dy="3" 
          stdDeviation="3" 
          flood-color="#2225")
    beat-control-math(transform="translate(20,50)")
    beat-control-button(
      v-tooltip.right="'Reset to Euclidean pattern'"
      transform="translate(20,110) scale(0.75)"
      title="Reset to Euclidean"
      @pointerdown="resetTracks()"
      )
      i-tabler-stairs
    beat-control-tap(transform="translate(785,900)")
    beat-control-transport(transform="translate(910,-30)")
    beat-control-button(
      v-tooltip.right="'Toggle info overlay'"
      transform="translate(10,750)"
      @pointerdown="overlay = true"
      )
      i-healthicons-question
    beat-control-button(
      v-tooltip.right="'Toggle full screen'"
      transform="translate(10,850)"
      @pointerdown="toggle()"
      )
      i-la-expand
    beat-control-button(
      v-tooltip.left="'Export MIDI file'"
      transform="translate(925,750)"
      @pointerdown="renderMidi(tracks)"
      )
      i-la-file-download
    beat-control-button(
      v-tooltip.left="'Toggle MIDI Clock out'"
      transform="translate(90, 850)"
      @pointerdown="tempo.midiClock = !tempo.midiClock"
      )
      i-mdi-midi-input.transition(:style="{ opacity: tempo.midiClock ? 1 : 0.3 }")
    circle-loop(
      v-for="(loop, i) in 2",
      :key="i"
      :order="i"
      :radius="380 - i * 200"
      :size="200"
      )
    circle-center(transform="translate(500,500) scale(0.75)")
    circle-overlay.cursor-pointer(
      v-if="overlay"
      @pointerdown="overlay = false"
      )
</template>

<style lang="postcss" scoped>
.button {
  @apply p-2 border-1 m-1 cursor-pointer shadow-md rounded text-2xl;
}

.info {
  @apply p-2 rounded m-1 text-2xl flex items-center;
}

.active,
.measure.active {
  @apply bg-current transition-all duration-400;
}

.measure {
  background-color: hsla(0, 0%, 50%, 0.5);
}
</style>