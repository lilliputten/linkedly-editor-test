<!--
@since 2024.05.07, 19:34
@changed 2024.06.28, 23:59
-->

# linkedly-editor-test

Linkedly editor demo.

- Version: 0.0.2
- Last changes timestamp: 2024.06.28 18:32 +0000

TODO: Add the project description.

## See also

- [CHANGELOG](CHANGELOG.md)
- [TODO](TODO.md)

## Resources

Repository: https://github.com/lilliputten/linkedly-editor-test

Demo deploy servers (with a recent build):

- https://linkedly-editor-test.netlify.app/
- https://linkedly-editor-test-lilliputtens-projects.vercel.app/

Deploy server control panels:

- https://app.netlify.com/sites/linkedly-editor-test
- https://vercel.com/lilliputtens-projects/linkedly-editor-test/

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
