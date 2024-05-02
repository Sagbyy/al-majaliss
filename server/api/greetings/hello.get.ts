import type { EventHandlerRequest, H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    return {
        message: "Hello from Nuxt server 👋"
    }
});


