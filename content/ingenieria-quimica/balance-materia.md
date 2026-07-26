---
title: "Balance de materia en estado estacionario"
date: 2026-01-25
category: notas-teoricas
tags: [principiante, balances]
subject: ingenieria-quimica
---

## ¿Qué es un balance de materia?

El balance de materia es la aplicación de la **ley de conservación de masa** a un sistema o proceso. En estado estacionario (sin acumulación):

$$\text{Entrada} = \text{Salida} + \text{Generación} - \text{Consumo}$$

Para sistemas sin reacción química:

$$\sum \dot{m}_{entrada} = \sum \dot{m}_{salida}$$

## Tipos de sistemas

### Sistema abierto (volumen de control)

Hay flujo de masa que entra y sale del sistema. Es el caso más común en ingeniería química (reactores, columnas, intercambiadores).

### Sistema cerrado

No hay transferencia de masa con los alrededores. Solo cambia la composición interna si hay reacción.

## Metodología de resolución

1. **Dibujar** el diagrama del proceso
2. **Definir** el sistema (frontera)
3. **Identificar** corrientes de entrada y salida
4. **Elegir** base de cálculo
5. **Plantear** los balances (global y por componente)
6. **Resolver** el sistema de ecuaciones

## Ejemplo: Mezcla de corrientes

Dos corrientes se mezclan en un tanque:
- Corriente 1: 100 kg/h de solución al 30% de NaCl
- Corriente 2: 50 kg/h de agua pura

### Balance global

$$\dot{m}_1 + \dot{m}_2 = \dot{m}_3$$
$$100 + 50 = 150 \text{ kg/h}$$

### Balance de NaCl

$$x_1 \cdot \dot{m}_1 + x_2 \cdot \dot{m}_2 = x_3 \cdot \dot{m}_3$$
$$0.30 \times 100 + 0 \times 50 = x_3 \times 150$$

$$x_3 = \frac{30}{150} = 0.20 = 20\%$$

## Código: Resolver balance con Python

```python
import numpy as np

# Balance de mezcla: A + B = C
# Variables: flujo_A, flujo_B, flujo_C, x_A, x_B, x_C
flujo_A = 100  # kg/h
flujo_B = 50   # kg/h
x_A = 0.30     # fracción de NaCl en A
x_B = 0.00     # fracción de NaCl en B

# Balance global
flujo_C = flujo_A + flujo_B

# Balance de componente (NaCl)
x_C = (x_A * flujo_A + x_B * flujo_B) / flujo_C

print(f"Flujo de salida: {flujo_C} kg/h")
print(f"Concentración de salida: {x_C*100:.1f}% NaCl")
```

## Grados de libertad

Antes de resolver, verifica que el sistema tiene solución:

$$\text{GL} = \text{incógnitas} - \text{ecuaciones independientes}$$

| GL | Significado |
|----|-------------|
| 0 | Sistema determinado (tiene solución única) |
| > 0 | Subdeterminado (faltan datos) |
| < 0 | Sobredeterminado (verificar consistencia) |

## Problemas propuestos

1. Una corriente de 200 mol/h con 40% de etanol se mezcla con etanol puro. ¿Cuánto etanol puro se necesita para obtener una mezcla al 70%?
2. En un evaporador, entra jugo al 12% de sólidos y sale concentrado al 45%. Si entran 1000 kg/h, ¿cuánta agua se evapora?
