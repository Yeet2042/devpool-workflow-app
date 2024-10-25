Workflow-API
Workflow-API is a RESTful API built with NestJS, designed to streamline budget management and workflow processes within organizations. Providing a user-friendly interface and robust backend architecture.

Important Note
To run the project successfully, ensure to run the backend service as well. Alternatively, you can run the Workflow-Integration project, which connects the Workflow-API with the Angular frontend.

Requrement
PostgreSQL
Workflow-API (Fontend Project)
Keycloak (optional)
Use " Bun " for better experience :D
Install Bun ( Linux )

  curl -fsSL https://bun.sh/install | bash
Install Bun ( Windows )

  powershell -c "irm bun.sh/install.ps1 | iex"
Initailize modules
  bun i
Migrate Database
  bun run migrations:run
Build and run the project
  # build
  bun run build

  # watch mode
  bun run start:dev

  # production mode
  bun run start:prod
Tech Stack
Server: NestJS

Style: SCSS, TailwindCSS