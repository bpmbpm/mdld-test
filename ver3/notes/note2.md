[ex] <tag:example.org,2026:>
[schema] <http://schema.org/>

# Расстояние между Алисой и Бобом {=ex:dist-alice-bob .ex:Distance schema:name}

Алиса и Боб живут друг от друга на расстоянии 11 километров.

[11] {schema:value ^^xsd:integer}
[km] {schema:unitText}

От кого: [Алиса] {+ex:alice ?ex:from}.
К кому: [Боб] {+ex:bob ?ex:to}.

# Example Corp {=ex:org-example .schema:Organization schema:name}

[IT-компания] {schema:description}

# Место работы Алисы {=ex:alice}

Алиса работает в [Example Corp] {+ex:org-example ?schema:worksFor}.

# Место работы Боба {=ex:bob}

Боб работает в [Example Corp] {+ex:org-example ?schema:worksFor}.
