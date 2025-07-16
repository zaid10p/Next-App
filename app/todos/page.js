import { authTokenService } from "@/lib/auth-service";

export const metadata = {
  title: "Todos",
  description: "List of todos",
};

const Todos = async () => {
  const todos = await authTokenService.get(
    `${process.env.STRAPI_API_URL}/todos`
  );
  if (!todos.ok) {
    return <div>Error loading todos: {todos.statusText}</div>;
  }
  const todosData = await todos.json();
  return (
    <div>
      <h1>Todos</h1>
      <ul className="posts">
        {todosData?.data?.map((todo) => (
          <li key={todo.id}>
            <article className="post">
              <div className="post-content">
                <header>
                  <h2>{todo.name}</h2>
                  <p>{todo.completed ? "Completed" : "Pending"}</p>
                </header>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
