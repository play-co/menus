import lib.Enum as Enum;

var constants = {},
  style = {};

constants.transitionMethod = Enum(
  'NONE',
  'SLIDE',
  'SCALE',
  'FADE',
  'ROTATE'
);

constants.BOX_SLICES = {
  SOURCE_SLICES: {
    horizontal: {left: 30, center: 10, right: 30},
    vertical: {top: 30, middle: 10, bottom: 30}
  },
  DEST_SLICES: undefined
};

constants.BUTTON_SLICES = {
  SOURCE_SLICES: {
    horizontal: {left: 30, center: 10, right: 30},
    vertical: {top: 30, middle: 10, bottom: 30}
  },
  DEST_SLICES: undefined
};

constants.DIALOG = {
  BACKGROUND: 'resources/images/ui/background.png',
  CONTENT_BORDER: 'resources/images/ui/contentBorder.png',
  SHOW_TRANSITION_METHOD: constants.transitionMethod.SLIDE,
  SHOW_TRANSITION_TIME: 300,
  HIDE_TRANSITION_METHOD: constants.transitionMethod.SLIDE,
  HIDE_TRANSITION_TIME: 300,
  BACK: {
    MARGIN_LEFT: 2,
    MARGIN_TOP: 4,
    WIDTH: 55,
    HEIGHT: 55,
    STYLE: 'BLUE',
    IMAGE: {
      MARGIN_LEFT: 9,
      MARGIN_TOP: 7,
      WIDTH: 35,
      HEIGHT: 35,
      URL: 'resources/images/ui/buttonBack.png'
    }
  },
  CLOSE: {
    MARGIN_RIGHT: 2,
    MARGIN_TOP: 4,
    WIDTH: 55,
    HEIGHT: 55,
    STYLE: 'RED',
    IMAGE: {
      MARGIN_LEFT: 9,
      MARGIN_TOP: 7,
      WIDTH: 35,
      HEIGHT: 35,
      URL: 'resources/images/ui/buttonClose.png'
    }
  },
  BUTTON: {
    HEIGHT: 50,
    MARGIN_BOTTOM: 30,
    MARGIN_RIGHT: 10
  },
  CONTENT: {
    BACKGROUND: 'resources/images/ui/item.png',
    FONT_SIZE: 24,
    PADDING: [0, 30, 0, 30],
    MARGIN_LEFT: 35,
    MARGIN_RIGHT: 35,
    MARGIN_TOP: 110,
    MARGIN_BOTTOM: 35
  },
  TUTORIAL: {
    MARGIN_LEFT: 0,
    MARGIN_RIGHT: 4
  },
  DOCUMENT: {
    MARGIN_LEFT: 15,
    MARGIN_RIGHT: 15,
    MARGIN_TOP: 15
  }
};

constants.TUTORIAL = {
  BACKGROUND_COLOR: 'rgb(255, 255, 255)'
};

constants.MENU_TEXT = {
  FONT_SIZE: 24,
  PADDING: [0, 0, 0, 0],
  STROKE_WIDTH: 0,
  ALIGN: 'center'
};

constants.MENU_ITEM = {
  BACKGROUND: 'resources/images/ui/buttonItem.png',
  FONT_SIZE: 24,
  PADDING: [0, 0, 3, 0],
  MARGIN_LEFT: 30,
  MARGIN_RIGHT: 30,
  MARGIN_BOTTOM: -4,
  HEIGHT: 80,
  STROKE_WIDTH: 3
};

constants.TITLE = {
  BACKGROUND: 'resources/images/ui/title.png',
  FONT_SIZE: 24,
  COLOR: 'rgb(55,55,55)',
};

constants.BUTTONS = {
  BLUE: {
    UP: 'resources/images/ui/button1Up.png',
    DOWN: 'resources/images/ui/button1Down.png',
    FONT_SIZE: 24,
    COLOR: 'rgb(255, 255, 255)',
  },
  GREEN: {
    UP: 'resources/images/ui/button2Up.png',
    DOWN: 'resources/images/ui/button2Down.png',
    FONT_SIZE: 24,
    COLOR: 'rgb(255, 255, 255)',
  },
  RED: {
    UP: 'resources/images/ui/button3Up.png',
    DOWN: 'resources/images/ui/button3Down.png',
    FONT_SIZE: 24,
    COLOR: 'rgb(255, 255, 255)',
  }
};

if (CONFIG.browser && CONFIG.browser.menus) {
  style = JSON.parse(CACHE[CONFIG.browser.menus + '.json']);
}

exports = merge(style, constants);

