export const DateExcel2JavaScript = function (date) {
  return new Date((date - (25567 + 1)) * 86400 * 1000);
}
