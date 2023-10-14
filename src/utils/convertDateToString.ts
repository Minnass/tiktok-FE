const getDateString = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours
    
  const currentDate = new Date();
  const timeDifference = +currentDate - +date; // Calculate the time difference in milliseconds
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
  var value="";
  if (timeDifference > oneDayInMilliseconds) {
    value = `${month}-${day}-${year}`;
  } else {
    if(timeDifference>0&&timeDifference<60*1000){
        value = `new comment`;
    }
    else if(timeDifference>60*1000&&timeDifference<60*60*1000){
        value = `${Math.floor(timeDifference / (60*1000))} minutes ago`;
    }
    else{
        const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000)); // Convert to hours
        value = `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    }
  }
  return value
  };
  export default getDateString;