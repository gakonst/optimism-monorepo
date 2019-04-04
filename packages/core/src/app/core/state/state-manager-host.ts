import { MessageBus } from '../../../interfaces'
import { BaseRunnable } from '../../common'
import { ChainDbHost } from '../db/chain-db-host'
import { BaseKey } from '../../common/db'
import { PGStateManager } from './state-manager'

export class PGStateManagerHost extends BaseRunnable {
  private _stateManager: PGStateManager

  constructor(
    private messageBus: MessageBus,
    private chainDbHost: ChainDbHost
  ) {
    super()
  }

  get stateManager(): PGStateManager {
    return this._stateManager
  }

  public async onStart(): Promise<void> {
    this.messageBus.on('chaindb:ready', this.onChainDbReady.bind(this))
  }

  private onChainDbReady(): void {
    const prefix = new BaseKey('s')
    const db = this.chainDbHost.db.bucket(prefix.encode())
    this._stateManager = new PGStateManager(db)
  }
}
