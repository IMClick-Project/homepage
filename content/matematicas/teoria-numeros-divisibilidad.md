---
title: "Teoría de números: divisibilidad"
date: 2026-01-20
category: notas-teoricas
tags: [principiante, teoría de números]
subject: matematicas
---

## Divisibilidad

Decimos que un entero $a$ **divide** a $b$ (notación: $a \mid b$) si existe un entero $k$ tal que:

$$b = a \cdot k$$

### Propiedades fundamentales

1. $a \mid 0$ para todo $a \neq 0$
2. Si $a \mid b$ y $a \mid c$, entonces $a \mid (b + c)$
3. Si $a \mid b$ y $a \mid c$, entonces $a \mid (b - c)$
4. Si $a \mid b$, entonces $a \mid (b \cdot n)$ para todo entero $n$

## Algoritmo de Euclides

El algoritmo de Euclides encuentra el **máximo común divisor** (MCD) de dos números. Se basa en la propiedad:

$$\gcd(a, b) = \gcd(b, a \mod b)$$

### Implementación

```python
def mcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

### Ejemplo paso a paso

Calculemos $\gcd(252, 105)$:

| Paso | $a$ | $b$ | $a \mod b$ |
|------|-----|-----|-----------|
| 1 | 252 | 105 | 42 |
| 2 | 105 | 42 | 21 |
| 3 | 42 | 21 | 0 |

$$\gcd(252, 105) = 21$$

## Números primos

Un número $p > 1$ es **primo** si sus únicos divisores positivos son 1 y $p$.

### Teorema fundamental de la aritmética

> Todo entero $n > 1$ se puede expresar de forma única como producto de primos (salvo el orden):
> $$n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$$

### Criba de Eratóstenes

```python
def criba(n):
    es_primo = [True] * (n + 1)
    es_primo[0] = es_primo[1] = False
    for i in range(2, int(n**0.5) + 1):
        if es_primo[i]:
            for j in range(i*i, n + 1, i):
                es_primo[j] = False
    return [i for i in range(n + 1) if es_primo[i]]
```

La complejidad de la criba es $O(n \log \log n)$.

## Congruencias

La notación de congruencia $a \equiv b \pmod{m}$ significa que $m \mid (a - b)$.

### Propiedades

- Si $a \equiv b \pmod{m}$ y $c \equiv d \pmod{m}$, entonces $a + c \equiv b + d \pmod{m}$
- Si $a \equiv b \pmod{m}$, entonces $a^n \equiv b^n \pmod{m}$

## Problemas de práctica

1. Demuestra que el producto de tres enteros consecutivos es divisible entre 6.
2. Encuentra $\gcd(1001, 385)$.
3. ¿Cuántos primos hay menores que 100?
