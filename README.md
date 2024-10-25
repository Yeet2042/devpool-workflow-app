
# Workflow-APP 
Workflow-APP is an Angular application designed to provide a seamless user experience for interacting with the Workflow-API. This frontend application serves as the interface for organizations to manage their budget workflows efficiently.

## Important Note
To run the project successfully, ensure to run the backend service as well. Alternatively, you can run the [Workflow-Integration](https://github.com/Yeet2042/devpool-workflow-integration) project, which connects the [Workflow-API](https://github.com/Yeet2042/devpool-workflow-app) with the Angular frontend ([Workflow-APP](https://github.com/Yeet2042/devpool-workflow-app)).

## Requrement
- PostgreSQL
- [Workflow-API](https://github.com/Yeet2042/devpool-workflow-api) (Backend Project)
- Keycloak (optional)
## Use " Bun " for better experience :D
Install Bun ( Linux )
```bash
  curl -fsSL https://bun.sh/install | bash
```

Install Bun ( Windows )
```bash
  powershell -c "irm bun.sh/install.ps1 | iex"
```

## Initailize modules
```bash
  bun i
```

## Build and run the project
```bash
  # build
  bun run build

  # start
  bun run start
```
## Tech Stack

**Client:** AngularJS

**Style:** SCSS, TailwindCSS

