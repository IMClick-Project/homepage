---
title: "Introduction to algorithmic complexity"
date: 2026-01-15
category: notas-teoricas
tags: [beginner, algorithms]
subject: informatica
---

## What is algorithmic complexity?

Algorithmic complexity allows us to measure the efficiency of an algorithm in terms of **time** and **space**. It's a fundamental tool for comparing solutions and choosing the most appropriate one for a given problem.

### Why does it matter?

Imagine you have two algorithms that solve the same problem. One takes 1 second with 1,000 data points, and the other takes 0.001 seconds. Which would you choose? Algorithmic complexity gives you a formal framework to answer this question.

## Big O Notation

**Big O** notation describes the behavior of an algorithm in the **worst case** as the input size $n$ grows:

$$O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(2^n)$$

### Formal definition

We say that $f(n) = O(g(n))$ if there exist constants $c > 0$ and $n_0$ such that:

$$f(n) \leq c \cdot g(n) \quad \text{for all } n \geq n_0$$

## Practical examples

### Linear search — $O(n)$

```python
def linear_search(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1
```

In the worst case, we traverse all $n$ elements.

### Binary search — $O(\log n)$

```python
def binary_search(arr, x):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

Each iteration halves the search space.

## Complexity comparison

| Algorithm | Best case | Worst case | Space |
|-----------|-----------|-----------|-------|
| Linear search | $O(1)$ | $O(n)$ | $O(1)$ |
| Binary search | $O(1)$ | $O(\log n)$ | $O(1)$ |
| Bubble sort | $O(n)$ | $O(n^2)$ | $O(1)$ |
| Merge sort | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| Quick sort | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |

## Tips for competitions

> In competitive programming, a general rule is that you can perform approximately $10^8$ operations per second. Use this to estimate whether your solution will pass within the time limit.

1. If $n \leq 20$: you can use $O(2^n)$ or $O(n!)$
2. If $n \leq 1000$: you can use $O(n^2)$
3. If $n \leq 10^5$: you need $O(n \log n)$
4. If $n \leq 10^7$: you need $O(n)$

## Conclusion

Understanding algorithmic complexity allows you to choose the right data structure and algorithm for each problem. It's the foundation for all competitive programming and efficient software development.
