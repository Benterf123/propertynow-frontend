type TParsedParams = Record<string, string | boolean | any[]>;

export function parseParam(param?: Record<string, any>): string | null {
  if (param && Object.keys(param).length > 0) {
    const parsed = Object.entries(param)
      .map((param) => (param[1] == "" ? "" : `${param[0]}::${param[1]}`))
      .join("|");
    return parsed !== "" ? parsed : null;
  }

  return null;
}

export function parseParams(params: any) {
  const finalParams: TParsedParams = {};

  const filterParams = parseParam(params?.filterParams);
  if (filterParams) finalParams["filter"] = filterParams;

  const searchParams = parseParam(params?.searchParams);
  if (searchParams) finalParams["search"] = searchParams;

  const sortParams = parseParam(params?.sortParams);
  if (sortParams) finalParams["sort"] = sortParams;

  delete params?.filters;
  delete params?.searchParams;
  delete params?.sortParams;
  Object.assign(finalParams, params);

  return finalParams;
}
