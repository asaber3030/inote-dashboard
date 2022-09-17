

const TopUser = ({ appURL, user }) => {
  return (
    <div className="top-data">
      <img src={appURL + user.image} alt="" />
      <div className="text">
        <h1>{user.name}</h1>
        <p>{user.title}</p>
      </div>
    </div>
  )
}

export default TopUser
