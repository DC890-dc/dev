import { useState, useEffect } from "react"

const events = [
  {
    id: 1,
    name: "X Games Halfpipe Finals",
    riders: [
      { name: "John Pork", odds: 1.8, moneyMultiplier: 2.8 },
      { name: "Mr.Clean Bean", odds: 3.2, moneyMultiplier: 6.2 },
      { name: "Dig Dong Fighter", odds: 5.5, moneyMultiplier: 1.5 },
      { name: "Goofy Pants", odds: 0.1, moneyMultiplier: 10.0 }
    ]
  }
]

function Betting() {
  const [selectedRider, setSelectedRider] = useState(null)
  const [betAmount, setBetAmount] = useState(0)
  const [wallet, setWallet] = useState(1000)
  const [loan, setLoan] = useState(0)
  const [message, setMessage] = useState("")
  const [timerMs] = useState(10000)

  // Detect zero wallet and show loan message
  useEffect(() => {
    if (wallet <= 0 && loan === 0) {
      setWallet(0)
      setMessage("You are out of funds! Consider taking a loan.")
    }
  }, [wallet, loan])

  // Loan function, supports normal and high-risk loans
  const takeLoan = (highRisk = false) => {
    if (wallet > 0) {
      setMessage("You can only take a loan when your wallet is empty.")
      return
    }

    if (!highRisk && loan > 0) {
      setMessage(
        "You already have an active loan to repay. Take high-risk loan for 4× interest?"
      )
      return
    }

    const loanAmount = 500
    const interestRate = highRisk ? 4 : 1.2
    const totalOwed = loanAmount * interestRate

    setLoan(totalOwed)
    setWallet(loanAmount)
    setMessage(
      `Loan approved: $${loanAmount}. Total owed: $${totalOwed.toFixed(2)}`
    )
  }

  const placeBet = () => {
    if (!selectedRider) {
      setMessage("Select a rider first!")
      return
    }
    if (betAmount <= 0) {
      setMessage("Enter a valid bet amount!")
      return
    }
    if (betAmount > wallet) {
      setMessage("You cannot bet more than your wallet!")
      return
    }

    const winChance = Math.max(0.05, 1 - selectedRider.odds / 10)
    const win = Math.random() < winChance

    setMessage(`Waiting for results... ${timerMs / 1000} seconds`)

    setTimeout(() => {
      setWallet(prevWallet => {
        let updatedWallet =
          prevWallet - betAmount + (win ? betAmount * selectedRider.moneyMultiplier : 0)

        // Handle loan repayment automatically if winnings cover it
        if (win && loan > 0) {
          if (updatedWallet >= loan) {
            updatedWallet -= loan
            setLoan(0)
            setMessage(
              `You won! Loan fully repaid. Wallet: $${updatedWallet.toFixed(2)}`
            )
          } else {
            setLoan(prevLoan => prevLoan - updatedWallet)
            updatedWallet = 0
            setMessage(
              "You won, but your winnings went toward paying off your loan."
            )
          }
        } else if (win) {
          setMessage(`You won! New wallet: $${updatedWallet.toFixed(2)}`)
        } else {
          updatedWallet = prevWallet - betAmount
          setMessage(`You lost! New wallet: $${updatedWallet.toFixed(2)}`)
        }

        return Math.max(0, updatedWallet)
      })
    }, timerMs)

    setBetAmount(0)
    setSelectedRider(null)
  }

  return (
    <div className="container mt-5 bg-green">
      <br /><br /><br />

      <h2 className="text-light">Place Your Bet</h2>

      <p className="text-light">
        <strong>Wallet:</strong> ${wallet.toFixed(2)}
      </p>

      <p className="text-light">
        <strong>Loan:</strong> {loan > 0 ? `$${loan.toFixed(2)} owed` : "None"}
      </p>

      {/* Normal loan button */}
      {wallet === 0 && loan === 0 && (
        <button className="btn btn-warning mb-2" onClick={() => takeLoan(false)}>
          Take $500 Loan (20% Interest)
        </button>
      )}

      {/* High-risk loan button */}
      {wallet === 0 && loan > 0 && (
        <button className="btn btn-danger mb-3" onClick={() => takeLoan(true)}>
          Take $500 High-Risk Loan (4× Interest)
        </button>
      )}

      {events.map(event => (
        <div key={event.id} className="card mt-3">
          <div className="card-body">
            <h5>{event.name}</h5>
            {event.riders.map(rider => (
              <button
                key={rider.name}
                className="btn btn-outline-primary m-2"
                onClick={() => setSelectedRider(rider)}
              >
                {rider.name} (%{rider.odds})
              </button>
            ))}
          </div>
        </div>
      ))}

      {selectedRider && (
        <div className="card mt-4 p-3">
          <h5>Bet Slip</h5>
          <p>Rider: {selectedRider.name}</p>
          <p>Odds: {selectedRider.odds}</p>

          <input
            type="number"
            className="form-control"
            placeholder="Enter bet amount"
            value={betAmount}
            onChange={e => setBetAmount(Number(e.target.value))}
          />

          <p className="mt-2">
            Potential payout: <strong>${(betAmount * selectedRider.moneyMultiplier).toFixed(2)}</strong>
          </p>

          <button className="btn btn-success" onClick={placeBet}>
            Place Bet
          </button>
        </div>
      )}

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <br /><br /><br />
      <p className="text-light">Lost all money get a loan or even a second loan!</p>
      <p className="text-light"> You can always call 1-800-SNOWBET to add funds to your wallet with our 24/7 customer service.</p>
    </div>
  )
}

export default Betting
