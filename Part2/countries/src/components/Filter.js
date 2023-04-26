const FiltName = ({ lookfor, setLookfor }) => (
    <p>
    <strong>
      find countries:
      <input value={lookfor} onChange={setLookfor} />
    </strong>
    </p>
    )
    
    export default FiltName;