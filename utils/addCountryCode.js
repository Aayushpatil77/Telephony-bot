function IsCountryCodePresent(number) {
    if (String(number).length > 10) {
      return true;
    }
    return false;
  }

export default function addCountryCode(CountryCode, number) {
    if (!IsCountryCodePresent(number)) {
      return "+" + String(CountryCode) + number;
    }
  
    return "+" + String(number);
  }