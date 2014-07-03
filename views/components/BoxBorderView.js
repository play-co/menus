import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import menus.styles.style as styles;

exports = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {

		opts = merge(
			opts,
			{
 				image: styles.DIALOG.BACKGROUND,
				scaleMethod: '9slice',
				sourceSlices: styles.BOX_SLICES.SOURCE_SLICES,
				destSlices: styles.BOX_SLICES.DEST_SLICES
			}
		);

		supr(this, 'init', [opts]);

		if ('text' in opts) {
			this.text = new TextView({
				superview: this,
				x: opts.textX || 0,
				y: 0,
				width: opts.textWidth || this.style.width,
				height: this.style.height,
				text: opts.text || '',
				size: opts.fontSize || 30,
				fontFamily: opts.fontFamily,
				color: opts.textColor || '#000000',
				strokeColor: opts.textOutline,
				strokeWidth: ('strokeWidth' in opts) ? opts.strokeWidth : 6,
				padding: opts.textPadding,
				horizontalAlign: opts.horizontalAlign || 'center'
			});
		}
	};

	this.setText = function (txt) {
		this.text.setText(txt);
	};
});
