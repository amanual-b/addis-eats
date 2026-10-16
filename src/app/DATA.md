* **Cache Key String**: `/api/orders/[id]`
* **Refresh Strategy**: Polling enabled at `refreshInterval: 5000` (5-second intervals).
* **Justification**: Live order processing status (e.g., Cooking -> In Transit) represents fluid operational tracking workflows that change independently of client screen inputs. Polling hooks catch changes quickly without user interaction.

* **Cache Key String**: `/api/dishes?q=[debouncedTerm]`
* **Conditional Logic**: Evaluates to `null` key parameter when the string input field is empty.
* **Refresh Strategy**: Debounced at `300ms` window thresholds accompanied by `keepPreviousData: true`.
* **Justification**: Debouncing shields backend infrastructure from database execution spikes on every single keystroke. Passing a null key conforms with React hook rules while safely disabling blank string queries. `keepPreviousData` provides continuous interface feedback while matching background updates execute.
