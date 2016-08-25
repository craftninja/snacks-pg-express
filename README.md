# README

### How was this thing made?

#### Basic Express App setup

1. `$ express snacks-pg`
1. `$ cd snacks-pg`
1. `$ touch README.md`, open in your favorite editor and start taking AMAZING NOTES.
1. `$ npm install`
1. `$ npm start` to start the server and check it out (http://localhost:3000/)[http://localhost:3000/]
1. install jasmine-node `$ npm install --save-dev jasmine-node`
1. Ensure you have jasmine-node globally installed `$ jasmine-node`
  * if not installed, `$ npm install -g jasmine-node`
1. Make a spec directory in the project root and `$ touch spec/test.spec.js`
1. add the following contents to `spec/test.spec.js`:

  ```js
  describe("test setup", () => {
    it("is setup", () => {
      expect(true).toBe(false);
    })
  })
  ```

  Make sure the test fails, then change false to true and COMMIT. yay.

1. `$ git init`
1. `$ echo node_modules >> .gitignore`
1. `$ git add .`
1. Commit all changes
