import { useState } from 'react'

const Button = ( props ) => {
  return (
    <button  onClick={props.handleClick}> {props.text} </button>
  )
}

const FeedbackButtons = ( props ) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={() => props.updateGood()}/>
      <Button text="Neutral" handleClick={() => props.updateNeutral()}/>
      <Button text="Bad" handleClick={() => props.updateBad()}/>
    </div>
  )
}

const StatisticLine = ( props ) => {
  return (
    <td> {props.text} {props.value}</td>
  )
}

const SummaryStatistics = ( props ) => {
  const [good, neutral, bad] = props.info;

  const all = good + neutral + bad;
  const average = ((good - bad)/all)*100
  const positive = (good/all)*100

  if(all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine text="Good" value={good}/></tr>
          <tr><StatisticLine text="Neutral" value={neutral}/></tr>
          <tr><StatisticLine text="Bad" value={bad}/></tr>
          <tr><StatisticLine text="All" value={all}/></tr>
          <tr><StatisticLine text="Average" value={ isNaN(average) ? 0 : average }/></tr>
          <tr><StatisticLine text="Positive" value={ isNaN(positive) ? 0 : positive + " %" }/></tr>
        </tbody>
      </table>

      {/* <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={all}/>
      <StatisticLine text="Average" value={ isNaN(average) ? 0 : average }/>
      <StatisticLine text="Positive" value={ isNaN(positive) ? 0 : positive + " %" }/> */}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleAddGood = () => {
    setGood(good + 1)
  }

  const handleAddNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleAddBad = () => {
    setBad(bad + 1)
  }

  console.log('good neutral bad', good, neutral, bad);

  return (
    <div>
      <FeedbackButtons updateGood={handleAddGood} updateNeutral={handleAddNeutral} updateBad={handleAddBad}/>
      <SummaryStatistics info={[good, neutral, bad]}/>
    </div>
  )
}

export default App