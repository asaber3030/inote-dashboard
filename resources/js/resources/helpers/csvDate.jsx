import {MONTHS_NAMES} from "@/resources/constants";

export default function csvDate(date) {
  let d = new Date(date)
  return `${d.getDate() + '/' + MONTHS_NAMES[d.getMonth()] + '\s' + d.getFullYear() + d.getHours() + ":" + d.getMinutes()}`
}
