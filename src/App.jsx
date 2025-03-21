import { useState, useEffect } from 'react'
import Input from '/Components/Input.jsx'
import useCurrencyInfo from '/Hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isWidthZero, setIsWidthZero] = useState(true);

  const currencyInfo = useCurrencyInfo(from);

  console.log("Data from : ", currencyInfo);

  const options = Object.keys(currencyInfo);

  const convert = () => {
    const originalConvertedAmount = amount * currencyInfo[to];
    setConvertedAmount(parseFloat(originalConvertedAmount.toFixed(2))); //toFixed will fix the number after decimal to 2 place only

    setIsWidthZero(false);
  }

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  useEffect(() => {
    if(amount != 0)
    {
      const handleKeyDown = (e) => {
        if(e.key === "Enter"){
          convert();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      }
    }
  }, [amount]);

  return (
    <>
      <div className="card-container">
      <Input
        label = "From"
        amount = {amount}
        currencyOptions = {options}
        onCurrencyChange = {(currency) => setFrom(currency)}
        selectCurrency = {from}
        onAmountChange = {
          (amount) => 
          {setAmount(amount)
          setIsWidthZero(true);
          }
        }
      />
      <Input
        label = "To"
        amount = {convertedAmount}
        currencyOptions = {options}
        onCurrencyChange = {(currency) => setTo(currency)}
        selectCurrency = {to}
        amountDisabled
        isWidthZero={isWidthZero}
      />
      <button onClick={() => convert()}>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
      </div>
    </>
  )
}

export default App
