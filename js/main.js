jQuery(function ($) {
	// change position of tooltips and switch button
	$('.acf-hint-tooltip, .btn-area').each(function() {
		var node = $(this).parent().siblings('.acf-label').find('label');
		$(this).appendTo( node );
	});

	// remove hint text in 2nd or more repeater field
	$('.acf-row:not(:first-of-type) .click-toggle-hint-text').remove();

	// click event for hint button
	$(document).on('click', '.hint-btn', function() {
		// toggle class to control switch animation
		$(this).parent().toggleClass('show');

		// show/hide hint text with accordion animation
		var hintText = $(this).parents('.acf-field').find('.hint-text[data-key="' + $(this).data( 'key' ) +'"]')
		hintText.slideToggle();
	});

	// test(put two rows into one in acf setting)
	$('td.acf-label:has(label[for$="hint_text"])').addClass('acf-parent');
	$('td.acf-input:has([id$="hint_text"])').addClass('acf-parent');

});
