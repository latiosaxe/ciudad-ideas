var ActualSchedule = 1;
var ActualMarginSchedule = 0;

var HoursWidthSchedule = 180;

var TimeSlider = 5000;
var ActualSliderHome = 0;


window.addEvent('domready', function() {
    calculateWidthMore();
    calculateWidthSchedule();

    changeActiveSchedule();

    var idSchedule;
    var schedule_margin = $("schedule_margin");
    $$(".arrow_vertical").addEvent('click',function(e){
        e.preventDefault();
        if(!$(this).hasClass('disabled')){
            idSchedule = $(this).get('id');
            if(idSchedule == 'arrow_up'){
                ActualSchedule --;
                ActualMarginSchedule = schedule_margin.getStyle('margin-top').toInt();
                schedule_margin.setStyle('margin-top',(ActualMarginSchedule + 75));
                changeActiveSchedule();
            }
            if(idSchedule == 'arrow_down'){
                ActualSchedule ++;
                ActualMarginSchedule = schedule_margin.getStyle('margin-top').toInt();
                schedule_margin.setStyle('margin-top',(ActualMarginSchedule - 75));
                changeActiveSchedule();
            }
            if(ActualSchedule <= 0){
                $("arrow_up").addClass('disabled');
            }else{
                $("arrow_up").removeClass('disabled');
            }
            if(ActualSchedule >= 2){
                $("arrow_down").addClass('disabled');
            }else{
                $("arrow_down").removeClass('disabled');
            }
        }
    });


    var TotalCount = [];
    $$("#schedule_hours .infinite ul").each(function(value, index){
        TotalCount.push(parseInt(value.getChildren('li').length));
    });
    var ActualScheduleHour = 0;
    var ActualMarginScheduleHour = 0;
    var MaxCountSchedule = Math.max.apply(Math, TotalCount);

    var hourInfinite = $("hourInfinite");
    var idScheduleHour;
    $$(".arrow_horiz").addEvent('click',function(e){
        e.preventDefault();
        if(!$(this).hasClass('disabled')){
            idScheduleHour = $(this).get('id');
            if(idScheduleHour == 'arrow_left'){
                ActualScheduleHour --;
                ActualMarginScheduleHour = hourInfinite.getStyle('margin-left').toInt();
                hourInfinite.setStyle('margin-left',(ActualMarginScheduleHour + HoursWidthSchedule));
            }
            if(idScheduleHour == 'arrow_right'){
                ActualScheduleHour ++;
                ActualMarginScheduleHour = hourInfinite.getStyle('margin-left').toInt();
                hourInfinite.setStyle('margin-left',(ActualMarginScheduleHour - HoursWidthSchedule));
            }
            if(ActualScheduleHour <= 0){
                $("arrow_left").addClass('disabled');
            }else{
                $("arrow_left").removeClass('disabled');
            }
            if(ActualScheduleHour >= MaxCountSchedule-1){
                $("arrow_right").addClass('disabled');
            }else{
                $("arrow_right").removeClass('disabled');
            }
        }
    });


    var words = $$("#hourInfinite ul li a");
    var numbreLetters, newText;
    words.getChildren('span').each(function(value,index){
        numbreLetters = value.get('text').toString();
        newText = splitStringAtInterval(numbreLetters, 30);
        $$("#hourInfinite ul li a")[index].getChildren('span').set("html", newText);
    });

    $$(".infinite ul").each(function(value, index){
        value.getChildren('li')[0].addClass('li_now_live');
    });
});

window.addEvent("load", function(){
    var total_cards = $$('#display ul li').length;
    var j= 1,k=1;
    var sliderTime = setInterval(function(){
        if(j >= total_cards){
            j=0;
        }
        changeSlide(j);
        j++;
    },TimeSlider);

    var bullets = $("bullets");
    for(k=1;k<=total_cards;k++){
        bullets.innerHTML = bullets.innerHTML + '<li><a href="#"></a></li>';
    }
    $$('#bullets li')[0].addClass('active');

    $$('#bullets li').each(function(el, index) {
        el.addEvent('click', function(event){
            changeSlide(index);
            j=index;
        });
        window.clearInterval(sliderTime);
        sliderTime = window.setInterval(function(){
            if(j >= total_cards){
                j=0;
            }
            changeSlide(j);
            j++;
        },TimeSlider);
    });
});

function changeSlide(element){
    $$('#bullets li').removeClass('active');
    $$('#bullets li')[element].addClass('active');

    $$('#display ul li').addClass('byebye');
    $$('#display ul li')[element].removeClass('byebye');
}

window.addEvent("resize", function(){
    calculateWidthMore();
    calculateWidthSchedule();
});

window.addEvent('orientationchange',function(e) {
    calculateWidthMore();
    calculateWidthSchedule();
});

function calculateWidthMore(){
    var WidthMore = document.getElementById("more_wrap").offsetWidth;
    var singleMore = (WidthMore - 320)/2;
    $$(".more_elements").setStyle('width', Math.floor(singleMore));

    var validateMobile = parseInt($$(".more_elements").getStyle('z-index'));
    if(validateMobile>1){
        singleMore = (WidthMore - 320);
        $$(".more_elements").setStyle('width', Math.floor(singleMore));
    }
}
function calculateWidthSchedule(){
    var WidthSchedule = document.getElementById("schedule_wrapper").offsetWidth;
    var WidthScheduleFix = document.getElementById("schedule_fix").offsetWidth;
    var singleSchedule = (WidthSchedule - 320 - WidthScheduleFix);
    $("schedule_hours").setStyle('width', Math.floor(singleSchedule));
    $("schedule_extra").setStyle('width', Math.floor(singleSchedule + WidthScheduleFix));

    var validateMobile2 = $("schedule_hours").getStyle('z-index');
    if(validateMobile2>1){
        singleSchedule = (WidthSchedule - WidthScheduleFix);
        $("schedule_hours").setStyle('width', Math.floor(singleSchedule));
    }
}

function changeActiveSchedule(){
    $$("#schedule_fix ul li").removeClass('active');
    $$("#schedule_hours .infinite ul li").removeClass('active');

    $$("#schedule_fix ul li")[ActualSchedule].addClass('active');
    var list_schedule = $$("#schedule_hours .infinite ul")[ActualSchedule];
    list_schedule.getChildren("li").each(function(el, i){
        el.addClass('active');
    });
}

function splitStringAtInterval (string, interval) {
    var result = [];
    for (var i=0; i<string.length; i+=interval){
        result.push(string.substring (i, i+interval));
    }
    var total = result.toString().length;
    var goBack = result[0];
    if(total >= 30){
        goBack = result[0] += "...";
    }
    return goBack;
}

function validate_search(){
    var valueSearch = $("site_search").get('value');
    if(valueSearch.length >= 3){
        $("site_search").setStyle('border','2px solid #fff');
        alert("Time to Back End")
    }else{
        $("site_search").setStyle('border','2px solid #dd3f3f');
    }
}
function validate_search_mob(){
    var valueSearch = $("site_search_mob").get('value');
    if(valueSearch.length >= 3){
        $("site_search_mob").setStyle('border','2px solid #808080');
        alert("Time to Back End")
    }else{
        $("site_search_mob").setStyle('border','2px solid #dd3f3f');
    }
}