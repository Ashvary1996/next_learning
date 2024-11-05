function page({ params }:any) {
  return (
    <div>
      <h1>Profile Page</h1>
      <hr />
      <h2>{params.id}</h2>
    </div>
  );
}

export default page;
