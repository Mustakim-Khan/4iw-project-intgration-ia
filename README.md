# Requirement :
- Create `cuisine-connect/.env`
- Create `cuisine-connect/.env.local`
- [Google sso configuration](https://shorturl.at/mpCV6)
    - Authorized URL            : `http://localhost:3000`
    - Authorized redirect URL   : `http://localhost:3000/api/auth/callback/google`

# Lancement projet

```bash
make up
make dpm
make dev
```

# Arreter le projet
```bash
make down
```
# Generate Next auth secret
```bash
make next_secret
```

# Run Command in server
```bash
make bash
```

# Generate Prisma Migration
```bash
make dpm
```

## Ressources
- [Prisma/postgres](https://www.prisma.io/docs/concepts/database-connectors/postgresql)