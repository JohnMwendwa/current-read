import WishList from "components/WishList";

function WishListPage() {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl text-center font-bold mb-4">
        My Wish List Books
      </h1>
      <WishList />
    </div>
  );
}

export default WishListPage;
