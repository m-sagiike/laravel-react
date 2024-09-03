Laravel SailとReactを組み合わせて開発するための環境をDockerで構築する手順を記載します。Laravel SailはLaravel専用のDocker環境で、Reactはフロントエンドフレームワークとして使用します。この手順では、Laravel Sailを使ったバックエンドと、別のDockerコンテナで実行されるReactアプリケーションを設定します。

### 1. プロジェクトのディレクトリ構造

まず、プロジェクトのディレクトリ構造を設定します。

```
laravel-react/
├── backend/              # Laravelアプリケーション
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   ├── .env
│   ├── composer.json
│   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/             # Reactアプリケーション
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   └── Dockerfile
└── nginx/
    └── default.conf      # Nginxの設定ファイル
```

### 2. Laravel Sailのセットアップ

まず、Laravel Sailを使ってLaravelのプロジェクトを作成します。

```bash
composer create-project --prefer-dist laravel/laravel backend
cd backend
```

Laravel Sailのインストールと設定を行います。

```bash
composer require laravel/sail --dev
php artisan sail:install
```

次に、`sail` コマンドを使ってLaravel SailのDocker環境を起動します。

```bash
./vendor/bin/sail up
```

### 3. Reactのセットアップ

Reactアプリケーションを作成します。

```bash
npx create-react-app frontend
cd frontend
```

### 4. Dockerfileの作成

#### Laravel用 Dockerfile

`backend/Dockerfile` を作成します。

```Dockerfile
# Use the official PHP image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www

# Copy Laravel application code
COPY . .

# Install Laravel dependencies
RUN composer install

# Expose port 9000
EXPOSE 9000

# Start the PHP FastCGI Process Manager
CMD ["php-fpm"]
```

#### React用 Dockerfile

`frontend/Dockerfile` を作成します。

```Dockerfile
# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
```

### 5. Nginxの設定

`nginx/default.conf` を作成します。NginxはReactアプリケーションを提供し、APIリクエストをLaravelに転送します。

```nginx
server {
    listen 80;

    # Serve React application
    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }

    # Proxy API requests to Laravel
    location /api/ {
        proxy_pass http://laravel:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. Docker Composeファイルの作成

プロジェクトのルートに `docker-compose.yml` を作成します。

```yaml
version: '3.8'

services:
  laravel:
    image: sail-8.2/app
    container_name: laravel
    ports:
      - "8000:9000"
    volumes:
      - ./backend:/var/www
    networks:
      - app-network

  mariadb:
    image: mariadb:10
    container_name: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: laravel
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-network

  react:
    build:
      context: ./frontend
    container_name: react
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - laravel
      - react
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
    driver: bridge
```

### 7. Dockerコンテナの起動

プロジェクトのルートディレクトリで、すべてのサービスをビルドし、起動します。

```bash
docker-compose up --build
```

### 8. 確認

- Laravel APIは `http://localhost:8000` でアクセスできます。
- Reactアプリケーションは `http://localhost` でアクセスできます（NginxがReactアプリケーションをサーブします）。

### 9. LaravelとReactの連携

- Laravelの `.env` ファイルで、APIのURLを設定します。ReactアプリケーションからAPIリクエストを行う際には、Nginxの設定に基づいて `/api/` プレフィックスを使用します。
- Reactアプリケーション内で、APIリクエストを行う際には、`/api/` プレフィックスを使用してリクエストを送信します。

これで、LaravelとReactの開発環境がDockerで構築され、両者がNginxを通じて連携するようになります。各サービスのログやエラーメッセージを確認しながら、開発を進めてください。