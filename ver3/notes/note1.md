[ex] <tag:example.org,2026:>
[schema] <http://schema.org/>

# Алиса {=ex:alice .schema:Person schema:name}

Алиса — вымышленная персона для тестирования семантической разметки MD-LD.

Адрес Алисы: [Адрес Алисы] {+ex:alice-addr ?schema:address}.

Алиса увлекается [фотографией] {+ex:alice-hobby-photo ?schema:knowsAbout}
и [шахматами] {+ex:alice-hobby-chess ?schema:knowsAbout}.

## Адрес Алисы {=ex:alice-addr .schema:PostalAddress schema:name}

[ул. Ленина, д. 10] {schema:streetAddress}
[Москва] {schema:addressLocality}
[101000] {schema:postalCode}
[Россия] {schema:addressCountry}

## Фотография {=ex:alice-hobby-photo .schema:Thing schema:name}

## Шахматы {=ex:alice-hobby-chess .schema:Thing schema:name}

# Боб {=ex:bob .schema:Person schema:name}

Боб — второй вымышленный персонаж.

Адрес Боба: [Адрес Боба] {+ex:bob-addr ?schema:address}.

Боб увлекается [велоспортом] {+ex:bob-hobby-bike ?schema:knowsAbout}
и [программированием] {+ex:bob-hobby-code ?schema:knowsAbout}.

## Адрес Боба {=ex:bob-addr .schema:PostalAddress schema:name}

[ул. Пушкина, д. 25] {schema:streetAddress}
[Химки] {schema:addressLocality}
[141400] {schema:postalCode}
[Россия] {schema:addressCountry}

## Велоспорт {=ex:bob-hobby-bike .schema:Thing schema:name}

## Программирование {=ex:bob-hobby-code .schema:Thing schema:name}
