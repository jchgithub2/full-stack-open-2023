
const FiltName = ({ lookfor, setLookfor }) => (
<p>
<strong>
  File shown with:
  <input value={lookfor} onChange={setLookfor} />
</strong>
</p>
)

export default FiltName;