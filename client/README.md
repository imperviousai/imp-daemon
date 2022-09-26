# impervious front end application

> Currently, the UI is in ALPHA. It is not production ready yet.

---

## Developing

Install the dependencies

```
yarn
```

Launch development server

```
yarn dev
```

Export Static HTML

The daemon serves the UI on a webserver listening on port 8080. To update the UI that the daemon will serve, be sure to export the application to static HTML prior to launching the daemon.

```
yarn export
```

Visit [localhost:3001](localhost:3001) to view the application.

#### Adjusting ports

If you want to change the port number before launching (i.e. to deploy two applications), edit the package.json file to launch the development server on another port.

```
$ vim package.json
...
  "scripts": {
    "dev": "next dev -p 3001", <-- modify this port
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "bundle": "./bundle.sh"
  },
...
```

If you have changed the HTTP listening address on the daemon, say to connect the second application to the second daemon, modify the `utils/axios-utils.js` file to the appropriate port before launching.

```
$ vim utils/axios-utils.js
...
export const PORT = 8882; <-- modify this port
...
```

After these are adjusted, you can launch the development server again using `yarn dev`.
