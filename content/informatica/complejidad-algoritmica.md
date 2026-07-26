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

### Tipos de análisis

| Tipo de análisis | Descripción | Cuándo se usa |
|-----------------|-------------|---------------|
| Peor caso | Máximo tiempo posible | Garantías de rendimiento |
| Caso promedio | Tiempo esperado | Aplicaciones reales |
| Mejor caso | Mínimo tiempo posible | Raramente útil |

## Notación Big O

La notación **Big O** describe el comportamiento de un algoritmo en el **peor caso** a medida que el tamaño de entrada $n$ crece:

$$O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(2^n)$$

### Definición formal

Decimos que $f(n) = O(g(n))$ si existen constantes $c > 0$ y $n_0$ tales que:

$$f(n) \leq c \cdot g(n) \quad \text{para todo } n \geq n_0$$

### Gráfica de crecimiento

La siguiente figura ilustra cómo crecen las diferentes funciones de complejidad conforme $n$ aumenta:

![Comparación de funciones de complejidad](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Comparison_computational_complexity.svg/600px-Comparison_computational_complexity.svg.png)

*Figura 1: Comparación de funciones de complejidad algorítmica. Se observa cómo $O(n!)$ y $O(2^n)$ crecen mucho más rápido que $O(n \log n)$ o $O(n)$.*

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

### Diagrama de búsqueda binaria

![Diagrama de búsqueda binaria](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Binary_Search_Depiction.svg/500px-Binary_Search_Depiction.svg.png)

*Figura 2: Representación visual de la búsqueda binaria. El arreglo se divide repetidamente a la mitad hasta encontrar el elemento.*

## Comparación de complejidades

La siguiente tabla resume las complejidades de los algoritmos más comunes en ciencias de la computación:

| Algoritmo | Mejor caso | Caso promedio | Peor caso | Espacio |
|-----------|-----------|---------------|-----------|---------|
| Búsqueda lineal | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| Búsqueda binaria | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ |
| Bubble sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Selection sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Insertion sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Merge sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| Quick sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| Heap sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ |
| Counting sort | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | $O(k)$ |

### Tabla de operaciones en estructuras de datos

| Estructura | Acceso | Búsqueda | Inserción | Eliminación |
|-----------|--------|----------|-----------|-------------|
| Arreglo | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Lista enlazada | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Pila (stack) | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Cola (queue) | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Tabla hash | — | $O(1)$ | $O(1)$ | $O(1)$ |
| Árbol binario BST | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| Árbol AVL | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |

## Consejos para competencias

> En programación competitiva, una regla general es que puedes realizar aproximadamente $10^8$ operaciones por segundo. Usa esto para estimar si tu solución pasará dentro del límite de tiempo.

### Reglas prácticas según $n$

| Tamaño de $n$ | Complejidad máxima | Ejemplo de técnica |
|--------------|-------------------|-------------------|
| $n \leq 10$ | $O(n!)$ | Fuerza bruta, permutaciones |
| $n \leq 20$ | $O(2^n)$ | Bitmask DP |
| $n \leq 500$ | $O(n^3)$ | Floyd-Warshall |
| $n \leq 5000$ | $O(n^2)$ | DP cuadrática |
| $n \leq 10^5$ | $O(n \log n)$ | Merge sort, segment tree |
| $n \leq 10^6$ | $O(n)$ | Two pointers, hashing |
| $n \leq 10^{18}$ | $O(\log n)$ | Exponenciación binaria |

### Diagrama de decisión

![Diagrama de complejidad para competencias](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sorting_stability_playing_cards.svg/400px-Sorting_stability_playing_cards.svg.png)

*Figura 3: Ejemplo visual de estabilidad en algoritmos de ordenamiento. Un algoritmo estable mantiene el orden relativo de elementos iguales.*

## Conclusión

Entender la complejidad algorítmica te permite elegir la estructura de datos y el algoritmo correcto para cada problema. Es la base para toda la programación competitiva y el desarrollo de software eficiente.

### Resumen de notaciones

| Notación | Nombre | Significado |
|----------|--------|-------------|
| $O(f(n))$ | Big O | Cota superior (peor caso) |
| $\Omega(f(n))$ | Big Omega | Cota inferior (mejor caso) |
| $\Theta(f(n))$ | Big Theta | Cota ajustada (caso exacto) |
| $o(f(n))$ | Little o | Estrictamente menor |
| $\omega(f(n))$ | Little omega | Estrictamente mayor |
