import  Person from "./Person";

const Persons = ({ persons, filter, handleDelPerson }) => (
   <>
   {persons.filter((person) => person.name.toLowerCase().includes(filter)).map(({ name, number, id }) => <Person  key={id} name={name} number={number} handleDelPerson={handleDelPerson(id, name)} /> )}
   </>
   )

export default Persons;
