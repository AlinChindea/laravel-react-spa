## About this project
A basic Laravel11+ app, featuring a REST API that's consumed by a React.js frontend (via [Inertia.js](https://laravel.com/docs/11.x/frontend#inertia))

## Requirements
The following tools are required in order to start the installation:
 - PHP 8.2 or higher
 - Composer
 - Node.js LTS
 - MySQL 8 (optional)

 ## Setup
If you're on a Mac and use [Herd](https://herd.laravel.com/), clone the repo in the right location (either the Herd directory or your dedicated code workspace, e.g. `~/Code`). Otherwise, clone it in your natural work directory.

### 1. Database set up and `.env`
For convenience, use a `SQLite` database. If an SQLite database does not exist, Laravel will ask if you would like it to be created. Typically, the SQLite database file will be created at `database/database.sqlite`. By default, the `.env.example` references the `sqlite` database driver.

If you want to install MySQL, again, Laravel will offer to create it for you. Make sure to add the correct database server credentials to the `.env` file and switch the database driver to `mysql`.

```shell
cp .env.example .env
```

### 2. Install dependencies
First, install Composer dependencies:
```shell
composer install
```

Then generate the app key. This will update your ⁠ `.env `⁠:
```shell
php artisan key:generate
```

Then create and migrate the database. If the database hasn’t been created, this command will offer to create it for you:
```shell
php artisan migrate
```

If you want to see some test data in the database, run this command:
```shell
php artisan migrate:fresh --seed
```

Install NPM dependencies needed to build the frontend:
```shell
npm install
```

Finally, build the front-end assets (CSS and JS):
```shell
npm run build
```
## Usage
If you're using Herd, the app should now run at `http://laravel-react-spa.test` and that should land you on the login page `/login`.