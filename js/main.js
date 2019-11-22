jQuery(function ($) {
	// change position of tooltips and switch button
	// 穴原さんのリファクタリングコード
	$('.tooltip1, .hint-btn').each(function() {
		var node = $(this).parent().siblings('.acf-label').find('label');
		$(this).appendTo( node );
	});


	$(document).on('click', '.hint-btn', function() {
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

		// test
		if ( $('.hint-btn[data-key="' + key + '"] input[type="checkbox"]').prop('checked') ) {
			hintText.slideDown();
		} else {
			hintText.slideUp();
		}
		// hintText.slideToggle();
	});

});
