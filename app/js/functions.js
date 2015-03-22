function displayError(object) {

    var prependTo = object.prependTo ? object.prependTo : 'body > div.container';

    var div = jQuery('<div>', {
        class: 'alert alert-danger alert-dismissible',
        role: 'alert'
    });

    var button = jQuery('<button>', {
        type: 'button',
        class: 'close',
        'data-dissmiss': 'alert',
        'html': '<span>&times</span>'
    });
    button.click(function(){
        div.alert('close');
    });

    div.append(button).append(object.text).prependTo(jQuery(prependTo));
}

