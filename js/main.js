jQuery(function( $ ) {
	// Change position of tooltips and switch button.
	$( '.acf-hint-tooltip, .btn-area' ).each(function() {
		// Change position of tooltips and switch button.
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

	// Hover event for tooltip.
	$( '.acf-hint-tooltip' ).hover(
		function () {
			var documentHeight = $( document ).height();
			$( this ).addClass( 'hover' );

			var $description = $( this ).children( '.acf-hint-description' );
			$description.css( 'margin-top', '' );

			// Calculates distance from icon to the right side of window. (and subtract 10px from the distance for the margin.)
			const iconOffsetLeft = $( this ).offset().left;
			const iconWidth = $( this ).children( '.hint-icon' ).width();
			const iconToWindowDistance = window.innerWidth - ( iconOffsetLeft + iconWidth ) - 40;

			// Add inline span tag to get width of the text.
			$('<span>', { class: 'text', html: $description.html() })
			.appendTo( $( this ).parents( '.acf-label' ) )
			.css( 'visibility', 'hidden' );
			// Get width of the text.
			const textWidth = $(this).parents( '.acf-label' ).children('.text').width();
			$(this).parents( '.acf-label' ).children('.text').remove();

			// Set width of the tooltip.
			let width = textWidth < iconToWindowDistance ? textWidth : iconToWindowDistance;
			$description.width( width );

			var descPosition = $description.offset(),
				descHeight = $description.outerHeight();

			if ( documentHeight < descPosition.top + descHeight + 20 ) {
				$description.css( 'margin-top', documentHeight - ( descPosition.top + descHeight + 20 ) );
			}
		},
		function () {
			$( this ).removeClass( 'hover' );
		}
	);
});
