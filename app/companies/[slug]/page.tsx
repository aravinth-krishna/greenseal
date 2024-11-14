const Company = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <div>Company Name: {params.slug}</div>
    </>
  );
};

export default Company;
