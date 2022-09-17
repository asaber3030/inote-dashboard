import { ArabicTranslations } from "@/resources/translations/arabic";
import { EnglishTranslations } from "@/resources/translations/english"

import axios from "axios";

export default function translate(key, lang = 'english') {

  if (lang == 'english') {
    if (EnglishTranslations[key]) {
      return EnglishTranslations[key]
    } else {
      return `${key}`.charAt(0).toUpperCase() + `${key}`.slice(1)
    }
  } else if (lang == 'arabic') {
    if (ArabicTranslations[key]) {
      return ArabicTranslations[key]
    } else {
      return `${key}`.charAt(0).toUpperCase() + `${key}`.slice(1)
    }
  } else {
    return EnglishTranslations[key]
  }
}
