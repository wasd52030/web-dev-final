import Gift from './gift.js';
import Die from './die.js';
import Pupu from './pupu.js';
import Player from './player.js';


$(document).ready(function () {
    const startPage = `
    <div id="gameZone" class="gameZone"></div>    
    <div class="shadow"><div class="tt">按下就開始的啦!!!</div><br><br><br>
    <button id="start" class="start">START!!</button></div>
    <div style="display:flex;align-items: center;">
        <div class="gg">得分:</div>    
        <div id="score" class="score">0</div>
    </div>    
    <div id="u" style="font-family:標楷體;color:red;font-size:30px;"></div> 
    `;
    $("#root").html(startPage);

    const player = new Player();
    const gifts = [];
    const pupus = [];
    const dies = [];

    $(document).keydown(function (e) {
        player.turn(e.keyCode);
    });

    $("#start").click(function (e) {
        reset()
        $('#u').text('遊戲進行中')
        requestAnimationFrame(animation);
    });

    function reset() {
        $('#score').text(0);
        $('.player').css("left", 450);
        $('.player').css("top", 300);
        
        $('#gameZone>img.gift').remove()
        gifts.length = 0

        $('#gameZone>img.pupu').remove()
        pupus.length = 0

        $('#gameZone>img.die').remove()
        dies.length = 0
    }
    function animation() {
        if (Math.floor(Math.random() * 120) == 0) {
            gifts.push(new Gift(player.getElement()));
        }
        gifts.forEach(Element => {
            Element.move();
        });

        if (Math.floor(Math.random() * 60) == 0) {
            pupus.push(new Pupu(player.getElement()));
        }
        pupus.forEach(Element => {
            Element.move();
        });

        if (Math.floor(Math.random() * 480) == 0){
            dies.push(new Die(player.getElement()));
        }
        for (let index = 0; index < dies.length; index++) {
            const element = dies[index];

            if (element.move() === 200) {
                element.move();
            }

            if (element.move() === -1) {
                $('#u').text('遊戲結束，新開一局請點遊戲開始')
                cancelAnimationFrame(animation)
                return
            }
        }

        if (player.move() === 200) {
            requestAnimationFrame(animation);
        }

        if (player.move() === -1) {
            $('#u').text('遊戲結束，新開一局請點遊戲開始')
            cancelAnimationFrame(animation)
            return
        }
    }
});
