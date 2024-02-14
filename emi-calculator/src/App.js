import { useEffect, useState } from 'react';
import './App.css';
import { numberWithCommas } from './utils/config';
import SliderInput from './components/SliderInput';
import NumberInput from './components/NumberInput';

function App() {

  const Availabletenures = [12, 24, 36, 48, 60];

  const [cost, setCost] = useState(100000);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const CalculateEMI = (downpayment) => {

    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;

    const loanAmt = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI = (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  }

  const calculateDP = (emi) => {
    if (!cost) return

    const downPaymentPercent = 100 - (emi / CalculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  }

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = CalculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost])

  const updateEMI = (e) => {
    if (!cost) return

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = CalculateEMI(dp);
    setEmi(emi);
  }
  const updateDownPayment = (e) => {
    if (!cost) return

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
    <div className="App">
      <header className="App-header">
        EMI Calculator
      </header>

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
        <span>Down payment</span>
        <span>{`Total down Payment - ${totalDownPayment()}`} </span>
        <input type='range'
          value={downPayment}
          min={0}
          max={cost}
          className='slider'
          onChange={updateEMI}

        />
        <div className='labels'>
          <label>{numberWithCommas(0)}</label>
          <b>{numberWithCommas(downPayment)}</b>
          <label>{numberWithCommas(cost)}</label>
        </div>
      </div>
      {/* <SliderInput
        title={"Down payment"}
        underlinedTitle={`Total down Payment - ${totalDownPayment()}`}
        onchange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      /> */}
      <div className='container'>
        <span>Loan Per Month</span>
        <span>{`Total loan Amount - ${totalEMI()}`} </span>
        <input type='range'
          onChange={updateDownPayment}
          value={emi}
          min={CalculateEMI(cost)}
          max={CalculateEMI(0)} />
        <div className='labels'>
          <label>{numberWithCommas(CalculateEMI(cost))}</label>
          <b>{numberWithCommas(emi)}</b>
          <label>{numberWithCommas(CalculateEMI(0))}</label>
        </div>
      </div>

      {/* <SliderInput
        title={"Loan Per Month"}
        underlinedTitle={`Total down Payment - ${totalEMI()}`}
        onchange={updateDownPayment}
        state={emi}
        min={CalculateEMI(cost)}
        max={CalculateEMI(0)}
      /> */}
      <div className='container'>
        <span>Tenure</span>
        < div className='tenure' >
          {Availabletenures?.map((t) => {
            return (<button
              onChange={(e) => setTenure(t)}
              key={t}
              className={`tenure ${t === tenure ? "tenureSelected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>)
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
