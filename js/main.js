jQuery(function ($) {
    // change position of hint icon & tooltip
    // var parent = $('.tooltip1').parents('.acf-field');
    // var fieldTitle = parent.find('.acf-label').find('label');
    // fieldTitle.append($('.tooltip1'));


    $(window).load(function() {
        // click event
        $('.hint-btn').on('click', function() {
            let $hintText = $(this).parent().find('.hint-text');
            var $acfField = $(this).parents('.acf-field');
            $hintText.slideToggle();
    
        });
    });
});