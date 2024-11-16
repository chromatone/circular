<script setup>
import { ref, watch } from 'vue';
import { onKeyDown, useCycleList } from '@vueuse/core';
import RhythmCircle from './components/RhythmCircle.vue'


import { version, year } from './package.json'



</script>

<template lang="pug">
.flex.flex-col.items-start.transition-all.duration-500.ease-out.select-none.rounded-8.shadow-xl.w-full.h-full.text-white.flex-1

  .bg-dark-800.bg-op-40.p-2.text-light-800.flex.gap-2.items-center.flex-wrap.w-full
    a.font-bold.no-underline.flex.items-center.gap-1(href="https://chromatone.center" target="_blank")
      img(src="/logo.svg" width="20" height="20")
      h1.p-0 Chromatone
    h2.p-0 Circular metronome
    .flex-1

    a.flex.gap-1.items-center.no-underline(href="https://github.com/chromatone/circular/" target="_blank")
      .i-la-github
      span v.{{ version }}
    //- span MIT {{ year }}

    //- article.z-1000.fixed.top-0.left-0.right-0.p-8.flex.flex-col.gap-6.bg-dark-800.bg-op-50.backdrop-blur
      a.font-bold.no-underline.flex.items-center.gap-1(href="https://chromatone.center" target="_blank")
        img(src="/logo.svg" width="30" height="30")
        h1.text-xl Chromatone
      h2.text-4xl Circular
      h2.text-2xl Multilayered polyphonic synthesizer app 
      h3.text-sm.max-w-55ch Explore unique sounds of 6 voice polyphony, 4 layers of sound generators for each of them and 2 global effects with any MIDI controller, laptop keyboard and flexible onscreen keyboard with choice of scales while analyzing the output on the global oscilloscope and colorized FFT time-frequency bars. Notes and frequencies are set according to Chromatone.  


  .flex.flex-col.p-2.pb-12.pt-4.gap-2 CIRCULAR
    RhythmCircle
</template>

<style lang="postcss">
#app {
  @apply w-full flex flex-col min-h-100svh;
}

a {
  @apply underline;
}

html {
  @apply min-h-100svh;
}

html,
body {
  @apply flex items-stretch justify-stretch min-h-100svh;
  background-color: #444;
  width: 100%;
  line-height: 1.3;
  font-family: "Commissioner", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: var(--c-text);
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: none;
  touch-action: pan-y;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
