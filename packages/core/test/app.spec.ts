import { NestdFactory } from '@nestd/core'

import './setup'
import { CoreAppModule } from '../src/app/core/app.module'

(async () => {
  const app = await NestdFactory.create(CoreAppModule)
  app.start()
})()
