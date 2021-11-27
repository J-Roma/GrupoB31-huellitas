import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private names: string[] = ["Valerie", "Carlos", "Sandra", "Edgar"]

  getHelloMethod(): string[] {
    return this.names;
  }
}
