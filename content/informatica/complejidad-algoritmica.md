---
title: "Introducción a la complejidad algorítmica"
date: 2026-01-15
category: notas-teoricas
tags: [principiante, algoritmos]
subject: informatica
---

## ¿Qué es la complejidad algorítmica?

La complejidad algorítmica nos permite medir la eficiencia de un algoritmo en términos de **tiempo** y **espacio**. Es una herramienta fundamental para comparar soluciones y elegir la más adecuada para un problema dado.

### ¿Por qué importa?

Imagina que tienes dos algoritmos que resuelven el mismo problema. Uno tarda 1 segundo con 1,000 datos, y el otro tarda 0.001 segundos. ¿Cuál elegirías? La complejidad algorítmica te da un marco formal para responder esta pregunta.

## Notación Big O

La notación **Big O** describe el comportamiento de un algoritmo en el **peor caso** a medida que el tamaño de entrada $n$ crece:

$$O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(2^n)$$

### Definición formal

Decimos que $f(n) = O(g(n))$ si existen constantes $c > 0$ y $n_0$ tales que:

$$f(n) \leq c \cdot g(n) \quad \text{para todo } n \geq n_0$$

## Ejemplos prácticos

### Búsqueda lineal — $O(n)$

```python
def busqueda_lineal(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1
```

En el peor caso, recorremos todos los $n$ elementos.

### Búsqueda binaria — $O(\log n)$

```python
def busqueda_binaria(arr, x):
    izq, der = 0, len(arr) - 1
    while izq <= der:
        mid = (izq + der) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            izq = mid + 1
        else:
            der = mid - 1
    return -1
```

Cada iteración reduce el espacio de búsqueda a la mitad.

## Comparación de complejidades

| Algoritmo | Mejor caso | Peor caso | Espacio |
|-----------|-----------|-----------|---------|
| Búsqueda lineal | $O(1)$ | $O(n)$ | $O(1)$ |
| Búsqueda binaria | $O(1)$ | $O(\log n)$ | $O(1)$ |
| Bubble sort | $O(n)$ | $O(n^2)$ | $O(1)$ |
| Merge sort | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| Quick sort | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |

## Consejos para competencias

> En programación competitiva, una regla general es que puedes realizar aproximadamente $10^8$ operaciones por segundo. Usa esto para estimar si tu solución pasará dentro del límite de tiempo.

1. Si $n \leq 20$: puedes usar $O(2^n)$ o $O(n!)$
2. Si $n \leq 1000$: puedes usar $O(n^2)$
3. Si $n \leq 10^5$: necesitas $O(n \log n)$
4. Si $n \leq 10^7$: necesitas $O(n)$

## Conclusión

Entender la complejidad algorítmica te permite elegir la estructura de datos y el algoritmo correcto para cada problema. Es la base para toda la programación competitiva y el desarrollo de software eficiente.
