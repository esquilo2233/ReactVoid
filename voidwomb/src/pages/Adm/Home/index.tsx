// pages/admin/index.tsx
import withAuth from '../../../components/withAuth';

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin page. Only accessible if you are logged in.</p>
    </div>
  );
};

export default withAuth(AdminPage);
