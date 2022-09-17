export const APP_URL = 'http://127.0.0.1:8000/'
export const APP_NAME = 'INote'
export const MONTHS_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTHS_NAMES_IN_ARABIC = [
  "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
]
export const DAYS_NAMES_IN_ARABIC = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"]

export const CONTRACTOR_TYPE = {
  0: 'Daily',
  1: 'Meter',
  2: 'Equipment'
}

export const CONTRACTOR_WORKER_TYPE = {
  0: 'Worker',
  1: 'Technician'
}

export const CONTRACTOR_SHEETS_TYPES = {
  meters: 'Contractor Meters',
  techs: 'Contractor Technicians',
  workers: 'Contractor Workers',
  equipments: 'Contractor Equipments',
};

export const CONTRACTOR_SHEETS_TYPES_ARR = [
  'Contractor Workers',
  'Contractor Technicians',
  'Contractor Meters',
  'Contractor Equipments',
];

export const THEMES = [
  { themeName: 'Light', themeCode: 'light' },
  { themeName: 'Dark', themeCode: 'dark' }
]

export const LANUGAGES = [
  { langName: 'Arabic', langCode: 'arabic' },
  { langName: 'English', langCode: 'english' }
]

export const ADMIN_ROLES = {
  0: 'Engineer',
  1: 'Admin',
  2: 'Super Admin'
}
