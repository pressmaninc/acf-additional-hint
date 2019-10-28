jQuery(function ($) {
    // change position of hint icon & tooltip
    var tooltipId = []
    // get id of each tooltip
    for (var i = 0; i < $('.tooltip1').length; i++) {
        tooltipId[i] = $('.tooltip1')[i].dataset.id;
    }
    

    var acfField = $('.tooltip1').parents('.acf-field');
    var label = acfField.find('.acf-label').find('label');
    // それぞれのlabelのHTMLは取得できている
    // console.log(label);

    // labelのforの値取得(get "for" value of each label)
    var forvalue = [];
    for (var i = 0; i < label.length; i++) {
        forvalue[i] = label[i].htmlFor;
        // console.log(forvalue[i]);
    }

    // tooltipIdとforvalueが一致すれば、tooltipIdをdata-idにもつtooltipを取得してforvalueに一致するfor属性をもつlabelにtooltipをappendToする
    for (var i = 0; i < label.length; i++) {
        if ( tooltipId[i] == forvalue[i] ) {
            var tooltip = $('.tooltip1[data-id="' + tooltipId[i] + '"]');
            tooltip.appendTo($('label[for="' + forvalue[i] + '"]'));
        }
    }


    $(window).load(function() {
        // click event
        $('.hint-btn').on('click', function() {
            // 変更しなくていい箇所
            let hintText = $(this).parent().find('.hint-text');
            hintText.toggleClass('show');
            hintText.slideToggle();
        });
    });
});