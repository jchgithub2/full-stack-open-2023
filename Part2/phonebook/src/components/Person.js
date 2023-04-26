
const Person = ({name , number, handleDelPerson }) => (

    <div>
            <h3>
              <span>
                {name} {number} <button onClick={handleDelPerson} >Delete</button>
              </span>
            </h3>
          </div>

)
export default Person;