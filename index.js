import './index.scss';
import $ from 'jquery';
$(()=>{
    const game = {
        time:120,
        score: 60,
        income: 1,
        upgradeIncomeCost: 60,
        upgradeAffordable: false,
        isGameOver: false,
        successiveSuccessfulRisks:0,
        // Chance of successful risk
        chance: 0.6
    };

    const stats = {
        riskSuccess: 0,
        riskFailure: 0,
        risksInRow: 0,
        riskStreak: 0
    }

    const ui = {
        riskit: riskit,
        upgrade: $('#btn__upgrade')
    }
    
    function riskIt(){
        var roll = Math.random();
        console.log('roll: ' + roll);
        if(roll<=game.chance){
            game.score*=2;
            
            stats.riskSuccess++;
            stats.risksInRow++;
            if(stats.risksInRow >= stats.riskStreak)stats.riskStreak = stats.risksInRow;
            play_rand_sound(fxs_good);
            
            if(stats.risksInRow > 1){
                var index = stats.risksInRow-1;
                if(index < fx_exclaim.length){
                    for(var i = 0; i < index; i++){
                        fx_exclaim[i].pause();//stop the other sound effects
                    }
                    play_sound(fx_exclaim[index]);
                }
            }
            //show flashy multiplier
            showMultiplier(stats.risksInRow);
            
            
        }else{
            //Fail riskit
            if(game.score >= 100000){
                play_sound(fxs_game.score_loss[2]);
            }else if(game.score >= 10000){
                play_sound(fxs_game.score_loss[1]);
            }else if (game.score >= 1000){
                play_sound(fxs_game.score_loss[0]);
            
            }
            game.score = 0;
            
            stats.riskFailure++;
            stats.risksInRow = 0;
            play_rand_sound(fxs_bad);
            //make the button shake:
            ui.riskit.addClass('btn-error');
            ui.riskit.addClass('risk_fail');
            setTimeout( function() { ui.riskit.removeClass('btn-error'); ui.riskit.removeClass('risk_fail');}, 600 );
            //hide multiplier
            $('#animationSandbox').removeClass();
        }
        
    }
    function getIncome(){
        game.score += game.income;
        
    }
    function upgradeIncome(){
        if(game.score >= game.upgradeIncomeCost){
            play_rand_sound(fxs_upgrade);
            game.score -= game.upgradeIncomeCost;
            game.income *= 2;
            game.upgradeIncomeCost = game.income * 60;
            ui.upgrade.text('upgrade income: ' + game.upgradeIncomeCost);
        }
        
    }
    var music_bpm = 210;
    var music_bps = 1000/(music_bpm/60);//interval timer
    var income_interval = setInterval(function(){ getIncome(); }, music_bps);
    function gameOver(){
        ui.riskit.hide();
        ui.upgrade.hide();
        clearInterval(income_interval);
        
    }
    
    
    //WHEN YOU ADD NEW MUSIC, ADD IT TO readjustVolume()!!!
    var fxs_good = [new Audio('sound/good_1.wav'),new Audio('sound/good_2.wav')];
    var fxs_bad = [new Audio('sound/bad_1.wav'),new Audio('sound/bad_2.wav'),new Audio('sound/bad_3.wav')];
    var fxs_upgrade = [new Audio('sound/upgrade_1.wav'),new Audio('sound/upgrade_2.wav')];
    var fx_exclaim = [new Audio('sound/exclaim_1.wav'),new Audio('sound/exclaim_2.wav'),new Audio('sound/exclaim_3.wav'),new Audio('sound/exclaim_4.wav'),new Audio('sound/exclaim_5.wav'),new Audio('sound/exclaim_6.wav'),new Audio('sound/exclaim_7.wav')];
    var fxs_score_loss = [new Audio('sound/bad_amount_1.wav'),new Audio('sound/bad_amount_2.wav'),new Audio('sound/bad_amount_3.wav')];
    var music = new Audio('sound/Rollinat5.mp3');

    music.play();
    
    function play_rand_sound(sound_list){
        var rand = sound_list[Math.floor(Math.random() * sound_list.length)];
        play_sound(rand);
    }
    function play_sound(sound){
        //chrome / firefox discrepancy:
        if (window.chrome) sound.load();
        sound.play();
    }
    function mute(){
        $('#unmuted').hide();
        $('#muted').show();
        readjustVolumes(0.0);
    }
    function unmute(){
        $('#unmuted').show();
        $('#muted').hide();
        readjustVolumes(1.0);
    }
    function readjustVolumes(newVolume){
        changeVolume(music,newVolume);
        for(var i = 0; i < fxs_good.length; i++)changeVolume(fxs_good[i],newVolume);
        for(var i = 0; i < fxs_bad.length; i++)changeVolume(fxs_bad[i],newVolume);
        for(var i = 0; i < fx_exclaim.length; i++)changeVolume(fx_exclaim[i],newVolume);
    }
        
    
    var volume_master = 1.0;
    function changeVolume(clip,newVolume){
        clip.volume = newVolume*volume_master;
    }
    function secondPassed() {
        var minutes = Math.round((ui.upgrade - 30)/60);
        var remainingSeconds = ui.upgrade % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = '0' + remainingSeconds;  
        }
        $('#countdown').html('Time remaining: ' + minutes + ':' + remainingSeconds);
        if (ui.upgrade == 0) {
            clearInterval(countdownTimer);
            gameOver();
        } else {
            ui.upgrade--;
        }
    
    }
    
    var countdownTimer = setInterval(secondPassed, 1000);


    function showMultiplier(i){
        console.log('multiplier ',i);
    }
    
});