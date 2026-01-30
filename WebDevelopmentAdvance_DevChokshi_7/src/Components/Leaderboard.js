// Leaderboard component showing top bettors and top winning riders
function Leaderboard() {
    return (
    <div>
        <div className="container mt-5">
        <br /><br /><br />
        <h2 className="text-light">Leaderboard Of Bets in Action</h2>
        <ul className="list-group">
            <li className="list-group-item">SnowWolf — $9,800</li>
            <li className="list-group-item">PipeMaster — $7,200</li>
            <li className="list-group-item">MoneyRunner — $5,400</li>
        </ul>
        <p className="text-light">
            All Information May Be Subject to Change And May Not be Accurate As Of Now
        </p>
        </div>

        <div className="container mt-5">
        <h2 className="text-light">Leaderboard Of Wins</h2>
        <ul className="list-group">
            <li className="list-group-item">1. Mr.Clean Bean</li>
            <li className="list-group-item">2. John Pork</li>
            <li className="list-group-item">3. IceRider</li>
        </ul>
        <p className="text-light">
            All Information May Be Subject to Change And May Not be Accurate As Of Now
        </p>
        </div>
    </div>
    )
}

export default Leaderboard
