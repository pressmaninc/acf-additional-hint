$(function() {
    $('.hint-btn').on('click', function() {
        let $hintText = $(this).parent().find('.hint-text');
        $hintText.fadeToggle();

        $(this).toggleClass('shown');

        if ($('.hint-btn').hasClass('shown')) {
            $(this).text('Unshow hint');
        } else {
            $(this).text('Show hint');
        }
    });
});