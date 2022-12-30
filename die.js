export default class Die {
    constructor(player){
        this.player = player;
        this.element = jQuery(`<img class="die" src="./生命之水.png">`);
        this.gameZone = $("#gameZone");
        this.gameZone.append(this.element);
        this.direction = 37 + Math.floor(Math.random()*4);
        const left = Math.floor(Math.random()*(this.gameZone.width()-this.element.width()));
        const top = Math.floor(Math.random()*(this.gameZone.height()-this.element.height()));
        this.element.css("left", left);
        this.element.css("top", top);
    }
    
    
    move(){
        const position = this.element.position();
        let top = position.top;
        let left = position.left;
        switch (this.direction) {
            case 37:
                left-=3;
                break;
            case 38:
                top-=3;
                break;
            case 39:
                left+=3;
                break;
            case 40:
                top+=3;
                break;                
            default:
                break;
        }
        if (left<0) {
            left=0;
            this.direction=39;
        }
        if (left+this.element.width()>this.gameZone.width()) {
            left--;
            this.direction=37;
        }
        if (top<0) {
            top=0;
            this.direction=40;
        }
        if (top+this.element.height()>this.gameZone.height()) {
            top--;
            this.direction=38;            
        }
        this.element.css("left",left);
        this.element.css("top",top);
        if (this.collision()) {
            this.score();
            return -1;
        }
        else{
            return 200;
        }
    }
    collision(){
        const playerLeft = this.player.position().left;
        const playerTop = this.player.position().top;
        const playerWidth = this.player.width();
        const playerHeight = this.player.height();
        const elementLeft = this.element.position().left;
        const elementTop = this.element.position().top;
        const elementWidth = this.element.width();
        const elementHeight = this.element.height();

        if( elementLeft>=playerLeft && elementLeft<=(playerLeft-100) && elementTop>=playerTop && elementTop<=(playerTop+playerHeight-100))
            return true;
        if( (elementLeft+elementWidth-100)>=playerLeft && (elementLeft+elementWidth-100)<=(playerLeft+playerWidth-100) && elementTop>=playerTop && elementTop<=(playerTop+playerHeight-100))
            return true;
        if( elementLeft>=playerLeft && elementLeft<=(playerLeft+playerWidth-100) && (elementTop+elementHeight-100)>=playerTop && (elementTop+elementHeight-100)<=(playerTop+playerHeight-100))
            return true;
        if( (elementLeft+elementWidth-100)>=playerLeft && (elementLeft+elementWidth-100)<=(playerLeft+-100) && (elementTop+elementHeight-100)>=playerTop && (elementTop+elementHeight)<=(playerTop+-100))
            return true;
        else{
            return false;
        }
        
    }
}