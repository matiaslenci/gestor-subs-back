import { Injectable } from '@nestjs/common';
import { DefaultSubService } from '../default-sub/default-sub.service';
import { ColorService } from '../color/color.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly defaultSubSrv: DefaultSubService,
    private readonly colorSrv: ColorService,
  ) {}

  async runSeed() {
    // await this.insertNewColors();
    await this.insertNewDefaultSubs();

    return 'SEED EXECUTED';
  }

  private async insertNewDefaultSubs() {
    await this.defaultSubSrv.deleteAllDefaultSubs();

    const defaultSubs = initialData.defaultSub;

    const insertPromises = [];

    // Itero sobre mi seed y lo creo con la clase de mi service
    defaultSubs.forEach((defaultSub) => {
      insertPromises.push(this.defaultSubSrv.create(defaultSub));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertNewColors() {
    await this.colorSrv.deleteAllColors();
    await this.colorSrv.reinicirSecuenciaId();

    const colors = initialData.color;

    const insertPromises = [];
    colors.forEach((color) => {
      insertPromises.push(this.colorSrv.create(color));
    });
    await Promise.all(insertPromises);

    return true;
  }
}
