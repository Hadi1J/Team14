function ReplyTimeElapsed(ReplyDate) {
    var now = new Date();
    var currentTime = now.getTime();
    var secondsElapsed = Math.floor((currentTime - ReplyDate) / 1000);

    if (secondsElapsed < 60) {
      return secondsElapsed + " sec";
    }
     else 
     {
      var minutesElapsed = Math.floor(secondsElapsed / 60);
      if (minutesElapsed < 60) 
      {
        return minutesElapsed + " min";
      } 
      else 
      {
        var hoursElapsed = Math.floor(minutesElapsed / 60);


        if(hoursElapsed<24)

        {return hoursElapsed + " hour";}

        else{

          var daysElapsed =Math.floor(hoursElapsed / 24)
          return daysElapsed + " day ";
        }

      }
    }
  }

  export default ReplyTimeElapsed;