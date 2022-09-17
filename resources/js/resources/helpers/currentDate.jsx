import { appendZero } from "@/resources/helpers/appendZero";

export function currentDate() {
  let currentDateObj = new Date();
  return {
    month: appendZero(currentDateObj.getMonth() + 1),
    year: currentDateObj.getFullYear(),
    day: appendZero(currentDateObj.getDate())
  }

}
