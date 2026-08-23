# Kmt Mathematics - Checks (verification rules)

A calculation is not trusted until it passes all of:

1. **Table correctness** - every row is double the previous; row 1 is the multiplicand.
2. **Selection correctness** - the selected row factors sum to the multiplier exactly.
3. **Sum correctness** - the summed rows equal the declared product.
4. **Independent verification** - the product is re-checked by a second method
   (reverse division: product / multiplicand = multiplier).
5. **Provenance** - the doubling table, selection, and result are all recorded as evidence.

A failed check stops the run at REPAIR_REQUIRED and surfaces the repair target.
