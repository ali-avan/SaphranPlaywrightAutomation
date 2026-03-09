// support/world.ts
import type { World } from '@cucumber/cucumber';

export type MyWorld = World & { page: any };

// helper to reduce boilerplate
export function step(fn: (this: MyWorld, ...args: any[]) => Promise<void>) {
  return fn;
}
