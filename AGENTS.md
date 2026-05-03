## Rule must do
- When run terminal command or termain tool must convert console output encoding to UTF-8. 

## Technology Stack of this repo.
- Next.js 
- supabase with realtime event.
- knex.js for query builder.
- no prisama.



## Terminal tool
- `npx ctx7 --help` for research technology stack.
- `db-cli --skill` for manipulate database.Get db credential from @.env.local
- `nlm --help` for research from NotebookLm document

## database style
- master table must prefix by c_{tablename} and consist   id , code , name  columns at a minimum

## Must don't do if user not ask
- build
- deploy 
- git push
- run

## Testing
- use `playwright-cli` skill to test ux/ui 
- Artifacts that produce on test should collect at dir .playwright-cli
- should call  `playwright-cli show` for user to see your testing
- if user ask for **annotate** call `playwright-cli anotate`  call  this command
    ```
        - playwright-cli open http://localhost/example
        - playwright-cli show --annotate
    ```

