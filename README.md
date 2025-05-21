# CSC13002 - CQ2022/3 - Electronics Shop Backend

## Installations
- Node.js version v20.17.0 or higher
## Preparation
- Prepare a mongo database
### Environment Variables
- Configure parameters in .env as your need (where marked with #Your ...)
### Migration data
- Go `migrate-mongo-config.js` and change these parameter as your need
```
- url: #Url connect to your mongo database
- databaseName: #Your database name
```
- Run this command
```bash
npx migrate-mongo up
```

## Execution
### Install dependencies
- Run this command to install all needed dependencies

```bash
npm install
```

### Start your application
- You can run 
```bash
npm run dev
```
(for developer mode)
- or
```bash
npm run start
```