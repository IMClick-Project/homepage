---
title: "Number theory: divisibility"
date: 2026-01-20
category: notas-teoricas
tags: [beginner, number theory]
subject: matematicas
---

## Divisibility

We say that an integer $a$ **divides** $b$ (notation: $a \mid b$) if there exists an integer $k$ such that:

$$b = a \cdot k$$

### Fundamental properties

1. $a \mid 0$ for all $a \neq 0$
2. If $a \mid b$ and $a \mid c$, then $a \mid (b + c)$
3. If $a \mid b$ and $a \mid c$, then $a \mid (b - c)$
4. If $a \mid b$, then $a \mid (b \cdot n)$ for any integer $n$

## Euclidean Algorithm

The Euclidean algorithm finds the **greatest common divisor** (GCD) of two numbers. It's based on the property:

$$\gcd(a, b) = \gcd(b, a \mod b)$$

### Implementation

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

### Step-by-step example

Let's compute $\gcd(252, 105)$:

| Step | $a$ | $b$ | $a \mod b$ |
|------|-----|-----|-----------|
| 1 | 252 | 105 | 42 |
| 2 | 105 | 42 | 21 |
| 3 | 42 | 21 | 0 |

$$\gcd(252, 105) = 21$$

## Prime numbers

A number $p > 1$ is **prime** if its only positive divisors are 1 and $p$.

### Fundamental theorem of arithmetic

> Every integer $n > 1$ can be uniquely expressed as a product of primes (up to ordering):
> $$n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$$

### Sieve of Eratosthenes

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n + 1) if is_prime[i]]
```

The complexity of the sieve is $O(n \log \log n)$.

## Congruences

The congruence notation $a \equiv b \pmod{m}$ means that $m \mid (a - b)$.

### Properties

- If $a \equiv b \pmod{m}$ and $c \equiv d \pmod{m}$, then $a + c \equiv b + d \pmod{m}$
- If $a \equiv b \pmod{m}$, then $a^n \equiv b^n \pmod{m}$

## Practice problems

1. Prove that the product of three consecutive integers is divisible by 6.
2. Find $\gcd(1001, 385)$.
3. How many primes are there less than 100?
