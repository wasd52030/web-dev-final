import Gift from './gift.js';
import Die from './die.js';
import Pupu from './pupu.js';
import Player from './player.js';
$(document).ready(function () {
    const startPage=`
    <div id="score" class="score">0</div>
    <div id="gameZone" class="gameZone"></div>    
    <div class="shadow"><div class="tt">按下就開始的啦!!!</div><br><br><br>
    <button id="start" class="start">START!!</button></div> 
    <div class="gg">得分:</div>    
    `;
    $("#root").html(startPage);
    const player = new Player();
    const gifts = new Array();
    const pupus = new Array();
    const dies = new Array();
    $(document).keydown(function (e) { 
        player.turn(e.keyCode);
    });
    $("#start").click(function (e) { 
        requestAnimationFrame(()=>animation());
    });
    function animation() { 
        if(Math.floor(Math.random()*120)==0)
            gifts.push(new Gift(player.getElement()));
        gifts.forEach(Element=>{
            Element.move();
        });
        if(Math.floor(Math.random()*60)==0)
            pupus.push(new Pupu(player.getElement()));
        pupus.forEach(Element=>{
            Element.move();
        });
        if(Math.floor(Math.random()*480)==0)
            dies.push(new Die(player.getElement()));
        dies.forEach(Element=>{
            Element.move();
        });
        
        if(player.move()==200)
            requestAnimationFrame(()=>animation());
    }
});
    