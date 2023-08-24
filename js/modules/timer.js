

function timer() {

    const deadline = '2023-09-02';

    function getRemainingTime(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / 1000 / 60 / 60 / 24),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60) ,
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }
        else{
            return num;
        }
    };


    function setClock(selector, endTime){

        const timer = document.querySelector(selector),
              days = document.getElementById('days'),
              hours = document.getElementById('hours'),
              minutes = document.getElementById('minutes'),
              seconds = document.getElementById('seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getRemainingTime(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;