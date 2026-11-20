---
name: PostgreSQL size
description: SQL snippet to get the size of each table in a PostgreSQL database.
tags: ["Database"]
---

This snippet retrieves the size of each table in a PostgreSQL database, ordered by size in descending order. The sizes are presented in a human-readable format.

```sql
SELECT
    schemaname as schema_name,
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_table_size,
    pg_size_pretty(pg_database_size(current_database())) as total_database_size
FROM
    pg_catalog.pg_statio_user_tables
ORDER BY
    pg_total_relation_size(relid) DESC;
```
