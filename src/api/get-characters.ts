export interface ICharacters {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}
export interface IResponseData {
  results: ICharacters[];
}
export const getAllcharactersData = async (page: number) => {
  try {
    const result = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await result.json();
    return {
      data: json,
      status: result.status === 200,
      message: json.message || "",
    };
  } catch (e) {
    console.log(e);
    return { status: false, message: "Something was wrong" };
  }
};
