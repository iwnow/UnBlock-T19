// const getWalletInfo = require('./getWalletInfo');
// const getTransactionHistoryByBlockId = require('./getTransactionHistoryByBlockId');
// const getNTransactions = require('./getNTransactions');
// const cbor = require('cbor')
// const curve25519 = require('./curve25519/axlsign.js')
// //const rand = require('./csprng');
// const Base58 = require('base-58')

import getWalletInfo from './getWalletInfo';
import getTransactionHistoryByBlockId from './getTransactionHistoryByBlockId';
import getNTransactions from './getNTransactions';
import * as cbor from 'cbor';
import * as Base58 from 'base-58';
import * as curve25519 from './curve25519/axlsign.js';
import * as rand from './csprng';

const jsonToByte = function(json) {
  return cbor.encode(json);
}

const genSeed = function () {
	let chunks = []
	rand(32*8, 2).split('').map(b => +b).forEach((bit, index) => {
	  let i = index % 8
	  chunks[chunks.length - 1] += bit * Math.pow(2, 7 - i)
	  if (i == 7)
		chunks.push(0) 
	})
	return Base58.encode(new Uint8Array(chunks))
  }
  
  const genKeyPair = function (seed) {
	const pairInBytes = curve25519.generateKeyPair(Base58.decode(seed))
	return { private: Base58.encode(pairInBytes.private), public: Base58.encode(pairInBytes.public) }
  }

const computeSignature = function (privateBase58, message) {
	return Base58.encode(curve25519.sign(Base58.decode(privateBase58), cbor.encode(message)))
}
/*
const verifySignature = function (publicBase58, message, signatureBase58) {
	return curve25519.verify(Base58.decode(publicBase58), cbor.encode(message), Base58.decode(signatureBase58))
}
*/

//const keyPair = genKeyPair()

//console.log(computeSignature(keyPair.private, {pidor:true}))

export {
	genSeed,
	genKeyPair,
	computeSignature, 
	//verifySignature,
	jsonToByte,
	getWalletInfo,
	getTransactionHistoryByBlockId,
	getNTransactions
}
