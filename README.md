# Project Basic Template

Provide a basic template for quickly setup development environment and deploy.

## Table of Contents

[TOC]

## Development Environment

- IDE : [Vscode](https://code.visualstudio.com/)
  - [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - 💡 If you need format with keyboard shortcuts (Shift + Alt + F), add below config to VSCode's `keybindings.json`.

      ```javascript
      [
          {
              "key": "alt+shift+f",
              "command": "stylelint.executeAutofix",
              "when": "editorTextFocus && editorLangId == 'css'"
          },
          {
              "key": "alt+shift+f",
              "command": "stylelint.executeAutofix",
              "when": "editorTextFocus && editorLangId == 'scss'"
          },
          {
              "key": "alt+shift+f",
              "command": "stylelint.executeAutofix",
              "when": "editorTextFocus && editorLangId == 'less'"
          }
      ]
      ```

  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Vscode settings](.vscode\settings.json)
- Package Manager :  [yarn](<https://yarnpkg.com/>)

## Lint Tools

- [ESLint](https://eslint.org/)
  - [Airbnb](https://github.com/airbnb/javascript)
- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://typicode.github.io/husky/#/?id=features)
- [commitlint](https://commitlint.js.org/#/)
- [ci (github workflows)](https://docs.github.com/en/actions/using-workflows)

---

## Versioning

- **Follow [Semantic Versioning](https://semver.org/).**

---

## GitHub / GitLab

- Branch `main` is the main branch, all updates need to be tagged with a [version](#versioning).
- Repositories and branches naming rules follow [Git Branching Naming Convention](https://codingsight.com/git-branching-naming-convention-best-practices/)  e.g., `an-awesome-project`, `some-branch`.
- Commit, follow [How to Write a Git Commit Message](https://cbea.ms/git-commit/), [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

  - **Overall rules**

      > 1. Separate subject from body with a blank line.
      > 2. Limit the subject line to 50 characters.
      > 3. Capitalize the subject line.
      > 4. Do not end the subject line with a period.
      > 5. Use the imperative mood in the subject line.
      > 6. Wrap the body at 72 characters.
      > 7. Use the body to explain what and why vs. how.
  
  - **Format**

       ```bash
       <type>[optional scope]: <description>
   
       [optional body]
   
       [optional footer(s)]
       ```

---

## Deploy

- Basic deploy:

  ```sh
  yarn build
  ```

- With docker and also docker compose:

  ```sh
  docker compose up -d --build
  ```

  Default will run on <http://127.0.0.1:3080>.
