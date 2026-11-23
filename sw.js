// Universeller Service Worker für alle Web-Apps
const DEFAULT_ICON = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231a1a1a"/><text x="50" y="70" font-size="60" text-anchor="middle">⚽</text></svg>';

self.addEventListener('push', function(event) {
    let data = {
        title: '⚽ Fussball-Alarm',
        body: 'Es gibt ein neues Update!',
        icon: DEFAULT_ICON
    };

    if (event.data) {
        try {
            const parsed = event.data.json();
            data = { ...data, ...parsed };
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || DEFAULT_ICON,
        badge: data.badge || DEFAULT_ICON,
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./')
    );
});