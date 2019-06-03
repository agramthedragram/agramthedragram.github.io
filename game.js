// Create our only scene called mainScene, in the game.js file
class mainScene {
    
    
    hit() {
        // Change the position x and y of the coin randomly
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
      
        // Increment the score by 10
        this.score += 10;
      
        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player, // on the player 
            duration: 200, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            yoyo: true, // at the end, go back to original scale 
          });
      }

    preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds  
      this.load.image('player', 'assets/player.png');
      this.load.image('coin', 'assets/coin.png');

      
    }
    create() {
      // This method is called once, just after preload()
      // It will initialize our scene, like the positions of the sprites
      this.player = this.physics.add.sprite(100, 100, 'player');
      this.coin = this.physics.add.sprite(300, 300, 'coin');
      // This will create and place a score counter for the game
      this.score = 0;
      let style = { font: '20px Arial', fill: '#fff' };
      this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

      // Set arrows as input method
      this.arrow = this.input.keyboard.createCursorKeys();

      var pointer = scene.input.activePointer;


    }
    update() {
      // This method is called 60 times per second after create() 
      // It will handle all the game's logic, like movements
      
      // x axis movement
      if (this.arrow.right.isDown){
          this.player.x += 3;
      } else if (this.arrow.left.isDown){
          this.player.x -= 3;
      }
      // y axis movement
      if (this.arrow.up.isDown){
          this.player.y -= 3;
      } else if ( this.arrow.down.isDown){
          this.player.y += 3;
      }

      if(pointer.y > this.player.y){
        this.player.y -=3;
      } else if (pointer.y < this.player.y){
        this.player.y +=3;
      }
       

      

      if(this.physics.overlap(this.player, this.coin)){
          this.hit();
      }
    }
  }

new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: {default: 'arcade'},
    parent: 'game'
})