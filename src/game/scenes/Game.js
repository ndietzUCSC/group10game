import { Scene } from 'phaser';

export class Game extends Scene {
  constructor() {
    super('Game');
    this.furnitureData = [];
    this.itemData = [];
  }

  preload() {
    // Load your game assets here
    // For example, this loads a walking animation sprite sheet
    this.load.spritesheet('walking', 'assets/img/walking.png', {
      frameWidth: 8,
      frameHeight: 15,
      endFrame: -1,
    });

    


    // This is where you define furniture in the game
    // Add position, size, and what it says when the player interacts with it
        
   this.furnitureData = [
      {
        type: 'fridge',
        x: 84,
        y: 73,
        width: 55,
        height: 79,
        flavorText: 'The fridge hums quietly.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'sink',
        x: 92,
        y: 172,
        width: 62,
        height: 115,
        flavorText: 'No dirty dishes.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'stove',
        x: 89,
        y: 278,
        width: 60,
        height: 111,
        flavorText: 'Caution: Beware of gas leaks.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'diningtable',
        x: 272,
        y: 225,
        width: 72,
        height: 108,
        flavorText: 'The coffee is warm...But I don\'t remember making any.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'filecabinet',
        x: 88,
        y: 419,
        width: 57,
        height: 94,
        flavorText: 'The file cabinet is locked. I always forget where the key is.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'desk',
        x: 159,
        y: 535,
        width: 125,
        height: 82,
        flavorText: 'A clean space means a clean mind.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'couch',
        x: 346,
        y: 459,
        width: 123,
        height: 57,
        flavorText: 'No coins between the cushions.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'tv',
        x: 346,
        y: 544,
        width: 117,
        height: 62,
        flavorText: 'Only allowed during break time.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'plant',
        x: 556,
        y: 539,
        width: 57,
        height: 72,
        flavorText: 'It needs to be watered tomorrow.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'vendingmachine',
        x: 562,
        y: 421,
        width: 69,
        height: 117,
        flavorText: '*clunk* *kchunk* It\'s a soda.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'boxes',
        x: 576,
        y: 122,
        width: 72,
        height: 34,
        flavorText: 'A cluttered space means a cluttered mind....',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'fax',
        x: 350,
        y: 104,
        width: 53,
        height: 48,
        flavorText: 'I remember now. I need to fax something important.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },

      {
        type: 'supplyshelf',
        x: 373,
        y: 205,
        width: 105,
        height: 123,
        flavorText: 'Lots of business files.',
        // You can add a texture image too: texture: 'furnitureFridge'
      },


    ];

    // Define items the player can collect
    // Give them a name, position, size, and optional image
    this.itemData = [
      {
        name: 'key',
        x: 561,
        y: 524,
        width: 40,
        height: 40,
        texture: 'itemKey'
      },
    ];
  }

  create() {
    // Dev mode keys
    this.devKeys = this.input.keyboard.addKeys({
      toggleDebug: 'D',
      toggleCrosshair: 'C'
    });

    // For crosshair measuring
    this.measureStart = null;
    this.measureGraphics = this.add.graphics();
    this.measureGraphics.setDepth(999);
    // NOTE: To enable physics debug visuals, you must set debug: true in your Phaser.Game config
// Remove these lines as they do nothing on their own
    // Show the background and center it on the screen
    const background = this.add.image(1024, 718, 'background').setAlpha(1);
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;
    this.cameras.main.setBackgroundColor(0x00ff00);
    background.setPosition(gameWidth / 2, gameHeight / 2);

    // These groups hold furniture and items
    this.furnitureGroup = this.physics.add.staticGroup();
    this.itemsGroup = this.physics.add.staticGroup();

    // Add furniture and item hitboxes from your data
    this.furnitureData.forEach((data) => this.createFurniture(data));
    this.itemData.forEach((data) => this.createItem(data));

    // Set up the action key (E) to interact
    this.actionKey = this.input.keyboard.addKey('E');
    this.mouse = this.input.activePointer;

    // Create the player and keep them inside the screen
    this.player = this.physics.add.sprite(300, 250, 'playerSprite', 0);
    this.player.setScale(6);
    this.player.setCollideWorldBounds(true);

    // Set up inventory and special items
    this.inventory = [];
    this.inventoryUI = this.add.container(20, this.scale.height - 110).setScrollFactor(0);
    this.inventoryUI.setDepth(999);
    this.inventoryUI.layoutOffset = 10;
    this.inventoryUI.setDepth(999);

    // Inventory bar background
    const barBg = this.add.rectangle(0, 0, 500, 100, 0xffffff, 1)
      .setOrigin(0)
      .setStrokeStyle(2, 0x222222);
    this.inventoryUI.add(barBg);
    this.hasFlashlight = false;

    // Make the player walk animation work
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walking'),
      frameRate: 12,
      repeat: -1,
    });

    // Show messages in a console window at the center of the screen
    this.logHistory = '';
    this.consoleBg = this.add.rectangle(
      836, // x position (center)
      275, // y position (center)
      300, // new width (portrait layout)
      500, // new height
      0x000000,
      0.75
    )

    this.consoleText = this.add.text(711.5, 38, '', {
      font: '16px Courier',
      wordWrap: { width: 247 },
      color: '#ffffff',
      lineSpacing: 4,
      fixedWidth: 247,
      fixedHeight: 460,
      maxLines: 100,
      align: 'right'
    }).setAngle(0).setScrollFactor(0);

    this.consoleText.setDepth(1000);
    this.consoleText.setOrigin(0, 0);
    this.consoleText.setInteractive();

    // Create a mask to allow scrolling overflow
    const consoleMaskShape = this.make.graphics({ x: 0, y: 0, add: false });
    consoleMaskShape.fillStyle(0xffffff);
    consoleMaskShape.fillRect(711.5, 38, 247, 460);
    const consoleMask = consoleMaskShape.createGeometryMask();
    this.consoleText.setMask(consoleMask);

    // Show coordinates when you click the screen
    // This helps place things in the right spot
    this.coordText = this.add
      .text(10, 10, '', {
        font: '16px Monospace',
        fill: '#ff0000',
      })
      .setScrollFactor(0);

    this.input.on('pointerdown', (pointer) => {
      if (this.devKeys.toggleCrosshair.isDown) {
        // Begin measuring
        this.measureStart = { x: pointer.worldX, y: pointer.worldY };
      } else {
        const pos = `${pointer.worldX.toFixed(0)}, ${pointer.worldY.toFixed(0)}`;
        this.coordText.setText(`POS: ${pos}`);
        console.log(pos);
      }
    });

    this.input.on('pointerup', (pointer) => {
      if (!this.measureStart) return;
      const endX = pointer.worldX;
      const endY = pointer.worldY;
      const startX = this.measureStart.x;
      const startY = this.measureStart.y;

      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);
      const centerX = (startX + endX) / 2;
      const centerY = (startY + endY) / 2;

      const measurementText = `Width: ${width.toFixed(0)}, Height: ${height.toFixed(0)}, Center: (${centerX.toFixed(0)}, ${centerY.toFixed(0)})`;
      console.log(measurementText);
      this.coordText.setText(`W:${width.toFixed(0)} H:${height.toFixed(0)}
C: ${centerX.toFixed(0)},${centerY.toFixed(0)}`);

      navigator.clipboard.writeText(measurementText).then(() => {
        console.log('Measurement copied to clipboard');
      }).catch(err => {
        console.warn('Clipboard copy failed:', err);
      });

      this.measureGraphics.clear();
      this.measureGraphics.lineStyle(2, 0xffff00, 1);
      this.measureGraphics.strokeRect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        width,
        height
      );

      this.measureStart = null;
    });

    // Check for overlaps between player and objects
    this.physics.add.overlap(
      this.player,
      this.furnitureGroup,
      this.handleFurnitureOverlap,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.itemsGroup,
      this.handleItemPickup,
      null,
      this
    );

    // Draw a red crosshair under the mouse
    this.crosshair = this.add.graphics();
    this.input.on('pointermove', (pointer) => {
      this.crosshair
        .clear()
        .lineStyle(1, 0xff0000)
        .lineBetween(0, pointer.y, this.game.config.width, pointer.y)
        .lineBetween(pointer.x, 0, pointer.x, this.game.config.height);
    });
  }

  // Make an item from the data and add it to the game
  createItem(data) {
    const item = this.itemsGroup.create(data.x, data.y, data.texture);
    item.setSize(data.width, data.height).setOffset(0, 0).setOrigin(0.5);
    item.setData({ name: data.name });
  }

  // Make a piece of furniture from the data
  createFurniture(data) {
    const obj = this.furnitureGroup.create(data.x, data.y, data.texture);
    obj.setSize(data.width, data.height).setOffset(0, 0).setOrigin(0.5);
    obj.setData({
      type: data.type,
      flavorText: data.flavorText,
    });
  }

  // Called when player touches furniture and presses E
  handleFurnitureOverlap(_, obj) {
    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      this.addToLog(obj.getData('flavorText'));
      // this.sounds.interact.play();
    }
  }

  // Called when player touches an item
  handleItemPickup(_, item) {
    const name = item.getData('name');
    const texture = item.texture.key; // Capture the texture used
    this.inventory.push(name);

    const iconX = 10 + this.inventory.length * 40;

    // Placeholder text icon (default)
    // const icon = this.add.text(iconX, 30, name, {
    //   font: '16px Courier',
    //   fill: '#ffffff',
    //   backgroundColor: '#444'
    // }).setPadding(4).setOrigin(0, 0.5).setInteractive();

    // Use image icon with auto sizing, rounded mask, and shelf styling
    const icon = this.add.image(iconX, 50, texture)
      .setOrigin(0, 0.5)
      .setInteractive();

    // Add a visual container behind the icon
    const iconBox = this.add.rectangle(iconX, 50, 88, 88, 0x444444, 0.3)
      .setOrigin(0, 0.5)
      .setStrokeStyle(1, 0xffffff)
      .setInteractive();

    // Add hover inset effect
    iconBox.on('pointerover', () => {
      iconBox.setFillStyle(0x333333, 0.5);
      this.game.canvas.classList.add('clickable');
    });
    iconBox.on('pointerout', () => {
      iconBox.setFillStyle(0x444444, 0.3);
      this.game.canvas.classList.remove('clickable');
    });
    this.inventoryUI.add(iconBox);

    // Resize icon to fit inside 40x40 slot
    const maxSize = 40;
    const scale = Math.min(maxSize / icon.width, maxSize / icon.height);
    icon.setScale(scale);
    icon.on('pointerover', () => {
      this.game.canvas.classList.add('clickable');
    });
    icon.on('pointerout', () => {
      this.game.canvas.classList.remove('clickable');
    });

    // Add rounded mask
    const maskShape = this.make.graphics({ x: 0, y: 0, add: false });
    maskShape.fillStyle(0xffffff);
    maskShape.fillRoundedRect(0, 0, maxSize, maxSize, 6);
    const mask = maskShape.createGeometryMask();
    icon.setMask(mask);

    // Optional: use image icon instead of text
    // const icon = this.add.image(iconX, 50, texture)
    //   .setOrigin(0, 0.5)
    //   .setScale(1.5)
    //   .setInteractive();

    icon.on('pointerdown', () => {
      this.addToLog(`Clicked: ${name} (icon)`);
    });

    iconBox.on('pointerover', () => {
      this.game.canvas.classList.add('clickable');
    });
    iconBox.on('pointerout', () => {
      this.game.canvas.classList.remove('clickable');
    });
    iconBox.on('pointerdown', () => {
      this.addToLog(`Clicked: ${name} (container)`);
    });

    // Justify left based on count
    icon.x = this.inventoryUI.layoutOffset + (this.inventory.length - 1) * (40 + 6);
    this.inventoryUI.add(iconBox);
    this.inventoryUI.add(icon);

    item.destroy();
    this.addToLog(`You picked up: ${name}`);
    // this.sounds.pickup.play();
  }

  // Runs every frame: checks input and movement
  update() {
    // Live measure preview while dragging
    if (this.measureStart && this.devKeys.toggleCrosshair.isDown) {
      const pointer = this.input.activePointer;
      const width = Math.abs(pointer.worldX - this.measureStart.x);
      const height = Math.abs(pointer.worldY - this.measureStart.y);
      this.measureGraphics.clear();
      this.measureGraphics.lineStyle(1, 0xffff00, 1);
      this.measureGraphics.strokeRect(
        Math.min(pointer.worldX, this.measureStart.x),
        Math.min(pointer.worldY, this.measureStart.y),
        width,
        height
      );
    }

    // Toggle crosshair visibility
    if (Phaser.Input.Keyboard.JustDown(this.devKeys.toggleCrosshair)) {
      this.crosshair.visible = !this.crosshair.visible;
    }

    const player = this.player;
    const cursors = this.input.keyboard.createCursorKeys();

    // Reset velocity before applying new movement
    player.setVelocity(0);

    let moving = false;

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.setFlipX(true);
      moving = true;
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.setFlipX(false);
      moving = true;
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-160);
      moving = true;
    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
      moving = true;
    }

    if (moving) {
      if (!player.anims.isPlaying) {
        player.play('walk');
      }
    } else {
      player.anims.stop();
    }
  }

addToLog(text) {
    const lines = this.logHistory.split('\n').filter(line => line.length > 0);

    // Keep the last 100 lines
    lines.push(text);
    if (lines.length > 100) lines.shift();
    this.logHistory = lines.join('\n');

    this.consoleText.setText(this.logHistory);

    // Align text container to start at bottom right and scroll upward like a terminal
    const maskWidth = 247;
    const maskHeight = 460;
    const textHeight = this.consoleText.height;
    const textWidth = this.consoleText.width;

    // Calculate how much to scroll up so the last line is always at the bottom
    let y = 38 + maskHeight - textHeight;
    if (y > 38) y = 38; // Don't scroll below the mask

    this.consoleText.y = y;
    // Align right
    this.consoleText.x = 711.5 + maskWidth - textWidth;

    console.log('[Log]', text);
  }
}
