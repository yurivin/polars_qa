import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

const CONNECTION_STATUS = {
    CONNECTED:'CONNECTED',
        DISCONNECTED: 'DISCONNECTED',
        FAILED: 'FAILED',
}

const provider = new WsProvider("ws://127.0.0.1:9944");

const config  = {
    CUSTOM_TYPES: {
    Address: 'MultiAddress',
        TokenSymbol: {
        _enum: {
            MNT: 0,
                DOT: 1,
                MDOT: 2,
                KSM: 3,
                MKSM: 4,
                BTC: 5,
                MBTC: 6,
                ETH: 7,
                METH: 8,
        },
    },
    CurrencyType: {
        _enum: ['Native', 'UnderlyingAsset', 'WrappedToken'],
    },
    CurrencyId: {
        _enum: {
            Native: 'TokenSymbol',
                UnderlyingAsset: 'TokenSymbol',
                WrappedToken: 'TokenSymbol',
        },
    },
    Operation: {
        _enum: ['Deposit', 'Redeem', 'Borrow', 'Repay', 'Transfer'],
    },
    Pool: {
        total_borrowed: 'Balance',
            borrow_index: 'Rate',
            total_protocol_interest: 'Balance',
    },
    LiquidationPoolData: {
        deviation_threshold: 'Rate',
            balance_ratio: 'Rate',
            max_ideal_balance: 'Option<Balance>',
    },
    PoolUserData: {
        total_borrowed: 'Balance',
            interest_index: 'Rate',
            is_collateral: 'bool',
            liquidation_attempts: 'u8',
    },
    RiskManagerData: {
        max_attempts: 'u8',
            min_partial_liquidation_sum: 'Balance',
            threshold: 'Rate',
            liquidation_fee: 'Rate',
    },
    CurrencyIdOf: 'CurrencyId',
        Amount: 'i128',
        AmountOf: 'Amount',
        Rate: 'FixedU128',
        Price: 'FixedU128',
        ControllerData: {
        last_interest_accrued_block: 'BlockNumber',
            protocol_interest_factor: 'Rate',
            max_borrow_rate: 'Rate',
            collateral_factor: 'Rate',
            borrow_cap: 'Option<Balance>',
            protocol_interest_threshold: 'Balance',
    },
    PauseKeeper: {
        deposit_paused: 'bool',
            redeem_paused: 'bool',
            borrow_paused: 'bool',
            repay_paused: 'bool',
            transfer_paused: 'bool',
    },
    MinterestModelData: {
        kink: 'Rate',
            base_rate_per_block: 'Rate',
            multiplier_per_block: 'Rate',
            jump_multiplier_per_block: 'Rate',
    },
    PoolState: {
        exchange_rate: 'Rate',
            borrow_rate: 'Rate',
            supply_rate: 'Rate',
    },
    UserPoolBalanceData: {
        total_supply: 'Balance',
            total_borrowed: 'Balance',
    },
    MntState: {
        mnt_distribution_index: 'Rate',
            index_updated_at_block: 'BlockNumber',
    },
    MntPoolState: {
        supply_state: 'MntState',
            borrow_state: 'MntState',
    },
    MntBalanceInfo: {
        amount: 'Balance',
    },
    HypotheticalLiquidityData: {
        liquidity: 'Amount',
    },
    BalanceInfo: {
        amount: 'Balance',
    },
    OracleKey: 'CurrencyId',
        OracleValue: 'Price',
        DataProviderId: {
        _enum: ['Aggregated', 'Minterest'],
    },
    TimestampedValue: {
        value: 'OracleValue',
            timestamp: 'Moment',
    },
    TimeStampedPrice: {
        value: 'OracleValue',
            timestamp: 'Moment',
    },
    TimestampedValueOf: 'TimestampedValue',
},
    RPC: {
        controller: {
            liquidityPoolState: {
                description: '',
                    params: [
                    {
                        name: 'pool_id',
                        type: 'CurrencyId',
                    },
                    {
                        name: 'at',
                        type: 'BlockHash',
                        isOptional: true,
                    },
                ],
                    type: 'PoolState',
            },
            isAdmin: {
                description: '',
                    params: [
                    {
                        name: 'caller',
                        type: 'AccountId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'bool',
            },
            userBalanceInfo: {
                description: '',
                    params: [
                    {
                        name: 'account_id',
                        type: 'AccountId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'UserPoolBalanceData',
            },
            accountLiquidity: {
                description: 'Hypothetical Liquidity Data',
                    params: [
                    {
                        name: 'account_id',
                        type: 'AccountId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Option<HypotheticalLiquidityData>',
            },
            accountCollateral: {
                description: 'Returns account total collateral in usd',
                    params: [
                    {
                        name: 'account_id',
                        type: 'AccountId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Option<BalanceInfo>',
            },
            getUserBorrowPerAsset: {
                description:
                    'Returns actual borrow balance for user per asset based on fresh latest indexes',
                        params: [
                    {
                        name: 'account_id',
                        type: 'AccountId',
                    },
                    {
                        name: 'underlying_asset_id',
                        type: 'CurrencyId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Option<BalanceInfo>',
            },
        },
        prices: {
            getAllLockedPrices: {
                description: 'Admin locked prices',
                    params: [
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Vec<(CurrencyId, Option<Price>)>',
            },
            getAllFreshestPrices: {
                description: 'Admin fresh prices',
                    params: [],
                    type: 'Vec<(CurrencyId, Option<Price>)>',
            },
            getCurrentPrice: {
                description: 'User prices based on locked and fresh config',
                    params: [
                    {
                        name: 'currency_id',
                        type: 'CurrencyId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Option<Price>',
            },
        },
        oracle: {
            getAllValues: {
                description: 'Admin fresh prices???',
                    params: [
                    {
                        name: 'provider_id',
                        type: 'DataProviderId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Vec<(CurrencyId, Option<TimeStampedPrice>)>',
            },
        },
        mntToken: {
            getUnclaimedMntBalance: {
                description: 'user mnt balance',
                    params: [
                    {
                        name: 'account_id',
                        type: 'AccountId',
                    },
                    {
                        name: 'blockNumber',
                        type: 'BlockNumber',
                        isOptional: true,
                    },
                ],
                    type: 'Option<MntBalanceInfo>',
            },
        },
    },
};

class ApiService {
    static instance;

    status = CONNECTION_STATUS.DISCONNECTED;
    api = null;
    error = null;

    constructor() {
        this.api = new ApiPromise({
            provider,
            types: config.CUSTOM_TYPES,
            rpc: { ...jsonrpc, ...config.RPC },
        });
        this.initialize();
    }

    static getInstance() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }

    initialize = async () => {
        await this.api.isReady;
        this.setStatus(CONNECTION_STATUS.CONNECTED);

        this.api.on('connected', this.onConnected);
        this.api.on('disconnected', this.onDisconnected);
        this.api.on('error', this.onError);
    };

    onConnected = () => {
        this.setStatus(CONNECTION_STATUS.CONNECTED);
        this.error = null;
    };

    onDisconnected = () => {
        this.setStatus(CONNECTION_STATUS.DISCONNECTED);
    };

    onError = (e) => {
        this.setStatus(CONNECTION_STATUS.FAILED);
        this.error = e;
    };

    setStatus = (status) => {
        this.status = status;
    };
}

export default ApiService.getInstance();
