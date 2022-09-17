import { DAYS_NAMES_IN_ARABIC, MONTHS_NAMES_IN_ARABIC } from "@/resources/constants";

export default function dateLanguage(formatDate, language = 'english', options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}) {

  if (language == 'english') {
    return new Date(formatDate).toLocaleDateString("en-US", options)
  } else if (language == 'arabic') {
    let date = new Date(formatDate)
    let finalDate = DAYS_NAMES_IN_ARABIC[date.getDay()] + ' ' + date.getDate() + ' ' + MONTHS_NAMES_IN_ARABIC[date.getMonth()] + ' ' + date.getFullYear()
    return finalDate;
  }

}
