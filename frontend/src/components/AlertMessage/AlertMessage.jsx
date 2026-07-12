function AlertMessage({ message, type }) {
  if (!message) return null;
  return (
    <div 
      className={`alert ${type === "success" ? "alert-success" : "alert-danger"}`}
      role="alert">
        {message}
    </div>
  );
}

export default AlertMessage;