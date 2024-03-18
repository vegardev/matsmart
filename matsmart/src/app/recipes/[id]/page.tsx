export default function Page({ params }: { params: { id: string } }) {
    return <div>Recipe page: {params.id}</div>;
  }