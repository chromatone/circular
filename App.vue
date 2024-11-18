<script setup>
import { ref } from 'vue';
import RhythmCircle from './components/RhythmCircle.vue'

import { version, year } from './package.json'

const started = ref(false)

const more = ref(false)

</script>

<template lang="pug">
article.z-1000.fixed.top-0.left-0.bottom-0.right-0.p-8.flex.flex-col.gap-6.bg-dark-800.bg-op-50.backdrop-blur.text-light-100(v-if="!started")
  .flex

    .flex-1.flex.flex-col.gap-4
      .flex
        a.font-bold.no-underline.flex.items-center.gap-1(href="https://chromatone.center" target="_blank")
          img(src="/logo.svg" width="30" height="30")
          h1.text-xl Chromatone
        .flex-1 
        a.flex.gap-1.items-center.no-underline(href="https://github.com/chromatone/circular/" target="_blank")
          span MIT {{ year }}
          .i-la-github
          span v.{{ version }}
      h2.text-4xl Circular metronome
      h2.text-2xl Polyrhythm/polymeter tool and instrument


  .h-full.overflow-scroll.overscroll-none.flex.flex-col.gap-2.max-w-55ch
    h3.text-lg Two cycles of 2-48 notes of 2-16 subdivisions played in both normal and accented variants. The whole universe of polyrhythms and polymeters in your hands, just dial numbers and toggle steps to find unique patterns to play along. With MIDI clock out, tap tempo and guess tempo from audio. 
      a(href="#more" @click="more = !more") Read {{ more ? 'less' : 'more' }}...

    p(v-if="more") You are in the center of deep rhythmic patterns explorations. We have two independent wheels ready to hold any variety of looping beats. Here's how you operate it:
    ul.list-decimal-inside.flex.flex-col.gap-2(v-if="more")
      li Set the <b>number of steps</b> with the top left slider. The external loop takes up to 48 steps for long sequences. The internal loop is smaller and can hold up to 16 steps.
      li Set the <b>number of subdivisions</b> of a measure with the top right slider. If the left and right numbers are equal you get a full loop cycle equal to one measure. But many more combinations are possible!
      li Turn steps <b>on and off</b> by clicking the colored wheel segments. The colorful lines connect all active steps of a sequence.
      li Use the <i class="p-3 mr-1 i-tabler-stairs"></i> button to reset the mutes distribution to the <a href="https://chromatone.center/theory/rhythm/system/euclidean/" target="_blank">Euclidean rhythm</a> given the number of mutes and given the loop steps count.
      li You can <b>set accents</b> on certain steps by clicking the step number. Filled circles produce an accented sound, hollow ones are regular beats.
      li Of course you can choose one of <b>5 sound kits</b> for the wheels independently. Just drag or click the bottom left slider (that one with the letters A-E).
      li If you want your own sounds to be played by the metronome – choose the last letter <b>F</b>. It'll open the two recorders and loaders for that. <b>Record any sound</b> from your microphone or <b>upload any sound file</b> for both regular and accented beats.
      li Adjust the <b>panning</b> <i class="p-3 mr-1 i-mdi-pan-horizontal"></i> and the <b>volume</b> <i class="p-3 mr-1 i-la-volume-up"></i> of each loop with the sliders on the bottom right. You can even set two independent rhythms to play in two separate channels (left and right).
      li Press <b>play</b> button <i class="p-3 mr-1 i-la-play"></i> in the top right corner and listen to the patterns you've created. The playback may be paused <i class="p-3 mr-1 i-la-pause"></i> and resumed from that place or stopped and reset with the stop button <i class="p-3 mr-1 i-la-stop"></i>. If you don't hear any sound on you mobile – just turn off the silent mode. Tested on iOS, it works!
      li There are two arrows <i class="p-3 mr-1 i-la-angle-left"></i> and <i class="p-3 mr-1 i-la-angle-right"></i> near the meter numbers at the top of the loops. With them you can <b>rotate the pattern</b> left or right at any moment, producing even more complex and evolving sequences.
      li The center circle of the metronome is very interactive. Use the <i class="p-3 mr-1 i-la-minus"></i> and <i class="p-3 mr-1 i-la-plus"></i> buttons to incrementally <b>change the tempo</b> by one BPM. Or press <i class="p-3 mr-1 i-la-slash"></i> and <i class="p-3 mr-1 i-la-times"></i> sectors to divide/multiply the tempo by two. It's like traversing the octaves of sound pitches. Notice that you get the same 'note' and starting color for these tempos.
      li You can also just tap and drag the center circle to change the tempo gradually, either with touch on mobile or mouse pointer on desktop.
      li The top left corner with the tempo information works the same – <b>drag it</b> to set the tempo you want.
      li At the bottom of the screen you can find buttons to get the tempo from the world around you to the app. The bottom left ear button <i class="p-3 mr-1 i-tabler-ear"></i> activates the sophisticated <b>analyser that can determine the tempo</b> from any incoming audio signal. Turn it on and let the microphone hear your rhythm: clap it, stomp it, sign it or just turn the music on. The app will listen to the audio and show its guess in the box near the 'ear' button. If you like what you get just press the number and the tempo will be set to the metronome itself.
      li The bottom right hand button <i class="p-3 mr-1 i-fluent-tap-double-20-regular"></i>is just good old <b>tap tempo</b>. Tap it three times or more to see the tempo you've imagined or hear playing. The more you tap – the more precise the result gets. Then tap the number to set the main tempo to the new value.
      li If you see a square icon <i class="p-3 mr-1 i-la-expand"></i> at the bottom left corner, you are able to open the circle metronome to the <b>full screen</b>. What an immense experience!
      li Once you build some interesting patterns you can <b>export them as a MIDI file</b> to use in any DAW or other MIDI-compatible tool. Just press the <i class="p-3 mr-1 i-la-file-download"></i> button at the right bottom corner and choose a place to save it to your system. Then you can drag and drop it to your DAW timeline, choose intrument for the tracks and transpose the notes to desired notes.
      li Explore our <a href="https://chromatone.center/theory/rhythm/" target="_blank">Rhythm theory section</a> for inspiration about what to dial into the loops. This app can act as a simple visual and audial cue for your music practice or become a toli to explore the enormous space of possible rhythmic combinations. Polyrhythms have never been so easy to see and internalise. The colors and the form of the metronome can help sticking to the tempo even in silence. Be creative and feel the power of this rhythm visualisation tool.
      li You can also control all the parameters of the metronome with your MIDI-controller. Use the knobs to send the <b>CC messages number 1-16</b> on <b>channel 1</b> for it. Both loops are independently controlled by these MIDI commands.  

  .flex-0.flex.items-center.sticky.bottom-2.m-2
    form.w-full(@submit.prevent="started = true")
      button.w-full.p-4.bg-light-300.text-dark-400.rounded-xl.shadow-lg.text-2xl(type="submit" @click="started = true") START

.flex.flex-col.p-2.pb-12.pt-4.gap-2.text-light-100
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
  overflow: hidden;
}
</style>
