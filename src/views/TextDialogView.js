import animate;

import ui.View as View;

import menus.constants.menuConstants as menuConstants;

import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.ButtonView as ButtonView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {
		// Get the height from opts before the super init is executed!
		var width = this._width = opts.width || GC.app.baseWidth - 80;
		var height = this._height = opts.height || 400;

		supr(this, 'init', arguments);

		var buttons = opts.buttons || [];
		var contentStyle = menuConstants.DIALOG.CONTENT;
		var contentHeight = this._getContentHeight(buttons.length);

		// The dialog containing the actual content...
		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: (GC.app.baseWidth - width) * 0.5,
			y: (GC.app.baseHeight - height) * 0.5,
			width: width,
			height: height,
			fontFamily: contentStyle.FONT_FAMILY,
			fontSize: contentStyle.FONT_SIZE,
			textPadding: contentStyle.PADDING,
			text: opts.text || '',
			title: opts.title,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false,
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false
		});
		this._dialogView.text.updateOpts({
			wrap: true,
			x: contentStyle.MARGIN_LEFT,
			y: contentStyle.MARGIN_TOP,
			width: this._dialogView.style.width - contentStyle.MARGIN_LEFT - contentStyle.MARGIN_RIGHT,
			height: contentHeight
		});

		this._dialogView.content = new BoxBorderView({
			superview: this._dialogView,
			x: contentStyle.MARGIN_LEFT,
			y: contentStyle.MARGIN_TOP,
			image: contentStyle.BACKGROUND,
			width: this._dialogView.style.width - contentStyle.MARGIN_LEFT - contentStyle.MARGIN_RIGHT,
			height: contentHeight,
			zIndex: -1,
			clip: true
		});

		this.setButtons(opts.buttons);
	};

	this._getContentHeight = function (withButtons) {
		var cStyle = menuConstants.DIALOG.CONTENT;
		return this._height - cStyle.MARGIN_TOP - cStyle.MARGIN_BOTTOM -
			(withButtons ? menuConstants.DIALOG.BUTTON.HEIGHT : 0);
	};

	this.setButtons = function (buttons) {
		if (this.buttons && this.buttons.length) {
			this.buttons.forEach(function(button) {
				button.removeFromSuperview();
			});
		}

		buttons = buttons || [];
		var contentHeight = this._getContentHeight(buttons.length);
		this._dialogView.text.updateOpts({ height: contentHeight });
		this._dialogView.content.updateOpts({ height: contentHeight });
		this.buttons = [];

		// Calculate the total width of the buttons...
		var buttonStyle = menuConstants.DIALOG.BUTTON;
		var width = -buttonStyle.MARGIN_RIGHT;
		var evenWidth = this._dialogView.content.style.width / buttons.length;
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].width = buttons[i].width || evenWidth;
			width += buttons[i].width + buttonStyle.MARGIN_RIGHT;
		}
		var x = (this._dialogView.style.width - width) * 0.5;

		for (var i = 0; i < buttons.length; i++) {
			bind(
				this,
				function (button) {
					this.buttons.push(new ButtonView({
						superview: this._dialogView,
						x: x,
						y: this._height - buttonStyle.HEIGHT - buttonStyle.MARGIN_BOTTOM,
						width: button.width,
						height: buttonStyle.HEIGHT,
						title: button.title,
						style: button.style || 'BLUE',
						on: {
							up: bind(this, 'hide', button.cb)
						}
					}));
					x += button.width + buttonStyle.MARGIN_RIGHT;
				}
			)(buttons[i]);
		}
	};

	this.setTitle = function (text) {
		this._dialogView.title.setText(text);
	};

	this.setText = function (text) {
		this._dialogView.text.setText(text);
	};
});