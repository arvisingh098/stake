import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';

type PoolPageHeaderProps = {
  rewardRatePer: BigNumber,
  userLpToken: BigNumber,
  userHONEYXToken: BigNumber,
  userEarnedToken: BigNumber,
};

const PoolPageHeader = ({
  rewardRatePer, userLpToken, userHONEYXToken, userEarnedToken
}: PoolPageHeaderProps) => (
  <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="Reward Rate" balance={rewardRatePer} suffix={" HoneyX"}/>
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="Wallet Balance" balance={userLpToken} suffix={" BNB-HONEYX"}/>
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="HONEYX" balance={userHONEYXToken} suffix={" HONEYX"} />
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="Earned Amount" balance={userEarnedToken}  suffix={" HONEYX"}/>
    </div>
  </div>
);


export default PoolPageHeader;
