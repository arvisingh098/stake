import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, Modal
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {unStake, claimRewards} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {Stake, UNI} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";

type WithdrawDepositProps = {
  userStakedLpToken: BigNumber
  durationLeftNew: BigNumber
  user: string
};

function WithdrawDeposit({
  userStakedLpToken, durationLeftNew
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Unstake">
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staked Amount" balance={userStakedLpToken} suffix={" LP"}/>
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{flexBasis: '50%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '50%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="LP"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={false}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(userStakedLpToken);
                    }}
                  />
                </>
              </div>
              <div style={{width: '25%', minWidth: '7em'}}>
                <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Withdraw"
                  onClick={() => {
                    unStake(
                      Stake.addr,
                      toBaseUnitBN(userStakedLpToken, UNI.decimals),
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  }}
                  disabled={Stake.addr === '' || !isPos(depositAmount)}
                />
              </div>
              <div style={{width: '25%', paddingLeft: '3%'}}>
                <Button
                  wide
                  label="Claim Reward"
                  onClick={ durationLeftNew.comparedTo(0) === 0 ? () => {
                    claimRewards(
                      Stake.addr,
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  } : () => {alertDuration();}}
                  disabled={Stake.addr === ''}
                />
              </div>
            </div>
          </div>
        </div>
    </Box>
  );
}

export default WithdrawDeposit;

export const alertDuration = async () => {
  window.confirm("Not able to claim rewrads. Please try after program end.");
};
