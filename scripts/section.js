window.addEvent('domready', function() {
    $$(".sec_car div a").addEvent('click', function(e){
        e.preventDefault();
        var parent = $(this).getParent();
        if(parent.hasClass('sec_car_left')){
            $$(".sec_car_right").addClass('sec_car_left').removeClass('sec_car_right');
            $$(".sec_car_center").addClass('sec_car_right temporal1');
//          .addClass('sec_car_center');
            parent.addClass('sec_car_center temporal2');
            $$(".temporal1").removeClass('sec_car_center');
            $$(".temporal2").removeClass('sec_car_left');
            $$(".temporal1").removeClass('temporal1');
            $$(".temporal2").removeClass('temporal2');
        }else if(parent.hasClass('sec_car_right')){
            $$(".sec_car_left").addClass('sec_car_right').removeClass('sec_car_left');
            $$(".sec_car_center").addClass('sec_car_left temporal1');
//          .addClass('sec_car_center');
            parent.addClass('sec_car_center temporal2');
            $$(".temporal1").removeClass('sec_car_center');
            $$(".temporal2").removeClass('sec_car_right');
            $$(".temporal1").removeClass('temporal1');
            $$(".temporal2").removeClass('temporal2');
        }
    });
});