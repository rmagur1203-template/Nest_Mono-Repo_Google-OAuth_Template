# Description
Template of Monolithic Repository by Lerna with Nest.js

# Bootstrap
## Dependency Installation
```
npm i -g lerna
lerna bootstrap
```

## Build
```
lerna run build
```

# Start
## Production mode
```
lerna exec yarn -- start --scope=server
```

## Development mode
```
lerna exec yarn -- start:dev --scope=server
```

# Docs
Before, Run the server in development mode<br>
http://localhost:3000/document