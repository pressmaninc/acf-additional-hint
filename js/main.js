jQuery(function ($) {
    // change position of hint icon & tooltip
    var tooltipId = []
    var tooltipKey = [];
    // get id of each tooltip
    for (var i = 0; i < $('.tooltip1').length; i++) {
        tooltipId[i] = $('.tooltip1')[i].dataset.id;
        tooltipKey[i] = $('.tooltip1')[i].dataset.key;
    }

    var acfField = $('.tooltip1').parents('.acf-field');
    var label = acfField.find('.acf-label').find('label');

    // tooltipIdをdata-idにもつ各.tooltip1要素を取得して変数tooltipに代入、tooltipIdに一致するfor属性をもつlabelにtooltipをappendToする
    for (var i = 0; i < label.length; i++) {
        var idTooltip = $('.tooltip1[data-id="' + tooltipId[i] + '"]');
        var keyTooltip = $('.tooltip1[data-key="' + tooltipKey[i] + '"]');
        if ( keyTooltip.parents('.acf-repeater.-table').length ) {
            keyTooltip.appendTo( $('.acf-th[data-key="' + tooltipKey[i] + '"]') );
            continue;
        }
        idTooltip.appendTo($('label[for="' + tooltipId[i] + '"]'));
    }

    // change position of hint button
    var btnId = [];
    var btnKey = [];
    for (var i = 0; i < $('.hint-btn').length; i++) {
        btnId[i] = $('.hint-btn')[i].dataset.id;
        btnKey[i] = $('.hint-btn')[i].dataset.key;
    }

    var btnAcfField = $('.hint-btn').parents('.acf-field');
    var btnLabel = btnAcfField.find('.acf-label').find('label');

    for (var i = 0; i < btnLabel.length; i++) {
        var btn = $('.hint-btn[data-id="' + btnId[i] + '"]');
        var keyBtn = $('.hint-btn[data-key="' + btnKey[i] + '"]');
        // .acf-repeater.-row(繰り返しフィールドの行)の子要素の時だけdiv.btn-wrapperを親要素として追加して、処理を抜ける(btn.appendToをさせない)
        if ( btn.parents('.acf-repeater.-row').length ) {
            // ..acf-repeater.-row内のボタン用処理
            btn.wrap('<div class="button-wrapper"></div>');
            continue;
        }
        // .acf-repeater.-tableが親要素にある場合
        if ( keyBtn.parents('.acf-repeater.-table').length ) {
            keyBtn.appendTo( $('.acf-th[data-key="' + btnKey[i] + '"]') );
            continue;
        }
        btn.appendTo($('label[for="' + btnId[i] + '"]'));
    }


    // keyに一致する.hint-textをclick toggle
    // $(document).on('click', '.hint-btn', function() {
    //     let hintTextParent = $(this).parents('.acf-field');
    //     let key =  hintTextParent.data('key');
    //     let hintText = $('.hint-text[data-key="' + key +'"]');
    //     hintText.slideToggle();
    // });

    $(document).on('click', '.hint-btn', function() {
        // とりあえず動くコード(リファクタリングが必要そう)
        // .acf-repeater.-tableがある場合
        if ( $(this).parents('.acf-th') ) {
            var tableHintTextParent = $(this).parents('.acf-th[data-key="' + $(this).data('key') + '"]');
            var tableKey = tableHintTextParent.data('key');
            var tableHintText =  $('.hint-text[data-key="' + tableKey +'"]');
            tableHintText.slideToggle();
        }
        let hintTextParent = $(this).parents('.acf-field[data-key="' + $(this).data('key') + '"]');
        let key =  hintTextParent.data('key');
        let hintText = $('.hint-text[data-key="' + key +'"]');
        hintText.slideToggle();
    });

});