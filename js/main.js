jQuery(function ($) {
	// change position of tooltips and switch button
	$('.tooltip1, .btn-area').each(function() {
		var node = $(this).parent().siblings('.acf-label').find('label');
		$(this).appendTo( node );
	});

	// remove hint text in 2nd or more repeater field
	$('.acf-row:not(:first-of-type) .click-toggle-hint-text').remove();

	$(document).on('click', '.hint-btn', function() {
		// toggle class to control switch animation
		$(this).toggleClass('button-on');
		$(this).parent().toggleClass('show');

		// test (stop focusing on input when clicking switch button)
		$(this).parents('.acf-field').find('.acf-input .acf-input-wrap > *').blur();

		// if $('.hint-btn') are children of .acf-repeater.-table
		if ( $(this).parents('.acf-th') ) {
			var tableHintTextParent = $(this).parents('.acf-th[data-key="' + $(this).data('key') + '"]');
			var tableKey = tableHintTextParent.data('key');
			var tableHintText =  $('.hint-text[data-key="' + tableKey +'"]');
			tableHintText.slideToggle();
		}
		var hintTextParent = $(this).parents('.acf-field[data-key="' + $(this).data('key') + '"]');
		var key =  hintTextParent.data( 'key' );
		var hintText = $('.hint-text[data-key="' + key +'"]');

		hintText.slideToggle();
	});

});
