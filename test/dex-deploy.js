const console = require('console')
const { ethers } = require('hardhat')

function delay (n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000)
  })
}

async function main() {
    var options = { gasPrice: 250000000000, gasLimit: 8000000 }

    const ownerWallet = new ethers.Wallet('fc22cb995181f45fc0d9bf6a26bd686bcc30c6e1a2c0e02df08497809ba84931', ethers.provider)

    // const wavaxSource = await ethers.getContractFactory('contracts/swap/WAVAX.sol:WAVAX')
    // const wavaxContract = await wavaxSource.deploy(options);
    // console.log('Wavax at...', wavaxContract.address)  

    const sigilSource = await ethers.getContractFactory('contracts/SigilToken.sol:SigilToken')
    const sigilContract = await sigilSource.deploy();
    console.log("Sigil:", sigilContract.address);

    // const factorySource = await ethers.getContractFactory('contracts/swap/pairs/SigilFactory.sol:SigilFactory')
    // const factoryContract = await factorySource.deploy(ownerWallet.address)
    // console.log('Sigil Factory deployed at...', factoryContract.address)  
    // console.log('Fee To Setter:', ownerWallet.address) 
    
    const routerSource = await ethers.getContractFactory('contracts/swap/pairs/SigilRouter.sol:SigilRouter')
    const routerContract = await routerSource.deploy('0xaa5E300e82408F05e0BA095bF83CBF600E57bBF9', '0x4e22AAED84BaB2664dCCA71758A63Ecd7223C4a9')
    console.log('Sigil Router deployed at...', routerContract.address)
}

function parseTimestamp (ts)
{
    var date = new Date(ts * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + time;
}

main()