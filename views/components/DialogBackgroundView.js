import animate;

import ui.View as View;

import menus.constants.menuConstants as menuConstants;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		this.baseWidth = opts.baseWidth || GC.app.baseWidth || (opts.superview ? opts.superview.style.width : undefined);
		this.baseHeight = opts.baseHeight || GC.app.baseHeight || (opts.superview ? opts.superview.style.height : undefined);

		// Don't merge but overwrite...
		opts.x = 0;
		opts.y = 0;
		opts.width = this.baseWidth;
		opts.height = this.baseHeight;
		opts.visible = false;

		supr(this, 'init', [opts]);

		this.style.zIndex = 99999999;

		if (opts.modal) {
			// A darker background is the dialog is shown as a modal...
			this._dialogOverlayView = new View({
				superview: this,
				x: 0,
				y: 0,
				width: this.baseWidth,
				height: this.baseHeight,
				backgroundColor: 'rbga(0, 0, 0)'
			});
		}

		// The container which slides in and out of the screen...
		this._dialogContainerView = new View({
			superview: this,
			x: 0,
			y: 0,
			width: this.baseWidth,
			height: this.baseHeight
		});
	};

	this.show = function (cb) {
		if (this._dialogOverlayView) {
			this._dialogOverlayView.style.opacity = 0;
			animate(this._dialogOverlayView).then({opacity: 0.3}, 300);
		}

		var time = this._opts.showTransitionTime || menuConstants.DIALOG.SHOW_TRANSITION_TIME;
		var dialogContainerView = this._dialogContainerView;
		var dialogContainerStyle = dialogContainerView.style;
		var a;

		switch (this._opts.showTransitionMethod || menuConstants.DIALOG.SHOW_TRANSITION_METHOD) {
			case menuConstants.transitionMethod.SLIDE:
				dialogContainerStyle.x = -this.baseWidth;
				dialogContainerStyle.r = 0;
				dialogContainerStyle.opacity = 1;
				dialogContainerStyle.scale = 1;
				a = animate(dialogContainerView).then({x: 0}, time);
				break;

			case menuConstants.transitionMethod.SCALE:
				dialogContainerStyle.x = 0;
				dialogContainerStyle.r = 0;
				dialogContainerStyle.opacity = 1;
				dialogContainerStyle.scale = 0;
				dialogContainerStyle.anchorX = dialogContainerStyle.width * 0.5;
				dialogContainerStyle.anchorY = dialogContainerStyle.height * 0.5;
				a = animate(dialogContainerView).then({scale: 1}, time);
				break;

			case menuConstants.transitionMethod.FADE:
				dialogContainerStyle.x = 0;
				dialogContainerStyle.r = 0;
				dialogContainerStyle.opacity = 0;
				dialogContainerStyle.scale = 1;
				a = animate(dialogContainerView).then({opacity: 1}, time);
				break;

			case menuConstants.transitionMethod.ROTATE:
				dialogContainerStyle.x = 0;
				dialogContainerStyle.anchorX = dialogContainerStyle.width * 0.5;
				dialogContainerStyle.anchorY = 0;
				dialogContainerStyle.r = -Math.PI;
				dialogContainerStyle.opacity = 1;
				dialogContainerStyle.scale = 1;
				a = animate(dialogContainerView).then({r: 0}, time);
				break;

			default:
				dialogContainerStyle.x = 0;
				dialogContainerStyle.scale = 1;
				break;
		}

		if (a) {
			cb && a.then(cb);
		} else if (cb) {
			cb();
		}

		this.style.visible = true;

		return this;
	};

	this.hide = function (cb) {
		if (this._dialogOverlayView) {
			animate(this._dialogOverlayView).then({opacity: 0}, 300);
		}

		var time = this._opts.hideTransitionTime || menuConstants.DIALOG.HIDE_TRANSITION_TIME;
		var dialogContainerView = this._dialogContainerView;
		var dialogContainerStyle = dialogContainerView.style;
		var a;

		switch (this._opts.hideTransitionMethod || menuConstants.DIALOG.HIDE_TRANSITION_METHOD) {
			case menuConstants.transitionMethod.SLIDE:
				a = animate(dialogContainerView).then({x: this.baseWidth}, time);
				break;

			case menuConstants.transitionMethod.SCALE:
				dialogContainerStyle.anchorX = dialogContainerStyle.width * 0.5;
				dialogContainerStyle.anchorY = dialogContainerStyle.height * 0.5;
				a = animate(this._dialogContainerView).then({scale: 0}, time);
				break;

			case menuConstants.transitionMethod.FADE:
				a = animate(dialogContainerView).then({opacity: 0}, time);
				break;

			case menuConstants.transitionMethod.ROTATE:
				a = animate(dialogContainerView).then({r: Math.PI}, time);
				break;

			default:
				this.style.visible = false;
				cb && cb();
				break;
		}

		if (a) {
			a = a.then(bind(this, function () { this.style.visible = false}));
			a.then(
				bind(
					this,
					function () {
						cb && cb();
						this.emit('Hide');
					}
				)
			);
		} else if (cb) {
			cb();
			this.emit('Hide');
		}

		return this;
	};
});