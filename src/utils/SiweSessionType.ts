/* eslint-disable @typescript-eslint/ban-types */
import { IronSession, IronSessionOptions } from 'iron-session';






export type NextSIWESession<TSessionData extends Object = {}> = IronSession & TSessionData & {
    nonce?: string;
    address?: string;
    chainId?: number;
};


