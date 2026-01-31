# Optional: Add a CLI binary (if you want to run it globally)

If you want to run cvgen as a global command after linking:

Add this to package.json:

```
"bin": {
  "cvgen": "dist/index.js"
}
```

Add a shebang to src/index.ts:

```
#!/usr/bin/env node

console.log("Hello CV generator");
```

Run `npm run build` and then

```
npm link
```

Now you can run cvgen anywhere.