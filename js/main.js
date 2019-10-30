jQuery(function ($) {
    // change position of hint icon & tooltip
    var tooltipId = []
    // get id of each tooltip
    for (var i = 0; i < $('.tooltip1').length; i++) {
        tooltipId[i] = $('.tooltip1')[i].dataset.id;
    }

    var acfField = $('.tooltip1').parents('.acf-field');
    var label = acfField.find('.acf-label').find('label');

    // tooltipIdをdata-idにもつ各.tooltip1要素を取得して変数tooltipに代入、tooltipIdに一致するfor属性をもつlabelにtooltipをappendToする
    for (var i = 0; i < label.length; i++) {
        var tooltip = $('.tooltip1[data-id="' + tooltipId[i] + '"]');
        tooltip.appendTo($('label[for="' + tooltipId[i] + '"]'));
    }

    // change position of hint button
    var btnId = [];
    for (var i = 0; i < $('.hint-btn').length; i++) {
        btnId[i] = $('.hint-btn')[i].dataset.id;
    }

    var btnAcfField = $('.hint-btn').parents('.acf-field');
    var btnLabel = btnAcfField.find('.acf-label').find('label');

    for (var i = 0; i < btnLabel.length; i++) {
        var btn = $('.hint-btn[data-id="' + btnId[i] + '"]');
        // .acf-field-repeater(繰り返しフィールド)の子要素の時だけ処理を抜ける(btn.appendToをさせない)
        if ( btn.parents('.acf-field-repeater').length != 0 ) {
            continue;
        }
        btn.appendTo($('label[for="' + btnId[i] + '"]'));
    }

    $(document).on('click', '.hint-btn', function() {
        let hintText = $(this).parents('.acf-field').find('.hint-text');
        hintText.slideToggle();
    });




    // $(window).load(function() {
    //     click event
    //     $('.hint-btn').on('click', function() {
    //         let hintText = $(this).parent().find('.hint-text');
    //         hintText.toggleClass('show');
    //         hintText.slideToggle();
    //     });
    // });
});