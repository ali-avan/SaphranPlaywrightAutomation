
import { HomePage } from '../pages/HomePage';
import { World } from '@cucumber/cucumber';

export class Pages {
  static home(world: World & { page: any }) {
    return new HomePage(world.page);
  }
}
