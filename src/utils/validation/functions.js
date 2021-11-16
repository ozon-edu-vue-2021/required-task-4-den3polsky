
export const testDate = function(value) {

    let isValid = false
  
    let [day, month, year] = value.split(".");
    month--;
  
    const date = new Date(year, month, day);
  
    if (
      date.getFullYear() == year &&
      date.getMonth() == month &&
      date.getDate() == day &&
      date <= new Date()
    ) {
      isValid = true;
    }
    
    return isValid
  }
  