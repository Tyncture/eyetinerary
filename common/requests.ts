interface IResponse {
  body?: any;
  success: boolean;
  statusCode: number;
}

export async function apiGet(
  pathWithSlashPrefix: string,
  token?: string
): Promise<IResponse> {
  try {
    const response = await fetch(
      `${process.env.EYET_API}${pathWithSlashPrefix}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : null
        }
      }
    );
    const status = response.status;
    return {
      body: await response.json(),
      success: status === 200 ? true : false,
      statusCode: status
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      statusCode: -1
    };
  }
}

export async function apiPost(
  pathWithSlashPrefix: string,
  body: {},
  token?: string
): Promise<IResponse> {
  try {
    const response = await fetch(
      `${process.env.EYET_API}${pathWithSlashPrefix}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : null
        },
        body: JSON.stringify(body)
      }
    );
    const status = response.status;
    return {
      body: await response.json(),
      success: status === 200 || status === 201 ? true : false,
      statusCode: status
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      statusCode: -1
    };
  }
}

export async function getItinerary(id: number): Promise<IResponse> {
  return await apiGet(`/itinerary/${id}`);
}

export async function getPage(id: number): Promise<IResponse> {
  return await apiGet(`/page/${id}`);
}

export async function getItem(id: number): Promise<IResponse> {
  return await apiGet(`/item/${id}`);
}

export async function postLogin(username: string, password: string) {
  return await apiPost("/login", { username, password });
}
