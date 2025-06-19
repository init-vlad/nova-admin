const defaultNotFound = () => {
  return <div>Not found</div>;
};

export async function NovaAdminCatchAll({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const resource = resources.get(path[0]);

  if (!resource) {
    return defaultNotFound();
  }

  const action = path[1];
  if (action === "create") {
    const page = await resource.form();
    if (page) {
      return page;
    }

    const notFound = await resource.notFound(path.slice(1));
    return notFound || defaultNotFound();
  }

  if (action === "edit") {
    const page = await resource.form();
    if (page) {
      return page;
    }

    const notFound = await resource.notFound(path.slice(1));
    return notFound || defaultNotFound();
  }

  if (action) {
    return <div>{await resource.action(path.slice(1))}</div>;
  }

  return <div>{await resource.table()}</div>;
}
