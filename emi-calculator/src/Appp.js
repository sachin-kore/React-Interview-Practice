import { useEffect, useState } from 'react';
import './App.css';
import { numberWithCommas } from './utils/config';
import SliderInput from './components/SliderInput';
import NumberInput from './components/NumberInput';

export const Appp = () => {


    const Availabletenures = [12, 24, 36, 48, 60];

    const [cost, setCost] = useState(100000);
    const [interest, setInterest] = useState(10);
    const [fee, setFee] = useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);

    const CalculateEMI = (dp) => {
        if (!cost) return;

        // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]

        const loanAmt = cost - dp;
        const rateofInterest = interest / 100;
        const numofYears = tenure / 12;

        const EMI = (loanAmt * rateofInterest * (1 + rateofInterest ** numofYears)) /
            (1 + rateofInterest) ** (rateofInterest - 1);

        return Number(EMI / 12).toFixed(0);
    }

    const calculateDP = (x) => {
        if (!cost) return;
        const downPaymentPercent = 100 - (x / CalculateEMI(0)) * 100;
        return Number((downPaymentPercent / 100) * cost).toFixed(0);
    }

    const updateEMI = (e) => {
        if (!cost) return;
        const dp = Number(e.target.value);
        setDownPayment(dp.toFixed(0));

        const emi = CalculateEMI(dp);
        setEmi(emi);
    }

    const updateDownPayment = (e) => {
        if (!cost) return;
        const emi = Number(e.target.value);
        setEmi(emi.toFixed(0));

        const dp = calculateDP(emi);
        setDownPayment(dp);

    }

    const totalDownPayment = () => {
        return numberWithCommas(
            (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0));
    }

    const totalEMI = () => {
        return numberWithCommas((emi * tenure).toFixed(0));
    }

    return (
        <div className='App'>
            <header>EMI Calculator</header>
            <NumberInput
                title={"Total cost of asset"}
                state={cost}
                setState={setCost}
            />
            <NumberInput
                title={"Interest Rate (in %)"}
                state={interest}
                setState={setInterest}
            />
            <NumberInput
                title={"Processing Fee (in %)"}
                state={fee}
                setState={setFee}
            />

            <div className='container'>
                <span>DownPayment</span>
                <span>{`Total EMI per Month - ${totalEMI()}`}</span>
                <input
                    type='range'
                    value={downPayment}
                    onChange={updateEMI}
                    min={0}
                    max={cost} />
                <div className='labels'>
                    <span>{numberWithCommas(0)}</span>
                    <b>{numberWithCommas(downPayment)}</b>
                    <label>{numberWithCommas(cost)}</label>
                </div>
            </div>
            {/* <SliderInput
                title={"DownPayment"}
                underlinedTitle={`Total loan Amount - ${totalEMI()}`}
                onchange={updateEMI}
                state={downPayment}
                min={0}
                max={cost}
                labelMin={"0"}
                labelMax={"100%"}
            /> */}
            <div className='container'>
                <span>Loan per Month</span>
                <span>{`Total down Payment - ${totalDownPayment()}`} </span>
                <input
                    type='range'
                    value={emi}
                    onChange={updateDownPayment}
                    min={CalculateEMI(cost)}
                    max={CalculateEMI(0)} />
                <div className='labels'>
                    <span>{numberWithCommas(CalculateEMI(cost))}</span>
                    <b>{numberWithCommas(emi)}</b>
                    <label>{numberWithCommas(CalculateEMI(0))}</label>
                </div>
            </div>

            <div className='container'>
                <span>Tenure</span>
                <div className='tenure'>
                    {
                        Availabletenures && Availabletenures.map((t) => {
                            return (
                                <button className={`tenure ${tenure === t ? "tenureSelected" : ""}`} onClick={() => setTenure(t)} key={t}>{t}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
