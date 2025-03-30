import TransactionContainer from "./components/TransactionContainer";

const Transactions = async () => {
  return (
    <div className="">
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
          Account transactions history
        </h1>
        <p>All your transaction history in one place.</p>
      </div>
      <TransactionContainer />
    </div>
  );
};

export default Transactions;
