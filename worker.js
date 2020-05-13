self.addEventListener('message', function(e) {
    var message = e.data[0] + 'to myself!';
    self.postMessage(message);

    var keyState = {};

    window.addEventListener('keydown', function(e) {
    keyState[e.key] = true;
    }, true);

    window.addEventListener('keyup', function(e) {
    keyState[e.key] = false;
    }, true);

    function gameLoop() {
    if (keyState['n']) {
        spriteController.translate(0, -10, 0);
        spriteController.translate(1, -10, 0);
        spriteController.reflect(0, true, false);
        spriteController.reflect(1, true, false);
    }
    if (keyState['m']) {
        spriteController.translate(0, 10, 0);
        spriteController.translate(1, 10, 0);
        spriteController.reflect(0, false, false);
        spriteController.reflect(1, false, false);
    }
    setTimeout(gameLoop, 10);
    }

    gameLoop();
    this.self.close();
});

