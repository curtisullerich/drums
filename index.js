/**
 * @title drums
 * @artist curtis
 */

import snare from 'jd-code/groovit/master/SAMPLES/SNAR_13D.WAV';
import hihat from 'pdv/webmpc/master/sounds/r909/909hat.wav';
import kick from 'pdv/webmpc/master/sounds/r909/909BD.wav';
import Sampler from 'stagas/sampler';

var drums = Sampler(8);
drums.tune(1.1);
drums.add('snare', snare);
drums.add('hihat', hihat);
drums.add('kick', kick);

export function dsp(t) {
  t *= 2;

  play_on_beats(t, [0], 'kick');
  play_on_beats(t, [0,0.25,1,1.25,2,2.25,3,3.25], 'hihat');

  return mix_sample();
}

function play(t, drum) {
  if ( t % 1 === 0 ) drums.play(drum,   1  , 1);
}

// Play instrument 'drum' on 'beat'.
function play_on_beat(t, beat, drum) {
  if (((t + beat) % 4) < 1/22050) {
    drums.play(drum, 1, 1);
  }
}

// Play instrument 'drum' on every beat in 'beats', given time t.
function play_on_beats(t, beats, drum) {
  var len = beats.length;
  for (var i = 0; i < len; i++) {
    play_on_beat(t, beats[i], drum);
  }
}

// Mix the drums together and return a sample.
function mix_sample() {
  var sample = 0.8 * (
    drums.mix() * 0.17
  );
  return sample;
}

// Logs t if it's a whole number.
function print_beat(t) {
  if (t % 1 < 1/22050) {
    console.log(t);
  }
}
