import { useGoodIncrement, useNeutralIncrement, useBadIncrement } from "./store"

const Buttons = () => {
  const goodIncre = useGoodIncrement()
  const neutralIncre = useNeutralIncrement()
  const badIncre = useBadIncrement()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodIncre}>good</button>
      <button onClick={neutralIncre}>neutral</button>
      <button onClick={badIncre}>bad</button>
    </div>
  )
}

export default Buttons
