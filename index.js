import './index.scss';
import $ from 'jquery';

import { formatTime } from './js/ui';
import { play_sound, play_rand_sound } from './js/sound';
import { blink } from './js/animate';

$(()=>{

    const defaultGameSettings = {
        time:120,
        score: 60,
        income: 1,
        upgradeIncomeCost: 60,
        // Chance of successful risk
        chance: 0.6
    };
    let game = {};

    const stats = {
        riskSuccess: 0,
        riskFailure: 0,
        risksInRow: 0,
        riskStreak: 0
    }
    
    var music_bpm = 210;
    var music_bps = 1000/(music_bpm/60);//interval timer
    var income_interval;
    var countdownTimer;

    // Jquery refs
    const ui = {
        container:$('.container'),
        riskit: $('#btn__riskit'),
        upgrade: $('#btn__upgrade'),
        restart: $('#btn__restart'),
        time: $('#time'),
        money: $('#money'),
        finalScore: $('#final_score')
    }

    const colors = {
        green: '#0f0',
        red:'#f00',
        black:'#000'
    }
        
    const riskit = () => {
        var roll = Math.random();
        // console.log('roll: ' + roll);
        if(roll<=game.chance){
            game.score*=2;

            blink(ui.money,colors.green,colors.black);
            
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
            blink(ui.money,colors.red,colors.black);

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
        if(game.score >= game.upgradeIncomeCost){
            ui.upgrade.removeClass('disabled');
        }else{
            ui.upgrade.addClass('disabled');
        }
        if(game.score > 100000){
            ui.money.addClass('small-1')
        }
        if(game.score > 1000000){
            ui.money.addClass('small-2')
        }
        if(game.score > 10000000){
            ui.money.addClass('small-3')
        }
        if(game.score > 1000000000){
            ui.money.addClass('small-4')
        }
        if(game.score < 100000){
            ui.money.removeClass('small-1 small-2 small-3 small-4')
        }
        updateUI();
        
    }
    function upgradeIncome(){
        if(game.score >= game.upgradeIncomeCost){
            play_rand_sound('fxs_upgrade');
            game.score -= game.upgradeIncomeCost;
            game.income *= 2;
            game.upgradeIncomeCost = game.income * 60;
            updateUI();
        }
        
    }
    function gameOver(){
        ui.container.addClass('gameOver');
        clearInterval(income_interval);
        
    }
    function secondPassed() {
        updateUI();
        if(game.time <= 10){
            blink(ui.time,colors.red,colors.black);
        }
        if (game.time == 0) {
            clearInterval(countdownTimer);
            gameOver();
        } else {
            game.time--;
        }    
    }
    
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function showMultiplier(i){
        //console.log('multiplier ',i);
    }

    function restart(){
        play_sound('music');
        ui.container.removeClass('gameOver');
        game = Object.assign({},defaultGameSettings);
        income_interval = setInterval(getIncome, music_bps);
        countdownTimer = setInterval(secondPassed, 1000);
        updateUI();
    }

    function updateUI(){        
        ui.money.html(numberWithCommas(game.score));
        ui.finalScore.html(numberWithCommas(game.score));
        ui.time.html(formatTime(game.time));
        ui.upgrade.text('upgrade income: ' + numberWithCommas(game.upgradeIncomeCost));
    }

    (function initGame(){
        ui.riskit.click(riskit.bind(this));
        ui.upgrade.click(upgradeIncome.bind(this));
        ui.restart.click(()=>{
            play_sound('fx_exclaim',1);
            restart();
        });
        gameOver();

    })();

    
});