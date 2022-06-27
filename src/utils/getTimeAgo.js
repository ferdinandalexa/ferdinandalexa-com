const DATE_UNITS = {
  year: 31_104_000,
  month: 2_419_200,
  week: 604_800,
  day: 86_400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000;

function getUnitAndValueDate(seconsElapsed){
  for (const [unit, secondsUnit] of Object.entries(DATE_UNITS)){
    if(seconsElapsed >= secondsUnit || unit === 'second'){
      const value = Math.floor(seconsElapsed / secondsUnit) * -1;
      return {value, unit};
    }
  }
}

export default function getTimeAgo(timestamp, locale='es'){
  const rtf = new Intl.RelativeTimeFormat(locale);
  const seconsElapsed = getSecondsDiff(timestamp);
  const {value, unit} = getUnitAndValueDate(seconsElapsed); 
  return rtf.format(value, unit);
}