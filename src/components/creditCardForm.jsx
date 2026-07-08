



import Loader from "./loader";

import "../styles/orderForm.css"


function CreditCardForm({total, cardNumber, setCardNumber, cardDate, setCardDate, code,
                         setCode, name, setName, lastName, setLastName, billing, setBilling, error,handleClick}){


    const handleChange = (e) => {
        const num = e.target.value.replace(/\D/g, "");
        const format = num.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(format)
    }


    const handleDate = (e) => {


        let num = e.target.value.replace(/\D/g, "");

       
        if(num.length === 1){
            if (!/[01]/.test(num)) return;
        }

        if(num.length >= 2){
            if(num[0] === "1"){
                const sec = num[1]
                if(!/^[012]$/.test(sec)) return
            }

            else if(num[0] === "0"){
                const sec = num[1]
                if(!/^(1[0-2]|[1-9])$/.test(sec)) return
            }
            
        }


        const today = new Date();
        const currentYear = today.getFullYear() % 100;

        const currentMonth = today.getMonth() + 1;  

        if (num.length === 4) {
            const expYear = Number(num.slice(-2));
            const expMonth = Number(num.slice(0, 2));

            if (expYear < currentYear) {
                num = num.slice(0, -2); 
                setCardDate(num);
            }

            else if(expYear === currentYear){
                
                if(expMonth < currentMonth){
                    num = num.slice(0, 2);
                    setCardDate(num);
                }
            }

        }

        let display = num;
        if (num.length > 2) {
            display = num.slice(0, 2) + " / " + num.slice(2);
        }

        setCardDate(display);
    }

    const handleCode = (e) => {
        const num = e.target.value.replace(/\D/g, "");
        setCode(num);
    }



    

    return(
        <div className="creditForm-container">
            <form className="credit-form">
                {error && <span className="error">Error In The Form</span>}
                <div className="fullname">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                    required
                    maxLength={19}
                    minLength={19}
                />
                <div className="card-details">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        maxLength={7}
                        minLength={7}
                        value={cardDate}
                        onChange={handleDate}
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        required
                        maxLength={3}
                        minLength={3}
                        value={code}
                        onChange={handleCode}
                        className="cvc"
                    />
                </div>
                <input
                    type="text"
                    value={billing}
                    onChange={(e) => setBilling(e.target.value)}
                    placeholder="Billing Address"
                    required
                />
                <div className="subTotal">Sub Total: {total} DKK</div>
                <button onClick={handleClick} type="button" className="order-now">Place Order</button>
            </form>
        </div>
    )
}

export default CreditCardForm