import type { EventHandlerRequest, H3Event} from 'h3'
import { emailCounterKey } from '~/server/redis/keys';
import type { TRedisEmailCounterData } from '~/server/types/TRedisEmailCounterData';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const data = await useStorage(process.env.NITRO_STORAGE_DRIVER)
     .getItem<TRedisEmailCounterData>(emailCounterKey);

    return {
        emailCounter: data?.emailCounter
    };
});
