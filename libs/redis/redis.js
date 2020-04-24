const Redis = require("ioredis");

const redis = new Redis(
    {
        port: process.env.REDIS_PORT || 6379, // Redis port
        host: process.env.REDIS_HOST || "127.0.0.1", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        // password: "auth",
        db: 0
    }
);


redis.on('error', err => {
    console.log('REDIS: FAILED');
});

redis.on('connect', () => {
    console.log('REDIS CONNECTED');
});


async function setString(key, value) {
    try {
        let result = await redis.set(key, value);
        if (result === "OK") return result;
        else return "ERROR";
    } catch (error) {
        return "ERROR";
    }
}

async function getString(key) {
    try {
        let data = await redis.get(key);
        return data;
    } catch (error) {
        return "ERROR";
    }
}


async function isKeyExist(key) {
    try {
        let exist = await redis.exists(key);
        console.log('Exist => ', exist);
        return exist;
    } catch (error) {
        return error;
    }
}

async function setObject(key, data) {
    try {
        return await redis.hmset(key, data);
    } catch (error) {
        return error;
    }
}

async function getObject(key) {
    try {
        return await redis.hgetall(key);
    } catch (error) {
        return error;
    }
}

async function deleteKey(key) {
    try {
        return await redis.del(key);
    } catch (error) {
        return error;
    }
}

//timeout in seconds
async function expireKey(key, timeout) {
    try {
        return await redis.expire(key, timeout)
    } catch (error) {
        return error;
    }
}

module.exports = {
    setString,
    getString,
    isKeyExist,
    setObject,
    getObject,
    deleteKey,
    expireKey
}
