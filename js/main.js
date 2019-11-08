jQuery(function ($) {
	// change position of hint icon & tooltip
	var tooltipId = [];
	var tooltipKey = [];
	// get id and key of each tooltip
	for ( var i = 0; i < $('.tooltip1').length; i++ ) {
		tooltipId[i] = $('.tooltip1')[i].dataset.id;
		tooltipKey[i] = $('.tooltip1')[i].dataset.key;
	}

	var acfField = $('.tooltip1').parents('.acf-field');
	var label = acfField.find('.acf-label').find('label');

	for ( var i = 0; i < label.length; i++ ) {
		var idTooltip = $('.tooltip1[data-id="' + tooltipId[i] + '"]');
		var keyTooltip = $('.tooltip1[data-key="' + tooltipKey[i] + '"]');
		if ( keyTooltip.parents('.acf-repeater.-table').length ) {
			keyTooltip.appendTo( $('.acf-th[data-key="' + tooltipKey[i] + '"]') );
			continue;
		}
		idTooltip.appendTo( $('label[for="' + tooltipId[i] + '"]') );
	}

	// change position of hint button
	var btnId = [];
	var btnKey = [];
	for ( var i = 0; i < $('.hint-btn').length; i++ ) {
		btnId[i] = $('.hint-btn')[i].dataset.id;
		btnKey[i] = $('.hint-btn')[i].dataset.key;
	}

	var btnAcfField = $('.hint-btn').parents( '.acf-field' );
	var btnLabel = btnAcfField.find( '.acf-label' ).find( 'label' );

	for ( var i = 0; i < btnLabel.length; i++ ) {
		var btn = $('.hint-btn[data-id="' + btnId[i] + '"]');
		var keyBtn = $('.hint-btn[data-key="' + btnKey[i] + '"]');
		// if btn are children of .acf-repeater.-row
		if ( btn.parents('.acf-repeater.-row').length ) {
			btn.wrap( '<div class="button-wrapper"></div>' );
			continue;
		}
		// if keyBtn are children of .acf-repeater.-table
		if ( keyBtn.parents( '.acf-repeater.-table' ).length ) {
			keyBtn.addClass( 'in-repeater-table' );
			keyBtn.appendTo( $('.acf-th[data-key="' + btnKey[i] + '"]') );
			continue;
		}
		btn.appendTo( $('label[for="' + btnId[i] + '"]') );
	}


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
		hintText.slideToggle();
	});

});
