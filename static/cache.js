// cacheUtils.js
const CacheUtils = {
  setCache(key, value, durationInMinutes) {
    const now = new Date();
    const expiration = now.getTime() + durationInMinutes * 60 * 1000;
    const item = { value, expiration };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getCache(key) {
    const item = JSON.parse(localStorage.getItem(key));

    if (!item) {
      return null; // 缓存不存在
    }

    const now = new Date();

    if (now.getTime() > item.expiration) {
      localStorage.removeItem(key); // 缓存过期，移除
      return null;
    }

    return item.value;
  },
};

export default CacheUtils;
