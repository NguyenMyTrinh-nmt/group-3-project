export default function UserList({ users }) {
  if (!users) users = []; // đảm bảo users không undefined

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>Chưa có user nào</p>
        )}
      </ul>
    </div>
  );
}