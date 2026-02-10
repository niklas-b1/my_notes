0. Hard limit (important upfront)

There is no way in TypeScript to:

Write ordinary recursive code and have it automatically turned into a loop without changing how you write the function body.

Because:

TS types are erased at runtime

JS engines don’t expose tail calls

You can’t intercept return f(...)

So some syntactic marker is unavoidable.

That said…

1. The best possible abstraction: tailcall DSL

Goal:

const sum = tailrec((n: number, acc: number) =>
  n === 0
    ? done(acc)
    : call(n - 1, acc + n)
)

sum(1_000_000, 0)


You never see trampolines, thunks, or loops.

2. Minimal “library” implementation
Core representation (hidden from users)
type Step<R> =
  | { tag: "done"; value: R }
  | { tag: "call"; args: any[] }

function done<R>(value: R): Step<R> {
  return { tag: "done", value }
}

function call(...args: any[]): Step<any> {
  return { tag: "call", args }
}

The tailrec combinator
function tailrec<A extends any[], R>(
  f: (...args: A) => Step<R>
): (...args: A) => R {
  return (...args: A) => {
    let currentArgs = args

    while (true) {
      const step = f(...currentArgs)

      if (step.tag === "done") {
        return step.value
      }

      currentArgs = step.args as A
    }
  }
}

Usage (clean, readable, FP-ish)
const sum = tailrec((n: number, acc: number): Step<number> =>
  n === 0
    ? done(acc)
    : call(n - 1, acc + n)
)

sum(1_000_000, 0) // ✅ no stack overflow


✔ Tail recursion
✔ Referentially transparent
✔ Loop + mutation at runtime
✔ Zero recursion depth

3. Making it nicer with type tricks

We can hide Step<R> entirely.

Branded helpers
type Tail<R> = { readonly __tail: unique symbol } & Step<R>

const done = <R>(value: R): Tail<R> =>
  ({ tag: "done", value } as Tail<R>)

const call = (...args: any[]): Tail<any> =>
  ({ tag: "call", args } as Tail<any>)


Now users can’t accidentally fabricate steps.

4. Even closer to “real recursion” (self reference)

We can allow named self-calls:

function tailrec<A extends any[], R>(
  f: (self: (...args: A) => Tail<R>, ...args: A) => Tail<R>
): (...args: A) => R {
  return (...args: A) => {
    let currentArgs = args

    const self = (...args: A): Tail<R> =>
      ({ tag: "call", args } as Tail<R>)

    while (true) {
      const step = f(self, ...currentArgs)

      if (step.tag === "done") return step.value
      currentArgs = step.args as A
    }
  }
}

Usage
const sum = tailrec((self, n: number, acc: number) =>
  n === 0
    ? done(acc)
    : self(n - 1, acc + n)
)


This feels very close to real tail recursion.

5. What we cannot hack around

❌ Intercept normal return f(...)
❌ Use types to rewrite runtime behavior
❌ Avoid a marker like self(...) or call(...)
❌ Automatically detect tail position

TypeScript just doesn’t have macros or compiler plugins.
