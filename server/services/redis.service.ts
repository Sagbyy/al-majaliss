import { type Ref, ref } from "vue";
import type { TRedisEmailCounterData } from "../types/TRedisEmailCounterData";

export class RedisService {
    private _redisServiceInstance: RedisService = this;
    private _pollerIntervalLimit: number = new Date().getTime() + (30 * 60 * 1000);
    private _pollerTimeout: NodeJS.Timeout = setTimeout((() => {}), 5000);
    private _isRefreshPollerTime: boolean = false;

    public emailCounter: Ref<number> = ref(134);

    /**
     * Singleton implementation
     * @returns RedisService instance
     */
    constructor() {
        if (!this._redisServiceInstance) {
            this._redisServiceInstance = new RedisService();
        }

        return this._redisServiceInstance;
    }

    /**
     * This method allow you to get current email counter from redis cache.
     * @returns Promise<TRedisEmailCounterData>
     */
    public async getEmailCounter(): Promise<TRedisEmailCounterData>  {
        const data = await $fetch("/api/storage/email", {
            method: "get"
        });

        if (!data || !data.emailCounter) {
            throw new Error(
                `[ Error ] getEmailCounter(): 
                 an error occured when trying to get email counter from redis.
                 Maybe data is null : ${JSON.stringify(data)}`
            );
        }

        return {
            emailCounter: data.emailCounter
        };
    }

    /**
     * This method allow you to increment email into redis cache.
     */
    public async incrementEmailCounter(): Promise<void> {
        const currentRedisData = await this.getEmailCounter();

        if (!currentRedisData || !currentRedisData.emailCounter) {
            throw new Error(
                `[Error] getEmailCounter(): currentRedisData is maybe null : ${currentRedisData}`
            )
        }

        const data = await $fetch("/api/storage/email", {
            method: "post",
            body: {
                emailCounter: currentRedisData.emailCounter + 1
            }
        });

        /**
         * Ensure throw an error when result is undefined.
         */
        if (!data) {
            throw new Error(
                `[Error] fetch<POST>("/api/storage/email"): an error occured when trying to call this endpoint. Data : ${data}`
            )
        }

        this.emailCounter.value = data.emailCounter || this.emailCounter.value;
    }

    /**
     * This method give you it's time to refresh poller or not.
     * @param now current time
     * @param end limit of poller
     * @returns boolean with wich you can make decision to refresh poller.
     */
    private _refreshPoller(now: number, end: number): boolean {
        return now > end;
    }

    /**
     * 
     * @param duration waiting time before another request
     * @returns Promise<unknown>
     */
    private _sleep(duration: number): Promise<unknown> {
        return new Promise(resolve => {
            this._pollerTimeout = setTimeout(resolve, duration);
        });
    }

    /**
     * This method poll redis cache to get emailCounter information.
     * @param pollTimeout waiting time before another request
     */
    public poller(pollTimeout: number = 5000): void {
        this.getEmailCounter()
            .then((result) => {
                const now = new Date().getTime();
                this._isRefreshPollerTime = this._refreshPoller(now, this._pollerIntervalLimit);
                this.emailCounter.value = result.emailCounter || this.emailCounter.value;
                
                this._sleep(pollTimeout)
                 .then(() => {
                    /**
                     * To free up browser cache space
                     */
                    if (this._isRefreshPollerTime) {
                       clearTimeout(this._pollerTimeout);
                       window.location.reload();
                    }

                    this.poller(pollTimeout);
                 });
            })
            .catch((err) => {
                throw new Error(
                    `[Error] poller(): an error occured on polling system : ${err}`
                )
            });
    }
}