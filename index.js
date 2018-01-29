import './index.scss';
import $ from 'jquery';
$(()=>{
    
/*
         Add handlers to buttons:
  */      
        var disableClicks = false;
        function addClickAndTouch(id,callback){
            document.getElementById(id).addEventListener('click', function(e){
                if(!disableClicks){
                    callback(e);
                }
            });
            document.getElementById(id).addEventListener('touchstart', function(e){
                disableClicks = true;
                callback(e);
            });
        }
        addClickAndTouch('btn_risk_holder',function(e){
            riskIt();
            e.preventDefault();
        });
        addClickAndTouch('btn_upgrade',function(e){
            upgradeIncome();
            e.preventDefault();
        });
        

        
        
        ////////
        var seconds = 120;//game timer
        var riskSuccess = 0;
        
        var riskStreak = 0;
        var risksInRow = 0;
        
        var riskFailure = 0;
        var income = 1;
        
        var upgradeIncomeCost = income*60;
        $('#btn_upgrade a').text("UPGRADE INCOME: " + upgradeIncomeCost);
        var money = 100;
        
        var id_money = $('#money');
        
        updateStats();
        var chance = 0.6;
        
        function riskIt(){
            var roll = Math.random();
            console.log('roll: ' + roll);
            if(roll<=chance){
                money*=2;
                updateStats();
                riskSuccess++;
                risksInRow++;
                if(risksInRow >= riskStreak)riskStreak = risksInRow;
                play_rand_sound(fxs_good);
                
                if(risksInRow > 1){
                    var index = risksInRow-1;
                    if(index < fx_exclaim.length){
                        for(var i = 0; i < index; i++){
                            fx_exclaim[i].pause();//stop the other sound effects
                        }
                        play_sound(fx_exclaim[index]);
                    }
                }
                //show flashy multiplier
                showMultiplier(risksInRow);
                
                
            }else{
                //Fail riskit
                if(money >= 100000){
                    play_sound(fxs_money_loss[2]);
                }else if(money >= 10000){
                    play_sound(fxs_money_loss[1]);
                }else if (money >= 1000){
                    play_sound(fxs_money_loss[0]);
                
                }
                money = 0;
                updateStats();
                riskFailure++;
                risksInRow = 0;
                play_rand_sound(fxs_bad);
                //make the button shake:
                $('#btn_risk').addClass('btn-error');
                $('#btn_risk').addClass('risk_fail');
                setTimeout( function() { $('#btn_risk').removeClass('btn-error'); $('#btn_risk').removeClass('risk_fail');}, 600 );
                //hide multiplier
                $('#animationSandbox').removeClass();
            }
            calculatePotential();
            updateStats();
        }
        function getIncome(){
            money += income;
            updateStats();
        }
        function upgradeIncome(){
            if(money >= upgradeIncomeCost){
                play_rand_sound(fxs_upgrade);
                money-=upgradeIncomeCost;
                income *= 2;
                calculatePotential();
                upgradeIncomeCost = income*60;
                $('#btn_upgrade a').text("UPGRADE INCOME: " + upgradeIncomeCost);
            }
            updateStats();
        }
        var potentialMoney = 0;
        function calculatePotential(){
            potentialMoney = Math.round(money+income*seconds*music_bpm/60);
        }
        function updateStats(){
            $('#stats').html("History S/F: " + riskSuccess + "/" + riskFailure + "<br>Best Success Streak: " + riskStreak + "<br>Potential: ~$" + potentialMoney);
            var money_formatted = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            $('#money').text("$"+money_formatted);
            
            //upgrade button:
            
            $('#btn_upgrade a').addClass('upgrade_unavail');
            
            if(money >= upgradeIncomeCost){
                $('#btn_upgrade a').removeClass('upgrade_unavail');
            }
            
        }
        var music_bpm = 210;
        var music_bps = 1000/(210/60);//interval timer
        var income_interval = setInterval(function(){ getIncome(); }, music_bps);
        function gameOver(){
            $('#stats').hide();
            $('#btn_risk').hide();
            $('#btn_upgrade').hide();
            clearInterval(income_interval);
            $('#countdown').text("Game Over");
            
        }
        
        //audio:
        
        //WHEN YOU ADD NEW MUSIC, ADD IT TO readjustVolume()!!!
        var fxs_good = [new Audio("sound/good_1.wav"),new Audio("sound/good_2.wav")];
        var fxs_bad = [new Audio("sound/bad_1.wav"),new Audio("sound/bad_2.wav"),new Audio("sound/bad_3.wav")];
        var fxs_upgrade = [new Audio("sound/upgrade_1.wav"),new Audio("sound/upgrade_2.wav")];
        var fx_exclaim = [new Audio("sound/exclaim_1.wav"),new Audio("sound/exclaim_2.wav"),new Audio("sound/exclaim_3.wav"),new Audio("sound/exclaim_4.wav"),new Audio("sound/exclaim_5.wav"),new Audio("sound/exclaim_6.wav"),new Audio("sound/exclaim_7.wav")];
        var fxs_money_loss = [new Audio("sound/bad_amount_1.wav"),new Audio("sound/bad_amount_2.wav"),new Audio("sound/bad_amount_3.wav")];
        
        var music;
        var choice = Math.floor(Math.random()*7);
        console.log("music choice: " + choice);
        if(choice < 5){
            music = new Audio("sound/Rollinat5.mp3");
        }else{
            music = new Audio("sound/Rollinat5elec.mp3");
        }
        music.play();
        
        function play_rand_sound(sound_list){
            var rand = sound_list[Math.floor(Math.random() * sound_list.length)];
            play_sound(rand);
        }
        function play_sound(sound){
            //chrome / firefox discrepancy:
            if (window.chrome) sound.load()
            sound.play()
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
        var minutes = Math.round((seconds - 30)/60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;  
        }
        $('#countdown').html("Time remaining: " + minutes + ":" + remainingSeconds);
        if (seconds == 0) {
            clearInterval(countdownTimer);
            gameOver();
        } else {
            seconds--;
        }
        
    }
     
    var countdownTimer = setInterval(secondPassed, 1000);
    
    calculatePotential();
    
    
    function animate_css(x) {
        //clear previous animations:
        $("#animationSandbox").removeClass();
        //show it suddenly
        $('#animationSandbox span').show();
        
        
        $('#animationSandbox').addClass(x + ' animated');
    };
    function showMultiplier(i){
        var choice = Math.floor(Math.random()*2);
        $('#animationSandbox span').text('x' + 2*i);
        if(choice == 0)animate_css('jpulse');
        else animate_css('jpulse2');
    }
    
});