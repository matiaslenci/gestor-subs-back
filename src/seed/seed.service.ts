import { Injectable } from '@nestjs/common';
import { DefaultSubService } from '../default-sub/default-sub.service';
import { ColorService } from '../color/color.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly defaultSubSrv: DefaultSubService,
    private readonly colorSrv: ColorService,
  ) {}

  async runSeed() {
    await this.insertNewData();

    return 'SEED EXECUTED';
  }

  private async insertNewData() {
    await this.defaultSubSrv.deleteAllDefaultSubs();
    await this.colorSrv.deleteAllColors();

    return true;
  }
}
