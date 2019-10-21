jQuery(function ($) {
    $hintIcon = $('.hint-icon');
    $hintIcon.position = "absolute";
    $hintIcon.top = "0px";

    $('.hint-btn').on('click', function() {
        let $hintText = $(this).parent().find('.hint-text');
        var $acfField = $(this).parents('.acf-field');
        // $acfField.append($hintText);

        $hintText.slideToggle();

    });
});