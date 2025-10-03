// frontend/src/components/UserList.jsx
export default function UserList({ users }) {
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
