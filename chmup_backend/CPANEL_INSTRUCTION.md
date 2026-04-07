# 🚀 ИНСТРУКЦИЯ ПО ЗАПУСКУ НА CPANEL

## Шаг 1: Подготовка файлов

### Вариант А: Загрузка через File Manager
1. Зайдите в cPanel → File Manager
2. Перейдите в папку вашего домена (обычно `/public_html` или создайте отдельную папку)
3. Нажмите "Upload" и загрузите ВСЕ файлы из папки `chmup_backend`:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env` (отредактируйте перед загрузкой!)
   - Все папки: `config`, `models`, `routes`, `services`, `utils`

### Вариант Б: Загрузка через Git
```bash
cd ~/chmup_backend
git clone <ваш-репозиторий> .
```

## Шаг 2: Настройка Node.js в cPanel

1. В cPanel найдите раздел **"Setup Node.js App"** (или "Node.js Selector")
2. Нажмите **"Create Application"**
3. Заполните поля:
   - **Node.js version**: 18.x или выше
   - **Application mode**: Production
   - **Application root**: `/home/username/chmup_backend` (или где вы разместили файлы)
   - **Application URL**: `chmup.top` (или поддомен)
   - **Application startup file**: `server.js`
4. Нажмите **"Create"**

## Шаг 3: Установка зависимостей

1. После создания приложения откройте **Terminal** в cPanel
2. Выполните команды:
```bash
cd ~/chmup_backend
npm install --production
```

## Шаг 4: Настройка .env файла

Откройте файл `.env` и измените:

```env
PORT=3000
JWT_SECRET=придумайте-случайную-длинную-строку-на-английском
DATABASE_PATH=./data/chmup.db
NODE_ENV=production
```

**Важно**: Для генерации случайного JWT_SECRET используйте:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Шаг 5: Запуск приложения

1. Вернитесь в **"Setup Node.js App"**
2. Найдите ваше приложение в списке
3. Нажмите кнопку **"Start"**
4. Дождитесь статуса "Running"

## Шаг 6: Проверка работы

Откройте браузер и перейдите:
- `https://chmup.top/api/health`

Должно вернуться:
```json
{"status":"ok","timestamp":"...","version":"1.0.0"}
```

## Шаг 7: Настройка фронтенда

Когда зальете фронтенд, в файле конфигурации фронтенда укажите:
```javascript
API_URL = 'https://chmup.top/api'
```

## 🔧 Решение проблем

### Ошибка "Cannot find module"
```bash
cd ~/chmup_backend
rm -rf node_modules package-lock.json
npm install --production
```

### Ошибка порта
В cPanel порт определяется автоматически. Если нужно изменить, редактируйте в "Setup Node.js App".

### Приложение не запускается
1. Проверьте логи в cPanel → "Node.js App" → "View Logs"
2. Убедитесь что все зависимости установлены
3. Проверьте синтаксис `.env` файла

### База данных не создается
Убедитесь что у папки `data` есть права на запись:
```bash
chmod 755 ~/chmup_backend/data
```

## 📊 Мониторинг

- **Логи**: cPanel → Node.js App → View Logs
- **Статус**: cPanel → Node.js App → список приложений
- **Перезапуск**: Кнопка "Restart" в интерфейсе Node.js App

## 🔐 Безопасность

1. Смените `JWT_SECRET` на уникальный
2. В продакшене установите `NODE_ENV=production`
3. Регулярно делайте бэкапы базы данных из папки `data/`

## 📞 API для фронтенда

Основной URL: `https://chmup.top/api`

### Пример запроса с фронтенда:
```javascript
// Регистрация
fetch('https://chmup.top/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

// Вход
fetch('https://chmup.top/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
.then(res => res.json())
.then(data => {
  localStorage.setItem('token', data.token);
})

// Создание бота (с токеном)
fetch('https://chmup.top/api/bots', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(botData)
})
```

## ✅ Готово!

Теперь у вас работает бэкенд для chmup.top с функционалом:
- ✅ Регистрация и авторизация пользователей
- ✅ Создание и управление торговыми ботами
- ✅ Запуск бэктестов стратегий
- ✅ Поддержка бирж Bybit, BingX, Binance, OKX
- ✅ REST API для подключения фронтенда

Следующий шаг: залейте фронтенд и подключите его к API!
