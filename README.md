# elementos-react

> React bindings for [elementos](https://github.com/malerba118/elementos)

[![NPM](https://img.shields.io/npm/v/elementos-react.svg)](https://www.npmjs.com/package/elementos-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save elementos-react
```

Please see the [full documentation](https://malerba118.github.io/elementos-docs/docs/react/overview)!

## Basic Usage

[Open in CodeSandbox](https://codesandbox.io/s/elementos-login-form-p8lsj?file=/src/App.js)

```tsx
import React from 'react';
import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input,
  Stack
} from "@chakra-ui/react";
import { atom, molecule, observe } from 'elementos';
import { useConstructor, useObservable } from 'elementos-react';
import * as api from "./api";

function LoginForm(props) {
  const { 
    formEl$, 
    form$, 
    submitting$ 
  } = useConstructor(({ beforeUnmount }) => {
    const formEl$ = atom(null);
    const submitting$ = atom(false);
    const form$ = molecule({
      username: atom(""),
      password: atom(""),
      formEl$
    });

    beforeUnmount(
      // log whenever formEl changes
      observe(formEl$, (formEl) => {
        console.log(formEl)
      })
    )

    beforeUnmount(
      observe(form$, (form) => {
        console.log(form)
      })
    )
    
    return {
      formEl$,
      form$,
      submitting$
    };
  });

  const form = useObservable(form$);
  const submitting = useObservable(submitting$);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitting$.actions.set(true);
    api.logIn(form).finally(() => {
      submitting$.actions.set(false);
    });
  };

  return (
    <Stack ref={formEl$.actions.set} as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={form.username}
          onChange={(e) => {
            form$.children.username.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => {
            form$.children.password.actions.set(e.target.value);
          }}
        />
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </Stack>
  );
}
```

## License

MIT © [malerba118](https://github.com/malerba118)
