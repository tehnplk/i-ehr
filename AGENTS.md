## Rule must do

- When run terminal command or termain tool must convert console output encoding to UTF-8. 

## Technology Stack of this repo.

- Next.js 
- supabase with realtime event.
- knex.js for query builder.
- no prisama.

## database style

- master table must prefix by c_{tablename} and consist   id , code , name  columns at a minimum


## Database tool

- `db-cli --skill` for manipulate database.Get db credential from @.env.local


## Documents Rsearch by ctx7 and nlm

- `npx ctx7 --help` for research technology stack.
- before start `nlm` you have to call `nlm login` for authentication
- `nlm --help` for research from NotebookLm document


## Must don't do if user not ask

- build
- deploy 
- git push
- run

## Testing

- use `playwright-cli` skill to test ux/ui 
- Artifacts that produce on testing should collect at dir .playwright-cli
- should call  `playwright-cli show` for user to see your testing
- if user ask for **annotate** call `playwright-cli anotate`  call  this command  and wait for user done.
    ```
        - playwright-cli open http://localhost/example
        - playwright-cli show --annotate
    ```

- Let edit code follow user's anotation.

## UI control size

- Textboxes and control-like buttons/links should use 34px height.
- Textbox text should use `text-sm`; placeholder text should use `placeholder:text-xs`.

## Page header pattern

- Page headers should be compact: one line only, using `text-xl` (`20px`) with `font-semibold`.
- Add a `lucide-react` icon before the Thai page title.
- Do not add breadcrumb/subtitle/description lines unless user asks.
