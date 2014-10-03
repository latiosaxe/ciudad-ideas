window.addEvent('domready', function() {

    $$(".expand > a").addEvent('click', function(e){
        e.preventDefault();
        var hijo = $(this).getParent('.expand').getChildren('.vertical_slide')[0];
        if(typeof hijo === 'undefined'){
        }else{
            if(hijo.hasClass('expanded')){
                hijo.removeClass('expanded');
            }else{
                hijo.addClass('expanded');
            }
        }
    });
});