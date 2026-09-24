[ex] <tag:example.org,2026:>

# Расстояние между Алисой и Бобом {=ex:dist-alice-bob .ex:Distance schema:name}

Алиса и Боб живут друг от друга на расстоянии 11 километров.

[11] {schema:value}
[km] {schema:unitText}

## От кого {+ex:alice ?ex:from .schema:Person schema:name}

[Алиса] {schema:name}

## К кому {+ex:bob ?ex:to .schema:Person schema:name}

[Боб] {schema:name}

# Организация {=ex:org-example .schema:Organization schema:name}

[Example Corp] {schema:name}
[IT-компания] {schema:description}

# Место работы Алисы {=ex:alice .schema:Person schema:name}

Алиса работает в [Example Corp] {+ex:org-example ?schema:worksFor}.

# Место работы Боба {=ex:bob .schema:Person schema:name}

Боб работает в [Example Corp] {+ex:org-example ?schema:worksFor}.
