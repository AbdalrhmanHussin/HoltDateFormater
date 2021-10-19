
export default {
    install : function(app,option) {
        app.directive('HoltFormater',(el,binding,vnode) => {
            let monthShortArr  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let monthLongArr   = ['January','Feberuary','March','April','May','June','July','Augest','September','Octuber','November','December'];
            let daysLongtArr   = ['Saterday','Sunday','Monday','Tuesday','Wensday','Thursday','Friday'];
            let daysShortArr   = ['Sat','Sun','Mon','Tue','Wen','Thu','Fri'];

            //The provided
            let providerDate   = new Date(binding.value);
            let pHour = providerDate.getHours();
            let pMin  = providerDate.getMinutes();
            let pSec  = providerDate.getSeconds();
            let pDay  = providerDate.getDate();
            let pMonth = providerDate.getMonth();
            let pYear = providerDate.getFullYear();
            let dayInWeek = providerDate.getDay();

            //Date of today
            let now = new Date();
            let month  = now.getMonth();
            let year   = now.getFullYear();
            let day    = now.getDate();
            let hour   = now.getHours();
            let min    = now.getMinutes();
            let sec    = now.getSeconds();
            
            //Check if the day in the provided date is in past or future
            let isPast =  (now,date) => {
                return (now > providerDate)  ? true : false;
            }

            let abs =  (x) => {
                return Math.abs(x);
            }

            //get days,months,years between the provided date and now
            let dateDiff  = (time1,time2) => {
                let difference = (time2 - time1)/ (1000 * 3600 * 24);
                let diffDays   = isPast(time1,time2) ? abs((Math.floor(difference))) : abs((Math.ceil(difference)));
                console.log(diffDays);
                let countDays  = Math.abs(diffDays);
                let countMonths = countDays/30;
                let countYears  = countMonths/ 12;
                let leftMonth   = Math.round((Math.round(parseFloat(countYears).toFixed(1) * 100)/100)%1 * 10);
                let leftDay     = Math.round((Math.round(parseFloat(countMonths).toFixed(1) * 100)/100)%1 * 10);
                let date;
                if(diffDays < 30)
                {
                    return abs(diffDays);
                } else if (Math.floor(countMonths) < 12) 
                {
                    let months = abs(Math.floor(countMonths)) + ' Month';  
                    let dayLeft = ((option['options'].percies && leftDay) ? abs(leftDay)  + ' days': '');
                    return months + ' ' +dayLeft;
                } else if (Math.floor(countYears) !== 0) 
                {
                    console.log('here')
                    let years = abs(Math.floor(countYears)) + ' Year';
                    let monthLeft = ((option['options'].percies && leftMonth) ? abs(leftMonth)  + ' Month': '');
                    return years + ' ' + monthLeft;
                }
            }

            if(option['options'].shortTrack)
            {

                if(day == pDay && month == pMonth && year == pYear)
                {
                    el.innerText = "Today";
                    return false;
                } else if(day - 1 == pDay && month == pMonth && year == pYear ) {
                    el.innerText = "Yesterday";
                    return false;
                } else if(day  == pDay - 1 && month == pMonth && year == pYear) {
                    el.innerText = "Tommorrow";
                    return false;
                }
                
            }

            if(option['options'].longTrack)
            {
                let ago = (isPast(now,providerDate)) ? ' ago' : '';
                el.innerText = dateDiff(now,providerDate) + ago ;
                return false;  
            }

            if(option['options'].formate)
            {
                let str = binding.arg;

                pHour = (pHour < 10) ? pHour + '0' : pHour;
                pMin  = (pMin < 10) ? pMin + '0' : pMin;
                pSec  = (pSec < 10) ? pSec + '0' : pSec;

                str = str.replace('dd',pDay);
                str = str.replace('ll',daysLongtArr[dayInWeek]);
                str = str.replace('ss',daysShortArr[dayInWeek]);
                str = str.replace('qq',monthShortArr[pMonth]);
                str = str.replace('ww',monthLongArr[pMonth]);
                str = str.replace('jj',pMonth);
                str = str.replace('yy',pYear);
                str = str.replace('tt',pYear);
                str = str.replace('hh',pHour);
                str = str.replace('ii',pHour);
                str = str.replace('zz',pSec);

                el.innerText = str;
            }

           });
    }
}