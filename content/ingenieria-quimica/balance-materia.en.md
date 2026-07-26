---
title: "Steady-state material balance"
date: 2026-01-25
category: notas-teoricas
tags: [beginner, balances]
subject: ingenieria-quimica
---

## What is a material balance?

A material balance is the application of the **law of conservation of mass** to a system or process. At steady state (no accumulation):

$$\text{Input} = \text{Output} + \text{Generation} - \text{Consumption}$$

For systems without chemical reaction:

$$\sum \dot{m}_{in} = \sum \dot{m}_{out}$$

## Types of systems

### Open system (control volume)

There is mass flow entering and leaving the system. This is the most common case in chemical engineering (reactors, columns, heat exchangers).

### Closed system

No mass transfer with the surroundings. Only internal composition changes if there is a reaction.

## Solution methodology

1. **Draw** the process diagram
2. **Define** the system (boundary)
3. **Identify** inlet and outlet streams
4. **Choose** a basis of calculation
5. **Write** the balances (overall and per component)
6. **Solve** the system of equations

## Example: Stream mixing

Two streams mix in a tank:
- Stream 1: 100 kg/h of 30% NaCl solution
- Stream 2: 50 kg/h of pure water

### Overall balance

$$\dot{m}_1 + \dot{m}_2 = \dot{m}_3$$
$$100 + 50 = 150 \text{ kg/h}$$

### NaCl balance

$$x_1 \cdot \dot{m}_1 + x_2 \cdot \dot{m}_2 = x_3 \cdot \dot{m}_3$$
$$0.30 \times 100 + 0 \times 50 = x_3 \times 150$$

$$x_3 = \frac{30}{150} = 0.20 = 20\%$$

## Code: Solving balance with Python

```python
import numpy as np

# Mixing balance: A + B = C
# Variables: flow_A, flow_B, flow_C, x_A, x_B, x_C
flow_A = 100  # kg/h
flow_B = 50   # kg/h
x_A = 0.30    # NaCl fraction in A
x_B = 0.00    # NaCl fraction in B

# Overall balance
flow_C = flow_A + flow_B

# Component balance (NaCl)
x_C = (x_A * flow_A + x_B * flow_B) / flow_C

print(f"Outlet flow: {flow_C} kg/h")
print(f"Outlet concentration: {x_C*100:.1f}% NaCl")
```

## Degrees of freedom

Before solving, verify that the system has a solution:

$$\text{DOF} = \text{unknowns} - \text{independent equations}$$

| DOF | Meaning |
|-----|---------|
| 0 | Determined system (unique solution) |
| > 0 | Underdetermined (missing data) |
| < 0 | Overdetermined (check consistency) |

## Proposed problems

1. A stream of 200 mol/h with 40% ethanol is mixed with pure ethanol. How much pure ethanol is needed to obtain a 70% mixture?
2. In an evaporator, juice enters at 12% solids and exits concentrated at 45%. If 1000 kg/h enter, how much water evaporates?
