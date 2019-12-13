(function( $ ) {
	// Change position of tooltips and switch button.
	$( '.acf-hint-tooltip, .btn-area' ).each(function() {
		var $node = $( this ).parent().siblings( '.acf-label' ).find( 'label' );
		$( this ).appendTo( $node );
	});

	// Click event for hint button.
	$( document ).on('click', '.hint-btn', function() {
		// Toggle class to control switch animation.
		$( this ).parent().toggleClass( 'show' );

		// Show/hide hint text with accordion animation.
		var $hintText = $( this )
		.parents( '.acf-field' )
		.find( '.hint-text[data-key="' + $( this ).data( 'key' ) + '"]' );
		$hintText.slideToggle();
	});

	// Put two rows into one in acf setting page.
	$( 'td.acf-label:has(label[for$="hint_text"])' ).addClass( 'row-border-none' );
	$( 'td.acf-input:has([id$="hint_text"])' ).addClass( 'row-border-none' );

})( jQuery );
