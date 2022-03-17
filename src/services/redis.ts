import { createClient } from 'redis';

const client = createClient();

(async () => {

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
})();

export default class Redis_Service {
    static async setCache (params: string, period: number | null, value: string){
        if(period){
            await client.setEx(params, period, value);
        } else {
            await client.set(params, value);
        }
    }

    static async getCache (params: string){
        return await client.get(params);
    }
}
