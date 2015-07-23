/**
 * @title drums
 * @artist curtis
 */

export function dsp(t) {
  t *= 2;

  play_on_beat(t, 0, 'kick');
  play_on_beat(t, 0.5, 'kick');
  play_on_beat(t, 1.5, 'kick');
  play_on_beat(t, 2.25, 'kick');
  play_on_beat(t, 3.5, 'kick');
  play_on_beat(t, 1, 'snare');
  play_on_beat(t, 3, 'snare');
  play_on_beat(t, 0.5, 'hihat');
  play_on_beat(t, 1.5, 'hihat');
  play_on_beat(t, 2.5, 'hihat');
  play_on_beat(t, 3.5, 'hihat');

  return mix_sample();
}

import snare from 'jd-code/groovit/master/SAMPLES/SNAR_13D.WAV';
import hihat from 'pdv/webmpc/master/sounds/r909/909hat.wav';
import kick from 'pdv/webmpc/master/sounds/r909/909BD.wav';
import ltom from 'pdv/webmpc/master/sounds/r909/909ltom.wav';
import mtom from 'pdv/webmpc/master/sounds/r909/909mtom.wav';
import htom from 'pdv/webmpc/master/sounds/r909/909hitom.wav';
import clap from 'pdv/webmpc/master/sounds/r909/909clap.wav';
import ride from 'pdv/webmpc/master/sounds/r909/909ride.wav';
import Sampler from 'stagas/sampler';

var drums = Sampler(8);
drums.tune(1.1);
drums.add('snare', snare);
drums.add('hihat', hihat);
drums.add('kick', kick);
drums.add('htom', htom);
drums.add('mtom', mtom);
drums.add('ltom', ltom);
drums.add('clap', clap);
drums.add('ride', ride);

// Play instrument 'drum' on 'beat'.
function play_on_beat(t, beat, drum) {
  if (((t + beat) % 4) < 1/22050) {
    drums.play(drum, 1, 1);
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
  if (t % 1 === 0) {
    console.log(t);
  }
}

