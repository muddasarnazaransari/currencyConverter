import React, {useId} from 'react'
import './input.css'

function Input({
    label, amount, onAmountChange, onCurrencyChange, isWidthZero,
    currencyOptions = [],
    selectCurrency = "inr",
    amountDisable = false,
    currencyDisable = false,
}) {
    const amountInputId = useId();

    return (
        <>
            <div className='container'>
                <div className='heading'>
                    <label htmlFor={amountInputId}>
                        {label}
                    </label>
                    <p>Currency Type</p>
                </div>
                <div className='selectCurr'>
                    <div className="input-container">
                        <input 
                            id={amountInputId}
                            type='number' 
                            className='input' 
                            placeholder='Enter Value here '
                            disabled={amountDisable} value={amount}
                            onChange={(e) => onAmountChange && onAmountChange(e.target.value === "" ? "" : Number(e.target.value))}

                            //Remove 0 when user click on input field
                            onFocus={(e) => {
                                if(e.target.value === "0")
                                {
                                    onAmountChange && onAmountChange("");
                                }
                            }}

                            //Restore value if user has not enter a vaule
                            onBlur={(e) => {
                                if(e.target.value === "")
                                {
                                    onAmountChange && onAmountChange(Number(e.target.value));
                                }
                            }}
                        />
                        <span className={`bottom-line ${isWidthZero ? "widthzero" : "widthFull"}`}></span>
                    </div>
                    <select
                        id='options'
                        name='options'
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange &&
                            onCurrencyChange(e.target.value)
                        }
                        disabled={currencyDisable}
                    >
                        {/* Remember the key while dealing with loops in react */}
                        {currencyOptions.map((currency) =>
                        (
                            <option key={currency} value= {currency}>{currency.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Input