import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import {
  getBalance, totalStakedFor, rewards, getTokenAllowance, rewardRate,
} from '../../utils/infura';
import {UNI, Stake, HONEYX} from "../../constants/tokens";
import { toTokenUnitsBN } from '../../utils/number';

import AccountPageHeader from "./Header";
import WithdrawDeposit from "./WithdrawDeposit";
import IconHeader from "../common/IconHeader";

function Wallet({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const [userLpToken, setUserLpToken] = useState(new BigNumber(0));
  const [userStakedLpToken, setUserStakedLpToken] = useState(new BigNumber(0));
  const [userHONEYXToken, setHONEYXToken] = useState(new BigNumber(0));
  const [userEarnedToken, setEarnedToken] = useState(new BigNumber(0));
  const [rewardRatePer, setrewardRate] = useState(new BigNumber(0));
  const [userESDAllowance, setUserESDAllowance] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updaterewardRate() {
      const [
        rewardRatePercent,
      ] = await Promise.all([
        rewardRate(),
      ]);

      if (!isCancelled) {
        // const _time = new BigNumber(rewardRatePercent);
        // const daySec = new BigNumber(3600*24);
        setrewardRate(toTokenUnitsBN(rewardRatePercent, HONEYX.decimals));
      }
    }

    updaterewardRate();
    const id = setInterval(updaterewardRate, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  //Update User balances
  useEffect(() => {
    if (user === '') {
      setUserLpToken(new BigNumber(0));
      setUserStakedLpToken(new BigNumber(0));
      setHONEYXToken(new BigNumber(0));
      setEarnedToken(new BigNumber(0));
      setUserESDAllowance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        lpTokens, stakedAmount, HONEYXToken, earnedAmount, esdAllowance
      ] = await Promise.all([
        getBalance(UNI.addr, user),
        totalStakedFor(Stake.addr, user),
        getBalance(HONEYX.addr, user),
        rewards(Stake.addr, user),
        getTokenAllowance(UNI.addr, user, Stake.addr),
      ]);

      const userLpToken = toTokenUnitsBN(lpTokens, UNI.decimals);
      const userStakedLpToken = toTokenUnitsBN(stakedAmount, HONEYX.decimals);
      const userHONEYXToken = toTokenUnitsBN(HONEYXToken, HONEYX.decimals);
      const userEarnedToken = toTokenUnitsBN(earnedAmount, HONEYX.decimals);

      if (!isCancelled) {
        setUserLpToken(new BigNumber(userLpToken));
        setUserStakedLpToken(new BigNumber(userStakedLpToken));
        setHONEYXToken(new BigNumber(userHONEYXToken));
        setEarnedToken(new BigNumber(userEarnedToken));
        setUserESDAllowance(new BigNumber(esdAllowance));
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <IconHeader icon={<i className="fas fa-parachute-box"/>} text="Stake"/>

      <AccountPageHeader
        rewardRatePer={rewardRatePer}
        userLpToken={userLpToken}
        userHONEYXToken={userHONEYXToken}
        userEarnedToken={userEarnedToken}
      />

      <WithdrawDeposit
        user={user}
        balance={userLpToken}
        allowance={userESDAllowance}
        stagedBalance={userStakedLpToken}
      />
    </>
  );
}

export default Wallet;
