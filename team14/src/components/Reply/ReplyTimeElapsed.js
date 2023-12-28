function ReplyTimeElapsed(ReplyDate) {
    var now = new Date();
    var currentTime = now.getTime();
    var secondsElapsed = Math.floor((currentTime - ReplyDate) / 1000);

  
    if (secondsElapsed < 60) {
      return secondsElapsed + " sec";
    } else {
      var minutesElapsed = Math.floor(secondsElapsed / 60);
      if (minutesElapsed < 60) {
        return minutesElapsed + " min";
      } else {
        var hoursElapsed = Math.floor(minutesElapsed / 60);
  
        if (hoursElapsed < 24) {
          return hoursElapsed + " hour";
        } else {
          var daysElapsed = Math.floor(hoursElapsed / 24);
  
          if (daysElapsed < 7) {
            return daysElapsed + (daysElapsed === 1 ? " day" : " days");
          } else if (daysElapsed < 30) {
            var weeksElapsed = Math.floor(daysElapsed / 7);
            return weeksElapsed + (weeksElapsed === 1 ? " week" : " weeks");
          } else if (daysElapsed < 365) {
            var monthsElapsed = Math.floor(daysElapsed / 30);
            return monthsElapsed + (monthsElapsed === 1 ? " month" : " months");
          } else {
            var yearsElapsed = Math.floor(daysElapsed / 365);
            return yearsElapsed + (yearsElapsed === 1 ? " year" : " years");
          }
        }
      }
    }
  }
  

  export default ReplyTimeElapsed;