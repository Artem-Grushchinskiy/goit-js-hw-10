export function fetchCountries(name) {
  const result = fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response;
  });

  return result;
}
