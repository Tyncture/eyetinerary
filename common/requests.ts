interface IResponse {
  body?: any;
  success: boolean;
  statusCode: number;
}

export async function apiRequest(
  pathWithSlashPrefix: string,
  method: string = "GET",
  body?: {},
  token?: string,
) {
  try {
    const response = await fetch(
      `${process.env.EYET_API}${pathWithSlashPrefix}`,
      {
        method,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: body ? JSON.stringify(body) : undefined,
      },
    );
    const statusCode = response.status;
    const success = statusCode === 200 || statusCode === 201 ? true : false;
    const responseBody = await response.json();
    if (!success) {
      console.error(
        `Server responded with status code ${statusCode} at ${method} ${
          process.env.EYET_API
        }${pathWithSlashPrefix}`,
      );
      console.log(responseBody);
    }
    return {
      body: responseBody,
      success,
      statusCode,
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      statusCode: -1,
    };
  }
}

export async function apiGet(
  pathWithSlashPrefix: string,
  token?: string,
): Promise<IResponse> {
  return await apiRequest(pathWithSlashPrefix, "GET", token);
}

export async function apiPost(
  pathWithSlashPrefix: string,
  body: {},
  token?: string,
): Promise<IResponse> {
  return await apiRequest(pathWithSlashPrefix, "POST", body, token);
}

export async function apiDelete(
  pathWithSlashPrefix: string,
  body?: {},
  token?: string,
): Promise<IResponse> {
  return await apiRequest(pathWithSlashPrefix, "DELETE", body, token);
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
