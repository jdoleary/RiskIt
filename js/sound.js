import $ from 'jquery';
import { Howler, Howl } from 'howler';

import good_1 from '../sound/good_1.wav';
import good_2 from '../sound/good_2.wav';

import bad_1 from '../sound/bad_1.wav';
import bad_2 from '../sound/bad_2.wav';
import bad_3 from '../sound/bad_3.wav';

import upgrade_1 from '../sound/upgrade_1.wav';
import upgrade_2 from '../sound/upgrade_2.wav';

import exclaim_1 from '../sound/exclaim_1.wav';
import exclaim_2 from '../sound/exclaim_2.wav';
import exclaim_3 from '../sound/exclaim_3.wav';
import exclaim_4 from '../sound/exclaim_4.wav';
import exclaim_5 from '../sound/exclaim_5.wav';
import exclaim_6 from '../sound/exclaim_6.wav';
import exclaim_7 from '../sound/exclaim_7.wav';

import bad_amount_1 from '../sound/bad_amount_1.wav';
import bad_amount_2 from '../sound/bad_amount_2.wav';
import bad_amount_3 from '../sound/bad_amount_3.wav';

import music from '../sound/Rollinat5.mp3';

const sounds = {
    fxs_good: [new Howl({src:[good_1]}),new Howl({src:[good_2]})],
    fxs_bad: [new Howl({src:[bad_1]}),new Howl({src:[bad_2]}),new Howl({src:[bad_3]})],
    fxs_upgrade: [new Howl({src:[upgrade_1]}),new Howl({src:[upgrade_2]})],
    fx_exclaim: [new Howl({src:[exclaim_1]}),new Howl({src:[exclaim_2]}),new Howl({src:[exclaim_3]}),new Howl({src:[exclaim_4]}),new Howl({src:[exclaim_5]}),new Howl({src:[exclaim_6]}),new Howl({src:[exclaim_7]})],
    fxs_score_loss: [new Howl({src:[bad_amount_1]}),new Howl({src:[bad_amount_2]}),new Howl({src:[bad_amount_3]})],
    //music: [new Howl({src:[music]})]
}

// const music2 = new Howl({src:[music]});
// music2.once('load',()=>{
//     console.log('loaded');
//     music2.play();
// })
let volume_master = 1.0;
export function changeVolume(clip,newVolume){
    clip.volume = newVolume*volume_master;
}
export function play_rand_sound(soundKey){
    const sound_list = sounds[soundKey];
    play_sound(soundKey,Math.floor(Math.random() * sound_list.length));
}
export function play_sound(soundKey,index = 0){
    if(sounds[soundKey] && index < sounds[soundKey].length){
        let sound = sounds[soundKey][index];
        sound.play();
    }
}
export function mute(){
    $('#unmuted').hide();
    $('#muted').show();
    readjustVolumes(0.0);
}
export function unmute(){
    console.log('unmute'); 
    $('#unmuted').show();
    $('#muted').hide();
    readjustVolumes(1.0);
}
export function readjustVolumes(newVolume){
    Howler.volume(newVolume);
}

$(()=>{
    $('#muted').click(unmute);
    $('#unmuted').click(mute);
})