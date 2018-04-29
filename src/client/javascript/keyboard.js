const keyboard = {
  keys: [],
  keydownListener: function(e) {
    const keyName = e.key;
    if (!keyboard.keys[keyName]) keyboard.keys[keyName] = true;
  },
  keyupListener: function(e) {
    const keyName = e.key;
    if (keyboard.keys[keyName]) keyboard.keys[keyName] = false;
  }
};
