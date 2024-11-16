/**
 * @module Tempo
 */

import { reactive, computed, watch, onMounted, shallowReactive, ref, } from "vue";
import { getTransport, start, Frequency, Loop, Sampler, gainToDb, getDraw, MetalSynth, } from "tone";
import { freqPitch, pitchColor } from "./calculations";

import { Note } from "tonal";
import { useStorage, onKeyStroke, useRafFn, } from "@vueuse/core";

import { useClamp } from "@vueuse/math";
import { createAudioChannel } from "./audio";
// import { WebMidi } from "webmidi";
// import { midi, stopAll } from "./midi";

export const bpm = useClamp(useStorage("tempo-bpm", 100), 10, 500)

export const tempo = reactive({
  initialized: false,
  bpm,
  midiClock: false,
  tabSync: useStorage("tab-sync", false),
  blink: false,
  started: false,
  playing: false,
  stopped: false,
  mute: useStorage("tempo-mute", true),
  volume: useClamp(useStorage("tempo-volume", 0.5), 0, 1),
  progress: 0,
  position: null,
  ticks: 0,
  hz: computed(() => (tempo.bpm / 60).toFixed(2)),
  note: computed(() => Note.pitchClass(Frequency(tempo.hz).toNote())),
  tune: computed(() => Note.pitchClass(tempo.note) + 4),
  pitch: computed(() => freqPitch(Number(tempo.hz))),
  digit: computed(() => (Frequency(tempo.hz).toMidi() + 12 * 10 + 3) % 12),
  color: computed(() => pitchColor(tempo.digit)),
  set(diff) {
    tempo.bpm = Math.round(diff + tempo.bpm)
  }
});

export function useTempo() {
  if (tempo.initialized) return tempo

  const Draw = getDraw()
  const transport = getTransport()

  const metro = shallowReactive({
    counter: 0,
    pluck: null,
    clock: null,
    loop: null
  })

  onMounted(() => {

    const { channel, volume } = createAudioChannel('circular')

    metro.pluck = new MetalSynth({}).toDestination()

    // metro.clock = new Loop(t => {
    //   if (!tempo.midiClock) return
    //   Draw.schedule(() => {
    //     WebMidi.outputs.forEach(output => output.sendClock())
    //   }, t)
    // }, '8i').start(0)

    metro.loop = new Loop((time) => {
      let even = metro.counter % 2 == 0
      if (!even) {
        Draw.schedule(() => {
          tempo.blink = true
        }, time)
      } else {
        Draw.schedule(() => {
          tempo.blink = false
        }, time)
      }

      if (!tempo.mute) {
        metro.pluck.triggerAttackRelease(even ? 'E1' : 'E2', '16n', time, even ? 1 : 0.2)
      }
      metro.counter++

    }, "8n").start(0)

    useRafFn(() => {
      tempo.position = transport.position
      tempo.ticks = transport.ticks
      tempo.progress = metro.loop.progress
    })

    onKeyStroke(" ", (ev) => {
      const elem = ev.target
      if (["TEXTAREA", "INPUT"].includes(elem.nodeName)) return
      ev.preventDefault()
      tempo.playing = !tempo.playing
    });

    onKeyStroke("Enter", (ev) => {
      const elem = ev.target
      if (["TEXTAREA", "INPUT"].includes(elem.nodeName)) return
      ev.preventDefault()
      tempo.stopped = Date.now()
    });

  });



  watch(() => tempo.volume, (volume) => metro?.pluck?.volume?.rampTo(gainToDb(volume)), { immediate: true })

  watch(bpm,
    (b) => transport.bpm.rampTo(b, "4n"),
    { immediate: true }
  );

  watch(
    () => tempo.stopped,
    (stop) => {
      if (stop) {

        transport.stop();
        // stopAll()
        tempo.playing = false;

      }
    }
  );

  watch(
    () => tempo.playing,
    (playing) => {
      if (playing) {
        if (!tempo.started) {
          start();
          tempo.started = true;
        }
        tempo.stopped = false;
        transport.start();
        // midi.playing = true


      } else {
        // midi.playing = false
        transport.pause();

      }
    }, {
    immediate: true
  }
  );

  // watch(() => midi.playing, p => tempo.playing = p)
  // watch(() => midi.stopped, s => tempo.stopped = s)

  tempo.initialized = true
  return tempo;
}


// TAP TEMPO

export const tapTempo = reactive({
  timer: null,
  last: 0,
  diff: 0,
  timeout: 2000,
  times: [],
  bpm: null,
  tap,
  refresh
})

function tap() {
  let time = performance.now();
  if (tapTempo.last) {
    tapTempo.diff = time - tapTempo.last;
    tapTempo.times.push(tapTempo.diff);
    refresh();
  }
  tapTempo.last = time;
  clearTimeout(tapTempo.timer);
  tapTempo.timer = setTimeout(function () {
    tapTempo.times = [tapTempo.diff];
    tapTempo.last = null;
  }, tapTempo.timeout);
}

function refresh() {
  if (tapTempo.times.length > 2) {
    let average =
      tapTempo.times.reduce((result, t) => (result += t)) /
      tapTempo.times.length;
    let bpm = (1 / (average / 1000)) * 60;
    tapTempo.bpm = bpm;
  }
}

