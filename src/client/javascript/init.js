document.addEventListener('keydown', keyboard.keydownListener);
document.addEventListener('keyup', keyboard.keyupListener);

const app = new PIXI.Application();
const resources = PIXI.loader.resources;

const initPIXI = function initPIXI() {
    app.renderer.backgroundColor = 0xFFFFFF;

    let canvasPlaceholder = document.getElementById('game-canvas-placeholder');
    canvasPlaceholder.parentNode.insertBefore(app.view, canvasPlaceholder.nextSibling);

    PIXI.settings.SCALE_MODE = 1;
};

initPIXI();