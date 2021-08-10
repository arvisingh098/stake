import Web3 from 'web3';

import {Stake, UNI} from "../constants/tokens";
const honeyxAbi = require('../constants/abi/HoneyXToken.json');
const stakeAbi = require('../constants/abi/Stake.json');
const pairAbi = require('../constants/abi/UniswapV2Pair.json');

let web3;
// eslint-disable-next-line no-undef
if (window.ethereum !== undefined) {
  // eslint-disable-next-line no-undef
  web3 = new Web3(ethereum);
}

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getTokenBalance = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(honeyxAbi, token);
  return tokenContract.methods.balanceOf(account).call();
};

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getBalance = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(honeyxAbi, token);
  return tokenContract.methods.balanceOf(account).call();
};

export const totalStakedFor = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(stakeAbi, token);
  return tokenContract.methods.balanceOf(account).call();
};

export const rewards = async (token, account) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(stakeAbi, token);
  return tokenContract.methods.earned(account).call({from: account});
};

export const getTokenTotalSupply = async (token) => {
  const tokenContract = new web3.eth.Contract(honeyxAbi, token);
  return tokenContract.methods.totalSupply().call();
};

/**
 *
 * @param {string} token
 * @param {string} account
 * @param {string} spender
 * @return {Promise<string>}
 */
export const getTokenAllowance = async (token, account, spender) => {
  const tokenContract = new web3.eth.Contract(honeyxAbi, token);
  return tokenContract.methods.allowance(account, spender).call();
};

export const rewardRate = async () => {
  const poolContract = new window.web3.eth.Contract(stakeAbi, Stake.addr);
  const _rewardRate = await poolContract.methods.rewardRate().call();
  return _rewardRate;
};

export const getDurationLeft = async () => {
  const poolContract = new window.web3.eth.Contract(stakeAbi, Stake.addr);
  const _duration = await poolContract.methods.durationLeft().call();
  return _duration;
};