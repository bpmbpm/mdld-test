[ex] <tag:example.org,2026:>

# Алиса {=ex:alice .schema:Person schema:name}

Алиса — вымышленная персона для тестирования семантической разметки MD-LD.

## Адрес Алисы {+ex:alice-addr ?schema:address .schema:PostalAddress schema:name}

- [ул. Ленина, д. 10] {schema:streetAddress}
- [Москва] {schema:addressLocality}
- [101000] {schema:postalCode}
- [Россия] {schema:addressCountry}

## Увлечения Алисы

Алиса увлекается [фотографией] {+ex:alice-hobby-photo ?schema:knowsAbout .schema:Thing schema:name}
и [шахматами] {+ex:alice-hobby-chess ?schema:knowsAbout .schema:Thing schema:name}.

# Боб {=ex:bob .schema:Person schema:name}

Боб — второй вымышленный персона.

## Адрес Боба {+ex:bob-addr ?schema:address .schema:PostalAddress schema:name}

- [ул. Пушкина, д. 25] {schema:streetAddress}
- [Химки] {schema:addressLocality}
- [141400] {schema:postalCode}
- [Россия] {schema:addressCountry}

## Увлечения Боба

Боб увлекается [велоспортом] {+ex:bob-hobby-bike ?schema:knowsAbout .schema:Thing schema:name}
и [программированием] {+ex:bob-hobby-code ?schema:knowsAbout .schema:Thing schema:name}.
