import './index.scss';
import $ from 'jquery';

import { formatTime } from './js/ui';
import { play_sound, play_rand_sound } from './js/sound';

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

    // Jquery refs
    const ui = {
        riskit: $('#btn__riskit'),
        upgrade: $('#btn__upgrade'),
        time: $('#time'),
        money: $('#money')
    }
    
    const riskit = () => {
        var roll = Math.random();
        console.log('roll: ' + roll);
        if(roll<=game.chance){
            game.score*=2;
            
            stats.riskSuccess++;
            stats.risksInRow++;
            if(stats.risksInRow >= stats.riskStreak)stats.riskStreak = stats.risksInRow;
            play_rand_sound('fxs_good');
            
            if(stats.risksInRow > 1){
                var index = stats.risksInRow-1;
                // if(index < fx_exclaim.length){
                //     for(var i = 0; i < index; i++){
                //         fx_exclaim[i].pause();//stop the other sound effects
                //     }
                // }
                play_sound('fx_exclaim', index);
            }
            //show flashy multiplier
            showMultiplier(stats.risksInRow);
            
            
        }else{
            //Fail riskit
            if(game.score >= 100000){
                play_sound('fxs_score_loss',2);
            }else if(game.score >= 10000){
                play_sound('fxs_score_loss',1);
            }else if (game.score >= 1000){
                play_sound('fxs_score_loss',0);
            
            }
            game.score = 0;
            
            stats.riskFailure++;
            stats.risksInRow = 0;
            play_rand_sound('fxs_bad');
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
        ui.money.html(game.score);
        
    }
    function upgradeIncome(){
        if(game.score >= game.upgradeIncomeCost){
            play_rand_sound('fxs_upgrade');
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
    function secondPassed() {
        ui.time.html(formatTime(game.time));
        if (game.time == 0) {
            clearInterval(countdownTimer);
            gameOver();
        } else {
            game.time--;
        }
    
    }
    
    var countdownTimer = setInterval(secondPassed, 1000);


    function showMultiplier(i){
        console.log('multiplier ',i);
    }

    (function initGame(){
        play_sound('music');
        ui.riskit.click(riskit.bind(this));
        ui.upgrade.click(upgradeIncome.bind(this));

    })();

    
});