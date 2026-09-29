## 1 
Подробно разбери в двух вариантах: 
Первый для знающих RDF
второй для не знающих RDF
```turtle
@prefix schema: <http://schema.org/>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<tag:example.org,2026:alice> a schema:Person;
    schema:name "Алиса".
<tag:example.org,2026:alice-addr> a schema:PostalAddress.
<tag:example.org,2026:alice> schema:address <tag:example.org,2026:alice-addr>.
<tag:example.org,2026:alice-addr> schema:name "Адрес Алисы".
<tag:example.org,2026:alice> schema:streetAddress "[ул. Ленина, д. 10]";
    schema:addressLocality "[Москва]";
    schema:postalCode "[101000]";
    schema:addressCountry "[Россия]".
<tag:example.org,2026:alice-hobby-photo> a schema:Thing.
<tag:example.org,2026:alice> schema:knowsAbout <tag:example.org,2026:alice-hobby-photo>.
<tag:example.org,2026:alice-hobby-photo> schema:name "фотографией".
<tag:example.org,2026:alice-hobby-chess> a schema:Thing.
<tag:example.org,2026:alice> schema:knowsAbout <tag:example.org,2026:alice-hobby-chess>.
<tag:example.org,2026:alice-hobby-chess> schema:name "шахматами".
```

Разберём этот Turtle-документ в двух вариантах: сначала для тех, кто уже знаком с RDF, затем — в максимально простой форме.

---

# Вариант 1. Для знающих RDF

## Общая структура

Документ описывает одного человека (`alice`), её адрес (`alice-addr`) и два увлечения (`alice-hobby-photo`, `alice-hobby-chess`). Используется словарь Schema.org и пространство имён `tag:example.org,2026:` (RFC 4151, самоопределяемый URI).

## Разбор по блокам

### 1. Префиксы

```turtle
@prefix schema: <http://schema.org/>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
```

Четыре стандартных префикса. `rdfs`, `rdf`, `xsd` объявлены, но в документе не используются — это «наследие» генератора, который всегда пишет их в шапку.

### 2. Алиса — персона

```turtle
<tag:example.org,2026:alice> a schema:Person;
    schema:name "Алиса".
```

- `a` — сокращение для `rdf:type`. Триплет: `alice rdf:type schema:Person`.
- `schema:name "Алиса"` — литерал без языка и типа, по умолчанию `xsd:string`.
- `;` — группировка предикатов для одного субъекта.

### 3. Адрес — отдельная сущность

```turtle
<tag:example.org,2026:alice-addr> a schema:PostalAddress.
<tag:example.org,2026:alice> schema:address <tag:example.org,2026:alice-addr>.
<tag:example.org,2026:alice-addr> schema:name "Адрес Алисы".
```

- `alice-addr` — это **отдельный узел** (не литерал), типизированный как `schema:PostalAddress`.
- `alice schema:address alice-addr` — связь между персоной и её адресом.
- `alice-addr schema:name "Адрес Алисы"` — метка адреса.

### 4. ⚠️ Поля адреса — семантическая ошибка

```turtle
<tag:example.org,2026:alice> schema:streetAddress "[ул. Ленина, д. 10]";
    schema:addressLocality "[Москва]";
    schema:postalCode "[101000]";
    schema:addressCountry "[Россия]".
```

**Проблема:** эти свойства привязаны к `alice`, а не к `alice-addr`. В Schema.org `streetAddress`, `addressLocality`, `postalCode`, `addressCountry` — свойства класса `PostalAddress`, а не `Person`. Правильно было бы:

```turtle
<tag:example.org,2026:alice-addr> schema:streetAddress "ул. Ленина, д. 10";
    schema:addressLocality "Москва";
    schema:postalCode "101000";
    schema:addressCountry "Россия".
```

Причина ошибки — в исходном MD-LD: аннотация `{+ex:alice-addr ...}` создаёт **временный объект**, но не переключает текущий субъект. Последующие строки `[ул. Ленина, д. 10] {schema:streetAddress}` по-прежнему относятся к `alice`.

**Вторая проблема:** квадратные скобки `[ул. Ленина, д. 10]` попали в литерал. В MD-LD `[...]` — это носитель значения, скобки не должны сохраняться. Правильно: `"ул. Ленина, д. 10"`.

### 5. Увлечения

```turtle
<tag:example.org,2026:alice-hobby-photo> a schema:Thing.
<tag:example.org,2026:alice> schema:knowsAbout <tag:example.org,2026:alice-hobby-photo>.
<tag:example.org,2026:alice-hobby-photo> schema:name "фотографией".
```

- `alice-hobby-photo` — отдельный узел типа `schema:Thing`.
- `alice schema:knowsAbout alice-hobby-photo` — связь «Алиса разбирается в фотографии».
- `schema:name "фотографией"` — творительный падеж («увлекается фотографией») сохранён как метка. Семантически корректнее было бы `"фотография"`.

То же для `alice-hobby-chess` → `"шахматами"`.

## Итог для RDF-специалиста

| Аспект | Оценка |
|---|---|
| Синтаксис Turtle | Валиден, но `rdfs`, `rdf`, `xsd` не используются |
| Онтология | Schema.org применён корректно, кроме полей адреса |
| Семантика адреса | ❌ Ошибка: поля адреса на `alice`, а не на `alice-addr` |
| Литералы | ❌ Квадратные скобки внутри строк — артефакт MD-LD |
| Падежи | ⚠️ Метки в творительном падеже («фотографией») — не идеально |
| Named graphs | Отсутствуют: всё в default graph |

---

# Вариант 2. Для не знающих RDF

## Аналогия: карточки в картотеке

Представьте, что у вас есть **картотека**. Каждая карточка — это отдельная сущность. На карточке написано её имя и набор фактов о ней.

Turtle — это способ **записать карточки текстом**. Каждая строка — один факт. Факт состоит из трёх частей:

```
КТО → ЧТО ДЕЛАЕТ / ЧЕМ ЯВЛЯЕТСЯ → ЗНАЧЕНИЕ
```

Это называется **триплет** (тройка).

## Что написано в вашем документе

### 1. Сокращения в начале

```turtle
@prefix schema: <http://schema.org/>.
```

Это как **сокращения в словаре**. Вместо того чтобы каждый раз писать `http://schema.org/name`, можно писать `schema:name`. Договорились, что `schema` = `http://schema.org/`.

Аналогия: вместо «Московская область, город Москва, улица Ленина» вы пишете «Москва, ул. Ленина».

### 2. Карточка Алисы

```turtle
<tag:example.org,2026:alice> a schema:Person;
    schema:name "Алиса".
```

Перевод на русский:

- **Карточка Алисы** — это **Человек**.
- **Имя карточки Алисы** — «Алиса».

`a` — это сокращение для «является». `<tag:...alice>` — уникальный номер карточки (как штрих-код).

### 3. Карточка адреса

```turtle
<tag:example.org,2026:alice-addr> a schema:PostalAddress.
```

Отдельная карточка с номером `alice-addr`. Она — **Почтовый адрес**.

```turtle
<tag:example.org,2026:alice> schema:address <tag:example.org,2026:alice-addr>.
```

**У карточки Алисы** есть **адрес**, и этот адрес — **карточка alice-addr**.

То есть: «Алиса → её адрес → карточка alice-addr». Это ссылка с одной карточки на другую.

### 4. ⚠️ Здесь ошибка

```turtle
<tag:example.org,2026:alice> schema:streetAddress "[ул. Ленина, д. 10]";
    schema:addressLocality "[Москва]";
    ...
```

Перевод:

- **У карточки Алисы** → **улица** → «[ул. Ленина, д. 10]».
- **У карточки Алисы** → **город** → «[Москва]».

Но по логике это должно быть **у карточки адреса**, а не у Алисы! Улица, город, индекс — это свойства **адреса**, а не человека. Правильно было бы:

```turtle
<tag:example.org,2026:alice-addr> schema:streetAddress "ул. Ленина, д. 10";
    schema:addressLocality "Москва";
    ...
```

**Аналогия ошибки:** вы записали «У Алисы — улица Ленина». Но правильнее: «У адреса Алисы — улица Ленина». Алиса сама по себе не имеет улицы — её имеет её адрес.

**Вторая ошибка:** квадратные скобки `[ул. Ленина, д. 10]` остались внутри значения. В итоге в карточке написано буквально «[ул. Ленина, д. 10]» вместе со скобками. Это как если бы вы в анкете написали «[Иванов]» вместо «Иванов».

### 5. Увлечения

```turtle
<tag:example.org,2026:alice-hobby-photo> a schema:Thing.
<tag:example.org,2026:alice> schema:knowsAbout <tag:example.org,2026:alice-hobby-photo>.
<tag:example.org,2026:alice-hobby-photo> schema:name "фотографией".
```

Перевод:

- Есть карточка `alice-hobby-photo`, она — **Вещь**.
- **У Алисы** → **разбирается в** → **карточка alice-hobby-photo**.
- **У карточки alice-hobby-photo** → **название** → «фотографией».

Смысл: «Алиса разбирается в фотографии».

Слово «фотографией» стоит в творительном падеже, потому что в исходном тексте было «увлекается **фотографией**». Для машины это просто строка, но если вы хотите делать запросы, лучше писать «фотография» — иначе придётся искать и «фотография», и «фотографией», и «фотографию».

То же для шахмат.

## Как это выглядит в виде таблицы

| Кто | Что | Значение |
|---|---|---|
| Карточка Алисы | является | Человек |
| Карточка Алисы | имя | «Алиса» |
| Карточка адреса | является | Почтовый адрес |
| Карточка Алисы | адрес | карточка адреса |
| Карточка адреса | название | «Адрес Алисы» |
| Карточка Алисы | улица | «[ул. Ленина, д. 10]» ❌ |
| Карточка Алисы | город | «[Москва]» ❌ |
| Карточка Алисы | индекс | «[101000]» ❌ |
| Карточка Алисы | страна | «[Россия]» ❌ |
| Карточка фото | является | Вещь |
| Карточка Алисы | разбирается в | карточка фото |
| Карточка фото | название | «фотографией» ⚠️ |
| Карточка шахмат | является | Вещь |
| Карточка Алисы | разбирается в | карточка шахмат |
| Карточка шахмат | название | «шахматами» ⚠️ |

## Что нужно исправить

```turtle
<tag:example.org,2026:alice> schema:streetAddress "ул. Ленина, д. 10";
    schema:addressLocality "Москва";
    schema:postalCode "101000";
    schema:addressCountry "Россия".
```

Две правки:
1. Заменить субъект с `alice` на `alice-addr`.
2. Убрать квадратные скобки из значений.

## Что такое RDF одним предложением

RDF — это способ описать мир в виде **троек** «кто → что → значение», где каждая сущность имеет уникальный номер (IRI), а значения могут быть либо строками, либо ссылками на другие сущности.

## Что такое Turtle

Turtle — это **текстовая запись** RDF. Она сокращает длинные номера через префиксы (`schema:` вместо `http://schema.org/`), группирует факты об одном субъекте через `;` и использует `a` вместо `rdf:type`.

---

## 💎 Резюме для обоих вариантов

| Проблема | Для RDF-специалиста | Для новичка |
|---|---|---|
| Поля адреса на `alice` | Нарушение domain/range Schema.org | Улица записана у человека, а не у адреса |
| Скобки в литералах | Артефакт MD-LD, не очищенный парсером | В анкете написано «[Иванов]» вместо «Иванов» |
| Падежи | Не мешает SPARQL, но снижает качество данных | «фотографией» вместо «фотография» |
| Неиспользуемые префиксы | Избыточность, генерируемая шаблоном | Лишние сокращения в словаре |

**Ссылки:**
- Schema.org Person — https://schema.org/Person
- Schema.org PostalAddress — https://schema.org/PostalAddress
- Turtle (W3C) — https://www.w3.org/TR/turtle/
- RFC 4151 (tag URI) — https://www.rfc-editor.org/rfc/rfc4151
- RDF 1.1 Primer (W3C) — https://www.w3.org/TR/rdf11-primer/

