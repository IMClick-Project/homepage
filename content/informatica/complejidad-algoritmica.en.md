---
title: "Introduction to algorithmic complexity"
date: 2026-01-15
category: notas-teoricas
tags: [beginner, algorithms]
subject: informatica
---

## What is algorithmic complexity?

Algorithmic complexity allows us to measure the efficiency of an algorithm in terms of **time** and **space**. It is a fundamental tool for comparing solutions and choosing the most appropriate one for a given problem.

### Why does it matter?

Imagine you have two algorithms that solve the same problem. One takes 1 second with 1,000 data points, and the other takes 0.001 seconds. Which would you choose? Algorithmic complexity gives you a formal framework to answer this question.

### Types of analysis

| Analysis type | Description | When to use |
|--------------|-------------|-------------|
| Worst case | Maximum possible time | Performance guarantees |
| Average case | Expected time | Real applications |
| Best case | Minimum possible time | Rarely useful |

## Big O Notation

**Big O** notation describes the behavior of an algorithm in the **worst case** as the input size $n$ grows:

$$O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(2^n)$$

### Formal definition

We say that $f(n) = O(g(n))$ if there exist constants $c > 0$ and $n_0$ such that:

$$f(n) \leq c \cdot g(n) \quad \text{for all } n \geq n_0$$

### Growth chart

The following figure illustrates how different complexity functions grow as $n$ increases:

![Comparison of complexity functions](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Comparison_computational_complexity.svg/600px-Comparison_computational_complexity.svg.png)

*Figure 1: Comparison of algorithmic complexity functions. Notice how $O(n!)$ and $O(2^n)$ grow much faster than $O(n \log n)$ or $O(n)$.*

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

Each iteration reduces the search space by half.

### Binary search diagram

![Binary search diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Binary_Search_Depiction.svg/500px-Binary_Search_Depiction.svg.png)

*Figure 2: Visual representation of binary search. The array is repeatedly divided in half until the element is found.*

## Complexity comparison

The following table summarizes the complexities of the most common algorithms in computer science:

| Algorithm | Best case | Average case | Worst case | Space |
|-----------|-----------|--------------|-----------|-------|
| Linear search | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| Binary search | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ |
| Bubble sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Selection sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Insertion sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Merge sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| Quick sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| Heap sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ |
| Counting sort | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | $O(k)$ |

### Data structure operations

| Structure | Access | Search | Insertion | Deletion |
|-----------|--------|--------|-----------|----------|
| Array | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Linked list | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Stack | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Queue | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Hash table | — | $O(1)$ | $O(1)$ | $O(1)$ |
| BST | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| AVL tree | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |

## Tips for competitions

> In competitive programming, a general rule is that you can perform approximately $10^8$ operations per second. Use this to estimate whether your solution will pass within the time limit.

### Practical rules by $n$

| Size of $n$ | Maximum complexity | Example technique |
|------------|-------------------|-------------------|
| $n \leq 10$ | $O(n!)$ | Brute force, permutations |
| $n \leq 20$ | $O(2^n)$ | Bitmask DP |
| $n \leq 500$ | $O(n^3)$ | Floyd-Warshall |
| $n \leq 5000$ | $O(n^2)$ | Quadratic DP |
| $n \leq 10^5$ | $O(n \log n)$ | Merge sort, segment tree |
| $n \leq 10^6$ | $O(n)$ | Two pointers, hashing |
| $n \leq 10^{18}$ | $O(\log n)$ | Binary exponentiation |

### Decision diagram

![Complexity diagram for competitions](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sorting_stability_playing_cards.svg/400px-Sorting_stability_playing_cards.svg.png)

*Figure 3: Visual example of sorting algorithm stability. A stable algorithm maintains the relative order of equal elements.*

## Conclusion

Understanding algorithmic complexity allows you to choose the correct data structure and algorithm for each problem. It is the foundation for all competitive programming and efficient software development.

### Notation summary

| Notation | Name | Meaning |
|----------|------|---------|
| $O(f(n))$ | Big O | Upper bound (worst case) |
| $\Omega(f(n))$ | Big Omega | Lower bound (best case) |
| $\Theta(f(n))$ | Big Theta | Tight bound (exact case) |
| $o(f(n))$ | Little o | Strictly less than |
| $\omega(f(n))$ | Little omega | Strictly greater than |
