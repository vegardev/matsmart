export function RecipeMethodField({ method }: { method: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
      <h2 className="py-4 mx-3 text-2xl font-bold">Method:</h2>
      <div className="bg-white px-6 py-3 rounded-2xl">
        <div dangerouslySetInnerHTML={{ __html: method }} />
      </div>
    </div>
  );
}

export function RecipeIngredientsField({
  ingredients,
}: {
  ingredients: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
      <h2 className="py-4 mx-3 text-2xl font-bold">Ingredients:</h2>
      <div className="bg-white px-6 py-3 rounded-2xl">
        <div dangerouslySetInnerHTML={{ __html: ingredients }} />
      </div>
    </div>
  );
}
