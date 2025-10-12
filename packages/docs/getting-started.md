# Getting Started

Image.JSX is meant to be used standalone, without other JSX-based frameworks.

To get started, first install Image.JSX:

::: code-group

```sh [npm]
npm install image-jsx
```

```sh [yarn]
yarn add image-jsx
```

```sh [pnpm]
pnpm add image-jsx
```

:::

If you already have an existing project, simply set the **JSX import source** to `image-jsx`.

Otherwise, if this is a new project, you can start off with TypeScript like so:

::: code-group

```sh [npm]
npm install --save-dev typescript tsx
npm tsc --init
```

```sh [yarn]
yarn add -D typescript tsx
yarn tsc --init
```

```sh [pnpm]
pnpm add -D typescript tsx
pnpm tsc --init
```

:::

In the TypeScript config, add the following under `compilerOptions`:

```json [tsconfig.json]
    "jsxImportSource": "image-jsx",
    "esModuleInterop": true,
```

And you're set! Let's make our first image now.

## Your first image

Create a file called `main.tsx`. We'll start off by making an image with some text on a colored background:

<<< @/examples/main.tsx

You should see something like this:
![The text "Hello, world!" on a red background](./examples/hello-world.png)

Congratulations! You just made your first image with Image.JSX!
