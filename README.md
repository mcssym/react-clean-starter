# Getting Started

This template highly base itself on CRA with TypeScript. It leverages decorators to allows the usage of some package like `class-transformers` and `class-validators`. 

## Architecture 

the architecture used in this template is the famous Layered Architecture with DDD (Domain Driven Design) as main design system. This allows us to have the our `src` containing the layers:
 - `foundation` that contains all the basis.
 - `data` that contains all our data and sources.
 - `domain` that contains all our business logic.
 - `application` that contains all our application logic.
 - `presentation` that contains all our presentation logic (routing, ui).

 ### Foundation

This template uses some base components that are the core of the application. These components are:
- The Dependency Injection system in `src/foundation/core/di`. It is custom DI that is created precisely for this template with injections done in `src/application/injections/injections-loader.ts`
- The System components in `src/foundation/core/system`. These components are mostly a lot of abstracts components that are implemented by the application or business logic. You can see there API for navigation, IO operations, translation or state management.

### Data

The data layer of this template allows you to do all your IO operations related to data management to HTTP, Local or WebSocket. It also contains all your models/repositories.

### Domain

The domain layer contains all you business logic, from the entities of your application to use cases or value objects. Also services/contracts related to business logic can be there.

### Application

The application layer is probably one of the most dense or important of your application. All your main services, managers, controllers, implementations of contracts/abstractions will be there.

### Presentation

The presentation layer contains everything related to the user interfaces so everything presented to the user. It will contain all your React components.

## Available Scripts

In the project directory, you can run:

### `yarn eslint:check`

Checks the lint of the code of the project based on the eslint config in [eslint.config.js](./eslint.config.js).

### `yarn eslint:fix`

Fix the lints issue of the code of the project based on the eslint config in [eslint.config.js](./eslint.config.js).

### `yarn translations:gen`

Generate translations keys file in [src/foundation/core/system/translation/translation-keys.ts](src/foundation/core/system/translation/translation-keys.ts) from translations assets in [public/assets/translations](public/assets/translations).

### `yarn translations:gen:watch`

Same as `yarn translations:gen` but in watch mode.

### `yarn tailwind:process`

Generate styles output from tailwindcss config.

### `yarn tailwind:watch`

Same as `yarn tailwind:process` but in watch mode.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
