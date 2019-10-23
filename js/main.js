jQuery(function ($) {
    var parent = $('.hint-btn').parents('.acf-field');
    var hintBtn = $('.hint-btn');
    // positionでのボタンの移動(実装途中)
    // $(window).load(function() {
    //     var xpos = parent.innerWidth() - ( hintBtn.position().left + hintBtn.outerWidth() );
    //     var ypos = parent.offset().top;
    //     hintBtn.offset({top: ypos, left: xpos});
    // });

    $(window).load(function() {
        // prependでのボタンの移動(実装途中)
        // if ( ! $('.acf-field > .hint-btn') ) {
        //     parent.prepend(hintBtn);
        // }
        // parent.prepend(hintBtn);

        // click event
        $('.hint-btn').on('click', function() {
            let $hintText = $(this).parent().find('.hint-text');
            var $acfField = $(this).parents('.acf-field');
            // hint用テキストの移動(実装途中)
            if ( $hintText.css('display') == 'block' ) {
                $hintText.slideUp();
                $hintText = $hintText.detach();
            } else {
                $hintText.slideDown();
                $acfField.append($hintText);
            }
            // $acfField.append($hintText);
            // $hintText.slideToggle();
    
        });
    });
});