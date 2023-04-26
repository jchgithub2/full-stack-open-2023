 
 const Form = ({ name, number, handleName, handleNumber, handlePerson }) =>(
 
 <form onSubmit={handlePerson}>
<div>
  <strong>
    name:
    <input value={name} onChange={handleName} />
  </strong>
</div>
<div>
  <strong>
    number:
    <input value={number} onChange={handleNumber} />
  </strong>
</div>
<br />
<div>
  <button type="submit">add</button>
</div>
</form>
)
export default Form
