import Ammo from "../js/ammo.js";

export default class AmmoManagement{

    constructor(game){
        this.game = game;
        this.maxAmmo = 8;
        this.curentAmmoCount = 8;
        this.bulletArray = [];
        setInterval(this.addBullet.bind(this), 5000);
    }

    update(){
        this.bulletArray.forEach((bullet)=>{
            bullet.update();
        })
        let newBulletArray = [];
        for (let i = 0; i < this.bulletArray.length; i++){
            if (this.bulletArray[i].hit == false && this.bulletArray[i].y > 5){
                newBulletArray.push(this.bulletArray[i]);
            }else{
                this.bulletArray[i] = null;
            }
        }
        this.bulletArray = newBulletArray;
          
    }
    getCount(){
        return this.cuurentAmmoCount;
    }

    addBullet() {
        if (this.curentAmmoCount < 10){
            this.curentAmmoCount += 1;
        }
    }
    
    throwBullet(x, y, lane){
        if (this.curentAmmoCount > 0){
        let bullet = new Ammo(this.game, x, y, lane);
        this.bulletArray.push(bullet);
        this.curentAmmoCount -= 1;
        }
    }

}