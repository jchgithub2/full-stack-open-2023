const Notification = ({ message, statusChange }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={statusChange}>
        {message}
      </div>
      
    )
  }
  export default Notification;