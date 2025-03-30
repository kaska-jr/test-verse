import Users from "../components/Users";
import InvestmentPlans from "../components/InvestmentPlans";

const AdminPanel = async () => {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight mb-3">
        Welcome Admin
      </h1>

      <Users />
      <InvestmentPlans />
    </section>
  );
};

export default AdminPanel;
