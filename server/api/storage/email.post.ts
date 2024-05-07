import type { EventHandlerRequest, H3Event} from 'h3'
import { emailCounterKey } from '~/server/redis/keys';
import type { TRedisEmailCounterData } from '~/server/types/TRedisEmailCounterData';


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const body = await readBody<TRedisEmailCounterData>(event);
    await useStorage(process.env.NITRO_STORAGE_DRIVER)
     .setItem<TRedisEmailCounterData>(emailCounterKey, {
        emailCounter: body.emailCounter
    });

    return body;
});
