---
name: PostgreSQL resets
description: SQL snippets to reset a PostgreSQL sequence and to recreate the public schema.
tags: ["Database"]
---

This snippet resets a PostgreSQL sequence to match the maximum value of a column in a table. This is useful when you have manually inserted data into a table and want to ensure that the sequence continues from the correct value.

```sql
SELECT SETVAL('users_id_seq', (SELECT MAX(id) FROM users));
```

This one drops and recreates the public schema in a PostgreSQL database. This is useful for resetting the database to a completely clean state.

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public IS 'standard public schema';
```
