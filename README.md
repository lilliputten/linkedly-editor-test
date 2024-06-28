<!--
@since 2024.05.07, 19:34
@changed 2024.06.28, 17:08
-->

# linkedly-editor-test

Linkedly editor demo.

- Version: 0.0.0
- Last changes timestamp: 2024.06.28 15:03 +0300

TODO: Add the project description.

## See also

- [CHANGELOG](CHANGELOG.md)
- [TODO](TODO.md)

## Resources

Repository: https://github.com/lilliputten/linkedly-editor-test

Demo deploy server (with a recent build): http://linkedly-editor-test.lilliputten.com/ (TODO!)

## Project workflow

Install all required node dependencies:

```
npm i
```

Start dev server (locate in browser with `http://localhost:3000`):

```
npm run start
```

Make build:

```
npm run build
```

Build and publish:

For successful publishing the build application the environment should be
propeply set up (see npm script command `postinstall-publish-submodule`).

```
npm run build-and-publish
```

To just publish previously created build:

```
npm run publish
```

Builds published into the `publish` branch. See utilities configuration in
`utils/config.sh`.
