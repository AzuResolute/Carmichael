const DateExcel2JavaScript = function (date) {
  let day = new Date((date - (25567)) * 86400 * 1000);
  if(Object.prototype.toString.call(day) === "[object Date]") {
    if (isNaN(day.getTime())) {  // d.valueOf() could also work
      // date is not valid
    } else {
      return day
      // date is valid
    }
  }
}

module.exports = {DateExcel2JavaScript}
