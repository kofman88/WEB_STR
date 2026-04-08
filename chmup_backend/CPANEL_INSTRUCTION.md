# 🚀 Быстрый деплой на cPanel (одной командой)

## 0) Что уже добавлено
В корне репозитория есть скрипт `deploy-cpanel.sh`, который заливает:
- `frontend/` → в `public_html` (или вашу web-папку),
- `chmup_backend/` → в `~/chmup_backend`.

## 1) Локально выполните 1 команду

```bash
CPANEL_HOST=your-host.com CPANEL_USER=your_user CPANEL_PATH=/home/your_user/public_html ./deploy-cpanel.sh
```

> Скрипт использует `rsync` по SSH, поэтому на локальной машине должны быть доступны `ssh` и `rsync`.

---

## 2) Один раз настроить Node.js App в cPanel

1. cPanel → **Setup Node.js App**
2. **Create Application**:
   - Node.js version: 18+
   - Mode: Production
   - Application root: `/home/your_user/chmup_backend`
   - Application startup file: `server.js`
3. В терминале cPanel:

```bash
cd ~/chmup_backend
npm install --production
```

4. Создайте `.env`:

```env
PORT=3000
JWT_SECRET=change_me_long_random_secret
DATABASE_PATH=./data/chmup.db
NODE_ENV=production
```

5. Нажмите **Restart** в Node.js App.

---

## 3) Проверка

- Frontend: `https://your-domain.com`
- API health: `https://your-domain.com/api/health`

Ожидаемый ответ:

```json
{"status":"ok","timestamp":"...","version":"1.0.0"}
```

---

## Примечания

- Для автоматического входа без пароля можно добавить SSH-ключ в cPanel (рекомендуется).
- Если backend меняли, после деплоя делайте `npm install --production` при обновлении зависимостей.
