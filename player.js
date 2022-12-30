export default class Player {
    constructor(){
        this.element = jQuery(`<img class="player" id="player" src="./番仔.jpg">`);
        this.gameZone = $("#gameZone");
        this.gameZone.append(this.element);
        this.direction = 37 + Math.floor(Math.random()*4);
    }
    turn(direction){
        this.direction = direction;
    }
    getElement(){
        return this.element;
    }
    move(){
        const position = this.element.position();
        let top = position.top;
        let left = position.left;
        switch (this.direction) {
            case 37:
                left-=6;
                break;
            case 38:
                top-=6;
                break;
            case 39:
                left+=6;
                break;
            case 40:
                top+=6;
                break;                
            default:
                break;
        }
        this.element.css("left",left);
        this.element.css("top",top);
        if (left<0||left+this.element.width()>this.gameZone.width()||top<0||top+this.element.height()>this.gameZone.height()) {
            return alert("遊戲結束！");                        
        } 
        else {
            return 200;    
        }
        
    }
}
